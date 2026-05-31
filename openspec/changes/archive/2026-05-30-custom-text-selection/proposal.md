## Why

瀏覽器預設的文字選取反白色（通常是藍色系）與部落格的主題配色不一致，自訂為 accent 色可讓細節更精緻、風格更統一。

## What Changes

- 在 `src/styles/global.css` 新增 `::selection` CSS 規則
- 選取背景色使用 `var(--accent)` 搭配低透明度（約 30%），讓選取區域帶有主題色調但不遮蔽文字
- 選取文字色使用 `var(--foreground)`，確保可讀性
- light / dark 兩種主題自動套用各自的 `--accent` 色（CSS 變數已各自定義）

## Capabilities

### New Capabilities

- `text-selection-color`: 全站文字選取反白使用 accent 主題色

### Modified Capabilities

<!-- 無現有 spec 需要修改 -->

## Impact

- **Modified**: `src/styles/global.css` — 新增 `::selection` 規則
- 無需修改 TypeScript、元件或設定檔
