import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const PRICE_PAISE = 2900; // ₹29
const CURRENCY = "INR";

export async function POST(req: NextRequest) {
  const { utmSource } = await req.json().catch(() => ({}));

  // Capture country from Vercel edge headers
  const ipCountry = req.headers.get("x-vercel-ip-country") ?? null;

  // Create Razorpay order
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  let order;
  try {
    order = await razorpay.orders.create({
      amount: PRICE_PAISE,
      currency: CURRENCY,
      receipt: `receipt_${Date.now()}`,
      notes: {
        utm_source: utmSource ?? "",
        ip_country: ipCountry ?? "",
      },
    });
  } catch (e) {
    console.error("Razorpay order error:", e);
    return NextResponse.json({ error: "Could not initiate payment. Please try again." }, { status: 500 });
  }

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
