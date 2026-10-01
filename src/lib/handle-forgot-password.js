import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { isValidEmail } from "@/helper/validateEmail";
import { env } from "@/config/env";
import sanityServer from "@/lib/sanity-server";
import { sendPasswordResetEmail } from "@/lib/send-password-reset-email";

const GENERIC_MESSAGE =
  "If an account exists for that email, a reset link will be sent.";

export async function handleForgotPassword(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    const user = await sanityServer.fetch(
      `*[_type == "accountRequest" && email == $email][0]{
        _id,
        name,
        email,
        status,
        passwordHash
      }`,
      { email }
    );

    if (!user?._id || !user.passwordHash || user.status !== "approved") {
      return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
    }

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await sanityServer
      .patch(user._id)
      .set({
        passwordResetToken: token,
        passwordResetExpires: expires,
      })
      .commit();

    const resetUrl = `${env.siteUrl}/reset-password?token=${encodeURIComponent(token)}`;

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
