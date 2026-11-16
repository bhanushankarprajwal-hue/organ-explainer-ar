// =============================================================
// Quest mode: WebXR for Meta Quest (and other headsets).
// The healthy organ and the patient's organ stand on a small floating
// table. Mixed reality (your room, passthrough) when the headset can,
// otherwise a calm VR room. Controllers or bare hands:
//   point + trigger / pinch  -> press a number or a panel button
//   grab (trigger, grip or pinch on the organ) -> pick it up, turn it
//   two hands on one organ -> make it bigger or smaller
//   thumbstick -> turn (left/right) and zoom (up/down) the organ you point at
// On a laptop the same scene works with the mouse, as a preview.
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { makeCase } from "./severity.js";
import { CASES, CASE_UI as UI } from "./cases.js";
import { buildTour, stepText } from "./tour.js";

const $ = (id) => document.getElementById(id);
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && String(o[lang]).trim()) ? o[lang] : (o ? o.en : "");
const T3 = (en, kn, ta) => ({ en, kn, ta });
const params = new URLSearchParams(location.search);
const COND = CONDITIONS.find((c) => c.id === params.get("c")) || CONDITIONS[0];
const SPEC = CASES[COND.id];

// the patient's values (from My Report) or the normal example values
const values = {};
let fromReport = false;
let vals = null; try { vals = JSON.parse(params.get("vals") || "null"); } catch (e) {}
SPEC.fields.forEach((f) => {
  let v = f.value;
  if (vals && vals[f.key] != null) { v = vals[f.key]; fromReport = true; }
  else if (params.has(f.key)) { v = f.type === "range" ? +params.get(f.key) : params.get(f.key); fromReport = true; }
  values[f.key] = v;
});
let pins = [];
try { pins = JSON.parse(params.get("pins") || "[]").filter((p) => p && Array.isArray(p.p) && typeof p.t === "string").slice(0, 8); } catch (e) {}

// Tamil: needs checking by a Tamil reader.
const X = {
  title: T3("Quest mode", "ಕ್ವೆಸ್ಟ್ ಮೋಡ್", "குவெஸ்ட் முறை"),
  enterMR: T3("Enter mixed reality", "ಮಿಶ್ರ ವಾಸ್ತವಕ್ಕೆ ಹೋಗಿ", "கலப்பு யதார்த்தத்தில் நுழை"),
  enterVR: T3("Enter VR", "VR ಗೆ ಹೋಗಿ", "VR-ல் நுழை"),
  checking: T3("Checking this device…", "ಈ ಸಾಧನ ಪರಿಶೀಲಿಸುತ್ತಿದೆ…", "இந்தச் சாதனத்தைச் சரிபார்க்கிறது…"),
  noXR: T3("This device has no VR headset. Open this page in the Meta Quest browser. Here you can look at the preview with the mouse.", "ಈ ಸಾಧನದಲ್ಲಿ VR ಹೆಡ್‌ಸೆಟ್ ಇಲ್ಲ. ಈ ಪುಟವನ್ನು Meta Quest ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ. ಇಲ್ಲಿ ಮೌಸ್‌ನಿಂದ ಪೂರ್ವವೀಕ್ಷಣೆ ನೋಡಬಹುದು.", "இந்தச் சாதனத்தில் VR ஹெட்செட் இல்லை. இந்தப் பக்கத்தை Meta Quest உலாவியில் திறக்கவும். இங்கே மவுஸால் முன்னோட்டம் பார்க்கலாம்."),
  mrOk: T3("Mixed reality: you will see your room with the organs in it.", "ಮಿಶ್ರ ವಾಸ್ತವ: ನಿಮ್ಮ ಕೋಣೆಯಲ್ಲೇ ಅಂಗಗಳು ಕಾಣುತ್ತವೆ.", "கலப்பு யதார்த்தம்: உங்கள் அறையிலேயே உறுப்புகள் தெரியும்."),
  how: T3("How to use", "ಬಳಸುವುದು ಹೇಗೆ", "எப்படிப் பயன்படுத்துவது"),
  how1: T3("Point at a number and press the trigger (or pinch your fingers) to learn about that part.", "ಸಂಖ್ಯೆಯ ಕಡೆ ತೋರಿಸಿ ಟ್ರಿಗರ್ ಒತ್ತಿ (ಅಥವಾ ಬೆರಳುಗಳನ್ನು ಚಿಟಿಕೆ ಮಾಡಿ).", "எண்ணை நோக்கிக் காட்டி டிரிகரை அழுத்துங்கள் (அல்லது விரல்களைக் கிள்ளுங்கள்)."),
  how2: T3("Point at an organ and hold the trigger or grip (or pinch) to pick it up and turn it.", "ಅಂಗದ ಕಡೆ ತೋರಿಸಿ ಟ್ರಿಗರ್ ಅಥವಾ ಗ್ರಿಪ್ ಹಿಡಿಯಿರಿ (ಅಥವಾ ಚಿಟಿಕೆ) — ಎತ್ತಿ ತಿರುಗಿಸಿ.", "உறுப்பை நோக்கிக் காட்டி டிரிகர் அல்லது கிரிப்பைப் பிடியுங்கள் (அல்லது கிள்ளுங்கள்) — தூக்கிச் சுழற்றுங்கள்."),
  how3: T3("Hold one organ with both hands and pull apart to make it bigger. The thumbstick also turns and zooms.", "ಒಂದು ಅಂಗವನ್ನು ಎರಡೂ ಕೈಯಲ್ಲಿ ಹಿಡಿದು ದೂರ ಎಳೆದರೆ ದೊಡ್ಡದಾಗುತ್ತದೆ. ಥಂಬ್‌ಸ್ಟಿಕ್ ಕೂಡ ತಿರುಗಿಸುತ್ತದೆ, ದೊಡ್ಡದು ಮಾಡುತ್ತದೆ.", "ஒரு உறுப்பை இரு கைகளாலும் பிடித்து விரித்தால் பெரிதாகும். தம்ப்ஸ்டிக்கும் சுழற்றி பெரிதாக்கும்."),
  how4: T3("Use the floating panel: Outside / Inside, Explain my case, Reset and Exit.", "ತೇಲುವ ಫಲಕ ಬಳಸಿ: ಹೊರಗೆ / ಒಳಗೆ, ನನ್ನ ಪ್ರಕರಣ ವಿವರಿಸಿ, ಮರುಹೊಂದಿಸಿ, ನಿರ್ಗಮಿಸಿ.", "மிதக்கும் பலகையைப் பயன்படுத்துங்கள்: வெளியே / உள்ளே, என் நிலையை விளக்கு, மீட்டமை, வெளியேறு."),
  outside: T3("Outside", "ಹೊರಗೆ", "வெளியே"), inside: T3("Inside", "ಒಳಗೆ", "உள்ளே"),
  tour: T3("Explain my case", "ನನ್ನ ಪ್ರಕರಣ ವಿವರಿಸಿ", "என் நிலையை விளக்கு"),
  reset: T3("Reset", "ಮರುಹೊಂದಿಸಿ", "மீட்டமை"), exit: T3("Exit", "ನಿರ್ಗಮಿಸಿ", "வெளியேறு"),
  back: T3("Back", "ಹಿಂದೆ", "பின்"), next: T3("Next", "ಮುಂದೆ", "அடுத்து"), done: T3("Done", "ಮುಗಿಯಿತು", "முடிந்தது"),
  hint: T3("Point at a number and press the trigger, or pinch, to learn about that part. Grab an organ to pick it up and look closely.", "ಸಂಖ್ಯೆಯ ಕಡೆ ತೋರಿಸಿ ಟ್ರಿಗರ್ ಒತ್ತಿ ಅಥವಾ ಚಿಟಿಕೆ ಮಾಡಿ. ಹತ್ತಿರದಿಂದ ನೋಡಲು ಅಂಗವನ್ನು ಹಿಡಿದು ಎತ್ತಿ.", "எண்ணை நோக்கிக் காட்டி டிரிகரை அழுத்துங்கள் அல்லது கிள்ளுங்கள். அருகில் பார்க்க உறுப்பைப் பிடித்துத் தூக்குங்கள்."),
  welcome: T3("Left: a healthy organ. Right: the patient’s organ.", "ಎಡಕ್ಕೆ: ಆರೋಗ್ಯಕರ ಅಂಗ. ಬಲಕ್ಕೆ: ರೋಗಿಯ ಅಂಗ.", "இடது: ஆரோக்கியமான உறுப்பு. வலது: நோயாளியின் உறுப்பு."),
  step: T3("Step", "ಹಂತ", "படி"),
  fromReport: T3("Patient’s own report", "ರೋಗಿಯ ಸ್ವಂತ ವರದಿ", "நோயாளியின் சொந்த அறிக்கை"),
  example: T3("Example values (open from My Report for a real patient)", "ಉದಾಹರಣೆ ಮೌಲ್ಯಗಳು (ನಿಜವಾದ ರೋಗಿಗೆ ನನ್ನ ವರದಿಯಿಂದ ತೆರೆಯಿರಿ)", "எடுத்துக்காட்டு மதிப்புகள் (உண்மையான நோயாளிக்கு என் அறிக்கையிலிருந்து திறக்கவும்)"),
  note: T3("Doctor’s note", "ವೈದ್ಯರ ಟಿಪ್ಪಣಿ", "மருத்துவரின் குறிப்பு"),
  loading: T3("Loading…", "ಲೋಡ್ ಆಗುತ್ತಿದೆ…", "ஏற்றப்படுகிறது…"),
};

// ---------- page text ----------
function pageText() {
  document.title = t(X.title) + " · " + t(COND.organ);
  $("title").textContent = t(X.title);
  $("back").href = "index.html#" + COND.id;
  $("cond").textContent = t(COND.organ);
  $("h-org").textContent = t(COND.name);
  $("case-chip").hidden = false;
  $("case-chip").textContent = fromReport ? t(X.fromReport) + " · " + SPEC.badge(SPEC.state(values), t) : t(X.example);
  const keep = new URLSearchParams(params); keep.delete("c");
  $("switch").innerHTML = CONDITIONS.map((c) => `<a class="o-chip${c.id === COND.id ? " active" : ""}" href="xr.html?c=${c.id}"><img src="images/thumb-${c.id}.png" alt="">${t(c.organ)}</a>`).join("");
  $("h-how").textContent = t(X.how);
  $("how").innerHTML = [X.how1, X.how2, X.how3, X.how4].map(() => "<li></li>").join("");
  [X.how1, X.how2, X.how3, X.how4].forEach((x, i) => { $("how").children[i].textContent = t(x); });
  $("edu").textContent = t(UI_TEXT.disclaimer);
}
pageText();

// ---------- three.js ----------
const stage = $("stage");
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType("local-floor");
stage.append(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 50);
camera.position.set(0, 1.55, 0.95);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 1.22, -0.4); orbit.enableDamping = true; orbit.update();
scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 2.0));
const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(0.6, 2.5, 1.2); scene.add(sun);
function resize() {
  if (renderer.xr.isPresenting) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);

// a calm room, only for VR (in mixed reality you see your real room)
const room = new THREE.Group(); room.visible = false; scene.add(room);
{
  const c = document.createElement("canvas"); c.width = c.height = 512; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, "#dfe6ee"); g.addColorStop(0.55, "#f3f1ec"); g.addColorStop(1, "#e9e4db");
  x.fillStyle = g; x.fillRect(0, 0, 512, 512);
  const sky = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), side: THREE.BackSide }));
  room.add(sky);
  const f = document.createElement("canvas"); f.width = f.height = 256; const fx = f.getContext("2d");
  fx.fillStyle = "#e7e2d8"; fx.fillRect(0, 0, 256, 256); fx.strokeStyle = "rgba(31,78,140,.18)"; fx.lineWidth = 2;
  for (let i = 0; i <= 256; i += 32) { fx.beginPath(); fx.moveTo(i, 0); fx.lineTo(i, 256); fx.stroke(); fx.beginPath(); fx.moveTo(0, i); fx.lineTo(256, i); fx.stroke(); }
  const ft = new THREE.CanvasTexture(f); ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(12, 12);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(12, 48), new THREE.MeshStandardMaterial({ map: ft, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2; room.add(floor);
}

// the floating table everything stands on
const world = new THREE.Group(); scene.add(world);
world.position.set(0, 0.95, -0.55);
const table = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.018, 64), new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.6, metalness: 0.05 }));
table.position.y = -0.009; world.add(table);
const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.006, 8, 96), new THREE.MeshStandardMaterial({ color: 0x1f4e8c, roughness: 0.4 }));
rim.rotation.x = Math.PI / 2; world.add(rim);

// ---------- text pictures (labels, numbers, the panel) ----------
const FONT = '"Public Sans", "Noto Sans Kannada", "Noto Sans Tamil", system-ui, sans-serif';
function badgeTexture(text, bg) {
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  x.beginPath(); x.arc(64, 64, 54, 0, Math.PI * 2); x.fillStyle = bg; x.fill(); x.lineWidth = 10; x.strokeStyle = "#ffffff"; x.stroke();
  x.fillStyle = "#fff"; x.font = `700 60px ${FONT}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(text, 64, 68);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}
function labelSprite(text, color) {
  const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d");
  x.font = `700 44px ${FONT}`; const w = Math.min(500, x.measureText(text).width + 64);
  x.fillStyle = "#ffffff"; roundRect(x, (512 - w) / 2, 8, w, 80, 18); x.fill();
  x.fillStyle = color; x.beginPath(); x.arc((512 - w) / 2 + 30, 48, 10, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#1c2430"; x.textAlign = "left"; x.textBaseline = "middle"; x.fillText(text, (512 - w) / 2 + 48, 50);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false })); s.scale.set(0.24, 0.045, 1); s.renderOrder = 5;
  return s;
}
function roundRect(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
function wrap(x, text, maxW) {
  const out = [];
  String(text).split("\n").forEach((para) => {
    let line = "";
    para.split(" ").forEach((w) => { const test = line ? line + " " + w : w; if (x.measureText(test).width > maxW && line) { out.push(line); line = w; } else line = test; });
    out.push(line);
  });
  return out;
}

// ---------- organs ----------
const draco = new DRACOLoader().setDecoderPath(new URL("draco/", import.meta.url).href);
const loader = new GLTFLoader().setDRACOLoader(draco);
const load = (u) => new Promise((res, rej) => loader.load(u, res, undefined, rej));
const ORGAN_SIZE = 0.26;              // about 26 cm tall/wide on the table
const slots = {                       // each organ stands in a slot you can grab
  h: { group: new THREE.Group(), home: new THREE.Vector3(-0.2, 0, 0.02), color: "#2e7d4f" },
  d: { group: new THREE.Group(), home: new THREE.Vector3(0.2, 0, 0.02), color: "#b4442f" },
};
Object.values(slots).forEach((s) => { s.group.position.copy(s.home); world.add(s.group); });
let view = "outside", personal = null, hotSprites = [], pinSprites = [];
const mixers = new Set();
const cache = {};
async function loadModel(url) {
  if (cache[url]) return cache[url];
  const g = await load(url);
  const m = g.scene;
  const box = new THREE.Box3().setFromObject(m), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  m.position.set(-c.x, -box.min.y, -c.z);
  const holder = new THREE.Group(); holder.add(m);
  const k = ORGAN_SIZE / Math.max(size.x, size.y, size.z); holder.scale.setScalar(k);
  let mixer = null; if (g.animations.length) { mixer = new THREE.AnimationMixer(m); mixer.clipAction(g.animations[0]).play(); }
  const meshes = []; m.traverse((o) => o.isMesh && meshes.push(o));
  return (cache[url] = { holder, inner: m, k, mixer, meshes, height: size.y * k });
}
const labels = { h: null, d: null };
async function showView(v) {
  view = v;
  const vw = COND.views[v];
  const [H, D] = await Promise.all([loadModel(vw.healthyModel), loadModel(vw.diseasedModel)]);
  for (const [key, M, hs] of [["h", H, vw.healthyHotspots], ["d", D, vw.diseasedHotspots]]) {
    const s = slots[key];
    s.group.children.slice().forEach((ch) => { if (ch.userData.model) s.group.remove(ch); });
    M.holder.userData.model = true; s.group.add(M.holder); s.model = M; s.hotspots = hs;
  }
  mixers.clear(); [H, D].forEach((M) => M.mixer && mixers.add(M.mixer));
  // the patient's organ follows their report (outside view)
  personal = v === "outside" ? (D.personal ||= makeCase(COND.id, D.inner)) : null;
  if (personal) personal.apply(SPEC.state(values));
  buildMarkers();
  // names above the organs
  Object.entries(slots).forEach(([key, s]) => {
    if (labels[key]) s.group.remove(labels[key]);
    labels[key] = labelSprite(key === "h" ? t(UI.healthy) : (fromReport ? t(UI.yours) : t(COND.name)), s.color);
    labels[key].position.set(0, s.model.height + 0.05, 0); s.group.add(labels[key]);
  });
  panel.draw();
}
// numbered dots on the organs, and the doctor's lettered notes
function buildMarkers() {
  hotSprites.forEach((sp) => sp.parent && sp.parent.remove(sp)); hotSprites = [];
  pinSprites.forEach((sp) => sp.parent && sp.parent.remove(sp)); pinSprites = [];
  for (const key of ["h", "d"]) {
    const s = slots[key], M = s.model;
    s.hotspots.forEach((h, i) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeTexture(String(i + 1), key === "h" ? "#2e7d4f" : "#b4442f"), depthTest: true }));
      const p = h.position.split(" ").map(parseFloat), n = (h.normal || "0 0 1").split(" ").map(parseFloat);
      sp.position.set(p[0] + n[0] * 0.004, p[1] + n[1] * 0.004, p[2] + n[2] * 0.004);
      sp.scale.setScalar(0.026 / M.k); sp.renderOrder = 3;
      sp.userData = { kind: "hs", key, i, base: 0.026 / M.k };
      M.inner.add(sp); hotSprites.push(sp);
    });
  }
  if (view === "outside") pins.forEach((p, i) => {
    const M = slots.d.model;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeTexture(String.fromCharCode(65 + i), "#1f4e8c"), depthTest: true }));
    const n = p.n || [0, 0, 1];
    sp.position.set(p.p[0] + n[0] * 0.005, p.p[1] + n[1] * 0.005, p.p[2] + n[2] * 0.005);
    sp.scale.setScalar(0.028 / M.k); sp.renderOrder = 3; sp.userData = { kind: "pin", i, base: 0.028 / M.k };
    M.inner.add(sp); pinSprites.push(sp);
  });
}

// ---------- the floating panel ----------
const panel = (() => {
  const W = 1024, H = 640;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  mesh.position.set(0, 0.5, -0.3); mesh.rotation.x = -0.12; mesh.userData.kind = "panel";
  world.add(mesh);
  let buttons = [], hover = null;
  const content = { title: "", text: "", tour: null };
  function btn(id, label, xx, yy, w, h, on, primary) { buttons.push({ id, label, x: xx, y: yy, w, h, on, primary }); }
  function draw() {
    buttons = [];
    x.clearRect(0, 0, W, H);
    x.fillStyle = "#ffffff"; roundRect(x, 4, 4, W - 8, H - 8, 36); x.fill();
    x.strokeStyle = "#e2ddd4"; x.lineWidth = 4; x.stroke();
    x.fillStyle = "#1f4e8c"; roundRect(x, 4, 4, W - 8, 12, 6); x.fill();
    // header
    x.fillStyle = "#6b7380"; x.font = `600 30px ${FONT}`; x.textAlign = "left"; x.textBaseline = "alphabetic";
    x.fillText(t(COND.organ) + (fromReport ? "  ·  " + SPEC.badge(SPEC.state(values), t) : ""), 44, 66);
    x.fillStyle = "#1c2430"; x.font = `700 42px ${FONT}`; x.fillText(t(COND.name), 44, 114);
    // buttons
    let bx = 44; const by = 140, bh = 72;
    btn("outside", t(X.outside), bx, by, 170, bh, view === "outside"); bx += 176;
    btn("inside", t(X.inside), bx, by, 150, bh, view === "inside"); bx += 172;
    btn("tour", t(X.tour), bx, by, 300, bh, !!content.tour, true); bx += 316;
    btn("reset", t(X.reset), bx, by, 140, bh, false); bx += 152;
    btn("exit", "✕", bx, by, 72, bh, false);
    // content
    x.fillStyle = "#1c2430"; x.font = `700 36px ${FONT}`; x.fillText(content.title, 44, 280);
    x.fillStyle = "#3d4654"; x.font = `400 31px ${FONT}`;
    const lines = wrap(x, content.text, W - 88).slice(0, content.tour ? 6 : 8);
    lines.forEach((l, i) => x.fillText(l, 44, 330 + i * 42));
    if (content.tour) {
      x.fillStyle = "#6b7380"; x.font = `600 26px ${FONT}`; x.fillText(content.tour, 44, 240);
      btn("prev", t(X.back), 44, H - 104, 200, 72, false);
      btn("next", content.last ? t(X.done) : t(X.next) + " →", W - 44 - 260, H - 104, 260, 72, false, true);
    }
    buttons.forEach((b) => {
      const hot = hover === b.id;
      x.fillStyle = b.primary ? (hot ? "#173c6c" : "#1f4e8c") : b.on ? "#e6edf6" : hot ? "#f3f0ea" : "#ffffff";
      roundRect(x, b.x, b.y, b.w, b.h, 16); x.fill();
      x.strokeStyle = b.primary ? "#1f4e8c" : b.on ? "#1f4e8c" : "#cfc8bc"; x.lineWidth = 3; x.stroke();
      x.fillStyle = b.primary ? "#ffffff" : b.on ? "#1f4e8c" : "#1c2430"; x.font = `600 30px ${FONT}`; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + 2); x.textAlign = "left"; x.textBaseline = "alphabetic";
    });
    tex.needsUpdate = true;
  }
  function at(uv) { const px = uv.x * W, py = (1 - uv.y) * H; return buttons.find((b) => px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) || null; }
  function setHover(id) { if (id !== hover) { hover = id; draw(); } }
  function show(title, text, tour, last) { content.title = title; content.text = text; content.tour = tour || null; content.last = !!last; draw(); }
  return { mesh, draw, at, setHover, show };
})();
panel.show(t(X.welcome), t(X.hint));

// ---------- the guided tour of this patient's case ----------
let tour = null;
const ring = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  x.beginPath(); x.arc(64, 64, 50, 0, Math.PI * 2); x.lineWidth = 10; x.strokeStyle = "#1f4e8c"; x.stroke();
  x.beginPath(); x.arc(64, 64, 58, 0, Math.PI * 2); x.lineWidth = 4; x.strokeStyle = "#ffffff"; x.stroke();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false })); s.renderOrder = 6; s.visible = false; return s;
})();
function tourStep() {
  const st = tour.steps[tour.i], n = tour.steps.length;
  panel.show((st.num ? String.fromCharCode(64 + st.num) + ". " : "") + t(st.title), stepText(st, t), t(X.step) + " " + (tour.i + 1) + " / " + n, tour.i === n - 1);
  if (personal) personal.apply(st.timeline ? SPEC.timeline.call(SPEC, values, st.timeline.treat, st.timeline.t).state : SPEC.state(values));
  let f = st.focus;
  if (typeof f === "string") { const h = COND.views.outside.diseasedHotspots.find((z) => z.id === f); f = h ? { p: h.position.split(" ").map(parseFloat) } : null; }
  ring.removeFromParent();
  if (f && slots.d.model) { slots.d.model.inner.add(ring); ring.position.fromArray(f.p); ring.userData.base = 0.06 / slots.d.model.k; ring.visible = true; } else ring.visible = false;
}
async function startTour() {
  if (view !== "outside") await showView("outside");
  tour = { steps: buildTour(COND, values, pins, t), i: 0 }; tourStep();
}
function endTour() {
  tour = null; ring.visible = false; ring.removeFromParent();
  if (personal) personal.apply(SPEC.state(values));
  panel.show(t(X.welcome), t(X.hint));
}

// ---------- pressing things ----------
function press(hit) {
  if (!hit) return false;
  const o = hit.object;
  if (o.userData.kind === "panel") {
    const b = panel.at(hit.uv); if (!b) return true;
    if (b.id === "outside" || b.id === "inside") { if (tour) endTour(); showView(b.id); }
    else if (b.id === "tour") tour ? endTour() : startTour();
    else if (b.id === "reset") resetLayout();
    else if (b.id === "exit") { const s = renderer.xr.getSession(); if (s) s.end(); }
    else if (b.id === "prev" && tour && tour.i > 0) { tour.i--; tourStep(); }
    else if (b.id === "next" && tour) { if (tour.i < tour.steps.length - 1) { tour.i++; tourStep(); } else endTour(); }
    return true;
  }
  if (o.userData.kind === "hs") {
    if (tour) endTour();
    const s = slots[o.userData.key], h = s.hotspots[o.userData.i];
    panel.show((o.userData.i + 1) + ". " + t(h.title) + "  ·  " + (o.userData.key === "h" ? t(UI.healthy) : t(COND.name)), t(h.text));
    return true;
  }
  if (o.userData.kind === "pin") { if (tour) endTour(); panel.show(String.fromCharCode(65 + o.userData.i) + ". " + t(X.note), pins[o.userData.i].t); return true; }
  return false;
}
function slotOf(obj) { for (const [key, s] of Object.entries(slots)) { let p = obj; while (p) { if (p === s.group) return key; p = p.parent; } } return null; }
function resetLayout() {
  Object.values(slots).forEach((s) => { world.attach(s.group); s.group.position.copy(s.home); s.group.rotation.set(0, 0, 0); s.group.scale.setScalar(1); });
  grabs.clear(); twoHand = null;
}

// ---------- ray picking ----------
const ray = new THREE.Raycaster();
function targets() {
  const list = [panel.mesh, ...hotSprites.filter((s) => s.visible), ...pinSprites];
  Object.values(slots).forEach((s) => s.model && list.push(...s.model.meshes));
  return list;
}
function firstHit() {
  ray.camera = renderer.xr.isPresenting ? renderer.xr.getCamera() : camera;
  const hits = ray.intersectObjects(targets(), false);
  // numbers and notes win over the organ surface they sit on
  const mark = hits.find((h) => h.object.userData.kind === "hs" || h.object.userData.kind === "pin");
  if (mark && hits[0] && mark.distance - hits[0].distance < 0.04) return mark;
  return hits[0] || null;
}

// ---------- controllers and hands ----------
const grabs = new Map();      // controller -> slot key it holds
let twoHand = null;
const ctrls = [0, 1].map((i) => {
  const c = renderer.xr.getController(i);
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]),
    new THREE.LineBasicMaterial({ color: 0x1f4e8c, transparent: true, opacity: 0.85 }));
  line.scale.z = 1.5; c.add(line);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.006, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  dot.visible = false; scene.add(dot);
  c.userData = { line, dot, hit: null };
  c.addEventListener("connected", (e) => { c.userData.source = e.data; c.userData.isHand = !!e.data.hand; line.visible = e.data.targetRayMode === "tracked-pointer"; });
  c.addEventListener("disconnected", () => { c.userData.source = null; release(c); });
  c.addEventListener("selectstart", () => down(c));
  c.addEventListener("selectend", () => release(c));
  c.addEventListener("squeezestart", () => down(c, true));
  c.addEventListener("squeezeend", () => release(c));
  scene.add(c);
  const grip = renderer.xr.getControllerGrip(i);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.07, 4, 12), new THREE.MeshStandardMaterial({ color: 0x2b3340, roughness: 0.5 }));
  body.rotation.x = Math.PI / 2.4; grip.add(body);
  grip.addEventListener("connected", (e) => { body.visible = !e.data.hand; });
  scene.add(grip);
  // hands: small dots on each finger joint
  const hand = renderer.xr.getHand(i); hand.userData.dots = new Set(); scene.add(hand);
  return { c, hand };
});
const jointGeo = new THREE.SphereGeometry(0.006, 8, 6), jointMat = new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.6 });
function updateHands() {
  ctrls.forEach(({ hand }) => {
    for (const name in hand.joints) {
      const j = hand.joints[name];
      if (!hand.userData.dots.has(name)) { j.add(new THREE.Mesh(jointGeo, jointMat)); hand.userData.dots.add(name); }
    }
  });
}
function down(c, squeeze) {
  ray.setFromXRController(c);
  const hit = firstHit();
  if (!squeeze && press(hit)) return;
  const key = hit ? slotOf(hit.object) : null;
  if (!key) return;
  const s = slots[key];
  const other = [...grabs.entries()].find(([oc, k]) => k === key && oc !== c);
  if (other) { twoHand = { key, a: other[0], b: c, d0: dist(other[0], c), s0: s.group.scale.x }; grabs.set(c, key); return; }
  c.attach(s.group); grabs.set(c, key);
}
function release(c) {
  const key = grabs.get(c); if (!key) return;
  grabs.delete(c);
  if (twoHand && (twoHand.a === c || twoHand.b === c)) {   // the other hand keeps holding
    const keep = twoHand.a === c ? twoHand.b : twoHand.a; twoHand = null;
    keep.attach(slots[key].group); return;
  }
  world.attach(slots[key].group);
}
const pa = new THREE.Vector3(), pb = new THREE.Vector3();
function dist(a, b) { a.getWorldPosition(pa); b.getWorldPosition(pb); return pa.distanceTo(pb); }

function updatePointers(dt) {
  if (!renderer.xr.isPresenting) return;
  let hoverPanel = null;
  ctrls.forEach(({ c }) => {
    const u = c.userData; if (!u.source) { u.dot.visible = false; return; }
    ray.setFromXRController(c);
    const hit = grabs.has(c) ? null : firstHit();
    u.hit = hit;
    u.line.scale.z = hit ? Math.max(0.02, hit.distance) : 1.5;
    u.dot.visible = !!hit; if (hit) u.dot.position.copy(hit.point);
    if (hit && hit.object.userData.kind === "panel") { const b = panel.at(hit.uv); hoverPanel = b ? b.id : null; }
    // thumbstick: left/right turns, up/down zooms the organ you point at or hold
    const gp = u.source.gamepad;
    if (gp && gp.axes && gp.axes.length >= 4) {
      const key = grabs.get(c) || (hit && slotOf(hit.object));
      const ax = gp.axes[2], ay = gp.axes[3];
      if (key) {
        const g = slots[key].group;
        if (Math.abs(ax) > 0.2) g.rotateY(-ax * dt * 2.2);
        if (Math.abs(ay) > 0.2) g.scale.setScalar(THREE.MathUtils.clamp(g.scale.x * (1 - ay * dt * 1.2), 0.4, 4));
      }
    }
  });
  panel.setHover(hoverPanel);
  if (twoHand) slots[twoHand.key].group.scale.setScalar(THREE.MathUtils.clamp(twoHand.s0 * dist(twoHand.a, twoHand.b) / twoHand.d0, 0.4, 4));
}

// ---------- mouse in the laptop preview ----------
let mdown = null;
renderer.domElement.addEventListener("pointerdown", (e) => { mdown = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener("pointerup", (e) => {
  if (!mdown || Math.hypot(e.clientX - mdown.x, e.clientY - mdown.y) > 5) return;
  const r = renderer.domElement.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
  press(firstHit());
});
renderer.domElement.addEventListener("pointermove", (e) => {
  if (renderer.xr.isPresenting) return;
  const r = renderer.domElement.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
  const h = firstHit(); const b = h && h.object.userData.kind === "panel" ? panel.at(h.uv) : null;
  panel.setHover(b ? b.id : null); renderer.domElement.style.cursor = h && (b || h.object.userData.kind === "hs" || h.object.userData.kind === "pin") ? "pointer" : "grab";
});

// ---------- entering the headset ----------
let mode = null, placed = false;
async function enter(m) {
  const opts = { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"] };
  try {
    const session = await navigator.xr.requestSession(m === "mr" ? "immersive-ar" : "immersive-vr", opts);
    mode = m; placed = false;
    room.visible = m === "vr";
    renderer.setClearAlpha(m === "mr" ? 0 : 1);
    await renderer.xr.setSession(session);
    session.addEventListener("end", () => { mode = null; room.visible = false; renderer.setClearAlpha(0); resetLayout(); world.position.set(0, 0.95, -0.55); world.rotation.set(0, 0, 0); resize(); });
  } catch (e) {
    console.error(e); $("status").textContent = e.message || String(e); $("status").className = "status bad";
  }
}
// put the table in front of the person, a little below their eyes
function placeWorld() {
  const cam = renderer.xr.getCamera();
  const p = new THREE.Vector3(), q = new THREE.Quaternion();
  cam.getWorldPosition(p); cam.getWorldQuaternion(q);
  if (p.lengthSq() === 0) return false;
  const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(q); fwd.y = 0; if (fwd.lengthSq() < 1e-4) fwd.set(0, 0, -1); fwd.normalize();
  world.position.copy(p).addScaledVector(fwd, 0.62); world.position.y = Math.max(0.55, p.y - 0.45);
  world.rotation.set(0, Math.atan2(-fwd.x, -fwd.z), 0);
  return true;
}

async function setupButtons() {
  const btn = $("enter");
  btn.textContent = t(X.checking);
  let ar = false, vr = false;
  if (navigator.xr) {
    try { ar = await navigator.xr.isSessionSupported("immersive-ar"); } catch (e) {}
    try { vr = await navigator.xr.isSessionSupported("immersive-vr"); } catch (e) {}
  }
  if (!ar && !vr) { btn.textContent = t(X.enterVR); btn.disabled = true; $("status").textContent = t(X.noXR); return; }
  btn.disabled = false;
  btn.textContent = ar ? t(X.enterMR) : t(X.enterVR);
  btn.onclick = () => enter(ar ? "mr" : "vr");
  if (ar) {
    $("status").textContent = t(X.mrOk);
    if (vr) { const b2 = document.createElement("button"); b2.type = "button"; b2.className = "btn enter"; b2.textContent = t(X.enterVR); b2.onclick = () => enter("vr"); btn.after(b2); }
  }
}

// ---------- every frame ----------
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.1), time = clock.elapsedTime;
  mixers.forEach((m) => m.update(dt));
  if (personal) personal.pulse(time);
  if (renderer.xr.isPresenting && !placed) placed = placeWorld();
  if (renderer.xr.isPresenting) { updateHands(); updatePointers(dt); } else orbit.update();
  // hovered numbers grow a little; the tour ring breathes
  const hovered = new Set(ctrls.map(({ c }) => c.userData.hit && c.userData.hit.object));
  [...hotSprites, ...pinSprites].forEach((sp) => sp.scale.setScalar(sp.userData.base * (hovered.has(sp) ? 1.35 : 1)));
  if (ring.visible) ring.scale.setScalar(ring.userData.base * (1 + 0.15 * Math.sin(time * 4)));
  renderer.render(scene, camera);
});

// ---------- start ----------
resize();
showView("outside").then(setupButtons).catch((e) => { console.error(e); $("status").textContent = e.message; });
window.__xr = { slots, panel, press, startTour, showView, get tour() { return tour; } };
