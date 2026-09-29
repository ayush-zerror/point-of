import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import sanityServer from "@/lib/sanity-server";

export const runtime = "nodejs";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = await sanityServer.fetch(
      `*[_type == "accountRequest" && email == $email][0]{
        _id,
        name,
        email,
        phone,
        company,
        notionLink,
        status,
        passwordHash
      }`,
      { email }
    );

    if (!user?._id || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.status === "pending") {
      return NextResponse.json(
        { error: "Your request is still pending approval" },
        { status: 403 }
      );
    }

    if (user.status === "rejected") {
      return NextResponse.json(
        { error: "Your request was rejected" },
        { status: 403 }
      );
    }

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    const token = await new SignJWT({ id: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
      notionLink: user.notionLink || null,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
