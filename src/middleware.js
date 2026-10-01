import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
