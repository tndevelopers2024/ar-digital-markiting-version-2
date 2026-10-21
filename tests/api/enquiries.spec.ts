import { test, expect } from "@playwright/test";
import { POST } from "../../app/api/enquiries/route";
import { site } from "../../lib/site";
import { config } from "../../lib/config";

const contact = { kind: "contact", company: "", data: { name: "QA Example", email: "qa@example.invalid", service: "Not sure yet", message: "A controlled local test with no remote delivery." } };
const audit = { kind: "audit", company: "", data: { name: "QA Example", email: "qa@example.invalid", website: "https://example.invalid", budget: config.audit.budgets[0] } };
let savedFetch: typeof fetch;
let savedEndpoint: string | undefined;
let savedToken: string | undefined;

test.beforeEach(() => {
  savedFetch = globalThis.fetch;
  savedEndpoint = process.env.ENQUIRY_WEBHOOK_URL;
  savedToken = process.env.ENQUIRY_WEBHOOK_TOKEN;
  process.env.ENQUIRY_WEBHOOK_URL = "https://receiver.example.invalid/enquiries";
  process.env.ENQUIRY_WEBHOOK_TOKEN = "local-test-token";
  globalThis.fetch = async () => { throw new Error("Unexpected network request in API unit test"); };
});

test.afterEach(() => {
  globalThis.fetch = savedFetch;
  if (savedEndpoint === undefined) delete process.env.ENQUIRY_WEBHOOK_URL;
  else process.env.ENQUIRY_WEBHOOK_URL = savedEndpoint;
  if (savedToken === undefined) delete process.env.ENQUIRY_WEBHOOK_TOKEN;
  else process.env.ENQUIRY_WEBHOOK_TOKEN = savedToken;
});

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: { origin: new URL(site.url).origin, "content-type": "application/json", "x-forwarded-for": crypto.randomUUID(), ...headers },
    body: JSON.stringify(body),
  });
}

for (const body of [contact, audit]) {
  test(`server forwards validated ${body.kind} to receiver and confirms acceptance`, async () => {
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      calls++;
      expect(url).toBe("https://receiver.example.invalid/enquiries");
      expect(options?.method).toBe("POST");
      expect(options?.headers).toEqual({ "Content-Type": "application/json", Authorization: "Bearer local-test-token" });
      expect(options?.redirect).toBe("error");
      expect(options?.cache).toBe("no-store");
      expect(options?.signal).toBeInstanceOf(AbortSignal);
      const payload = JSON.parse(String(options?.body));
      expect(payload.kind).toBe(body.kind);
      expect(payload.data).toEqual(body.data);
      expect(payload.id).toMatch(/^[a-f0-9-]{36}$/);
      expect(Number.isNaN(Date.parse(payload.receivedAt))).toBe(false);
      expect(payload.company).toBeUndefined();
      return new Response(null, { status: 202 });
    };
    const response = await POST(request(body));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect((await response.json()).message).toContain("received");
    expect(calls).toBe(1);
  });
}

test("receiver failure is never reported as success", async () => {
  globalThis.fetch = async () => new Response(null, { status: 500 });
  expect((await POST(request(contact))).status).toBe(502);
});

test("network/timeout failure is never reported as success", async () => {
  globalThis.fetch = async () => { throw new DOMException("Timed out", "TimeoutError"); };
  const response = await POST(request(contact));
  expect(response.status).toBe(502);
  expect((await response.json()).message).toContain("confirm delivery");
});

test("missing receiver and insecure receiver fail closed", async () => {
  delete process.env.ENQUIRY_WEBHOOK_TOKEN;
  expect((await POST(request(contact))).status).toBe(503);
  process.env.ENQUIRY_WEBHOOK_TOKEN = "local-test-token";
  process.env.ENQUIRY_WEBHOOK_URL = "http://receiver.example.invalid";
  expect((await POST(request(contact))).status).toBe(503);
});

test("untrusted origins, honeypots, invalid services and unsafe website URLs are rejected", async () => {
  expect((await POST(request(contact, { origin: "https://untrusted.invalid" }))).status).toBe(403);
  expect((await POST(request(contact, { "content-type": "text/plain" }))).status).toBe(415);
  expect((await POST(request({ ...contact, company: "spam" }))).status).toBe(400);
  expect((await POST(request({ ...contact, data: { ...contact.data, service: "unknown" } }))).status).toBe(400);
  expect((await POST(request({ ...audit, data: { ...audit.data, website: "javascript:alert(1)" } }))).status).toBe(400);
});

test("oversized request body is rejected", async () => {
  expect((await POST(request({ ...contact, data: { ...contact.data, message: "x".repeat(17000) } }))).status).toBe(413);
});

test("per-instance rate limit rejects the sixth request", async () => {
  const ip = crypto.randomUUID();
  for (let index = 0; index < 5; index++) expect((await POST(request({}, { "x-forwarded-for": ip }))).status).toBe(400);
  expect((await POST(request({}, { "x-forwarded-for": ip }))).status).toBe(429);
});
