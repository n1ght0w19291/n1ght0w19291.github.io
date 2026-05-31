import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import tagOgImage from "./og-templates/tag";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForProject(
  project: CollectionEntry<"projects">
) {
  // Coerce project entry to the shape the post template expects,
  // supplying SITE.author as fallback since projects have no author field.
  const coerced = {
    data: { title: project.data.title, author: SITE.author },
  };
  const svg = await postOgImage(coerced);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForTag(tagName: string) {
  const svg = await tagOgImage(tagName);
  return svgBufferToPngBuffer(svg);
}

