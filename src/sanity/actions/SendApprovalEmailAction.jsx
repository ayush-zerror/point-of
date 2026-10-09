import { useState } from "react";
import { sanityRevalidateSecret } from "../env";

/**
 * Shows only when approved + Notion link exist and email has not been sent.
 * Use after publish if the automatic email did not go out.
 */
export function ResendApprovalEmailAction(props) {
  const { id, type, draft, published, onComplete } = props;
  const [busy, setBusy] = useState(false);

  if (type !== "accountRequest") return null;

  const doc = draft || published;
  if (!doc) return null;
  if (doc.status !== "approved") return null;
  if (!doc.notionLink) return null;
  if (doc.emailSent === true) return null;

  return {
    label: busy ? "Sending…" : "Resend approval email",
    disabled: busy || Boolean(draft),
    title: draft
      ? "Publish first, then resend the approval email"
      : "Send the Notion link and login email to the user",
    onHandle: async () => {
      if (busy) return;
      setBusy(true);

      try {
        const secret = sanityRevalidateSecret;
        const res = await fetch("/api/account-requests/send-approval", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
          },
          body: JSON.stringify({ _id: id }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          window.alert(data?.error || "Could not send approval email");
          onComplete?.();
          return;
        }

        if (data?.skipped) {
          const hints = {
            status_not_approved: "Status must be Approved (and published).",
            notion_link_missing: "Add a Notion link, then publish.",
            email_already_sent: "Email was already sent for this request.",
          };
          window.alert(hints[data.reason] || data.reason || "Email skipped");
          onComplete?.();
          return;
        }

        window.alert(
          "Approval email sent to the user. You can close this and reload the document to refresh the status text."
        );
        onComplete?.();
      } catch {
        window.alert("Network error while sending approval email");
        onComplete?.();
      } finally {
        setBusy(false);
      }
    },
  };
}
