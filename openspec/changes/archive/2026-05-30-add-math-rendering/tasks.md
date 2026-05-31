## 1. Install Dependencies

- [x] 1.1 Install `remark-math` and `rehype-katex` via pnpm
- [x] 1.2 Verify compatible versions with current Astro 6 / unified ecosystem

## 2. Configure Astro Markdown Pipeline

- [x] 2.1 Import `remarkMath` and `rehypeKatex` in `astro.config.ts`
- [x] 2.2 Add `remarkMath` to `markdown.remarkPlugins` (before other remark plugins)
- [x] 2.3 Add `rehypeKatex` to `markdown.rehypePlugins`

## 3. Add KaTeX CSS

- [x] 3.1 Import `katex/dist/katex.min.css` in `src/styles/global.css`

## 4. Create Math Showcase Draft Post

- [x] 4.1 Create `src/data/blog/math-showcase.mdx` with `draft: true` frontmatter
- [x] 4.2 Add inline math examples (Greek letters, fractions, superscripts/subscripts)
- [x] 4.3 Add block math examples (sum/integral, aligned equation system, matrix)
- [x] 4.4 Add CTF crypto-relevant examples (modular arithmetic, RSA formula, elliptic curve)

## 5. Verify

- [x] 5.1 Run `astro dev` and open the math showcase draft page to confirm visual rendering
- [x] 5.2 Confirm existing posts are unaffected (spot-check one non-math post)
- [x] 5.3 Run `astro build` to confirm no build errors
