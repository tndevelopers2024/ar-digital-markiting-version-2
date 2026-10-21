import type { AuditValues, ContactValues } from "./validation";
export async function submitEnquiry(kind: "audit" | "contact", data: AuditValues | ContactValues, company: string) {
  let response: Response;
  try {
    response = await fetch("/api/enquiries", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, data, company }), signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("We couldn’t confirm delivery. Please check your connection and try again later.");
  }
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = result && typeof result === "object" && "message" in result && typeof result.message === "string"
      ? result.message : "We couldn’t send your enquiry. Please try again later.";
    throw new Error(message);
  }
  if (!result || typeof result !== "object" || !("message" in result)) {
    throw new Error("We couldn’t confirm delivery. Please try again later.");
  }
}
