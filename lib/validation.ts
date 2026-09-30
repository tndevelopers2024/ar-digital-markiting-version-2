import { z } from "zod";
import { config } from "@/lib/config";
export const auditSchema = z.object({
  name: z.string().trim().min(2, config.audit.errors.name).max(120, config.audit.errors.nameLength),
  email: z.string().trim().email(config.audit.errors.email).max(254, config.audit.errors.email),
  website: z.string().trim().url(config.audit.errors.website).refine(value => { try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; } }, config.audit.errors.website),
  budget: z.string().refine(value => config.audit.budgets.some(budget => budget === value), config.audit.errors.budget),
});
export type AuditValues = z.infer<typeof auditSchema>;
