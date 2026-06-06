import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getSupabaseAdmin } from "@/lib/supabase";

const OFFER_PRICE_PAISE   = 9900;  // ₹99
const REGULAR_PRICE_PAISE = 14900; // ₹149
const OFFER_DURATION_MS   = 10 * 60 * 1000;
const CURRENCY = "INR";

function resolveAmount(offerStartTime: number | null): number {
  if (!offerStartTime || typeof offerStartTime !== "number") return REGULAR_PRICE_PAISE;
  if (offerStartTime > Date.now()) return REGULAR_PRICE_PAISE;
  return Date.now() - offerStartTime < OFFER_DURATION_MS ? OFFER_PRICE_PAISE : REGULAR_PRICE_PAISE;
}

export async function POST(req: NextRequest) {
  const { name, email, offerStartTime, utmSource } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const amount = resolveAmount(offerStartTime);
  const amountRupees = amount / 100;

  // Capture country from Vercel edge headers
  const ipCountry = req.headers.get("x-vercel-ip-country") ?? null;

  // Save / update lead in Supabase
  const supabase = getSupabaseAdmin();
  const { error: dbError } = await supabase.from("leads").upsert(
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      source: "remote-work-playbook",
      ip_country: ipCountry,
      utm_source: utmSource ?? null,
      created_at: new Date().toISOString(),
    },
    { onConflict: "email", ignoreDuplicates: false }
  );
  if (dbError) console.error("Supabase upsert error:", dbError);

  // Create Razorpay order
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  let order;
  try {
    order = await razorpay.orders.create({
      amount,
      currency: CURRENCY,
      receipt: `receipt_${Date.now()}`,
    });
  } catch (e) {
    console.error("Razorpay order error:", e);
    return NextResponse.json({ error: "Could not initiate payment. Please try again." }, { status: 500 });
  }

  // Store order ID and expected amount against the lead
  await supabase
    .from("leads")
    .update({ razorpay_order_id: order.id, amount_paid: amountRupees })
    .eq("email", email.trim().toLowerCase());

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
