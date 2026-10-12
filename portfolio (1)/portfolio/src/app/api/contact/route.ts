import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{6,30}$/;

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.company, 200) !== "") {
    return NextResponse.json({ error: "Message rejected." }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 2000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number or leave it empty." }, { status: 400 });
  }
  if (!supabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Never claim a message was sent when it was not stored.
    return NextResponse.json(
      { error: "Messaging is not set up yet. Please reach me on WhatsApp for now." },
      { status: 503 },
    );
  }

  const { error } = await createAdminClient()
    .from("leads")
    .insert({ name, email, phone: phone || null, subject, message, source: "portfolio", status: "new" });

  if (error) {
    console.error("Lead insert failed:", error.message);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
