import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { sanityRevalidateSecret } from "@/sanity/env";

export const dynamic = "force-dynamic";

const EXPERTISE_SLUGS = ["branding", "website", "print", "marketing"];

const STATIC_PATHS = ["/", "/work", "/connect", "/about", "/brands", "/expertise"];

function revalidateCaseStudyPaths(slug) {
  for (const path of STATIC_PATHS) {
    revalidatePath(path);
  }

  for (const expertiseSlug of EXPERTISE_SLUGS) {
    revalidatePath(`/expertise/${expertiseSlug}`);
  }

  if (slug) {
    revalidatePath(`/work/${slug}`);
  }

  // Pick up new slugs from generateStaticParams + on-demand pages
  revalidatePath("/work", "layout");
}

export async function POST(req) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      sanityRevalidateSecret,
      true
    );

    if (!isValidSignature) {
      return Response.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (body?._type === "caseStudy") {
      const slug =
        typeof body?.slug === "string"
          ? body.slug
          : body?.slug?.current ?? null;

      revalidateCaseStudyPaths(slug);

      return Response.json({
        revalidated: true,
        type: body._type,
        slug,
      });
    }

    return Response.json({ revalidated: false, type: body?._type ?? null });
  } catch (err) {
    console.error("[revalidate]", err);
    return Response.json(
      { message: err instanceof Error ? err.message : "Revalidation failed" },
      { status: 500 }
    );
  }
}
