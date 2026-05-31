## 1. Remove Audio Player

- [x] 1.1 Delete `src/components/IntroAudio.astro`
- [x] 1.2 Delete `src/components/IntroAudioCompact.astro`
- [x] 1.3 Delete `src/utils/introAudioStore.ts`
- [x] 1.4 Remove `introAudio` import and render block from `src/pages/index.astro`
- [x] 1.5 Remove `IntroAudioCompact` import and render block from `src/components/Header.astro`
- [x] 1.6 Remove `introAudio` config block from `src/config.ts`

## 2. Add Hero Image Config

- [x] 2.1 Add `heroImage` optional string field to `SITE` in `src/config.ts` (default: `""`)

## 3. Implement Hero Background Image

- [x] 3.1 In `src/pages/index.astro`, apply `heroImage` as CSS `background-image` on the hero `<section>` when set
- [x] 3.2 Add a semi-transparent overlay `<div>` inside the hero section (positioned absolute, full cover) when `heroImage` is set
- [x] 3.3 Ensure hero text content sits above the overlay via `z-index` / `relative` positioning

## 4. Verify

- [x] 4.1 Run `astro dev`, confirm no audio player appears on homepage or in header
- [x] 4.2 Set `heroImage` to a test image path, confirm background renders correctly in both light and dark mode
- [x] 4.3 Set `heroImage` to `""`, confirm hero renders without background image
- [x] 4.4 Run `astro build` to confirm no build errors
