"use client";

import { useState } from "react";
import { useCountdown } from "@/components/CountdownTimer";
import Link from "next/link";

const CHECKOUT_URL = "/checkout";

// ─── Inline SVG Logo ─────────────────────────────────────────────────────────

function ElevateMediaLogo({ small = false }: { small?: boolean }) {
  const scale = small ? 0.8 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * scale }}>
      <svg width={28 * scale} height={28 * scale} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="4,22 14,13 24,22" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polyline points="4,15 14,6  24,15" stroke="#9061f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polyline points="4,8  14,-1 24,8"  stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 * scale, color: "#ffffff", letterSpacing: "0.12em" }}>ELEVATE</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 8 * scale, color: "#a78bfa", letterSpacing: "0.2em", marginTop: 2 }}>MEDIA</span>
      </div>
    </div>
  );
}

// ─── Star rating ─────────────────────────────────────────────────────────────

function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill="#f59e0b">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95L5 8.42 2 5.5l4.15-.75z"/>
        </svg>
      ))}
    </span>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: "rgba(15,10,30,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      height: 56,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <ElevateMediaLogo />
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { expired, minutes, seconds } = useCountdown();
  const price = expired ? "149" : "99";

  return (
    <section style={{
      backgroundColor: "var(--bg-dark)",
      paddingTop: 72,
      paddingBottom: 56,
      paddingLeft: 20,
      paddingRight: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 45% at 50% 20%, rgba(124,58,237,0.2) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>

        {/* Trust badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 999,
          backgroundColor: "rgba(124,58,237,0.15)",
          border: "1px solid rgba(124,58,237,0.3)",
          fontFamily: "var(--font-body)", fontSize: 12, color: "#a78bfa",
        }}>
          🇮🇳 <span>Built for India professionals targeting USD roles</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(30px, 8vw, 40px)",
          lineHeight: 1.15, color: "#ffffff", margin: 0,
        }}>
          Land a Remote Job That{" "}
          <span style={{ color: "#a78bfa" }}>Pays in USD</span>{" "}
          in 7 Days
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: "var(--font-body)", fontWeight: 400,
          fontSize: 15, color: "#94a3b8", lineHeight: 1.6,
          margin: 0, maxWidth: 340,
        }}>
          A structured day-by-day system. Not vague advice. Built specifically for India-based professionals.
        </p>

        {/* Offer card */}
        <div style={{
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(124,58,237,0.35)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 0 40px rgba(124,58,237,0.12)",
        }}>
          {/* Top strip */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "rgba(124,58,237,0.2)",
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12, color: "#a78bfa" }}>
              ⚡ Early Bird Price
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#f59e0b" }}>
              {expired ? "Offer ends soon" : `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`}
            </span>
          </div>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 4px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 16, color: "#64748b", textDecoration: "line-through" }}>
                &#8377;1,599
              </span>
              <span style={{
                marginLeft: 8, fontSize: 11, fontWeight: 500, color: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.12)", padding: "2px 8px", borderRadius: 999,
              }}>
                Save &#8377;1,{expired ? "450" : "500"}
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 42, color: "#ffffff", lineHeight: 1 }}>
              &#8377;{price}
            </span>
          </div>

          {/* CTA inside card */}
          <div style={{ padding: "12px 16px 16px" }}>
            <a href={CHECKOUT_URL} className="cta-btn cta-btn--pulse">
              Get the PDF · &#8377;{price}
            </a>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#64748b", textAlign: "center", marginTop: 10 }}>
              🔒 Razorpay secured · Instant PDF delivery · No account needed
            </p>
          </div>
        </div>

        {/* Social proof bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Stars size={14} />
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "#94a3b8" }}>
            4.6 stars · 567 readers
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── What's Inside ────────────────────────────────────────────────────────────

function WhatsInside() {
  const { expired } = useCountdown();
  const price = expired ? "149" : "99";

  const items = [
    { icon: "📅", text: "7-day day-by-day job search plan — zero guesswork" },
    { icon: "🌐", text: "28 curated remote job boards with usage notes" },
    { icon: "🔍", text: "35+ copy-paste search strings, ready to use" },
    { icon: "✅", text: "42 specific daily tasks across 7 focused days" },
    { icon: "🇮🇳", text: "Built specifically for India-based professionals" },
    { icon: "⚡", text: "Instant PDF download, keep it forever" },
  ];

  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#0f172a", textAlign: "center", marginBottom: 32 }}>
          What&apos;s Inside
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map(({ icon, text }, i) => (
            <li key={text} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 0",
              borderBottom: i < items.length - 1 ? "1px solid #e2e8f0" : "none",
            }}>
              <span style={{ fontSize: 20, lineHeight: 1.2, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: "#1e293b", lineHeight: 1.5 }}>{text}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 32 }}>
          <a href={CHECKOUT_URL} className="cta-btn" style={{ maxWidth: "100%" }}>
            Get the PDF · &#8377;{price}
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>
            &#8377;1,599 &rarr; &#8377;{price} today
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

function SocialProof() {
  const testimonials = [
    { quote: "Got my first USD remote interview within 9 days of following the plan. The search strings saved me hours.", name: "Priya R.", city: "Bengaluru" },
    { quote: "I applied for 3 months with no replies. This system changed how I search completely.", name: "Arjun M.", city: "Hyderabad" },
    { quote: "Worth 10x the price. The job boards list alone is something I could not find anywhere else.", name: "Sneha K.", city: "Pune" },
  ];

  return (
    <section style={{ backgroundColor: "var(--bg-dark)", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "#ffffff", textAlign: "center", marginBottom: 28 }}>
          What readers are saying
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {testimonials.map(({ quote, name, city }) => (
            <div key={name} style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 20,
            }}>
              <Stars size={14} />
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 15, color: "#e2e8f0", lineHeight: 1.6, margin: "12px 0 12px" }}>
                &ldquo;{quote}&rdquo;
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "#a78bfa", margin: 0 }}>
                {name} · {city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  const { expired } = useCountdown();
  const price = expired ? "149" : "99";

  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <div style={{
          backgroundColor: "#ffffff",
          border: "2px solid #7c3aed",
          borderRadius: 20,
          padding: "32px 24px",
          boxShadow: "0 8px 40px rgba(124,58,237,0.1)",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#0f172a", margin: "0 0 16px" }}>
            Remote Work Playbook v2
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#94a3b8", textDecoration: "line-through", margin: "0 0 4px" }}>
            &#8377;1,599
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 52, color: "#7c3aed", lineHeight: 1, margin: "0 0 4px" }}>
            &#8377;{price}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b", margin: "0 0 24px" }}>
            One-time · Instant download
          </p>

          <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "7-day structured daily plan",
              "28 curated remote job boards",
              "35+ copy-paste search strings",
              "42 specific daily tasks",
              "Instant PDF — yours to keep",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, color: "#1e293b" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="rgba(124,58,237,0.12)"/>
                  <polyline points="5,9 7.5,11.5 13,6.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a href={CHECKOUT_URL} className="cta-btn">
            Get the PDF · &#8377;{price}
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 12 }}>
            🔒 Secured by Razorpay
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is this a course or a video?",
      a: "No. It is a 12-page PDF you download instantly. No login, no app, no waiting.",
    },
    {
      q: "Will this work if I have no remote experience?",
      a: "Yes — it is built for India-based professionals with 2+ years of any work experience who want to transition into remote USD-paying roles.",
    },
    {
      q: "How do I get the PDF after paying?",
      a: "Instantly — you will receive a download link via email within 2 minutes of payment. Check spam if you do not see it.",
    },
    {
      q: "What payment methods are accepted?",
      a: "UPI (GPay, PhonePe, Paytm), credit and debit cards, and netbanking — all via Razorpay.",
    },
  ];

  return (
    <section style={{ backgroundColor: "var(--bg-dark)", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "#ffffff", textAlign: "center", marginBottom: 28 }}>
          Common questions
        </h2>
        <div>
          {faqs.map(({ q, a }, idx) => (
            <div key={q} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 0", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: "#ffffff",
                  textAlign: "left", gap: 12,
                }}
              >
                <span>{q}</span>
                <span style={{ color: "#a78bfa", fontSize: 22, flexShrink: 0, lineHeight: 1 }}>
                  {open === idx ? "−" : "+"}
                </span>
              </button>
              {open === idx && (
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 14, color: "#94a3b8", lineHeight: 1.7, paddingBottom: 18, margin: 0 }}>
                  {a}
                </p>
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
  const price = expired ? "149" : "99";

  return (
    <section style={{
      background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #6d28d9 100%)",
      padding: "64px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,5vw,28px)", color: "#ffffff", lineHeight: 1.2, marginBottom: 28 }}>
          Your 7-day plan to a USD remote job starts today
        </h2>
        <a href={CHECKOUT_URL} style={{
          display: "block", width: "100%", height: 56,
          backgroundColor: "#ffffff", color: "#7c3aed",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
          borderRadius: 12, lineHeight: "56px", textDecoration: "none",
          transition: "box-shadow 0.15s ease",
        }}>
          Get the PDF · &#8377;{price}
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--bg-dark)",
      padding: "32px 24px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
    }}>
      <div style={{ marginBottom: 16 }}>
        <ElevateMediaLogo small />
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#64748b", margin: "0 0 8px" }}>
        &copy; 2026 Elevate Media. All rights reserved.
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#64748b", margin: 0 }}>
        <Link href="/privacy-policy" style={{ color: "#64748b", textDecoration: "underline" }}>Privacy Policy</Link>
        {" · "}
        <a href="mailto:elevate.media159@gmail.com" style={{ color: "#64748b", textDecoration: "underline" }}>elevate.media159@gmail.com</a>
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
      <WhatsInside />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
