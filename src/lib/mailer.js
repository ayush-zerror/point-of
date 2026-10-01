import nodemailer from "nodemailer";
import { env } from "@/config/env";

/**
 * Shared mailer — Gmail service/auth from env config.
 * Server-only: never import from client components.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.mail.from,
    pass: env.mail.password,
  },
});

export async function sendMail({ to, subject, html, text }) {
  const from = env.mail.from;
  if (!from || !env.mail.password) {
    throw new Error("Mail credentials missing");
  }

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
}

export { transporter };
