import { NextResponse } from "next/server";
import { isValidEmail } from "@/helper/validateEmail";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Auth lookup can be wired here later.
    return NextResponse.json({
      ok: true,
      message: "Signed in successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
