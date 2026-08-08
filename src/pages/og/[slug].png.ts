import type { APIRoute, GetStaticPathsResult } from "astro";
import { generateOgImageForPage } from "@/utils/generateOgImages";
import { SITE } from "@/config";

const PAGES: Record<string, { title: string; subtitle?: string }> = {
  about: { title: "About", subtitle: `Get to know ${SITE.author}` },
  tags: { title: "Tags", subtitle: `Browse every topic on ${SITE.title}` },
  archives: {
    title: "Archives",
    subtitle: `Every post on ${SITE.title}, by date`,
  },
  search: { title: "Search", subtitle: `Find any article on ${SITE.title}` },
};

export function getStaticPaths(): GetStaticPathsResult {
  return Object.entries(PAGES).map(([slug, props]) => ({
    params: { slug },
    props,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const buffer = await generateOgImageForPage(
    props.title as string,
    props.subtitle as string | undefined
  );
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
