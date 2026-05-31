## 1. 環境變數設定

- [x] 1.1 在 `.env.example` 新增 `PUBLIC_ENABLE_RSS=false` 及說明（僅 `true` 小寫才啟用）

## 2. RSS 端點實作

- [x] 2.1 在 `src/pages/rss.xml.ts` 讀取 `import.meta.env.PUBLIC_ENABLE_RSS`
- [x] 2.2 當值不嚴格等於 `"true"` 時，回傳 `new Response(null, { status: 404 })`
- [x] 2.3 確認啟用時現有的 blog + project 邏輯維持不變

## 3. 驗證

- [x] 3.1 本地不設定 `PUBLIC_ENABLE_RSS`，確認 `/rss.xml` 回傳 404
- [x] 3.2 設定 `PUBLIC_ENABLE_RSS=true`，確認 `/rss.xml` 回傳有效 RSS XML
- [x] 3.3 設定 `PUBLIC_ENABLE_RSS=True`（大寫），確認仍回傳 404
