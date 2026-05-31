## 1. Breadcrumb Component

- [x] 1.1 在 `Breadcrumb.astro` 的 `Props` type 加入 `backTo?: { label: string; href: string }` 欄位
- [x] 1.2 將返回按鈕的顯示文字改為：有 `backTo` 時顯示 `cd ${backTo.label}`，否則顯示 `cd ..`
- [x] 1.3 將返回按鈕的靜態 `href` 改為：有 `backTo` 時使用 `backTo.href`，否則保持 `/`
- [x] 1.4 修改 `sessionStorage` 更新 script：當 `backTo` 存在時跳過 href 覆寫（加條件判斷或不注入 script）

## 2. PostDetails Layout

- [x] 2.1 在 `PostDetails.astro` 的 `Props` type 加入 `parentPost?: CollectionEntry<"blog">` 與 `siblings?: CollectionEntry<"blog">[]`
- [x] 2.2 在 frontmatter 計算 `backTo`：若有 `parentPost`，取其 URL 最後段作為 label，組成 `{ label: "../<slug>", href: getPath(...) }`
- [x] 2.3 將 `backTo` 傳遞給 `<Breadcrumb>` component
- [x] 2.4 將 Prev/Next 邏輯改為：有 `siblings` 時從 siblings 計算，否則沿用現有 `posts` 邏輯

## 3. Slug Page

- [x] 3.1 在 `[...slug]/index.astro` 的 `Props` type 加入 `parentPost?: CollectionEntry<"blog">` 與 `siblings?: CollectionEntry<"blog">[]`
- [x] 3.2 在 `getStaticPaths` 中查找每個子文章的 parent entry（從 `allPosts` 依 `parentPost` field 比對）
- [x] 3.3 在 `getStaticPaths` 的 map 中，對子文章傳入 `parentPost` entry 與 `siblings`（即 `childrenByParent.get(parentPostId)` 陣列）
- [x] 3.4 將 `parentPost` 與 `siblings` 從 `Astro.props` 解構，並傳給 `<PostDetails>`
