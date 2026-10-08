/**
 * Central env config — single place to read process.env.
 *
 * Prefer importing from here instead of process.env scattered in the app.
 * Secrets live under Amplify as NEXT_PUBLIC_* by project requirement;
 * still avoid importing this into client UI unless you only need siteUrl.
 */

function required(name, value) {
  return value ?? "";
}

function privateKeyFromEnv(raw) {
  if (!raw) return "";
  return String(raw).replace(/\\n/g, "\n");
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",

  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.wearepointof.com"
  ).replace(/\/$/, ""),

  sanity: {
    projectId: required(
      "NEXT_PUBLIC_SANITY_PROJECT_ID",
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ),
    dataset: required(
      "NEXT_PUBLIC_SANITY_DATASET",
      process.env.NEXT_PUBLIC_SANITY_DATASET
    ),
    writeToken: required(
      "NEXT_PUBLIC_SANITY_WRITE_TOKEN",
      process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN
    ),
    webhookSecret: required(
      "NEXT_PUBLIC_SANITY_WEBHOOK_SECRET",
      process.env.NEXT_PUBLIC_SANITY_WEBHOOK_SECRET
    ),
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  },

  jwt: {
    secret: required("NEXT_PUBLIC_JWT_SECRET", process.env.NEXT_PUBLIC_JWT_SECRET),
  },

  mail: {
    /** Real mailbox used for SMTP auth (not the alias) */
    user: required(
      "NEXT_PUBLIC_MAIL_EMAIL_ADDRESS",
      process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS
    ),
    password: required(
      "NEXT_PUBLIC_MAIL_PASSWORD",
      process.env.NEXT_PUBLIC_MAIL_PASSWORD
    ),
    /**
     * Visible From header — alias display name/address.
     * Gmail only keeps this address if it is added under
     * Settings → Accounts → Send mail as for mail.user.
     * Falls back to the real mailbox if unset.
     */
    from:
      process.env.NEXT_PUBLIC_EMAIL_FROM ||
      required(
        "NEXT_PUBLIC_MAIL_EMAIL_ADDRESS",
        process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS
      ),
    /** Inbox for contact + newsletter notifications */
    recipient: required(
      "NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS",
      process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS
    ),
  },

  google: {
    clientEmail: required(
      "NEXT_PUBLIC_CLIENT_EMAIL",
      process.env.NEXT_PUBLIC_CLIENT_EMAIL
    ),
    privateKey: privateKeyFromEnv(process.env.NEXT_PUBLIC_PRIVATE_KEY),
    contactSpreadsheetId: required(
      "NEXT_PUBLIC_CONTACT_SPREADSHEET_ID",
      process.env.NEXT_PUBLIC_CONTACT_SPREADSHEET_ID
    ),
    subscribeSpreadsheetId: required(
      "NEXT_PUBLIC_SUBSCRIBE_SPREADSHEET_ID",
      process.env.NEXT_PUBLIC_SUBSCRIBE_SPREADSHEET_ID
    ),
  },
};

export default env;
