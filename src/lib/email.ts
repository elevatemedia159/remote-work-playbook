import { Resend } from "resend";
import { getSupabaseAdmin } from "./supabase";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set.");
  return new Resend(key);
}

// Generates a signed download URL valid for 7 days
async function getSignedDownloadUrl(): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("digital-products")
    .createSignedUrl("the-remote-work-playbook.pdf", 60 * 60 * 24 * 7); // 7 days

  if (error || !data?.signedUrl) {
    throw new Error("Could not generate download link.");
  }
  return data.signedUrl;
}

function buildEmailHtml(name: string, downloadUrl: string): string {
  const firstName = name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Remote Work Playbook is here</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:#0f0a1e;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">
                Remote <span style="color:#a78bfa;">Work</span> Playbook
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:#6b7280;letter-spacing:0.05em;text-transform:uppercase;">by Elevate Media</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:24px;font-weight:800;color:#111827;line-height:1.3;">
                You're all set, ${firstName}!
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                Thank you for your purchase. Your copy of <strong style="color:#111827;">The Remote Work Playbook v2</strong> is ready to download right now.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:#7c3aed;border-radius:10px;">
                    <a href="${downloadUrl}" target="_blank"
                      style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.1px;">
                      Download Your PDF &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px;font-size:13px;color:#9ca3af;">
                This link is personal to you and expires in <strong>7 days</strong>. Save the PDF to your device after downloading.
              </p>

              <!-- Divider -->
              <hr style="margin:28px 0;border:none;border-top:1px solid #f3f4f6;" />

              <!-- What's next -->
              <p style="margin:0 0 16px;font-size:15px;font-weight:700;color:#111827;">What to do next</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${[
                  ["1", "Open Day 1 today", "Takes 45 minutes. Set up your LinkedIn headline and job alerts."],
                  ["2", "Follow the daily checklist", "6 specific tasks per day. No guesswork."],
                  ["3", "Track your responses", "Use the Week 2 framework to double down on what works."],
                ].map(([num, title, desc]) => `
                <tr>
                  <td style="vertical-align:top;padding:0 12px 16px 0;width:32px;">
                    <div style="width:28px;height:28px;background:#f3f4f6;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#7c3aed;">${num}</div>
                  </td>
                  <td style="vertical-align:top;padding-bottom:16px;">
                    <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111827;">${title}</p>
                    <p style="margin:0;font-size:13px;color:#9ca3af;">${desc}</p>
                  </td>
                </tr>`).join("")}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #f3f4f6;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">
                Questions? Reply to this email or contact us at
                <a href="mailto:elevate.media159@gmail.com" style="color:#7c3aed;text-decoration:none;">elevate.media159@gmail.com</a>
              </p>
              <p style="margin:0;font-size:12px;color:#d1d5db;">&copy; 2026 Elevate Media &middot; RemoteWork Playbook</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendDeliveryEmail(name: string, email: string): Promise<void> {
  const downloadUrl = await getSignedDownloadUrl();
  const html = buildEmailHtml(name, downloadUrl);

  const { error } = await getResend().emails.send({
    from: "Remote Work Playbook <hello@mail.elevatemedia159.in>",
    to: email,
    replyTo: "elevate.media159@gmail.com",
    subject: "Your Remote Work Playbook is here — download now",
    html,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
