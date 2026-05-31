## Why

目前 RSS 功能預設是開啟的，任何文章和 project 都會自動進入 RSS feed，沒有辦法透過環境變數在不同部署環境之間輕鬆切換。希望能讓 RSS 功能預設關閉，必須明確設定 `PUBLIC_ENABLE_RSS=true` 才會啟用，以避免在開發或測試環境中意外對外暴露 feed 內容。

## What Changes

- 在 `.env.example` 新增 `PUBLIC_ENABLE_RSS` 環境變數（預設 `false`）
- 當 `PUBLIC_ENABLE_RSS` 不為 `"true"` 時，`/rss.xml` 端點回傳 404 或空 feed，且不包含任何文章或 project
- 當 `PUBLIC_ENABLE_RSS=true` 時，RSS 行為維持現狀（blog posts + 條件式 project posts）

## Capabilities

### New Capabilities

- `rss-env-toggle`: 透過 `PUBLIC_ENABLE_RSS` 環境變數控制 RSS feed 的啟用與停用；預設為停用（`false`），設為 `true` 才會產生有內容的 feed

### Modified Capabilities

<!-- 無現有 spec 行為需要變更 -->

## Impact

- `src/pages/rss.xml.ts`：加入環境變數檢查，未啟用時回傳 404
- `.env.example`：新增 `PUBLIC_ENABLE_RSS=false` 說明
- 不影響現有的 blog、project 或其他頁面邏輯
