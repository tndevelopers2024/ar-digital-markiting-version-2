import { createHash, randomUUID } from "node:crypto";
import { enquirySchema } from "@/lib/validation";
import { site } from "@/lib/site";
export const runtime = "nodejs";
const windows = new Map<string, {count:number;until:number}>();
function reply(message:string,status:number) {return Response.json({message},{status,headers:{"Cache-Control":"no-store"}});}
export async function POST(request:Request) {
 const origin=request.headers.get("origin");
 if(origin!==new URL(site.url).origin) return reply("This request could not be verified. Reload the page and try again.",403);
 if(!request.headers.get("content-type")?.startsWith("application/json")) return reply("Unsupported request format.",415);
 // A second, shared limit must be configured at the hosting edge before launch.
 const now=Date.now();
 for(const [key,value] of windows) if(value.until<now) windows.delete(key);
 if(windows.size>=10000) return reply("Please try again later.",429);
 const key=createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown").digest("hex");
 const count=windows.get(key)||{count:0,until:now+60000};count.count++;windows.set(key,count);
 if(count.count>5) return reply("Too many requests. Please wait a minute and try again.",429);
 let body:unknown;
 try {
  const reader=request.body?.getReader();if(!reader)return reply("Missing enquiry.",400);
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>16000){await reader.cancel();return reply("Your enquiry is too large.",413);}chunks.push(value);}
  body=JSON.parse(Buffer.concat(chunks).toString("utf8"));
 } catch {return reply("Please check your enquiry and try again.",400);}
 const parsed=enquirySchema.safeParse(body);
 if(!parsed.success)return reply("Please check all fields and try again.",400);
 const endpoint=process.env.ENQUIRY_WEBHOOK_URL;
 const token=process.env.ENQUIRY_WEBHOOK_TOKEN;
 if(!endpoint||!token)return reply("Online enquiries are temporarily unavailable. Please try again later.",503);
 try {
  if(new URL(endpoint).protocol!=="https:")return reply("Online enquiries are temporarily unavailable.",503);
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({id:randomUUID(),receivedAt:new Date().toISOString(),kind:parsed.data.kind,data:parsed.data.data}),signal:AbortSignal.timeout(10000),redirect:"error",cache:"no-store"});
  if(!response.ok)return reply("We couldn’t send your enquiry. Please try again later.",502);
  return reply("Your enquiry has been received.",200);
 } catch {return reply("We couldn’t confirm delivery. Please try again later.",502);}
}
