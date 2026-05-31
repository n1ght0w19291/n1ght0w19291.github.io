## Why

音樂播放器因版權疑慮而不再適合使用，移除後首頁上方空間可改用靜態背景圖片，讓視覺效果更具個人風格且無授權風險。

## What Changes

- **BREAKING** 移除 `introAudio` 設定區塊及相關 UI 元件（`IntroAudio.astro`、`IntroAudioCompact.astro`、`introAudioStore.ts`）
- 移除 `src/pages/index.astro` 與 `src/components/Header.astro` 中的音樂播放器渲染邏輯
- 新增 `heroImage` 設定至 `src/config.ts`，允許指定一張本地圖片路徑（可選，留空則不顯示背景圖）
- Hero section 套用全寬背景圖，圖片以 `object-cover` 方式填滿整個 hero 區塊，文字內容疊放於上方

## Capabilities

### New Capabilities

- `hero-background-image`: 首頁 hero 區塊可選擇性地顯示一張全寬背景圖片，文字覆蓋其上

### Modified Capabilities

<!-- 無現有 spec 需要修改（intro-audio 無對應 spec） -->

## Impact

- **Deleted files**: `src/components/IntroAudio.astro`、`src/components/IntroAudioCompact.astro`、`src/utils/introAudioStore.ts`
- **Modified**: `src/config.ts`（移除 `introAudio`，新增 `heroImage`）
- **Modified**: `src/pages/index.astro`（移除音樂播放器，加入背景圖渲染）
- **Modified**: `src/components/Header.astro`（移除 compact 播放器）
- **Assets**: 使用者需自行將圖片放至 `public/` 目錄
