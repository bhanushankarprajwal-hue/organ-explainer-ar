// =============================================================
// Scan the report: reads a photo of a printed medical report on the
// device (Tesseract OCR, no upload) and looks for the numbers My
// Report needs. The doctor always checks the values before using them.
// =============================================================
let workerP = null;
function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.append(s); });
}
async function worker(onProgress) {
  if (!workerP) workerP = (async () => {
    const base = new URL("vendor/tesseract/", import.meta.url).href;
    if (!window.Tesseract) await loadScript(base + "tesseract.min.js");
    return window.Tesseract.createWorker("eng", 1, {
      workerPath: base + "worker.min.js", corePath: base + "core/", langPath: base + "lang/", gzip: true,
      logger: (m) => onProgress && m.status && onProgress(m.status, m.progress || 0),
    });
  })();
  return workerP;
}
// big phone photos are slow to read; shrink them first, and make them grey
async function prepare(file) {
  const img = await createImageBitmap(file);
  const k = Math.min(1, 2200 / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  const x = c.getContext("2d"); x.filter = "grayscale(1) contrast(1.25)"; x.drawImage(img, 0, 0, c.width, c.height);
  return c;
}
export async function readReport(file, onProgress) {
  const w = await worker(onProgress);
  const { data } = await w.recognize(await prepare(file));
  return data.text || "";
}

// ---------- finding the values ----------
const num = (s) => parseFloat(String(s).replace(",", "."));
const ROMAN = { i: 1, ii: 2, iii: 3 };
function near(text, re, words, span = 80) {
  // first match of re that has one of the words within `span` characters
  const out = [];
  for (const m of text.matchAll(re)) {
    const a = Math.max(0, m.index - span), b = Math.min(text.length, m.index + m[0].length + span);
    const ctx = text.slice(a, b);
    if (!words || words.test(ctx)) out.push({ m, ctx: ctx.replace(/\s+/g, " ").trim() });
  }
  return out;
}
export function findValues(organ, raw) {
  const text = raw.replace(/[|]/g, "I").replace(/\r/g, "");
  const found = {}, notes = [];
  if (organ === "heart") {
    const hits = near(text, /(\d{1,3})\s*%/g, /(stenosis|steno|block|occlu|narrow|lesion|LAD|left anterior)/i);
    const lad = hits.find((h) => /LAD|left anterior/i.test(h.ctx)) || hits[0];
    if (lad) { const v = Math.min(100, Math.round(num(lad.m[1]) / 5) * 5); found.block = v; notes.push(lad.ctx); }
  }
  if (organ === "kidney") {
    const hits = near(text, /(\d{1,2}(?:[.,]\d)?)\s*(mm|cm)\b/gi, /(calcul|stone|concre|echogenic focus|nephrolith|urolith)/i);
    if (hits[0]) { let v = num(hits[0].m[1]); if (/cm/i.test(hits[0].m[2])) v *= 10; found.mm = Math.max(2, Math.min(25, Math.round(v))); notes.push(hits[0].ctx); }
    const ctx = (hits[0] && hits[0].ctx) || text;
    if (/ureter|ureteric|uvj|vuj|puj|pelvi.?ureteric/i.test(ctx)) found.where = "ureter";
    else if (hits[0]) found.where = "kidney";
    if (/\bleft\b/i.test(ctx) && !/\bright\b/i.test(ctx)) found.side = "left";
    else if (/\bright\b/i.test(ctx) && !/\bleft\b/i.test(ctx)) found.side = "right";
  }
  if (organ === "liver") {
    const hits = near(text, /grade\s*[-:]?\s*(iii|ii|i|[1-3])\b/gi, /(fatty|steatosis|liver|hepat)/i);
    if (hits[0]) { const g = hits[0].m[1].toLowerCase(); found.grade = String(ROMAN[g] || +g); notes.push(hits[0].ctx); }
  }
  if (organ === "lungs") {
    const py = near(text, /(\d{1,3}(?:[.,]\d)?)\s*(?:pack[\s-]?years?|PY\b)/gi);
    const yrs = near(text, /(\d{1,2})\s*(?:years?|yrs?)\b/gi, /smok/i);
    const day = near(text, /(\d{1,2})\s*(?:cigarettes?|cigs?|sticks?|bidis?)\s*(?:per|a|\/)\s*day/gi);
    if (yrs[0]) { found.years = Math.min(40, Math.round(num(yrs[0].m[1]))); notes.push(yrs[0].ctx); }
    if (day[0]) { found.perDay = Math.min(40, Math.round(num(day[0].m[1]))); notes.push(day[0].ctx); }
    if (py[0] && !(found.years && found.perDay)) {
      const p = num(py[0].m[1]); notes.push(py[0].ctx);
      if (found.years) found.perDay = Math.min(40, Math.round((p * 20) / found.years));
      else { found.perDay = 20; found.years = Math.min(40, Math.round(p)); }
    }
  }
  if (organ === "brain") {
    const size = near(text, /(\d{1,2}(?:[.,]\d)?)\s*(mm|cm)\b/gi, /(infarct|stroke|isch|lesion|hypodens)/i);
    let s = null;
    if (size[0]) { let v = num(size[0].m[1]); if (/mm/i.test(size[0].m[2])) v /= 10; s = v < 1.5 ? "0.2" : v < 4 ? "0.5" : "0.85"; notes.push(size[0].ctx); }
    if (!s && /lacunar|small (?:vessel|infarct)/i.test(text)) s = "0.2";
    if (!s && /(large|extensive|massive|malignant)\s+(?:\w+\s+){0,2}(infarct|territory|stroke)/i.test(text)) s = "0.85";
    if (!s && /infarct|stroke|ischemi|ischaemi/i.test(text)) s = "0.5";
    if (s) found.size = s;
  }
  return { found, notes };
}
