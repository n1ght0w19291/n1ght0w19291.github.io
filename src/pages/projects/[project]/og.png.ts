import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getProjectSlug } from "@/utils/contentEntry";
import { generateOgImageForProject } from "@/utils/generateOgImages";
import { SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const projects = await getCollection("projects", ({ data }) =>
    (!data.draft || import.meta.env.DEV) && !data.ogImage
  );

  return projects.map(project => ({
    params: { project: getProjectSlug(project.id) },
    props: project,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const buffer = await generateOgImageForProject(
    props as CollectionEntry<"projects">
  );
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};
