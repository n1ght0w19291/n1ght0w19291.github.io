function setRouteLoading(isLoading: boolean) {
  const loader = document.querySelector<HTMLElement>("#route-loading");
  if (!loader) return;

  loader.classList.toggle("is-loading", isLoading);
  loader.setAttribute("aria-hidden", String(!isLoading));
  document.documentElement.classList.toggle(
    "route-loading-active",
    isLoading
  );
}

// Show feedback as soon as Astro starts fetching the next document.
document.addEventListener("astro:before-preparation", () =>
  setRouteLoading(true)
);

// Hide it as soon as the new DOM has been swapped in. Keep page-load as a
// fallback for browsers or navigations that skip the normal swap lifecycle.
document.addEventListener("astro:after-swap", () => setRouteLoading(false));
document.addEventListener("astro:page-load", () => setRouteLoading(false));
