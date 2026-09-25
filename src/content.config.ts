import { createRequire } from "node:module";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { SITE } from "@/config";

const loadAstroModule = createRequire(import.meta.url);
const { glob } = loadAstroModule("astro/loaders");

export const BLOG_PATH = "src/data/blog";
export const PROJECT_PATH = "src/data/project";

const resourceLinkSchema = z.object({
  title: z.string().optional(),
  url: z
    .string()
    .url()
    .refine(url => /^https?:\/\//i.test(url), {
      message: "Resource URLs must use HTTP or HTTPS",
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      timezone: z.string().optional(),
      parentPost: z.string().optional(),
      references: z.array(resourceLinkSchema).optional(),
      furtherReading: z.array(resourceLinkSchema).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `./${PROJECT_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      coverImage: image().optional(),
      ogImage: image().or(z.string()).optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog, projects };
