import test from "node:test";
import assert from "node:assert/strict";
import { deliverContact, parseContact } from "../lib/contact.mjs";

function form(overrides = {}) {
  const data = new FormData();
  Object.entries({
    name: "Alex Morgan",
    email: "alex@example.com",
    message: "I would like to discuss a full-stack role.",
    ...overrides,
  }).forEach(([key, value]) => data.set(key, value));
  return data;
}

const env = {
  RESEND_API_KEY: "test-only",
  CONTACT_FROM_EMAIL: "portfolio@example.com",
};

test("validates contact fields and rejects non-text values", () => {
  assert.deepEqual(parseContact(form()).errors, {});
  const result = parseContact(
    form({ name: "x", email: "bad\n@example.com", message: "short" }),
  );
  assert.deepEqual(Object.keys(result.errors), ["name", "email", "message"]);
  assert.ok(parseContact(form({ name: new Blob(["file"]) })).errors.name);
  assert.ok(parseContact(form({ message: "x".repeat(5001) })).errors.message);
});

test("invalid, trapped, and unconfigured requests never call Resend", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls++;
  };
  for (const data of [
    null,
    {},
    form({ website: "bot" }),
    form({ email: "invalid" }),
  ]) {
    assert.equal(
      (await deliverContact(data, { env, fetcher })).status,
      "error",
    );
  }
  assert.equal(
    (await deliverContact(form(), { env: {}, fetcher })).status,
    "error",
  );
  assert.equal(calls, 0);
});

test("sends one owner notification per submission, with visitor reply-to and stable deduplication", async () => {
  const requests = [];
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => ({ id: "receipt" }) };
  };
  for (let index = 0; index < 2; index++) {
    assert.equal(
      (
        await deliverContact(
          form({ message: "<script>untrusted message content</script>" }),
          { env, fetcher, now: 600000 },
        )
      ).status,
      "success",
    );
  }
  const payload = JSON.parse(requests[0].options.body);
  assert.equal(requests.length, 2);
  assert.deepEqual(payload.to, ["obicyprian180@gmail.com"]);
  assert.equal(payload.from, env.CONTACT_FROM_EMAIL);
  assert.equal(payload.reply_to, "alex@example.com");
  assert.equal(typeof payload.html, "string");
  assert.ok(payload.html.includes("Alex Morgan"));
  assert.ok(
    payload.html.includes("&lt;script&gt;untrusted message content&lt;/script&gt;"),
  );
  assert.ok(!payload.html.includes("<script>"));
  assert.ok(payload.text.includes("<script>"));
  assert.equal(
    requests[0].options.headers["Idempotency-Key"],
    requests[1].options.headers["Idempotency-Key"],
  );
});

test("provider failures, malformed receipts, and timeouts give safe retry feedback", async () => {
  for (const fetcher of [
    async () => ({ ok: false }),
    async () => ({ ok: true, json: async () => ({}) }),
    async () => {
      throw new Error("secret provider error");
    },
  ]) {
    const result = await deliverContact(form(), { env, fetcher });
    assert.equal(result.status, "error");
    assert.ok(!JSON.stringify(result).includes("secret"));
  }
});
