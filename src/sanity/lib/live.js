// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { sanityApiReadToken } from "../env";
import { client } from "./client";

const hasReadToken =
  sanityApiReadToken && !sanityApiReadToken.startsWith("PASTE_YOUR");

export const { sanityFetch, SanityLive } = defineLive({
  client,
  fetchOptions: { revalidate: 60 },
  serverToken: hasReadToken ? sanityApiReadToken : false,
});
