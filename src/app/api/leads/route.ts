import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin().from("leads").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    source: "remote-work-playbook",
    created_at: new Date().toISOString(),
  });

  if (error) {
    // Duplicate email — still let them through to payment
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
