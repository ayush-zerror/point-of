import { sendMail } from "@/lib/mailer";
import sanityServer from "@/lib/sanity-server";
import { env } from "@/config/env";

/**
 * Load an account request and send the approval email if eligible.
 * Sets emailSent: true after a successful send.
 */
export async function sendApprovalEmailForId(id) {
  if (!id || typeof id !== "string") {
    return { ok: false, status: 400, error: "Document id is required" };
  }

  const doc = await sanityServer.fetch(
    `*[_type == "accountRequest" && _id == $id][0]{
      _id,
      name,
      email,
      status,
      notionLink,
      emailSent
    }`,
    { id }
  );

  if (!doc?._id) {
    return { ok: false, status: 404, error: "Account request not found" };
  }

  if (doc.status !== "approved") {
    return {
      ok: false,
      status: 200,
      skipped: true,
      reason: "status_not_approved",
    };
  }

  if (!doc.notionLink) {
    return {
      ok: false,
      status: 200,
      skipped: true,
      reason: "notion_link_missing",
    };
  }

  if (doc.emailSent === true) {
    return {
      ok: false,
      status: 200,
      skipped: true,
      reason: "email_already_sent",
    };
  }

  if (!doc.email) {
    return { ok: false, status: 400, error: "User email is missing" };
  }

  const siteUrl = env.siteUrl;
  const loginUrl = `${siteUrl}/login`;
  const displayName = String(doc.name || "there").trim();
  const firstName = displayName.split(/\s+/)[0] || "there";

  const subject = "Welcome — your Point Of partner account is approved";

  const text = `Hi ${firstName},

Welcome to Point Of.

Great news — your brand partner account request has been approved. You can now sign in to access your partner resources.

Sign in: ${loginUrl}

If you have any questions, just reply to this email or write to us at think@wearepointof.com.

We're glad to have you with us.

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

        <!-- HEADER -->
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
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#86efac;vertical-align:middle;margin-right:6px;"></span>
            <span style="font-size:10px;color:rgba(255,255,255,0.75);letter-spacing:0.08em;text-transform:uppercase;">Account approved</span>
          </div>
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;line-height:1.3;">
            Welcome aboard, ${firstName}
          </h1>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.55;">
            Your brand partner request is approved. Sign in to get started.
          </p>
        </td></tr>

        <!-- BODY -->
        <tr><td style="padding:28px 24px 8px;">
          <p style="margin:0 0 16px;font-size:15px;color:#222;line-height:1.65;">
            Hi ${firstName},
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.65;">
            Thank you for joining Point Of as a brand partner. We&rsquo;re glad to have you with us.
            Your account is ready — sign in below to access your partner dashboard and resources.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <a href="${loginUrl}"
                   style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;border-radius:999px;">
                  Sign in to your account
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:20px 0 0;font-size:12px;color:#888;line-height:1.55;word-break:break-all;">
            Login link:<br>
            <a href="${loginUrl}" style="color:#555;text-decoration:underline;">${loginUrl}</a>
          </p>

          <p style="margin:28px 0 0;font-size:14px;color:#444;line-height:1.65;">
            Questions? Reach us anytime at
            <a href="mailto:think@wearepointof.com" style="color:#111;font-weight:500;text-decoration:underline;">think@wearepointof.com</a>.
          </p>
          <p style="margin:16px 0 8px;font-size:14px;color:#222;line-height:1.65;">
            Warm regards,<br>
            <strong>The Point Of team</strong>
          </p>
        </td></tr>

        <!-- FOOTER -->
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

  await sendMail({
    to: doc.email,
    subject,
    text,
    html,
  });

  await sanityServer.patch(doc._id).set({ emailSent: true }).commit();

  return { ok: true, status: 200 };
}
