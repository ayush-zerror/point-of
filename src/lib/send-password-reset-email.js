import { sendMail } from "@/lib/mailer";

export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const displayName = String(name || "there").trim();
  const firstName = displayName.split(/\s+/)[0] || "there";
  const subject = "Reset your Point Of partner password";

  const text = `Hi ${firstName},

We received a request to reset the password for your Point Of brand partner account.

Reset your password using this link (valid for 1 hour):
${resetUrl}

If you did not ask for this, you can ignore this email — your password will stay the same.

— The Point Of team`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f3ef;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3ef;padding:32px 12px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e0ddd6;">

        <tr><td style="background:#111111;padding:28px 24px 24px;">
          <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
            <tr>
              <td style="width:28px;height:28px;background:#fff;border-radius:50%;text-align:center;vertical-align:middle;">
                <span style="font-size:10px;font-weight:700;color:#111;line-height:28px;">PO</span>
              </td>
              <td style="padding-left:10px;font-size:14px;font-weight:500;color:#fff;">Point Of</td>
            </tr>
          </table>
          <div style="display:inline-block;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 12px;margin-bottom:14px;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#fbbf24;vertical-align:middle;margin-right:6px;"></span>
            <span style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:0.08em;text-transform:uppercase;">Password reset</span>
          </div>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;line-height:1.3;">
            Reset your password
          </h1>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.55;">
            This link expires in 1 hour.
          </p>
        </td></tr>

        <tr><td style="padding:28px 24px 8px;">
          <p style="margin:0 0 16px;font-size:15px;color:#222;line-height:1.65;">
            Hi ${firstName},
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.65;">
            We received a request to reset the password for your Point Of brand partner account.
            Click the button below to choose a new password.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <a href="${resetUrl}"
                   style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;border-radius:999px;">
                  Reset password
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:20px 0 0;font-size:12px;color:#888;line-height:1.55;word-break:break-all;">
            Or copy this link:<br>
            <a href="${resetUrl}" style="color:#555;text-decoration:underline;">${resetUrl}</a>
          </p>

          <p style="margin:28px 0 0;font-size:14px;color:#444;line-height:1.65;">
            If you didn&rsquo;t request this, you can ignore this email — your password will stay the same.
          </p>
          <p style="margin:16px 0 8px;font-size:14px;color:#222;line-height:1.65;">
            Warm regards,<br>
            <strong>The Point Of team</strong>
          </p>
        </td></tr>

        <tr><td style="padding:16px 24px;border-top:1px solid #f0ede8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:11px;color:#bbb;">Point Of — brand partners</td>
              <td align="right" style="font-size:11px;color:#ccc;">wearepointof.com</td>
            </tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;

  await sendMail({ to, subject, text, html });
}
