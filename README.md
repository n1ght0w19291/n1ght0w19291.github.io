# Personal Blog

Personal blog built with [Astro](https://astro.build), based on a heavily customized fork of [Devosfera](https://github.com/0xdres/devosfera) (which itself is based on [AstroPaper](https://github.com/satnaing/astro-paper)).

**🌐 Live site:** [n1ght0w19291.github.io](https://n1ght0w19291.github.io)

> [!IMPORTANT]
> **Social links and personal URLs are loaded from environment variables.**
> Copy `.env.example` → `.env` and fill in your own values before running the project.
> See the [Configuration](#%EF%B8%8F-configuration) section for details.

---

## Table of contents

1. [Features](#-features)
2. [Project structure](#-project-structure)
3. [Installation and local development](#-installation-and-local-development)
4. [Commands](#-commands)
5. [Deploying to GitHub Pages](#-deploying-to-github-pages)
6. [Creating content](#-creating-content)
   - [Posts](#posts-srcdatablog)
   - [Image galleries](#galleries-srcdatagalleries)
7. [GalleryEmbed component](#%EF%B8%8F-galleryembed-component)
8. [Configuration](#%EF%B8%8F-configuration)
9. [License](#-license)

---

## ✨ Features

### Core (inherited from AstroPaper)

- Type-safe Markdown, good performance, accessible and responsive
- Full SEO (meta tags, Open Graph, sitemap, RSS), light/dark mode
- Dynamically generated OG images with Satori

### Modern design

- Hero with animated prompt configurable from `heroTerminalPrompt` in `src/config.ts`
- Global backdrop: grid + cursor glow + noise texture (all pages), optional and configurable from `src/config.ts`
- Glassmorphism on navbar, cards, and modals

### Custom typography

| Role         | Font                    |
| :----------- | :---------------------- |
| Body         | `Wotfard` (local)       |
| Code / Mono  | `Cascadia Code` (local) |
| Italics / H3 | `Sriracha` (local)      |

### Global search (⌘K)

Modal via `⌘K` / `Ctrl+K` powered by **Pagefind** (static index) with full keyboard navigation. The search index is only generated in production — run `pnpm run build` before testing it locally.

### Image galleries (`/galleries`)

- Albums in `src/data/galleries/<slug>/`; images optimized at build-time (srcset, WebP, lazy)
- Native lightbox with `<dialog>`, keyboard navigation, and edge-aware prev/next controls
- `<GalleryEmbed>` to embed galleries inside MDX posts without importing
- Controlled by `showGalleries` in `src/config.ts` — see [GALLERIES.md](GALLERIES.md)

### Unified mixed feed (posts + galleries)

- Optional mixed feed controlled by `showGalleriesInIndex` in `src/config.ts`
- When both flags are enabled, gallery entries appear in `/`, `/posts`, `/archives`, `/tags`, and `/rss.xml`
- Gallery entries include a visual badge in cards and archive timeline items

### Branded audio player

- Intro audio player in the hero with terminal aesthetic (wave bars, progress bar)
- Fully togglable and configurable from `src/config.ts`

### Redesigned pages

| Page        | Highlights                                                          |
| :---------- | :------------------------------------------------------------------ |
| `/` Home    | Terminal hero, featured grid, section counters, optional mixed feed |
| `/archives` | Vertical timeline with glow, includes gallery entries               |
| `/tags`     | Grid with proportional progress bar                                 |
| `/search`   | Reactive aurora, restyled Pagefind                                  |
| Posts       | Paginated mixed feed (posts + galleries), inline Pagefind search    |

---

## 🚀 Project structure

```
/
├── public/
│   ├── audio/             # Audio files (intro, etc.)
│   └── pagefind/          # Search index (generated at build)
├── src/
│   ├── assets/            # Local fonts, SVG icons and logo
│   ├── components/        # Reusable Astro components
│   ├── data/
│   │   ├── blog/          # Posts .md / .mdx
│   │   └── galleries/     # Galleries (one folder per album)
│   ├── layouts/           # Root layout, PostDetails, etc.
│   ├── pages/             # Astro routes
│   ├── styles/            # global.css, typography.css
│   └── utils/             # Filters, OG with Satori, Shiki transformers
└── astro.config.ts
```

---

## 👨🏻‍💻 Installation and local development

**Requirements:** Node.js 20+ and pnpm.

```bash
# 1. Clone and install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env
# fill in your own values in .env

# 3. Development server
pnpm run dev
# → http://localhost:4321
```

The Pagefind search index is **only available in the production build**. To test it locally:

```bash
pnpm run build && pnpm run preview
```

---

## 🧞 Commands

| Command            | Action                                              |
| :----------------- | :-------------------------------------------------- |
| `pnpm install`     | Install dependencies                                |
| `pnpm run dev`     | Local dev server at `localhost:4321`                |
| `pnpm run build`   | Production build (`astro check` + build + Pagefind) |
| `pnpm run preview` | Preview the production build                        |
| `pnpm run format`  | Format with Prettier                                |
| `pnpm run lint`    | Lint with ESLint                                    |

---

## 🚢 Deploying to GitHub Pages

This repo includes a GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that automatically builds and deploys to GitHub Pages on every push to `main`.

**One-time setup:**

1. Go to your repo **Settings → Pages**
2. Under **Build and deployment**, set source to **GitHub Actions**
3. Add your environment variables under **Settings → Secrets and variables → Actions** (as repository variables prefixed with `PUBLIC_`)
4. Push to `main` — the workflow handles the rest

---

## 📝 Creating content

### Posts (`src/data/blog/`)

Create a `.md` or `.mdx` file with the following frontmatter:

```yaml
---
title: "Post title"
pubDatetime: 2026-01-15T10:00:00Z # required — ISO 8601 with timezone
description: "Short description for SEO and cards"
tags: ["astro", "dev"]
featured: false # highlight on the home page
draft: false # hidden in production
timezone: "Asia/Taipei" # overrides SITE.timezone
hideEditPost: false
---
```

**MDX**: JSX components can be used directly. `<GalleryEmbed>` is available without importing it.

**Table of Contents**: add `## Table of contents` to the post body to auto-generate the TOC with `remark-toc` + `remark-collapse`.

**Annotated code blocks** (via Shiki transformers):

```
// [!code highlight]      → highlight the line
// [!code ++]             → added line (diff)
// [!code --]             → removed line (diff)
// fileName: file.ts      → display the filename above the block
```

---

### Galleries (`src/data/galleries/`)

Quick setup:

1. Create a folder in `src/data/galleries/<slug>/`.
2. Add `index.md` (gallery metadata) and image files.
3. Use numeric prefixes (`01-`, `02-`, …) to control image order.
4. The folder slug becomes the route: `/galleries/<slug>`.

For full details (frontmatter fields, cover behavior, alt generation, and image optimization), see [GALLERIES.md](GALLERIES.md).

---

## 🖼️ GalleryEmbed component

Embed a gallery inside any `.mdx` post — **no import needed**:

```mdx
<GalleryEmbed slug="my-gallery-slug" />
```

Optional props: `limit` (`0` = all), `cols` (`2 | 3 | 4`), `showLink` (`true/false`).

For full props reference and lightbox behavior, see [GALLERIES.md](GALLERIES.md#galleryembed--gallery-inside-mdx-posts).

---

## ⚙️ Configuration

All site configuration lives in `src/config.ts` (the `SITE` constant). It includes general settings (title, description, timezone), feature toggles (galleries, audio player, mixed feed), and content limits (posts per page, gallery embed limit).

Social links and "Share" links are defined in `src/constants.ts`, but the actual URLs are loaded from environment variables:

| Variable                 | What it controls                         |
| :----------------------- | :--------------------------------------- |
| `PUBLIC_SOCIAL_GITHUB`   | GitHub profile link & JSON-LD author URL |
| `PUBLIC_SOCIAL_X`        | X / Twitter profile link                 |
| `PUBLIC_SOCIAL_LINKEDIN` | LinkedIn profile link                    |
| `PUBLIC_SOCIAL_EMAIL`    | Contact email (`mailto:` link)           |
| `PUBLIC_EDIT_POST_URL`   | "Edit this post" button base URL         |
| `PUBLIC_ENABLE_RSS`      | Set to `"true"` to enable `/rss.xml`     |

Any variable left unset simply hides that link — no errors, no broken UI.

```bash
cp .env.example .env
# fill in your own values
```

For GitHub Pages, add these as repository **Variables** (not Secrets, since they're `PUBLIC_`) under **Settings → Secrets and variables → Actions**.

---

## 📜 License

Based on [AstroPaper](https://github.com/satnaing/astro-paper) by [Sat Naing](https://satnaing.dev), licensed under MIT.
Customized by [0xdres](https://github.com/0xdres) as [Devosfera](https://github.com/0xdres/devosfera).
Further customizations by [n1ght0w1](https://github.com/n1ght0w19291).
