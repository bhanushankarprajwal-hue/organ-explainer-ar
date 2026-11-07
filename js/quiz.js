// =============================================================
// Understanding check: the same 5 questions BEFORE and AFTER using
// the app. Results stay on this device; the Results page shows the
// averages and can download them as a CSV file for the report.
// =============================================================
import { QUIZ } from "./quizdata.js";

const $ = (id) => document.getElementById(id);
let lang = "en";
try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}
document.documentElement.lang = lang;
const t = (o) => (o && o[lang] && String(o[lang]).trim()) ? o[lang] : (o ? o.en : "");
const T = (en, kn, ta) => ({ en, kn, ta });
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const app = $("app");
const params = new URLSearchParams(location.search);
const KEY = "oe-quiz-results";

const L = {
  title: T("Understanding check", "ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವಿಕೆ ಪರೀಕ್ಷೆ", "புரிதல் சோதனை"),
  results: T("Results", "ಫಲಿತಾಂಶ", "முடிவுகள்"),
  intro: T("This short quiz checks how much a person understands about a condition before and after using the app.", "ಈ ಚಿಕ್ಕ ಕ್ವಿಜ್, ಆಪ್ ಬಳಸುವ ಮೊದಲು ಮತ್ತು ನಂತರ ಒಬ್ಬರು ಕಾಯಿಲೆಯ ಬಗ್ಗೆ ಎಷ್ಟು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದಾರೆ ಎಂದು ಪರೀಕ್ಷಿಸುತ್ತದೆ.", "இந்தச் சிறிய வினாடி வினா, செயலியைப் பயன்படுத்தும் முன்பும் பின்பும் ஒருவர் நோயைப் பற்றி எவ்வளவு புரிந்துகொள்கிறார் என்று சோதிக்கிறது."),
  s1: T("Answer 5 questions", "5 ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ", "5 கேள்விகளுக்குப் பதில்"), s2: T("Learn with the app", "ಆಪ್‌ನಿಂದ ಕಲಿಯಿರಿ", "செயலியுடன் கற்றுக்கொள்"), s3: T("Answer them again", "ಮತ್ತೆ ಉತ್ತರಿಸಿ", "மீண்டும் பதில்"),
  who: T("Participant code (no names)", "ಭಾಗವಹಿಸುವವರ ಕೋಡ್ (ಹೆಸರು ಬೇಡ)", "பங்கேற்பாளர் குறியீடு (பெயர் வேண்டாம்)"),
  topic: T("Condition", "ಕಾಯಿಲೆ", "நோய்"),
  start: T("Start the quiz", "ಕ್ವಿಜ್ ಶುರು ಮಾಡಿ", "வினாடி வினாவைத் தொடங்கு"),
  before: T("Before using the app", "ಆಪ್ ಬಳಸುವ ಮೊದಲು", "செயலியைப் பயன்படுத்தும் முன்"),
  after: T("After using the app", "ಆಪ್ ಬಳಸಿದ ನಂತರ", "செயலியைப் பயன்படுத்திய பின்"),
  qOf: T("Question", "ಪ್ರಶ್ನೆ", "கேள்வி"),
  learnTitle: T("Now learn with the app", "ಈಗ ಆಪ್‌ನಿಂದ ಕಲಿಯಿರಿ", "இப்போது செயலியுடன் கற்றுக்கொள்ளுங்கள்"),
  learnText: T("Spend 3–5 minutes with the app: look at the healthy and sick organ, tap the numbers, and try My Report and the timeline. Then come back here.", "3–5 ನಿಮಿಷ ಆಪ್ ಬಳಸಿ: ಆರೋಗ್ಯಕರ ಮತ್ತು ಕಾಯಿಲೆಯ ಅಂಗ ನೋಡಿ, ಸಂಖ್ಯೆಗಳನ್ನು ಒತ್ತಿ, ನನ್ನ ವರದಿ ಮತ್ತು ಟೈಮ್‌ಲೈನ್ ಪ್ರಯತ್ನಿಸಿ. ನಂತರ ಇಲ್ಲಿಗೆ ಬನ್ನಿ.", "3–5 நிமிடம் செயலியைப் பயன்படுத்துங்கள்: ஆரோக்கியமான மற்றும் நோயுள்ள உறுப்பைப் பாருங்கள், எண்களைத் தட்டுங்கள், என் அறிக்கை மற்றும் காலவரிசையை முயலுங்கள். பிறகு இங்கே வாருங்கள்."),
  openOrgan: T("Open the organ page", "ಅಂಗದ ಪುಟ ತೆರೆಯಿರಿ", "உறுப்புப் பக்கத்தைத் திற"),
  openCase: T("Open My Report", "ನನ್ನ ವರದಿ ತೆರೆಯಿರಿ", "என் அறிக்கையைத் திற"),
  done: T("I’m done → answer again", "ಮುಗಿಯಿತು → ಮತ್ತೆ ಉತ್ತರಿಸಿ", "முடிந்தது → மீண்டும் பதில்"),
  finished: T("Finished — thank you!", "ಮುಗಿಯಿತು — ಧನ್ಯವಾದ!", "முடிந்தது — நன்றி!"),
  gain: T("Improvement", "ಸುಧಾರಣೆ", "முன்னேற்றம்"),
  review: T("Right answers", "ಸರಿಯಾದ ಉತ್ತರಗಳು", "சரியான பதில்கள்"),
  next: T("Next participant", "ಮುಂದಿನ ಭಾಗವಹಿಸುವವರು", "அடுத்த பங்கேற்பாளர்"),
  seeAll: T("See all results", "ಎಲ್ಲ ಫಲಿತಾಂಶ ನೋಡಿ", "அனைத்து முடிவுகளும்"),
  people: T("participants", "ಭಾಗವಹಿಸಿದವರು", "பங்கேற்பாளர்கள்"),
  avgBefore: T("Average before", "ಮೊದಲಿನ ಸರಾಸರಿ", "முன் சராசரி"),
  avgAfter: T("Average after", "ನಂತರದ ಸರಾಸರಿ", "பின் சராசரி"),
  csv: T("Download results (CSV)", "ಫಲಿತಾಂಶ ಡೌನ್‌ಲೋಡ್ (CSV)", "முடிவுகளைப் பதிவிறக்கு (CSV)"),
  clear: T("Clear all results", "ಎಲ್ಲ ಫಲಿತಾಂಶ ಅಳಿಸಿ", "அனைத்து முடிவுகளையும் அழி"),
  sure: T("Tap again to delete everything", "ಎಲ್ಲವನ್ನೂ ಅಳಿಸಲು ಮತ್ತೆ ಒತ್ತಿ", "அனைத்தையும் அழிக்க மீண்டும் தட்டுங்கள்"),
  none: T("No results yet. Run the quiz with a few people first.", "ಇನ್ನೂ ಫಲಿತಾಂಶ ಇಲ್ಲ. ಮೊದಲು ಕೆಲವರೊಂದಿಗೆ ಕ್ವಿಜ್ ಮಾಡಿ.", "இன்னும் முடிவுகள் இல்லை. முதலில் சிலருடன் வினாடி வினா நடத்துங்கள்."),
  newQuiz: T("Start a new quiz", "ಹೊಸ ಕ್ವಿಜ್ ಶುರು", "புதிய வினாடி வினா"),
  saved: T("Saved on this device only.", "ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗಿದೆ.", "இந்தச் சாதனத்தில் மட்டும் சேமிக்கப்பட்டது."),
  code: T("Code", "ಕೋಡ್", "குறியீடு"), date: T("Date", "ದಿನಾಂಕ", "தேதி"),
  beforeS: T("Before", "ಮೊದಲು", "முன்"), afterS: T("After", "ನಂತರ", "பின்"),
  all: T("All", "ಎಲ್ಲಾ", "அனைத்தும்"),
};

const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
const save = (rows) => { try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch (e) {} };
const organName = (id) => t(CONDITIONS.find((c) => c.id === id).organ);
const condName = (id) => t(CONDITIONS.find((c) => c.id === id).name);

$("title").textContent = t(L.title);
$("res-link").textContent = "📊 " + t(L.results);
document.title = t(L.title) + " · Organ Explainer AR";

// ---------- the flow ----------
let run = null;   // { code, organ, phase: "before"|"after", i, before: [], after: [] }

function startScreen() {
  const rows = load();
  const nextCode = "P" + (rows.length + 1);
  const pre = params.get("c") || "heart";
  app.innerHTML = `
    <p class="phase">${esc(t(L.title))}</p>
    <h1 style="margin:6px 0 10px">${esc(t(L.title))}</h1>
    <p class="sub">${esc(t(L.intro))}</p>
    <div class="steps3"><div><b>01</b><span>${esc(t(L.s1))}</span></div><div><b>02</b><span>${esc(t(L.s2))}</span></div><div><b>03</b><span>${esc(t(L.s3))}</span></div></div>
    <div class="form">
      <label>${esc(t(L.who))}<input id="code" value="${esc(nextCode)}" maxlength="20" autocomplete="off"></label>
      <label>${esc(t(L.topic))}<select id="organ">${CONDITIONS.map((c) => `<option value="${c.id}"${c.id === pre ? " selected" : ""}>${esc(organName(c.id))} — ${esc(condName(c.id))}</option>`).join("")}</select></label>
    </div>
    <button class="btn primary" id="go">${esc(t(L.start))} →</button>
    <p class="note muted" style="margin-top:14px">${esc(t(L.saved))} ${esc(t(UI_TEXT.disclaimer))}</p>`;
  $("go").addEventListener("click", () => {
    run = { code: ($("code").value.trim() || nextCode).slice(0, 20), organ: $("organ").value, phase: "before", i: 0, before: [], after: [] };
    question();
  });
}

function question() {
  const qs = QUIZ[run.organ], q = qs[run.i];
  const done = (run.phase === "before" ? 0 : qs.length) + run.i;
  app.innerHTML = `
    <p class="phase">${esc(t(run.phase === "before" ? L.before : L.after))} · ${esc(organName(run.organ))} · ${esc(run.code)}</p>
    <div class="progress"><span style="width:${(done / (qs.length * 2)) * 100}%"></span></div>
    <p class="muted" style="margin:0">${esc(t(L.qOf))} ${run.i + 1} / ${qs.length}</p>
    <h2 class="question">${esc(t(q.q))}</h2>
    <div class="opts">${q.o.map((o, k) => `<button class="opt" data-k="${k}"><span class="k">${"ABCD"[k]}</span><span>${esc(t(o))}</span></button>`).join("")}</div>`;
  app.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => answer(+b.dataset.k)));
}
function answer(k) {
  run[run.phase].push(k);
  run.i++;
  if (run.i < QUIZ[run.organ].length) { question(); return; }
  if (run.phase === "before") { learnScreen(); return; }
  finish();
}
function learnScreen() {
  app.innerHTML = `
    <p class="phase">02 · ${esc(organName(run.organ))} · ${esc(run.code)}</p>
    <div class="progress"><span style="width:50%"></span></div>
    <h2 class="question">${esc(t(L.learnTitle))}</h2>
    <p class="sub">${esc(t(L.learnText))}</p>
    <div class="row-btns">
      <a class="btn" href="index.html#${run.organ}" target="_blank" rel="noopener">${esc(t(L.openOrgan))} ↗</a>
      <a class="btn" href="mycase.html?c=${run.organ}" target="_blank" rel="noopener">${esc(t(L.openCase))} ↗</a>
    </div>
    <div class="row-btns"><button class="btn primary" id="again">${esc(t(L.done))}</button></div>`;
  $("again").addEventListener("click", () => { run.phase = "after"; run.i = 0; question(); });
}
const scoreOf = (organ, ans) => ans.reduce((s, k, i) => s + (k === QUIZ[organ][i].a ? 1 : 0), 0);
function finish() {
  const qs = QUIZ[run.organ];
  const b = scoreOf(run.organ, run.before), a = scoreOf(run.organ, run.after);
  const rows = load();
  rows.push({ code: run.code, organ: run.organ, before: b, after: a, total: qs.length, date: new Date().toISOString().slice(0, 16).replace("T", " "), answersBefore: run.before.join(""), answersAfter: run.after.join("") });
  save(rows);
  const pct = (x) => Math.round((x / qs.length) * 100) + "%";
  app.innerHTML = `
    <p class="phase">${esc(organName(run.organ))} · ${esc(run.code)}</p>
    <div class="progress"><span style="width:100%"></span></div>
    <h2 class="question">${esc(t(L.finished))}</h2>
    <div class="score-row">
      <div class="score"><small>${esc(t(L.beforeS))}</small><b>${b}/${qs.length}</b><small>${pct(b)}</small></div>
      <div class="score"><small>${esc(t(L.afterS))}</small><b>${a}/${qs.length}</b><small>${pct(a)}</small></div>
      <div class="score up"><small>${esc(t(L.gain))}</small><b>${a - b >= 0 ? "+" : ""}${a - b}</b><small>${a - b >= 0 ? "+" : ""}${Math.round(((a - b) / qs.length) * 100)} pts</small></div>
    </div>
    <h3>${esc(t(L.review))}</h3>
    <ul class="review">${qs.map((q, i) => `<li><b>${i + 1}. ${esc(t(q.q))}</b><br>✓ ${esc(t(q.o[q.a]))}${run.after[i] === q.a ? "" : ` <span style="color:var(--sick)">(${esc(t(q.o[run.after[i]]))})</span>`}</li>`).join("")}</ul>
    <div class="row-btns"><button class="btn primary" id="next">${esc(t(L.next))} →</button><a class="btn" href="#results">📊 ${esc(t(L.seeAll))}</a></div>`;
  $("next").addEventListener("click", () => { run = null; startScreen(); window.scrollTo(0, 0); });
  window.scrollTo(0, 0);
}

// ---------- results for the report ----------
function resultsScreen() {
  const rows = load();
  if (!rows.length) {
    app.innerHTML = `<h1 style="margin:6px 0 12px">${esc(t(L.results))}</h1><p class="sub">${esc(t(L.none))}</p><div class="row-btns"><a class="btn primary" href="#">${esc(t(L.newQuiz))}</a></div>`;
    return;
  }
  const avg = (list, k) => list.length ? list.reduce((s, r) => s + r[k] / r.total, 0) / list.length * 100 : 0;
  const groups = [["all", rows]].concat(CONDITIONS.map((c) => [c.id, rows.filter((r) => r.organ === c.id)]).filter(([, l]) => l.length));
  const bars = groups.map(([id, list]) => {
    const b = avg(list, "before"), a = avg(list, "after");
    const name = id === "all" ? t(L.all) : organName(id);
    return `<div><p style="margin:0 0 6px;font-weight:700">${esc(name)} <span class="muted">· ${list.length} ${esc(t(L.people))}</span></p>
      <div class="bar-row"><span class="muted">${esc(t(L.beforeS))}</span><div class="bar before"><span style="width:${Math.max(b, 8)}%">${Math.round(b)}%</span></div></div>
      <div class="bar-row" style="margin-top:6px"><span class="muted">${esc(t(L.afterS))}</span><div class="bar after"><span style="width:${Math.max(a, 8)}%">${Math.round(a)}%</span></div></div></div>`;
  }).join("");
  const b = avg(rows, "before"), a = avg(rows, "after");
  app.innerHTML = `
    <h1 style="margin:6px 0 4px">${esc(t(L.results))}</h1>
    <p class="sub">${rows.length} ${esc(t(L.people))} · ${esc(t(L.saved))}</p>
    <div class="score-row">
      <div class="score"><small>${esc(t(L.avgBefore))}</small><b>${Math.round(b)}%</b></div>
      <div class="score"><small>${esc(t(L.avgAfter))}</small><b>${Math.round(a)}%</b></div>
      <div class="score up"><small>${esc(t(L.gain))}</small><b>${a - b >= 0 ? "+" : ""}${Math.round(a - b)}</b><small>pts</small></div>
    </div>
    <div class="bars">${bars}</div>
    <div style="overflow-x:auto"><table class="res"><tr><th>${esc(t(L.code))}</th><th>${esc(t(L.topic))}</th><th>${esc(t(L.beforeS))}</th><th>${esc(t(L.afterS))}</th><th>${esc(t(L.date))}</th></tr>
      ${rows.map((r) => `<tr><td>${esc(r.code)}</td><td>${esc(organName(r.organ))}</td><td>${r.before}/${r.total}</td><td>${r.after}/${r.total}</td><td class="muted">${esc(r.date)}</td></tr>`).join("")}</table></div>
    <div class="row-btns">
      <button class="btn primary" id="csv">⤓ ${esc(t(L.csv))}</button>
      <a class="btn" href="#">${esc(t(L.newQuiz))}</a>
      <button class="btn danger" id="clear">${esc(t(L.clear))}</button>
    </div>`;
  $("csv").addEventListener("click", () => {
    const head = "code,organ,before,after,total,before_pct,after_pct,date,answers_before,answers_after";
    const lines = rows.map((r) => [r.code, r.organ, r.before, r.after, r.total, Math.round(r.before / r.total * 100), Math.round(r.after / r.total * 100), r.date, r.answersBefore, r.answersAfter].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([head + "\n" + lines.join("\n") + "\n"], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "organ-explainer-quiz-results.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  let armed = false;
  $("clear").addEventListener("click", (e) => {
    if (!armed) { armed = true; e.target.textContent = t(L.sure); setTimeout(() => { armed = false; e.target.textContent = t(L.clear); }, 4000); return; }
    save([]); resultsScreen();
  });
}

function route() {
  $("back").href = "index.html" + (params.get("c") ? "#" + params.get("c") : "");
  if (location.hash === "#results") { resultsScreen(); return; }
  if (!run) startScreen();
}
window.addEventListener("hashchange", () => { run = null; route(); window.scrollTo(0, 0); });
route();
