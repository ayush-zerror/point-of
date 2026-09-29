import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import sanityServer from "@/lib/sanity-server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    let payload;
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
      );
      payload = verified.payload;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = payload?.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await sanityServer.fetch(
      `*[_type == "accountRequest" && _id == $id][0]{
        _id,
        name,
        email,
        phone,
        company,
        notionLink
      }`,
      { id }
    );

    if (!user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
