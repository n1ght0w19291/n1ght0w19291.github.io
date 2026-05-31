## Context

KaTeX 的 `katex.min.css` 在 `.katex` 根元素上設定了預設文字顏色（通常是 `black` 或透過字型顏色繼承）。這個顏色是靜態的，不會跟隨 CSS 變數 `--foreground` 變化。本專案的 dark mode 透過 `html[data-theme="dark"]` 切換，在 dark 主題下 `--foreground: #f6f7f8`（淺色），但 KaTeX 元素仍保持深色文字，造成不可見。

## Goals / Non-Goals

**Goals:**
- dark mode 下 KaTeX 公式文字顏色自動適應為淺色（跟隨 `--foreground`）
- light mode 行為維持不變

**Non-Goals:**
- 不修改 KaTeX CSS 套件本身
- 不針對個別公式元素做樣式覆寫，只需頂層繼承即可

## Decisions

### 決策：在 `.katex` 上設定 `color: inherit`

**選擇**: 在 `global.css` 加一行 `.katex { color: inherit; }`，讓 KaTeX 根元素繼承父層文字色。

**理由**: KaTeX 的所有子元素都從 `.katex` 繼承顏色。只要 `.katex` 跟隨父層的 `color`，父層在 dark mode 下的淺色文字色（`--foreground`）就會向下傳遞。這是最小侵入性的修法，不需要 dark-only 的 CSS 區塊，也不需要 `!important`。

**替代方案**:
- `html[data-theme="dark"] .katex { color: var(--foreground); }` — 可行但多餘，`color: inherit` 已足夠且更通用
- 在 `astro.config.ts` 改用 server-side 主題切換 CSS ——不需要，過度複雜

## Risks / Trade-offs

- **[Risk] `inherit` 在某些巢狀元件中顏色不正確** → Mitigation：KaTeX 的父層元素都在 prose 文字區塊內，`color` 永遠是合理的前景色，不會有意外值。
