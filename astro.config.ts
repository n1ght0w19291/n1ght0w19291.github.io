import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkDirective from "remark-directive";
import remarkGithubAlerts from "remark-github-alerts";
import remarkCallouts from "./src/plugins/remarkCallouts";
import remarkInlineSpoiler from "./src/plugins/remarkInlineSpoiler";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    react(),
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkDirective,
      remarkCallouts,
      remarkInlineSpoiler,
      remarkGithubAlerts,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "github-dark-default" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      // ── Personal / social links ──────────────────────────────────────────
      // Set these in .env (never commit personal data to the repo).
      // Any variable left unset will simply hide that social link.
      // See .env.example for the full list.
      PUBLIC_SOCIAL_GITHUB: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_SOCIAL_X: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_SOCIAL_LINKEDIN: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_SOCIAL_EMAIL: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },

  fonts: [
    {
      name: "Wotfard",
      cssVariable: "--font-wotfard",
      fallbacks: ["sans-serif"],
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/wotfard.woff2"],
          },
        ],
      },
    },
    {
      name: "GenSenRounded2TW-R",
      cssVariable: "--font-gsr",
      fallbacks: ["sans-serif"],
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/gen-sen-rounded-tw.otf"],
          },
        ],
      },
    },
    {
      name: "Fira Code",
      cssVariable: "--font-firacode",
      fallbacks: ["monospace"],
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/firacode.woff2"],
          },
        ],
      },
    },
    {
      name: "Cascadia Code",
      cssVariable: "--font-cascadia-code",
      fallbacks: ["monospace"],
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/cascadia-code.woff2"],
          },
        ],
      },
    },
  ],
});
