## Why

子文章（child post）目前缺乏與母文章的導航串聯：麵包屑只顯示通用的 "cd .." 而非指向母文章，且文章底部的「上一篇 / 下一篇」是跨所有文章的全域導航，讀者在瀏覽系列子文章時無法自然地在同系列內移動。

## What Changes

- 麵包屑（Breadcrumb）的返回按鈕，對子文章改為顯示母文章的路徑（例如 `cd ../picoctf`），點擊後導向母文章頁面。
- 文章底部的 Prev/Next 導航，對子文章改為僅在同一母文章的子文章之間切換，而非全域所有文章。
- 母文章的 Prev/Next 導航維持原有的全域行為不變。

## Capabilities

### New Capabilities

- `child-post-breadcrumb`: 子文章的麵包屑返回按鈕顯示母文章路徑，並連結至母文章。
- `child-post-sibling-nav`: 子文章底部的 Prev/Next 導航在同母文章的兄弟子文章間切換。

### Modified Capabilities

<!-- 無現有 spec 需要修改 -->

## Impact

- `src/layouts/PostDetails.astro` — Prev/Next 邏輯與麵包屑 props 傳遞
- `src/components/Breadcrumb.astro` — 新增接收「父文章連結」的 prop
- `src/pages/posts/[...slug]/index.astro` — 傳遞 parentPost 資料至 layout
