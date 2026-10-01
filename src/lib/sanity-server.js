import { createClient } from "@sanity/client";
import { env } from "@/config/env";

/**
 * Sanity write client — server-only.
 * Never import from client components.
 */
const sanityServer = createClient({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  token: env.sanity.writeToken,
  apiVersion: env.sanity.apiVersion,
  useCdn: false,
});

export default sanityServer;
