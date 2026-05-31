### Requirement: projects schema accepts ogImage field
The `projects` content collection schema SHALL include an optional `ogImage` field that accepts either a local image asset (via Astro's `image()` helper) or a remote URL string.

#### Scenario: Local image path in frontmatter
- **WHEN** a project's frontmatter contains `ogImage: ./cover.png`
- **THEN** Astro resolves it as an optimized local asset and `entry.data.ogImage.src` is a valid URL

#### Scenario: Remote URL string in frontmatter
- **WHEN** a project's frontmatter contains `ogImage: "https://example.com/image.png"`
- **THEN** `entry.data.ogImage` is the string `"https://example.com/image.png"`

#### Scenario: Field omitted
- **WHEN** `ogImage` is not present in a project's frontmatter
- **THEN** `entry.data.ogImage` is `undefined` and no validation error occurs

### Requirement: project detail page resolves OG image via cascade
The `[project].astro` detail page SHALL resolve the final OG image URL using the following priority order and pass it to `<Layout ogImage={...}>`:
1. Custom `ogImage` from frontmatter (local asset `.src` or remote URL string)
2. Satori-generated image at `/projects/[slug]/og.png` when `SITE.dynamicOgImage` is `true`
3. Site-wide fallback (Layout default — `/og.png` or `SITE.ogImage`)

#### Scenario: Custom ogImage takes priority
- **WHEN** `entry.data.ogImage` is defined
- **THEN** `<meta property="og:image">` references that image URL, not the satori-generated path

#### Scenario: Satori fallback when ogImage absent and dynamicOgImage enabled
- **WHEN** `entry.data.ogImage` is `undefined` and `SITE.dynamicOgImage` is `true`
- **THEN** `<meta property="og:image">` references `/projects/[slug]/og.png`

#### Scenario: Site fallback when dynamicOgImage disabled
- **WHEN** `entry.data.ogImage` is `undefined` and `SITE.dynamicOgImage` is `false`
- **THEN** `<Layout>` receives no `ogImage` prop and falls back to its own default

### Requirement: /projects/[slug]/og.png endpoint generates satori image
A new static route `src/pages/projects/[project]/og.png.ts` SHALL generate a PNG OG image for each project that does not have a custom `ogImage`.

#### Scenario: Route generated for projects without custom ogImage
- **WHEN** `SITE.dynamicOgImage` is `true` and a project has no `ogImage` in frontmatter
- **THEN** a static path `/projects/[slug]/og.png` is generated at build time

#### Scenario: Route skipped for projects with custom ogImage
- **WHEN** a project has `ogImage` defined in frontmatter
- **THEN** no `/projects/[slug]/og.png` static path is generated for that project (avoids redundant build work)

#### Scenario: Route skipped when dynamicOgImage disabled
- **WHEN** `SITE.dynamicOgImage` is `false`
- **THEN** `getStaticPaths()` returns an empty array and no PNG routes are generated

#### Scenario: Generated image is a valid PNG
- **WHEN** the `/projects/[slug]/og.png` endpoint is requested
- **THEN** the response has `Content-Type: image/png` and a non-empty body

### Requirement: generateOgImageForProject utility function
`src/utils/generateOgImages.ts` SHALL export a `generateOgImageForProject` function that accepts a `CollectionEntry<"projects">` and returns a PNG buffer.

#### Scenario: Function renders project title
- **WHEN** `generateOgImageForProject` is called with a project entry
- **THEN** the resulting PNG encodes the project's `title` as the headline

#### Scenario: Author fallback to SITE.author
- **WHEN** a project entry has no `author` field
- **THEN** the OG image uses `SITE.author` as the author attribution
