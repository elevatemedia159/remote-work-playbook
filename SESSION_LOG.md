# Remote Work Playbook — Session Log

> Continuously updated summary of all discussions, decisions, and actions taken.
> Critical credentials and URLs are preserved. Do not overwrite — append only.

---

## Project Overview
- **Product:** The Remote Work Playbook v2 — 12-page PDF guide for India-based professionals targeting USD-paying remote roles
- **Company:** Elevate Media
- **Live URL:** https://elevatemedia159.in
- **Vercel URL:** https://remote-work-playbook.vercel.app
- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, Vercel

---

## Infrastructure & Credentials

| Service | Detail |
|---|---|
| Vercel project | `elevatemedia159-3488s-projects/remote-work-playbook` |
| Supabase project | `wuqqzeyxlqgemsgcguyp.supabase.co` |
| Razorpay live key | `rzp_live_SxWIrwscYBWJE6` |
| Resend sender | `hello@mail.elevatemedia159.in` |
| Reply-to email | `elevate.media159@gmail.com` |
| GA4 Measurement ID | `G-73PXTSJTTR` |
| Domain registrar | GoDaddy (DNS managed via Cloudflare) |

---

## Pages Built

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/checkout` | Name + email form → Razorpay payment modal |
| `/thank-you` | Post-purchase confirmation page |
| `/privacy-policy` | 11-section privacy policy |

---

## Session History

### Project Setup
- Built full Next.js landing page with 10 sections: nav, hero, who-for, what's inside (7-day cards), what you get, testimonials, pricing, FAQ, final CTA, footer
- Deployed to Vercel via CLI
- Branding: Elevate Media, purple `#7c3aed` design system

### Checkout & Payment Flow
- Created `/checkout` page with name + email form
- Supabase `leads` table stores buyer data
- Razorpay integration: `/api/create-order` creates order, `/api/verify-payment` verifies HMAC signature
- On success: redirects to `/thank-you`
- Pricing: ₹249 (offer, first 10 mins) / ₹449 (after offer expires) — server-side validated using `offerStartTime` from localStorage
- Original price shown as ₹1,599 struck through everywhere

### Email Delivery
- Resend used for transactional email
- PDF uploaded to Supabase Storage bucket `digital-products`
- On payment verified: 7-day signed download link generated → branded HTML email sent
- Sender: `hello@mail.elevatemedia159.in`, reply-to: `elevate.media159@gmail.com`
- Email subject: "Your Remote Work Playbook is here — download now"

### Domain & DNS
- Domain: `elevatemedia159.in` purchased by user
- DNS moved from GoDaddy to Cloudflare (GoDaddy had contact verification error)
- Vercel auto-configured DNS via Cloudflare integration
- Resend domain verified via Cloudflare DNS (DKIM, SPF, DMARC records)
- SSL auto-provisioned by Vercel

### Countdown Timer
- 10-minute offer timer stored in `localStorage` key `rwp_offer_start`
- Banner at top of page shows live countdown
- On expiry: price updates to ₹449 on landing page, checkout page, and Razorpay order
- Server independently validates `offerStartTime` to prevent tampering

### Database (Supabase `leads` table)
Columns:
- `id`, `name`, `email`, `source`, `created_at`
- `paid` (boolean), `payment_id` (text), `paid_at` (timestamptz)
- `amount_paid` (integer — rupees), `razorpay_order_id` (text)
- `ip_country` (text — from Vercel headers), `utm_source` (text — from URL params)

### UTM Tracking Links
- Google: `https://elevatemedia159.in?utm_source=google`
- Instagram: `https://elevatemedia159.in?utm_source=instagram`
- WhatsApp: `https://elevatemedia159.in?utm_source=whatsapp`
- Vercel (temp): `https://remote-work-playbook.vercel.app?utm_source=google`

### Google Analytics & Ads
- GA4 property: `G-73PXTSJTTR` added to site via `next/script` in layout
- `PurchaseEvent` client component fires `purchase` event on `/thank-you` page
- Payment amount and ID stored in localStorage (`rwp_amount_paid`, `rwp_payment_id`) and passed to GA4
- Purchase conversion already Active in Google Ads (source: Google Analytics GA4)
- Conversion measurement URL: `https://elevatemedia159.in/thank-you`
- Google Ads campaign destination URL: `https://elevatemedia159.in?utm_source=google`

### Content Updates
- Removed: "Free updates forever", PM-specific FAQ, refund mentions
- Updated FAQs: 6 questions covering audience, USD hiring, delivery, format, roles, payment methods
- Privacy policy: 11 sections (removed refund policy and children's privacy sections)
- Contact everywhere replaced with `elevate.media159@gmail.com`
- Review carousel in hero replaced with social proof (4.6 stars, 567 reviews, avatar stack)

### Favicon
- Custom SVG favicon: purple `#7c3aed` background, white "RW" text
- Fills circular frame edge to edge
- Registered as icon, shortcut, and apple icon in metadata

### Razorpay Status
- Test keys used initially for development
- Live keys (`rzp_live_SxWIrwscYBWJE6`) active
- `elevatemedia159.in` approved by Razorpay as verified domain
- Full payment workflow confirmed working end-to-end

---

*Last updated: Session ongoing*
