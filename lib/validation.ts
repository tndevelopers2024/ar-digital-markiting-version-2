import { z } from "zod";
import { config, servicePages } from "@/lib/config";
export const auditSchema = z.object({
  name: z.string().trim().min(2, config.audit.errors.name).max(120, config.audit.errors.nameLength),
  email: z.string().trim().email(config.audit.errors.email).max(254, config.audit.errors.email),
  website: z.string().trim().max(2048).url(config.audit.errors.website).refine(value => { try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; } }, config.audit.errors.website),
  budget: z.string().refine(value => config.audit.budgets.some(budget => budget === value), config.audit.errors.budget),
});
export type AuditValues = z.infer<typeof auditSchema>;
export const contactSchema = z.object({
 name:z.string().trim().min(2,"Please enter your name.").max(120),
 email:z.string().trim().email("Please enter a valid email address.").max(254),
 service:z.string().trim().refine(value=>value==="Not sure yet"||servicePages.some(service=>service.name===value),"Choose a service.").max(120),
 message:z.string().trim().min(20,"Tell us a little more—at least 20 characters.").max(3000),
});
export type ContactValues = z.infer<typeof contactSchema>;
export const enquirySchema = z.discriminatedUnion("kind", [
 z.object({kind:z.literal("contact"),data:contactSchema,company:z.string().max(0).default("")}),
 z.object({kind:z.literal("audit"),data:auditSchema,company:z.string().max(0).default("")}),
]);
