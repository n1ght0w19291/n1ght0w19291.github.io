## Why

`katex.min.css` 預設將公式文字顏色設為黑色（`color: black`），導致 dark mode 下公式幾乎不可見（黑字疊在深色背景上）。需要讓 KaTeX 元素跟隨主題的文字顏色。

## What Changes

- 在 `src/styles/global.css` 新增一條 CSS 規則，強制 `.katex` 元素 `color: inherit`，讓它繼承父層的文字顏色
- dark mode 下父層文字色為 `--foreground`（`#f6f7f8`），公式自動變為淺色可讀

## Capabilities

### New Capabilities

<!-- 無新 capability，屬於既有 math-rendering capability 的 dark mode 修正 -->

### Modified Capabilities

- `math-rendering`: dark mode 下公式需可讀，新增 dark mode 顏色繼承需求

## Impact

- **Modified**: `src/styles/global.css` — 新增一條 `.katex { color: inherit; }` 規則
- 無需修改元件、設定檔或 astro.config.ts
