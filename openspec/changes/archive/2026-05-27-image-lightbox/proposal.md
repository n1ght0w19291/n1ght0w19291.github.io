## Why

CTF writeup 文章通常包含大量截圖（終端機輸出、反編譯結果、解題過程），但目前點擊圖片沒有任何放大效果，使用者只能看到縮小版本，無法清楚閱讀細節。加入 Lightbox 讓圖片可以點擊放大，提升技術文章的閱讀體驗。

## What Changes

- 新增 `ImageLightbox` 客戶端元件（Vanilla JS），在文章頁中攔截所有 `<img>` 的點擊事件
- 點擊圖片後以全螢幕 overlay 顯示原始圖片，支援縮放與拖曳
- 支援鍵盤關閉（Escape）及點擊背景關閉
- 整合至 `PostDetails.astro`，不影響其他頁面

## Capabilities

### New Capabilities

- `image-lightbox`: 文章頁圖片點擊放大的 Lightbox overlay 功能，支援鍵盤操作與背景點擊關閉

### Modified Capabilities

（無現有 spec 需要變更）

## Impact

- 修改 `src/layouts/PostDetails.astro`：注入 lightbox 初始化 script 與 CSS
- 新增 `src/components/ImageLightbox.astro`（或純 inline script）
- 無外部依賴，使用 Vanilla JS 實作，不影響 bundle size 與 SSG 流程
- 不影響 Pagefind 索引（lightbox overlay 不含內容節點）
