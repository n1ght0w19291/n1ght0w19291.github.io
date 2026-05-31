## ADDED Requirements

### Requirement: RSS feed is disabled by default
系統 SHALL 在 `PUBLIC_ENABLE_RSS` 環境變數未設定或其值不為字串 `"true"` 時，停用 RSS feed 端點。

#### Scenario: 未設定環境變數時存取 /rss.xml
- **WHEN** `PUBLIC_ENABLE_RSS` 未設定（或為 `"false"`）
- **THEN** `GET /rss.xml` 回傳 HTTP 404

#### Scenario: 環境變數為非 true 字串時存取 /rss.xml
- **WHEN** `PUBLIC_ENABLE_RSS` 設為 `"True"`、`"TRUE"`、`"1"` 或任何非 `"true"` 的值
- **THEN** `GET /rss.xml` 回傳 HTTP 404

### Requirement: RSS feed 可透過環境變數啟用
系統 SHALL 在 `PUBLIC_ENABLE_RSS` 嚴格等於字串 `"true"` 時，產生完整的 RSS feed。

#### Scenario: 啟用後存取 /rss.xml
- **WHEN** `PUBLIC_ENABLE_RSS` 設為 `"true"`
- **THEN** `GET /rss.xml` 回傳 HTTP 200 且包含有效的 RSS XML

#### Scenario: 啟用後 blog 文章出現在 feed 中
- **WHEN** `PUBLIC_ENABLE_RSS=true` 且 blog collection 有已發布文章
- **THEN** 這些文章 SHALL 出現在 RSS items 中

#### Scenario: 啟用後 project 文章依現有規則出現在 feed 中
- **WHEN** `PUBLIC_ENABLE_RSS=true` 且 `SITE.showProjects` 與 `SITE.showProjectsInIndex` 皆為 true
- **THEN** project 文章 SHALL 出現在 RSS items 中

#### Scenario: 啟用後 project 文章依現有規則被排除
- **WHEN** `PUBLIC_ENABLE_RSS=true` 但 `SITE.showProjects` 或 `SITE.showProjectsInIndex` 為 false
- **THEN** project 文章 SHALL NOT 出現在 RSS items 中

### Requirement: .env.example 說明 RSS 環境變數
專案 SHALL 在 `.env.example` 中提供 `PUBLIC_ENABLE_RSS` 的範例設定與說明，預設值為 `false`。

#### Scenario: 開發者初始化環境時能看到 RSS 設定說明
- **WHEN** 開發者複製 `.env.example` 建立 `.env`
- **THEN** 檔案中 SHALL 包含 `PUBLIC_ENABLE_RSS=false` 及簡短說明，提示只有 `true`（小寫）才會啟用
