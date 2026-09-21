import { createRequire } from "node:module";
import { isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";
import remarkCallouts from "./src/plugins/remarkCallouts";
import remarkInlineSpoiler from "./src/plugins/remarkInlineSpoiler";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

const loadAstroConfig = createRequire(import.meta.url);
const resolveServerImport = (specifier: string, importerId: string) => {
  try {
    const resolver = (
      import.meta as ImportMeta & {
        resolve?: (source: string, parent?: string) => string;
      }
    ).resolve;
    const resolved = resolver?.(specifier, pathToFileURL(importerId).href);
    if (resolved?.startsWith("file:")) return resolved;
  } catch {
    // Fall back to the CommonJS resolver below for packages without exports.
  }

  try {
    return pathToFileURL(
      createRequire(pathToFileURL(importerId).href).resolve(specifier)
    ).href;
  } catch {
    return;
  }
};
const { defineConfig, envField, fontProviders } =
  loadAstroConfig("astro/config");
const mdx = loadAstroConfig("@astrojs/mdx").default;
const react = loadAstroConfig("@astrojs/react").default;
const tailwindcss = loadAstroConfig("@tailwindcss/vite").default;
const sitemap = loadAstroConfig("@astrojs/sitemap").default;
const remarkMathModule = loadAstroConfig("remark-math");
const remarkMath = remarkMathModule.default ?? remarkMathModule;
const rehypeKatexModule = loadAstroConfig("rehype-katex");
const rehypeKatex = rehypeKatexModule.default ?? rehypeKatexModule;
const remarkTocModule = loadAstroConfig("remark-toc");
const remarkToc = remarkTocModule.default ?? remarkTocModule;
const remarkCollapseModule = loadAstroConfig("remark-collapse");
const remarkCollapse = remarkCollapseModule.default ?? remarkCollapseModule;
const remarkDirectiveModule = loadAstroConfig("remark-directive");
const remarkDirective = remarkDirectiveModule.default ?? remarkDirectiveModule;
const remarkGithubAlertsModule = loadAstroConfig("remark-github-alerts");
const remarkGithubAlerts =
  remarkGithubAlertsModule.default ?? remarkGithubAlertsModule;
const {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} = loadAstroConfig("@shikijs/transformers");

// Vite's runnable server environment evaluates React's CommonJS entry files
// as ESM when the project is installed with pnpm. Keep the server-side React
// imports in a small ESM bridge so `module`/`require` are provided by Node.
const createServerCjsBridge = (
  specifier: string,
  namedExports: string[] = []
) => {
  const exportsCode = namedExports
    .map(name => `export const ${name} = value.${name};`)
    .join("\n");

  return `
import { createRequire } from "node:module";
const value = createRequire(process.cwd() + "/package.json")(${JSON.stringify(specifier)});
export default value;
${exportsCode}
`;
};

const serverCjsBridges = new Map([
  [
    "react",
    createServerCjsBridge("react", [
      "Children",
      "Component",
      "Fragment",
      "Profiler",
      "PureComponent",
      "StrictMode",
      "Suspense",
      "cloneElement",
      "createContext",
      "createElement",
      "createRef",
      "forwardRef",
      "isValidElement",
      "lazy",
      "memo",
      "startTransition",
      "use",
      "useCallback",
      "useContext",
      "useDebugValue",
      "useDeferredValue",
      "useEffect",
      "useId",
      "useImperativeHandle",
      "useInsertionEffect",
      "useLayoutEffect",
      "useMemo",
      "useReducer",
      "useRef",
      "useState",
      "useSyncExternalStore",
      "useTransition",
      "version",
    ]),
  ],
  [
    "react/jsx-runtime",
    createServerCjsBridge("react/jsx-runtime", ["Fragment", "jsx", "jsxs"]),
  ],
  [
    "react/jsx-dev-runtime",
    createServerCjsBridge("react/jsx-dev-runtime", ["Fragment", "jsxDEV"]),
  ],
  [
    "react-dom",
    createServerCjsBridge("react-dom", [
      "createPortal",
      "flushSync",
      "preconnect",
      "prefetchDNS",
      "preinit",
      "preinitModule",
      "preload",
      "preloadModule",
      "requestFormReset",
      "useFormState",
      "useFormStatus",
      "version",
    ]),
  ],
  [
    "react-dom/server",
    createServerCjsBridge("react-dom/server", [
      "renderToPipeableStream",
      "renderToReadableStream",
      "renderToStaticMarkup",
      "renderToString",
      "resume",
      "resumeToPipeableStream",
      "version",
    ]),
  ],
  ["picomatch", createServerCjsBridge("picomatch", ["picomatch"])],
  [
    "source-map-js",
    createServerCjsBridge("source-map-js", [
      "SourceMapConsumer",
      "SourceMapGenerator",
      "SourceNode",
    ]),
  ],
  ["eventemitter3", createServerCjsBridge("eventemitter3", ["EventEmitter"])],
  ["esbuild", createServerCjsBridge("esbuild", ["build", "transform"])],
  ["js-yaml", createServerCjsBridge("js-yaml", ["load", "dump"])],
  ["lodash.kebabcase", createServerCjsBridge("lodash.kebabcase")],
  ["slugify", createServerCjsBridge("slugify")],
  ["dayjs", createServerCjsBridge("dayjs")],
  ["dayjs/plugin/utc", createServerCjsBridge("dayjs/plugin/utc")],
  ["dayjs/plugin/timezone", createServerCjsBridge("dayjs/plugin/timezone")],
]);

const serverEsmAliases = new Map([
  ["devalue", pathToFileURL(loadAstroConfig.resolve("devalue")).href],
  ["shiki", pathToFileURL(loadAstroConfig.resolve("shiki")).href],
]);
const serverEsmSpecifiers = [
  "@astrojs/markdown-satteri",
  "es-module-lexer",
  "smol-toml",
  "zod",
  "zod/v4",
];

const serverDependencyBridge = {
  name: "devosfera:server-dependency-bridge",
  enforce: "pre" as const,
  applyToEnvironment(environment: { name: string }) {
    return ["astro", "ssr", "prerender"].includes(environment.name);
  },
  configEnvironment(name: string) {
    if (["astro", "ssr", "prerender"].includes(name)) {
      return {
        resolve: {
          noExternal: [
            "@astrojs/internal-helpers",
            "picomatch",
            "react",
            "react-dom",
          ],
        },
      };
    }
  },
  resolveId(id: string) {
    if (id.startsWith("\0devosfera:server-cjs:")) return id;
    if (serverEsmAliases.has(id)) return serverEsmAliases.get(id);
    if (serverCjsBridges.has(id)) return `\0devosfera:server-cjs:${id}`;
  },
  load(id: string) {
    if (id.startsWith("\0devosfera:server-cjs:")) {
      return serverCjsBridges.get(id.slice("\0devosfera:server-cjs:".length));
    }
  },
  transform(
    this: { environment?: { name: string } },
    code: string,
    id: string
  ) {
    if (
      !this.environment ||
      !["astro", "ssr", "prerender"].includes(this.environment.name)
    ) {
      return;
    }

    let transformed = code;
    for (const [specifier] of serverCjsBridges) {
      const bridgeId = `\0devosfera:server-cjs:${specifier}`;
      transformed = transformed
        .replaceAll(`from "${specifier}"`, `from "${bridgeId}"`)
        .replaceAll(`from '${specifier}'`, `from '${bridgeId}'`)
        .replaceAll(`import("${specifier}")`, `import("${bridgeId}")`)
        .replaceAll(`import('${specifier}')`, `import('${bridgeId}')`);
    }
    for (const [specifier, resolvedUrl] of serverEsmAliases) {
      transformed = transformed
        .replaceAll(`from "${specifier}"`, `from "${resolvedUrl}"`)
        .replaceAll(`from '${specifier}'`, `from '${resolvedUrl}'`)
        .replaceAll(`import("${specifier}")`, `import("${resolvedUrl}")`)
        .replaceAll(`import('${specifier}')`, `import('${resolvedUrl}')`);
    }

    const importerId = id.split("?", 1)[0];
    if (isAbsolute(importerId) && importerId.includes("node_modules")) {
      for (const specifier of serverEsmSpecifiers) {
        const resolvedUrl = resolveServerImport(specifier, importerId);
        if (!resolvedUrl) continue;
        transformed = transformed
          .replaceAll(`from "${specifier}"`, `from "${resolvedUrl}"`)
          .replaceAll(`from '${specifier}'`, `from '${resolvedUrl}'`)
          .replaceAll(`import("${specifier}")`, `import("${resolvedUrl}")`)
          .replaceAll(`import('${specifier}')`, `import('${resolvedUrl}')`);
      }
    }

    if (transformed !== code) return { code: transformed, map: null };
  },
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "always",
  // Prefetch same-origin pages on hover to make intentional navigation feel
  // instant, without downloading every page during the initial render.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    react(),
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: (page: string) => {
        const pathname =
          new URL(page, SITE.website).pathname.replace(/\/+$/, "") || "/";

        if (pathname === "/search") return false;
        if (!SITE.showArchives && pathname === "/archives") return false;

        return true;
      },
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
    plugins: [serverDependencyBridge, tailwindcss()],
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
            // Subset of the full CJK font (~15 MB); regenerate when adding new characters.
            src: ["./src/assets/fonts/gen-sen-rounded-tw-subset.woff2"],
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
