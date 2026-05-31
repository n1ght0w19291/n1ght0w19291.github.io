## ADDED Requirements

### Requirement: Scaffold an MDX blog post
The script (`scripts/new-mdx-post.js`) SHALL create a new `.mdx` file under `src/data/blog/` with valid YAML frontmatter matching the blog collection schema defined in `src/content.config.ts`, plus an MDX comment placeholder in the body.

The generated frontmatter SHALL include:
- `title` — the filename argument (without extension)
- `description` — empty string placeholder (`''`)
- `pubDatetime` — current UTC datetime in ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.000Z`)
- `tags` — empty array (`[]`)
- `draft` — `false`

The body SHALL contain a JSX comment placeholder: `{/* 可以在這裡加入 MDX 或 React 元件 */}`

#### Scenario: Create MDX post with filename argument
- **WHEN** the user runs `pnpm new-mdx-post my-new-post`
- **THEN** the file `src/data/blog/my-new-post.mdx` is created with valid frontmatter, an MDX comment placeholder, and a success message is printed

#### Scenario: Auto-append .mdx extension
- **WHEN** the user runs `pnpm new-mdx-post my-post` (no extension)
- **THEN** the script appends `.mdx` and creates `src/data/blog/my-post.mdx`

#### Scenario: Respect explicit .mdx extension
- **WHEN** the user runs `pnpm new-mdx-post my-post.mdx`
- **THEN** the script creates `src/data/blog/my-post.mdx` without doubling the extension

### Requirement: Guard against missing filename
The script SHALL exit with a non-zero code and print a usage message if no filename argument is provided.

#### Scenario: No arguments given
- **WHEN** the user runs `pnpm new-mdx-post` with no arguments
- **THEN** the script prints an error message showing correct usage and exits with code `1`

### Requirement: Guard against overwriting existing files
The script SHALL refuse to overwrite an existing file and exit with code `1`.

#### Scenario: Target file already exists
- **WHEN** the user runs `pnpm new-mdx-post existing-post` and `src/data/blog/existing-post.mdx` already exists
- **THEN** the script prints an error message and exits with code `1` without modifying the file
