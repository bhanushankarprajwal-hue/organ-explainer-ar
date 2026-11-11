// =============================================================
// Take-home summary: one printable page for the patient, made from
// the same link as My Report (values + doctor's notes).
// Nothing is stored; the patient's name is only typed on the page.
// =============================================================
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { makeCase } from "./severity.js";
import { CASES, CASE_UI as UI } from "./cases.js";

const $ = (id) => document.getElementById(id);
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && String(o[lang]).trim()) ? o[lang] : (o ? o.en : "");
const T3 = (en, kn, ta) => ({ en, kn, ta });
const params = new URLSearchParams(location.search);
const COND = CONDITIONS.find((c) => c.id === params.get("c")) || CONDITIONS[0];
const SPEC = CASES[COND.id];
const values = {};
SPEC.fields.forEach((f) => { values[f.key] = params.has(f.key) ? (f.type === "range" ? +params.get(f.key) : params.get(f.key)) : f.value; });
let pins = [];
try { pins = JSON.parse(params.get("pins") || "[]").filter((p) => p && Array.isArray(p.p)).slice(0, 12); } catch (e) {}

// Tamil: needs checking by a Tamil reader.
const S = {
  title: T3("Take-home summary", "ಮನೆಗೆ ಸಾರಾಂಶ", "வீட்டுக்கான சுருக்கம்"),
  h1: T3("Your health summary", "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಾರಾಂಶ", "உங்கள் உடல்நலச் சுருக்கம்"),
  name: T3("Patient:", "ರೋಗಿ:", "நோயாளி:"), doc: T3("Doctor:", "ವೈದ್ಯರು:", "மருத்துவர்:"), date: T3("Date:", "ದಿನಾಂಕ:", "தேதி:"),
  vals: T3("Your report", "ನಿಮ್ಮ ವರದಿ", "உங்கள் அறிக்கை"),
  mean: T3("What this means", "ಇದರ ಅರ್ಥ", "இதன் பொருள்"),
  notes: T3("Notes from your doctor", "ನಿಮ್ಮ ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು", "உங்கள் மருத்துவரின் குறிப்புகள்"),
  next: T3("What happens in about 5 years", "ಸುಮಾರು 5 ವರ್ಷಗಳಲ್ಲಿ ಏನಾಗುತ್ತದೆ", "சுமார் 5 ஆண்டுகளில் என்ன நடக்கும்"),
  todo: T3("What you can do", "ನೀವು ಏನು ಮಾಡಬಹುದು", "நீங்கள் என்ன செய்யலாம்"),
  help: T3("When to get help now", "ತಕ್ಷಣ ಸಹಾಯ ಯಾವಾಗ ಪಡೆಯಬೇಕು", "உடனே உதவி எப்போது பெற வேண்டும்"),
  scan: T3("Scan to see your own 3D organ again at home, and ask your family to look too.", "ಮನೆಯಲ್ಲಿ ನಿಮ್ಮ 3D ಅಂಗವನ್ನು ಮತ್ತೆ ನೋಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ, ಮನೆಯವರಿಗೂ ತೋರಿಸಿ.", "வீட்டில் உங்கள் 3D உறுப்பை மீண்டும் பார்க்க ஸ்கேன் செய்யுங்கள், குடும்பத்தினருக்கும் காட்டுங்கள்."),
  print: T3("Print or save as PDF", "ಪ್ರಿಂಟ್ ಅಥವಾ PDF ಉಳಿಸಿ", "அச்சிடு அல்லது PDF சேமி"),
  share: T3("Share link", "ಲಿಂಕ್ ಹಂಚಿ", "இணைப்பைப் பகிர்"),
  copied: T3("Link copied", "ಲಿಂಕ್ ನಕಲಾಯಿತು", "இணைப்பு நகலெடுக்கப்பட்டது"),
};

const caseURL = new URL("mycase.html?" + params.toString(), location.href).href;

function fillText() {
  document.title = t(S.title) + " · " + t(COND.organ);
  $("bar-title").textContent = t(S.title);
  $("print-btn").textContent = t(S.print); $("share-btn").textContent = t(S.share);
  $("back").href = caseURL;
  $("s-h1").textContent = t(S.h1);
  $("l-name").textContent = t(S.name); $("l-doc").textContent = t(S.doc);
  $("s-date").textContent = t(S.date) + " " + new Date().toLocaleDateString(lang === "en" ? "en-IN" : lang + "-IN", { day: "numeric", month: "long", year: "numeric" });
  $("s-cond").textContent = t(COND.organ) + ": " + t(COND.name);
  $("s-short").textContent = t(COND.about);
  $("cap-h").textContent = t(UI.healthy); $("cap-d").textContent = t(UI.yours);
  $("h-vals").textContent = t(S.vals);
  $("vals").innerHTML = "";
  SPEC.fields.forEach((f) => {
    const tr = document.createElement("tr");
    const v = f.type === "select" ? t((f.options.find(([k]) => k === String(values[f.key])) || [0, { en: values[f.key] }])[1]) : values[f.key] + (f.unit || "");
    tr.innerHTML = "<td></td><td></td>"; tr.cells[0].textContent = t(f.label); tr.cells[1].textContent = v;
    $("vals").append(tr);
  });
  if (SPEC.py) { const tr = document.createElement("tr"); tr.innerHTML = "<td>Pack-years</td><td></td>"; tr.cells[1].textContent = Math.round(SPEC.py(values)); $("vals").append(tr); }
  const [band, text] = SPEC.band.call(SPEC, values);
  $("h-mean").textContent = t(S.mean); $("lvl").className = "lvl " + band; $("lvl").textContent = t(UI[band]); $("mean").textContent = t(text);
  $("sec-notes").hidden = !pins.length; $("h-notes").textContent = t(S.notes);
  $("notes").innerHTML = ""; pins.forEach((p) => { const li = document.createElement("li"); li.textContent = p.t; $("notes").append(li); });
  $("h-next").textContent = t(S.next);
  $("b-bad").textContent = t(UI.noChange); $("t-bad").textContent = t(SPEC.timeline.call(SPEC, values, false, 5).text);
  $("b-good").textContent = t(UI.withTreat); $("t-good").textContent = t(SPEC.timeline.call(SPEC, values, true, 5).text);
  $("illus").textContent = t(UI.illus);
  $("h-todo").textContent = t(S.todo);
  $("todo").innerHTML = "";
  COND.treatment.forEach((s) => { const li = document.createElement("li"); li.innerHTML = "<b></b> <span></span>"; li.querySelector("b").textContent = t(s.title) + ":"; li.querySelector("span").textContent = t(s.text); $("todo").append(li); });
  $("h-help").textContent = t(S.help); $("help").textContent = t(COND.warning);
  $("f-scan").textContent = t(S.scan); $("f-link").textContent = caseURL; $("f-edu").textContent = t(UI_TEXT.disclaimer);
}

// QR code that opens this patient's My Report page
function drawQR() {
  try {
    const q = window.qrcode(0, "M"); q.addData(caseURL); q.make();
    $("qr").innerHTML = q.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
  } catch (e) { $("qr").hidden = true; }
}

// pictures of the healthy organ and the patient's organ
async function renderPictures() {
  const W = 600;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(W, W, false); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(new URL("draco/", import.meta.url).href));
  const load = (u) => new Promise((res, rej) => loader.load(u, res, undefined, rej));
  const env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  async function shot(url, personal, canvasId) {
    const scene = new THREE.Scene(); scene.environment = env;
    const light = new THREE.DirectionalLight(0xffffff, 1.4); light.position.set(1, 2, 2); scene.add(light, new THREE.HemisphereLight(0xffffff, 0x223344, 0.6));
    const g = await load(url), m = g.scene;
    const box = new THREE.Box3().setFromObject(m), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    m.position.sub(c); const holder = new THREE.Group(); holder.add(m); holder.scale.setScalar(1 / Math.max(size.x, size.y, size.z)); scene.add(holder);
    if (personal) { const pc = makeCase(COND.id, m); pc.apply(SPEC.state(values)); }
    const cam = new THREE.PerspectiveCamera(32, 1, 0.01, 20);
    const dir = COND.id === "brain" ? new THREE.Vector3(0.9, 0.25, 0.35) : new THREE.Vector3(0.2, 0.15, 1);
    cam.position.copy(dir.normalize().multiplyScalar(2.05)); cam.lookAt(0, 0, 0);
    scene.updateMatrixWorld(true);
    renderer.render(scene, cam);
    const cv = $(canvasId), x = cv.getContext("2d");
    x.clearRect(0, 0, W, W); x.drawImage(renderer.domElement, 0, 0, W, W);
    if (personal) {
      // numbered doctor's pins on the picture
      pins.forEach((p, i) => {
        const v = new THREE.Vector3().fromArray(p.p); m.localToWorld(v); v.project(cam);
        const px = (v.x + 1) / 2 * W, py = (1 - v.y) / 2 * W;
        x.beginPath(); x.arc(px, py, 15, 0, Math.PI * 2); x.fillStyle = "#1f4e8c"; x.fill(); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke();
        x.fillStyle = "#fff"; x.font = "bold 16px Public Sans, Arial, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(String(i + 1), px, py + 1);
      });
    }
  }
  await shot(COND.views.outside.healthyModel, false, "img-h");
  await shot(COND.views.outside.diseasedModel, true, "img-d");
  renderer.dispose();
}

$("print-btn").addEventListener("click", () => window.print());
$("share-btn").addEventListener("click", async () => {
  const data = { title: t(S.title), text: t(COND.organ) + ": " + t(COND.name), url: caseURL };
  try { if (navigator.share) { await navigator.share(data); return; } } catch (e) { return; }
  try { await navigator.clipboard.writeText(caseURL); $("share-btn").textContent = t(S.copied); setTimeout(() => { $("share-btn").textContent = t(S.share); }, 2000); } catch (e) {}
});

fillText(); drawQR();
renderPictures().catch((e) => console.error(e));
