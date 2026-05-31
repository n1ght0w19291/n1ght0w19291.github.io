## Context

部落格使用 Astro Content Collections，文章分為「母文章」與「子文章」。子文章透過 `parentPost` frontmatter 欄位指向母文章（使用母文章的 filename slug）。目前：

- `Breadcrumb.astro` 的返回按鈕固定顯示 `cd ..`，點擊後透過 `sessionStorage.backUrl` 動態解析前一頁，與母文章無直接關聯。
- `PostDetails.astro` 的 Prev/Next 邏輯使用傳入的完整 `posts` 陣列（全域所有文章排序），子文章的鄰居可能是完全不相關的文章。
- `[...slug]/index.astro` 已將 `children` 傳遞給 PostDetails，但母文章資訊只作 children lookup key，不傳入 layout。

## Goals / Non-Goals

**Goals:**
- 子文章的麵包屑返回按鈕顯示 `cd ../<parent-slug>` 並固定連結至母文章。
- 子文章底部 Prev/Next 在同母文章的兄弟子文章之間切換（依 pubDatetime 排序）。
- 母文章行為完全不變。

**Non-Goals:**
- 改動 URL 結構或 routing。
- 修改麵包屑的右側路徑 `ol`（只改左側返回按鈕）。
- 支援三層以上巢狀文章。

## Decisions

### 1. Breadcrumb 新增 `backTo` prop

**決策**：在 `Breadcrumb.astro` 加入 `backTo?: { label: string; href: string }` prop。當存在時，覆蓋返回按鈕的顯示文字與 `href`，並停用 `sessionStorage` JS 覆寫邏輯（直接以靜態 `href` 渲染）。

**替代方案**：在 `PostDetails` 中直接 hack `Breadcrumb` 的 DOM，或用 slot 插入自訂按鈕。拒絕：前者脆弱，後者需大改 Breadcrumb 結構。

**`backTo.label`** 設為 `../<parent-slug>`（取母文章 URL 最後一段），顯示例如 `cd ../picoctf`，符合現有的 terminal 主題。

### 2. 傳遞母文章資料至 PostDetails

**決策**：在 `[...slug]/index.astro` 的 `getStaticPaths` 中，對每個子文章查找對應的母文章 entry，並透過 props 傳入 `PostDetails`（新增 `parentPost?: CollectionEntry<"blog">` prop）。PostDetails 再從中計算 `backTo` 傳給 `Breadcrumb`。

**替代方案**：在 `PostDetails` 內重新查 collection。拒絕：layout 應避免資料查詢，保持 presentation-only。

### 3. Prev/Next 使用 siblings

**決策**：在 `[...slug]/index.astro` 新增 `siblings` props，對子文章傳入同母文章的兄弟陣列（已依 pubDatetime 排序）；對母文章或獨立文章傳 `undefined`。PostDetails 收到 `siblings` 時，用它取代 `posts` 做 Prev/Next 計算。

兄弟陣列在 `getStaticPaths` 中已有（`childrenByParent` map），只需在 map 時一起傳出。

**替代方案**：PostDetails 收到 `parentPost` 後自行從 `posts` 過濾兄弟。可行但需在 layout 做業務邏輯過濾，不如在 page 層處理乾淨。

## Risks / Trade-offs

- **`backTo.label` 的 slug 取法**：從 `getPath()` 回傳的 URL 取最後一段，若 URL 結構改變會跟著壞掉。緩解：封裝成小 helper，並加上測試。
- **兄弟只有一篇時**：Prev/Next 兩格皆為空，版面不破版（現有 `<div />` 佔位邏輯已處理）。
- **`sessionStorage` JS 的停用條件**：目前 script 是以 `withBackButton` prop 決定是否注入。加入 `backTo` 後，當 `backTo` 存在時跳過 `sessionStorage` 覆寫，但仍可設定 `backButton href` 的初始值為靜態 URL，無需額外條件分支。

## Migration Plan

1. 更新 `Breadcrumb.astro`：加 `backTo` prop，調整按鈕渲染與 JS。
2. 更新 `PostDetails.astro`：加 `parentPost`、`siblings` props；調整 Prev/Next 邏輯；傳 `backTo` 給 Breadcrumb。
3. 更新 `[...slug]/index.astro`：查找 `parentPostEntry`，傳入 `parentPost` 與 `siblings`。

無 breaking change，無 migration。現有母文章與獨立文章不傳 `parentPost`/`siblings`，行為保持不變。
