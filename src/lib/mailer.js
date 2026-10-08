import nodemailer from "nodemailer";
import { env } from "@/config/env";

/**
 * Shared mailer — Gmail service/auth from env config.
 * Server-only: never import from client components.
 *
 * Auth uses the real mailbox (env.mail.user). The visible From
 * uses env.mail.from (alias). Gmail will rewrite From back to
 * mail.user unless noreply@ is listed under Send mail as.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.mail.user,
    pass: env.mail.password,
  },
});

function parseFrom(from) {
  const match = String(from || "").match(/^\s*(?:"?([^"<]*)"?\s*)?<\s*([^>]+)\s*>\s*$/);
  if (match) {
    return {
      name: (match[1] || "").trim() || undefined,
      address: match[2].trim(),
    };
  }
  return from;
}

export async function sendMail({ to, subject, html, text }) {
  if (!env.mail.user || !env.mail.password) {
    throw new Error("Mail credentials missing");
  }

  return transporter.sendMail({
    from: parseFrom(env.mail.from),
    // SMTP envelope still authenticates as the real mailbox
    envelope: {
      from: env.mail.user,
      to,
    },
    to,
    subject,
    html,
    text,
  });
}

export { transporter };
