import { NextResponse } from "next/server";
import { sendApprovalEmailForId } from "@/lib/send-approval-email";
import { env } from "@/config/env";

export const runtime = "nodejs";

/**
 * Manual / Studio trigger for approval emails.
 * Auth: Authorization: Bearer <NEXT_PUBLIC_SANITY_WEBHOOK_SECRET>
 * Works on localhost (unlike Sanity cloud webhooks).
 */
export async function POST(request) {
  try {
    const auth = request.headers.get("authorization") || "";
    const secret = env.sanity.webhookSecret;
    const expected = secret ? `Bearer ${secret}` : "";

    if (!secret || auth !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const id = String(body?._id ?? "").trim();

    const result = await sendApprovalEmailForId(id);

    if (result.skipped) {
      return NextResponse.json(
        { skipped: true, reason: result.reason },
        { status: 200 }
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Approval email sent" });
  } catch (error) {
    console.error("Send approval email error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
