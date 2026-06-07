"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Lock, Star, Zap } from "lucide-react";
import CountdownTimer, { useCountdown } from "@/components/CountdownTimer";
import Link from "next/link";

const CHECKOUT_URL = "/checkout";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "#0f0a1e", borderBottom: "1px solid rgba(124,58,237,0.18)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center">
        <img
          src="/elevate-media-logo.svg"
          alt="Elevate Media"
          style={{ height: "36px", width: "auto" }}
        />
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { expired } = useCountdown();

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16"
      style={{ backgroundColor: "#0f0a1e" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">

        {/* Headline */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="font-black leading-tight tracking-tight text-center"
            style={{ fontSize: "clamp(28px, 6vw, 50px)", color: "#ffffff" }}
          >
            Land a Remote Job That{" "}
            <span style={{ color: "#a78bfa" }}>Pays in USD</span>{" "}
            in 7 Days
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-center max-w-sm" style={{ color: "#9ca3af" }}>
            A step-by-step PDF system for India-based professionals. Job boards, search templates, and daily checklists. All in one place.
          </p>
        </div>

        {/* Offer section */}
        {!expired ? (
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(124,58,237,0.5)", backgroundColor: "rgba(124,58,237,0.08)" }}
          >
            {/* Top strip */}
            <div
              className="flex items-center justify-center gap-2 px-4 py-2"
              style={{ backgroundColor: "rgba(124,58,237,0.25)" }}
            >
              <Zap size={12} style={{ color: "#c4b5fd" }} />
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#c4b5fd" }}>
                Early bird offer
              </span>
            </div>
            {/* Timer row */}
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>Price goes up in</p>
                <CountdownTimer variant="inline" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white">&#8377;99</p>
                <p className="text-xs line-through" style={{ color: "#6b7280" }}>&#8377;1,599</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full max-w-sm rounded-xl px-5 py-3 flex items-center justify-between"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span className="text-sm" style={{ color: "#6b7280" }}>Standard pricing</span>
            <div className="text-right">
              <p className="text-xl font-black text-white">&#8377;149</p>
              <p className="text-xs line-through" style={{ color: "#4b5563" }}>&#8377;1,599</p>
            </div>
          </div>
        )}

        {/* Social proof */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#f59e0b" style={{ color: "#f59e0b" }} />)}
          </div>
          <span className="text-xs" style={{ color: "#9ca3af" }}>4.6 stars · 567 readers</span>
        </div>

        {/* CTA */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          <a
            href={CHECKOUT_URL}
            className="block w-full py-4 rounded-xl font-bold text-white text-lg text-center"
            style={{ backgroundColor: "#7c3aed", boxShadow: "0 6px 28px rgba(124,58,237,0.45)" }}
          >
            Get Instant Access · &#8377;{expired ? "149" : "99"}
          </a>
          <p className="text-xs text-center flex items-center justify-center gap-1" style={{ color: "#4b5563" }}>
            <Lock size={10} /> Razorpay · Instant PDF delivery
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── What You Get ─────────────────────────────────────────────────────────────

function WhatYouGet() {
  const items = [
    { icon: "📋", text: "28 curated job boards with usage notes for each" },
    { icon: "🔍", text: "35+ copy-paste search strings for USD-paying remote roles" },
    { icon: "✅", text: "42-task daily checklist, 6 clear actions per day" },
    { icon: "📅", text: "7-day structured plan from profile setup to first applications" },
    { icon: "📈", text: "Week 2 scaling framework to double down on what works" },
    { icon: "💡", text: "7 expert tips on ATS, outreach, salary benchmarking" },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-center mb-6" style={{ color: "#111827" }}>
          Everything inside the PDF
        </h2>
        <ul className="space-y-3">
          {items.map(({ icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm" style={{ color: "#374151" }}>
              <span className="text-lg flex-shrink-0 leading-tight">{icon}</span>
              <span className="leading-snug">{text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href={CHECKOUT_URL}
            className="block w-full py-4 rounded-xl font-bold text-white text-center text-base"
            style={{ backgroundColor: "#7c3aed" }}
          >
            Get the PDF · &#8377;99
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const quotes = [
    { quote: "Got my first US recruiter call on Day 5. The structure changed everything.", name: "Priya M.", role: "Bangalore" },
    { quote: "The search strings alone saved me hours. I had no idea how to filter for USD roles.", name: "Aditya R.", role: "Hyderabad" },
    { quote: "My ATS score went from 42% to 81% in one afternoon using the Day 3 tips.", name: "Neha S.", role: "Pune" },
  ];

  return (
    <section className="py-12 px-4" style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-center mb-6" style={{ color: "#111827" }}>What readers say</h2>
        <div className="space-y-3">
          {quotes.map(({ quote, name, role }) => (
            <div key={name} className="bg-white rounded-xl border p-4" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#f59e0b" style={{ color: "#f59e0b" }} />)}
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "#374151" }}>&ldquo;{quote}&rdquo;</p>
              <p className="text-xs font-semibold" style={{ color: "#6b7280" }}>{name} · {role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  const { expired, minutes, seconds } = useCountdown();

  return (
    <section className="py-12 px-4" style={{ backgroundColor: "#0f0a1e" }}>
      <div className="max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-black text-white mb-6">One payment. Keep it forever.</h2>

        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${expired ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.5)"}` }}
        >
          {/* Price */}
          <div className="flex items-end justify-center gap-3 mb-2">
            <span className="text-6xl font-black text-white">&#8377;{expired ? "149" : "99"}</span>
            <span className="text-xl line-through pb-2" style={{ color: "#4b5563" }}>&#8377;1,599</span>
          </div>

          {!expired ? (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}
            >
              <span>⏱</span> Offer ends in{" "}
              <span className="font-black tabular-nums">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          ) : (
            <p className="text-xs mb-4" style={{ color: "#6b7280" }}>One-time payment · Instant download</p>
          )}

          <ul className="space-y-2.5 text-left mb-6">
            {[
              "Full 7-day PDF guide (12 pages)",
              "28 curated job boards",
              "35+ copy-paste search strings",
              "42-task daily checklist",
              "Week 2 scaling framework",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white">
                <Check size={14} style={{ color: "#4ade80" }} strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <a
            href={CHECKOUT_URL}
            className="block w-full py-4 rounded-xl font-bold text-white text-center text-base"
            style={{ backgroundColor: "#7c3aed", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
          >
            Get Instant Access for &#8377;{expired ? "149" : "99"}
          </a>

          <p className="text-xs mt-3 flex items-center justify-center gap-1" style={{ color: "#4b5563" }}>
            <Lock size={10} /> Secure checkout · Instant PDF delivery
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "Who is this for?", a: "Any professional with 2+ years of experience in any function: engineering, design, data, marketing, finance, operations, and more. Every search template uses a [your role] placeholder you fill in yourself." },
  { q: "Will US companies hire someone based in India?", a: "Yes. The guide targets remote-first startups and scale-ups that actively hire globally, with no visa sponsorship required. Every job board and search string is filtered for this." },
  { q: "How do I get the guide after paying?", a: "Instantly. We email your download link the moment payment is confirmed. Check spam if you don't see it within 2 minutes." },
  { q: "What payment methods are accepted?", a: "UPI (GPay, PhonePe, Paytm), credit and debit cards, and netbanking — via Razorpay." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-center mb-6" style={{ color: "#111827" }}>Questions</h2>
        <div className="space-y-2">
          {faqs.map(({ q, a }, idx) => (
            <div key={q} className="rounded-xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
              <button
                className="w-full flex items-center justify-between px-4 py-4 text-left font-semibold text-sm"
                style={{ color: "#111827" }}
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="pr-3">{q}</span>
                {open === idx
                  ? <ChevronUp size={16} className="flex-shrink-0" style={{ color: "#7c3aed" }} />
                  : <ChevronDown size={16} className="flex-shrink-0" style={{ color: "#7c3aed" }} />}
              </button>
              {open === idx && (
                <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { expired } = useCountdown();

  return (
    <section className="py-12 px-4 text-center" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)" }}>
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Start your search the right way</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>7 days. One clear plan. Your next remote role.</p>
        <a
          href={CHECKOUT_URL}
          className="block w-full py-4 rounded-xl font-bold text-lg"
          style={{ backgroundColor: "#ffffff", color: "#7c3aed" }}
        >
          Get the PDF · &#8377;{expired ? "149" : "99"}
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-6 px-4 text-center text-xs" style={{ backgroundColor: "#0a0614", color: "#4b5563" }}>
      <p className="mb-1">
        &copy; 2026 Elevate Media &nbsp;&middot;&nbsp;
        <Link href="/privacy-policy" style={{ color: "#7c3aed" }}>Privacy Policy</Link>
      </p>
      <p>
        <a href="mailto:elevate.media159@gmail.com" style={{ color: "#7c3aed" }}>
          elevate.media159@gmail.com
        </a>
      </p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhatYouGet />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
