import { createHash } from "node:crypto";
import { renderContactEmail } from "./contact-email.mjs";

const failureMessage =
  "Your message could not be sent. Please try again, or email me directly.";

export function parseContact(formData) {
  const read = (key) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const values = {
    name: read("name"),
    email: read("email"),
    message: read("message"),
  };
  const errors = {};
  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = "Enter a name between 2 and 100 characters.";
  }
  if (
    values.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address so I can reply.";
  }
  if (values.message.length < 20 || values.message.length > 5000) {
    errors.message = "Write a message between 20 and 5,000 characters.";
  }
  return { values, errors, spam: Boolean(read("website")) };
}

export async function deliverContact(
  formData,
  { env, fetcher = fetch, now = Date.now() },
) {
  if (!(formData instanceof FormData)) {
    return {
      status: "error",
      message: "Please refresh the page and try sending your message again.",
      errors: {},
    };
  }
  const { values, errors, spam } = parseContact(formData);
  if (spam) {
    return {
      status: "error",
      message: "Please leave the website field empty.",
      errors: {},
    };
  }
  if (Object.keys(errors).length) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
    return { status: "error", message: failureMessage, errors: {} };
  }

  // Repeated submissions within this window share a provider idempotency key.
  const fingerprint = createHash("sha256")
    .update(JSON.stringify([values, Math.floor(now / 300000)]))
    .digest("hex");
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-${fingerprint}`,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: ["obicyprian180@gmail.com"],
        reply_to: values.email,
        subject: "New portfolio enquiry",
        html: renderContactEmail(values),
        text: `From: ${values.name}\nReply to: ${values.email}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) {
      return { status: "error", message: failureMessage, errors: {} };
    }
    const receipt = await response.json();
    if (typeof receipt.id !== "string" || !receipt.id) {
      return { status: "error", message: failureMessage, errors: {} };
    }
    return {
      status: "success",
      message:
        "Message sent. You'd get a reply very soon.",
      errors: {},
    };
  } catch {
    return { status: "error", message: failureMessage, errors: {} };
  }
}
