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
    `<li>${esc(c.what)}: <a href="${esc(c.url)}" target="_blank" rel="noopener">“${esc(c.name)}”</a> by ${esc(c.author)} (${esc(c.license)})</li>`).join("") + "<li>Disease parts and colours added for this project.</li>";
}

// ---------- Home, organ list, AR modes, side menu ----------
const ICONS = {
  table: '<path d="M3 17h18M6 17l2-6h8l2 6M12 11V4m-3 3 3-3 3 3"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5V4a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V12m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-5-2.7L4 14.5a1.6 1.6 0 0 1 2.6-1.8L8 14"/>',
  story: '<path d="M8 5v14l11-7L8 5Z"/>',
  body: '<circle cx="12" cy="4.5" r="2.2"/><path d="M7 9.5h10M12 9.5v5m0 0-3 6m3-6 3 6M9 9.5 7.5 14M15 9.5l1.5 4.5"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9h8v6H8z"/>',
  both: '<path d="M3 17h18M5 17l1.5-5h4L12 17M12 17l1.5-5h4L19 17"/>',
};
const ico = (k) => `<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></span>`;
const MODES = [
  { id: "table", icon: "table", title: "modeTable", sub: "modeTableSub", long: "modeTableLong", needs: "needTable", pick: (c) => "#" + c.id + "/ar" },
  { id: "hand", icon: "hand", title: "modeHand", sub: "modeHandSub", long: "modeHandLong", needs: "needHand", pick: (c) => "handar.html?c=" + c.id },
  { id: "story", icon: "story", title: "modeStory", sub: "modeStorySub", long: "modeStoryLong", needs: "needAny", pick: (c) => "#" + c.id + "-story" },
  { id: "body", icon: "body", title: "modeBody", sub: "modeBodySub", long: "modeBodyLong", needs: "needCam", links: [["openBody", "body.html", true]] },
  { id: "scan", icon: "scan", title: "modeScan", sub: "modeScanSub", long: "modeScanLong", needs: "needCam", links: [["openScan", "scan.html", true], ["printCards", "cards.html"]] },
];
const U = (k) => t(UI_TEXT[k]);
const partCount = (c) => c.views.outside.healthyHotspots.length + c.views.outside.diseasedHotspots.length;
const oChip = (c, href, active) => `<a class="o-chip${active ? " active" : ""}" href="${href}"><img src="images/thumb-${c.id}.png" alt="">${esc(t(c.organ))}</a>`;

function cardHTML(c) {
  return `
    <article class="c-card">
      <a class="c-story" href="#${c.id}-story" title="${esc(U("startStory"))}" aria-label="${esc(U("startStory"))}">▶</a>
      <a href="#${c.id}" style="color:inherit;text-decoration:none;display:flex;flex-direction:column;flex:1">
        <div class="thumb"><img src="images/thumb-${c.id}.png" alt="" loading="lazy"></div>
        <div class="c-body">
          <p class="organ">${esc(t(c.organ))}</p>
          <h3>${esc(t(c.name))}</h3>
          <p class="c-short">${esc(t(c.short))}</p>
          <div class="c-meta"><span>${partCount(c)} ${esc(U("partsWord"))}</span><span class="go">${esc(U("open"))} →</span></div>
        </div>
      </a>
    </article>`;
}
function renderHome() {
  const html = CONDITIONS.map(cardHTML).join("");
  $("home-cards").innerHTML = html;
  $("cards").innerHTML = html;
  $("home-ways").innerHTML = MODES.map((m) =>
    `<a class="way" href="${m.links ? m.links[0][1] : "#ar/" + m.id}">${ico(m.icon)}<b>${esc(U(m.title))}</b><small>${esc(U(m.sub))}</small></a>`).join("");
  $("ar-modes").innerHTML = MODES.map((m) => `
    <article class="mode-card" id="mode-${m.id}">
      ${ico(m.icon)}
      <div>
        <h2>${esc(U(m.title))}</h2>
        <p>${esc(U(m.long))}</p>
        <p class="needs"><b>${esc(U("worksOn"))}:</b> ${esc(U(m.needs))}</p>
        <div class="pick">${m.pick
          ? `<span class="pick-label">${esc(U("pickOrganShort"))}</span>` + CONDITIONS.map((c) => oChip(c, m.pick(c))).join("")
          : m.links.map(([k, href, main]) => `<a class="btn${main ? " primary" : ""}" href="${href}">${esc(U(k))}</a>`).join("")}</div>
      </div>
    </article>`).join("");
}
function renderSide(activeId) {
  $("side-organs").innerHTML = CONDITIONS.map((c) =>
    `<li><a href="#${c.id}" class="${c.id === activeId ? "active" : ""}"><img src="images/thumb-${c.id}.png" alt=""><span>${esc(t(c.organ))}<small>${esc(t(c.name))}</small></span></a></li>`).join("");
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
  $("c-short").textContent = t(c.short);
  document.querySelectorAll(".c-warning").forEach((el) => { el.textContent = t(c.warning); });
  $("organ-switch").innerHTML = CONDITIONS.map((x) => oChip(x, "#" + x.id + (tab !== "3d" ? "/" + tab : ""), x.id === c.id)).join("");
  renderARActions(c);
  $("story-btn").href = "#" + c.id + "-story";
  $("hand-btn").href = "handar.html?c=" + c.id;
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
  // the "both on your table" file loads only after the two main models are ready
  mc.dataset.want = v.compareModel;
  maybeLoadCompare();
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

function maybeLoadCompare() {
  const mh = $("mv-healthy"), md = $("mv-diseased"), mc = $("mv-compare");
  const ready = (m) => m.loaded && m.getAttribute("src") && m.src.endsWith(m.getAttribute("src"));
  if (mc.dataset.want && ready(mh) && ready(md)) loadModel(mc, mc.dataset.want);
}
["mv-healthy", "mv-diseased"].forEach((id) => $(id).addEventListener("load", maybeLoadCompare));

// ---------- Tabs on the organ page: 3D / Learn / Treatment / AR ----------
let tab = "3d";
function setTab(name, keepHash) {
  tab = name;
  document.querySelectorAll(".tabs button").forEach((b) => { const on = b.dataset.tab === name; b.classList.toggle("active", on); b.setAttribute("aria-selected", on); });
  document.querySelectorAll(".tab-panel").forEach((p) => { p.hidden = p.dataset.panel !== name; });
  if (!keepHash && current) history.replaceState(null, "", "#" + current.id + (name === "3d" ? "" : "/" + name));
  if (current) $("organ-switch").querySelectorAll("a").forEach((a, i) => { a.href = "#" + CONDITIONS[i].id + (name === "3d" ? "" : "/" + name); });
}
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => { closeInfo(); setTab(b.dataset.tab); }));

// ---------- AR tab: all the ways to see this organ in AR ----------
const compareMV = $("mv-compare");
let canAR = false;
function renderARActions(c) {
  const act = (id, icon, title, sub, href) => href
    ? `<a class="ar-act" id="${id}" href="${href}">${ico(icon)}<span><b>${esc(title)}</b><small>${esc(sub)}</small></span></a>`
    : `<button type="button" class="ar-act" id="${id}">${ico(icon)}<span><b>${esc(title)}</b><small>${esc(sub)}</small></span></button>`;
  $("ar-actions").innerHTML =
    act("act-healthy", "table", U("viewHealthyAR"), U("needTable")) +
    act("act-sick", "table", U("viewSickAR"), U("needTable")) +
    act("act-both", "both", U("viewBothAR"), U("needTable")) +
    act("act-hand", "hand", U("modeHand"), U("modeHandSub"), "handar.html?c=" + c.id) +
    act("act-story", "story", U("modeStory"), U("modeStorySub"), "#" + c.id + "-story") +
    act("act-body", "body", U("modeBody"), U("modeBodySub"), "body.html");
  $("act-healthy").addEventListener("click", () => startAR("mv-healthy"));
  $("act-sick").addEventListener("click", () => startAR("mv-diseased"));
  $("act-both").addEventListener("click", () => compareMV.activateAR());
  showARButtons();
}
function showARButtons() {
  ["act-healthy", "act-sick", "act-both"].forEach((id) => { const el = $(id); if (el) el.hidden = !canAR; });
  if ($("act-both")) $("act-both").hidden = !canAR || !compareMV.loaded;
  $("no-ar").hidden = canAR;
}
function startAR(id) {
  // the viewer must be on screen to open AR, so jump to the 3D tab first
  setTab("3d");
  const mv = $(id);
  if (mv.canActivateAR) mv.activateAR();
}
["mv-healthy", "mv-diseased"].forEach((id) => $(id).addEventListener("load", () => { canAR = !!$(id).canActivateAR; showARButtons(); }));
compareMV.addEventListener("load", showARButtons);

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  const el = $("toast");
  el.textContent = msg; el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 4000);
}

// =============================================================
// GUIDED AR STORY: healthy -> disease -> inside -> treatment -> warning
// The story card lives inside the 3D viewer, so it stays visible in AR.
// =============================================================
const STORY = {
  heart:  { healthy: "lad",    diseased: ["plaque", "narrow", "risk"], inside: [["healthy", "lv"], ["diseased", "risk"]], treat: 1 },
  brain:  { healthy: "artery", diseased: ["clot", "area", "speech"],   inside: [["healthy", "cc"], ["diseased", "area"]], treat: 0 },
  lungs:  { healthy: "rlung",  diseased: ["tar", "sacs", "airways"],   inside: [["diseased", "sacs"]], treat: 0 },
  liver:  { healthy: "right",  diseased: ["fat", "swollen", "edge"],   inside: [["diseased", "fat"]], treat: 0 },
  kidney: { healthy: "outer",  diseased: ["swell", "stuck"],           inside: [["diseased", "stone"], ["diseased", "stuck"]], treat: 1 },
};
function hsFind(c, view, state, id) {
  const v = c.views[view];
  return (state === "healthy" ? v.healthyHotspots : v.diseasedHotspots).find((h) => h.id === id) || null;
}
function buildStory(c) {
  const S = STORY[c.id], steps = [];
  const L = UI_TEXT;
  steps.push({ view: "outside", state: "healthy", label: L.healthy, title: c.organ, text: c.organAbout });
  const hh = hsFind(c, "outside", "healthy", S.healthy);
  if (hh) steps.push({ view: "outside", state: "healthy", label: L.healthy, hs: hh, title: hh.title, text: hh.text });
  steps.push({ view: "outside", state: "diseased", label: L.withCondition, title: c.name, text: c.about });
  S.diseased.forEach((id) => { const h = hsFind(c, "outside", "diseased", id); if (h) steps.push({ view: "outside", state: "diseased", label: L.withCondition, hs: h, title: h.title, text: h.text }); });
  S.inside.forEach(([state, id]) => { const h = hsFind(c, "inside", state, id); if (h) steps.push({ view: "inside", state, label: state === "healthy" ? L.insideView : L.insideView, hs: h, title: h.title, text: h.text, inside: true }); });
  const tr = c.treatment[S.treat];
  steps.push({ view: "outside", state: "healthy", label: L.treatment, title: tr.title, text: tr.text, treat: true });
  steps.push({ view: "outside", state: "diseased", label: L.warning, title: L.warning, text: c.warning, warn: true });
  return steps;
}
let story = null, storyI = 0, voiceOn = true, voiceWarned = false;
try { voiceOn = localStorage.getItem("voice") !== "off"; } catch (e) {}

function orbitFromNormal(normal) {
  const [x, y, z] = normal.split(" ").map(parseFloat);
  const theta = Math.atan2(x, z) * 180 / Math.PI;
  const phi = Math.acos(Math.max(-1, Math.min(1, y))) * 180 / Math.PI;
  return `${theta.toFixed(0)}deg ${Math.max(35, Math.min(140, phi)).toFixed(0)}deg auto`;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  if (!voiceOn) return;
  const voices = speechSynthesis.getVoices();
  const code = lang;
  let v = voices.find((x) => x.lang.toLowerCase().startsWith(code + "-in")) || voices.find((x) => x.lang.toLowerCase().startsWith(code));
  if (!v && lang !== "en") { if (!voiceWarned) { showToast(t(UI_TEXT.noVoice)); voiceWarned = true; } return; }
  const u = new SpeechSynthesisUtterance(text);
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-IN";
  u.rate = 0.95;
  speechSynthesis.speak(u);
}
function renderVoiceBtn() {
  const b = $("voice-btn");
  b.setAttribute("aria-pressed", voiceOn);
  b.innerHTML = (voiceOn ? "🔊 " : "🔇 ") + "<span>" + esc(t(voiceOn ? UI_TEXT.voiceOn : UI_TEXT.voiceOff)) + "</span>";
}
$("voice-btn").addEventListener("click", () => {
  voiceOn = !voiceOn;
  try { localStorage.setItem("voice", voiceOn ? "on" : "off"); } catch (e) {}
  renderVoiceBtn();
  if (voiceOn && story) speak(t(story.steps[storyI].title) + ". " + t(story.steps[storyI].text)); else speak("");
});

function showStoryStep(i, sayIt) {
  const c = story.c, st = story.steps[i], mv = $("mv-story");
  storyI = i;
  const v = c.views[st.view];
  const src = st.state === "healthy" ? v.healthyModel : v.diseasedModel;
  const orbit = st.hs && st.hs.normal ? orbitFromNormal(st.hs.normal) : v.orbit;
  if (mv.getAttribute("src") !== src) { mv.dataset.pendingOrbit = orbit; mv.setAttribute("src", src); }
  else { mv.cameraOrbit = orbit; mv.cameraTarget = "auto auto auto"; }
  // one glowing dot for the part this step talks about
  mv.querySelectorAll(".hotspot").forEach((h) => h.remove());
  if (st.hs) {
    const d = document.createElement("button");
    d.className = "hotspot story-dot " + st.state;
    d.slot = "hotspot-story";
    d.dataset.position = st.hs.position;
    if (st.hs.normal) d.dataset.normal = st.hs.normal;
    d.dataset.visibilityAttribute = "visible";
    d.textContent = "●";
    d.setAttribute("aria-label", t(st.hs.title));
    mv.appendChild(d);
  }
  const n = story.steps.length;
  $("story-count").textContent = `${t(UI_TEXT.storyStep)} ${i + 1} ${t(UI_TEXT.of)} ${n}`;
  $("story-state").textContent = t(st.label);
  $("story-card").className = "story-card " + (st.warn ? "warn" : st.treat ? "treat" : st.state);
  $("story-title").textContent = t(st.title);
  $("story-text").textContent = t(st.text);
  $("story-bar").style.width = ((i + 1) / n * 100) + "%";
  $("story-prev").disabled = i === 0;
  $("story-next").innerHTML = i === n - 1 ? esc(t(UI_TEXT.finish)) + " ✓" : esc(t(UI_TEXT.next)) + " →";
  if (sayIt) speak(t(st.title) + ". " + t(st.text));
}
$("mv-story").addEventListener("load", (e) => {
  const m = e.target;
  if (m.dataset.pendingOrbit) { m.cameraOrbit = m.dataset.pendingOrbit; m.cameraTarget = "auto auto auto"; m.jumpCameraToGoal(); delete m.dataset.pendingOrbit; }
});
$("story-prev").addEventListener("click", (e) => { e.stopPropagation(); if (story && storyI > 0) showStoryStep(storyI - 1, true); });
$("story-next").addEventListener("click", (e) => {
  e.stopPropagation();
  if (!story) return;
  if (storyI < story.steps.length - 1) showStoryStep(storyI + 1, true);
  else { if ($("mv-story").activateAR && $("mv-story").getAttribute("ar-status") === "session-started") { /* stay in AR */ } location.hash = story.c.id; }
});
function openStory(c) {
  story = { c, steps: buildStory(c) };
  $("story-organ").textContent = t(c.organ) + " · " + t(c.name);
  $("story-close").href = "#" + c.id;
  renderVoiceBtn();
  showStoryStep(0, true);
}
function closeStory() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  story = null;
}

// ---------- Page switching: #home #organs #ar #about #heart #heart/learn #heart-story ----------
const PAGES = ["home", "organs", "ar", "about"];
function route() {
  const raw = location.hash.replace(/^#\/?/, "") || "home";
  const [id, sub] = raw.split("/");
  return { id, sub };
}
function render() {
  fillStaticText();
  const { id, sub } = route();
  const storyId = id.endsWith("-story") ? id.slice(0, -6) : null;
  const sc = storyId ? CONDITIONS.find((c) => c.id === storyId) : null;
  current = sc ? null : (CONDITIONS.find((c) => c.id === id) || null);
  const page = sc ? "story" : current ? "condition" : (PAGES.includes(id) ? id : "home");
  $("story").hidden = !sc;
  document.body.classList.toggle("story-open", !!sc);
  ["home", "organs", "ar", "about", "condition"].forEach((p) => { $(p).hidden = p !== page; });
  const navKey = page === "condition" ? "organs" : page;
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === navKey));
  renderSide(current ? current.id : sc ? sc.id : null);
  if (sc) { if (!story || story.c !== sc) openStory(sc); else showStoryStep(storyI, false); document.title = t(UI_TEXT.startStory) + " · " + t(sc.organ); return; }
  closeStory();
  renderHome();
  if (current) {
    tab = ["learn", "treat", "ar"].includes(sub) ? sub : "3d";
    renderCondition(current);
    setTab(tab, true);
  } else document.title = (page === "home" ? "" : U("nav" + page[0].toUpperCase() + page.slice(1)) + " · ") + t(UI_TEXT.appName);
  if (openState && current) openInfo(openState.h, openState.kind, openState.i); // refresh text after language change
}
window.addEventListener("hashchange", () => {
  closeInfo(); viewMode = "outside"; render();
  const { id, sub } = route();
  const target = id === "ar" && sub ? $("mode-" + sub) : null;
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" }); else window.scrollTo(0, 0);
});
if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => {};

setLanguage(lang, false);
