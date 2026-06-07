"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { Check, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const pricingIncludes = [
  "Full 7-day PDF guide (print-ready, 12 pages)",
  "28 curated job boards with usage notes",
  "35+ copy-paste search strings",
  "42-task daily checklist system",
  "Week 2 planning framework",
];

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const displayPrice = "99";

  // Load Razorpay script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Step 1 — create order + save lead
    let orderData;
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            utmSource: utmSource ?? null,
          }),
      });
      orderData = await res.json();
      if (!res.ok) {
        setError(orderData.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
      return;
    }

    // Step 2 — open Razorpay modal
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Elevate Media",
      description: "The Remote Work Playbook – Updated June 2026",
      order_id: orderData.orderId,
      prefill: { name, email },
      theme: { color: "#7c3aed" },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setError("Payment was cancelled. You can try again whenever you are ready.");
        },
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        // Step 3 — verify payment server-side
        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name,
              email,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || "Payment verification failed. Please contact support.");
            setLoading(false);
            return;
          }
          // Step 4 — store for analytics then redirect
          localStorage.setItem("rwp_payment_id", response.razorpay_payment_id);
          localStorage.setItem("rwp_amount_paid", String(orderData.amount / 100));
          router.push("/thank-you");
        } catch {
          setError("Could not verify payment. Please contact support.");
          setLoading(false);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0f0a1e" }}>
      {/* Nav */}
      <nav className="border-b px-4 py-4" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polyline points="4,22 14,13 24,22" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="4,15 14,6  24,15" stroke="#9061f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="4,8  14,-1 24,8"  stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#ffffff", letterSpacing: "0.12em" }}>ELEVATE</span>
                <span style={{ fontWeight: 700, fontSize: 8, color: "#a78bfa", letterSpacing: "0.2em", marginTop: 2 }}>MEDIA</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6b7280" }}>
            <Lock size={12} style={{ color: "#16a34a" }} />
            <span>Secure checkout</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Single unified block */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderColor: "rgba(124,58,237,0.45)",
            }}
          >
            {/* Top — product summary */}
            <div className="p-6 sm:p-8 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="mb-4">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(124,58,237,0.25)", color: "#c4b5fd" }}
                >
                  LIMITED TIME OFFER
                </span>
              </div>

              <h2 className="text-white font-black text-xl mb-1">
                The Remote Work Playbook – Updated June 2026
              </h2>
              <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>
                By Elevate Media &nbsp;&middot;&nbsp; Instant PDF download
              </p>

              <div className="flex items-end gap-3 mb-5">
                <span className="text-5xl font-black text-white">&#8377;{displayPrice}</span>
                <span className="text-sm pb-1 line-through" style={{ color: "#6b7280" }}>&#8377;1,599</span>
                <span className="text-sm pb-1 font-semibold" style={{ color: "#4ade80" }}>94% off</span>
              </div>

              <ul className="space-y-3 mb-4">
                {pricingIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#d1d5db" }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#16a34a" }}
                    >
                      <Check size={11} color="white" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {["Instant delivery", "No subscription"].map((t) => (
                  <span key={t} className="text-xs flex items-center gap-1" style={{ color: "#6b7280" }}>
                    <Check size={10} style={{ color: "#16a34a" }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom — form */}
            <div className="p-6 sm:p-8">
              <h1 className="text-white font-black text-2xl mb-1">You&apos;re One Step Away</h1>
              <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                Enter your details and complete payment securely via Razorpay. Your PDF is delivered the moment payment clears.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-base text-white placeholder-gray-500 outline-none transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(124,58,237,0.35)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7c3aed")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-base text-white placeholder-gray-500 outline-none transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(124,58,237,0.35)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#7c3aed")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)")}
                  />
                  <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
                    We&apos;ll send your PDF here, so double-check it&apos;s correct.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div
                    className="rounded-lg px-4 py-3 text-sm"
                    style={{
                      backgroundColor: "rgba(239,68,68,0.12)",
                      color: "#fca5a5",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-white text-base transition-opacity disabled:opacity-70"
                  style={{ backgroundColor: "#7c3aed" }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Opening payment...
                    </>
                  ) : (
                    <>
                      Pay &#8377;{displayPrice} Securely
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center flex items-center justify-center gap-1" style={{ color: "#6b7280" }}>
                  <Lock size={11} />
                  Powered by Razorpay &middot; 256-bit SSL encryption
                </p>
              </form>
            </div>
          </div>

          <p className="text-xs text-center mt-4">
            <Link href="/" className="hover:underline" style={{ color: "#7c3aed" }}>
              &larr; Back to the sales page
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-6 px-4 text-center text-xs border-t"
        style={{ color: "#4b5563", borderColor: "rgba(255,255,255,0.06)" }}
      >
        &copy; 2026 Elevate Media &nbsp;&middot;&nbsp; RemoteWork Playbook &nbsp;&middot;&nbsp;
        <a href="mailto:elevate.media159@gmail.com" style={{ color: "#7c3aed" }}>elevate.media159@gmail.com</a>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
