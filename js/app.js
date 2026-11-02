// =============================================================
// App logic: home screen, condition screen, dots, AR, language.
// You do not need to change this file. Text lives in data.js.
// =============================================================

let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
let current = null;
let viewMode = "outside";   // "outside" = realistic model, "inside" = cut-open model
const V = (c) => c.views[viewMode];

// Pick text in the chosen language. Falls back to English.
function t(obj) {
  if (!obj) return "";
  return (obj[lang] && obj[lang].trim()) ? obj[lang] : obj.en;
}
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---------- Language ----------
function setLanguage(code, fromClick) {
  lang = code;
  try { localStorage.setItem("lang", code); } catch (e) {}
  document.documentElement.lang = code;
  document.querySelectorAll(".lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === code));
  if (fromClick && code === "ta") showToast(UI_TEXT.tamilCheck.ta + " / " + UI_TEXT.tamilCheck.en);
  render();
}
document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLanguage(b.dataset.lang, true)));

function fillStaticText() {
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(UI_TEXT[el.dataset.t]); });
  $("credits").innerHTML = CREDITS.map((c) =>
    `${esc(c.what)}: <a href="${esc(c.url)}" target="_blank" rel="noopener">“${esc(c.name)}”</a> by ${esc(c.author)} (${esc(c.license)})`).join(" · ") + ". Disease parts and colours added for this project.";
}

// ---------- Home ----------
function renderHome() {
  $("cards").innerHTML = CONDITIONS.map((c) => `
    <a class="c-card" href="#${c.id}">
      <div class="thumb">
        <img src="images/thumb-${c.id}.png" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'icon',textContent:'${c.icon}'}))">
        <span class="badge real">${t(UI_TEXT.realModel)}</span>
      </div>
      <div class="c-body">
        <p class="organ">${esc(t(c.organ))}</p>
        <h2>${esc(t(c.name))}</h2>
        <p>${esc(t(c.short))}</p>
        <span class="go">${Object.values(c.views).reduce((n, v) => n + v.healthyHotspots.length + v.diseasedHotspots.length, 0)} ${esc(t(UI_TEXT.parts))} →</span>
      </div>
    </a>`).join("");
}

// ---------- Condition ----------
const hotspotButtons = { healthy: [], diseased: [] };

function makeHotspots(mv, list, kind) {
  mv.querySelectorAll(".hotspot").forEach((h) => h.remove());
  hotspotButtons[kind] = [];
  list.forEach((h, i) => {
    const b = document.createElement("button");
    b.className = "hotspot";
    b.slot = "hotspot-" + kind + "-" + h.id;
    b.dataset.position = h.position;
    if (h.normal) b.dataset.normal = h.normal;
    b.dataset.visibilityAttribute = "visible";
    b.textContent = i + 1;
    b.setAttribute("aria-label", t(h.title));
    b.addEventListener("click", (e) => { e.stopPropagation(); openInfo(h, kind, i); });
    mv.appendChild(b);
    hotspotButtons[kind].push(b);
  });
  $("parts-" + kind).innerHTML = list.map((h, i) => `<li><button data-kind="${kind}" data-i="${i}"><span class="n">${i + 1}</span>${esc(t(h.title))}</button></li>`).join("");
}

document.addEventListener("click", (e) => {
  const b = e.target.closest(".parts button");
  if (!b || !current) return;
  const kind = b.dataset.kind, i = +b.dataset.i;
  const h = (kind === "healthy" ? V(current).healthyHotspots : V(current).diseasedHotspots)[i];
  openInfo(h, kind, i, true);
});

function loadModel(mv, src) {
  if (mv.getAttribute("src") !== src) mv.setAttribute("src", src);
}

function renderCondition(c) {
  $("c-organ").textContent = t(c.organ);
  $("c-name").textContent = t(c.name);
  $("c-organ-about").textContent = t(c.organAbout);
  $("c-about").textContent = t(c.about);
  $("c-warning").textContent = t(c.warning);
  $("c-treatment").innerHTML = c.treatment.map((s) => `<li><h3>${esc(t(s.title))}</h3><p>${esc(t(s.text))}</p></li>`).join("");

  const v = V(c);
  const mh = $("mv-healthy"), md = $("mv-diseased"), mc = $("mv-compare");
  const key = c.id + ":" + viewMode;
  if (mh.dataset.cond !== key) {
    [mh, md].forEach((m) => {
      m.setAttribute("camera-orbit", v.orbit);
      m.setAttribute("camera-target", "auto auto auto");
      m.cameraOrbit = v.orbit; m.cameraTarget = "auto auto auto"; m.fieldOfView = "auto";
      m.dataset.cond = key;
      m.dataset.pendingOrbit = v.orbit;
    });
  }
  loadModel(mh, v.healthyModel);
  loadModel(md, v.diseasedModel);
  loadModel(mc, v.compareModel);
  mh.alt = t(UI_TEXT.healthy) + " " + t(c.organ);
  md.alt = t(c.name);
  makeHotspots(mh, v.healthyHotspots, "healthy");
  makeHotspots(md, v.diseasedHotspots, "diseased");
  document.querySelectorAll(".view-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === viewMode);
    b.setAttribute("aria-pressed", b.dataset.view === viewMode);
  });
  $("view-hint").textContent = t(viewMode === "outside" ? UI_TEXT.outsideHint : UI_TEXT.insideHint);
  applyMotion();
  document.title = t(c.name) + " · " + t(UI_TEXT.appName);
}

// ---------- Info sheet ----------
let openState = null;
function openInfo(h, kind, i, fromList) {
  document.querySelectorAll(".hotspot.active, .parts button.active").forEach((x) => x.classList.remove("active"));
  const btn = hotspotButtons[kind][i];
  if (btn) btn.classList.add("active");
  const li = document.querySelector(`.parts button[data-kind="${kind}"][data-i="${i}"]`);
  if (li) li.classList.add("active");
  // turn the model so the chosen part faces the viewer
  if (fromList && h.normal) {
    const mv = $(kind === "healthy" ? "mv-healthy" : "mv-diseased");
    const [x, y, z] = h.normal.split(" ").map(parseFloat);
    const theta = Math.atan2(x, z) * 180 / Math.PI;
    const phi = Math.acos(Math.max(-1, Math.min(1, y))) * 180 / Math.PI;
    mv.cameraOrbit = `${theta.toFixed(0)}deg ${Math.max(20, Math.min(160, phi)).toFixed(0)}deg auto`;
    mv.cameraTarget = "auto auto auto";
  }
  // In AR, show the description inside the camera view
  if (arActive[kind]) {
    const ab = $("ar-info-" + kind);
    ab.querySelector(".ar-info-title").textContent = (i + 1) + ". " + t(h.title);
    ab.querySelector(".ar-info-text").textContent = t(h.text);
    ab.hidden = false;
    openState = { h, kind, i };
    return;
  }
  const box = $("info");
  box.className = "info " + kind;
  $("info-tag").textContent = kind === "healthy" ? t(UI_TEXT.healthy) : t(UI_TEXT.withCondition);
  $("info-title").textContent = (i + 1) + ". " + t(h.title);
  $("info-text").textContent = t(h.text);
  box.hidden = false;
  openState = { h, kind, i };
}
function closeInfo() {
  $("info").hidden = true;
  openState = null;
  document.querySelectorAll(".hotspot.active, .parts button.active").forEach((x) => x.classList.remove("active"));
}
$("info-close").addEventListener("click", closeInfo);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeInfo(); });

// When a new model finishes loading, point the camera the right way.
["mv-healthy", "mv-diseased"].forEach((id) => $(id).addEventListener("load", (e) => {
  const m = e.target;
  if (!m.dataset.pendingOrbit) return;
  m.cameraOrbit = m.dataset.pendingOrbit;
  m.cameraTarget = "auto auto auto";
  m.fieldOfView = "auto";
  m.jumpCameraToGoal();
  delete m.dataset.pendingOrbit;
}));

// ---------- AR mode: track it and use the in-AR description box ----------
const arActive = { healthy: false, diseased: false };
["healthy", "diseased"].forEach((kind) => {
  const mv = $("mv-" + kind), ab = $("ar-info-" + kind);
  mv.addEventListener("ar-status", (e) => {
    arActive[kind] = e.detail.status === "session-started";
    if (!arActive[kind]) { ab.hidden = true; closeInfo(); }
    else $("info").hidden = true;
  });
  ab.querySelector(".ar-info-close").addEventListener("click", (e) => {
    e.stopPropagation();
    ab.hidden = true;
    document.querySelectorAll(".hotspot.active").forEach((x) => x.classList.remove("active"));
  });
});

// ---------- Outside / Inside switch ----------
document.querySelectorAll(".view-switch button").forEach((b) => b.addEventListener("click", () => {
  if (viewMode === b.dataset.view || !current) return;
  viewMode = b.dataset.view;
  closeInfo();
  renderCondition(current);
}));

// ---------- Pause / play the organ movement ----------
let moving = true;
function applyMotion() {
  ["mv-healthy", "mv-diseased", "mv-compare"].forEach((id) => { const m = $(id); if (typeof m.play !== "function") return; moving ? m.play() : m.pause(); });
  const b = $("motion-btn");
  b.setAttribute("aria-pressed", moving);
  b.innerHTML = (moving ? "⏸ " : "▶ ") + "<span>" + esc(t(moving ? UI_TEXT.pauseMotion : UI_TEXT.playMotion)) + "</span>";
}
$("motion-btn").addEventListener("click", () => { moving = !moving; applyMotion(); });
["mv-healthy", "mv-diseased", "mv-compare"].forEach((id) => $(id).addEventListener("load", () => { if (!moving) $(id).pause(); }));

// ---------- Reset view buttons ----------
document.querySelectorAll("[data-reset]").forEach((b) => b.addEventListener("click", () => {
  const mv = $(b.dataset.reset);
  mv.cameraOrbit = current ? V(current).orbit : "0deg 80deg auto";
  mv.cameraTarget = "auto auto auto";
  mv.fieldOfView = "auto";
}));

// ---------- "View both in AR" ----------
const compareMV = $("mv-compare");
compareMV.addEventListener("load", () => {
  const ok = compareMV.canActivateAR;
  $("both-ar-btn").hidden = !ok;
  $("no-ar").hidden = ok;
});
$("both-ar-btn").addEventListener("click", () => compareMV.activateAR());

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  const el = $("toast");
  el.textContent = msg; el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 4000);
}

// ---------- Simple page switching (#/ and #/heart etc.) ----------
function render() {
  fillStaticText();
  const id = location.hash.replace(/^#\/?/, "");
  current = CONDITIONS.find((c) => c.id === id) || null;
  $("home").hidden = !!current;
  $("condition").hidden = !current;
  if (current) renderCondition(current); else { renderHome(); document.title = t(UI_TEXT.appName); }
  if (openState && current) openInfo(openState.h, openState.kind, openState.i); // refresh text after language change
}
window.addEventListener("hashchange", () => { closeInfo(); viewMode = "outside"; render(); window.scrollTo(0, 0); });

setLanguage(lang, false);
