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
        <span style={{ fontWeight: 700, fontSize: 14 * scale, color: "#ffffff", letterSpacing: "0.12em" }}>ELEVATE</span>
        <span style={{ fontWeight: 700, fontSize: 8 * scale, color: "#a78bfa", letterSpacing: "0.2em", marginTop: 2 }}>MEDIA</span>
      </div>
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={i < 4 ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={i === 4 ? "1.5" : "0"}>
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
      backgroundColor: "#0f0a1e",
      paddingTop: 72, paddingBottom: 56,
      paddingLeft: 20, paddingRight: 20,
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", position: "relative",
    }}>
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
          fontSize: 12, color: "#a78bfa", fontWeight: 500,
        }}>
          🇮🇳 Made in India · For India professionals chasing USD pay
        </div>

        {/* Headline */}
        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(28px, 7vw, 40px)",
          lineHeight: 1.15, color: "#ffffff", margin: 0,
        }}>
          Land a Remote Job That{" "}
          <span style={{ color: "#a78bfa" }}>Pays in USD</span>{" "}
          in 7 Focused Days
        </h1>

        {/* Subheadline */}
        <p style={{
          fontWeight: 400, fontSize: 15, color: "#94a3b8",
          lineHeight: 1.65, margin: 0, maxWidth: 360,
        }}>
          A day-by-day system you actually follow. No vague advice, no fluff. Just the exact steps, boards, and scripts to land remote roles that pay in dollars.
        </p>

        {/* Offer card */}
        <div style={{
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(124,58,237,0.35)",
          borderRadius: 16, overflow: "hidden",
          boxShadow: "0 0 40px rgba(124,58,237,0.12)",
        }}>
          {/* Top strip */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "rgba(124,58,237,0.2)",
          }}>
            <span style={{ fontWeight: 500, fontSize: 12, color: "#a78bfa" }}>
              ⚡ Launch Price
            </span>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#f59e0b" }}>
              {expired ? "Offer ends soon" : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
            </span>
          </div>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 4px" }}>
            <div>
              <span style={{ fontWeight: 400, fontSize: 15, color: "#64748b", textDecoration: "line-through" }}>
                &#8377;1,599
              </span>
              <span style={{
                marginLeft: 8, fontSize: 11, fontWeight: 600, color: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.12)", padding: "2px 8px", borderRadius: 999,
              }}>
                Save &#8377;1,500
              </span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 42, color: "#ffffff", lineHeight: 1 }}>
              &#8377;{price}
            </span>
          </div>

          {/* CTA */}
          <div style={{ padding: "12px 16px 16px" }}>
            <a href={CHECKOUT_URL} className="cta-btn cta-btn--pulse">
              Get Instant Access · &#8377;{price}
            </a>
            <p style={{ fontSize: 12, color: "#64748b", textAlign: "center", marginTop: 10, fontWeight: 400 }}>
              🔒 Razorpay secured · PDF in your inbox in 2 minutes · No account needed
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Stars size={14} />
          <span style={{ fontWeight: 500, fontSize: 13, color: "#94a3b8" }}>
            4.6 stars · 567 readers and counting
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
    { icon: "📅", text: "A 7-day plan broken into daily steps. Open it, do the task, move on." },
    { icon: "🌐", text: "28 hand-picked remote job boards, each with notes on how to use it." },
    { icon: "🔍", text: "35+ copy-paste search strings that surface USD roles most people never find." },
    { icon: "✅", text: "42 specific daily tasks, so you always know exactly what to do next." },
    { icon: "🇮🇳", text: "Written for India-based professionals, not recycled US advice." },
    { icon: "⚡", text: "Instant PDF download, yours to keep and re-use for every job hunt." },
  ];

  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, color: "#0f172a", textAlign: "center", marginBottom: 32 }}>
          Everything You Get for &#8377;{price}
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map(({ icon, text }, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 0",
              borderBottom: i < items.length - 1 ? "1px solid #e2e8f0" : "none",
            }}>
              <span style={{ fontSize: 20, lineHeight: 1.3, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontWeight: 500, fontSize: 15, color: "#1e293b", lineHeight: 1.55 }}>{text}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 32 }}>
          <a href={CHECKOUT_URL} className="cta-btn">
            Get Instant Access · &#8377;{price}
          </a>
          <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginTop: 10, fontWeight: 400 }}>
            <span style={{ textDecoration: "line-through" }}>&#8377;1,599</span> &rarr; &#8377;{price} today
          </p>
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
    <section style={{ backgroundColor: "#0f0a1e", padding: "56px 24px" }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <div style={{
          backgroundColor: "#ffffff",
          border: "2px solid #7c3aed",
          borderRadius: 20, padding: "32px 24px",
          boxShadow: "0 8px 40px rgba(124,58,237,0.15)",
        }}>
          <p style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", margin: "0 0 16px" }}>
            Remote Work Playbook v2
          </p>
          <p style={{ fontSize: 15, color: "#94a3b8", textDecoration: "line-through", margin: "0 0 4px", fontWeight: 400 }}>
            &#8377;1,599
          </p>
          <p style={{ fontWeight: 800, fontSize: 52, color: "#7c3aed", lineHeight: 1, margin: "0 0 4px" }}>
            &#8377;{price}
          </p>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 400 }}>
            One-time payment · Instant download · No subscription
          </p>

          <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "7-day structured daily plan",
              "28 curated remote job boards",
              "35+ copy-paste search strings",
              "42 specific daily tasks",
              "Instant PDF, yours to keep forever",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500, fontSize: 14, color: "#1e293b" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="rgba(124,58,237,0.12)"/>
                  <polyline points="5,9 7.5,11.5 13,6.5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a href={CHECKOUT_URL} className="cta-btn">
            Get Instant Access · &#8377;{price}
          </a>
          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 12, fontWeight: 400 }}>
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
      a: "No. It's a focused 12-page PDF you download the moment you pay. No login, no app, no 3-hour video to sit through. Just open it and start.",
    },
    {
      q: "Will this work if I have no remote experience?",
      a: "Yes. It's built for India-based professionals with 2+ years of any work experience who want to move into remote, USD-paying roles. You don't need prior remote experience. That's exactly what the plan is for.",
    },
    {
      q: "How do I get the PDF after paying?",
      a: "Instantly. A download link lands in your email within 2 minutes of payment. Don't see it? Check spam or promotions, and if it's still missing, email us and we'll send it straight to you.",
    },
    {
      q: "What payment methods are accepted?",
      a: "UPI (GPay, PhonePe, Paytm), credit and debit cards, and netbanking, all handled securely through Razorpay.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, color: "#0f172a", textAlign: "center", marginBottom: 28 }}>
          Common questions
        </h2>
        <div>
          {faqs.map(({ q, a }, idx) => (
            <div key={q} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 0", background: "none", border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 15, color: "#0f172a", textAlign: "left", gap: 12,
                }}
              >
                <span>{q}</span>
                <span style={{ color: "#7c3aed", fontSize: 22, flexShrink: 0, lineHeight: 1 }}>
                  {open === idx ? "−" : "+"}
                </span>
              </button>
              {open === idx && (
                <p style={{ fontWeight: 400, fontSize: 14, color: "#64748b", lineHeight: 1.7, paddingBottom: 18, margin: 0 }}>
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
      padding: "64px 24px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(20px,5vw,26px)", color: "#ffffff", lineHeight: 1.25, marginBottom: 12 }}>
          Stop Applying Into the Void. Start a Real Plan Today.
        </h2>
        <p style={{ fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.6 }}>
          567 readers already have. Your 7 days begin the moment you download.
        </p>
        <a href={CHECKOUT_URL} style={{
          display: "block", width: "100%", height: 56,
          backgroundColor: "#ffffff", color: "#7c3aed",
          fontWeight: 700, fontSize: 17,
          borderRadius: 12, lineHeight: "56px", textDecoration: "none",
        }}>
          Get Instant Access · &#8377;{price}
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#0f0a1e", padding: "32px 24px",
      borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center",
    }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
        <ElevateMediaLogo small />
      </div>
      <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 8px", fontWeight: 400 }}>
        &copy; 2026 Elevate Media. All rights reserved.
      </p>
      <p style={{ fontSize: 12, color: "#64748b", margin: 0, fontWeight: 400 }}>
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
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
