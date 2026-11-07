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

const $ = (id) => document.getElementById(id);
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
const t = (o) => (o && o[lang] && String(o[lang]).trim()) ? o[lang] : (o ? o.en : "");
const params = new URLSearchParams(location.search);
const COND = CONDITIONS.find((c) => c.id === params.get("c")) || CONDITIONS[0];
const SPEC = CASES[COND.id];
const NONE = { en: "Clear", kn: "ಸ್ಪಷ್ಟ", ta: "தெளிவு" };
const DRAG = { en: "Drag to turn · pinch or scroll to zoom", kn: "ತಿರುಗಿಸಲು ಎಳೆಯಿರಿ · ದೊಡ್ಡದು ಮಾಡಲು ಎರಡು ಬೆರಳು ಅಥವಾ ಸ್ಕ್ರಾಲ್", ta: "சுழற்ற இழுக்கவும் · பெரிதாக்க இரு விரல் அல்லது ஸ்க்ரோல்" };

// ---------- values entered by the doctor ----------
const values = {};
SPEC.fields.forEach((f) => { values[f.key] = params.has(f.key) ? (f.type === "range" ? +params.get(f.key) : params.get(f.key)) : f.value; });
let treat = false, tYears = 0, playing = false;

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
  $("ar-btn").href = "handar.html?c=" + COND.id + "&case=" + encodeURIComponent(JSON.stringify(st));
  const q = new URLSearchParams({ c: COND.id }); SPEC.fields.forEach((f) => q.set(f.key, values[f.key]));
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
  $("cmp-btn").textContent = "⇆ " + t(UI.showHealthy);
  $("ar-label").textContent = t(UI.inAR); $("quiz-label").textContent = t(UI.quiz);
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
  controls.update();
  placeLabel($("lab-h"), healthy); placeLabel($("lab-d"), sick);
  renderer.render(scene, camera);
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
  // turn the camera to the side where the disease parts are
  sick.holder.updateMatrixWorld(true);
  const pc = new THREE.Vector3(); let n = 0; const b = new THREE.Box3();
  sick.inner.traverse((o) => { if (o.isMesh && /-add_\d+$/.test(o.name)) { b.setFromObject(o); pc.add(b.getCenter(new THREE.Vector3())); n++; } });
  if (n && COND.id === "brain") {     // the stroke is on the side of the brain
    pc.divideScalar(n).sub(controls.target); pc.y = 0;
    if (pc.lengthSq() > 1e-6) { pc.normalize(); const d = camera.position.distanceTo(controls.target); camera.position.copy(controls.target).add(new THREE.Vector3(pc.x * 0.92, 0.3, pc.z * 0.92).normalize().multiplyScalar(d)); }
  }
})();
window.__case = { values, get cur() { return cur; }, set t(v) { tYears = v; update(); }, set treat(v) { treat = v; update(); } };
