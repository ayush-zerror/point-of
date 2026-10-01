import { handleForgotPassword } from "@/lib/handle-forgot-password";

export const runtime = "nodejs";

export async function POST(request) {
  return handleForgotPassword(request);
}
