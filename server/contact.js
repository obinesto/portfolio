"use server";

import { deliverContact } from "@/lib/contact.mjs";

export async function sendContact(previousState, formData) {
  return deliverContact(formData, { env: process.env });
}
