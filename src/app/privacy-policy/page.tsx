import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Remote Work Playbook",
  description: "Privacy policy for the Remote Work Playbook by Elevate Media.",
};

const sections = [
  {
    title: "1. Who We Are",
    content: `This website is operated by Elevate Media. We sell The Remote Work Playbook v2, a digital PDF guide. You can reach us at elevate.media159@gmail.com for any privacy-related questions.`,
  },
  {
    title: "2. What Information We Collect",
    content: `When you make a purchase or fill in our checkout form, we collect:
- Your full name
- Your email address
- Payment confirmation details (processed securely by Razorpay — we do not store card numbers or UPI credentials)

We do not collect any sensitive personal information beyond what is listed above.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information you provide to:
- Deliver your purchased digital product via email
- Send you the download link for your PDF guide
- Respond to any support queries you raise
- Improve our product and service based on aggregate purchase data

We do not use your information for any automated decision-making or profiling.`,
  },
  {
    title: "4. Email Communications",
    content: `After purchase, you will receive a single transactional email containing your download link. We do not send unsolicited marketing emails. If you reply to our delivery email, your reply is received at elevate.media159@gmail.com.`,
  },
  {
    title: "5. Payment Processing",
    content: `Payments are processed by Razorpay, a PCI-DSS compliant payment gateway. We do not store, process, or have access to your card details, UPI IDs, or banking credentials. Please refer to Razorpay's privacy policy for information on how they handle your payment data.`,
  },
  {
    title: "6. Data Storage",
    content: `Your name and email address are stored securely in our database (hosted on Supabase infrastructure in the EU/US region). We retain this data to fulfil your order and provide support. We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "7. Third-Party Services",
    content: `We use the following third-party services to operate this website:
- Razorpay — payment processing
- Resend — transactional email delivery
- Supabase — secure database and file storage
- Vercel — website hosting

Each service has its own privacy policy governing how they handle data.`,
  },
  {
    title: "8. Cookies",
    content: `This website uses minimal browser storage (localStorage) only to remember your countdown timer session. We do not use tracking cookies or third-party advertising cookies.`,
  },
  {
    title: "9. Your Rights",
    content: `You have the right to:
- Request a copy of the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your data (subject to legal obligations)
- Withdraw consent at any time

To exercise any of these rights, email us at elevate.media159@gmail.com and we will get back to you.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this privacy policy from time to time. The updated version will be posted on this page with a revised effective date. Continued use of the website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact",
    content: `For any privacy-related concerns, reach out to us at elevate.media159@gmail.com. We aim to respond within 2 business days.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0f0a1e" }}>
      {/* Nav */}
      <nav className="border-b px-4 py-4" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-extrabold text-lg tracking-tight">
            Remote <span style={{ color: "#a78bfa" }}>Work</span> Playbook
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>LEGAL</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Privacy Policy</h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Effective date: June 2026 &nbsp;&middot;&nbsp; Elevate Media
            </p>
          </div>

          {/* Intro */}
          <div
            className="rounded-xl p-5 mb-8 border"
            style={{ backgroundColor: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.25)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#c4b5fd" }}>
              We take your privacy seriously. This policy explains what data we collect, why we collect it, and how we protect it. We only collect what we need to deliver your product and support you.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
                <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#9ca3af" }}>
                  {content.includes("elevate.media159@gmail.com") ? (
                    content.split("elevate.media159@gmail.com").map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <a href="mailto:elevate.media159@gmail.com" style={{ color: "#a78bfa" }}>
                            elevate.media159@gmail.com
                          </a>
                        )}
                      </span>
                    ))
                  ) : (
                    content
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-12 pt-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
              Questions about this policy? Reach out to us at{" "}
              <a href="mailto:elevate.media159@gmail.com" style={{ color: "#a78bfa" }}>
                elevate.media159@gmail.com
              </a>
            </p>
            <Link href="/" className="text-sm font-medium transition-opacity hover:opacity-80" style={{ color: "#7c3aed" }}>
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-6 px-4 text-center text-xs border-t" style={{ color: "#4b5563", borderColor: "rgba(255,255,255,0.06)" }}>
        &copy; 2026 Elevate Media &nbsp;&middot;&nbsp; RemoteWork Playbook
      </footer>
    </div>
  );
}
