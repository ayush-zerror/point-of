import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isValidEmail } from "@/helper/validateEmail";
import sanityServer from "@/lib/sanity-server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const name = String(body?.name ?? body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const phone = String(body?.phone ?? "").trim();
    const company = String(body?.company ?? "").trim();
    const password = String(body?.password ?? "");

    if (!name || !email || !phone || !company || !password) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await sanityServer.fetch(
      `*[_type == "accountRequest" && email == $email][0]{ _id }`,
      { email }
    );

    if (existing?._id) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await sanityServer.create({
      _type: "accountRequest",
      name,
      email,
      phone,
      company,
      passwordHash,
      status: "pending",
      emailSent: false,
    });

    return NextResponse.json(
      { message: "Request submitted, please wait for approval" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
