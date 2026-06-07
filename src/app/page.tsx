"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Lock, Star, Zap } from "lucide-react";
import CountdownTimer, { useCountdown } from "@/components/CountdownTimer";
import ReviewSocialProof from "@/components/ReviewCarousel";
import Link from "next/link";

const CHECKOUT_URL = "/checkout";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(15,10,30,0.95)" : "#0f0a1e",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.2)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-center">
        <span className="text-white font-extrabold text-lg tracking-tight">
          Remote <span style={{ color: "#a78bfa" }}>Work</span> Playbook
        </span>
      </div>
    </nav>
  );
}

// ─── Price display helper ────────────────────────────────────────────────────

function PriceDisplay({ size = "large" }: { size?: "large" | "medium" | "small" }) {
  const { expired } = useCountdown();

  const priceSize = size === "large" ? "text-6xl" : size === "medium" ? "text-5xl" : "text-2xl";
  const strikeSize = size === "large" ? "text-2xl" : size === "medium" ? "text-xl" : "text-base";

  return (
    <div className="flex items-end gap-3 flex-wrap justify-center">
      <span className={`${priceSize} font-black text-white`}>
        &#8377;{expired ? "149" : "99"}
      </span>
      <span className={`${strikeSize} font-medium line-through pb-1`} style={{ color: "#6b7280" }}>
        &#8377;1,599
      </span>
      {!expired && (
        <span className="text-sm font-bold pb-1.5 px-2 py-0.5 rounded-full" style={{ backgroundColor: "#16a34a", color: "#fff" }}>
          84% OFF
        </span>
      )}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { expired } = useCountdown();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16"
      style={{ backgroundColor: "#0f0a1e" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
        <div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border"
          style={{
            backgroundColor: "rgba(124,58,237,0.18)",
            color: "#c4b5fd",
            borderColor: "rgba(124,58,237,0.35)",
          }}
        >
          <span>&#127470;&#127475;</span>
          <span>Built for India-based professionals targeting US remote roles</span>
        </div>

        <h1
          className="font-black leading-tight tracking-tight px-2"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#ffffff" }}
        >
          Land a Remote Job That{" "}
          <span style={{ color: "#a78bfa" }}>Pays in USD</span>{" "}
          in 7 Days
        </h1>

        <p className="text-base sm:text-lg leading-relaxed max-w-xl px-2" style={{ color: "#9ca3af" }}>
          A structured day-by-day outreach system with curated job boards,
          copy-paste search terms, and daily checklists for every role,
          every function, every industry.
        </p>

        {/* Offer banner */}
        <div
          className="w-full max-w-md rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{
            backgroundColor: expired ? "rgba(255,255,255,0.04)" : "rgba(124,58,237,0.15)",
            border: `1px solid ${expired ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.4)"}`,
          }}
        >
          <div className="flex items-center gap-2 text-sm">
            <Zap size={14} style={{ color: expired ? "#6b7280" : "#a78bfa" }} />
            <span style={{ color: expired ? "#6b7280" : "#c4b5fd" }}>
              {expired ? "Early bird offer expired" : "Early bird offer, limited time"}
            </span>
          </div>
          <CountdownTimer variant="inline" />
        </div>

        <div className="w-full max-w-sm px-2">
          <a
            href={CHECKOUT_URL}
            className="block w-full px-6 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-lg text-center"
            style={{ backgroundColor: "#7c3aed", boxShadow: "0 4px 24px rgba(124,58,237,0.35)" }}
          >
            Get the PDF Guide{" "}
            <span style={{ textDecoration: "line-through", opacity: 0.6 }}>&#8377;1,599</span>
            {" "}&#8377;{expired ? "149" : "99"}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 mt-2 w-full max-w-lg">
          {[
            { num: "7", label: "Focused Days" },
            { num: "42", label: "Actionable Tasks" },
            { num: "28", label: "Curated Job Boards" },
            { num: "35+", label: "Search Templates" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="text-4xl sm:text-5xl font-black" style={{ color: "#a78bfa" }}>
                {num}
              </span>
              <span className="text-xs sm:text-sm font-medium" style={{ color: "#6b7280" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <ReviewSocialProof />
      </div>
    </section>
  );
}

// ─── Who This Is For ─────────────────────────────────────────────────────────

function WhoFor() {
  const cards = [
    {
      icon: "&#128548;",
      title: "Applying with no system",
      body: "You are sending applications but there is no clear plan, and it is showing in your lack of responses.",
    },
    {
      icon: "&#128181;",
      title: "You want a USD salary from India",
      body: "You know remote US roles exist, but you are not sure where to look or how to pitch yourself to US hiring managers.",
    },
    {
      icon: "&#129517;",
      title: "You have experience but no direction",
      body: "You have the skills. You just need a focused outreach strategy to get noticed and get responses.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-center mb-3" style={{ color: "#7c3aed" }}>
          WHO THIS IS FOR
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-10" style={{ color: "#111827" }}>
          Sound familiar?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {cards.map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl p-5 sm:p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
              <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: icon }} />
              <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: "#111827" }}>{title}</h3>
              <p className="text-sm sm:text-base" style={{ color: "#6b7280" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What's Inside ────────────────────────────────────────────────────────────

const days = [
  { day: "Day 1", title: "Profile & Foundation", focus: "Setup", bullets: ["LinkedIn headline optimisation", "Job alert setup", "Target company list"] },
  { day: "Day 2", title: "Job Board Blitz", focus: "Research", bullets: ["4 remote-first boards", "USD salary filtering", "Job tracker setup"] },
  { day: "Day 3", title: "Resume Tailoring", focus: "Materials", bullets: ["ATS optimisation with Jobscan", "Cover letter template", "Remote work framing"] },
  { day: "Day 4", title: "First Applications", focus: "Apply", bullets: ["5 tailored applications", "Direct apply strategy", "Week 2 target setting"] },
  { day: "Day 5", title: "Warm Outreach", focus: "Network", bullets: ["LinkedIn PM outreach scripts", "Slack community intros", "Referral requests"] },
  { day: "Day 6", title: "Follow-ups and Volume", focus: "Follow-up", bullets: ["Application follow-ups", "Salary benchmarking", "STAR interview prep"] },
  { day: "Day 7", title: "Review and Week 2 Plan", focus: "Iterate", bullets: ["Response rate analysis", "Best source identification", "15-message outreach plan"] },
];

function WhatsInside() {
  return (
    <section id="inside" className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-center mb-3" style={{ color: "#7c3aed" }}>THE PLAN</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-2" style={{ color: "#111827" }}>7 days. One clear outcome.</h2>
        <p className="text-center text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-10" style={{ color: "#6b7280" }}>
          Each day has a theme, 4 curated job boards, 5 copy-paste search strings, a 6-task checklist, and an expert tip.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {days.map(({ day, title, focus, bullets }) => (
            <div key={day} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#e5e7eb", borderTopColor: "#7c3aed", borderTopWidth: "3px" }}>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#7c3aed" }}>{day}</p>
                <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: "#111827" }}>{title}</h3>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-medium" style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}>{focus}</span>
                <ul className="space-y-1.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-xs sm:text-sm" style={{ color: "#374151" }}>
                      <span style={{ color: "#a78bfa" }} className="mt-0.5 flex-shrink-0">&#8594;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What You Get ─────────────────────────────────────────────────────────────

const deliverables = [
  { icon: "&#128203;", title: "28 curated job boards with usage notes", desc: "4 hand-picked boards per day with specific tips on how to use each one for remote roles. Not just a list of sites." },
  { icon: "&#128269;", title: "35+ copy-paste search strings", desc: "Exact queries optimised for USD-paying remote roles. Replace [your role] with your title and paste directly into any job board." },
  { icon: "&#9989;", title: "42-task daily checklist system", desc: "6 clear, specific actions per day from profile setup to follow-up emails, so you always know exactly what to do next." },
  { icon: "&#128161;", title: "7 expert pro tips", desc: "One insider insight per day covering ATS tricks, outreach psychology, salary benchmarking, and follow-up etiquette." },
  { icon: "&#128202;", title: "Week 2 scaling framework", desc: "A data-driven review system to identify what is working and scale it in week 2, so results compound over time." },
];

function WhatYouGet() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-center mb-3" style={{ color: "#7c3aed" }}>WHAT YOU GET</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-10" style={{ color: "#111827" }}>Everything in one clean PDF</h2>
        <div className="space-y-3 sm:space-y-4">
          {deliverables.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 sm:gap-4 rounded-xl border p-4 sm:p-5" style={{ borderColor: "#e5e7eb" }}>
              <div className="text-xl sm:text-2xl flex-shrink-0 mt-0.5" dangerouslySetInnerHTML={{ __html: icon }} />
              <div>
                <h3 className="font-bold text-sm sm:text-base mb-1" style={{ color: "#111827" }}>{title}</h3>
                <p className="text-xs sm:text-sm" style={{ color: "#6b7280" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  { quote: "I had been applying randomly for 3 months. This plan gave me a structure I could actually follow. Got my first US recruiter call on Day 5.", name: "Priya M.", role: "Senior PM, Bangalore" },
  { quote: "The copy-paste search terms alone saved me hours. I had no idea how to filter for USD-paying roles specifically. Absolute game changer.", name: "Aditya R.", role: "Product Manager, Hyderabad" },
  { quote: "Day 3 on ATS optimisation was worth the price by itself. My Jobscan score went from 42% to 81% in one afternoon.", name: "Neha S.", role: "Program Manager, Pune" },
];

function Testimonials() {
  return (
    <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-center mb-3" style={{ color: "#7c3aed" }}>EARLY READERS SAY</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-10" style={{ color: "#111827" }}>Real results from India-based professionals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map(({ quote, name, role }) => (
            <div key={name} className="bg-white rounded-xl border p-5 sm:p-6 flex flex-col gap-4" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#f59e0b" style={{ color: "#f59e0b" }} />)}
              </div>
              <p className="italic text-sm leading-relaxed flex-1" style={{ color: "#374151" }}>&ldquo;{quote}&rdquo;</p>
              <div>
                <p className="font-bold text-sm" style={{ color: "#111827" }}>{name}</p>
                <p className="text-xs" style={{ color: "#6b7280" }}>{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const pricingIncludes = [
  "Full 7-day PDF guide (print-ready, 12 pages)",
  "28 curated job boards with notes",
  "35+ copy-paste search strings",
  "42-task daily checklist system",
  "Week 2 planning framework",
];

function Pricing() {
  const { expired, minutes, seconds } = useCountdown();

  return (
    <section id="pricing" className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#0f0a1e" }}>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>PRICING</p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">One payment. Yours forever.</h2>

        <div className="relative mx-auto max-w-md">
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: expired ? "#374151" : "#7c3aed", color: "#fff" }}
            >
              {expired ? "STANDARD PRICING" : "EARLY BIRD PRICING"}
            </span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 pt-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: `1px solid ${expired ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.45)"}`,
            }}
          >
            {/* Savings banner */}
            {!expired && (
              <div
                className="rounded-lg px-3 py-2 mb-5 flex items-center justify-center gap-2"
                style={{ backgroundColor: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}
              >
                <Zap size={13} style={{ color: "#4ade80" }} />
                <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>
                  You save &#8377;1,350 · 84% off today only
                </span>
              </div>
            )}

            {/* Price */}
            <PriceDisplay size="large" />

            {/* Timer */}
            <div className="mt-3 mb-5">
              {!expired ? (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}
                >
                  <span>&#9201;</span>
                  Offer ends in{" "}
                  <span className="font-black tabular-nums">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                </div>
              ) : (
                <p className="text-xs" style={{ color: "#6b7280" }}>One-time payment &middot; Instant download</p>
              )}
            </div>

            <ul className="space-y-3 text-left mb-6">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#16a34a" }}>
                    <Check size={11} color="white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={CHECKOUT_URL}
              className="block w-full py-3.5 rounded-xl font-bold text-white text-center text-base transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "#7c3aed", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
            >
              Get Instant Access for &#8377;{expired ? "149" : "99"}
            </a>

            <p className="text-xs mt-4 flex items-center justify-center gap-1" style={{ color: "#6b7280" }}>
              <Lock size={11} />
              Secure checkout &middot; Instant PDF delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "Who is this guide for?", a: "Any professional with 2 or more years of experience in any function: engineering, design, data, marketing, operations, content, finance, and more. The framework is role-agnostic and every search template uses a [your role] placeholder you fill in yourself." },
  { q: "Will US companies actually hire people based in India?", a: "Yes, many do, especially remote-first startups and scale-ups. The guide specifically targets timezone-friendly search strategies and global-friendly job boards that welcome India-based applicants with no visa sponsorship required." },
  { q: "How do I receive the guide after payment?", a: "Immediately after your payment is confirmed, we send a download link to the email address you entered at checkout. The link takes you directly to your PDF. Check your spam or promotions folder if you do not see it within a few minutes." },
  { q: "What format is the guide in?", a: "A clean, 12-page print-ready PDF. Easy to read on screen or print as a physical reference. Structured so you can follow along one day at a time without any prior job search experience." },
  { q: "Can I use this for roles outside of tech?", a: "Yes. The outreach framework, job boards, and networking tactics apply to any remote knowledge-worker role. Every search template uses [your role] so you substitute your exact job title before using it." },
  { q: "What payment methods are accepted?", a: "We accept all major UPI apps (GPay, PhonePe, Paytm), credit and debit cards, and netbanking — powered securely by Razorpay." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-center mb-3" style={{ color: "#7c3aed" }}>QUESTIONS</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-10" style={{ color: "#111827" }}>FAQ</h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }, idx) => (
            <div key={q} className="rounded-xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
              <button
                className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left font-semibold text-sm sm:text-base transition-colors hover:bg-gray-50"
                style={{ color: "#111827" }}
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                <span className="pr-3">{q}</span>
                {open === idx
                  ? <ChevronUp size={18} className="flex-shrink-0" style={{ color: "#7c3aed" }} />
                  : <ChevronDown size={18} className="flex-shrink-0" style={{ color: "#7c3aed" }} />}
              </button>
              {open === idx && (
                <div className="px-4 sm:px-5 pb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</div>
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
    <section className="py-16 sm:py-20 px-4 text-center" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)" }}>
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Ready to search the right way?</h2>
        <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>7 days. One focused plan. Your next remote role.</p>
        <a
          href={CHECKOUT_URL}
          className="inline-block px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105"
          style={{ backgroundColor: "#ffffff", color: "#7c3aed" }}
        >
          Get the PDF Guide{" "}
          <span style={{ textDecoration: "line-through", opacity: 0.55 }}>&#8377;1,599</span>
          {" "}&#8377;{expired ? "149" : "99"}
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 px-4 text-center text-sm" style={{ backgroundColor: "#0a0614", color: "#4b5563" }}>
      <p className="mb-1">
        &copy; 2026 Elevate Media &nbsp;&middot;&nbsp; RemoteWork Playbook &nbsp;&middot;&nbsp;
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
      <WhoFor />
      <WhatsInside />
      <WhatYouGet />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
