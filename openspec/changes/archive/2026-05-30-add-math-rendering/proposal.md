## Why

技術型部落格（尤其是 CTF crypto writeup）需要在 Markdown/MDX 中渲染 LaTeX 數學公式，目前這個 Astro blog 缺乏此支援，導致只能用截圖或純文字替代，閱讀體驗較差。

## What Changes

- 新增 `rehype-katex` 與 `remark-math` 套件，讓 `$...$`（inline）與 `$$...$$`（block）語法可在 `.md` 和 `.mdx` 檔案中渲染為 KaTeX HTML
- 在 `astro.config.ts` 的 markdown 設定中加入 remark/rehype plugins
- 在全域 CSS 引入 KaTeX stylesheet
- 新增一個 `src/data/blog/math-showcase.mdx` 草稿頁面，展示各種數學公式範例供作者確認渲染效果

## Capabilities

### New Capabilities

- `math-rendering`: 在 md/mdx 內容中支援 KaTeX 數學公式渲染（inline `$` 與 block `$$` 語法）
- `math-showcase-draft`: 一個 draft 部落格頁面，示範並驗證各類數學公式正確顯示

### Modified Capabilities

<!-- 無現有 spec 需要修改 -->

## Impact

- **Dependencies**: 新增 `remark-math`、`rehype-katex`
- **Config**: `astro.config.ts` — markdown plugins 設定
- **Styles**: `src/styles/global.css` — 引入 KaTeX CSS
- **Content**: 新增 `src/data/blog/math-showcase.mdx`（draft: true）
