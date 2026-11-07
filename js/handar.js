// =============================================================
// Hand AR: put one organ on a real table (WebXR + hit-test) and
// control it with your hand in the air (camera frames from WebXR
// "camera-access" -> MediaPipe Hands), or with touch.
// Without WebXR (laptop), the same controls work over the webcam.
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { FilesetResolver, HandLandmarker } from "./vendor/mediapipe/vision_bundle.mjs";
import { makeCase, caseFromURL } from "./severity.js";
const CASE = caseFromURL();          // a patient's own report values, from My Report

// ---------- text ----------
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && o[lang].trim()) ? o[lang] : (o ? o.en : "");
const $ = (id) => document.getElementById(id);
const U = UI_TEXT;
const params = new URLSearchParams(location.search);
const COND = CONDITIONS.find((c) => c.id === params.get("c")) || CONDITIONS[0];
const STILL = params.get("img");                 // test mode: a photo instead of the camera
const DEBUG = params.has("debug");               // shows what the hand tracker sees
const FLIP = params.get("flip") !== "0";         // camera image orientation fix

// Tamil lines: needs checking by a Tamil reader.
const TX = {
  title: { en: "Hand AR", kn: "ಕೈ AR", ta: "கை AR" },
  intro: { en: "Put the organ on a real table. Then control it with your hand in the air, or with touch.",
    kn: "ಅಂಗವನ್ನು ನಿಜವಾದ ಮೇಜಿನ ಮೇಲೆ ಇಡಿ. ನಂತರ ಗಾಳಿಯಲ್ಲಿ ಕೈ ಆಡಿಸಿ ಅಥವಾ ಸ್ಪರ್ಶಿಸಿ ಅದನ್ನು ನಿಯಂತ್ರಿಸಿ.",
    ta: "உறுப்பை உண்மையான மேசையில் வையுங்கள். பிறகு காற்றில் கையை அசைத்து அல்லது தொட்டு அதைக் கட்டுப்படுத்துங்கள்." },
  g1: { en: "☝️ Point with only your index finger at a number and hold → learn that part", kn: "☝️ ತೋರುಬೆರಳು ಮಾತ್ರ ಸಂಖ್ಯೆಯ ಕಡೆಗೆ ತೋರಿಸಿ ಹಿಡಿಯಿರಿ → ಆ ಭಾಗದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ", ta: "☝️ ஆள்காட்டி விரலால் மட்டும் எண்ணைக் காட்டி நிறுத்துங்கள் → அந்தப் பகுதியைப் பற்றி அறியுங்கள்" },
  g2: { en: "🤏 Pinch on the organ and move your hand → move it", kn: "🤏 ಅಂಗದ ಮೇಲೆ ಚಿಟಿಕೆ ಹಿಡಿದು ಕೈ ಸರಿಸಿ → ಅದನ್ನು ಸರಿಸಿ", ta: "🤏 உறுப்பின் மேல் கிள்ளிப் பிடித்து கையை நகர்த்துங்கள் → அதை நகர்த்தும்" },
  g3: { en: "🖐 Open hand, move it left or right → turn", kn: "🖐 ಕೈ ತೆರೆದು ಎಡಕ್ಕೆ ಅಥವಾ ಬಲಕ್ಕೆ ಸರಿಸಿ → ತಿರುಗಿಸಿ", ta: "🖐 கையைத் திறந்து இடம் அல்லது வலம் நகர்த்துங்கள் → சுழற்று" },
  g4: { en: "✌️ Two fingers (V sign), move up or down → zoom in or out", kn: "✌️ ಎರಡು ಬೆರಳು (V ಗುರುತು), ಮೇಲೆ ಅಥವಾ ಕೆಳಗೆ ಸರಿಸಿ → ದೊಡ್ಡದು ಅಥವಾ ಚಿಕ್ಕದು", ta: "✌️ இரண்டு விரல்கள் (V குறி), மேலே அல்லது கீழே நகர்த்துங்கள் → பெரிதாக்கு அல்லது சிறிதாக்கு" },
  pinchHow: { en: "Keep your whole hand inside the camera view.", kn: "ನಿಮ್ಮ ಕೈ ಪೂರ್ತಿ ಕ್ಯಾಮೆರಾದಲ್ಲಿ ಕಾಣುವಂತೆ ಇಡಿ.", ta: "உங்கள் முழு கையும் கேமராவில் தெரியும்படி வையுங்கள்." },
  pointing: { en: "☝️ Pointing", kn: "☝️ ತೋರಿಸುತ್ತಿದೆ", ta: "☝️ சுட்டுகிறது" },
  touchTip: { en: "Touch works too: drag to turn, two fingers to zoom or move, tap a number.", kn: "ಸ್ಪರ್ಶವೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ: ಎಳೆದರೆ ತಿರುಗುತ್ತದೆ, ಎರಡು ಬೆರಳಿನಿಂದ ದೊಡ್ಡದು ಅಥವಾ ಸರಿಸುವುದು, ಸಂಖ್ಯೆ ಒತ್ತಿ.", ta: "தொடுதலும் வேலை செய்யும்: இழுத்தால் சுழலும், இரு விரல்களால் பெரிதாக்க/நகர்த்த, எண்ணைத் தட்டுங்கள்." },
  startAR: { en: "Start AR on a table", kn: "ಮೇಜಿನ ಮೇಲೆ AR ಶುರು ಮಾಡಿ", ta: "மேசையில் AR தொடங்கு" },
  startCam: { en: "Use this device's camera", kn: "ಈ ಸಾಧನದ ಕ್ಯಾಮೆರಾ ಬಳಸಿ", ta: "இந்தச் சாதனத்தின் கேமராவைப் பயன்படுத்து" },
  noAR: { en: "Table AR is not available on this device (it needs Chrome on an Android phone). You can still try hand control with this device's camera.",
    kn: "ಈ ಸಾಧನದಲ್ಲಿ ಮೇಜಿನ AR ಇಲ್ಲ (ಆಂಡ್ರಾಯ್ಡ್ ಫೋನ್‌ನ Chrome ಬೇಕು). ಆದರೂ ಈ ಸಾಧನದ ಕ್ಯಾಮೆರಾದಿಂದ ಕೈ ನಿಯಂತ್ರಣ ಪ್ರಯತ್ನಿಸಬಹುದು.",
    ta: "இந்தச் சாதனத்தில் மேசை AR இல்லை (Android போனில் Chrome தேவை). இருந்தாலும் இந்தச் சாதனத்தின் கேமராவில் கை கட்டுப்பாட்டை முயலலாம்." },
  loading: { en: "Loading the 3D organ and hand tracking…", kn: "3D ಅಂಗ ಮತ್ತು ಕೈ ಟ್ರ್ಯಾಕಿಂಗ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ…", ta: "3D உறுப்பும் கை கண்காணிப்பும் ஏற்றப்படுகின்றன…" },
  findTitle: { en: "Find a table", kn: "ಮೇಜನ್ನು ಹುಡುಕಿ", ta: "மேசையைக் கண்டுபிடியுங்கள்" },
  find: { en: "Move the phone slowly over a table. When the organ appears on it, tap the screen (or pinch) to put it there.",
    kn: "ಫೋನ್ ಅನ್ನು ಮೇಜಿನ ಮೇಲೆ ನಿಧಾನವಾಗಿ ಸರಿಸಿ. ಅಂಗ ಕಾಣಿಸಿದಾಗ ಪರದೆಯನ್ನು ಒತ್ತಿ (ಅಥವಾ ಚಿಟಿಕೆ ಹಿಡಿಯಿರಿ).",
    ta: "போனை மேசையின் மேல் மெதுவாக நகர்த்துங்கள். உறுப்பு தெரிந்ததும் திரையைத் தட்டுங்கள் (அல்லது கிள்ளுங்கள்)." },
  placed: { en: "Hold the phone in one hand. Show your other hand to the camera, about 30 cm away.",
    kn: "ಫೋನ್ ಅನ್ನು ಒಂದು ಕೈಯಲ್ಲಿ ಹಿಡಿಯಿರಿ. ಇನ್ನೊಂದು ಕೈಯನ್ನು ಸುಮಾರು 30 ಸೆಂ.ಮೀ ದೂರದಲ್ಲಿ ಕ್ಯಾಮೆರಾಗೆ ತೋರಿಸಿ.",
    ta: "போனை ஒரு கையில் பிடியுங்கள். மற்ற கையை சுமார் 30 செ.மீ தூரத்தில் கேமராவுக்குக் காட்டுங்கள்." },
  inlineHint: { en: "Show your hand to the camera.", kn: "ನಿಮ್ಮ ಕೈಯನ್ನು ಕ್ಯಾಮೆರಾಗೆ ತೋರಿಸಿ.", ta: "உங்கள் கையை கேமராவுக்குக் காட்டுங்கள்." },
  noHands: { en: "Hand control did not start on this phone (the browser did not share the camera image). Touch still works.",
    kn: "ಈ ಫೋನ್‌ನಲ್ಲಿ ಕೈ ನಿಯಂತ್ರಣ ಶುರುವಾಗಲಿಲ್ಲ (ಬ್ರೌಸರ್ ಕ್ಯಾಮೆರಾ ಚಿತ್ರ ಕೊಡಲಿಲ್ಲ). ಸ್ಪರ್ಶ ಕೆಲಸ ಮಾಡುತ್ತದೆ.",
    ta: "இந்த போனில் கை கட்டுப்பாடு தொடங்கவில்லை (உலாவி கேமரா படத்தைத் தரவில்லை). தொடுதல் வேலை செய்யும்." },
  seen: { en: "✋ Hand found", kn: "✋ ಕೈ ಸಿಕ್ಕಿದೆ", ta: "✋ கை தெரிகிறது" },
  none: { en: "✋ Show your hand", kn: "✋ ಕೈ ತೋರಿಸಿ", ta: "✋ கையைக் காட்டுங்கள்" },
  loadingHands: { en: "✋ Loading hand tracking…", kn: "✋ ಕೈ ಟ್ರ್ಯಾಕಿಂಗ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ…", ta: "✋ கை கண்காணிப்பு ஏற்றப்படுகிறது…" },
  off: { en: "✋ Hands off", kn: "✋ ಕೈ ಆಫ್", ta: "✋ கை ஆஃப்" },
  moveHere: { en: "⤓ Move", kn: "⤓ ಸರಿಸಿ", ta: "⤓ நகர்த்து" },
  moving: { en: "🤏 Moving", kn: "ಸರಿಸುತ್ತಿದೆ", ta: "நகர்கிறது" },
  turning: { en: "🖐 Turning", kn: "ತಿರುಗುತ್ತಿದೆ", ta: "சுழல்கிறது" },
  zooming: { en: "✌️ Zoom", kn: "ದೊಡ್ಡ/ಚಿಕ್ಕ", ta: "பெரிதாக்கல்" },
  arFail: { en: "Could not start AR.", kn: "AR ಶುರು ಮಾಡಲಾಗಲಿಲ್ಲ.", ta: "AR தொடங்க முடியவில்லை." },
  privacy: { en: "The camera is used only on this device. Nothing is recorded or sent.", kn: "ಕ್ಯಾಮೆರಾ ಈ ಸಾಧನದಲ್ಲೇ ಬಳಕೆಯಾಗುತ್ತದೆ. ಏನನ್ನೂ ರೆಕಾರ್ಡ್ ಮಾಡುವುದಿಲ್ಲ, ಕಳುಹಿಸುವುದಿಲ್ಲ.", ta: "கேமரா இந்தச் சாதனத்தில் மட்டுமே பயன்படும். எதுவும் பதிவு செய்யப்படுவதோ அனுப்பப்படுவதோ இல்லை." },
};

// ---------- static texts ----------
$("s-title").textContent = t(TX.title) + " · " + t(COND.organ);
$("s-text").textContent = t(TX.loading);
$("s-ar").textContent = "⧉ " + t(TX.startAR);
$("s-cam").textContent = "📷 " + t(TX.startCam);
$("s-back").textContent = "← " + t(U.back);
$("s-back").href = "index.html#" + COND.id;
$("s-note").textContent = t(TX.privacy) + " " + t(U.disclaimer);
$("st-healthy").textContent = t(U.healthy);
$("st-sick").textContent = t(U.withCondition);
$("v-out").textContent = t(U.outsideView);
$("v-in").textContent = t(U.insideView);
$("place-btn").textContent = t(TX.moveHere);
$("i-close").textContent = "✕ " + t(U.closeInfo);
const gestureList = (two) => [TX.g1, TX.g2, TX.g3].concat(two ? [TX.g4] : []).map((g) => "<li></li>").join("");
function fillList(ul, two) {
  ul.innerHTML = gestureList(two);
  [TX.g1, TX.g2, TX.g3, TX.g4].forEach((g, i) => { if (ul.children[i]) ul.children[i].textContent = t(g); });
}
fillList($("s-list"), true);

// ---------- three.js ----------
const canvas = $("gl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;
const gl = renderer.getContext();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 30);      // used when not in AR
const xrCam = new THREE.PerspectiveCamera();                         // copy of the AR phone camera
xrCam.matrixAutoUpdate = false;
let viewCam = camera;
scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 1.8); sun.position.set(0.4, 1, 0.6); scene.add(sun);

let W = innerWidth, H = innerHeight;
function resize() {
  W = innerWidth; H = innerHeight;
  if (renderer.xr.isPresenting) return;
  renderer.setSize(W, H, false);
  camera.aspect = W / H; camera.updateProjectionMatrix();
}
addEventListener("resize", resize); resize();

// root = where the organ stands; spin = user turn; zoomG = user zoom
const root = new THREE.Group(), spin = new THREE.Group(), zoomG = new THREE.Group();
root.add(zoomG); zoomG.add(spin); scene.add(root);
const SIZE = 0.25;   // the organ is about 25 cm big at zoom 1
// soft round shadow under the organ
const shadowTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  const g = x.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, "rgba(0,0,0,.55)"); g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
})();
const shadow = new THREE.Mesh(new THREE.PlaneGeometry(SIZE * 1.3, SIZE * 1.3), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.002; zoomG.add(shadow);
// ring that shows where the table was found
const reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.085, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2fd3c3 }));
reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);

// ---------- models ----------
const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(new URL("draco/", import.meta.url).href));
const cache = {};
let state = "healthy", view = "outside", cur = null;
const clock = new THREE.Clock();
function loadGLB(url) { return new Promise((res, rej) => loader.load(url, res, undefined, rej)); }
async function getModel(st, vw) {
  const v = COND.views[vw];
  const url = st === "healthy" ? v.healthyModel : v.diseasedModel;
  if (cache[url]) return cache[url];
  const g = await loadGLB(url);
  const m = g.scene;
  const box = new THREE.Box3().setFromObject(m);
  const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
  m.position.set(-center.x, -box.min.y, -center.z);           // stand on the table, centred
  const holder = new THREE.Group(); holder.add(m);
  holder.scale.setScalar(SIZE / Math.max(size.x, size.y, size.z));
  let mixer = null;
  if (g.animations && g.animations.length) { mixer = new THREE.AnimationMixer(m); mixer.clipAction(g.animations[0]).play(); }
  let personal = null;
  if (CASE && st !== "healthy" && vw === "outside") { personal = makeCase(COND.id, m); personal.apply(CASE); }
  const meshes = []; m.traverse((n) => n.isMesh && meshes.push(n));
  return (cache[url] = { holder, inner: m, mixer, personal, meshes, hotspots: st === "healthy" ? v.healthyHotspots : v.diseasedHotspots });
}
async function show(st, vw) {
  const mdl = await getModel(st, vw);
  state = st; view = vw;
  if (cur) spin.remove(cur.holder);
  cur = mdl; spin.add(cur.holder);
  $("st-healthy").classList.toggle("on", st === "healthy");
  $("st-sick").classList.toggle("on", st !== "healthy"); $("st-sick").classList.toggle("sick", st !== "healthy");
  $("v-out").classList.toggle("on", vw === "outside"); $("v-in").classList.toggle("on", vw === "inside");
  closeInfo(); buildLabels();
}

// ---------- numbered labels ----------
const labels = $("labels");
let activePart = -1;
function buildLabels() {
  labels.querySelectorAll(".hs").forEach((e) => e.remove());
  if (!cur) return;
  cur.hotspots.forEach((h, i) => {
    const el = document.createElement("button");
    el.type = "button"; el.className = "hs dwell" + (state === "healthy" ? "" : " sick"); el.textContent = i + 1;
    el.setAttribute("aria-label", t(h.title));
    const p = h.position.split(" ").map(parseFloat), n = (h.normal || "0 0 1").split(" ").map(parseFloat);
    el._p = new THREE.Vector3(...p); el._n = new THREE.Vector3(...n); el._i = i;
    el.addEventListener("click", (e) => { e.stopPropagation(); showPart(i); });
    labels.appendChild(el);
  });
}
const tv = new THREE.Vector3(), tn = new THREE.Vector3(), tq = new THREE.Quaternion(), camPos = new THREE.Vector3();
function updateLabels() {
  const vis = root.visible && cur;
  camPos.setFromMatrixPosition(viewCam.matrixWorld);
  if (vis) { cur.inner.updateWorldMatrix(true, false); cur.inner.getWorldQuaternion(tq); }
  labels.querySelectorAll(".hs").forEach((el) => {
    if (!vis) { el.style.display = "none"; return; }
    tv.copy(el._p); cur.inner.localToWorld(tv);
    tn.copy(el._n).applyQuaternion(tq);
    const toCam = camPos.clone().sub(tv).normalize();
    tv.project(viewCam);
    if (tv.z > 1 || tv.z < -1) { el.style.display = "none"; return; }
    const x = (tv.x + 1) / 2 * W, y = (1 - tv.y) / 2 * H;
    el._x = x; el._y = y;
    el.style.display = ""; el.style.transform = `translate(${x}px, ${y}px)` + (el.classList.contains("hot") || el.classList.contains("on") ? " scale(1.3)" : "");
    el.style.opacity = tn.dot(toCam) > -0.1 ? 1 : 0.35;
  });
}
function showPart(i) {
  const h = cur.hotspots[i]; if (!h) return;
  activePart = i;
  $("i-title").textContent = (i + 1) + ". " + t(h.title);
  $("i-sub").textContent = t(COND.organ) + " · " + (state === "healthy" ? t(U.healthy) : t(COND.name));
  $("i-text").textContent = t(h.text);
  $("info").hidden = false; $("hint").hidden = true;
  labels.querySelectorAll(".hs").forEach((el) => el.classList.toggle("on", el._i === i));
}
function showOrgan() {
  activePart = -1;
  $("i-title").textContent = t(COND.organ);
  $("i-sub").textContent = state === "healthy" ? t(U.healthy) : t(COND.name);
  $("i-text").textContent = t(state === "healthy" ? COND.organAbout : COND.about);
  $("info").hidden = false; $("hint").hidden = true;
  labels.querySelectorAll(".hs").forEach((el) => el.classList.remove("on"));
}
function closeInfo() { activePart = -1; $("info").hidden = true; $("hint").hidden = false; labels.querySelectorAll(".hs").forEach((el) => el.classList.remove("on")); }
$("i-close").addEventListener("click", closeInfo);

// ---------- hit testing on screen ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function setRay(x, y) { ndc.set(x / W * 2 - 1, -(y / H) * 2 + 1); ray.setFromCamera(ndc, viewCam); }
function hitsOrgan(x, y) { if (!cur || !root.visible) return false; setRay(x, y); return ray.intersectObjects(cur.meshes, false).length > 0; }
// point on the table plane (AR) or on a plane facing the camera (laptop) under a screen point
const plane = new THREE.Plane();
function planePoint(x, y, origin) {
  plane.setFromNormalAndCoplanarPoint(xrSession ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1), origin);
  setRay(x, y); const out = new THREE.Vector3();
  return ray.ray.intersectPlane(plane, out) ? out : null;
}
function nearestLabel(x, y, r) {
  let best = null, bd = r;
  labels.querySelectorAll(".hs").forEach((el) => { if (el.style.display === "none") return; const d = Math.hypot(el._x - x, el._y - y); if (d < bd) { bd = d; best = el; } });
  return best;
}
function dwellTarget(x, y) {
  const lab = nearestLabel(x, y, 44);
  if (lab) return lab;
  for (const el of document.querySelectorAll(".hud .dwell")) {
    if (el.offsetParent === null) continue;
    const r = el.getBoundingClientRect();
    if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6) return el;
  }
  return null;
}

// ---------- user transform ----------
let userScale = 1, tilt = 0;
const clampS = (s) => Math.max(0.3, Math.min(4, s));
function applyUser() { zoomG.scale.setScalar(userScale); spin.rotation.x = tilt; }

// ---------- placing (AR) ----------
let xrSession = null, hitSource = null, glBinding = null, placed = false, lastHit = null, camAccess = false;
function placeNow() {
  if (!xrSession || placed || !lastHit) return false;
  placed = true; reticle.visible = false;
  $("place-btn").hidden = false; setHint();
  return true;
}
$("place-btn").addEventListener("click", () => { placed = false; $("place-btn").hidden = true; setHint(); });

// ---------- touch ----------
const ui = $("ui");
ui.addEventListener("beforexrselect", (e) => e.preventDefault());   // we handle taps ourselves
const ptrs = new Map(); let g2 = null, moved = false;
function isUI(e) { return e.target.closest && e.target.closest("button, a, .panel"); }
ui.addEventListener("pointerdown", (e) => {
  if (isUI(e)) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false;
  if (ptrs.size === 2) {
    const [a, b] = [...ptrs.values()]; const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    g2 = { d: Math.hypot(a.x - b.x, a.y - b.y), s: userScale, pos: root.position.clone(), hit: planePoint(mx, my, root.position) };
  }
});
ui.addEventListener("pointermove", (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y;
  if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
  p.x = e.clientX; p.y = e.clientY;
  if (ptrs.size === 1) { spin.rotation.y += dx * 0.012; tilt = Math.max(-0.9, Math.min(0.9, tilt + dy * 0.006)); }
  else if (ptrs.size === 2 && g2) {
    const [a, b] = [...ptrs.values()]; const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    userScale = clampS(g2.s * Math.hypot(a.x - b.x, a.y - b.y) / g2.d);
    const h = planePoint(mx, my, g2.pos);
    if (h && g2.hit) root.position.copy(g2.pos).add(h.sub(g2.hit));
  }
});
function pointerEnd(e) {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const tap = ptrs.size === 1 && !moved;
  ptrs.delete(e.pointerId); if (ptrs.size < 2) g2 = null;
  if (!tap) return;
  if (xrSession && !placed) { placeNow(); return; }
  const lab = nearestLabel(e.clientX, e.clientY, 34);
  if (lab) showPart(lab._i); else if (hitsOrgan(e.clientX, e.clientY)) showOrgan();
}
ui.addEventListener("pointerup", pointerEnd); ui.addEventListener("pointercancel", pointerEnd);

// ---------- hand tracking ----------
let hands = null, handsOn = true, handsWork = true, handsFailed = false;
async function initHands() {
  if (typeof self.dbg !== "function") self.dbg = (...a) => console.debug(...a);   // the tracker's log helper
  const files = await FilesetResolver.forVisionTasks(new URL("vendor/mediapipe/wasm", import.meta.url).href);
  const opts = (delegate) => ({ baseOptions: { modelAssetPath: new URL("vendor/mediapipe/hand_landmarker.task", import.meta.url).href, delegate },
    runningMode: "VIDEO", numHands: 1, minHandDetectionConfidence: 0.4, minHandPresenceConfidence: 0.4, minTrackingConfidence: 0.4 });
  try { hands = await HandLandmarker.createFromOptions(files, opts("GPU")); }
  catch (e) { hands = await HandLandmarker.createFromOptions(files, opts("CPU")); }
}

// read the AR camera picture (a GPU texture) into a small image for the hand tracker
let cp = null;
function setupCopy() {
  const vs = "attribute vec2 p; varying vec2 uv; void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }";
  const fs = "precision mediump float; uniform sampler2D tex; uniform float flip; varying vec2 uv; void main(){ gl_FragColor = texture2D(tex, vec2(uv.x, flip > 0.5 ? 1.0 - uv.y : uv.y)); }";
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  cp = { prog, vao, uTex: gl.getUniformLocation(prog, "tex"), uFlip: gl.getUniformLocation(prog, "flip"), fb: gl.createFramebuffer(), tex: gl.createTexture(), w: 0, h: 0, px: null, img: null };
}
function grabCamera(xrCamera) {
  const camTex = glBinding.getCameraImage(xrCamera);
  if (!camTex) return null;
  if (!cp) setupCopy();
  const keepTarget = renderer.getRenderTarget();       // three.js has the AR screen bound; put it back afterwards
  const k = 384 / Math.max(xrCamera.width, xrCamera.height);
  const w = Math.round(xrCamera.width * k), h = Math.round(xrCamera.height * k);
  if (w !== cp.w || h !== cp.h) {
    cp.w = w; cp.h = h;
    gl.bindTexture(gl.TEXTURE_2D, cp.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindFramebuffer(gl.FRAMEBUFFER, cp.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, cp.tex, 0);
    cp.px = new Uint8ClampedArray(w * h * 4); cp.img = new ImageData(cp.px, w, h);
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, cp.fb);
  gl.viewport(0, 0, w, h);
  gl.disable(gl.DEPTH_TEST); gl.disable(gl.BLEND); gl.disable(gl.CULL_FACE); gl.disable(gl.SCISSOR_TEST);
  gl.useProgram(cp.prog); gl.bindVertexArray(cp.vao);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, camTex);
  gl.uniform1i(cp.uTex, 0); gl.uniform1f(cp.uFlip, FLIP ? 1 : 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, cp.px);
  gl.bindVertexArray(null); gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  renderer.resetState();
  renderer.setRenderTarget(keepTarget);
  if (DEBUG) { const d = $("dbg"); d.style.display = "block"; d.width = w; d.height = h; d.getContext("2d").putImageData(cp.img, 0, 0); }
  return cp.img;
}

// camera / photo for the laptop mode
const video = $("cam"), still = $("still");
let src = null, mirrored = false;
function srcSize() { return src === video ? [video.videoWidth, video.videoHeight] : [still.naturalWidth, still.naturalHeight]; }
function toScreen(p) {
  if (xrSession) return { x: p.x * W, y: p.y * H };            // AR camera picture matches the screen
  const [sw, sh] = srcSize();
  const k = Math.max(W / sw, H / sh), dw = sw * k, dh = sh * k;
  let x = (W - dw) / 2 + p.x * dw; const y = (H - dh) / 2 + p.y * dh;
  if (mirrored) x = W - x;
  return { x, y };
}

const cursor = $("cursor"), thumbDot = $("thumb"), modeEl = $("mode"), handchip = $("handchip");
const sm = {};
function smooth(key, p, a) { const s = sm[key]; if (!s || Math.hypot(s.x - p.x, s.y - p.y) > 160) return (sm[key] = { ...p }); s.x += (p.x - s.x) * a; s.y += (p.y - s.y) * a; return s; }
let pinchOn = false, act = null, dwell = { el: null, t0: 0 }, lastSeen = 0, lastRes = null;
let pose = "none", rawPose = "none", rawCount = 0;
function setMode(txt) { modeEl.style.display = txt ? "block" : "none"; if (txt) modeEl.textContent = txt; }
function renderHandChip(seen) {
  handchip.textContent = !handsOn ? t(TX.off) : !hands && !handsFailed ? t(TX.loadingHands) : t(seen ? TX.seen : TX.none);
  handchip.classList.toggle("seen", handsOn && seen);
}
// which hand shape is it?  pinch / point (index only) / vee (index + middle) / open (all fingers) / other
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function handShape(P) {
  const wr = P[0];
  const ext = [[8, 6], [12, 10], [16, 14], [20, 18]].map(([tip, pip]) => dist(wr, P[tip]) > dist(wr, P[pip]) * 1.15);
  const size = dist(wr, P[9]) || 1;
  const pd = dist(P[4], P[8]) / size;
  pinchOn = pinchOn ? pd < 0.45 : pd < 0.28;
  if (pinchOn && !ext[1]) return "pinch";       // (a V sign or open hand is never a pinch)
  pinchOn = pinchOn && !ext[1];
  const [i, m, r, l] = ext;
  if (i && !m && !r && !l) return "point";
  if (i && m && !r && !l) return "vee";
  if (i && m && r && l) return "open";
  return "other";
}
function handStep(res, now) {
  const hs = (res && res.landmarks) || [];
  const fresh = res !== lastRes; lastRes = res;
  if (hs.length) lastSeen = now;
  const seen = now - lastSeen < 600;           // keep going through short tracking drops
  renderHandChip(seen);
  if (seen && !autoFolded && (!xrSession || placed)) { autoFolded = true; foldHint(true); }
  if (!hs.length) {
    if (!seen) { cursor.style.display = thumbDot.style.display = "none"; act = null; pose = "none"; setMode(""); dwell.el = null; clearHot(); }
    return;
  }
  const P = hs[0].map(toScreen);
  if (fresh) {                                  // a shape must show twice in a row before we switch to it
    const s = handShape(P);
    if (s === rawPose) rawCount++; else { rawPose = s; rawCount = 1; }
    if (rawCount >= 2 || s === "pinch") pose = s;
  }
  const tip = smooth("tip", P[8], 0.45);
  const palm = smooth("palm", { x: (P[0].x + P[9].x) / 2, y: (P[0].y + P[9].y) / 2 }, 0.45);
  const pin = smooth("pin", { x: (P[4].x + P[8].x) / 2, y: (P[4].y + P[8].y) / 2 }, 0.5);
  const c = pose === "point" || pose === "other" ? tip : pose === "pinch" ? pin : palm;
  cursor.style.display = "block"; cursor.style.transform = `translate(${c.x}px, ${c.y}px)`;
  thumbDot.style.display = pose === "point" ? "none" : "block"; thumbDot.style.transform = `translate(${P[4].x}px, ${P[4].y}px)`;
  cursor.classList.toggle("pinch", pose === "pinch");
  if (act && act.kind !== pose) act = null;

  if (pose !== "point") { dwell.el = null; cursor.style.background = ""; clearHot(); }

  if (pose === "pinch") {                       // 🤏 move (or place it, before it is on the table)
    if (!act) {
      if (xrSession && !placed) { placeNow(); act = { kind: "pinch", none: true }; return; }
      act = hitsOrgan(pin.x, pin.y) ? { kind: "pinch", pos: root.position.clone(), hit: planePoint(pin.x, pin.y, root.position) } : { kind: "pinch", none: true };
    }
    if (!act.none && act.hit) { const h = planePoint(pin.x, pin.y, act.pos); if (h) root.position.copy(act.pos).add(h.sub(act.hit)); setMode(t(TX.moving)); }
    else setMode("");
    return;
  }
  if (pose === "open") {                        // 🖐 turn
    if (!act) act = { kind: "open", x: palm.x, rot: spin.rotation.y };
    spin.rotation.y = act.rot + (palm.x - act.x) * 0.013;
    setMode(t(TX.turning)); return;
  }
  if (pose === "vee") {                         // ✌️ zoom: up = bigger
    if (!act) act = { kind: "vee", y: palm.y, s: userScale };
    userScale = clampS(act.s * Math.exp(-(palm.y - act.y) * 0.006));
    setMode(t(TX.zooming) + " " + Math.round(userScale * 100) + "%"); return;
  }
  if (pose !== "point") { setMode(""); return; }

  // ☝️ point with the index finger only: hold on a number or a button to press it
  setMode(t(TX.pointing));
  const el = dwellTarget(tip.x, tip.y);
  if (el !== dwell.el) dwell = { el, t0: now };
  const prog = el ? Math.min(1, (now - dwell.t0) / 700) : 0;
  cursor.style.background = prog > 0 ? `conic-gradient(rgba(255,196,87,.9) ${prog * 360}deg, rgba(0,0,0,.25) 0)` : "";
  clearHot(); if (el) el.classList.add("hot");
  if (el && prog >= 1) { dwell.t0 = now + 1e9; el.click(); }
}
function clearHot() { document.querySelectorAll(".hot").forEach((x) => x.classList.remove("hot")); }
handchip.addEventListener("click", () => { handsOn = !handsOn; renderHandChip(false); });

// ---------- hint panel ----------
// the gesture list folds away once a hand is found; tap the panel to open it again
let autoFolded = false;
function foldHint(f) { $("h-list").hidden = f; $("h-note").hidden = f; }
$("hint").addEventListener("click", () => foldHint(!$("h-list").hidden));
function setHint() {
  const list = $("h-list");
  if (xrSession && !placed) {
    $("h-title").textContent = t(TX.findTitle); $("h-text").textContent = t(TX.find); list.innerHTML = ""; $("h-note").textContent = "";
    return;
  }
  $("h-title").textContent = t(COND.organ) + " · " + (state === "healthy" ? t(U.healthy) : t(COND.name));
  if (!handsWork) { $("h-text").textContent = t(TX.noHands); list.innerHTML = ""; $("h-note").textContent = t(TX.touchTip); return; }
  $("h-text").textContent = (xrSession ? t(TX.placed) : t(TX.inlineHint)) + " " + t(TX.pinchHow);
  fillList(list, true);
  $("h-note").textContent = t(TX.touchTip);
}

// ---------- buttons ----------
$("st-healthy").addEventListener("click", () => show("healthy", view).then(setHint));
$("st-sick").addEventListener("click", () => show("diseased", view).then(setHint));
$("v-out").addEventListener("click", () => show(state, "outside"));
$("v-in").addEventListener("click", () => show(state, "inside"));
$("exit-btn").addEventListener("click", () => { if (xrSession) xrSession.end(); else location.href = "index.html#" + COND.id; });

// ---------- start AR ----------
async function startAR() {
  $("s-ar").disabled = true;
  try {
    const session = await navigator.xr.requestSession("immersive-ar", {
      requiredFeatures: ["hit-test"], optionalFeatures: ["dom-overlay", "camera-access"], domOverlay: { root: ui } });
    renderer.xr.setReferenceSpaceType("local");
    await renderer.xr.setSession(session);
    xrSession = session; placed = false; lastHit = null;
    document.body.classList.add("in-xr");
    $("start").hidden = true; video.hidden = true; still.hidden = true;
    const viewerSpace = await session.requestReferenceSpace("viewer");
    hitSource = await session.requestHitTestSource({ space: viewerSpace });
    const feats = session.enabledFeatures;
    camAccess = feats ? feats.includes("camera-access") : true;
    try { glBinding = new XRWebGLBinding(session, gl); } catch (e) { glBinding = null; }
    handsWork = !!(camAccess && glBinding) && !handsFailed;
    root.visible = false; root.position.set(0, 0, 0); userScale = 1; tilt = 0; spin.rotation.set(0, 0, 0);
    setHint();
    session.addEventListener("end", () => {
      xrSession = null; hitSource = null; glBinding = null; cp = null; placed = false;
      document.body.classList.remove("in-xr"); $("place-btn").hidden = true;
      $("start").hidden = false; $("s-ar").disabled = false; viewCam = camera; resize();
    });
  } catch (e) {
    console.error(e); $("s-ar").disabled = false;
    $("s-text").textContent = t(TX.arFail) + " (" + (e.message || e.name) + ")";
  }
}

// ---------- start laptop / camera mode ----------
async function startCam() {
  try {
    if (STILL) {
      still.src = STILL; still.hidden = false; await still.decode(); src = still; mirrored = params.get("mirror") === "1";
    } else {
      const facing = matchMedia("(pointer: coarse)").matches ? "environment" : "user";
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      video.srcObject = stream; video.hidden = false; await video.play(); src = video; mirrored = facing === "user";
    }
    video.classList.toggle("mirror", mirrored && src === video); still.classList.toggle("mirror", mirrored && src === still);
    root.visible = true; root.position.set(0, -0.12, -0.6); root.rotation.set(0, 0, 0);
    handsWork = !handsFailed;
    $("start").hidden = true; setHint();
  } catch (e) {
    console.error(e); $("s-text").textContent = t(U.camError);
  }
}
$("s-ar").addEventListener("click", startAR);
$("s-cam").addEventListener("click", startCam);

// ---------- every frame ----------
let lastTs = 0, frameNo = 0, handRes = null, detMs = 20, fastHands = false;
const tmpM = new THREE.Matrix4(), hitPos = new THREE.Vector3();
renderer.setAnimationLoop((time, frame) => {
  const dt = Math.min(clock.getDelta(), 0.1);
  if (cur && cur.mixer) cur.mixer.update(dt);
  if (cur && cur.personal) cur.personal.pulse(time / 1000);
  const now = performance.now();
  frameNo++;
  let image = null;
  if (frame && xrSession) {
    const ref = renderer.xr.getReferenceSpace();
    const pose = frame.getViewerPose(ref);
    if (pose) {
      const v = pose.views[0];
      xrCam.matrixWorld.fromArray(v.transform.matrix); xrCam.matrixWorldInverse.copy(xrCam.matrixWorld).invert();
      xrCam.projectionMatrix.fromArray(v.projectionMatrix); xrCam.projectionMatrixInverse.copy(xrCam.projectionMatrix).invert();
      viewCam = xrCam;
      if (!placed && hitSource) {
        const hits = frame.getHitTestResults(hitSource);
        if (hits.length) {
          const hp = hits[0].getPose(ref);
          reticle.matrix.fromArray(hp.transform.matrix); reticle.visible = true;
          hitPos.setFromMatrixPosition(reticle.matrix); lastHit = hitPos.clone();
          root.position.copy(hitPos); root.visible = true;
          camPos.setFromMatrixPosition(xrCam.matrixWorld);
          root.rotation.set(0, Math.atan2(camPos.x - hitPos.x, camPos.z - hitPos.z), 0);
        } else { reticle.visible = false; }
      }
      if (hands && handsOn && handsWork && v.camera && (fastHands || frameNo % 2 === 0)) {
        try { image = grabCamera(v.camera); } catch (e) { console.warn(e); image = null; }
      }
    }
  } else if (src && hands && handsOn && (fastHands || frameNo % 2 === 0)) {
    const ok = src === video ? video.readyState >= 2 && video.videoWidth : still.complete && still.naturalWidth;
    if (ok) image = src;
  }
  if (image && hands) {
    const ts = Math.max(now, lastTs + 1); lastTs = ts;
    const t0 = performance.now();
    try { handRes = hands.detectForVideo(image, ts); } catch (e) { handRes = null; }
    detMs = detMs * 0.9 + (performance.now() - t0) * 0.1; fastHands = detMs < 14;   // run every frame if the phone is fast enough
  }
  if (handsOn && handsWork && (xrSession ? placed || true : src)) handStep(handRes, now);
  else { cursor.style.display = thumbDot.style.display = "none"; renderHandChip(false); }
  applyUser();
  updateLabels();
  renderer.render(scene, camera);
});

// ---------- boot ----------
(async () => {
  // hand tracking (about 17 MB) loads in the background; the organ and the Start button do not wait for it
  initHands().then(() => { renderHandChip(false); })
    .catch((e) => { console.warn("hands failed", e); hands = null; handsFailed = true; handsWork = false; setHint(); });
  try { await show(CASE ? "diseased" : "healthy", "outside"); }
  catch (e) { $("s-text").textContent = "Error: " + e.message; $("s-spin").hidden = true; return; }
  root.visible = false;
  let arOK = false;
  try { arOK = !!(navigator.xr && await navigator.xr.isSessionSupported("immersive-ar")); } catch (e) {}
  $("s-spin").hidden = true;
  $("s-text").textContent = arOK ? t(TX.intro) : t(TX.noAR);
  $("s-list").hidden = false;
  $("s-ar").hidden = !arOK; $("s-cam").hidden = false;
  renderHandChip(false); setHint();
  if (STILL) startCam();
})();
window.__hand = { root, spin, show, get cur() { return cur; }, get res() { return handRes; }, get pose() { return pose; }, get scale() { return userScale; } };
