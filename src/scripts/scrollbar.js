document.addEventListener("DOMContentLoaded", () => {
  const customScrollbars = document.querySelectorAll(".custom-scrollbar");

  customScrollbars.forEach((scrollbar) => {
    scrollbar.addEventListener("mouseover", () => {
      scrollbar.style.setProperty("--scrollbar-height", "6px");
      scrollbar.style.setProperty("--scrollbar-thumb-height", "6px");
    });
    scrollbar.addEventListener("mouseout", () => {
      scrollbar.style.setProperty("--scrollbar-height", "4px");
      scrollbar.style.setProperty("--scrollbar-thumb-height", "4px");
    });
  });
});
