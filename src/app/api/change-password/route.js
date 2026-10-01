import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import sanityServer from "@/lib/sanity-server";

export const runtime = "nodejs";

const PASSWORD_MIN = 8;

async function getSessionUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return typeof payload?.id === "string" ? payload.id : null;
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const currentPassword = String(body?.currentPassword ?? "");
    const newPassword = String(body?.newPassword ?? "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < PASSWORD_MIN) {
      return NextResponse.json(
        { error: `Password must be at least ${PASSWORD_MIN} characters` },
        { status: 400 }
      );
    }

    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return NextResponse.json(
        { error: "Use letters and at least one number" },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from the current one" },
        { status: 400 }
      );
    }

    const user = await sanityServer.fetch(
      `*[_type == "accountRequest" && _id == $id][0]{ _id, passwordHash }`,
      { id: userId }
    );

    if (!user?._id || !user.passwordHash) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentOk = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!currentOk) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await sanityServer.patch(user._id).set({ passwordHash }).commit();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
