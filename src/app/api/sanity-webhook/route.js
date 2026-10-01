import { NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { sendApprovalEmailForId } from "@/lib/send-approval-email";
import { env } from "@/config/env";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) || "";
    const secret = env.sanity.webhookSecret;

    if (!secret) {
      return NextResponse.json(
        { error: "Webhook secret missing" },
        { status: 500 }
      );
    }

    const valid = await isValidSignature(rawBody, signature, secret);
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Prefer _id from payload, then re-fetch full doc server-side (reliable).
    const id = payload?._id || payload?.document?._id;
    if (!id) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

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

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Sanity webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
