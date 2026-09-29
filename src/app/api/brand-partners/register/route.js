import { NextResponse } from "next/server";
import { isValidEmail } from "@/helper/validateEmail";

const PASSWORD_MIN = 8;

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const company = String(body?.company ?? "").trim();
    const password = String(body?.password ?? "");

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
    }
    if (company.length < 2) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return NextResponse.json({ error: "Enter a valid phone number" }, { status: 400 });
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

    // Auth persistence (DB / identity provider) can be wired here later.
    return NextResponse.json({
      ok: true,
      message: "Account created successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
