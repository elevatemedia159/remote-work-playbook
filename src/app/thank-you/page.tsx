import Link from "next/link";
import { Check, Download, Mail, ArrowRight } from "lucide-react";
import PurchaseEvent from "@/components/PurchaseEvent";

export const metadata = {
  title: "Thank You | Remote Work Playbook",
  description: "Your purchase is confirmed. We have sent your download link to your email.",
};

const steps = [
  {
    icon: Mail,
    title: "We have sent your download link",
    desc: "Check the email address you used at checkout. The download link is in your inbox right now. If you do not see it within 2 minutes, please check your spam or promotions folder — it sometimes lands there.",
  },
  {
    icon: Download,
    title: "Download your PDF",
    desc: "Open the email from Remote Work Playbook and click the download button. Save the PDF to your phone or desktop so you can follow along each day.",
  },
  {
    icon: ArrowRight,
    title: "Start with Day 1 today",
    desc: "Day 1 takes about 45 minutes. Set up your LinkedIn headline, create your job alerts, and build your target company list.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0f0a1e" }}>
      <PurchaseEvent />
      {/* Nav */}
      <nav className="border-b px-4 py-4" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-extrabold text-lg tracking-tight">
            Remote <span style={{ color: "#a78bfa" }}>Work</span> Playbook
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-xl text-center">

          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(22,163,74,0.15)", border: "2px solid rgba(22,163,74,0.4)" }}
            >
              <Check size={36} style={{ color: "#4ade80" }} strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            You&apos;re in. Welcome!
          </h1>
          <p className="text-base mb-8 sm:mb-10 px-2" style={{ color: "#9ca3af" }}>
            Your purchase of{" "}
            <span style={{ color: "#a78bfa" }}>The Remote Work Playbook v2</span>{" "}
            is confirmed. Your 7-day plan starts now.
          </p>

          {/* Spam notice banner */}
          <div
            className="rounded-xl px-4 py-3 mb-6 flex items-start gap-3 text-left"
            style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <span className="text-lg flex-shrink-0">&#9993;</span>
            <p className="text-sm" style={{ color: "#fbbf24" }}>
              <strong>Can&apos;t find the email?</strong> Check your spam or promotions folder. Emails from new senders sometimes get filtered.
              If it&apos;s still missing after 5 minutes, reach out to us at{" "}
              <a href="mailto:elevate.media159@gmail.com" className="underline">elevate.media159@gmail.com</a>
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3 sm:space-y-4 text-left mb-8 sm:mb-10">
            {steps.map(({ title, desc }, idx) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl p-4 sm:p-5 border"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(124,58,237,0.3)" }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "rgba(124,58,237,0.25)", color: "#a78bfa" }}
                >
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mb-6 sm:mb-8" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
            Questions or issues?{" "}
            <a href="mailto:elevate.media159@gmail.com" className="underline hover:no-underline" style={{ color: "#a78bfa" }}>
              Reach out to us at elevate.media159@gmail.com
            </a>
          </p>

          <Link href="/" className="inline-block text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "#6b7280" }}>
            &larr; Back to home
          </Link>
        </div>
      </div>

      <footer className="py-6 px-4 text-center text-xs border-t" style={{ color: "#4b5563", borderColor: "rgba(255,255,255,0.06)" }}>
        &copy; 2026 Elevate Media &nbsp;&middot;&nbsp; RemoteWork Playbook
      </footer>
    </div>
  );
}
