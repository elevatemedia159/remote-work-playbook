import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendDeliveryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  // Step 1 — verify HMAC signature
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  // Step 2 — fetch payment details from Razorpay to get name & email
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  let paymentDetails: { email?: string; contact?: string; description?: string } = {};
  try {
    paymentDetails = await razorpay.payments.fetch(razorpay_payment_id) as { email?: string; contact?: string; description?: string };
  } catch (e) {
    console.error("Razorpay payment fetch error:", e);
    // Don't fail — continue with empty name/email
  }

  const email = (paymentDetails.email ?? "").trim().toLowerCase();
  const name = email.split("@")[0] ?? "there"; // fallback name from email prefix

  // Step 3 — save lead to Supabase
  if (email) {
    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase.from("leads").upsert(
      {
        email,
        name,
        source: "remote-work-playbook",
        paid: true,
        payment_id: razorpay_payment_id,
        razorpay_order_id,
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      { onConflict: "email", ignoreDuplicates: false }
    );
    if (dbError) console.error("Supabase upsert error:", dbError);
  }

  // Step 4 — send delivery email
  if (email) {
    try {
      await sendDeliveryEmail(name, email);
    } catch (e) {
      console.error("Email send error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
