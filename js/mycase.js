// =============================================================
// My Report page: the patient's own values -> a personal 3D organ,
// what it means, and a "what happens next" timeline.
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { makeCase } from "./severity.js";
import { CASES, CASE_UI as UI } from "./cases.js";
import { buildTour, stepText } from "./tour.js";

const $ = (id) => document.getElementById(id);
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
const t = (o) => (o && o[lang] && String(o[lang]).trim()) ? o[lang] : (o ? o.en : "");
const params = new URLSearchParams(location.search);
const COND = CONDITIONS.find((c) => c.id === params.get("c")) || CONDITIONS[0];
const SPEC = CASES[COND.id];
const NONE = { en: "Clear", kn: "ಸ್ಪಷ್ಟ", ta: "தெளிவு" };
const DRAG = { en: "Drag to turn · pinch or scroll to zoom", kn: "ತಿರುಗಿಸಲು ಎಳೆಯಿರಿ · ದೊಡ್ಡದು ಮಾಡಲು ಎರಡು ಬೆರಳು ಅಥವಾ ಸ್ಕ್ರಾಲ್", ta: "சுழற்ற இழுக்கவும் · பெரிதாக்க இரு விரல் அல்லது ஸ்க்ரோல்" };

// Tamil: needs checking by a Tamil reader.
const T3 = (en, kn, ta) => ({ en, kn, ta });
const MX = {
  tour: T3("Explain my case, step by step", "ನನ್ನ ಪ್ರಕರಣವನ್ನು ಹಂತ ಹಂತವಾಗಿ ವಿವರಿಸಿ", "என் நிலையைப் படிப்படியாக விளக்கு"),
  step: T3("Step", "ಹಂತ", "படி"), of: T3("of", "/", "/"),
  prev: T3("Back", "ಹಿಂದೆ", "பின்"), next: T3("Next", "ಮುಂದೆ", "அடுத்து"), done: T3("Done", "ಮುಗಿಯಿತು", "முடிந்தது"),
  voiceOn: T3("Voice on", "ಧ್ವನಿ ಆನ್", "குரல் ஆன்"), voiceOff: T3("Voice off", "ಧ್ವನಿ ಆಫ್", "குரல் ஆஃப்"),
  notes: T3("Doctor’s notes on the organ", "ಅಂಗದ ಮೇಲೆ ವೈದ್ಯರ ಟಿಪ್ಪಣಿ", "உறுப்பின் மேல் மருத்துவர் குறிப்புகள்"),
  addPin: T3("Add a note on the organ", "ಅಂಗದ ಮೇಲೆ ಟಿಪ್ಪಣಿ ಸೇರಿಸಿ", "உறுப்பின் மேல் குறிப்பு சேர்"),
  pinning: T3("Tap the place on the organ", "ಅಂಗದ ಮೇಲೆ ಜಾಗವನ್ನು ಒತ್ತಿ", "உறுப்பில் இடத்தைத் தட்டுங்கள்"),
  stopPin: T3("Stop adding", "ಸೇರಿಸುವುದು ನಿಲ್ಲಿಸಿ", "சேர்ப்பதை நிறுத்து"),
  noNotes: T3("No notes yet. Notes show on the organ, in the tour, in AR and on the summary.", "ಇನ್ನೂ ಟಿಪ್ಪಣಿ ಇಲ್ಲ. ಟಿಪ್ಪಣಿಗಳು ಅಂಗದ ಮೇಲೆ, ಪ್ರವಾಸದಲ್ಲಿ, AR ನಲ್ಲಿ ಮತ್ತು ಸಾರಾಂಶದಲ್ಲಿ ಕಾಣುತ್ತವೆ.", "இன்னும் குறிப்புகள் இல்லை. குறிப்புகள் உறுப்பில், சுற்றுலாவில், AR-ல், சுருக்கத்தில் தெரியும்."),
  pinPh: T3("e.g. Your stone is here", "ಉದಾ: ನಿಮ್ಮ ಕಲ್ಲು ಇಲ್ಲಿದೆ", "எ.கா: உங்கள் கல் இங்கே உள்ளது"),
  save: T3("Save", "ಉಳಿಸಿ", "சேமி"), cancel: T3("Cancel", "ರದ್ದು", "ரத்து"),
  scan: T3("Scan report", "ವರದಿ ಸ್ಕ್ಯಾನ್", "அறிக்கை ஸ்கேன்"),
  reading: T3("Reading the report on this device…", "ಈ ಸಾಧನದಲ್ಲೇ ವರದಿ ಓದುತ್ತಿದೆ…", "இந்தச் சாதனத்திலேயே அறிக்கையைப் படிக்கிறது…"),
  foundT: T3("Found in the report:", "ವರದಿಯಲ್ಲಿ ಸಿಕ್ಕಿದ್ದು:", "அறிக்கையில் கிடைத்தது:"),
  notFound: T3("No values found for this organ. Try a sharper, straight photo in good light, or enter them by hand.", "ಈ ಅಂಗಕ್ಕೆ ಮೌಲ್ಯ ಸಿಗಲಿಲ್ಲ. ಚೆನ್ನಾದ ಬೆಳಕಿನಲ್ಲಿ ನೇರವಾದ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ, ಅಥವಾ ಕೈಯಾರೆ ಹಾಕಿ.", "இந்த உறுப்புக்கு மதிப்புகள் கிடைக்கவில்லை. நல்ல வெளிச்சத்தில் நேரான தெளிவான புகைப்படம் எடுங்கள், அல்லது கையால் உள்ளிடுங்கள்."),
  use: T3("Use these values", "ಈ ಮೌಲ್ಯಗಳನ್ನು ಬಳಸಿ", "இந்த மதிப்புகளைப் பயன்படுத்து"),
  check: T3("Please check them against the report.", "ದಯವಿಟ್ಟು ವರದಿಯೊಂದಿಗೆ ಹೋಲಿಸಿ ನೋಡಿ.", "தயவுசெய்து அறிக்கையுடன் ஒப்பிட்டுப் பாருங்கள்."),
  privacy: T3("The photo is read on this device and not uploaded.", "ಫೋಟೋವನ್ನು ಈ ಸಾಧನದಲ್ಲೇ ಓದಲಾಗುತ್ತದೆ, ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದಿಲ್ಲ.", "புகைப்படம் இந்தச் சாதனத்திலேயே படிக்கப்படுகிறது, பதிவேற்றப்படாது."),
  summary: T3("Take-home summary", "ಮನೆಗೆ ಸಾರಾಂಶ", "வீட்டுக்கான சுருக்கம்"),
  failed: T3("Could not read the photo.", "ಫೋಟೋ ಓದಲಾಗಲಿಲ್ಲ.", "புகைப்படத்தைப் படிக்க முடியவில்லை."),
};

// ---------- values entered by the doctor ----------
const values = {};
SPEC.fields.forEach((f) => { values[f.key] = params.has(f.key) ? (f.type === "range" ? +params.get(f.key) : params.get(f.key)) : f.value; });
let treat = false, tYears = 0, playing = false;
// doctor's notes: points in the model's own coordinates
let pins = [];
try { pins = JSON.parse(params.get("pins") || "[]").filter((p) => p && Array.isArray(p.p) && typeof p.t === "string").slice(0, 12); } catch (e) { pins = []; }

// ---------- 3D ----------
const stage = $("stage");
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
stage.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 50);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.autoRotate = true; controls.autoRotateSpeed = 0.8; controls.enablePan = false;
controls.minDistance = 1.2; controls.maxDistance = 8;
controls.addEventListener("start", () => { controls.autoRotate = false; });
const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(1, 2, 2); scene.add(key);
scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.6));

const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(new URL("draco/", import.meta.url).href));
const load = (url) => new Promise((res, rej) => loader.load(url, res, undefined, rej));
const clock = new THREE.Clock();
let sick = null, healthy = null, showHealthy = false;
async function makeHolder(url) {
  const g = await load(url);
  const m = g.scene;
  const box = new THREE.Box3().setFromObject(m), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  m.position.set(-c.x, -box.min.y, -c.z);
  const holder = new THREE.Group(); holder.add(m); holder.scale.setScalar(1 / Math.max(size.x, size.y, size.z));
  scene.add(holder);
  let mixer = null;
  if (g.animations.length) { mixer = new THREE.AnimationMixer(m); mixer.clipAction(g.animations[0]).play(); }
  const md = Math.max(size.x, size.y, size.z);
  return { holder, inner: m, mixer, h: size.y / md, w: size.x / md };
}
function layout(resetView) {
  const gap = (sick ? sick.w : 1) / 2 + 0.1;
  if (sick) sick.holder.position.set(showHealthy ? gap : 0, 0, 0);
  if (healthy) { healthy.holder.visible = showHealthy; healthy.holder.position.set(-gap, 0, 0); }
  const h = sick ? sick.h : 1;
  controls.target.set(0, h * 0.5, 0);
  const dist = showHealthy ? 2.0 + gap * 1.9 : 2.2;
  let dir = camera.position.clone().sub(controls.target);
  if (resetView || dir.lengthSq() < 1e-6) dir = new THREE.Vector3(0.25, 0.3, 1);
  camera.position.copy(controls.target).add(dir.normalize().multiplyScalar(dist));
  $("lab-h").hidden = !showHealthy; $("lab-d").hidden = !sick;
}
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);

// ---------- personal case ----------
let personal = null, target = SPEC.state(values), cur = { ...target };
function stateNow() {
  if (tYears <= 0.001) return SPEC.state(values);
  return SPEC.timeline.call(SPEC, values, treat, tYears).state;
}
function level(st) {
  const id = COND.id;
  if (id === "heart") return st.block < 3 ? "none" : st.block < 50 ? "mild" : st.block < 70 ? "moderate" : "severe";
  if (id === "kidney") return st.mm < 0.5 ? "none" : st.mm <= 5 ? "mild" : st.mm <= 10 ? "moderate" : "severe";
  if (id === "liver") return st.grade < 0.5 ? "none" : st.grade < 1.5 ? "mild" : st.grade < 2.5 ? "moderate" : "severe";
  if (id === "lungs") { const py = st.sev * 40; return py < 1 ? "none" : py < 10 ? "mild" : py <= 20 ? "moderate" : "severe"; }
  const eff = st.size * (1 - 0.7 * (st.recover || 0));
  return eff < 0.35 ? "mild" : eff < 0.7 ? "moderate" : "severe";
}
const lvlText = (l) => (l === "none" ? t(NONE) : t(UI[l]));
function whenText() {
  if (tYears <= 0.001) return t(UI.now);
  if (tYears < 1) return Math.max(1, Math.round(tYears * 12)) + " " + t(UI.months);
  const y = Math.round(tYears * 10) / 10;
  return (Number.isInteger(y) ? y : y.toFixed(1)) + " " + (y === 1 ? t(UI.year) : t(UI.years));
}
function update() {
  target = stateNow();
  const st = target, L = level(st);
  $("b-when").textContent = tYears <= 0.001 ? t(UI.yours) : whenText() + " · " + (treat ? t(UI.withTreat) : t(UI.noChange));
  $("b-val").textContent = SPEC.badge(st, t);
  $("b-lvl").className = "lvl " + L; $("b-lvl").textContent = lvlText(L);
  const [band, text] = SPEC.band.call(SPEC, values);
  $("m-lvl").className = "lvl " + band; $("m-lvl").textContent = t(UI[band]);
  $("m-text").textContent = t(text);
  $("when").textContent = whenText();
  $("tl-text").textContent = tYears <= 0.001 ? "" : t(SPEC.timeline.call(SPEC, values, treat, tYears).text);
  $("p-none").classList.toggle("on", !treat); $("p-treat").classList.toggle("on", treat);
  $("tl").value = tYears;
  const vals = JSON.stringify(values), pj = JSON.stringify(pins);
  $("ar-btn").href = "handar.html?c=" + COND.id + "&case=" + encodeURIComponent(JSON.stringify(st)) + "&vals=" + encodeURIComponent(vals) + (pins.length ? "&pins=" + encodeURIComponent(pj) : "");
  const q = new URLSearchParams({ c: COND.id }); SPEC.fields.forEach((f) => q.set(f.key, values[f.key]));
  if (pins.length) q.set("pins", pj);
  $("sum-btn").href = "summary.html?" + q.toString();
  history.replaceState(null, "", "?" + q.toString());
}

// ---------- the form ----------
function buildFields() {
  $("fields").innerHTML = "";
  SPEC.fields.forEach((f) => {
    const wrap = document.createElement("div"); wrap.className = "field";
    const id = "f-" + f.key;
    const lab = document.createElement("label"); lab.htmlFor = id; lab.textContent = t(f.label);
    let input;
    if (f.type === "range") {
      const out = document.createElement("output"); out.textContent = values[f.key] + (f.unit || ""); lab.append(out);
      input = document.createElement("input"); input.type = "range"; input.min = f.min; input.max = f.max; input.step = f.step; input.value = values[f.key];
      input.addEventListener("input", () => { values[f.key] = +input.value; out.textContent = input.value + (f.unit || ""); update(); });
    } else {
      input = document.createElement("select");
      f.options.forEach(([v, l]) => { const o = document.createElement("option"); o.value = v; o.textContent = t(l); input.append(o); });
      input.value = values[f.key];
      input.addEventListener("change", () => { values[f.key] = input.value; update(); });
    }
    input.id = id;
    wrap.append(lab, input); $("fields").append(wrap);
  });
}

// ---------- timeline ----------
$("tl").addEventListener("input", (e) => { tYears = +e.target.value; stopPlay(); update(); });
$("p-none").addEventListener("click", () => { treat = false; if (tYears === 0) tYears = 5; update(); });
$("p-treat").addEventListener("click", () => { treat = true; if (tYears === 0) tYears = 5; update(); });
function stopPlay() { playing = false; $("play").textContent = t(UI.play); }
$("play").addEventListener("click", () => {
  if (playing) { stopPlay(); return; }
  playing = true; $("play").textContent = t(UI.pause);
  if (tYears >= 9.95) tYears = 0;
});
$("cmp-btn").addEventListener("click", async () => {
  showHealthy = !showHealthy;
  $("cmp-btn").classList.toggle("on", showHealthy); $("cmp-btn").setAttribute("aria-pressed", showHealthy);
  if (showHealthy && !healthy) healthy = await makeHolder(COND.views.outside.healthyModel);
  controls.autoRotate = false;
  layout(true);
});

// ---------- language + static text ----------
function texts() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  $("c-organ").textContent = t(COND.organ) + " · " + t(COND.name);
  $("c-title").textContent = t(UI.title);
  document.title = t(UI.title) + " · " + t(COND.organ);
  $("c-sub").textContent = t(UI.sub);
  $("h-details").textContent = t(UI.details); $("h-means").textContent = t(UI.means); $("h-time").textContent = t(UI.timeline);
  $("m-note").textContent = t(UI.edu); $("tl-note").textContent = t(UI.illus); $("edu").textContent = t(UI_TEXT.disclaimer);
  $("p-none").textContent = t(UI.noChange); $("p-treat").textContent = t(UI.withTreat);
  $("tk0").textContent = t(UI.now); $("play").textContent = playing ? t(UI.pause) : t(UI.play);
  $("cmp-btn").textContent = "" + t(UI.showHealthy);
  $("ar-label").textContent = t(UI.inAR); $("quiz-label").textContent = t(UI.quiz); $("sum-label").textContent = t(MX.summary);
  $("tour-btn").textContent = t(MX.tour); $("scan-btn").textContent = t(MX.scan); $("h-notes").textContent = t(MX.notes);
  $("pin-save").textContent = t(MX.save); $("pin-cancel").textContent = t(MX.cancel); $("pin-text").placeholder = t(MX.pinPh);
  $("pin-mode").textContent = t(MX.pinning); $("t-prev").textContent = t(MX.prev);
  renderNotes(); renderPinBtn(); renderVoice();
  if (tour) showStep(false);
  $("quiz-btn").href = "quiz.html?c=" + COND.id;
  $("lab-h").lastChild.textContent = t(UI.healthy); $("lab-d").lastChild.textContent = t(UI.yours);
  $("back").href = "index.html#" + COND.id;
  $("stage-hint").textContent = t(DRAG);
  $("switch").innerHTML = CONDITIONS.map((c) => `<a class="o-chip${c.id === COND.id ? " active" : ""}" href="mycase.html?c=${c.id}"><img src="images/thumb-${c.id}.png" alt="">${t(c.organ)}</a>`).join("");
  buildFields(); update();
}
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; try { localStorage.setItem("lang", lang); } catch (e) {} texts(); }));

// ---------- loop ----------
const tmp = new THREE.Vector3();
function placeLabel(el, obj) {
  if (!obj || el.hidden) return;
  tmp.set(0, -0.06, 0).applyMatrix4(obj.holder.matrixWorld).project(camera);
  el.style.transform = `translate(calc(${(tmp.x + 1) / 2 * stage.clientWidth}px - 50%), ${(1 - tmp.y) / 2 * stage.clientHeight}px)`;
}
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.1), time = clock.elapsedTime;
  if (playing) { tYears = Math.min(10, tYears + dt * 1.6); update(); if (tYears >= 10) stopPlay(); }
  // ease towards the new values so changes are easy to see
  for (const k in target) cur[k] = typeof target[k] !== "number" ? target[k] : (cur[k] ?? target[k]) + (target[k] - (cur[k] ?? target[k])) * Math.min(1, dt * 5);
  if (personal) { personal.apply(cur); personal.pulse(time); }
  [sick, healthy].forEach((o) => o && o.mixer && o.mixer.update(dt));
  if (fly) {
    const k = Math.min(1, dt * 2.6);
    controls.target.lerp(fly.target, k); camera.position.lerp(fly.pos, k);
    if (camera.position.distanceTo(fly.pos) < 0.003) fly = null;
  }
  controls.update();
  placeLabel($("lab-h"), healthy); placeLabel($("lab-d"), sick);
  placePins(); placeRing();
  renderer.render(scene, camera);
});

// ---------- doctor's notes (pins) ----------
let pinMode = false, pendingPin = null;
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const pinsEl = $("pins");
function renderPinBtn() {
  $("pin-btn").textContent = pinMode ? t(MX.stopPin) : "+ " + t(MX.addPin);
  $("pin-btn").classList.toggle("primary", pinMode);
  $("pin-mode").hidden = !pinMode; stage.classList.toggle("pinning", pinMode);
}
$("pin-btn").addEventListener("click", () => { pinMode = !pinMode; controls.autoRotate = false; closeEditor(); renderPinBtn(); });
function renderNotes() {
  const ul = $("notes");
  ul.innerHTML = pins.length ? "" : `<li style="background:none;padding:0"><span class="muted">${t(MX.noNotes)}</span></li>`;
  pins.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${i + 1}</b><span></span><button type="button" aria-label="Delete">×</button>`;
    li.querySelector("span").textContent = p.t;
    li.querySelector("button").addEventListener("click", () => { pins.splice(i, 1); renderNotes(); buildPins(); update(); });
    li.addEventListener("mouseenter", () => pinsEl.children[i] && pinsEl.children[i].classList.add("open"));
    li.addEventListener("mouseleave", () => pinsEl.children[i] && pinsEl.children[i].classList.remove("open"));
    ul.append(li);
  });
}
function buildPins() {
  pinsEl.innerHTML = "";
  pins.forEach((p, i) => {
    const el = document.createElement("div"); el.className = "pin";
    el.innerHTML = `<b>${i + 1}</b><span></span>`; el.querySelector("span").textContent = p.t;
    el.querySelector("b").addEventListener("click", () => el.classList.toggle("open"));
    pinsEl.append(el);
  });
}
const pv = new THREE.Vector3(), pn = new THREE.Vector3(), cd = new THREE.Vector3();
function toScreen(v) { v.project(camera); return { x: (v.x + 1) / 2 * stage.clientWidth, y: (1 - v.y) / 2 * stage.clientHeight, ok: v.z < 1 }; }
function placePins() {
  if (!sick) return;
  pins.forEach((p, i) => {
    const el = pinsEl.children[i]; if (!el) return;
    pv.fromArray(p.p); sick.inner.localToWorld(pv);
    pn.fromArray(p.n || [0, 0, 1]).transformDirection(sick.inner.matrixWorld);
    cd.copy(camera.position).sub(pv).normalize();
    el.classList.toggle("back", pn.dot(cd) < -0.1);
    const s = toScreen(pv.clone());
    el.style.display = s.ok ? "" : "none"; el.style.transform = `translate(${s.x}px, ${s.y}px)`;
  });
}
let downAt = null;
renderer.domElement.addEventListener("pointerdown", (e) => { downAt = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener("pointerup", (e) => {
  if (!pinMode || !downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6 || !sick) return;
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const meshes = []; sick.inner.traverse((o) => o.isMesh && o.visible && meshes.push(o));
  const hit = ray.intersectObjects(meshes, false)[0];
  if (!hit) return;
  const inv = new THREE.Matrix4().copy(sick.inner.matrixWorld).invert();
  const local = hit.point.clone().applyMatrix4(inv);
  const wn = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : new THREE.Vector3(0, 0, 1);
  const ln = wn.transformDirection(inv);
  pendingPin = { p: local.toArray().map((v) => +v.toFixed(4)), n: ln.toArray().map((v) => +v.toFixed(3)) };
  const ed = $("pin-edit"); ed.hidden = false;
  ed.style.left = Math.min(stage.clientWidth - 270, Math.max(8, e.clientX - r.left + 10)) + "px";
  ed.style.top = Math.min(stage.clientHeight - 130, Math.max(8, e.clientY - r.top + 10)) + "px";
  $("pin-text").value = ""; $("pin-text").focus();
});
function closeEditor() { $("pin-edit").hidden = true; pendingPin = null; }
$("pin-cancel").addEventListener("click", closeEditor);
$("pin-save").addEventListener("click", () => {
  const txt = $("pin-text").value.trim().slice(0, 160);
  if (pendingPin && txt) { pins.push({ ...pendingPin, t: txt }); renderNotes(); buildPins(); update(); }
  closeEditor();
});
$("pin-text").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("pin-save").click(); } if (e.key === "Escape") closeEditor(); });

// ---------- explain my case (guided tour) ----------
let tour = null, fly = null, voiceOn = false, ringAt = null;
const VOICE_LANG = { en: "en-IN", kn: "kn-IN", ta: "ta-IN" };
function renderVoice() { $("t-voice").textContent = voiceOn ? t(MX.voiceOn) : t(MX.voiceOff); $("t-voice").setAttribute("aria-pressed", voiceOn); }
$("t-voice").addEventListener("click", () => { voiceOn = !voiceOn; renderVoice(); if (voiceOn && tour) speak(stepText(tour.steps[tour.i], t)); else stopVoice(); });
function speak(txt) {
  if (!voiceOn || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(txt.replace(/•/g, "")); u.lang = VOICE_LANG[lang] || "en-IN"; u.rate = 0.95;
  const v = speechSynthesis.getVoices().find((x) => x.lang && x.lang.toLowerCase().startsWith(u.lang.slice(0, 2)));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
function stopVoice() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }
function focusPoint(f) {
  if (!f || !sick) return null;
  if (typeof f === "string") {
    const h = COND.views.outside.diseasedHotspots.find((x) => x.id === f); if (!h) return null;
    return { p: h.position.split(" ").map(parseFloat), n: (h.normal || "0 0 1").split(" ").map(parseFloat) };
  }
  return { p: f.p, n: f.n || [0, 0, 1] };
}
function flyTo(fp) {
  sick.holder.updateMatrixWorld(true);
  if (!fp) {
    const tg = new THREE.Vector3(sick.holder.position.x, sick.h * 0.5, 0);
    fly = { target: tg, pos: tg.clone().add(new THREE.Vector3(0.25, 0.3, 1).normalize().multiplyScalar(2.2)) };
    ringAt = null; return;
  }
  const tg = new THREE.Vector3().fromArray(fp.p); sick.inner.localToWorld(tg);
  const n = new THREE.Vector3().fromArray(fp.n).transformDirection(sick.inner.matrixWorld);
  n.y = n.y * 0.6 + 0.15; n.normalize();
  fly = { target: tg.clone(), pos: tg.clone().add(n.multiplyScalar(1.4)) };
  ringAt = fp;
}
function placeRing() {
  const r = $("tour-ring");
  if (!tour || !ringAt || !sick) { r.hidden = true; return; }
  pv.fromArray(ringAt.p); sick.inner.localToWorld(pv);
  const s = toScreen(pv); r.hidden = !s.ok; r.style.setProperty("--tt", `translate(${s.x}px, ${s.y}px)`);
}
function showStep(sayIt = true) {
  const st = tour.steps[tour.i], n = tour.steps.length;
  $("t-step").textContent = t(MX.step) + " " + (tour.i + 1) + " " + t(MX.of) + " " + n;
  $("t-bar").style.width = ((tour.i + 1) / n) * 100 + "%";
  $("t-title").textContent = (st.num ? st.num + ". " : "") + t(st.title);
  const txt = stepText(st, t);
  $("t-text").textContent = txt;
  $("t-prev").disabled = tour.i === 0;
  $("t-next").textContent = tour.i === n - 1 ? t(MX.done) : t(MX.next) + " →";
  if (st.timeline) { treat = st.timeline.treat; tYears = st.timeline.t; } else { treat = false; tYears = 0; }
  stopPlay(); update();
  [...pinsEl.children].forEach((el, i) => el.classList.toggle("focus", st.kind === "note" && st.num === i + 1));
  flyTo(focusPoint(st.focus));
  if (sayIt) speak(txt);
}
function startTour() {
  if (!sick) return;
  if (showHealthy) $("cmp-btn").click();
  pinMode = false; renderPinBtn(); closeEditor();
  controls.autoRotate = false;
  tour = { steps: buildTour(COND, values, pins, t), i: 0 };
  $("tour").hidden = false; stage.classList.add("touring");
  if (matchMedia("(max-width: 899px)").matches) stage.scrollIntoView({ behavior: "smooth", block: "start" });
  showStep();
}
function endTour() {
  tour = null; $("tour").hidden = true; stage.classList.remove("touring"); stopVoice(); ringAt = null;
  [...pinsEl.children].forEach((el) => el.classList.remove("focus"));
  tYears = 0; treat = false; update(); flyTo(null);
}
$("tour-btn").addEventListener("click", startTour);
$("t-close").addEventListener("click", endTour);
$("t-prev").addEventListener("click", () => { if (tour && tour.i > 0) { tour.i--; showStep(); } });
$("t-next").addEventListener("click", () => { if (!tour) return; if (tour.i < tour.steps.length - 1) { tour.i++; showStep(); } else endTour(); });

// ---------- scan the report ----------
$("scan-btn").addEventListener("click", () => $("scan-file").click());
$("scan-file").addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0]; e.target.value = "";
  if (!file) return;
  const box = $("scan-res"); box.hidden = false;
  box.innerHTML = `<div id="scan-status"></div><div class="bar-prog"><span id="scan-bar"></span></div><p class="note" style="margin-top:6px"></p>`;
  box.querySelector(".note").textContent = t(MX.privacy);
  $("scan-status").textContent = t(MX.reading);
  try {
    const { readReport, findValues } = await import("./reportscan.js");
    const text = await readReport(file, (status, p) => { const b = $("scan-bar"); if (b && /recogniz/i.test(status)) b.style.width = Math.round(p * 100) + "%"; });
    const { found, notes } = findValues(COND.id, text);
    const keys = Object.keys(found);
    if (!keys.length) { box.innerHTML = ""; const p = document.createElement("p"); p.style.margin = "0"; p.textContent = t(MX.notFound); box.append(p); return; }
    box.innerHTML = `<b></b><ul></ul><p class="snip"></p><div class="row"><button type="button" class="btn small primary" id="scan-use"></button><span class="note"></span></div>`;
    box.querySelector("b").textContent = t(MX.foundT);
    keys.forEach((k) => {
      const f = SPEC.fields.find((x) => x.key === k); if (!f) return;
      const li = document.createElement("li");
      const shown = f.type === "select" ? t((f.options.find(([v]) => v === String(found[k])) || [0, { en: found[k] }])[1]) : found[k] + (f.unit || "");
      li.textContent = t(f.label) + ": " + shown; box.querySelector("ul").append(li);
    });
    box.querySelector(".snip").textContent = notes.slice(0, 2).map((n) => "“…" + n.slice(0, 90) + "…”").join("  ");
    box.querySelector(".note").textContent = t(MX.check);
    $("scan-use").textContent = t(MX.use);
    $("scan-use").addEventListener("click", () => {
      keys.forEach((k) => { if (SPEC.fields.find((x) => x.key === k)) values[k] = found[k]; });
      buildFields(); update(); box.hidden = true;
    });
  } catch (err) {
    console.error(err); box.textContent = t(MX.failed);
  }
});

// ---------- start ----------
(async () => {
  texts(); resize();
  camera.position.set(0, 0.7, 2.2);
  sick = await makeHolder(COND.views.outside.diseasedModel);
  personal = makeCase(COND.id, sick.inner);
  cur = { ...stateNow() };
  personal.apply(cur);
  layout();
  buildPins(); renderNotes();
  // turn the camera to the side where the disease parts are
  sick.holder.updateMatrixWorld(true);
  const pc = new THREE.Vector3(); let n = 0; const b = new THREE.Box3();
  sick.inner.traverse((o) => { if (o.isMesh && /-add_\d+$/.test(o.name)) { b.setFromObject(o); pc.add(b.getCenter(new THREE.Vector3())); n++; } });
  if (n && COND.id === "brain") {     // the stroke is on the side of the brain
    pc.divideScalar(n).sub(controls.target); pc.y = 0;
    if (pc.lengthSq() > 1e-6) { pc.normalize(); const d = camera.position.distanceTo(controls.target); camera.position.copy(controls.target).add(new THREE.Vector3(pc.x * 0.92, 0.3, pc.z * 0.92).normalize().multiplyScalar(d)); }
  }
})();
window.__case = { values, pins, startTour, get tour() { return tour; }, next() { $("t-next").click(); }, get cur() { return cur; }, set t(v) { tYears = v; update(); }, set treat(v) { treat = v; update(); } };
