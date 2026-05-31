import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PROJECT_PATH = "src/data/project";

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
