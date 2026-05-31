## 1. Lightbox CSS

- [x] 1.1 在 `PostDetails.astro` 的 `<style>` 區塊新增 lightbox overlay 樣式（`#lightbox-overlay`、backdrop dim、圖片置中）
- [x] 1.2 新增 overlay open/close transition（`opacity` + `pointer-events`，配合現有 aurora 風格）
- [x] 1.3 新增 `#article img:not([data-lightbox-ignore])` 的 `cursor: zoom-in` 樣式

## 2. Lightbox JavaScript

- [x] 2.1 在 `PostDetails.astro` 的 `<script is:inline>` 區塊新增 `attachLightbox()` 函式
- [x] 2.2 實作：建立 overlay DOM 元素（`#lightbox-overlay` + `<img>`），避免重複建立（guard check）
- [x] 2.3 實作：遍歷 `#article img:not([data-lightbox-ignore])`，綁定 click 開啟 lightbox
- [x] 2.4 實作：開啟 lightbox 時設定 `document.body.style.overflow = 'hidden'`
- [x] 2.5 實作：點擊 backdrop 關閉 lightbox，恢復 `body.style.overflow`
- [x] 2.6 實作：Escape 鍵關閉 lightbox（`keydown` listener，on open attach / on close detach）
- [x] 2.7 在 script 底部呼叫 `attachLightbox()`
- [x] 2.8 在 `astro:after-swap` handler 中加入 `attachLightbox()` 呼叫（`data-astro-rerun` 使整個 script 自動重跑，已涵蓋此需求）

## 3. 驗證

- [x] 3.1 本地啟動 dev server，開啟任一包含圖片的 writeup（如 `Pre-Exam2026.mdx`），確認點擊圖片可開啟 overlay
- [x] 3.2 確認 Escape 鍵與點擊背景均可關閉
- [x] 3.3 確認 `cursor: zoom-in` 在 hover 時正確顯示
- [x] 3.4 確認帶有 `data-lightbox-ignore` 的圖片不觸發 lightbox
- [x] 3.5 確認 View Transitions 頁面切換後 lightbox 仍正常運作
- [x] 3.6 確認 body scroll lock 在開啟與關閉時正確切換
