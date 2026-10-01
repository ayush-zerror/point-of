import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sanityServer from "@/lib/sanity-server";

export const runtime = "nodejs";

const PASSWORD_MIN = 8;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = String(body?.token ?? "").trim();
    const password = String(body?.password ?? "");

    if (!token) {
      return NextResponse.json(
        { error: "Reset link is invalid or expired" },
        { status: 400 }
      );
    }

    if (password.length < PASSWORD_MIN) {
      return NextResponse.json(
        { error: `Password must be at least ${PASSWORD_MIN} characters` },
        { status: 400 }
      );
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return NextResponse.json(
        { error: "Use letters and at least one number" },
        { status: 400 }
      );
    }

    const user = await sanityServer.fetch(
      `*[_type == "accountRequest" && passwordResetToken == $token][0]{
        _id,
        passwordResetExpires,
        status
      }`,
      { token }
    );

    if (!user?._id || user.status !== "approved") {
      return NextResponse.json(
        { error: "Reset link is invalid or expired" },
        { status: 400 }
      );
    }

    const expiresAt = user.passwordResetExpires
      ? new Date(user.passwordResetExpires).getTime()
      : 0;
    if (!expiresAt || Number.isNaN(expiresAt) || expiresAt < Date.now()) {
      return NextResponse.json(
        { error: "Reset link is invalid or expired" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await sanityServer
      .patch(user._id)
      .set({ passwordHash })
      .unset(["passwordResetToken", "passwordResetExpires"])
      .commit();

    return NextResponse.json({
      message: "Password updated successfully. You can sign in now.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
