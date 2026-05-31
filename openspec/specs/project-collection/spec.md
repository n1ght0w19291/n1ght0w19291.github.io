## ADDED Requirements

### Requirement: Projects content collection is defined
The system SHALL define a `projects` Astro content collection backed by `src/data/project/` with a Zod schema.

#### Scenario: Collection is registered
- **WHEN** `src/content.config.ts` is loaded
- **THEN** a collection named `projects` exists with `loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/project" })`

#### Scenario: Valid frontmatter passes schema
- **WHEN** a project file has `title`, `description`, and `pubDatetime` fields
- **THEN** Astro collects the entry without error

#### Scenario: Missing required field fails schema
- **WHEN** a project file omits `title`
- **THEN** Astro reports a content collection validation error at build time

### Requirement: Project schema fields
The project schema SHALL include: `title` (string, required), `description` (string, required), `pubDatetime` (date, required), `coverImage` (Astro `image()`, optional), `tags` (array of strings, default `[]`), `draft` (boolean, optional).

#### Scenario: coverImage is optional
- **WHEN** a project file has no `coverImage` frontmatter field
- **THEN** the entry is collected successfully and `coverImage` is `undefined`

#### Scenario: Tags default to empty array
- **WHEN** a project file has no `tags` field
- **THEN** `entry.data.tags` equals `[]`

### Requirement: Project slug is derived from folder name
The system SHALL expose a `getProjectSlug(id: string): string` helper in `src/utils/contentEntry.ts` that strips `/<filename>.<ext>` from the collection entry `id` to return the folder name.

#### Scenario: Slug extraction
- **WHEN** `id` is `"day-off/day-off.md"`
- **THEN** `getProjectSlug(id)` returns `"day-off"`

#### Scenario: MDX extension handled
- **WHEN** `id` is `"carbon-diary/carbon-diary.mdx"`
- **THEN** `getProjectSlug(id)` returns `"carbon-diary"`
