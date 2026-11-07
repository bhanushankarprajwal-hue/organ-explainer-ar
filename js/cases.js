// =============================================================
// My Report: report fields, simple explanations and the timeline
// for each organ. Text: en / kn / ta  (Tamil: needs checking).
// The numbers are general education values, not a prediction.
// =============================================================
const T = (en, kn, ta) => ({ en, kn, ta });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const CASE_UI = {
  title: T("My report", "ನನ್ನ ವರದಿ", "என் அறிக்கை"),
  sub: T("Enter the values from the patient’s report. The 3D organ changes to match.", "ರೋಗಿಯ ವರದಿಯ ಮೌಲ್ಯಗಳನ್ನು ಹಾಕಿ. 3D ಅಂಗ ಅದಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಗುತ್ತದೆ.", "நோயாளியின் அறிக்கையில் உள்ள மதிப்புகளை உள்ளிடுங்கள். 3D உறுப்பு அதற்கேற்ப மாறும்."),
  details: T("Report details", "ವರದಿಯ ವಿವರ", "அறிக்கை விவரம்"),
  means: T("What this means", "ಇದರ ಅರ್ಥ ಏನು", "இதன் பொருள் என்ன"),
  timeline: T("What happens next", "ಮುಂದೆ ಏನಾಗುತ್ತದೆ", "அடுத்து என்ன நடக்கும்"),
  noChange: T("If nothing changes", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ", "எதுவும் மாறவில்லை என்றால்"),
  withTreat: T("With treatment", "ಚಿಕಿತ್ಸೆಯೊಂದಿಗೆ", "சிகிச்சையுடன்"),
  now: T("Now", "ಈಗ", "இப்போது"),
  years: T("years", "ವರ್ಷ", "ஆண்டுகள்"),
  year: T("year", "ವರ್ಷ", "ஆண்டு"),
  months: T("months", "ತಿಂಗಳು", "மாதங்கள்"),
  play: T("▶ Play", "▶ ಪ್ಲೇ", "▶ இயக்கு"),
  pause: T("⏸ Pause", "⏸ ನಿಲ್ಲಿಸಿ", "⏸ நிறுத்து"),
  showHealthy: T("Show healthy next to it", "ಪಕ್ಕದಲ್ಲಿ ಆರೋಗ್ಯಕರ ತೋರಿಸಿ", "அருகில் ஆரோக்கியமானதைக் காட்டு"),
  inAR: T("See my case in AR", "ನನ್ನ ಪ್ರಕರಣ AR ನಲ್ಲಿ", "என் நிலையை AR-ல் பார்"),
  quiz: T("Check understanding (quiz)", "ಅರ್ಥವಾಗಿದೆಯೇ ಪರೀಕ್ಷಿಸಿ (ಕ್ವಿಜ್)", "புரிதலைச் சோதி (வினாடி வினா)"),
  healthy: T("Healthy", "ಆರೋಗ್ಯಕರ", "ஆரோக்கியமானது"),
  yours: T("Your report", "ನಿಮ್ಮ ವರದಿ", "உங்கள் அறிக்கை"),
  mild: T("Mild", "ಸೌಮ್ಯ", "லேசானது"),
  moderate: T("Moderate", "ಮಧ್ಯಮ", "மிதமானது"),
  severe: T("Severe", "ತೀವ್ರ", "தீவிரமானது"),
  edu: T("General education, not a diagnosis. The doctor explains what it means for this patient.", "ಇದು ಸಾಮಾನ್ಯ ಶಿಕ್ಷಣ, ರೋಗನಿರ್ಣಯ ಅಲ್ಲ. ಈ ರೋಗಿಗೆ ಇದರ ಅರ್ಥವನ್ನು ವೈದ್ಯರು ವಿವರಿಸುತ್ತಾರೆ.", "இது பொதுக் கல்வி, நோயறிதல் அல்ல. இந்த நோயாளிக்கு இதன் பொருளை மருத்துவர் விளக்குவார்."),
  illus: T("Illustration only. Real changes are different for each person.", "ಇದು ಚಿತ್ರಣ ಮಾತ್ರ. ನಿಜವಾದ ಬದಲಾವಣೆ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಬೇರೆ.", "இது விளக்கப்படம் மட்டுமே. உண்மையான மாற்றம் ஒவ்வொருவருக்கும் வேறுபடும்."),
};

// ---------------- per organ ----------------
export const CASES = {
  heart: {
    fields: [
      { key: "block", type: "range", min: 0, max: 100, step: 5, value: 70, unit: "%", label: T("Blockage in the LAD artery (front of the heart)", "LAD ಧಮನಿಯಲ್ಲಿ ಅಡಚಣೆ (ಹೃದಯದ ಮುಂಭಾಗ)", "LAD தமனியில் அடைப்பு (இதயத்தின் முன்பகுதி)") },
    ],
    state: (v) => ({ block: v.block }),
    badge: (s) => Math.round(s.block) + "%",
    band: (v) => v.block < 50 ? ["mild", T("The artery is a little narrow. Blood still flows well. Healthy food, exercise and medicines can stop it from getting worse.",
        "ಧಮನಿ ಸ್ವಲ್ಪ ಕಿರಿದಾಗಿದೆ. ರಕ್ತ ಇನ್ನೂ ಚೆನ್ನಾಗಿ ಹರಿಯುತ್ತದೆ. ಆರೋಗ್ಯಕರ ಆಹಾರ, ವ್ಯಾಯಾಮ ಮತ್ತು ಔಷಧಿ ಇದು ಹೆಚ್ಚಾಗದಂತೆ ತಡೆಯುತ್ತದೆ.",
        "தமனி சற்று குறுகியுள்ளது. இரத்தம் இன்னும் நன்றாக ஓடுகிறது. ஆரோக்கிய உணவு, உடற்பயிற்சி, மருந்துகள் இது மோசமாகாமல் தடுக்கும்.")]
      : v.block < 70 ? ["moderate", T("The artery is quite narrow. During hard work or stress the heart muscle may not get enough blood, which can cause chest pain. Medicines and lifestyle changes are very important.",
        "ಧಮನಿ ಸಾಕಷ್ಟು ಕಿರಿದಾಗಿದೆ. ಕಠಿಣ ಕೆಲಸ ಅಥವಾ ಒತ್ತಡದಲ್ಲಿ ಹೃದಯ ಸ್ನಾಯುವಿಗೆ ಸಾಕಷ್ಟು ರಕ್ತ ಸಿಗದೆ ಎದೆ ನೋವು ಬರಬಹುದು. ಔಷಧಿ ಮತ್ತು ಜೀವನಶೈಲಿ ಬದಲಾವಣೆ ತುಂಬಾ ಮುಖ್ಯ.",
        "தமனி மிகவும் குறுகியுள்ளது. கடின வேலை அல்லது மன அழுத்தத்தின் போது இதயத் தசைக்குப் போதிய இரத்தம் கிடைக்காமல் நெஞ்சு வலி வரலாம். மருந்துகளும் வாழ்க்கை முறை மாற்றமும் மிக முக்கியம்.")]
      : ["severe", T("The artery is badly blocked. Part of the heart muscle gets too little blood. Doctors often open it with a balloon and stent, or with bypass surgery.",
        "ಧಮನಿ ತುಂಬಾ ಮುಚ್ಚಿಹೋಗಿದೆ. ಹೃದಯ ಸ್ನಾಯುವಿನ ಒಂದು ಭಾಗಕ್ಕೆ ತುಂಬಾ ಕಡಿಮೆ ರಕ್ತ ಸಿಗುತ್ತದೆ. ವೈದ್ಯರು ಹೆಚ್ಚಾಗಿ ಬಲೂನ್ ಮತ್ತು ಸ್ಟೆಂಟ್ ಅಥವಾ ಬೈಪಾಸ್ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯಿಂದ ತೆರೆಯುತ್ತಾರೆ.",
        "தமனி மோசமாக அடைபட்டுள்ளது. இதயத் தசையின் ஒரு பகுதிக்கு மிகக் குறைந்த இரத்தமே கிடைக்கிறது. மருத்துவர்கள் பெரும்பாலும் பலூன், ஸ்டென்ட் அல்லது பைபாஸ் அறுவை சிகிச்சை மூலம் திறக்கிறார்கள்.")],
    timeline: (v, treat, t) => {
      if (!treat) {
        const b = clamp(v.block + 3 * t, 0, 100);
        return { state: { block: b }, text: b >= 95
          ? T("If nothing changes, the plaque keeps growing. A full block or a burst plaque can cause a heart attack.", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ ಪ್ಲೇಕ್ ಬೆಳೆಯುತ್ತಲೇ ಇರುತ್ತದೆ. ಪೂರ್ಣ ಅಡಚಣೆ ಅಥವಾ ಪ್ಲೇಕ್ ಒಡೆದರೆ ಹೃದಯಾಘಾತ ಆಗಬಹುದು.", "எதுவும் மாறவில்லை என்றால் பிளேக் வளர்ந்துகொண்டே இருக்கும். முழு அடைப்பு அல்லது பிளேக் உடைந்தால் மாரடைப்பு வரலாம்.")
          : T("If nothing changes, the plaque slowly grows and the artery gets narrower.", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ ಪ್ಲೇಕ್ ನಿಧಾನವಾಗಿ ಬೆಳೆದು ಧಮನಿ ಇನ್ನಷ್ಟು ಕಿರಿದಾಗುತ್ತದೆ.", "எதுவும் மாறவில்லை என்றால் பிளேக் மெதுவாக வளர்ந்து தமனி மேலும் குறுகும்.") };
      }
      if (v.block >= 70) {
        const b = t < 0.2 ? v.block : 10;
        return { state: { block: b }, text: T("After a stent the artery is open again. Daily medicines and healthy habits help keep it open.", "ಸ್ಟೆಂಟ್ ನಂತರ ಧಮನಿ ಮತ್ತೆ ತೆರೆದಿರುತ್ತದೆ. ದಿನನಿತ್ಯದ ಔಷಧಿ ಮತ್ತು ಆರೋಗ್ಯಕರ ಅಭ್ಯಾಸ ಅದನ್ನು ತೆರೆದಿಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.", "ஸ்டென்ட்டுக்குப் பிறகு தமனி மீண்டும் திறந்திருக்கும். தினசரி மருந்துகளும் நல்ல பழக்கங்களும் அதைத் திறந்தே வைக்க உதவும்.") };
      }
      return { state: { block: clamp(v.block - Math.min(t, 5), 0, 100) }, text: T("With medicines and healthy habits the plaque can stop growing, and may even shrink a little.", "ಔಷಧಿ ಮತ್ತು ಆರೋಗ್ಯಕರ ಅಭ್ಯಾಸದಿಂದ ಪ್ಲೇಕ್ ಬೆಳೆಯುವುದು ನಿಲ್ಲಬಹುದು, ಸ್ವಲ್ಪ ಕಡಿಮೆಯೂ ಆಗಬಹುದು.", "மருந்துகளும் நல்ல பழக்கங்களும் இருந்தால் பிளேக் வளர்வது நிற்கலாம், சற்று குறையவும் செய்யலாம்.") };
    },
  },

  kidney: {
    fields: [
      { key: "mm", type: "range", min: 2, max: 25, step: 1, value: 8, unit: " mm", label: T("Stone size", "ಕಲ್ಲಿನ ಗಾತ್ರ", "கல்லின் அளவு") },
      { key: "where", type: "select", value: "kidney", options: [["kidney", T("Inside the kidney", "ಮೂತ್ರಪಿಂಡದ ಒಳಗೆ", "சிறுநீரகத்தின் உள்ளே")], ["ureter", T("Stuck in the tube to the bladder (ureter)", "ಮೂತ್ರಕೋಶಕ್ಕೆ ಹೋಗುವ ಕೊಳವೆಯಲ್ಲಿ (ಯುರೆಟರ್)", "சிறுநீர்ப்பைக்குச் செல்லும் குழாயில் (யூரிட்டர்)")]], label: T("Where is the stone", "ಕಲ್ಲು ಎಲ್ಲಿದೆ", "கல் எங்கே உள்ளது") },
      { key: "side", type: "select", value: "left", options: [["left", T("Left kidney", "ಎಡ ಮೂತ್ರಪಿಂಡ", "இடது சிறுநீரகம்")], ["right", T("Right kidney", "ಬಲ ಮೂತ್ರಪಿಂಡ", "வலது சிறுநீரகம்")]], label: T("Which kidney", "ಯಾವ ಮೂತ್ರಪಿಂಡ", "எந்த சிறுநீரகம்") },
    ],
    state: (v) => ({ mm: v.mm, where: v.where }),
    badge: (s) => (s.mm < 0.5 ? "0" : Math.round(s.mm)) + " mm",
    band: (v) => v.mm <= 5 ? ["mild", T("A small stone. It often passes out in the urine by itself. Drink plenty of water.", "ಸಣ್ಣ ಕಲ್ಲು. ಇದು ಹೆಚ್ಚಾಗಿ ಮೂತ್ರದ ಜೊತೆ ತಾನಾಗಿಯೇ ಹೊರಬರುತ್ತದೆ. ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.", "சிறிய கல். இது பெரும்பாலும் சிறுநீருடன் தானாகவே வெளியேறும். நிறைய தண்ணீர் குடியுங்கள்.")]
      : v.mm <= 10 ? ["moderate", T("A medium stone. It may pass with medicine and lots of water, or it may need a small procedure.", "ಮಧ್ಯಮ ಗಾತ್ರದ ಕಲ್ಲು. ಔಷಧಿ ಮತ್ತು ಹೆಚ್ಚು ನೀರಿನಿಂದ ಹೊರಬರಬಹುದು, ಅಥವಾ ಸಣ್ಣ ಚಿಕಿತ್ಸೆ ಬೇಕಾಗಬಹುದು.", "நடுத்தர அளவு கல். மருந்தும் நிறைய தண்ணீரும் இருந்தால் வெளியேறலாம், அல்லது சிறிய சிகிச்சை தேவைப்படலாம்.")]
      : ["severe", T("A large stone. It usually does not pass by itself. Doctors can break it with sound waves or take it out with a thin tube.", "ದೊಡ್ಡ ಕಲ್ಲು. ಇದು ಸಾಮಾನ್ಯವಾಗಿ ತಾನಾಗಿ ಹೊರಬರುವುದಿಲ್ಲ. ವೈದ್ಯರು ಧ್ವನಿ ತರಂಗದಿಂದ ಒಡೆಯಬಹುದು ಅಥವಾ ತೆಳುವಾದ ಕೊಳವೆಯಿಂದ ತೆಗೆಯಬಹುದು.", "பெரிய கல். இது பொதுவாகத் தானாக வெளியேறாது. மருத்துவர்கள் ஒலி அலைகளால் உடைக்கலாம் அல்லது மெல்லிய குழாய் மூலம் எடுக்கலாம்.")],
    timeline: (v, treat, t) => {
      if (!treat) {
        const mm = clamp(v.mm + 0.8 * t, 0, 25);
        return { state: { mm, where: v.where }, text: T("If nothing changes, stones can grow and block the flow of urine. This can cause strong pain and infection.", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ ಕಲ್ಲು ಬೆಳೆದು ಮೂತ್ರದ ಹರಿವನ್ನು ತಡೆಯಬಹುದು. ಇದರಿಂದ ತೀವ್ರ ನೋವು ಮತ್ತು ಸೋಂಕು ಆಗಬಹುದು.", "எதுவும் மாறவில்லை என்றால் கல் வளர்ந்து சிறுநீர் ஓட்டத்தைத் தடுக்கலாம். இதனால் கடும் வலியும் தொற்றும் வரலாம்.") };
      }
      const mm = t < 0.5 ? v.mm * (1 - t / 0.5) : 0;
      return { state: { mm, where: v.where }, text: T("After treatment the stone is gone. Drinking 2–3 litres of water a day helps stop new stones.", "ಚಿಕಿತ್ಸೆಯ ನಂತರ ಕಲ್ಲು ಇರುವುದಿಲ್ಲ. ದಿನಕ್ಕೆ 2–3 ಲೀಟರ್ ನೀರು ಕುಡಿದರೆ ಹೊಸ ಕಲ್ಲು ಆಗದಂತೆ ತಡೆಯಬಹುದು.", "சிகிச்சைக்குப் பிறகு கல் இருக்காது. தினமும் 2–3 லிட்டர் தண்ணீர் குடித்தால் புதிய கல் உருவாவதைத் தடுக்கலாம்.") };
    },
  },

  liver: {
    fields: [
      { key: "grade", type: "select", value: "2", options: [["1", T("Grade 1", "ಗ್ರೇಡ್ 1", "தரம் 1")], ["2", T("Grade 2", "ಗ್ರೇಡ್ 2", "தரம் 2")], ["3", T("Grade 3", "ಗ್ರೇಡ್ 3", "தரம் 3")]], label: T("Fatty liver grade (from the scan)", "ಕೊಬ್ಬಿನ ಯಕೃತ್ತಿನ ಗ್ರೇಡ್ (ಸ್ಕ್ಯಾನ್‌ನಿಂದ)", "கொழுப்பு கல்லீரல் தரம் (ஸ்கேனிலிருந்து)") },
    ],
    state: (v) => ({ grade: +v.grade }),
    badge: (s) => "G" + (Math.round(s.grade * 10) / 10),
    band: (v) => v.grade == 1 ? ["mild", T("Grade 1: a little extra fat in the liver. This usually gets better with healthy food and exercise.", "ಗ್ರೇಡ್ 1: ಯಕೃತ್ತಿನಲ್ಲಿ ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಕೊಬ್ಬು. ಆರೋಗ್ಯಕರ ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮದಿಂದ ಸಾಮಾನ್ಯವಾಗಿ ಸರಿಯಾಗುತ್ತದೆ.", "தரம் 1: கல்லீரலில் சற்று கூடுதல் கொழுப்பு. ஆரோக்கிய உணவும் உடற்பயிற்சியும் இருந்தால் பொதுவாகச் சரியாகும்.")]
      : v.grade == 2 ? ["moderate", T("Grade 2: more fat in the liver, and the liver can start to swell. Losing some weight, less sugar and no alcohol really help.", "ಗ್ರೇಡ್ 2: ಯಕೃತ್ತಿನಲ್ಲಿ ಹೆಚ್ಚು ಕೊಬ್ಬು, ಯಕೃತ್ತು ಊದಿಕೊಳ್ಳಲು ಶುರುವಾಗಬಹುದು. ಸ್ವಲ್ಪ ತೂಕ ಇಳಿಕೆ, ಕಡಿಮೆ ಸಕ್ಕರೆ ಮತ್ತು ಮದ್ಯ ಬೇಡ — ಇವು ತುಂಬಾ ಸಹಾಯ ಮಾಡುತ್ತವೆ.", "தரம் 2: கல்லீரலில் அதிக கொழுப்பு, கல்லீரல் வீங்கத் தொடங்கலாம். சிறிது எடை குறைப்பு, குறைந்த சர்க்கரை, மது இல்லாமை மிகவும் உதவும்.")]
      : ["severe", T("Grade 3: a lot of fat in the liver. Without change it can lead to scarring (cirrhosis). The good news: it can still improve.", "ಗ್ರೇಡ್ 3: ಯಕೃತ್ತಿನಲ್ಲಿ ತುಂಬಾ ಕೊಬ್ಬು. ಬದಲಾವಣೆ ಇಲ್ಲದಿದ್ದರೆ ಗಾಯದ ಗುರುತು (ಸಿರೋಸಿಸ್) ಆಗಬಹುದು. ಒಳ್ಳೆಯ ಸುದ್ದಿ: ಇನ್ನೂ ಸುಧಾರಿಸಬಹುದು.", "தரம் 3: கல்லீரலில் மிக அதிக கொழுப்பு. மாற்றம் இல்லையென்றால் வடு (சிரோசிஸ்) ஏற்படலாம். நல்ல செய்தி: இன்னும் மேம்படலாம்.")],
    timeline: (v, treat, t) => {
      const g0 = +v.grade;
      if (!treat) {
        const g = clamp(g0 + 0.25 * t, 0, 3);
        return { state: { grade: g }, text: t >= 6
          ? T("Over many years the liver can get scarred (cirrhosis). Scarring does not heal.", "ಹಲವು ವರ್ಷಗಳಲ್ಲಿ ಯಕೃತ್ತಿಗೆ ಗಾಯದ ಗುರುತು (ಸಿರೋಸಿಸ್) ಆಗಬಹುದು. ಅದು ಗುಣವಾಗುವುದಿಲ್ಲ.", "பல ஆண்டுகளில் கல்லீரலில் வடு (சிரோசிஸ்) ஏற்படலாம். வடு குணமாகாது.")
          : T("If nothing changes, more fat builds up and the liver swells.", "ಏನೂ ಬದಲಾಗದಿದ್ದರೆ ಇನ್ನಷ್ಟು ಕೊಬ್ಬು ಸೇರಿ ಯಕೃತ್ತು ಊದುತ್ತದೆ.", "எதுவும் மாறவில்லை என்றால் மேலும் கொழுப்பு சேர்ந்து கல்லீரல் வீங்கும்.") };
      }
      return { state: { grade: clamp(g0 - 0.6 * t, 0, 3) }, text: T("With weight loss and exercise, liver fat can go down within months to a few years.", "ತೂಕ ಇಳಿಕೆ ಮತ್ತು ವ್ಯಾಯಾಮದಿಂದ ಕೆಲವು ತಿಂಗಳಿಂದ ಕೆಲವು ವರ್ಷಗಳಲ್ಲಿ ಯಕೃತ್ತಿನ ಕೊಬ್ಬು ಕಡಿಮೆಯಾಗಬಹುದು.", "எடை குறைப்பும் உடற்பயிற்சியும் இருந்தால் சில மாதங்கள் முதல் சில ஆண்டுகளில் கல்லீரல் கொழுப்பு குறையலாம்.") };
    },
  },

  lungs: {
    fields: [
      { key: "years", type: "range", min: 0, max: 40, step: 1, value: 15, unit: "", label: T("Years of smoking", "ಧೂಮಪಾನ ಮಾಡಿದ ವರ್ಷಗಳು", "புகைபிடித்த ஆண்டுகள்") },
      { key: "perDay", type: "range", min: 0, max: 40, step: 1, value: 10, unit: "", label: T("Cigarettes a day", "ದಿನಕ್ಕೆ ಸಿಗರೇಟುಗಳು", "நாளொன்றுக்கு சிகரெட்டுகள்") },
    ],
    py: (v) => (v.years * v.perDay) / 20,
    state(v) { return { sev: clamp(this.py(v) / 40, 0, 1) }; },
    badge: (s) => Math.round(s.sev * 40) + " pack-yrs",
    band(v) { const p = this.py(v); return p < 10 ? ["mild", T("Some damage has started. The lungs can heal a lot if smoking stops now.", "ಸ್ವಲ್ಪ ಹಾನಿ ಶುರುವಾಗಿದೆ. ಈಗಲೇ ಧೂಮಪಾನ ನಿಲ್ಲಿಸಿದರೆ ಶ್ವಾಸಕೋಶಗಳು ಸಾಕಷ್ಟು ಗುಣವಾಗಬಹುದು.", "சில சேதம் தொடங்கியுள்ளது. இப்போதே புகைப்பதை நிறுத்தினால் நுரையீரல் நிறைய குணமாகும்.")]
      : p <= 20 ? ["moderate", T("Tar is building up and the tiny air sacs are getting hurt. Breathing may feel harder when walking fast or climbing stairs.", "ಟಾರ್ ಸೇರುತ್ತಿದೆ, ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳು ಹಾಳಾಗುತ್ತಿವೆ. ವೇಗವಾಗಿ ನಡೆದಾಗ ಅಥವಾ ಮೆಟ್ಟಿಲು ಹತ್ತಿದಾಗ ಉಸಿರಾಟ ಕಷ್ಟವಾಗಬಹುದು.", "தார் சேர்கிறது, சிறிய காற்றுப் பைகள் பாதிக்கப்படுகின்றன. வேகமாக நடக்கும்போது அல்லது படி ஏறும்போது மூச்சு விட கடினமாக இருக்கலாம்.")]
      : ["severe", T("Heavy smoking damage. The risk of long-term lung disease and lung cancer is much higher.", "ತೀವ್ರ ಧೂಮಪಾನ ಹಾನಿ. ದೀರ್ಘಕಾಲದ ಶ್ವಾಸಕೋಶ ಕಾಯಿಲೆ ಮತ್ತು ಶ್ವಾಸಕೋಶ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯ ತುಂಬಾ ಹೆಚ್ಚು.", "கடுமையான புகைப்பழக்க சேதம். நீண்டகால நுரையீரல் நோய் மற்றும் நுரையீரல் புற்றுநோய் அபாயம் மிக அதிகம்.")]; },
    timeline(v, treat, t) {
      const py0 = this.py(v);
      if (!treat) {
        const py = py0 + (v.perDay / 20) * t;
        return { state: { sev: clamp(py / 40, 0, 1) }, text: T("If smoking goes on, every year adds more tar and more damage.", "ಧೂಮಪಾನ ಮುಂದುವರಿದರೆ ಪ್ರತಿ ವರ್ಷ ಇನ್ನಷ್ಟು ಟಾರ್ ಮತ್ತು ಹಾನಿ ಸೇರುತ್ತದೆ.", "புகைப்பழக்கம் தொடர்ந்தால் ஒவ்வொரு ஆண்டும் மேலும் தார், மேலும் சேதம் சேரும்.") };
      }
      const sev = clamp(py0 / 40, 0, 1) * (1 - 0.35 * Math.min(1, t / 10));
      return { state: { sev }, text: t >= 9
        ? T("About 10 years after quitting, the risk of lung cancer is about half that of someone who still smokes.", "ಧೂಮಪಾನ ಬಿಟ್ಟ ಸುಮಾರು 10 ವರ್ಷಗಳ ನಂತರ ಶ್ವಾಸಕೋಶ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯ, ಇನ್ನೂ ಸೇದುವವರಿಗಿಂತ ಸುಮಾರು ಅರ್ಧ.", "புகைப்பதை நிறுத்தி சுமார் 10 ஆண்டுகளுக்குப் பிறகு, நுரையீரல் புற்றுநோய் அபாயம் இன்னும் புகைப்பவரை விட சுமார் பாதி.")
        : T("After quitting, coughing and breathing get better within months. The lungs slowly clean themselves.", "ಧೂಮಪಾನ ಬಿಟ್ಟ ನಂತರ ಕೆಲವು ತಿಂಗಳಲ್ಲಿ ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟ ಸುಧಾರಿಸುತ್ತದೆ. ಶ್ವಾಸಕೋಶಗಳು ನಿಧಾನವಾಗಿ ಸ್ವಚ್ಛವಾಗುತ್ತವೆ.", "புகைப்பதை நிறுத்திய சில மாதங்களில் இருமலும் மூச்சும் மேம்படும். நுரையீரல் மெதுவாகத் தன்னைச் சுத்தம் செய்யும்.") };
    },
  },

  brain: {
    fields: [
      { key: "size", type: "select", value: "0.5", options: [["0.2", T("Small area", "ಸಣ್ಣ ಭಾಗ", "சிறிய பகுதி")], ["0.5", T("Medium area", "ಮಧ್ಯಮ ಭಾಗ", "நடுத்தர பகுதி")], ["0.85", T("Large area", "ದೊಡ್ಡ ಭಾಗ", "பெரிய பகுதி")]], label: T("Size of the stroke area (from the scan)", "ಸ್ಟ್ರೋಕ್ ಭಾಗದ ಗಾತ್ರ (ಸ್ಕ್ಯಾನ್‌ನಿಂದ)", "பக்கவாதப் பகுதியின் அளவு (ஸ்கேனிலிருந்து)") },
    ],
    state: (v) => ({ size: +v.size, recover: 0 }),
    badge: (s, t) => t(s.size < 0.35 ? T("Small", "ಸಣ್ಣ", "சிறியது") : s.size < 0.7 ? T("Medium", "ಮಧ್ಯಮ", "நடுத்தரம்") : T("Large", "ದೊಡ್ಡ", "பெரியது"))
      + (s.recover > 0.05 ? " · " + t(T("rehab", "ಪುನರ್ವಸತಿ", "மறுவாழ்வு")) + " " + Math.round(s.recover * 100) + "%" : ""),
    band: (v) => +v.size < 0.35 ? ["mild", T("A small area of the brain was hurt. Effects may be mild, like weakness in one hand or the face.", "ಮೆದುಳಿನ ಸಣ್ಣ ಭಾಗಕ್ಕೆ ಹಾನಿಯಾಗಿದೆ. ಪರಿಣಾಮ ಸೌಮ್ಯವಾಗಿರಬಹುದು, ಒಂದು ಕೈ ಅಥವಾ ಮುಖದಲ್ಲಿ ದೌರ್ಬಲ್ಯದಂತೆ.", "மூளையின் சிறிய பகுதி பாதிக்கப்பட்டுள்ளது. விளைவுகள் லேசாக இருக்கலாம், ஒரு கை அல்லது முகத்தில் பலவீனம் போல.")]
      : +v.size < 0.7 ? ["moderate", T("A medium area was hurt. There may be weakness on one side of the body, or trouble speaking.", "ಮಧ್ಯಮ ಭಾಗಕ್ಕೆ ಹಾನಿಯಾಗಿದೆ. ದೇಹದ ಒಂದು ಬದಿಯಲ್ಲಿ ದೌರ್ಬಲ್ಯ ಅಥವಾ ಮಾತನಾಡಲು ತೊಂದರೆ ಇರಬಹುದು.", "நடுத்தர பகுதி பாதிக்கப்பட்டுள்ளது. உடலின் ஒரு பக்கத்தில் பலவீனம் அல்லது பேசுவதில் சிரமம் இருக்கலாம்.")]
      : ["severe", T("A large area was hurt. Effects can be serious. Rehab therapy for many months helps a lot.", "ದೊಡ್ಡ ಭಾಗಕ್ಕೆ ಹಾನಿಯಾಗಿದೆ. ಪರಿಣಾಮ ಗಂಭೀರವಾಗಿರಬಹುದು. ಹಲವು ತಿಂಗಳ ಪುನರ್ವಸತಿ ಚಿಕಿತ್ಸೆ ತುಂಬಾ ಸಹಾಯ ಮಾಡುತ್ತದೆ.", "பெரிய பகுதி பாதிக்கப்பட்டுள்ளது. விளைவுகள் தீவிரமாக இருக்கலாம். பல மாத மறுவாழ்வு சிகிச்சை மிகவும் உதவும்.")],
    timeline: (v, treat, t) => {
      if (!treat) return { state: { size: +v.size, recover: 0 }, text: T("Without treatment for blood pressure, sugar and cholesterol, the chance of another stroke stays high.", "ರಕ್ತದೊತ್ತಡ, ಸಕ್ಕರೆ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್‌ಗೆ ಚಿಕಿತ್ಸೆ ಇಲ್ಲದಿದ್ದರೆ ಮತ್ತೊಂದು ಸ್ಟ್ರೋಕ್ ಆಗುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಾಗಿಯೇ ಇರುತ್ತದೆ.", "இரத்த அழுத்தம், சர்க்கரை, கொலஸ்ட்ராலுக்கு சிகிச்சை இல்லையென்றால் மீண்டும் பக்கவாதம் வரும் வாய்ப்பு அதிகமாகவே இருக்கும்.") };
      return { state: { size: +v.size, recover: clamp(t / 1.5, 0, 1) }, text: T("Fast treatment can remove the clot. With rehab the brain learns new ways, and many skills come back. Medicines lower the chance of another stroke.", "ಬೇಗ ಚಿಕಿತ್ಸೆ ಸಿಕ್ಕರೆ ಹೆಪ್ಪುಗಟ್ಟಿದ ರಕ್ತ ತೆಗೆಯಬಹುದು. ಪುನರ್ವಸತಿಯಿಂದ ಮೆದುಳು ಹೊಸ ದಾರಿ ಕಲಿಯುತ್ತದೆ, ಹಲವು ಕೌಶಲ್ಯ ಮರಳಿ ಬರುತ್ತವೆ. ಔಷಧಿ ಮತ್ತೊಂದು ಸ್ಟ್ರೋಕ್ ಅಪಾಯ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.", "விரைவான சிகிச்சை இரத்த உறைவை அகற்றும். மறுவாழ்வினால் மூளை புதிய வழிகளைக் கற்கிறது, பல திறன்கள் திரும்ப வரும். மருந்துகள் மீண்டும் பக்கவாதம் வரும் வாய்ப்பைக் குறைக்கும்.") };
    },
  },
};
