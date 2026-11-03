// =============================================================
// Body AR mirror (x-ray): finds a person with the camera (MediaPipe
// Pose + body outline), gives the body an x-ray look and places the
// 3D organs inside it. Touch or hand shapes (MediaPipe Hands).
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { FilesetResolver, PoseLandmarker, HandLandmarker } from "./vendor/mediapipe/vision_bundle.mjs";

// ---------- text ----------
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && o[lang].trim()) ? o[lang] : (o ? o.en : "");
const $ = (id) => document.getElementById(id);
const U = UI_TEXT;
const C = Object.fromEntries(CONDITIONS.map((c) => [c.id, c]));
const params = new URLSearchParams(location.search);
const STILL = params.get("img");            // test mode: a photo instead of the camera

// Tamil lines: needs checking by a Tamil reader.
const TX = {
  found: { en: "✓ Person found", kn: "✓ ವ್ಯಕ್ತಿ ಸಿಕ್ಕಿದ್ದಾರೆ", ta: "✓ நபர் தெரிகிறார்" },
  looking: { en: "Looking for a person…", kn: "ವ್ಯಕ್ತಿಯನ್ನು ಹುಡುಕುತ್ತಿದೆ…", ta: "நபரைத் தேடுகிறது…" },
  xrayOn: { en: "X-ray on", kn: "ಎಕ್ಸ್-ರೇ ಆನ್", ta: "எக்ஸ்-ரே ஆன்" },
  xrayOff: { en: "X-ray off", kn: "ಎಕ್ಸ್-ರೇ ಆಫ್", ta: "எக்ஸ்-ரே ஆஃப்" },
  all: { en: "All", kn: "ಎಲ್ಲಾ", ta: "அனைத்தும்" },
  closer: { en: "🔍 Look closer", kn: "🔍 ಹತ್ತಿರದಿಂದ ನೋಡಿ", ta: "🔍 அருகில் பாருங்கள்" },
  putBack: { en: "↩ Put back", kn: "↩ ಮತ್ತೆ ಇಡಿ", ta: "↩ திரும்ப வை" },
  hintFound: { en: "Tap an organ, or point at it with one finger and hold. You can also pick one in the bar below.",
    kn: "ಅಂಗವನ್ನು ಒತ್ತಿ, ಅಥವಾ ಒಂದು ಬೆರಳಿನಿಂದ ತೋರಿಸಿ ಹಿಡಿಯಿರಿ. ಕೆಳಗಿನ ಪಟ್ಟಿಯಿಂದಲೂ ಆರಿಸಬಹುದು.",
    ta: "உறுப்பைத் தட்டுங்கள், அல்லது ஒரு விரலால் காட்டி நிறுத்துங்கள். கீழே உள்ள பட்டியிலும் தேர்ந்தெடுக்கலாம்." },
  closeHint: { en: "Drag to turn, pinch to zoom. Hands: 🖐 open hand left/right = turn, ✌️ V sign up/down = zoom, ☝️ point at a number.",
    kn: "ಎಳೆದರೆ ತಿರುಗುತ್ತದೆ, ಎರಡು ಬೆರಳಿನಿಂದ ದೊಡ್ಡದು. ಕೈ: 🖐 ತೆರೆದ ಕೈ ಎಡ/ಬಲ = ತಿರುಗಿಸಿ, ✌️ V ಮೇಲೆ/ಕೆಳಗೆ = ದೊಡ್ಡ/ಚಿಕ್ಕ, ☝️ ಸಂಖ್ಯೆ ತೋರಿಸಿ.",
    ta: "இழுத்தால் சுழலும், இரு விரல்களால் பெரிதாக்கலாம். கை: 🖐 திறந்த கை இடம்/வலம் = சுழற்று, ✌️ V மேல்/கீழ் = பெரிது/சிறிது, ☝️ எண்ணைக் காட்டுங்கள்." },
  backSide: { en: "The kidneys sit at the back of the belly, so they look faint.", kn: "ಮೂತ್ರಪಿಂಡಗಳು ಹೊಟ್ಟೆಯ ಹಿಂಭಾಗದಲ್ಲಿವೆ, ಅದಕ್ಕೇ ಮಸುಕಾಗಿ ಕಾಣುತ್ತವೆ.", ta: "சிறுநீரகங்கள் வயிற்றின் பின்புறம் உள்ளன, அதனால் மங்கலாகத் தெரியும்." },
  pointing: { en: "☝️ Pointing", kn: "☝️ ತೋರಿಸುತ್ತಿದೆ", ta: "☝️ சுட்டுகிறது" },
  turning: { en: "🖐 Turning", kn: "🖐 ತಿರುಗುತ್ತಿದೆ", ta: "🖐 சுழல்கிறது" },
  zooming: { en: "✌️ Zoom", kn: "✌️ ದೊಡ್ಡ/ಚಿಕ್ಕ", ta: "✌️ பெரிதாக்கல்" },
  hint: { en: "Stand 1–2 metres from the camera. Keep your shoulders and waist in view. Good light helps.",
    kn: "ಕ್ಯಾಮೆರಾದಿಂದ 1–2 ಮೀಟರ್ ದೂರ ನಿಲ್ಲಿ. ಭುಜ ಮತ್ತು ಸೊಂಟ ಕಾಣುವಂತಿರಲಿ. ಚೆನ್ನಾಗಿ ಬೆಳಕು ಇದ್ದರೆ ಒಳ್ಳೆಯದು.",
    ta: "கேமராவிலிருந்து 1–2 மீட்டர் தூரத்தில் நில்லுங்கள். தோள்களும் இடுப்பும் தெரிய வேண்டும். நல்ல வெளிச்சம் உதவும்." },
};

$("t-back").textContent = "← " + t(U.back);
$("st-healthy").textContent = t(U.healthy);
$("st-sick").textContent = t(U.withCondition);
$("flip-btn").textContent = "⟲ " + t(U.flipCam);
$("t-title").textContent = t(U.bodyTitle);
$("t-note").textContent = t(U.bodyNote);
$("i-close").textContent = "✕ " + t(U.closeInfo);
$("ov-text").textContent = t(U.loadingBody);
$("ov-start").textContent = t(U.startCamera);
$("i-open").textContent = t(U.openLesson);

// ---------- where each organ sits ----------
// s: across the body, 0 = person's RIGHT shoulder .. 1 = person's LEFT shoulder
// t: down the body, 0 = shoulder line .. 1 = hip line
// w: organ width as a part of shoulder width.  ay: which height of the model sits on the spot (0 bottom .. 1 top)
const LAYOUT = [
  { key: "lungs", id: "lungs",  s: 0.50, t: 0.25, w: 0.72, ay: 0.40, z: 0, side: -1, ty: 0.6 },
  { key: "heart", id: "heart",  s: 0.57, t: 0.37, w: 0.28, ay: 0.45, z: 80, side: 1, ty: 0.5 },
  { key: "liver", id: "liver",  s: 0.38, t: 0.58, w: 0.56, ay: 0.55, z: 50, side: -1, ty: 0.5 },
  { key: "kidL",  id: "kidney", s: 0.65, t: 0.80, w: 0.15, ay: 0.5, z: -60, back: true, side: 1, ty: 0.5 },
  { key: "kidR",  id: "kidney", s: 0.35, t: 0.80, w: 0.15, ay: 0.5, z: -60, back: true, flip: true, twin: true },
  { key: "brain", id: "brain",  head: true, w: 0.92, z: 20, side: 0 },
];

// ---------- smoothing (One Euro filter: steady when still, quick when moving) ----------
class OneEuro {
  constructor(minCut = 1.0, beta = 0.006, dCut = 1.0) { this.minCut = minCut; this.beta = beta; this.dCut = dCut; this.x = null; this.dx = 0; this.t = 0; }
  static a(cut, dt) { const r = 2 * Math.PI * cut * dt; return r / (r + 1); }
  f(v, tms) {
    if (this.x === null) { this.x = v; this.t = tms; return v; }
    const dt = Math.max((tms - this.t) / 1000, 1e-3); this.t = tms;
    const d = (v - this.x) / dt;
    this.dx += OneEuro.a(this.dCut, dt) * (d - this.dx);
    const cut = this.minCut + this.beta * Math.abs(this.dx);
    this.x += OneEuro.a(cut, dt) * (v - this.x);
    return this.x;
  }
  reset() { this.x = null; this.dx = 0; }
}
const filters = {};
function filt(key, v, now, minCut, beta) { return (filters[key] ||= new OneEuro(minCut, beta)).f(v, now); }
function resetFilters() { Object.values(filters).forEach((f) => f.reset()); }

// ---------- three.js ----------
const stage = $("stage"), canvas = $("gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -5000, 5000);
camera.position.z = 1000;
scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 2.3));
const sun = new THREE.DirectionalLight(0xffffff, 1.9); sun.position.set(0.3, 0.6, 1); scene.add(sun);

// camera picture as the background, with the x-ray look on the body
const maskTex = new THREE.DataTexture(new Uint8Array([0]), 1, 1, THREE.RedFormat);
maskTex.magFilter = maskTex.minFilter = THREE.LinearFilter; maskTex.needsUpdate = true;
const bgMat = new THREE.ShaderMaterial({
  depthTest: false, depthWrite: false,
  uniforms: { tVid: { value: null }, tMask: { value: maskTex }, uFit: { value: new THREE.Vector4(1, 1, 0, 0) }, uTexel: { value: new THREE.Vector2(1 / 256, 1 / 256) }, uMirror: { value: 0 }, uX: { value: 0 }, uHas: { value: 0 } },
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `
    uniform sampler2D tVid, tMask; uniform vec4 uFit; uniform vec2 uTexel; uniform float uMirror, uX, uHas; varying vec2 vUv;
    float mk(vec2 p){ return texture2D(tMask, p).r; }
    void main(){
      float ix = uFit.z + vUv.x * uFit.x, iy = uFit.w + (1.0 - vUv.y) * uFit.y;   // image coords, top-down
      if (uMirror > 0.5) ix = 1.0 - ix;
      vec3 c = uHas > 0.5 ? texture2D(tVid, vec2(ix, 1.0 - iy)).rgb : vec3(0.02, 0.05, 0.07);
      vec2 q = vec2(ix, iy), d = uTexel * 2.2;
      float m = (mk(q) * 4.0 + mk(q + vec2(d.x, 0.0)) + mk(q - vec2(d.x, 0.0)) + mk(q + vec2(0.0, d.y)) + mk(q - vec2(0.0, d.y))
               + mk(q + d) + mk(q - d) + mk(q + vec2(d.x, -d.y)) + mk(q + vec2(-d.x, d.y))) / 12.0;
      m = smoothstep(0.3, 0.7, m);
      float lum = dot(c, vec3(0.299, 0.587, 0.114));
      vec3 xr = vec3(0.015, 0.05, 0.07) + vec3(0.28, 0.82, 0.88) * pow(lum, 1.5) * 0.6;
      xr += vec3(0.0, 0.04, 0.04) * step(0.5, fract(gl_FragCoord.y / 3.0));          // faint scan lines
      float edge = clamp(fwidth(m) * 5.0, 0.0, 1.0);
      vec3 outside = c * mix(1.0, 0.45, uX);
      vec3 col = mix(outside, xr, m * uX) + vec3(0.18, 0.83, 0.76) * edge * uX;
      gl_FragColor = vec4(col, 1.0);
    }`,
});
const bg = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
bg.renderOrder = -10; bg.frustumCulled = false; scene.add(bg);

// everything placed on the body lives in "image space"; root flips it when the picture is mirrored
const root = new THREE.Group(); scene.add(root);
let mirrored = false, W = 1, H = 1;
function applyMirror() { root.scale.x = mirrored ? -1 : 1; root.position.x = mirrored ? W : 0; bgMat.uniforms.uMirror.value = mirrored ? 1 : 0; }
function resize() {
  W = stage.clientWidth; H = stage.clientHeight;
  renderer.setSize(W, H, false);
  camera.left = 0; camera.right = W; camera.top = 0; camera.bottom = -H; camera.updateProjectionMatrix();
  bg.position.set(W / 2, -H / 2, -4000); bg.scale.set(W, H, 1);
  applyMirror();
}
window.addEventListener("resize", resize); resize();

// soft glow behind each organ, so it looks lit up inside the body
const glowTex = (() => {
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  const g = x.createRadialGradient(64, 64, 2, 64, 64, 64); g.addColorStop(0, "rgba(120,255,240,.55)"); g.addColorStop(.5, "rgba(47,211,195,.18)"); g.addColorStop(1, "rgba(47,211,195,0)");
  x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
})();

// ---------- organ models ----------
const draco = new DRACOLoader().setDecoderPath(new URL("draco/", import.meta.url).href);
const loader = new GLTFLoader().setDRACOLoader(draco);
const organs = [];
let state = "healthy";
const clock = new THREE.Clock();
function loadGLB(url) { return new Promise((res, rej) => loader.load(url, res, undefined, rej)); }
async function buildOrgan(L) {
  const c = C[L.id];
  const group = new THREE.Group();            // follows the body
  const pivot = new THREE.Group();            // user turn / zoom in "look closer"
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
  glow.renderOrder = -5;
  group.add(glow, pivot); root.add(group); group.visible = false;
  const o = { L, c, group, pivot, glow, models: {}, mixers: {}, cur: 1, sel: 0, base: null };
  await setModel(o, "healthy");
  organs.push(o);
}
async function setModel(o, st) {
  if (!o.models[st]) {
    const v = o.c.views.outside;
    const g = await loadGLB(st === "healthy" ? v.healthyModel : v.diseasedModel);
    const m = g.scene;
    const box = new THREE.Box3().setFromObject(m);
    const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    m.position.set(-center.x, -(box.min.y + size.y * (o.L.ay ?? 0.5)), -center.z);
    const holder = new THREE.Group(); holder.add(m);
    if (o.L.flip) holder.scale.x = -1;
    holder.userData = { size, inner: m };
    m.traverse((n) => { if (n.isMesh) { n.userData.organ = o; (Array.isArray(n.material) ? n.material : [n.material]).forEach((mt) => { mt.userData.baseOpacity = mt.opacity; mt.userData.baseT = mt.transparent; }); } });
    if (g.animations && g.animations.length) { const mx = new THREE.AnimationMixer(m); mx.clipAction(g.animations[0]).play(); o.mixers[st] = mx; }
    o.models[st] = holder;
  }
  for (const k in o.models) if (o.models[k].parent) o.pivot.remove(o.models[k]);
  o.pivot.add(o.models[st]); o.model = o.models[st]; o.state = st; o.cur = -1;
}
function setOpacity(o, a) {
  if (Math.abs(o.cur - a) < 0.01) return; o.cur = a;
  o.pivot.traverse((n) => { if (!n.isMesh) return; (Array.isArray(n.material) ? n.material : [n.material]).forEach((m) => {
    m.transparent = a < 0.99 || m.userData.baseT; m.opacity = (m.userData.baseOpacity ?? 1) * a; m.depthWrite = a >= 0.99; }); });
}

// ---------- camera / photo ----------
const video = $("cam"), still = $("still");
let facing = matchMedia("(pointer: coarse)").matches ? "environment" : "user";
let stream = null, source = null, vidTex = null;
async function startCamera() {
  if (stream) stream.getTracks().forEach((tr) => tr.stop());
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  video.srcObject = stream; await video.play();
  mirrored = facing === "user"; applyMirror();
  source = video; setTexture(new THREE.VideoTexture(video));
}
function setTexture(tex) {
  if (vidTex) vidTex.dispose();
  vidTex = tex; tex.colorSpace = THREE.NoColorSpace; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
  bgMat.uniforms.tVid.value = tex; bgMat.uniforms.uHas.value = 1;
}
function srcSize() { return source === video ? [video.videoWidth || 1, video.videoHeight || 1] : [still.naturalWidth || 1, still.naturalHeight || 1]; }
function updateFit() {
  const [sw, sh] = srcSize(); const k = Math.max(W / sw, H / sh);
  const fx = W / (sw * k), fy = H / (sh * k);
  bgMat.uniforms.uFit.value.set(fx, fy, (1 - fx) / 2, (1 - fy) / 2);
}
// normalized image point -> image-space pixels (object-fit: cover, not mirrored)
function toImg(p) {
  const [sw, sh] = srcSize(); const k = Math.max(W / sw, H / sh), dw = sw * k, dh = sh * k;
  return { x: (W - dw) / 2 + p.x * dw, y: (H - dh) / 2 + p.y * dh, vis: p.visibility ?? 1 };
}
const toScreenX = (x) => (mirrored ? W - x : x);

// ---------- tracking ----------
let pose = null, hands = null, handsOn = true, xrayOn = true;
const pcan = document.createElement("canvas"), pctx = pcan.getContext("2d");
async function initTracking() {
  if (typeof self.dbg !== "function") self.dbg = (...x) => console.debug(...x);   // the tracker's log helper
  const files = await FilesetResolver.forVisionTasks(new URL("vendor/mediapipe/wasm", import.meta.url).href);
  const mk = async (Cls, file, extra) => {
    const base = { baseOptions: { modelAssetPath: new URL("vendor/mediapipe/" + file, import.meta.url).href, delegate: "GPU" }, runningMode: "VIDEO", ...extra };
    try { return await Cls.createFromOptions(files, base); }
    catch (e) { base.baseOptions.delegate = "CPU"; return await Cls.createFromOptions(files, base); }
  };
  pose = await mk(PoseLandmarker, "pose_landmarker_lite.task", { numPoses: 1, minPoseDetectionConfidence: 0.5, minPosePresenceConfidence: 0.5, minTrackingConfidence: 0.5, outputSegmentationMasks: true });
  hands = await mk(HandLandmarker, "hand_landmarker.task", { numHands: 1, minHandDetectionConfidence: 0.4, minHandPresenceConfidence: 0.4, minTrackingConfidence: 0.4 });
}
// body outline -> texture for the x-ray look
let maskBuf = null;
function useMask(mask) {
  const w = mask.width, h = mask.height, f = mask.getAsFloat32Array();
  if (!maskBuf || maskBuf.length !== w * h) { maskBuf = new Uint8Array(w * h); maskTex.image = { data: maskBuf, width: w, height: h }; bgMat.uniforms.uTexel.value.set(1 / w, 1 / h); }
  for (let i = 0; i < f.length; i++) maskBuf[i] = f[i] * 255;
  maskTex.needsUpdate = true;
}

// ---------- place organs on the body ----------
let bodySeen = false, lastBody = 0;
const lerp2 = (a, b, k) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
function placeOrgans(lm, wl, now) {
  const P = (i) => { const p = toImg(lm[i]); return { x: filt(i + "x", p.x, now, 1.2, 0.004), y: filt(i + "y", p.y, now, 1.2, 0.004), vis: p.vis }; };
  const sL = P(11), sR = P(12);
  if (sL.vis < 0.5 || sR.vis < 0.5) return false;
  const Ws = Math.hypot(sL.x - sR.x, sL.y - sR.y);
  if (Ws < 30) return false;
  // body turn (yaw) from the 3D landmarks
  let yaw = 0;
  if (wl) { const a = wl[11], b = wl[12]; yaw = Math.max(-0.9, Math.min(0.9, Math.atan2(a.z - b.z, a.x - b.x))); }
  yaw = filt("yaw", yaw, now, 0.8, 0.3);
  const Wse = Ws / Math.max(Math.cos(yaw), 0.45);            // true shoulder width, even when turned
  const roll = Math.atan2(sL.y - sR.y, sL.x - sR.x);
  // shoulders must be roughly level (person standing or sitting upright)
  { let r = roll; if (r > Math.PI / 2) r -= Math.PI; if (r < -Math.PI / 2) r += Math.PI; if (Math.abs(r) > 0.7) return false; }
  // a line straight down the body, at right angles to the shoulders
  let down = { x: -(sL.y - sR.y) / Ws, y: (sL.x - sR.x) / Ws };
  if (down.y < 0) down = { x: -down.x, y: -down.y };
  // hips: measured if seen, otherwise estimated (laptop cameras often cut the waist off)
  const hLr = lm[23], hRr = lm[24];
  let hL = null, hR = null;
  const hipsOK = (hLr.visibility ?? 0) > 0.55 && (hRr.visibility ?? 0) > 0.55 && hLr.y < 1.02 && hRr.y < 1.02;
  if (hipsOK) {
    hL = P(23); hR = P(24);
    const Sm = lerp2(sL, sR, 0.5), Hm = lerp2(hL, hR, 0.5);
    const Ht = Math.hypot(Hm.x - Sm.x, Hm.y - Sm.y);
    if (Ht < 0.8 * Wse || Ht > 2.1 * Wse) hL = null;
  }
  if (!hL) {
    const hw = 0.82, est = 1.25 * Wse;    // hips are a bit narrower than shoulders
    const Sm = lerp2(sL, sR, 0.5);
    const Hm = { x: Sm.x + down.x * est, y: Sm.y + down.y * est };
    hL = { x: Hm.x + (sL.x - Sm.x) * hw, y: Hm.y + (sL.y - Sm.y) * hw };
    hR = { x: Hm.x + (sR.x - Sm.x) * hw, y: Hm.y + (sR.y - Sm.y) * hw };
  }
  // a point inside the torso (s across, t down)
  const at = (s, tt) => lerp2(lerp2(sR, sL, s), lerp2(hR, hL, s), tt);
  // head
  const eL = P(7), eR = P(8), nose = P(0);
  let head = null, headW = 0;
  if (eL.vis > 0.5 && eR.vis > 0.5) {
    headW = Math.hypot(eL.x - eR.x, eL.y - eR.y) / Math.max(Math.cos(yaw), 0.5);
    const mid = lerp2(eL, eR, 0.5);
    head = { x: mid.x - down.x * headW * 0.3, y: mid.y - down.y * headW * 0.3 };
  } else if (nose.vis > 0.5) { headW = 0.4 * Wse; head = { x: nose.x - down.x * headW * 0.55, y: nose.y - down.y * headW * 0.55 }; }
  if (head && (headW < 0.25 * Wse || headW > 0.8 * Wse)) headW = 0.4 * Wse;

  for (const o of organs) {
    const L = o.L; let p, widthPx;
    if (L.head) { if (!head) { o.group.visible = false; o.base = null; continue; } p = head; widthPx = L.w * headW; }
    else { p = at(L.s, L.t); widthPx = L.w * Wse; }
    const size = o.model.userData.size;
    o.base = { x: p.x, y: p.y, k: widthPx / Math.max(size.x, 1e-6), roll, yaw };
    o.group.visible = true;
  }
  return true;
}

// ---------- choosing an organ ----------
let selKey = null, closer = false, activePart = -1;
const userRot = new THREE.Euler(); let userScale = 1;
const isSel = (o) => selKey && o.L.id === selKey;
const primary = () => organs.find((o) => o.L.id === selKey && !o.L.twin);
const labels = $("labels");
const hotspots = () => { const o = primary(); if (!o) return []; const v = o.c.views.outside; return state === "healthy" ? v.healthyHotspots : v.diseasedHotspots; };
const organName = (id) => (id === "kidney" ? t(U.kidneys) : t(C[id].organ));
const organText = (id) => t(state === "healthy" ? C[id].organAbout : C[id].about) + (id === "kidney" ? " " + t(TX.backSide) : "");

function select(id) {
  selKey = id; closer = false; activePart = -1; userRot.set(0, 0, 0); userScale = 1;
  renderPick(); buildLabels();
  if (!id) { $("info").hidden = true; $("hint").hidden = false; setHint(); return; }
  const c = C[id];
  $("i-organ").textContent = organName(id);
  $("i-cond").textContent = state === "healthy" ? t(U.healthy) : t(c.name);
  $("i-parts").className = "parts" + (state === "healthy" ? "" : " sick");
  $("i-parts").innerHTML = hotspots().map((h, i) => `<button type="button" class="dwell" data-i="${i}"><span class="n">${i + 1}</span></button>`).join("");
  $("i-parts").querySelectorAll("button").forEach((b, i) => { b.append(t(hotspots()[i].title)); b.addEventListener("click", () => showPart(i)); });
  $("part").hidden = true;
  $("i-open").href = "index.html#" + c.id;
  renderCloser(); setHint();
  $("info").hidden = false; $("hint").hidden = true;
}
function renderCloser() { $("i-closer").textContent = closer ? t(TX.putBack) : t(TX.closer); }
$("i-closer").addEventListener("click", () => { closer = !closer; userRot.set(0, 0, 0); userScale = 1; renderCloser(); setHint(); });
$("i-close").addEventListener("click", () => select(null));
function showPart(i) {
  const h = hotspots()[i]; if (!h) return;
  activePart = i;
  $("part").hidden = false;
  $("part").innerHTML = "<b></b><br><span></span>";
  $("part").querySelector("b").textContent = (i + 1) + ". " + t(h.title);
  $("part").querySelector("span").textContent = t(h.text);
  labels.querySelectorAll(".hs").forEach((el) => el.classList.toggle("on", el._i === i));
  $("i-parts").querySelectorAll("button").forEach((b, k) => b.classList.toggle("on", k === i));
}

// organ bar at the bottom
const PICK = ["lungs", "heart", "liver", "kidney", "brain"];
function renderPick() {
  $("pick").innerHTML = `<button type="button" class="all dwell${selKey ? "" : " on"}" data-id="">${t(TX.all)}</button>` +
    PICK.map((id) => `<button type="button" class="dwell${selKey === id ? " on" : ""}" data-id="${id}"><img src="images/thumb-${id}.png" alt="">${organName(id)}</button>`).join("");
  $("pick").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => select(b.dataset.id || null)));
}

// labels: organ names when nothing is chosen, numbered parts on the chosen organ
function buildLabels() {
  labels.querySelectorAll(".hs, .tag, .lead").forEach((e) => e.remove());
  if (selKey) {
    hotspots().forEach((h, i) => {
      const el = document.createElement("button");
      el.type = "button"; el.className = "hs dwell" + (state === "healthy" ? "" : " sick"); el.textContent = i + 1; el._i = i;
      el._p = new THREE.Vector3(...h.position.split(" ").map(parseFloat));
      el._n = new THREE.Vector3(...(h.normal || "0 0 1").split(" ").map(parseFloat));
      el.setAttribute("aria-label", t(h.title));
      el.addEventListener("click", (e) => { e.stopPropagation(); showPart(i); });
      labels.appendChild(el);
    });
  } else {
    organs.forEach((o) => {
      if (o.L.twin) return;
      const el = document.createElement("button");
      el.type = "button"; el.className = "tag dwell"; el.textContent = organName(o.L.id); el._o = o;
      const line = document.createElement("div"); line.className = "lead"; el._line = line; labels.appendChild(line);
      el.addEventListener("click", (e) => { e.stopPropagation(); select(o.L.id); });
      labels.appendChild(el);
    });
  }
}
const tv = new THREE.Vector3(), tn = new THREE.Vector3();
function updateLabels() {
  const p = primary();
  labels.querySelectorAll(".hs").forEach((el) => {
    if (!p || !p.group.visible) { el.style.display = "none"; return; }
    const inner = p.model.userData.inner;
    tv.copy(el._p); inner.localToWorld(tv);
    tn.copy(el._n).transformDirection(inner.matrixWorld);
    el._x = tv.x; el._y = -tv.y;
    el.style.display = ""; el.style.transform = `translate(${el._x}px, ${el._y}px)`;
    el.style.opacity = tn.z > -0.15 ? 1 : 0.3;
  });
  // organ names sit beside the body, with a thin line to the organ
  let minX = Infinity, maxX = -Infinity;
  const boxes = new Map();
  organs.forEach((o) => { if (!o.group.visible) return; const bx = new THREE.Box3().setFromObject(o.model); boxes.set(o, bx); if (!o.L.head) { minX = Math.min(minX, bx.min.x); maxX = Math.max(maxX, bx.max.x); } });
  labels.querySelectorAll(".tag").forEach((el) => {
    const o = el._o, bx = boxes.get(o), line = el._line;
    if (!bx) { el.style.display = line.style.display = "none"; return; }
    const cx = (bx.min.x + bx.max.x) / 2, cy = -(bx.min.y + (bx.max.y - bx.min.y) * (o.L.ty ?? 0.5));
    // screen side: flip with the mirror so names stay on the same side of the screen
    const side = (o.L.side || 0) * (mirrored ? -1 : 1);
    el.style.display = "";
    if (!side) {
      el.style.transform = `translate(calc(${cx}px - 50%), calc(${-bx.max.y}px - 130%))`; line.style.display = "none"; return;
    }
    const tx = side < 0 ? minX - 14 : maxX + 14;
    el.style.transform = side < 0 ? `translate(calc(${tx}px - 100%), calc(${cy}px - 50%))` : `translate(${tx}px, calc(${cy}px - 50%))`;
    const x0 = Math.min(cx, tx), len = Math.abs(tx - cx);
    line.style.display = ""; line.style.transform = `translate(${x0}px, ${cy}px)`; line.style.width = len + "px";
  });
}

// ---------- picking things on screen ----------
const ray = new THREE.Raycaster();
function organAt(x, y) {
  ray.setFromCamera(new THREE.Vector2(x / W * 2 - 1, -(y / H) * 2 + 1), camera);
  const meshes = []; organs.forEach((o) => o.group.visible && o.pivot.traverse((n) => n.isMesh && meshes.push(n)));
  const hit = ray.intersectObjects(meshes, false)[0];
  return hit ? hit.object.userData.organ : null;
}
function dwellTarget(x, y) {
  let best = null, bd = 40;
  labels.querySelectorAll(".hs").forEach((el) => { if (el.style.display === "none") return; const d = Math.hypot(el._x - x, el._y - y); if (d < bd) { bd = d; best = el; } });
  if (best) return best;
  for (const el of document.querySelectorAll(".dwell")) {
    if (el.offsetParent === null || el.classList.contains("hs")) continue;
    const r = el.getBoundingClientRect();
    if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6) return el;
  }
  if (!closer) { const o = organAt(x, y); if (o && !isSel(o)) return o; }
  return null;
}

// ---------- touch / mouse ----------
const ptrs = new Map(); let pinch0 = null, moved = false;
stage.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button, a")) return;
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false;
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), s: userScale }; }
});
stage.addEventListener("pointermove", (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y;
  if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
  p.x = e.clientX; p.y = e.clientY;
  if (!closer) return;
  if (ptrs.size === 1) { userRot.y += dx * 0.012; userRot.x = Math.max(-1.2, Math.min(1.2, userRot.x + dy * 0.008)); }
  else if (ptrs.size === 2 && pinch0) { const [a, b] = [...ptrs.values()]; userScale = Math.max(0.5, Math.min(3, pinch0.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch0.d)); }
});
const up = (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const tap = ptrs.size === 1 && !moved;
  ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = null;
  if (!tap || closer) return;
  const o = organAt(e.clientX, e.clientY);
  if (o) select(o.L.id); else if (selKey) select(null);
};
stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);

// ---------- hand shapes (same as Hand AR) ----------
const cursor = $("cursor"), modeEl = $("mode");
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
let pinchOn = false, hpose = "none", rawPose = "none", rawCount = 0, lastRes = null, act = null, dwell = { el: null, t0: 0 }, lastHand = 0;
function handShape(P) {
  const wr = P[0];
  const ext = [[8, 6], [12, 10], [16, 14], [20, 18]].map(([tip, pip]) => dist(wr, P[tip]) > dist(wr, P[pip]) * 1.15);
  const size = dist(wr, P[9]) || 1;
  const pd = dist(P[4], P[8]) / size;
  pinchOn = pinchOn ? pd < 0.45 : pd < 0.28;
  if (pinchOn && !ext[1]) return "pinch";
  pinchOn = pinchOn && !ext[1];
  const [i, m, r, l] = ext;
  if (i && !m && !r && !l) return "point";
  if (i && m && !r && !l) return "vee";
  if (i && m && r && l) return "open";
  return "other";
}
function setMode(txt) { modeEl.style.display = txt ? "block" : "none"; if (txt) modeEl.textContent = txt; }
function clearHot() { document.querySelectorAll(".hot").forEach((x) => x.classList.remove("hot")); }
function handStep(res, now) {
  const hs = (res && res.landmarks) || [];
  const fresh = res !== lastRes; lastRes = res;
  if (hs.length) lastHand = now;
  if (!hs.length) { if (now - lastHand > 600) { cursor.style.display = "none"; act = null; hpose = "none"; setMode(""); dwell.el = null; clearHot(); } return; }
  const P = hs[0].map((p) => { const q = toImg(p); return { x: toScreenX(q.x), y: q.y }; });
  if (fresh) { const s = handShape(P); if (s === rawPose) rawCount++; else { rawPose = s; rawCount = 1; } if (rawCount >= 2) hpose = s; }
  const tip = { x: filt("htx", P[8].x, now, 1.5, 0.01), y: filt("hty", P[8].y, now, 1.5, 0.01) };
  const palm = { x: filt("hpx", (P[0].x + P[9].x) / 2, now, 1.5, 0.01), y: filt("hpy", (P[0].y + P[9].y) / 2, now, 1.5, 0.01) };
  const c = hpose === "open" || hpose === "vee" ? palm : tip;
  cursor.style.display = "block"; cursor.style.transform = `translate(${c.x}px, ${c.y}px)`;
  if (act && act.kind !== hpose) act = null;
  if (hpose !== "point") { dwell.el = null; cursor.style.background = ""; clearHot(); }
  if (hpose === "open" && closer) {
    if (!act) act = { kind: "open", x: palm.x, rot: userRot.y };
    userRot.y = act.rot + (palm.x - act.x) * 0.013; setMode(t(TX.turning)); return;
  }
  if (hpose === "vee" && closer) {
    if (!act) act = { kind: "vee", y: palm.y, s: userScale };
    userScale = Math.max(0.5, Math.min(3, act.s * Math.exp(-(palm.y - act.y) * 0.006))); setMode(t(TX.zooming) + " " + Math.round(userScale * 100) + "%"); return;
  }
  if (hpose !== "point") { setMode(""); return; }
  setMode(t(TX.pointing));
  const target = dwellTarget(tip.x, tip.y);
  if (target !== dwell.el) dwell = { el: target, t0: now };
  const prog = target ? Math.min(1, (now - dwell.t0) / 700) : 0;
  cursor.style.background = prog > 0 ? `conic-gradient(rgba(255,196,87,.9) ${prog * 360}deg, rgba(0,0,0,.25) 0)` : "";
  clearHot(); if (target && target.classList) target.classList.add("hot");
  if (target && prog >= 1) { dwell.t0 = now + 1e9; if (target.click) target.click(); else select(target.L.id); }
}

// ---------- top buttons ----------
async function setState(st) {
  state = st;
  $("st-healthy").classList.toggle("on", st === "healthy");
  $("st-sick").classList.toggle("on", st !== "healthy"); $("st-sick").classList.toggle("sick", st !== "healthy");
  await Promise.all(organs.map((o) => setModel(o, st)));
  const k = selKey, cl = closer; select(k); if (k && cl) { closer = true; renderCloser(); setHint(); }
}
$("st-healthy").addEventListener("click", () => setState("healthy"));
$("st-sick").addEventListener("click", () => setState("diseased"));
function renderButtons() {
  const hb = $("hands-btn"); hb.classList.toggle("on", handsOn); hb.setAttribute("aria-pressed", handsOn); hb.textContent = "✋ " + t(handsOn ? U.handsOn : U.handsOff);
  const xb = $("xray-btn"); xb.classList.toggle("on", xrayOn); xb.setAttribute("aria-pressed", xrayOn); xb.textContent = "☢ " + t(xrayOn ? TX.xrayOn : TX.xrayOff);
}
$("hands-btn").addEventListener("click", () => { handsOn = !handsOn; renderButtons(); });
$("xray-btn").addEventListener("click", () => { xrayOn = !xrayOn; renderButtons(); });
renderButtons();
$("flip-btn").addEventListener("click", async () => { facing = facing === "user" ? "environment" : "user"; resetFilters(); try { await startCamera(); } catch (e) { showError(); } });
if (STILL) $("flip-btn").hidden = true;
function setHint() {
  $("hint-text").textContent = bodySeen ? t(TX.hintFound) : t(TX.hint);
  $("status").textContent = bodySeen ? t(TX.found) : t(TX.looking);
  $("status").classList.toggle("ok", bodySeen);
  if (selKey) $("i-text").textContent = closer ? t(TX.closeHint) : organText(selKey);
}
function showError() { $("overlay").hidden = false; $("ov-spin").hidden = true; $("ov-text").textContent = t(U.camError); $("ov-start").hidden = false; }
$("ov-start").addEventListener("click", async () => { $("ov-start").hidden = true; $("ov-spin").hidden = false; $("ov-text").textContent = t(U.loadingBody); try { await startCamera(); $("overlay").hidden = true; } catch (e) { showError(); } });

// ---------- main loop ----------
let lastTs = -1, frame = 0, handRes = null, xr = 0;
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.1);
  organs.forEach((o) => { const m = o.mixers[o.state]; if (m) m.update(dt); });
  const now = performance.now();
  const ready = source && (source === video ? video.readyState >= 2 && video.videoWidth : still.complete && still.naturalWidth);
  if (ready && pose) {
    updateFit();
    const [sw, sh] = srcSize(); const pw = 480, ph = Math.round(480 * sh / sw);
    if (pcan.width !== pw || pcan.height !== ph) { pcan.width = pw; pcan.height = ph; }
    pctx.drawImage(source, 0, 0, pw, ph);        // a small copy is faster to track and to outline
    const ts = Math.max(now, lastTs + 1); lastTs = ts;
    let res = null;
    try { res = pose.detectForVideo(pcan, ts); } catch (e) { /* skip frame */ }
    const lm = res && res.landmarks && res.landmarks[0];
    const ok = lm ? placeOrgans(lm, res.worldLandmarks && res.worldLandmarks[0], now) : false;
    if (res && res.segmentationMasks && res.segmentationMasks.length) { if (ok) useMask(res.segmentationMasks[0]); res.segmentationMasks.forEach((m) => m.close && m.close()); }
    const was = bodySeen;
    if (ok) { bodySeen = true; lastBody = now; }
    if (!ok && now - lastBody > 700) { organs.forEach((o) => (o.group.visible = false)); bodySeen = false; resetFilters(); }
    if (was !== bodySeen) setHint();
    if (handsOn && hands && (frame++ % 2 === 0)) { try { handRes = hands.detectForVideo(source, ts + 0.5); } catch (e) { handRes = null; } lastTs = ts + 0.5; }
    handStep(handsOn ? handRes : null, now);
  }
  // x-ray fades in when a body is found
  xr += (((xrayOn && bodySeen) ? 1 : 0) - xr) * Math.min(1, dt * 4);
  bgMat.uniforms.uX.value = xr;
  // put each organ in place (or in the "look closer" spot, in the free area above the panels)
  const topY = 60, botY = Math.max(topY + 120, document.querySelector(".hud.bottom").getBoundingClientRect().top - 10);
  const freeH = botY - topY, fy = topY + freeH / 2;
  for (const o of organs) {
    if (!o.base) continue;
    const s = isSel(o);
    o.sel += ((s && closer ? 1 : 0) - o.sel) * Math.min(1, dt * 7);
    const f = o.sel;
    const size = o.model.userData.size;
    const kF = Math.min(W * 0.6, freeH * 0.8) / Math.max(size.x, size.y, 1e-6) * (o.L.id === "kidney" ? 0.55 : 1);
    const k = (o.base.k * (1 - f) + kF * f) * (s && closer ? userScale : 1);
    const twinShift = o.L.id === "kidney" ? (o.L.twin ? -1 : 1) * size.x * kF * 0.75 * f : 0;
    const fx = W / 2 + twinShift;
    o.group.position.set(o.base.x * (1 - f) + fx * f, -(o.base.y * (1 - f) + fy * f), o.L.z + f * 900);
    o.group.rotation.set(0, o.base.yaw * (1 - f), -o.base.roll * (1 - f));
    o.pivot.scale.setScalar(k);
    o.pivot.rotation.set(s && closer ? userRot.x * f : 0, s && closer ? userRot.y * (mirrored ? -1 : 1) * f : 0, 0);
    // chosen organ bright, others faint; kidneys sit at the back
    setOpacity(o, selKey ? (s ? 1 : 0.14) : (o.L.back ? 0.62 : 0.94));
    o.glow.scale.set(size.x * o.base.k * 1.7, size.y * o.base.k * 1.5, 1);
    o.glow.material.opacity = (selKey ? (s ? 0.9 : 0.12) : 0.55) * xr * (1 - f);
  }
  updateLabels();
  renderer.render(scene, camera);
}

// ---------- start ----------
(async () => {
  try {
    renderPick(); setHint();
    await Promise.all(LAYOUT.map(buildOrgan));
    buildLabels();
    await initTracking();
    if (STILL) {
      still.src = STILL; await still.decode(); source = still; mirrored = params.get("mirror") === "1"; applyMirror();
      const tex = new THREE.Texture(still); tex.needsUpdate = true; setTexture(tex);
    } else {
      try { await startCamera(); } catch (e) { showError(); loop(); return; }
    }
    $("overlay").hidden = true;
  } catch (e) {
    console.error(e); $("ov-spin").hidden = true; $("ov-text").textContent = "Error: " + e.message;
  }
  loop();
})();
window.__body = { organs, select, setState, get closer() { return closer; }, set closer(v) { closer = v; renderCloser(); setHint(); } };
