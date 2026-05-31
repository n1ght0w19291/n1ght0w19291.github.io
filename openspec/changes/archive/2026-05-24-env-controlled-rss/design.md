## Context

RSS feed 目前由 `src/pages/rss.xml.ts` 產生，直接從 `blog` 與 `projects` collection 撈取資料並輸出。Astro 的環境變數以 `PUBLIC_` 前綴暴露給客戶端，但因為 RSS 端點是 SSG/SSR 端點，可以直接透過 `import.meta.env` 讀取。

## Goals / Non-Goals

**Goals:**
- 透過單一環境變數 `PUBLIC_ENABLE_RSS`（值為 `"true"` 時啟用）控制 RSS feed 的開關
- 預設停用（變數不存在或非 `"true"` 時皆停用）
- 停用時讓 `/rss.xml` 回傳 HTTP 404，而非空的 XML feed

**Non-Goals:**
- 不依據文章類型分別控制（blog vs projects 個別開關已有 `SITE.showProjects` 處理）
- 不影響任何其他頁面或功能
- 不新增 UI 介面控制

## Decisions

### 回傳 404 而非空 feed

**決策**：停用時回傳 `new Response(null, { status: 404 })`，而非空的 `<channel>` XML。

**理由**：空 feed 仍然是一個有效的 RSS 端點，RSS reader 會嘗試訂閱並定期輪詢，產生不必要的流量。回傳 404 能清楚表達「此功能不存在」，讓 RSS reader 停止嘗試。

**替代方案**：回傳空 XML feed — 被排除，因為不能達到「完全不暴露」的目的。

### 使用 `PUBLIC_` 前綴環境變數

**決策**：變數命名為 `PUBLIC_ENABLE_RSS`。

**理由**：與 Astro 慣例一致（`PUBLIC_` 前綴在 SSR 與 SSG 皆可用），且若未來需要在客戶端判斷是否顯示 RSS 訂閱連結，同一個變數可直接複用。

**替代方案**：使用非 `PUBLIC_` 變數（只在 server 端可用）— 被排除，因為未來客戶端邏輯可能需要讀取此值。

## Risks / Trade-offs

- [靜態部署快取] 若以 SSG 模式建置，切換環境變數需要重新 build 才生效 → 這是 Astro SSG 的既有限制，文件中應說明需重新部署
- [誤設值] 使用者可能設 `PUBLIC_ENABLE_RSS=True`（大寫）導致判斷失敗 → 在檢查時使用 `=== "true"` 嚴格比對，並在 `.env.example` 說明只接受小寫 `true`
