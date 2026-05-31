## Context

`::selection` 是標準 CSS 偽元素，控制使用者以滑鼠拖曳或鍵盤選取文字時的高亮樣式。目前專案未設定此規則，因此使用瀏覽器預設（Chrome 藍色 `#0078d7`），與主題的 accent 色不一致。

## Goals / Non-Goals

**Goals:**
- 讓選取反白色與主題 accent 色一致，light / dark 兩種模式自動適應

**Non-Goals:**
- 不新增獨立的 CSS 變數（直接使用現有 `--accent`、`--foreground`）
- 不支援 per-element 的不同選取色

## Decisions

### 決策：背景色使用 `color-mix` 降低 accent 飽和度，而非純 accent 色

**選擇**: `background-color: color-mix(in srgb, var(--accent) 30%, transparent)`

**理由**: 純 accent 色（`#1158d1`）當選取背景時過於濃重，尤其在 light 主題下會遮蓋文字。`color-mix` 讓背景色保有 accent 的色相但透明度足夠，文字依然清晰可讀。30% 是視覺上的平衡點——明顯但不刺眼。

**替代方案**: 直接用 `opacity: 0.3` 但 `::selection` 不支援 opacity；用固定 rgba 值則無法跟隨 CSS 變數動態變化。

## Risks / Trade-offs

- **[Risk] Firefox 舊版不支援 `color-mix`** → Mitigation：`color-mix` 自 Firefox 113（2023）起支援，現代瀏覽器覆蓋率超過 93%，可接受。不支援的瀏覽器退回預設選取色。
