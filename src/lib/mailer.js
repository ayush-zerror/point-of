import nodemailer from "nodemailer";

/**
 * Shared mailer — same Gmail service/auth style as the contact form.
 * Server-only: never import from client components.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS,
    pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
  },
});

export async function sendMail({ to, subject, html, text }) {
  const from = process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS;
  if (!from || !process.env.NEXT_PUBLIC_MAIL_PASSWORD) {
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
