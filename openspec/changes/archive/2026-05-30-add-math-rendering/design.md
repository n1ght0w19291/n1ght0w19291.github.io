## Context

目前 `astro.config.ts` 的 markdown pipeline 使用多個 remark/rehype plugins（remarkToc、remarkCollapse、remarkGithubAlerts 等），但沒有處理 LaTeX 數學語法。KaTeX 是目前在靜態生成場景下最快、最輕量的數學渲染方案，透過 `remark-math`（解析 `$`/`$$` 語法）+ `rehype-katex`（轉換為 HTML）的組合可無縫整合到 Astro 的 markdown pipeline。

## Goals / Non-Goals

**Goals:**
- 讓 `.md` 和 `.mdx` 中的 `$...$`（inline）與 `$$...$$`（block）語法在 build time 渲染為 KaTeX HTML
- 新增一個 draft blog 文章作為數學公式渲染確認頁面
- 不影響現有文章的渲染結果

**Non-Goals:**
- 不支援 MathJax（選 KaTeX 因其 build-time 渲染效能更好）
- 不實作動態 / client-side 渲染
- 不修改 OG image 生成邏輯（Satori 不支援 KaTeX，OG 文字維持原樣）

## Decisions

### 決策 1：使用 `remark-math` + `rehype-katex`（而非 `@nichtsfrei/remark-katex` 等其他選項）

**選擇**: `remark-math@6` + `rehype-katex@7`（unified ecosystem 官方套件）

**理由**: 這是 unified/remark 生態的標準組合，與 Astro 的 markdown pipeline 完全相容；社群維護活躍、文件完整；`rehype-katex` 在 build time 生成靜態 HTML，無需 client JS（KaTeX CSS 仍需引入）。

**替代方案**: `astro-math-katex`（較少人維護）、`@nichtsfrei/remark-katex`（較新但生態較小）。

### 決策 2：KaTeX CSS 透過 CDN 引入 vs 本地

**選擇**: 使用 `katex/dist/katex.min.css`（npm 套件隨附）import 到全域 CSS。

**理由**: 已透過 npm 安裝，不需要額外 CDN 請求；與現有 Tailwind 全域 CSS 的引入方式一致。

### 決策 3：showcase 頁面為 `draft: true` 的 blog 文章

**選擇**: 放在 `src/data/blog/math-showcase.mdx`，`draft: true`。

**理由**: 現有系統已處理 draft 邏輯（build 時排除），本地開發時仍可預覽。統一放在 blog collection 不需要另建路由或頁面 template。

## Risks / Trade-offs

- **[Risk] Tailwind Typography 與 KaTeX HTML 的 CSS 衝突** → Mitigation：KaTeX 的 CSS 優先級通常高於 prose reset，但若有視覺問題可在全域 CSS 加 `.katex` 的 scoped override。
- **[Risk] `$$` block 公式在 MDX 中被當作 JSX expression 解析** → Mitigation：`remark-math` 需在 MDX 的 remark plugins 中加入，`extendMarkdownConfig: true` 已設定，所以 markdown plugins 會自動套用到 MDX；需確認順序正確（remark-math 要在其他 plugins 前面）。
- **[Risk] remark-math 版本與現有 remark 生態不相容** → Mitigation：`remark-math@6` 支援 unified v11，與 Astro 6.x 使用的版本相符。
