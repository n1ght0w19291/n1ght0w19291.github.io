## Context

The project uses Astro with a `src/data/blog/` directory for blog content. The blog collection schema (defined in `src/content.config.ts`) requires:

- `title` (string, required)
- `pubDatetime` (date, required)
- `description` (string, required)
- `tags` (string array, defaults to `["others"]`)
- `draft` (boolean, optional)
- `author` (string, defaults to `SITE.author`)
- Optional: `modDatetime`, `featured`, `ogImage`, `canonicalURL`, `hideEditPost`, `timezone`

Currently there is no tooling to scaffold new posts; developers copy-paste from existing files, risking missing required fields or using the wrong date format.

## Goals / Non-Goals

**Goals:**
- Two npm scripts (`new-md-post`, `new-mdx-post`) invokable via `pnpm new-md-post <filename>` or `npx pnpm new-md-post <filename>`
- Scaffold files directly into `src/data/blog/`
- Populate all required frontmatter fields with sensible defaults
- Auto-append `.md` / `.mdx` extension when omitted
- Exit with a non-zero code and clear message if the file already exists or no filename is given

**Non-Goals:**
- Interactive prompts (keep it scriptable)
- Creating image asset directories (not part of this project's workflow unlike the reference project)
- Modifying or validating existing posts

## Decisions

**Plain Node.js ESM scripts (no new dependencies)**
The reference scripts (`n1ght0w19291.github.io/scripts/`) are simple Node.js files with no external dependencies. This project follows the same pattern. Using a scaffolding framework (Plop, Hygen) would add unnecessary complexity for two short scripts.

**ISO 8601 datetime with timezone offset for `pubDatetime`**
The schema uses `z.date()` which Astro parses from ISO 8601 strings. Existing posts use both `2026-01-22T10:00:00Z` and `2026-02-25T21:28:55.000-06:00`. The scripts will emit `YYYY-MM-DDTHH:mm:ss.000Z` (UTC) as a safe, unambiguous default.

**Separate scripts, not a shared entry point**
Two focused scripts (`new-md-post.js`, `new-mdx-post.js`) are simpler to maintain and understand than a single script with a `--type` flag. The difference between them is only the file extension and the MDX comment block.

**Scripts placed in `scripts/` directory**
Consistent with Node.js ecosystem conventions and similar to the reference project structure.

## Risks / Trade-offs

- [User picks a filename that doesn't slug well] → Filenames are used as-is; Astro derives the slug from the filename, so users should use kebab-case. The script will not enforce this, keeping it simple.
- [Generated `pubDatetime` is UTC but user is in another timezone] → UTC is unambiguous and consistent; users can edit the field after generation if needed.

## Migration Plan

No migration required. The scripts are additive. Adding two entries to `package.json` `scripts` and two files to `scripts/` does not affect any existing functionality.
