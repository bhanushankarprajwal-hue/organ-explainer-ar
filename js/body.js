// =============================================================
// Body AR mirror: finds a person with the camera (MediaPipe Pose),
// places 3D organs on their body (three.js), and lets you interact
// by touch or by hand gestures (MediaPipe Hands).
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { FilesetResolver, PoseLandmarker, HandLandmarker } from "./vendor/mediapipe/vision_bundle.mjs";

// ---------- text helpers ----------
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && o[lang].trim()) ? o[lang] : (o ? o.en : "");
const $ = (id) => document.getElementById(id);
const U = UI_TEXT;
const C = Object.fromEntries(CONDITIONS.map((c) => [c.id, c]));
const params = new URLSearchParams(location.search);
const STILL = params.get("img");            // test mode: run on a photo instead of the camera

$("t-back").textContent = "← " + t(U.back);
$("st-healthy").textContent = t(U.healthy);
$("st-sick").textContent = t(U.withCondition);
$("flip-btn").textContent = "⟲ " + t(U.flipCam);
$("t-title").textContent = t(U.bodyTitle);
$("t-note").textContent = t(U.bodyNote);
$("hint-text").textContent = t(U.bodyHint);
$("i-close").textContent = "✕ " + t(U.closeInfo);
$("ov-text").textContent = t(U.loadingBody);
$("ov-start").textContent = t(U.startCamera);

// ---------- where each organ sits on the body ----------
// u: sideways, + = toward the person's LEFT, in shoulder widths
// v: downwards from the shoulder line, as a part of shoulder-to-hip length
// w: organ width, in shoulder widths. ay: which height of the model sits on the anchor (0 bottom .. 1 top)
const LAYOUT = [
  { id: "lungs",  u: 0.00,  v: 0.30, w: 0.80, ay: 0.30, z: 0 },
  { id: "heart",  u: 0.09,  v: 0.40, w: 0.30, ay: 0.5,  z: 40 },
  { id: "liver",  u: -0.15, v: 0.63, w: 0.62, ay: 0.5,  z: 25 },
  { id: "kidney", u: 0.21,  v: 0.82, w: 0.17, ay: 0.5,  z: -20 },
  { id: "kidney", u: -0.21, v: 0.84, w: 0.17, ay: 0.5,  z: -20, flip: true, twin: true },
  { id: "brain",  head: true, w: 1.0, ay: 0.5, z: 10 },
];

// ---------- three.js setup ----------
const stage = $("stage"), canvas = $("gl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -5000, 5000);
camera.position.z = 1000;
scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.position.set(0.3, 0.6, 1); scene.add(sun);
let W = 1, H = 1;
function resize() {
  W = stage.clientWidth; H = stage.clientHeight;
  renderer.setSize(W, H, false);
  camera.left = 0; camera.right = W; camera.top = 0; camera.bottom = -H; camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize); resize();

// "x-ray window" shapes behind the organs
function xrayShape(color, opacity) {
  const g = new THREE.Group();
  const fill = new THREE.Mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshBasicMaterial({ color: 0x041018, transparent: true, opacity, depthWrite: false }));
  const rim = new THREE.Mesh(new THREE.RingGeometry(0.985, 1.0, 96), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false }));
  g.add(fill, rim); g.renderOrder = -1; g.position.z = -400; g.visible = false; scene.add(g); return g;
}
const torsoWin = xrayShape(0x2fd3c3, 0.5), headWin = xrayShape(0x2fd3c3, 0.45);

// ---------- load organ models ----------
const draco = new DRACOLoader().setDecoderPath(new URL("vendor/../draco/", import.meta.url).href);
const loader = new GLTFLoader().setDRACOLoader(draco);
const organs = [];           // one entry per LAYOUT item
let state = "healthy";       // or "diseased"
const clock = new THREE.Clock();

function loadGLB(url) { return new Promise((res, rej) => loader.load(url, res, undefined, rej)); }
async function buildOrgan(L) {
  const c = C[L.id];
  const group = new THREE.Group();            // follows the body
  const pivot = new THREE.Group();            // user rotation / zoom
  group.add(pivot); scene.add(group); group.visible = false;
  const o = { L, c, group, pivot, models: {}, mixers: {}, box: null, userRot: new THREE.Euler(), userScale: 1, sel: 0, mats: [] };
  await setModel(o, "healthy");
  organs.push(o);
  return o;
}
async function setModel(o, st) {
  const v = o.c.views.outside;
  if (!o.models[st]) {
    const g = await loadGLB(st === "healthy" ? v.healthyModel : v.diseasedModel);
    const m = g.scene;
    const box = new THREE.Box3().setFromObject(m);
    const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    const holder = new THREE.Group();
    m.position.set(-center.x, -(box.min.y + size.y * o.L.ay), -center.z);
    holder.add(m);
    holder.userData = { size };
    m.traverse((n) => { if (n.isMesh) { n.userData.organ = o; const mats = Array.isArray(n.material) ? n.material : [n.material]; mats.forEach((mt) => { mt.userData.baseOpacity = mt.opacity; mt.userData.baseTransparent = mt.transparent; }); } });
    if (g.animations && g.animations.length) { const mx = new THREE.AnimationMixer(m); mx.clipAction(g.animations[0]).play(); o.mixers[st] = mx; }
    o.models[st] = holder;
  }
  for (const k in o.models) if (o.models[k].parent) o.pivot.remove(o.models[k]);
  o.pivot.add(o.models[st]);
  o.model = o.models[st];
  o.state = st;
}

// ---------- camera / photo source ----------
const video = $("cam"), still = $("still");
let facing = matchMedia("(pointer: coarse)").matches ? "environment" : "user";
let mirrored = false, stream = null, source = null;
async function startCamera() {
  if (stream) stream.getTracks().forEach((tr) => tr.stop());
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  video.srcObject = stream;
  await video.play();
  mirrored = facing === "user";
  video.classList.toggle("mirror", mirrored);
  source = video;
}
function srcSize() { return source === video ? [video.videoWidth, video.videoHeight] : [still.naturalWidth, still.naturalHeight]; }
// normalized image point -> screen pixels (object-fit: cover + mirror)
function toScreen(p) {
  const [sw, sh] = srcSize();
  const k = Math.max(W / sw, H / sh), dw = sw * k, dh = sh * k;
  let x = (W - dw) / 2 + p.x * dw; const y = (H - dh) / 2 + p.y * dh;
  if (mirrored) x = W - x;
  return { x, y, vis: p.visibility ?? 1, z: p.z };
}

// ---------- tracking ----------
let pose = null, hands = null, handsOn = true;
async function initTracking() {
  const files = await FilesetResolver.forVisionTasks(new URL("vendor/mediapipe/wasm", import.meta.url).href);
  const mk = async (Cls, file, extra) => {
    const base = { baseOptions: { modelAssetPath: new URL("vendor/mediapipe/" + file, import.meta.url).href, delegate: "GPU" }, runningMode: "VIDEO", ...extra };
    try { return await Cls.createFromOptions(files, base); }
    catch (e) { base.baseOptions.delegate = "CPU"; return await Cls.createFromOptions(files, base); }
  };
  pose = await mk(PoseLandmarker, "pose_landmarker_lite.task", { numPoses: 1, minPoseDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
  hands = await mk(HandLandmarker, "hand_landmarker.task", { numHands: 2, minHandDetectionConfidence: 0.5 });
}

// smoothing of body points
const smooth = {};
function sm(key, p, a = 0.45) {
  const s = smooth[key];
  if (!s || Math.hypot(s.x - p.x, s.y - p.y) > 200) { smooth[key] = { ...p }; return smooth[key]; }
  s.x += (p.x - s.x) * a; s.y += (p.y - s.y) * a; s.vis = p.vis; return s;
}
let bodySeen = false, lastBodyTime = 0;

function placeOrgans(lm) {
  const P = (i) => sm(i, toScreen(lm[i]));
  const sL = P(11), sR = P(12);
  if (sL.vis < 0.5 || sR.vis < 0.5) return false;
  const Wsh = Math.hypot(sL.x - sR.x, sL.y - sR.y);
  if (Wsh < 30) return false;
  const S = { x: (sL.x + sR.x) / 2, y: (sL.y + sR.y) / 2 };
  const dirL = { x: (sL.x - sR.x) / Wsh, y: (sL.y - sR.y) / Wsh };          // toward person's left, on screen
  let down = { x: -dirL.y, y: dirL.x };                                      // perpendicular
  const hL = P(23), hR = P(24);
  let Ht;
  if (hL.vis > 0.5 && hR.vis > 0.5) {
    const Hm = { x: (hL.x + hR.x) / 2, y: (hL.y + hR.y) / 2 };
    Ht = Math.hypot(Hm.x - S.x, Hm.y - S.y);
    down = { x: (Hm.x - S.x) / Ht, y: (Hm.y - S.y) / Ht };
  } else Ht = 1.25 * Wsh;
  if (down.y < 0) down = { x: -down.x, y: -down.y };
  // screen "right" for model orientation
  const right = mirrored ? { x: -dirL.x, y: -dirL.y } : dirL;
  const roll = Math.atan2(right.y, right.x);
  // head
  const eL = P(7), eR = P(8), nose = P(0);
  let head = null, headW = 0;
  if (eL.vis > 0.5 && eR.vis > 0.5) { headW = Math.hypot(eL.x - eR.x, eL.y - eR.y); head = { x: (eL.x + eR.x) / 2 - down.x * headW * 0.12, y: (eL.y + eR.y) / 2 - down.y * headW * 0.12 }; }
  else if (nose.vis > 0.5) { headW = 0.42 * Wsh; head = { x: nose.x - down.x * headW * 0.35, y: nose.y - down.y * headW * 0.35 }; }
  if (headW < 0.25 * Wsh) headW = 0.42 * Wsh;

  for (const o of organs) {
    const L = o.L;
    let ax, ay, widthPx;
    if (L.head) { if (!head) { o.group.visible = false; continue; } ax = head.x; ay = head.y; widthPx = L.w * headW; }
    else { ax = S.x + dirL.x * L.u * Wsh + down.x * L.v * Ht; ay = S.y + dirL.y * L.u * Wsh + down.y * L.v * Ht; widthPx = L.w * Wsh; }
    const size = o.model.userData.size;
    const k = widthPx / Math.max(size.x, 1e-6);
    o.base = { x: ax, y: ay, k, roll };
    o.group.visible = true;
  }
  // x-ray windows
  const tc = { x: S.x + down.x * 0.52 * Ht, y: S.y + down.y * 0.52 * Ht };
  torsoWin.position.set(tc.x, -tc.y, -400); torsoWin.scale.set(Wsh * 0.62, Ht * 0.62, 1); torsoWin.rotation.z = -roll; torsoWin.visible = true;
  if (head) { headWin.position.set(head.x, -head.y, -400); headWin.scale.set(headW * 0.62, headW * 0.7, 1); headWin.rotation.z = -roll; headWin.visible = true; }
  else headWin.visible = false;
  return true;
}

// ---------- selection, labels and info ----------
let selected = null, activePart = null;
const labels = $("labels");
function setOpacity(o, a) {
  o.pivot.traverse((n) => { if (!n.isMesh) return; (Array.isArray(n.material) ? n.material : [n.material]).forEach((m) => {
    const base = m.userData.baseOpacity ?? 1;
    m.transparent = a < 1 || m.userData.baseTransparent; m.opacity = base * a; m.depthWrite = a >= 1; }); });
}
function organHotspots(o) { const v = o.c.views.outside; return o.state === "healthy" ? v.healthyHotspots : v.diseasedHotspots; }
function select(o) {
  if (o && o.L.twin) o = organs.find((x) => x.L.id === o.L.id && !x.L.twin);
  selected = o; activePart = null;
  organs.forEach((x) => setOpacity(x, !o || x === o || (x.L.id === o.L.id) ? 1 : 0.28));
  if (!o) { $("info").hidden = true; $("hint").hidden = false; buildLabels(); return; }
  o.userRot.set(0, 0, 0); o.userScale = 1;
  $("i-organ").textContent = t(o.c.organ);
  $("i-cond").textContent = t(o.c.name);
  $("i-text").textContent = t(state === "healthy" ? o.c.organAbout : o.c.about);
  $("part").hidden = true;
  $("i-story").textContent = "▶ " + t(U.startStory); $("i-story").href = "index.html#" + o.c.id + "-story";
  $("i-open").textContent = t(U.openLesson); $("i-open").href = "index.html#" + o.c.id;
  $("info").hidden = false; $("hint").hidden = true;
  buildLabels();
}
function showPart(h, i) {
  activePart = h;
  $("part").hidden = false;
  $("part").innerHTML = "<b></b><br><span></span>";
  $("part").querySelector("b").textContent = (i + 1) + ". " + t(h.title);
  $("part").querySelector("span").textContent = t(h.text);
  labels.querySelectorAll(".hs").forEach((el) => el.classList.toggle("hot", el.dataset.i == i));
}
function buildLabels() {
  labels.querySelectorAll(".hs, .tag").forEach((e) => e.remove());
  if (selected) {
    organHotspots(selected).forEach((h, i) => {
      const el = document.createElement("button");
      el.className = "hs" + (state === "healthy" ? "" : " sick"); el.textContent = i + 1; el.dataset.i = i;
      el.setAttribute("aria-label", t(h.title));
      el.addEventListener("click", (e) => { e.stopPropagation(); showPart(h, i); });
      el._h = h; labels.appendChild(el);
    });
  } else {
    organs.forEach((o) => {
      if (o.L.twin) return;
      const el = document.createElement("button");
      el.className = "tag"; el.textContent = o.L.id === "kidney" ? t(U.kidneys) : t(o.c.organ);
      el.addEventListener("click", (e) => { e.stopPropagation(); select(o); });
      el._o = o; labels.appendChild(el);
    });
  }
}
$("i-close").addEventListener("click", () => select(null));

const tmpV = new THREE.Vector3(), tmpN = new THREE.Vector3(), tmpQ = new THREE.Quaternion();
function project(v) { tmpV.copy(v).project(camera); return { x: (tmpV.x + 1) / 2 * W, y: (1 - tmpV.y) / 2 * H }; }
function updateLabels() {
  labels.querySelectorAll(".hs").forEach((el) => {
    if (!selected || !selected.group.visible) { el.style.display = "none"; return; }
    const h = el._h; const [x, y, z] = h.position.split(" ").map(parseFloat);
    const inner = selected.model.children[0];
    tmpV.set(x, y, z); inner.localToWorld(tmpV);
    const p = project(tmpV);
    let facingCam = true;
    if (h.normal) { const [nx, ny, nz] = h.normal.split(" ").map(parseFloat); inner.getWorldQuaternion(tmpQ); tmpN.set(nx, ny, nz).applyQuaternion(tmpQ); facingCam = tmpN.z > -0.15; }
    el.style.display = ""; el.style.left = p.x + "px"; el.style.top = p.y + "px"; el.style.opacity = facingCam ? 1 : 0.3;
  });
  labels.querySelectorAll(".tag").forEach((el) => {
    const o = el._o;
    if (!o.group.visible) { el.style.display = "none"; return; }
    const b = new THREE.Box3().setFromObject(o.model);
    const ty = o.L.id === "lungs" ? b.min.y + (b.max.y - b.min.y) * 0.62 : b.max.y;   // lungs: skip the windpipe
    const top = project(new THREE.Vector3((b.min.x + b.max.x) / 2, ty, 0));
    el.style.display = ""; el.style.left = top.x + "px"; el.style.top = top.y + "px";
  });
}

// ---------- pick an organ at a screen point ----------
const ray = new THREE.Raycaster();
function organAt(x, y) {
  ray.setFromCamera(new THREE.Vector2(x / W * 2 - 1, -(y / H) * 2 + 1), camera);
  const meshes = []; organs.forEach((o) => o.group.visible && o.pivot.traverse((n) => n.isMesh && meshes.push(n)));
  const hit = ray.intersectObjects(meshes, false)[0];
  return hit ? hit.object.userData.organ : null;
}
function elementAt(x, y) {
  for (const el of labels.querySelectorAll(".hs, .tag")) {
    if (el.style.display === "none") continue;
    const r = el.getBoundingClientRect();
    if (x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 12 && y <= r.bottom + 12) return el;
  }
  return null;
}

// ---------- touch / mouse ----------
const ptrs = new Map(); let pinch0 = null, moved = false;
stage.addEventListener("pointerdown", (e) => { ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false; if (ptrs.size === 2 && selected) { const [a, b] = [...ptrs.values()]; pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), s: selected.userScale }; } });
stage.addEventListener("pointermove", (e) => {
  const p = ptrs.get(e.pointerId); if (!p) return;
  const dx = e.clientX - p.x, dy = e.clientY - p.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
  if (ptrs.size === 1 && selected) { selected.userRot.y += dx * 0.01; selected.userRot.x += dy * 0.01; }
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptrs.size === 2 && selected && pinch0) { const [a, b] = [...ptrs.values()]; selected.userScale = Math.max(0.6, Math.min(3, pinch0.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch0.d)); }
});
const up = (e) => {
  const wasTap = ptrs.size === 1 && !moved;
  ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = null;
  if (wasTap && e.target === canvas) { const o = organAt(e.clientX, e.clientY); if (o) select(o); else if (selected) select(null); }
};
stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);

// ---------- hand gestures ----------
const cursor = $("cursor");
let dwell = { target: null, t0: 0 }, handPinch = [false, false], pinchStart = null, lastPinchPt = null;
function handStep(res, now) {
  const hs = (res && res.landmarks) || [];
  if (!handsOn || !hs.length) { cursor.style.display = "none"; dwell.target = null; lastPinchPt = null; pinchStart = null; return; }
  const info = hs.map((lm, i) => {
    const tip = toScreen(lm[8]), th = toScreen(lm[4]), wr = toScreen(lm[0]), mid = toScreen(lm[9]);
    const size = Math.hypot(wr.x - mid.x, wr.y - mid.y) || 1;
    const d = Math.hypot(tip.x - th.x, tip.y - th.y) / size;
    handPinch[i] = handPinch[i] ? d < 0.55 : d < 0.35;
    return { tip: sm("tip" + i, tip, 0.5), pinch: handPinch[i], pt: { x: (tip.x + th.x) / 2, y: (tip.y + th.y) / 2 } };
  });
  const h0 = info[0];
  cursor.style.display = "block"; cursor.style.left = h0.tip.x + "px"; cursor.style.top = h0.tip.y + "px";
  cursor.classList.toggle("pinch", h0.pinch);
  // two hands pinching -> zoom
  if (info.length > 1 && info[0].pinch && info[1].pinch && selected) {
    const d = Math.hypot(info[0].pt.x - info[1].pt.x, info[0].pt.y - info[1].pt.y);
    if (!pinchStart) pinchStart = { d, s: selected.userScale };
    selected.userScale = Math.max(0.6, Math.min(3, pinchStart.s * d / pinchStart.d));
    lastPinchPt = null; cursor.style.background = ""; return;
  }
  pinchStart = null;
  // one hand pinching -> rotate (or pick the organ under it)
  if (h0.pinch) {
    if (!selected) { const o = organAt(h0.tip.x, h0.tip.y); if (o) select(o); }
    if (selected && lastPinchPt) { selected.userRot.y += (h0.pt.x - lastPinchPt.x) * 0.012 * (mirrored ? 1 : 1); selected.userRot.x += (h0.pt.y - lastPinchPt.y) * 0.012; }
    lastPinchPt = h0.pt; dwell.target = null; cursor.style.background = ""; return;
  }
  lastPinchPt = null;
  // pointing -> hold on a label or organ for a moment to choose it
  const el = elementAt(h0.tip.x, h0.tip.y);
  const target = el || (!selected ? organAt(h0.tip.x, h0.tip.y) : null);
  if (target !== dwell.target) { dwell = { target, t0: now }; }
  const prog = target ? Math.min(1, (now - dwell.t0) / 800) : 0;
  cursor.style.background = prog > 0 ? `conic-gradient(rgba(255,196,87,.85) ${prog * 360}deg, transparent 0)` : "";
  labels.querySelectorAll(".hs, .tag").forEach((x) => x.classList.toggle("hot", x === el || (x.classList.contains("hs") && activePart && x._h === activePart)));
  if (target && prog >= 1) {
    dwell.t0 = now + 1e9;   // fire once
    if (el) el.click(); else select(target);
  }
}

// ---------- healthy / diseased, hands, camera buttons ----------
async function setState(st) {
  state = st;
  $("st-healthy").classList.toggle("on", st === "healthy");
  $("st-sick").classList.toggle("on", st !== "healthy"); $("st-sick").classList.toggle("sick", st !== "healthy");
  await Promise.all(organs.map((o) => setModel(o, st)));
  organs.forEach((o) => setOpacity(o, !selected || o.L.id === selected.L.id ? 1 : 0.28));
  if (selected) select(selected); else buildLabels();
}
$("st-healthy").addEventListener("click", () => setState("healthy"));
$("st-sick").addEventListener("click", () => setState("diseased"));
function renderHandsBtn() { const b = $("hands-btn"); b.classList.toggle("on", handsOn); b.setAttribute("aria-pressed", handsOn); b.textContent = "✋ " + t(handsOn ? U.handsOn : U.handsOff); }
$("hands-btn").addEventListener("click", () => { handsOn = !handsOn; renderHandsBtn(); });
renderHandsBtn();
$("flip-btn").addEventListener("click", async () => { facing = facing === "user" ? "environment" : "user"; Object.keys(smooth).forEach((k) => delete smooth[k]); try { await startCamera(); } catch (e) { showError(); } });
if (STILL) $("flip-btn").hidden = true;

function showError() {
  $("overlay").hidden = false; $("ov-spin").hidden = true; $("ov-text").textContent = t(U.camError); $("ov-start").hidden = false;
}
$("ov-start").addEventListener("click", async () => { $("ov-start").hidden = true; $("ov-spin").hidden = false; $("ov-text").textContent = t(U.loadingBody); try { await startCamera(); $("overlay").hidden = true; } catch (e) { showError(); } });

// ---------- main loop ----------
let lastTs = -1, frame = 0, handRes = null;
function loop() {
  requestAnimationFrame(loop);
  const dt = clock.getDelta();
  organs.forEach((o) => { const m = o.mixers[o.state]; if (m) m.update(dt); });
  const now = performance.now();
  const ready = source && (source === video ? video.readyState >= 2 && video.videoWidth : still.complete && still.naturalWidth);
  if (ready && pose) {
    const ts = Math.max(now, lastTs + 1); lastTs = ts;
    let res = null;
    try { res = pose.detectForVideo(source, ts); } catch (e) { /* skip frame */ }
    const lm = res && res.landmarks && res.landmarks[0];
    const ok = lm ? placeOrgans(lm) : false;
    if (ok) { bodySeen = true; lastBodyTime = now; }
    if (!ok && now - lastBodyTime > 600) { organs.forEach((o) => (o.group.visible = false)); torsoWin.visible = headWin.visible = false; bodySeen = false; }
    if (handsOn && hands && (frame++ % 2 === 0)) { try { handRes = hands.detectForVideo(source, ts + 0.5); } catch (e) { handRes = null; } lastTs = ts + 0.5; }
    handStep(handsOn ? handRes : null, now);
    if (!selected) $("hint-text").textContent = t(bodySeen ? U.bodyFound : U.bodyHint) + (bodySeen && handsOn ? " " + t(U.bodyPinch) : "");
  }
  // apply placement + user rotation/zoom + selection pop-out
  for (const o of organs) {
    if (!o.base) continue;
    const isSel = selected && (o === selected);
    o.sel += ((isSel ? 1 : 0) - o.sel) * 0.15;
    // a chosen organ flies out of the body to an open spot and grows, so its parts are easy to see
    const size = o.model.userData.size;
    const kFocus = Math.min(W * 0.62, H * 0.42) / Math.max(size.x, size.y * 0.8, 1e-6);
    const f = o.sel;
    const k = (o.base.k * (1 - f) + kFocus * f) * (isSel ? o.userScale : 1);
    const fx = W / 2, fy = H * 0.36;
    o.group.position.set(o.base.x * (1 - f) + fx * f, -(o.base.y * (1 - f) + fy * f), o.L.z + f * 800);
    o.group.rotation.set(0, 0, -o.base.roll * (1 - f));
    o.pivot.scale.set(k * (mirrored !== !!o.L.flip ? -1 : 1), k, k);
    o.pivot.rotation.copy(isSel ? o.userRot : new THREE.Euler());
  }
  updateLabels();
  renderer.render(scene, camera);
}

// ---------- start ----------
(async () => {
  try {
    await Promise.all(LAYOUT.map(buildOrgan));
    buildLabels();
    await initTracking();
    if (STILL) {
      still.src = STILL; still.hidden = false; video.hidden = true; mirrored = params.get("mirror") === "1"; still.classList.toggle("mirror", mirrored);
      await still.decode(); source = still;
    } else {
      try { await startCamera(); } catch (e) { showError(); loop(); return; }
    }
    $("overlay").hidden = true;
  } catch (e) {
    console.error(e); $("ov-spin").hidden = true; $("ov-text").textContent = "Error: " + e.message;
  }
  loop();
})();
window.__body = { organs, select, setState, placeOrgans };
