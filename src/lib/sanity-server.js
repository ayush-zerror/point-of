import { createClient } from "@sanity/client";

/**
 * Sanity write client — server-only.
 * Never import from client components.
 */
const sanityServer = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default sanityServer;
