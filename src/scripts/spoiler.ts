document.querySelectorAll<HTMLElement>(".spoiler").forEach(el => {
  el.addEventListener("click", () => {
    el.toggleAttribute("data-revealed");
  });
});
