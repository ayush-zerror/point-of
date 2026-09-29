import { NextResponse } from "next/server";
import { isValidEmail } from "@/helper/validateEmail";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
    }

    // Password reset email can be wired here later.
    return NextResponse.json({
      ok: true,
      message: "If an account exists for that email, a reset link will be sent.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
