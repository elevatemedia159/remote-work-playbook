"use client";

import { useState } from "react";
import Link from "next/link";

const CHECKOUT_URL = "/checkout";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function ElevateMediaLogo({ small = false }: { small?: boolean }) {
  const scale = small ? 0.8 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * scale }}>
      <svg width={28 * scale} height={28 * scale} viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 14,13 24,22" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="4,15 14,6  24,15" stroke="#9061f9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="4,8  14,-1 24,8"  stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
        <svg key={i} width={size} height={size} viewBox="0 0 16 16"
          fill={i < 4 ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={i === 4 ? "1.5" : "0"}>
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
      backgroundColor: "rgba(15,10,30,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      height: 56, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <ElevateMediaLogo />
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const price = "99";

  return (
    <section style={{
      backgroundColor: "#0f0a1e",
      paddingTop: 72, paddingBottom: 56, paddingLeft: 20, paddingRight: 20,
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 45% at 50% 20%, rgba(124,58,237,0.2) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>

        {/* Headline */}
        <h1 style={{ fontWeight: 800, fontSize: "clamp(26px, 6.5vw, 38px)", lineHeight: 1.2, color: "#ffffff", margin: 0 }}>
          You&apos;re Qualified for USD Remote Roles
          <br />
          <span style={{ color: "#a78bfa", display: "block", marginTop: "0.35em" }}>So Why Is Your Inbox Still Empty?</span>
        </h1>

        {/* Subheadline */}
        <p style={{ fontWeight: 400, fontSize: 16, color: "#94a3b8", lineHeight: 1.65, margin: 0, maxWidth: 380 }}>
          It&apos;s not your skills. It&apos;s your system. This is the exact 7-day plan that gets India-based professionals in front of companies that pay in dollars.
        </p>

        {/* Offer card */}
        <div style={{ width: "100%" }}>
          {/* Limited time label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ display: "block", width: 32, height: 1, backgroundColor: "rgba(167,139,250,0.35)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.14em", textTransform: "uppercase" }}>Limited Time Offer</span>
            <span style={{ display: "block", width: 32, height: 1, backgroundColor: "rgba(167,139,250,0.35)" }} />
          </div>

          {/* Price + CTA block */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: 16,
            padding: "20px 20px 16px",
            boxShadow: "0 0 40px rgba(124,58,237,0.14)",
          }}>
            {/* Price row */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <span style={{ display: "block", fontSize: 13, color: "#64748b", textDecoration: "line-through", fontWeight: 400 }}>&#8377;1,599</span>
                <span style={{ display: "block", fontSize: 46, fontWeight: 800, color: "#ffffff", lineHeight: 1, marginTop: 2 }}>&#8377;{price}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, paddingBottom: 4 }}>
                <span style={{
                  backgroundColor: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
                  color: "#a78bfa", fontWeight: 700, fontSize: 11, borderRadius: 999, padding: "3px 10px",
                }}>94% OFF</span>
                <span style={{ fontSize: 11, color: "#64748b", fontWeight: 400 }}>One-time · Instant PDF</span>
              </div>
            </div>

            <a href={CHECKOUT_URL} className="cta-btn cta-btn--pulse">
              Show Me The 7-Day Plan · &#8377;{price}
            </a>
            <p style={{ fontSize: 12, color: "#64748b", textAlign: "center", marginTop: 10, fontWeight: 400 }}>
              🔒 Razorpay secured · PDF in your inbox in 2 minutes
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Stars size={14} />
          <span style={{ fontWeight: 500, fontSize: 13, color: "#94a3b8" }}>4.6 stars · 567 readers</span>
        </div>
      </div>
    </section>
  );
}

// ─── Agitation ────────────────────────────────────────────────────────────────

function Agitation() {
  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(22px,5vw,28px)", color: "#0f172a", lineHeight: 1.25, marginBottom: 20 }}>
          You&apos;ve Applied to Dozens of Roles. Heard Back From Almost None.
        </h2>
        <p style={{ fontWeight: 400, fontSize: 16, color: "#475569", lineHeight: 1.75, margin: 0 }}>
          Here&apos;s the part nobody tells you: the problem usually isn&apos;t you. It&apos;s that you&apos;re applying the same way as 10,000 other people, to the same handful of job boards, with the same generic profile. Remote USD roles get flooded. If you&apos;re not searching where the competition isn&apos;t and reaching out the way that actually gets replies, you stay invisible. No matter how good you are.
        </p>
      </div>
    </section>
  );
}

// ─── Mechanism ────────────────────────────────────────────────────────────────

function Mechanism() {
  const price = "99";

  const items = [
    { icon: "🌐", text: "28 remote job boards most Indian applicants never touch, so you're not fighting the crowd." },
    { icon: "🔍", text: "35+ copy-paste search strings that surface USD roles hidden from normal searches." },
    { icon: "✅", text: "42 daily tasks across 7 days, so you stop guessing and start moving." },
    { icon: "📅", text: "A day-by-day structure that turns \"someday\" into \"this week\"." },
    { icon: "🇮🇳", text: "Built for India to USD specifically, not recycled American advice that ignores your reality." },
    { icon: "⚡", text: "Download in 2 minutes, start in the next 10." },
  ];

  return (
    <section style={{ backgroundColor: "#0f0a1e", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(22px,5vw,26px)", color: "#ffffff", textAlign: "center", marginBottom: 32, lineHeight: 1.3 }}>
          Here&apos;s Exactly How the Plan Fixes That
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map(({ icon, text }, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0",
              borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <span style={{ fontSize: 20, lineHeight: 1.3, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontWeight: 400, fontSize: 16, color: "#cbd5e1", lineHeight: 1.6 }}>{text}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 32 }}>
          <a href={CHECKOUT_URL} className="cta-btn">
            Start Day 1 Today · &#8377;{price}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Stakes ───────────────────────────────────────────────────────────────────

function Stakes() {
  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(22px,5vw,26px)", color: "#0f172a", lineHeight: 1.25, marginBottom: 20 }}>
          The Real Price Isn&apos;t &#8377;99. It&apos;s Waiting.
        </h2>
        <p style={{ fontWeight: 400, fontSize: 16, color: "#475569", lineHeight: 1.75, margin: 0 }}>
          Every month you keep applying the old way is a month you stay on a rupee salary while the same roles, paying 3x to 5x in USD, go to someone with a system. &#8377;99 is less than a dinner out. The cost of doing nothing is another quarter of your career spent waiting for a reply that isn&apos;t coming.
        </p>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  const price = "99";

  return (
    <section style={{ backgroundColor: "#0f0a1e", padding: "56px 24px" }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <div style={{
          backgroundColor: "#ffffff", border: "2px solid #7c3aed",
          borderRadius: 20, padding: "32px 24px",
          boxShadow: "0 8px 40px rgba(124,58,237,0.15)",
        }}>
          <p style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", margin: "0 0 12px" }}>Remote Work Playbook – Updated June 2026</p>
          <p style={{ fontSize: 15, color: "#94a3b8", textDecoration: "line-through", margin: "0 0 4px", fontWeight: 400 }}>&#8377;1,599</p>
          <p style={{ fontWeight: 800, fontSize: 52, color: "#7c3aed", lineHeight: 1, margin: "0 0 4px" }}>&#8377;{price}</p>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px", fontWeight: 400 }}>One-time. Instant download. No subscription.</p>

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

          <a href={CHECKOUT_URL} className="cta-btn">Get Instant Access · &#8377;{price}</a>
          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 12, fontWeight: 400 }}>🔒 Secured by Razorpay</p>
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
      q: "Is this just another generic PDF?",
      a: "No. It's a 12-page action plan, not theory. Every page tells you exactly what to do that day. No 3-hour videos, no fluff, no login.",
    },
    {
      q: "Will this work if I've never had a remote job?",
      a: "That's exactly who it's built for. India-based professionals at any stage of their career, looking to break into remote USD roles for the first time. Whether you're just starting out or switching tracks entirely, you don't need remote experience. You need the system that gets you there.",
    },
    {
      q: "What if I'm not technical or not in IT?",
      a: "The search strings and boards cover every function, not just tech. If a company is hiring remote and paying in USD, this helps you find them and reach them.",
    },
    {
      q: "How fast do I get it?",
      a: "Two minutes. Pay, and the download link hits your email instantly. UPI, cards, netbanking, all via Razorpay.",
    },
    {
      q: "Do I need to apply to hundreds of jobs?",
      a: "No. The system is built around quality over volume — finding the right boards, using the right search strings, and reaching the right companies. Less spray and pray, more targeted outreach that actually gets responses.",
    },
    {
      q: "What if I already have a full-time job?",
      a: "Each day's tasks are designed to take 45–60 minutes. You can run this alongside your current job without it taking over your evenings. Most people do Day 1 on a weekend and keep the momentum going on weeknights.",
    },
    {
      q: "Is there a refund policy?",
      a: "Because this is an instant-download digital product, we don't offer refunds once the file is delivered. That said, if you have any issues accessing your download, reach out to elevate.media159@gmail.com and we'll sort it immediately.",
    },
    {
      q: "Will this still work a few months from now?",
      a: "Yes. The job boards, search logic, and outreach approach are built around how remote hiring actually works, not a short-term trend. The June 2026 update refreshes the board list and search strings to reflect what's active right now.",
    },
  ];

  return (
    <section style={{ backgroundColor: "#f9fafb", padding: "56px 24px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, color: "#0f172a", textAlign: "center", marginBottom: 28 }}>
          Common Questions
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
  const price = "99";

  return (
    <section style={{
      background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #6d28d9 100%)",
      padding: "64px 24px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 380, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(20px,5vw,26px)", color: "#ffffff", lineHeight: 1.25, marginBottom: 12 }}>
          Your 7 Days Start the Moment You Download. So Start.
        </h2>
        <p style={{ fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 28, lineHeight: 1.6 }}>
          567 readers stopped applying into the void. You&apos;re one tap from joining them.
        </p>
        <a href={CHECKOUT_URL} style={{
          display: "block", width: "100%", height: 56,
          backgroundColor: "#ffffff", color: "#7c3aed",
          fontWeight: 700, fontSize: 17, borderRadius: 12,
          lineHeight: "56px", textDecoration: "none",
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
      <Agitation />
      <Mechanism />
      <Stakes />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
