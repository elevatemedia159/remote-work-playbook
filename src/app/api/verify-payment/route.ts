import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendDeliveryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email } =
    await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  // Verify signature
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  // Mark lead as paid in Supabase
  if (email) {
    const supabase = getSupabaseAdmin();
    await supabase
      .from("leads")
      .update({
        paid: true,
        payment_id: razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("email", email.trim().toLowerCase());
  }

  // Send delivery email
  if (name && email) {
    try {
      await sendDeliveryEmail(name, email);
    } catch (e) {
      // Log but don't fail the response — payment is already confirmed
      console.error("Email send error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
