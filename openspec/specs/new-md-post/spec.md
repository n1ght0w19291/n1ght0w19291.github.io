## ADDED Requirements

### Requirement: Scaffold a Markdown blog post
The script (`scripts/new-md-post.js`) SHALL create a new `.md` file under `src/data/blog/` with valid YAML frontmatter matching the blog collection schema defined in `src/content.config.ts`.

The generated frontmatter SHALL include:
- `title` — the filename argument (without extension)
- `description` — empty string placeholder (`''`)
- `pubDatetime` — current UTC datetime in ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.000Z`)
- `tags` — empty array (`[]`)
- `draft` — `false`

#### Scenario: Create post with filename argument
- **WHEN** the user runs `pnpm new-md-post my-new-post`
- **THEN** the file `src/data/blog/my-new-post.md` is created with valid frontmatter and a success message is printed

#### Scenario: Auto-append .md extension
- **WHEN** the user runs `pnpm new-md-post my-post` (no extension)
- **THEN** the script appends `.md` and creates `src/data/blog/my-post.md`

#### Scenario: Respect explicit .md extension
- **WHEN** the user runs `pnpm new-md-post my-post.md`
- **THEN** the script creates `src/data/blog/my-post.md` without doubling the extension

### Requirement: Guard against missing filename
The script SHALL exit with a non-zero code and print a usage message if no filename argument is provided.

#### Scenario: No arguments given
- **WHEN** the user runs `pnpm new-md-post` with no arguments
- **THEN** the script prints an error message showing correct usage and exits with code `1`

### Requirement: Guard against overwriting existing files
The script SHALL refuse to overwrite an existing file and exit with code `1`.

#### Scenario: Target file already exists
- **WHEN** the user runs `pnpm new-md-post existing-post` and `src/data/blog/existing-post.md` already exists
- **THEN** the script prints an error message and exits with code `1` without modifying the file
