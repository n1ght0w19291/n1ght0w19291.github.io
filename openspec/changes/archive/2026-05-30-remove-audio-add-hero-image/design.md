## Context

目前首頁 hero 區塊包含一個串流音樂播放器（IntroAudio），因版權疑慮需移除。移除後 hero 區塊視覺上較為空洞，改以全寬背景圖片填補，並在 `config.ts` 加入 `heroImage` 設定供作者自行替換圖片。

## Goals / Non-Goals

**Goals:**
- 完整移除 IntroAudio / IntroAudioCompact 元件及 audioStore 工具
- 首頁 hero section 可顯示一張可配置的全寬背景圖，文字疊加其上
- 圖片設定為 optional——留空時 hero 維持原有無圖樣式

**Non-Goals:**
- 不實作輪播或多張圖片
- 不支援影片背景
- 不修改 Header 的結構（僅移除播放器節點）
- 不新增 CMS 介面，圖片路徑由作者直接在 config.ts 指定

## Decisions

### 決策 1：圖片以 CSS `background-image` 渲染，而非 `<img>` 或 Astro `<Image>`

**選擇**: 在 hero `<section>` 上以 inline style 設 `background-image`，搭配 `background-size: cover; background-position: center`。

**理由**: 背景圖不是語義性內容，無需 alt text 或 SEO 加分；CSS background 天然支援 `object-fit: cover` 的等效行為，且不需要 Astro image pipeline 處理（圖片直接放 public/，不需要 import）。若改用 `<Image>` 則需額外處理 z-index 疊加與 position absolute，增加複雜度。

**替代方案**: `<Image>` 放 position absolute，然後在其上方疊 hero 內容——架構較複雜。

### 決策 2：overlay 半透明遮罩確保文字可讀性

**選擇**: 在圖片上方加一層 `::before` 或 `<div>` 半透明 overlay（`bg-background/60`），讓現有 hero 文字在各種圖片上都清晰可讀。

**理由**: 背景圖片亮暗不定，不加 overlay 則文字可能消失在背景中。使用 CSS 變數 `--background` 讓 overlay 自動適應 dark / light theme。

### 決策 3：`heroImage` 路徑指向 `/public`，不透過 Astro image optimization

**選擇**: `heroImage: "/images/hero.jpg"` 這類 public-relative 路徑，由 CSS background-image 直接引用。

**理由**: 背景圖只需一種尺寸（100vw），不需要 Astro 的 srcset / 響應式處理。簡化配置，作者只需把圖片丟進 public/ 目錄並填路徑。

## Risks / Trade-offs

- **[Risk] 大型圖片拖慢首頁載入** → Mitigation：在 design doc 中提醒作者在 config 旁加建議尺寸（如 1920×600px、壓縮後 < 500KB）。
- **[Risk] overlay 遮蓋圖片太深，失去放圖的意義** → Mitigation：opacity 設為 `0.5`–`0.6`，並在 config 中保留可調整空間（或直接讓作者改 CSS 變數）。
- **[Risk] light mode / dark mode overlay 色調不同** → Mitigation：overlay 使用 `bg-background/60`，dark mode 時 `--background` 為深色，overlay 自然變深；light mode 則較淺。效果上可接受。
