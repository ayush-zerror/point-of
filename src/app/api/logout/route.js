import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: env.isProd,
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
