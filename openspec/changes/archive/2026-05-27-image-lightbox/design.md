## Context

`PostDetails.astro` 已有完整的 post 渲染流程，包含 inline `<script is:inline>` 區塊負責 copy button、progress bar、heading links 等功能。文章內容由 MDX/Markdown render 出來的 `<img>` 標籤沒有點擊放大行為。現有技術棧：Astro 6、Tailwind CSS v4、Vanilla JS（無 React 依賴於 post layout）。

## Goals / Non-Goals

**Goals:**
- 文章頁所有 `<img>` 元素點擊後以 overlay 方式全螢幕顯示原圖
- 支援 Escape 鍵與點擊背景關閉
- 動畫流暢，transition 配合現有 aurora 視覺風格（accent 色系）
- 零外部依賴，不增加 JS bundle
- 與 Astro View Transitions 相容（re-attach on `astro:after-swap`）

**Non-Goals:**
- 多圖 gallery 導覽（上一張 / 下一張）
- 手機 pinch-to-zoom 縮放手勢（原生 overflow 已足夠）
- About 頁或 Project 頁的圖片（僅限文章頁）

## Decisions

### 1. Vanilla JS inline script，不新增元件檔案

**決定**：直接在 `PostDetails.astro` 的 `<script is:inline>` 區塊新增 `attachLightbox()` 函式，與現有 `attachCopyButtons()`、`addHeadingLinks()` 模式一致。

**理由**：現有 post layout 的互動功能全部走 inline script pattern，保持一致性。不需要額外的 Astro island，避免 hydration overhead。

**替代方案考量**：新增獨立 `.astro` component → 多一個檔案但功能無法重用於其他頁面，增加複雜度不划算。

### 2. CSS-only overlay（無 JS animation library）

**決定**：用 CSS `transition` + `opacity` / `transform` 控制 overlay 進出場動畫，顏色使用 `var(--accent)` / `var(--background)` 配合主題。

**理由**：保持與現有 aurora、nav-hover 等動畫一致的 compositor-friendly 做法（只 transition opacity/transform，不 layout-triggering properties）。

**替代方案考量**：Framer Motion / GSAP → 外部依賴，overkill。

### 3. `data-lightbox-ignore` 跳過特定圖片

**決定**：預設攔截 `#article img`，若圖片帶有 `data-lightbox-ignore` 屬性則跳過，供 badge、icon 等小圖使用。

**理由**：About 頁的 WakaTime badge 等裝飾性圖片不應被 lightbox 攔截，但需要一個 opt-out 機制。

## Risks / Trade-offs

- **View Transitions re-attach**：Astro 的 `astro:after-swap` 事件需要重新呼叫 `attachLightbox()`，與現有 pattern 相同，已有對應處理。
- **Scroll lock**：overlay 開啟時需鎖定 `body` scroll，關閉時恢復，需注意 iOS Safari 的 `-webkit-overflow-scrolling` 相容性 → 用 `document.body.style.overflow = 'hidden'` 即可，現代 mobile browser 均支援。
- **圖片原始尺寸**：若圖片本身就很小（icon 等），放大後會模糊 → 透過 `data-lightbox-ignore` 讓使用者 opt-out。

## Migration Plan

1. 修改 `PostDetails.astro`，新增 lightbox CSS 至 `<style>` 區塊
2. 新增 `attachLightbox()` 函式至現有 `<script is:inline>` 區塊
3. 在 script 末端呼叫 `attachLightbox()`，並在 `astro:after-swap` handler 中加入 `attachLightbox()`
4. 無需 migration，無 breaking change，純新增行為
