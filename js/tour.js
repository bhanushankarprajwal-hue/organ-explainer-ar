// =============================================================
// "Explain my case": a short step-by-step tour of ONE patient's
// organ, built from their report values and the doctor's notes.
// Used on the My Report page (3D) and in Hand AR (on the table).
// Each step: { title, text, focus: hotspot id | {p:[x,y,z]} | null,
//              timeline: { treat, t } | null }
// Tamil text: needs checking by a Tamil reader.
// =============================================================
import { CASES } from "./cases.js";

const T = (en, kn, ta) => ({ en, kn, ta });
const fill = (o, vars) => Object.fromEntries(Object.entries(o).map(([k, s]) => [k, s.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "")]));

const L = {
  you: T("Your case", "ನಿಮ್ಮ ಪ್ರಕರಣ", "உங்கள் நிலை"),
  problem: T("What is wrong", "ಏನು ತೊಂದರೆ", "என்ன பிரச்சனை"),
  effect: T("What it does to you", "ಇದು ನಿಮಗೆ ಏನು ಮಾಡುತ್ತದೆ", "இது உங்களுக்கு என்ன செய்கிறது"),
  note: T("Doctor’s note", "ವೈದ್ಯರ ಟಿಪ್ಪಣಿ", "மருத்துவரின் குறிப்பு"),
  later: T("If nothing changes", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ", "எதுவும் மாறவில்லை என்றால்"),
  treat: T("With treatment", "ಚಿಕಿತ್ಸೆಯೊಂದಿಗೆ", "சிகிச்சையுடன்"),
  todo: T("What you can do", "ನೀವು ಏನು ಮಾಡಬಹುದು", "நீங்கள் என்ன செய்யலாம்"),
  help: T("When to get help now", "ತಕ್ಷಣ ಸಹಾಯ ಯಾವಾಗ ಪಡೆಯಬೇಕು", "உடனே உதவி எப்போது பெற வேண்டும்"),
  in5: T("In about 5 years: ", "ಸುಮಾರು 5 ವರ್ಷಗಳಲ್ಲಿ: ", "சுமார் 5 ஆண்டுகளில்: "),
};

const ORG = {
  heart: {
    intro: T("This is your heart. It pumps blood to your whole body, day and night.", "ಇದು ನಿಮ್ಮ ಹೃದಯ. ಇದು ಹಗಲು ರಾತ್ರಿ ಇಡೀ ದೇಹಕ್ಕೆ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ.", "இது உங்கள் இதயம். இது இரவும் பகலும் உடல் முழுவதும் இரத்தத்தை அனுப்புகிறது."),
    problem: { focus: "plaque", text: T("This yellow lump is plaque: fat stuck inside the LAD artery, at the front of your heart. Your report says it blocks about {block}% of the artery.", "ಈ ಹಳದಿ ಉಂಡೆ ಪ್ಲೇಕ್: ಹೃದಯದ ಮುಂಭಾಗದ LAD ಧಮನಿಯೊಳಗೆ ಅಂಟಿಕೊಂಡ ಕೊಬ್ಬು. ನಿಮ್ಮ ವರದಿಯ ಪ್ರಕಾರ ಇದು ಧಮನಿಯ ಸುಮಾರು {block}% ಮುಚ್ಚಿದೆ.", "இந்த மஞ்சள் கட்டி பிளேக்: இதயத்தின் முன்பக்க LAD தமனிக்குள் ஒட்டிய கொழுப்பு. உங்கள் அறிக்கைப்படி இது தமனியின் சுமார் {block}% அடைக்கிறது.") },
    effect: { focus: "risk", text: T("Below the block, this part of the heart muscle gets less blood and oxygen. This can cause chest pain, mostly when you walk fast or climb stairs.", "ಅಡಚಣೆಯ ಕೆಳಗೆ, ಹೃದಯ ಸ್ನಾಯುವಿನ ಈ ಭಾಗಕ್ಕೆ ಕಡಿಮೆ ರಕ್ತ ಮತ್ತು ಆಮ್ಲಜನಕ ಸಿಗುತ್ತದೆ. ವೇಗವಾಗಿ ನಡೆದಾಗ ಅಥವಾ ಮೆಟ್ಟಿಲು ಹತ್ತಿದಾಗ ಎದೆ ನೋವು ಬರಬಹುದು.", "அடைப்புக்குக் கீழே, இதயத் தசையின் இந்தப் பகுதிக்குக் குறைந்த இரத்தமும் ஆக்ஸிஜனும் கிடைக்கிறது. வேகமாக நடக்கும்போது அல்லது படி ஏறும்போது நெஞ்சு வலி வரலாம்.") },
  },
  kidney: {
    intro: T("This is your {side} kidney. It cleans your blood and makes urine.", "ಇದು ನಿಮ್ಮ {side} ಮೂತ್ರಪಿಂಡ. ಇದು ರಕ್ತವನ್ನು ಶುದ್ಧಗೊಳಿಸಿ ಮೂತ್ರ ತಯಾರಿಸುತ್ತದೆ.", "இது உங்கள் {side} சிறுநீரகம். இது இரத்தத்தைச் சுத்தம் செய்து சிறுநீரை உருவாக்குகிறது."),
    problem: (v) => v.where === "ureter"
      ? { focus: "stuck", text: T("This is the stone: about {mm} mm, stuck in the tube that carries urine down to the bladder.", "ಇದು ಕಲ್ಲು: ಸುಮಾರು {mm} ಮಿ.ಮೀ, ಮೂತ್ರವನ್ನು ಮೂತ್ರಕೋಶಕ್ಕೆ ಒಯ್ಯುವ ಕೊಳವೆಯಲ್ಲಿ ಸಿಕ್ಕಿಕೊಂಡಿದೆ.", "இது கல்: சுமார் {mm} மி.மீ, சிறுநீரை சிறுநீர்ப்பைக்குக் கொண்டு செல்லும் குழாயில் சிக்கியுள்ளது.") }
      : { focus: { p: [0.006, 0.054, 0.002], n: [-0.24, -0.26, 0.93] }, text: T("This is the stone: about {mm} mm, sitting inside the kidney. We made the kidney see-through so you can see it.", "ಇದು ಕಲ್ಲು: ಸುಮಾರು {mm} ಮಿ.ಮೀ, ಮೂತ್ರಪಿಂಡದ ಒಳಗೆ ಇದೆ. ನೀವು ನೋಡಲು ಮೂತ್ರಪಿಂಡವನ್ನು ಪಾರದರ್ಶಕ ಮಾಡಿದ್ದೇವೆ.", "இது கல்: சுமார் {mm} மி.மீ, சிறுநீரகத்தின் உள்ளே உள்ளது. நீங்கள் பார்க்க சிறுநீரகத்தை ஒளிபுகும்படி செய்துள்ளோம்.") },
    effect: (v) => v.where === "ureter"
      ? { focus: "swell", text: T("The stone blocks the urine, so the kidney can swell. This causes strong pain in the side or back, and sometimes vomiting.", "ಕಲ್ಲು ಮೂತ್ರವನ್ನು ತಡೆಯುವುದರಿಂದ ಮೂತ್ರಪಿಂಡ ಊದಬಹುದು. ಇದರಿಂದ ಪಕ್ಕೆ ಅಥವಾ ಬೆನ್ನಿನಲ್ಲಿ ತೀವ್ರ ನೋವು, ಕೆಲವೊಮ್ಮೆ ವಾಂತಿ ಆಗುತ್ತದೆ.", "கல் சிறுநீரைத் தடுப்பதால் சிறுநீரகம் வீங்கலாம். இதனால் பக்கவாட்டில் அல்லது முதுகில் கடும் வலி, சில நேரம் வாந்தி வரும்.") }
      : { focus: "stuck", text: T("A stone inside the kidney may not hurt now. If it moves down into this tube, it can cause sudden strong pain.", "ಮೂತ್ರಪಿಂಡದೊಳಗಿನ ಕಲ್ಲು ಈಗ ನೋವು ಕೊಡದಿರಬಹುದು. ಅದು ಈ ಕೊಳವೆಗೆ ಇಳಿದರೆ ಹಠಾತ್ ತೀವ್ರ ನೋವು ಬರಬಹುದು.", "சிறுநீரகத்தின் உள்ளே உள்ள கல் இப்போது வலிக்காமல் இருக்கலாம். அது இந்தக் குழாயில் இறங்கினால் திடீர் கடும் வலி வரலாம்.") },
  },
  liver: {
    intro: T("This is your liver. It cleans the blood, stores energy and helps you digest food.", "ಇದು ನಿಮ್ಮ ಯಕೃತ್ತು. ಇದು ರಕ್ತ ಶುದ್ಧಗೊಳಿಸುತ್ತದೆ, ಶಕ್ತಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ ಮತ್ತು ಆಹಾರ ಜೀರ್ಣಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.", "இது உங்கள் கல்லீரல். இது இரத்தத்தைச் சுத்தம் செய்கிறது, ஆற்றலைச் சேமிக்கிறது, உணவு செரிக்க உதவுகிறது."),
    problem: { focus: "fat", text: T("These yellow spots show fat stored inside the liver. Your scan shows grade {grade} fatty liver.", "ಈ ಹಳದಿ ಚುಕ್ಕೆಗಳು ಯಕೃತ್ತಿನೊಳಗೆ ಸಂಗ್ರಹವಾದ ಕೊಬ್ಬನ್ನು ತೋರಿಸುತ್ತವೆ. ನಿಮ್ಮ ಸ್ಕ್ಯಾನ್ ಗ್ರೇಡ್ {grade} ಕೊಬ್ಬಿನ ಯಕೃತ್ತು ತೋರಿಸುತ್ತದೆ.", "இந்த மஞ்சள் புள்ளிகள் கல்லீரலுக்குள் சேர்ந்த கொழுப்பைக் காட்டுகின்றன. உங்கள் ஸ்கேன் தரம் {grade} கொழுப்பு கல்லீரலைக் காட்டுகிறது.") },
    effect: { focus: "swollen", text: T("Extra fat makes the liver swell. Over many years it can make the liver stiff and scarred, which does not heal.", "ಹೆಚ್ಚು ಕೊಬ್ಬು ಯಕೃತ್ತನ್ನು ಊದಿಸುತ್ತದೆ. ಹಲವು ವರ್ಷಗಳಲ್ಲಿ ಯಕೃತ್ತು ಗಟ್ಟಿಯಾಗಿ ಗಾಯದ ಗುರುತು ಆಗಬಹುದು, ಅದು ಗುಣವಾಗುವುದಿಲ್ಲ.", "கூடுதல் கொழுப்பு கல்லீரலை வீங்கச் செய்கிறது. பல ஆண்டுகளில் கல்லீரல் கடினமாகி வடு ஏற்படலாம், அது குணமாகாது.") },
  },
  lungs: {
    intro: T("These are your lungs. Every breath brings oxygen into your blood here.", "ಇವು ನಿಮ್ಮ ಶ್ವಾಸಕೋಶಗಳು. ಪ್ರತಿ ಉಸಿರು ಇಲ್ಲಿ ನಿಮ್ಮ ರಕ್ತಕ್ಕೆ ಆಮ್ಲಜನಕ ತರುತ್ತದೆ.", "இவை உங்கள் நுரையீரல்கள். ஒவ்வொரு மூச்சும் இங்கே உங்கள் இரத்தத்திற்கு ஆக்ஸிஜனைக் கொண்டுவருகிறது."),
    problem: { focus: "tar", text: T("These dark spots are tar from smoking. {years} years at {perDay} cigarettes a day is about {py} pack-years.", "ಈ ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಧೂಮಪಾನದ ಟಾರ್. ದಿನಕ್ಕೆ {perDay} ಸಿಗರೇಟಿನಂತೆ {years} ವರ್ಷ ಎಂದರೆ ಸುಮಾರು {py} ಪ್ಯಾಕ್-ವರ್ಷ.", "இந்தக் கருப்புப் புள்ளிகள் புகைப்பழக்கத்தின் தார். நாளொன்றுக்கு {perDay} சிகரெட் என {years} ஆண்டுகள் என்றால் சுமார் {py} பேக்-ஆண்டுகள்.") },
    effect: { focus: "sacs", text: T("Tar damages the tiny air sacs, so less oxygen gets into the blood. This is why breathing feels harder.", "ಟಾರ್ ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳನ್ನು ಹಾಳುಮಾಡುತ್ತದೆ, ಆದ್ದರಿಂದ ರಕ್ತಕ್ಕೆ ಕಡಿಮೆ ಆಮ್ಲಜನಕ ಸಿಗುತ್ತದೆ. ಅದಕ್ಕೇ ಉಸಿರಾಟ ಕಷ್ಟವಾಗುತ್ತದೆ.", "தார் சிறிய காற்றுப் பைகளைச் சேதப்படுத்துகிறது, அதனால் இரத்தத்திற்குக் குறைந்த ஆக்ஸிஜன் செல்கிறது. அதனால்தான் மூச்சு விடுவது கடினமாகிறது.") },
  },
  brain: {
    intro: T("This is your brain. It controls how you move, speak and think.", "ಇದು ನಿಮ್ಮ ಮೆದುಳು. ನೀವು ಚಲಿಸುವುದು, ಮಾತನಾಡುವುದು, ಯೋಚಿಸುವುದನ್ನು ಇದು ನಿಯಂತ್ರಿಸುತ್ತದೆ.", "இது உங்கள் மூளை. நீங்கள் அசைவது, பேசுவது, சிந்திப்பதை இது கட்டுப்படுத்துகிறது."),
    problem: { focus: "clot", text: T("This dark spot is the clot. It blocked an artery, so blood could not reach part of the brain.", "ಈ ಕಪ್ಪು ಚುಕ್ಕೆ ಹೆಪ್ಪುಗಟ್ಟಿದ ರಕ್ತ. ಇದು ಒಂದು ಧಮನಿಯನ್ನು ತಡೆದಿದ್ದರಿಂದ ಮೆದುಳಿನ ಒಂದು ಭಾಗಕ್ಕೆ ರಕ್ತ ತಲುಪಲಿಲ್ಲ.", "இந்தக் கருப்புப் புள்ளி இரத்த உறைவு. இது ஒரு தமனியைத் தடுத்ததால் மூளையின் ஒரு பகுதிக்கு இரத்தம் செல்லவில்லை.") },
    effect: { focus: "area", text: T("This darker part did not get blood and was hurt. Your scan shows a {size} area. This part helps control movement and speech, so these can be affected.", "ಈ ಕಪ್ಪು ಭಾಗಕ್ಕೆ ರಕ್ತ ಸಿಗದೆ ಹಾನಿಯಾಗಿದೆ. ನಿಮ್ಮ ಸ್ಕ್ಯಾನ್ {size} ಭಾಗ ತೋರಿಸುತ್ತದೆ. ಈ ಭಾಗ ಚಲನೆ ಮತ್ತು ಮಾತನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಹಾಗಾಗಿ ಇವು ಬಾಧಿತವಾಗಬಹುದು.", "இந்த இருண்ட பகுதிக்கு இரத்தம் கிடைக்காமல் பாதிக்கப்பட்டது. உங்கள் ஸ்கேன் {size} பகுதியைக் காட்டுகிறது. இந்தப் பகுதி அசைவையும் பேச்சையும் கட்டுப்படுத்த உதவுகிறது, அதனால் இவை பாதிக்கப்படலாம்.") },
  },
};

const SIDE = { left: T("left", "ಎಡ", "இடது"), right: T("right", "ಬಲ", "வலது") };
const SIZE = { "0.2": T("small", "ಸಣ್ಣ", "சிறிய"), "0.5": T("medium", "ಮಧ್ಯಮ", "நடுத்தர"), "0.85": T("large", "ದೊಡ್ಡ", "பெரிய") };

// cond = the CONDITIONS entry, values = report values, pins = doctor notes [{p:[x,y,z], t:"text"}]
export function buildTour(cond, values, pins, t) {
  const spec = CASES[cond.id], o = ORG[cond.id];
  const py = spec.py ? Math.round(spec.py(values)) : "";
  const vars = { ...values, py, side: values.side ? t(SIDE[values.side]) : "", size: values.size ? t(SIZE[values.size] || SIZE["0.5"]) : "" };
  const pick = (x) => (typeof x === "function" ? x(values) : x);
  const [band, bandText] = spec.band.call(spec, values);
  const steps = [];
  steps.push({ kind: "intro", title: L.you, text: fill(o.intro, vars), focus: null });
  const pr = pick(o.problem), ef = pick(o.effect);
  steps.push({ kind: "problem", title: L.problem, text: fill(pr.text, vars), extra: bandText, band, focus: pr.focus });
  steps.push({ kind: "effect", title: L.effect, text: fill(ef.text, vars), focus: ef.focus });
  (pins || []).forEach((p, i) => steps.push({ kind: "note", title: L.note, num: i + 1, text: { en: p.t, kn: p.t, ta: p.t }, focus: { p: p.p, n: p.n } }));
  const later = spec.timeline.call(spec, values, false, 5), better = spec.timeline.call(spec, values, true, 5);
  steps.push({ kind: "later", title: L.later, text: later.text, prefix: L.in5, focus: pr.focus, timeline: { treat: false, t: 5 } });
  steps.push({ kind: "treat", title: L.treat, text: better.text, prefix: L.in5, focus: pr.focus, timeline: { treat: true, t: 5 } });
  const todo = cond.treatment.slice(0, 3).map((s) => s.title);
  steps.push({ kind: "todo", title: L.todo, list: todo, text: cond.treatment[0].text, focus: null, timeline: { treat: true, t: 0 } });
  steps.push({ kind: "help", title: L.help, text: cond.warning, focus: null });
  return steps;
}

// text a step shows (and speaks), in the chosen language
export function stepText(step, t) {
  let s = (step.prefix ? t(step.prefix) : "") + t(step.text);
  if (step.extra) s += " " + t(step.extra);
  if (step.list) s = step.list.map((x) => "• " + t(x)).join("\n") + "\n" + t(step.text);
  return s;
}
