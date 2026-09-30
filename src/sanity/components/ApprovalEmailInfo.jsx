"use client";

import { useFormValue } from "sanity";

/**
 * Read-only guidance in Studio — replaces the Email Sent toggle.
 */
export default function ApprovalEmailInfo() {
  const status = useFormValue(["status"]);
  const notionLink = useFormValue(["notionLink"]);
  const emailSent = useFormValue(["emailSent"]);

  let title = "How approval email works";
  let body =
    "Set status to Approved, paste the Notion link, then publish. An email with the Notion link and login instructions will be sent to the user.";

  if (status === "approved" && !notionLink) {
    title = "Add Notion link";
    body =
      "Paste the Notion link below and publish. After that, the user will get an email to log in.";
  } else if (status === "approved" && notionLink && emailSent === true) {
    title = "Email sent";
    body =
      "The approval email has been sent to the user with their Notion link and login instructions.";
  } else if (status === "approved" && notionLink && emailSent !== true) {
    title = "Email not sent yet";
    body =
      "This request is approved and has a Notion link, but the login email has not been sent. Use “Resend approval email” in the document actions menu (⋯), after publishing.";
  }

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 8,
        background: emailSent === true ? "#e8f5e9" : "#f4f3ef",
        border: `1px solid ${emailSent === true ? "#c8e6c9" : "#e0ddd6"}`,
      }}
    >
      <p
        style={{
          margin: "0 0 6px",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#666",
        }}
      >
        {title}
      </p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#1a1a1a" }}>
        {body}
      </p>
    </div>
  );
}
