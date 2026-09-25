let cursorCleanup: AbortController | null = null;

document.addEventListener("astro:page-load", () => {
  // Cleanup previous listeners
  if (cursorCleanup) cursorCleanup.abort();
  cursorCleanup = new AbortController();
  const { signal } = cursorCleanup;

  // Skip on touch devices and respect reduced-motion preference.
  if (
    window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)")
      .matches
  ) {
    return;
  }

  const cursorGlow = document.querySelector<HTMLElement>(".site-cursor-glow");
  let ticking = false;
  let isActive = false;

  if (!cursorGlow) return;

  document.addEventListener(
    "mousemove",
    (e: MouseEvent) => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        cursorGlow.style.setProperty("--site-cx", `${e.clientX}px`);
        cursorGlow.style.setProperty("--site-cy", `${e.clientY}px`);
        if (!isActive) {
          cursorGlow.classList.add("active");
          isActive = true;
        }
        ticking = false;
      });
    },
    { signal, passive: true }
  );

  document.addEventListener(
    "mouseleave",
    () => {
      if (!isActive) return;
      cursorGlow.classList.remove("active");
      isActive = false;
    },
    { signal }
  );
});
