export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-23";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aksv9uid";

/** Viewer token—sanity.io/manage → API → Tokens (Viewer). Used for live updates. */
export const sanityApiReadToken =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN ||
  "PASTE_YOUR_SANITY_VIEWER_TOKEN_HERE";

/** Shared secret for Sanity GROQ webhook → /api/revalidate (must match webhook config). */
export const sanityRevalidateSecret =
  process.env.SANITY_REVALIDATE_SECRET ||
  process.env.NEXT_PUBLIC_SANITY_WEBHOOK_SECRET ||
  "pointof-sanity-revalidate-aksv9uid";
