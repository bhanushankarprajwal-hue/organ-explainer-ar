// Light ("clinic clean") is the default; dark ("calm dark") is one tap away.
// Loaded in <head> on every page so the page never flashes the wrong colours.
(function () {
  var root = document.documentElement;
  var theme = "light";
  try { theme = localStorage.getItem("theme") || "light"; } catch (e) {}
  root.dataset.theme = theme;
  function label(btn) {
    var dark = root.dataset.theme === "dark";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", dark ? "Light theme" : "Dark theme");
    btn.innerHTML = dark
      ? '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }
  function all() { document.querySelectorAll(".theme-btn").forEach(label); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".theme-btn");
    if (!b) return;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (err) {}
    all();
    document.dispatchEvent(new CustomEvent("themechange", { detail: root.dataset.theme }));
  });
  document.addEventListener("DOMContentLoaded", all);
})();
