import { sendMail } from "@/lib/mailer";
import sanityServer from "@/lib/sanity-server";

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

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.wearepointof.com"
  ).replace(/\/$/, "");
  const loginUrl = `${siteUrl}/login`;
  const displayName = doc.name || "there";

  const text = `Hi ${displayName},

Your request for account creation is successful. Please login.

Notion link: ${doc.notionLink}
Login: ${loginUrl}`;

  const html = `
    <p>Hi ${displayName},</p>
    <p>Your request for account creation is successful. Please login.</p>
    <p><a href="${doc.notionLink}">Open your Notion link</a></p>
    <p><a href="${loginUrl}">Login here</a></p>
  `;

  await sendMail({
    to: doc.email,
    subject: "Your account request is approved",
    text,
    html,
  });

  await sanityServer.patch(doc._id).set({ emailSent: true }).commit();

  return { ok: true, status: 200 };
}
