"use client";

import { useEffect, useRef, Suspense } from "react";
import { Check, Lock } from "lucide-react";
import Link from "next/link";
import CountdownTimer, { useCountdown } from "@/components/CountdownTimer";

const pricingIncludes = [
  "Full 7-day PDF guide (print-ready, 12 pages)",
  "28 curated job boards with usage notes",
  "35+ copy-paste search strings",
  "42-task daily checklist system",
  "Week 2 planning framework",
];

function RazorpayButton() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_SydNeYrsdI5r1s");
    script.async = true;
    form.appendChild(script);
    return () => {
      if (form.contains(script)) form.removeChild(script);
    };
  }, []);

  return <form ref={formRef} />;
}

function CheckoutContent() {
  const { expired } = useCountdown();
  const displayPrice = expired ? "149" : "99";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0f0a1e" }}>
      <CountdownTimer variant="banner" />

      {/* Nav */}
      <nav className="border-b px-4 py-4" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-extrabold text-lg tracking-tight">
            Remote <span style={{ color: "#a78bfa" }}>Work</span> Playbook
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
                  EARLY BIRD PRICING
                </span>
              </div>

              <h2 className="text-white font-black text-xl mb-1">
                The Remote Work Playbook v2
              </h2>
              <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>
                By Elevate Media &nbsp;&middot;&nbsp; Instant PDF download
              </p>

              <div className="flex items-end gap-3 mb-5">
                <span className="text-5xl font-black text-white">&#8377;{displayPrice}</span>
                <span className="text-sm pb-1 line-through" style={{ color: "#6b7280" }}>&#8377;1,599</span>
                {!expired && (
                  <span className="text-sm pb-1 font-semibold" style={{ color: "#4ade80" }}>84% off</span>
                )}
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

            {/* Bottom — payment button */}
            <div className="p-6 sm:p-8">
              <h1 className="text-white font-black text-2xl mb-1">You&apos;re One Step Away</h1>
              <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                Complete payment securely via Razorpay. Your PDF is delivered the moment payment clears.
              </p>

              <CountdownTimer variant="inline" />

              <div className="mt-4">
                <RazorpayButton />
              </div>

              <p className="text-xs text-center flex items-center justify-center gap-1 mt-4" style={{ color: "#6b7280" }}>
                <Lock size={11} />
                Powered by Razorpay &middot; 256-bit SSL encryption
              </p>
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
