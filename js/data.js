// =============================================================
// All the text and model info for the app lives in this file.
// Each text has: en = English, kn = Kannada, ta = Tamil.
// Tamil text NEEDS CHECKING by someone who reads Tamil.
// Each organ has two views:
//   outside = realistic model, inside = cut-open teaching model.
// position / normal = where a numbered dot sits on the model (meters).
// =============================================================

const UI_TEXT = {
  "bodyTitle": {"en": "Body AR", "kn": "ಬಾಡಿ AR", "ta": "உடல் AR"},
  "modeBody": {"en": "Body AR mirror", "kn": "ಬಾಡಿ AR ಕನ್ನಡಿ", "ta": "உடல் AR கண்ணாடி"},
  "handAR": {"en": "Hand AR", "kn": "ಕೈ AR", "ta": "கை AR"},
  "modeHand": {"en": "Hand AR on a table", "kn": "ಮೇಜಿನ ಮೇಲೆ ಕೈ AR", "ta": "மேசையில் கை AR"},
  "modeHandSub": {"en": "Place it, then move, zoom and touch it with your hand in the air", "kn": "ಇಟ್ಟು, ಗಾಳಿಯಲ್ಲಿ ಕೈಯಿಂದ ಸರಿಸಿ, ದೊಡ್ಡದು ಮಾಡಿ, ಮುಟ್ಟಿ", "ta": "வைத்து, காற்றில் கையால் நகர்த்தி, பெரிதாக்கி, தொடுங்கள்"},
  "modeBodySub": {"en": "See organs on a real person", "kn": "ನಿಜವಾದ ವ್ಯಕ್ತಿಯ ಮೇಲೆ ಅಂಗಗಳನ್ನು ನೋಡಿ", "ta": "உண்மையான நபரின் மேல் உறுப்புகளைப் பாருங்கள்"},
  "bodyHint": {"en": "Stand 1–2 metres from the camera. Keep your head and waist in view.", "kn": "ಕ್ಯಾಮೆರಾದಿಂದ 1–2 ಮೀಟರ್ ದೂರ ನಿಲ್ಲಿ. ತಲೆ ಮತ್ತು ಸೊಂಟ ಕಾಣುವಂತೆ ಇರಲಿ.", "ta": "கேமராவிலிருந்து 1–2 மீட்டர் தூரத்தில் நில்லுங்கள். தலையும் இடுப்பும் தெரியட்டும்."},
  "bodyFound": {"en": "Tap an organ, or point at it with your finger.", "kn": "ಅಂಗವನ್ನು ಒತ್ತಿ, ಅಥವಾ ಬೆರಳಿನಿಂದ ಅದರತ್ತ ತೋರಿಸಿ.", "ta": "உறுப்பைத் தொடுங்கள், அல்லது விரலால் அதைச் சுட்டிக்காட்டுங்கள்."},
  "bodyPinch": {"en": "Pinch and move your hand to turn it. Pinch with two hands to zoom.", "kn": "ತಿರುಗಿಸಲು ಚಿಟಿಕೆ ಹಿಡಿದು ಕೈ ಸರಿಸಿ. ದೊಡ್ಡದು ಮಾಡಲು ಎರಡೂ ಕೈಯಿಂದ ಚಿಟಿಕೆ ಹಿಡಿಯಿರಿ.", "ta": "சுழற்றக் கிள்ளிப் பிடித்துக் கையை நகர்த்துங்கள். பெரிதாக்க இரு கைகளாலும் கிள்ளுங்கள்."},
  "flipCam": {"en": "Switch camera", "kn": "ಕ್ಯಾಮೆರಾ ಬದಲಿಸಿ", "ta": "கேமராவை மாற்று"},
  "handsOn": {"en": "Hand control on", "kn": "ಕೈ ನಿಯಂತ್ರಣ ಆನ್", "ta": "கை கட்டுப்பாடு ஆன்"},
  "handsOff": {"en": "Hand control off", "kn": "ಕೈ ನಿಯಂತ್ರಣ ಆಫ್", "ta": "கை கட்டுப்பாடு ஆஃப்"},
  "startCamera": {"en": "Start camera", "kn": "ಕ್ಯಾಮೆರಾ ಶುರು ಮಾಡಿ", "ta": "கேமராவைத் தொடங்கு"},
  "camError": {"en": "Could not open the camera. Allow camera access in the browser and try again.", "kn": "ಕ್ಯಾಮೆರಾ ತೆರೆಯಲಾಗಲಿಲ್ಲ. ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಅನುಮತಿ ಕೊಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", "ta": "கேமராவைத் திறக்க முடியவில்லை. உலாவியில் கேமரா அனுமதி தந்து மீண்டும் முயலுங்கள்."},
  "loadingBody": {"en": "Loading body tracking and 3D organs…", "kn": "ದೇಹ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು 3D ಅಂಗಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ…", "ta": "உடல் கண்காணிப்பும் 3D உறுப்புகளும் ஏற்றப்படுகின்றன…"},
  "bodyNote": {"en": "Organ positions are approximate, for learning only.", "kn": "ಅಂಗಗಳ ಸ್ಥಾನಗಳು ಅಂದಾಜು ಮಾತ್ರ, ಕಲಿಕೆಗಾಗಿ.", "ta": "உறுப்புகளின் இடங்கள் தோராயமானவை, கற்றலுக்காக மட்டும்."},
  "partsOf": {"en": "Parts", "kn": "ಭಾಗಗಳು", "ta": "பகுதிகள்"},
  "kidneys": {"en": "Kidneys (at the back)", "kn": "ಮೂತ್ರಪಿಂಡಗಳು (ಹಿಂಭಾಗದಲ್ಲಿ)", "ta": "சிறுநீரகங்கள் (பின்புறம்)"},
  "scanTitle": {"en": "Scan an AR card", "kn": "AR ಕಾರ್ಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", "ta": "AR அட்டையை ஸ்கேன் செய்"},
  "scanPoint": {"en": "Point your camera at a card", "kn": "ಕ್ಯಾಮೆರಾವನ್ನು ಕಾರ್ಡ್‌ನತ್ತ ತೋರಿಸಿ", "ta": "கேமராவை அட்டையை நோக்கிக் காட்டுங்கள்"},
  "scanHint": {"en": "Hold the card flat and keep it inside the frame. The organ will appear on top of it.", "kn": "ಕಾರ್ಡ್ ಅನ್ನು ಸಮತಟ್ಟಾಗಿ ಹಿಡಿದು ಚೌಕಟ್ಟಿನೊಳಗೆ ಇಡಿ. ಅಂಗ ಅದರ ಮೇಲೆ ಕಾಣಿಸುತ್ತದೆ.", "ta": "அட்டையைச் சமமாகப் பிடித்துச் சட்டத்துக்குள் வையுங்கள். உறுப்பு அதன் மேல் தோன்றும்."},
  "getCards": {"en": "Get the cards", "kn": "ಕಾರ್ಡ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ", "ta": "அட்டைகளைப் பெறுங்கள்"},
  "loadingAR": {"en": "Starting the camera and loading 3D organs…", "kn": "ಕ್ಯಾಮೆರಾ ಶುರುವಾಗುತ್ತಿದೆ, 3D ಅಂಗಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ…", "ta": "கேமரா தொடங்குகிறது, 3D உறுப்புகள் ஏற்றப்படுகின்றன…"},
  "openLesson": {"en": "Open full lesson", "kn": "ಪೂರ್ಣ ಪಾಠ ತೆರೆಯಿರಿ", "ta": "முழுப் பாடத்தைத் திற"},
  "cardsTitle": {"en": "AR cards", "kn": "AR ಕಾರ್ಡ್‌ಗಳು", "ta": "AR அட்டைகள்"},
  "cardsHint": {"en": "Print these cards, or open one on another phone or screen. Then tap “Scan an AR card” and point your camera at it. It also works with a laptop webcam.", "kn": "ಈ ಕಾರ್ಡ್‌ಗಳನ್ನು ಮುದ್ರಿಸಿ, ಅಥವಾ ಇನ್ನೊಂದು ಫೋನ್ ಅಥವಾ ಪರದೆಯಲ್ಲಿ ತೆರೆಯಿರಿ. ನಂತರ “AR ಕಾರ್ಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ” ಒತ್ತಿ, ಕ್ಯಾಮೆರಾವನ್ನು ಅದರತ್ತ ತೋರಿಸಿ. ಲ್ಯಾಪ್‌ಟಾಪ್ ವೆಬ್‌ಕ್ಯಾಮ್‌ನಲ್ಲೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ.", "ta": "இந்த அட்டைகளை அச்சிடுங்கள், அல்லது வேறு போன் அல்லது திரையில் திறங்கள். பின் “AR அட்டையை ஸ்கேன் செய்” தொட்டு, கேமராவை அதை நோக்கிக் காட்டுங்கள். லேப்டாப் வெப்கேமிலும் வேலை செய்யும்."},
  "printCards": {"en": "Print cards", "kn": "ಕಾರ್ಡ್ ಮುದ್ರಿಸಿ", "ta": "அட்டைகளை அச்சிடு"},
  "startStory": {"en": "Start AR story", "kn": "AR ಕಥೆ ಶುರು ಮಾಡಿ", "ta": "AR கதையைத் தொடங்கு"},
  "storyStep": {"en": "Step", "kn": "ಹಂತ", "ta": "படி"},
  "of": {"en": "of", "kn": "/", "ta": "/"},
  "next": {"en": "Next", "kn": "ಮುಂದೆ", "ta": "அடுத்து"},
  "prev": {"en": "Back", "kn": "ಹಿಂದೆ", "ta": "பின்"},
  "finish": {"en": "Finish", "kn": "ಮುಗಿಸಿ", "ta": "முடி"},
  "closeStory": {"en": "Close story", "kn": "ಕಥೆ ಮುಚ್ಚಿ", "ta": "கதையை மூடு"},
  "voiceOn": {"en": "Voice on", "kn": "ಧ್ವನಿ ಆನ್", "ta": "குரல் ஆன்"},
  "voiceOff": {"en": "Voice off", "kn": "ಧ್ವನಿ ಆಫ್", "ta": "குரல் ஆஃப்"},
  "noVoice": {"en": "This phone has no voice for this language. Showing text only.", "kn": "ಈ ಫೋನ್‌ನಲ್ಲಿ ಈ ಭಾಷೆಗೆ ಧ್ವನಿ ಇಲ್ಲ. ಪಠ್ಯ ಮಾತ್ರ ತೋರಿಸಲಾಗುತ್ತಿದೆ.", "ta": "இந்த போனில் இந்த மொழிக்குக் குரல் இல்லை. உரை மட்டும் காட்டப்படுகிறது."},
  "storyHint": {"en": "Place it on a table with “View in AR”. Tap Next to move through the story.", "kn": "“AR ನಲ್ಲಿ ನೋಡಿ” ಮೂಲಕ ಮೇಜಿನ ಮೇಲೆ ಇಡಿ. ಕಥೆಯಲ್ಲಿ ಮುಂದೆ ಹೋಗಲು “ಮುಂದೆ” ಒತ್ತಿ.", "ta": "“AR-ல் பார்க்க” மூலம் மேஜையில் வையுங்கள். கதையில் முன்னேற “அடுத்து” தொடுங்கள்."},
  "heroTitle": {"en": "See inside the body. Right on your table.", "kn": "ದೇಹದ ಒಳಗನ್ನು ನೋಡಿ. ನಿಮ್ಮ ಮೇಜಿನ ಮೇಲೆಯೇ.", "ta": "உடலின் உள்ளே பாருங்கள். உங்கள் மேஜையிலேயே."},
  "heroSub": {"en": "An augmented reality guide that places real 3D organs in your room, shows how a disease changes them, and explains it step by step.", "kn": "ನಿಜವಾದ 3D ಅಂಗಗಳನ್ನು ನಿಮ್ಮ ಕೋಣೆಯಲ್ಲಿ ಇರಿಸಿ, ರೋಗ ಅವುಗಳನ್ನು ಹೇಗೆ ಬದಲಾಯಿಸುತ್ತದೆ ಎಂದು ತೋರಿಸಿ, ಹಂತ ಹಂತವಾಗಿ ವಿವರಿಸುವ ವರ್ಧಿತ ರಿಯಾಲಿಟಿ ಮಾರ್ಗದರ್ಶಿ.", "ta": "உண்மையான 3D உறுப்புகளை உங்கள் அறையில் வைத்து, நோய் அவற்றை எப்படி மாற்றுகிறது என்று காட்டி, படிப்படியாக விளக்கும் மேம்படுத்தப்பட்ட யதார்த்த வழிகாட்டி."},
  "modeTable": {"en": "Place on a table", "kn": "ಮೇಜಿನ ಮೇಲೆ ಇಡಿ", "ta": "மேஜையில் வை"},
  "modeTableSub": {"en": "Pick an organ, then tap View in AR", "kn": "ಅಂಗ ಆರಿಸಿ, ನಂತರ AR ನಲ್ಲಿ ನೋಡಿ ಒತ್ತಿ", "ta": "உறுப்பைத் தேர்ந்தெடுத்து AR-ல் பார்க்க தொடுங்கள்"},
  "modeScan": {"en": "Scan an AR card", "kn": "AR ಕಾರ್ಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", "ta": "AR அட்டையை ஸ்கேன் செய்"},
  "modeScanSub": {"en": "Phone or laptop camera", "kn": "ಫೋನ್ ಅಥವಾ ಲ್ಯಾಪ್‌ಟಾಪ್ ಕ್ಯಾಮೆರಾ", "ta": "போன் அல்லது லேப்டாப் கேமரா"},
  "modeStory": {"en": "Guided AR story", "kn": "ಮಾರ್ಗದರ್ಶಿತ AR ಕಥೆ", "ta": "வழிகாட்டப்பட்ட AR கதை"},
  "modeStorySub": {"en": "Step by step, with voice", "kn": "ಹಂತ ಹಂತವಾಗಿ, ಧ್ವನಿಯೊಂದಿಗೆ", "ta": "படிப்படியாக, குரலுடன்"},
  "explore": {"en": "Explore", "kn": "ಅನ್ವೇಷಿಸಿ", "ta": "ஆராய்"},
  "learnMore": {"en": "Learn more", "kn": "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", "ta": "மேலும் அறிக"},
  "pauseMotion": { "en": "Pause movement", "kn": "ಚಲನೆ ನಿಲ್ಲಿಸಿ", "ta": "அசைவை நிறுத்து" },
  "playMotion": { "en": "Play movement", "kn": "ಚಲನೆ ಶುರು ಮಾಡಿ", "ta": "அசைவைத் தொடங்கு" },
  "appName": {
    "en": "Organ Explainer AR",
    "kn": "ಅಂಗ ವಿವರಕ AR",
    "ta": "உறுப்பு விளக்கி AR"
  },
  "tagline": {
    "en": "See your organs in 3D. Understand your condition simply.",
    "kn": "ನಿಮ್ಮ ಅಂಗಗಳನ್ನು 3D ಯಲ್ಲಿ ನೋಡಿ. ನಿಮ್ಮ ಕಾಯಿಲೆಯನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    "ta": "உங்கள் உறுப்புகளை 3D-யில் பாருங்கள். உங்கள் நோயை எளிதாகப் புரிந்துகொள்ளுங்கள்."
  },
  "pickOne": {
    "en": "Choose an organ to explore",
    "kn": "ನೋಡಲು ಒಂದು ಅಂಗವನ್ನು ಆರಿಸಿ",
    "ta": "பார்க்க ஒரு உறுப்பைத் தேர்ந்தெடுங்கள்"
  },
  "disclaimer": {
    "en": "For education only. This app does not diagnose any disease. Please talk to your doctor about your health.",
    "kn": "ಇದು ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಮಾತ್ರ. ಈ ಆ್ಯಪ್ ಯಾವುದೇ ರೋಗವನ್ನು ಪತ್ತೆ ಮಾಡುವುದಿಲ್ಲ. ನಿಮ್ಮ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ನಿಮ್ಮ ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ.",
    "ta": "இது கல்விக்காக மட்டுமே. இந்த ஆப் எந்த நோயையும் கண்டறியாது. உங்கள் உடல்நலம் பற்றி உங்கள் மருத்துவரிடம் பேசுங்கள்."
  },
  "back": {
    "en": "Back",
    "kn": "ಹಿಂದೆ",
    "ta": "பின்செல்"
  },
  "healthy": {
    "en": "Healthy",
    "kn": "ಆರೋಗ್ಯಕರ",
    "ta": "ஆரோக்கியமானது"
  },
  "withCondition": {
    "en": "With the condition",
    "kn": "ಕಾಯಿಲೆ ಇರುವಾಗ",
    "ta": "நோய் உள்ளபோது"
  },
  "aboutOrgan": {
    "en": "About this organ",
    "kn": "ಈ ಅಂಗದ ಬಗ್ಗೆ",
    "ta": "இந்த உறுப்பைப் பற்றி"
  },
  "whatIsIt": {
    "en": "What is the condition?",
    "kn": "ಈ ಕಾಯಿಲೆ ಏನು?",
    "ta": "இந்த நோய் என்ன?"
  },
  "tapHint": {
    "en": "Drag to turn. Pinch or scroll to zoom. Tap a numbered dot to learn about that part.",
    "kn": "ತಿರುಗಿಸಲು ಎಳೆಯಿರಿ. ದೊಡ್ಡದು ಮಾಡಲು ಎರಡು ಬೆರಳಿನಿಂದ ಹಿಗ್ಗಿಸಿ. ಆ ಭಾಗದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಸಂಖ್ಯೆಯ ಚುಕ್ಕೆಯನ್ನು ಒತ್ತಿ.",
    "ta": "சுழற்ற இழுங்கள். பெரிதாக்க இரண்டு விரல்களால் விரியுங்கள். அந்தப் பகுதியைப் பற்றி அறிய எண் புள்ளியைத் தொடுங்கள்."
  },
  "viewAR": {
    "en": "View in AR",
    "kn": "AR ನಲ್ಲಿ ನೋಡಿ",
    "ta": "AR-ல் பார்க்க"
  },
  "viewBothAR": {
    "en": "View both on your table (AR)",
    "kn": "ಎರಡನ್ನೂ ನಿಮ್ಮ ಮೇಜಿನ ಮೇಲೆ ನೋಡಿ (AR)",
    "ta": "இரண்டையும் உங்கள் மேஜையில் பாருங்கள் (AR)"
  },
  "reset": {
    "en": "Reset view",
    "kn": "ಮೊದಲಿನಂತೆ",
    "ta": "மீட்டமை"
  },
  "treatment": {
    "en": "How treatment helps",
    "kn": "ಚಿಕಿತ್ಸೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    "ta": "சிகிச்சை எப்படி உதவுகிறது"
  },
  "warning": {
    "en": "Get help now",
    "kn": "ತಕ್ಷಣ ಸಹಾಯ ಪಡೆಯಿರಿ",
    "ta": "உடனே உதவி பெறுங்கள்"
  },
  "placeholder": {
    "en": "Simple placeholder shape. A detailed 3D model will be added later.",
    "kn": "ಇದು ಸರಳ ತಾತ್ಕಾಲಿಕ ಆಕಾರ. ವಿವರವಾದ 3D ಮಾದರಿಯನ್ನು ನಂತರ ಸೇರಿಸಲಾಗುವುದು.",
    "ta": "இது எளிய தற்காலிக வடிவம். விரிவான 3D மாதிரி பின்னர் சேர்க்கப்படும்."
  },
  "realModel": {
    "en": "3D model",
    "kn": "3D ಮಾದರಿ",
    "ta": "3D மாதிரி"
  },
  "placeholderTag": {
    "en": "Placeholder",
    "kn": "ತಾತ್ಕಾಲಿಕ",
    "ta": "தற்காலிகம்"
  },
  "noAR": {
    "en": "AR is not available on this device. Try Chrome on an Android phone.",
    "kn": "ಈ ಸಾಧನದಲ್ಲಿ AR ಲಭ್ಯವಿಲ್ಲ. Android ಫೋನ್‌ನಲ್ಲಿ Chrome ಬಳಸಿ.",
    "ta": "இந்தச் சாதனத்தில் AR இல்லை. Android போனில் Chrome-ஐ முயற்சிக்கவும்."
  },
  "closeInfo": {
    "en": "Close",
    "kn": "ಮುಚ್ಚಿ",
    "ta": "மூடு"
  },
  "parts": {
    "en": "parts to explore",
    "kn": "ನೋಡಬಹುದಾದ ಭಾಗಗಳು",
    "ta": "ஆராய வேண்டிய பகுதிகள்"
  },
  "credits": {
    "en": "3D model credits",
    "kn": "3D ಮಾದರಿ ಕೃಪೆ",
    "ta": "3D மாதிரி நன்றி"
  },
  "tamilCheck": {
    "en": "Tamil text is a draft and needs checking.",
    "kn": "",
    "ta": "தமிழ் உரை வரைவு மட்டுமே. சரிபார்க்க வேண்டும்."
  },
  "outsideView": {
    "en": "Outside view",
    "kn": "ಹೊರಗಿನ ನೋಟ",
    "ta": "வெளிப்புறத் தோற்றம்"
  },
  "insideView": {
    "en": "Inside view",
    "kn": "ಒಳಗಿನ ನೋಟ",
    "ta": "உள்புறத் தோற்றம்"
  },
  "outsideHint": {
    "en": "The real look of the organ, as a doctor would see it.",
    "kn": "ವೈದ್ಯರು ನೋಡುವಂತೆ ಅಂಗದ ನಿಜವಾದ ರೂಪ.",
    "ta": "மருத்துவர் பார்ப்பது போல உறுப்பின் உண்மையான தோற்றம்."
  },
  "insideHint": {
    "en": "A cut-open teaching model, so you can see the parts inside.",
    "kn": "ಒಳಗಿನ ಭಾಗಗಳನ್ನು ನೋಡಲು ಕತ್ತರಿಸಿ ತೆರೆದ ಕಲಿಕೆಯ ಮಾದರಿ.",
    "ta": "உள்ளே உள்ள பகுதிகளைப் பார்க்க, வெட்டித் திறந்த கற்பித்தல் மாதிரி."
  }
};

// Models from Sketchfab. Disease parts and colours were added for this project.
const CREDITS = [
  {
    "what": "Heart (outside)",
    "name": "Realistic Human Heart",
    "author": "neshallads",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/realistic-human-heart-3f8072336ce94d18b3d0d055a1ece089"
  },
  {
    "what": "Heart (inside)",
    "name": "Human Heart Internal Structure 3D Model",
    "author": "Haiqa Arif",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/human-heart-internal-structure-3d-model-21d346f72230432e8ed5fe448b03cca5"
  },
  {
    "what": "Brain (outside)",
    "name": "Human brain, Cerebrum & Brainstem",
    "author": "FrankJohansson",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/human-brain-cerebrum-brainstem-0aa0e33c5c854d1bab7bac9e1c7acaec"
  },
  {
    "what": "Brain (inside)",
    "name": "Human Brain Model - Midsagittal Section",
    "author": "3-D Photogrammetry Anatomical Models",
    "license": "CC BY-NC-SA 4.0",
    "url": "https://sketchfab.com/3d-models/human-brain-model-midsagittal-section-f435004b87bb4792877404f8ccd4c6aa"
  },
  {
    "what": "Lungs (outside)",
    "name": "Realistic Human Lungs",
    "author": "neshallads",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/realistic-human-lungs-ce09f4099a68467880f46e61eb9a3531"
  },
  {
    "what": "Lungs (inside)",
    "name": "Respiratory System",
    "author": "Vikrama Raghuraman",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/respiratory-system-a7ac43a140644662a9b896b8a8a10f57"
  },
  {
    "what": "Liver (outside)",
    "name": "Human liver and gallbladder",
    "author": "ElliotSS",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/human-liver-and-gallbladder-6c4e9bd0d49f4828b804259330c0c6c4"
  },
  {
    "what": "Liver (inside)",
    "name": "Liver Segments",
    "author": "Dr. David Frias",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/liver-segments-4fa7acc0bbd449fb965fe41a6b5e6ee8"
  },
  {
    "what": "Kidney (outside)",
    "name": "Kidney Cross-section",
    "author": "Medulla",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/kidney-cross-section-b59cc02d4e964af7a2c1fcb0001919d8"
  },
  {
    "what": "Kidney (inside)",
    "name": "Kidney",
    "author": "cgmac",
    "license": "CC BY 4.0",
    "url": "https://sketchfab.com/3d-models/kidney-686992c2a7fb456eaa8997b0366f4062"
  }
];

const CONDITIONS = [
  {
    "id": "heart",
    "icon": "❤️",
    "organ": {
      "en": "Heart",
      "kn": "ಹೃದಯ",
      "ta": "இதயம்"
    },
    "name": {
      "en": "Blocked coronary artery",
      "kn": "ಹೃದಯದ ರಕ್ತನಾಳದ ತಡೆ",
      "ta": "இதய இரத்தக் குழாய் அடைப்பு"
    },
    "short": {
      "en": "When a pipe that feeds the heart gets narrow",
      "kn": "ಹೃದಯಕ್ಕೆ ರಕ್ತ ಕೊಡುವ ನಾಳ ಕಿರಿದಾದಾಗ",
      "ta": "இதயத்திற்கு இரத்தம் தரும் குழாய் குறுகும்போது"
    },
    "organAbout": {
      "en": "The heart is a strong muscle about the size of your fist. It beats about 60 to 100 times a minute and pumps blood to the whole body. It has four rooms: two on top (atria) that receive blood, and two at the bottom (ventricles) that pump blood out.",
      "kn": "ಹೃದಯವು ನಿಮ್ಮ ಮುಷ್ಟಿಯಷ್ಟು ದೊಡ್ಡದಾದ ಬಲವಾದ ಸ್ನಾಯು. ಇದು ನಿಮಿಷಕ್ಕೆ ಸುಮಾರು 60 ರಿಂದ 100 ಬಾರಿ ಬಡಿದು, ಇಡೀ ದೇಹಕ್ಕೆ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ. ಇದರಲ್ಲಿ ನಾಲ್ಕು ಕೋಣೆಗಳಿವೆ: ಮೇಲಿನ ಎರಡು (ಹೃತ್ಕರ್ಣಗಳು) ರಕ್ತವನ್ನು ಪಡೆಯುತ್ತವೆ, ಕೆಳಗಿನ ಎರಡು (ಹೃತ್ಕುಕ್ಷಿಗಳು) ರಕ್ತವನ್ನು ಹೊರಗೆ ಕಳುಹಿಸುತ್ತವೆ.",
      "ta": "இதயம் உங்கள் கை முஷ்டி அளவுள்ள வலிமையான தசை. இது நிமிடத்திற்கு சுமார் 60 முதல் 100 முறை துடித்து, உடல் முழுவதற்கும் இரத்தத்தை அனுப்புகிறது. இதில் நான்கு அறைகள் உள்ளன: மேலே இரண்டு (ஏட்ரியம்) இரத்தத்தைப் பெறுகின்றன, கீழே இரண்டு (வென்ட்ரிக்கிள்) இரத்தத்தை வெளியே அனுப்புகின்றன."
    },
    "about": {
      "en": "The heart muscle also needs its own blood. It gets it from small pipes on its surface, called coronary arteries. In this condition, fat and cholesterol slowly build up inside one of these pipes. This build-up is called plaque. The pipe becomes narrow, so less blood reaches part of the heart. This can cause chest pain. If the pipe gets fully blocked, it can cause a heart attack.",
      "kn": "ಹೃದಯದ ಸ್ನಾಯುವಿಗೂ ತನ್ನದೇ ರಕ್ತ ಬೇಕು. ಅದು ತನ್ನ ಮೇಲ್ಮೈಯಲ್ಲಿರುವ ಸಣ್ಣ ನಾಳಗಳಿಂದ ರಕ್ತ ಪಡೆಯುತ್ತದೆ. ಇವುಗಳನ್ನು ಕರೋನರಿ ಅಪಧಮನಿಗಳು ಎನ್ನುತ್ತಾರೆ. ಈ ಕಾಯಿಲೆಯಲ್ಲಿ, ಕೊಬ್ಬು ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ನಿಧಾನವಾಗಿ ಈ ನಾಳದ ಒಳಗೆ ಸೇರುತ್ತವೆ. ಇದನ್ನು ಪ್ಲೇಕ್ ಎನ್ನುತ್ತಾರೆ. ನಾಳ ಕಿರಿದಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಹೃದಯದ ಒಂದು ಭಾಗಕ್ಕೆ ಕಡಿಮೆ ರಕ್ತ ತಲುಪುತ್ತದೆ. ಇದರಿಂದ ಎದೆ ನೋವು ಬರಬಹುದು. ನಾಳ ಪೂರ್ತಿ ಮುಚ್ಚಿದರೆ ಹೃದಯಾಘಾತ ಆಗಬಹುದು.",
      "ta": "இதயத் தசைக்கும் தனக்கென இரத்தம் தேவை. அது தன் மேற்பரப்பில் உள்ள சிறிய குழாய்களிலிருந்து இரத்தம் பெறுகிறது. இவை கரோனரி தமனிகள் எனப்படும். இந்த நோயில், கொழுப்பும் கொலஸ்ட்ராலும் மெதுவாக இந்தக் குழாயின் உள்ளே படிகின்றன. இதற்கு பிளேக் என்று பெயர். குழாய் குறுகுவதால், இதயத்தின் ஒரு பகுதிக்கு குறைவான இரத்தமே செல்கிறது. இதனால் நெஞ்சு வலி வரலாம். குழாய் முழுவதுமாக அடைபட்டால் மாரடைப்பு ஏற்படலாம்."
    },
    "treatment": [
      {
        "title": {
          "en": "Medicines",
          "kn": "ಔಷಧಿಗಳು",
          "ta": "மருந்துகள்"
        },
        "text": {
          "en": "Medicines can thin the blood, lower cholesterol and control blood pressure. They help stop the plaque from growing and lower the chance of a heart attack.",
          "kn": "ಔಷಧಿಗಳು ರಕ್ತವನ್ನು ತೆಳು ಮಾಡಿ, ಕೊಲೆಸ್ಟ್ರಾಲ್ ಕಡಿಮೆ ಮಾಡಿ, ರಕ್ತದೊತ್ತಡವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ. ಇವು ಪ್ಲೇಕ್ ಬೆಳೆಯುವುದನ್ನು ತಡೆದು ಹೃದಯಾಘಾತದ ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತವೆ.",
          "ta": "மருந்துகள் இரத்தத்தை மெலிதாக்கி, கொலஸ்ட்ராலைக் குறைத்து, இரத்த அழுத்தத்தைக் கட்டுப்படுத்துகின்றன. இவை பிளேக் வளர்வதைத் தடுத்து மாரடைப்பு வாய்ப்பைக் குறைக்கின்றன."
        }
      },
      {
        "title": {
          "en": "Angioplasty and stent",
          "kn": "ಆಂಜಿಯೋಪ್ಲಾಸ್ಟಿ ಮತ್ತು ಸ್ಟೆಂಟ್",
          "ta": "ஆஞ்சியோபிளாஸ்டி மற்றும் ஸ்டென்ட்"
        },
        "text": {
          "en": "A doctor passes a thin tube into the artery. A tiny balloon opens the narrow part. A small mesh tube, called a stent, is left inside to keep the pipe open.",
          "kn": "ವೈದ್ಯರು ಒಂದು ತೆಳು ಕೊಳವೆಯನ್ನು ಅಪಧಮನಿಯೊಳಗೆ ಕಳುಹಿಸುತ್ತಾರೆ. ಒಂದು ಸಣ್ಣ ಬಲೂನ್ ಕಿರಿದಾದ ಭಾಗವನ್ನು ತೆರೆಯುತ್ತದೆ. ನಾಳವನ್ನು ತೆರೆದಿಡಲು ಸ್ಟೆಂಟ್ ಎಂಬ ಸಣ್ಣ ಜಾಲರಿ ಕೊಳವೆಯನ್ನು ಒಳಗೆ ಬಿಡಲಾಗುತ್ತದೆ.",
          "ta": "மருத்துவர் ஒரு மெல்லிய குழாயைத் தமனிக்குள் செலுத்துகிறார். ஒரு சிறிய பலூன் குறுகிய பகுதியைத் திறக்கிறது. குழாயைத் திறந்து வைக்க ஸ்டென்ட் எனப்படும் சிறிய வலைக் குழாய் உள்ளே வைக்கப்படுகிறது."
        }
      },
      {
        "title": {
          "en": "Bypass surgery",
          "kn": "ಬೈಪಾಸ್ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
          "ta": "பைபாஸ் அறுவை சிகிச்சை"
        },
        "text": {
          "en": "For some patients, surgeons take a blood vessel from another part of the body. They use it to make a new path for blood to go around the blockage.",
          "kn": "ಕೆಲವು ರೋಗಿಗಳಿಗೆ, ಶಸ್ತ್ರಚಿಕಿತ್ಸಕರು ದೇಹದ ಇನ್ನೊಂದು ಭಾಗದಿಂದ ರಕ್ತನಾಳವನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಾರೆ. ಅದರಿಂದ ತಡೆಯ ಸುತ್ತ ರಕ್ತ ಹೋಗಲು ಹೊಸ ದಾರಿ ಮಾಡುತ್ತಾರೆ.",
          "ta": "சில நோயாளிகளுக்கு, அறுவை மருத்துவர்கள் உடலின் வேறு பகுதியிலிருந்து ஒரு இரத்தக் குழாயை எடுக்கிறார்கள். அடைப்பைச் சுற்றி இரத்தம் செல்ல புதிய பாதை அமைக்கிறார்கள்."
        }
      },
      {
        "title": {
          "en": "Healthy habits",
          "kn": "ಆರೋಗ್ಯಕರ ಅಭ್ಯಾಸಗಳು",
          "ta": "ஆரோக்கியமான பழக்கங்கள்"
        },
        "text": {
          "en": "Stop smoking. Eat less oily and salty food. Walk or exercise as your doctor advises. Keep sugar and blood pressure under control.",
          "kn": "ಧೂಮಪಾನ ಬಿಡಿ. ಎಣ್ಣೆ ಮತ್ತು ಉಪ್ಪು ಕಡಿಮೆ ತಿನ್ನಿ. ವೈದ್ಯರು ಹೇಳಿದಂತೆ ನಡೆಯಿರಿ ಅಥವಾ ವ್ಯಾಯಾಮ ಮಾಡಿ. ಸಕ್ಕರೆ ಮತ್ತು ರಕ್ತದೊತ್ತಡವನ್ನು ನಿಯಂತ್ರಣದಲ್ಲಿಡಿ.",
          "ta": "புகைப்பதை நிறுத்துங்கள். எண்ணெய் மற்றும் உப்பு குறைவாகச் சாப்பிடுங்கள். மருத்துவர் சொன்னபடி நடங்கள் அல்லது உடற்பயிற்சி செய்யுங்கள். சர்க்கரை மற்றும் இரத்த அழுத்தத்தைக் கட்டுக்குள் வைத்திருங்கள்."
        }
      }
    ],
    "warning": {
      "en": "Chest pain that lasts more than a few minutes, or comes with sweating or breathlessness, is an emergency. Go to a hospital at once. In India, call 108.",
      "kn": "ಕೆಲವು ನಿಮಿಷಗಳಿಗಿಂತ ಹೆಚ್ಚು ಇರುವ ಎದೆ ನೋವು, ಅಥವಾ ಬೆವರು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆಯೊಂದಿಗೆ ಬರುವ ಎದೆ ನೋವು ತುರ್ತು ಸ್ಥಿತಿ. ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ. ಭಾರತದಲ್ಲಿ 108 ಗೆ ಕರೆ ಮಾಡಿ.",
      "ta": "சில நிமிடங்களுக்கு மேல் நீடிக்கும் நெஞ்சு வலி, அல்லது வியர்வை அல்லது மூச்சுத் திணறலுடன் வரும் நெஞ்சு வலி அவசர நிலை. உடனே மருத்துவமனைக்குச் செல்லுங்கள். இந்தியாவில் 108-ஐ அழையுங்கள்."
    },
    "views": {
      "outside": {
        "healthyModel": "models/heart-healthy.glb",
        "diseasedModel": "models/heart-diseased.glb",
        "compareModel": "models/heart-compare.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "ra",
            "position": "-0.0286m 0.0729m 0.0274m",
            "normal": "-0.457m 0.073m 0.886m",
            "title": {
              "en": "Right atrium",
              "kn": "ಬಲ ಹೃತ್ಕರ್ಣ",
              "ta": "வலது ஏட்ரியம்"
            },
            "text": {
              "en": "This top room collects used blood coming back from the body. This blood has little oxygen left.",
              "kn": "ಈ ಮೇಲಿನ ಕೋಣೆ ದೇಹದಿಂದ ಮರಳಿ ಬರುವ ಬಳಸಿದ ರಕ್ತವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ. ಈ ರಕ್ತದಲ್ಲಿ ಆಮ್ಲಜನಕ ಕಡಿಮೆ ಇರುತ್ತದೆ.",
              "ta": "இந்த மேல் அறை உடலிலிருந்து திரும்பி வரும் பயன்படுத்திய இரத்தத்தைச் சேகரிக்கிறது. இந்த இரத்தத்தில் ஆக்சிஜன் குறைவாக இருக்கும்."
            }
          },
          {
            "id": "rv",
            "position": "-0.0143m 0.0387m 0.0321m",
            "normal": "-0.267m -0.270m 0.925m",
            "title": {
              "en": "Right ventricle",
              "kn": "ಬಲ ಹೃತ್ಕುಕ್ಷಿ",
              "ta": "வலது வென்ட்ரிக்கிள்"
            },
            "text": {
              "en": "This lower room pumps the used blood to the lungs. In the lungs, the blood picks up fresh oxygen.",
              "kn": "ಈ ಕೆಳಗಿನ ಕೋಣೆ ಬಳಸಿದ ರಕ್ತವನ್ನು ಶ್ವಾಸಕೋಶಕ್ಕೆ ಪಂಪ್ ಮಾಡುತ್ತದೆ. ಅಲ್ಲಿ ರಕ್ತ ಹೊಸ ಆಮ್ಲಜನಕವನ್ನು ಪಡೆಯುತ್ತದೆ.",
              "ta": "இந்தக் கீழ் அறை பயன்படுத்திய இரத்தத்தை நுரையீரலுக்கு அனுப்புகிறது. அங்கே இரத்தம் புதிய ஆக்சிஜனைப் பெறுகிறது."
            }
          },
          {
            "id": "lv",
            "position": "0.0261m 0.0415m 0.0230m",
            "normal": "0.556m -0.143m 0.818m",
            "title": {
              "en": "Left ventricle",
              "kn": "ಎಡ ಹೃತ್ಕುಕ್ಷಿ",
              "ta": "இடது வென்ட்ரிக்கிள்"
            },
            "text": {
              "en": "The strongest room of the heart. It has the thickest wall. It pumps oxygen-rich blood to the whole body.",
              "kn": "ಹೃದಯದ ಅತ್ಯಂತ ಬಲವಾದ ಕೋಣೆ. ಇದರ ಗೋಡೆ ಅತ್ಯಂತ ದಪ್ಪ. ಇದು ಆಮ್ಲಜನಕ ತುಂಬಿದ ರಕ್ತವನ್ನು ಇಡೀ ದೇಹಕ್ಕೆ ಪಂಪ್ ಮಾಡುತ್ತದೆ.",
              "ta": "இதயத்தின் மிக வலிமையான அறை. இதன் சுவர் மிகத் தடிமனானது. ஆக்சிஜன் நிறைந்த இரத்தத்தை உடல் முழுவதற்கும் அனுப்புகிறது."
            }
          },
          {
            "id": "lad",
            "position": "0.0077m 0.0375m 0.0315m",
            "normal": "0.248m -0.190m 0.950m",
            "title": {
              "en": "Coronary artery (red line)",
              "kn": "ಕರೋನರಿ ಅಪಧಮನಿ (ಕೆಂಪು ಗೆರೆ)",
              "ta": "கரோனரி தமனி (சிவப்புக் கோடு)"
            },
            "text": {
              "en": "A small pipe on the front of the heart. It brings blood full of oxygen to the heart muscle itself. Here it is wide and clear.",
              "kn": "ಹೃದಯದ ಮುಂಭಾಗದಲ್ಲಿರುವ ಸಣ್ಣ ನಾಳ. ಇದು ಹೃದಯದ ಸ್ನಾಯುವಿಗೇ ಆಮ್ಲಜನಕ ತುಂಬಿದ ರಕ್ತವನ್ನು ತರುತ್ತದೆ. ಇಲ್ಲಿ ಅದು ಅಗಲವಾಗಿ, ಸ್ವಚ್ಛವಾಗಿದೆ.",
              "ta": "இதயத்தின் முன்பக்கம் உள்ள சிறிய குழாய். இது இதயத் தசைக்கே ஆக்சிஜன் நிறைந்த இரத்தத்தைக் கொண்டுவருகிறது. இங்கே அது அகலமாகவும் தெளிவாகவும் உள்ளது."
            }
          },
          {
            "id": "aorta",
            "position": "-0.0002m 0.1192m 0.0063m",
            "normal": "-0.153m 0.933m 0.327m",
            "title": {
              "en": "Aorta",
              "kn": "ಮಹಾಪಧಮನಿ (ಅಯೋರ್ಟಾ)",
              "ta": "பெருந்தமனி (அயோர்டா)"
            },
            "text": {
              "en": "The biggest pipe in the body. It carries blood out of the heart to the rest of the body.",
              "kn": "ದೇಹದ ಅತಿದೊಡ್ಡ ರಕ್ತನಾಳ. ಇದು ಹೃದಯದಿಂದ ರಕ್ತವನ್ನು ದೇಹದ ಉಳಿದ ಭಾಗಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ.",
              "ta": "உடலின் மிகப்பெரிய இரத்தக் குழாய். இது இதயத்திலிருந்து இரத்தத்தை உடலின் மற்ற பகுதிகளுக்குக் கொண்டு செல்கிறது."
            }
          },
          {
            "id": "svc",
            "position": "-0.0171m 0.1166m 0.0129m",
            "normal": "0.460m -0.365m 0.809m",
            "title": {
              "en": "Superior vena cava",
              "kn": "ಮೇಲಿನ ಮಹಾಸಿರೆ",
              "ta": "மேல் பெருஞ்சிரை"
            },
            "text": {
              "en": "A big vein. It brings used blood from the head and arms back into the heart.",
              "kn": "ಒಂದು ದೊಡ್ಡ ಸಿರೆ. ಇದು ತಲೆ ಮತ್ತು ಕೈಗಳಿಂದ ಬಳಸಿದ ರಕ್ತವನ್ನು ಮತ್ತೆ ಹೃದಯಕ್ಕೆ ತರುತ್ತದೆ.",
              "ta": "ஒரு பெரிய சிரை. இது தலை மற்றும் கைகளிலிருந்து பயன்படுத்திய இரத்தத்தை மீண்டும் இதயத்திற்குக் கொண்டுவருகிறது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "plaque",
            "position": "0.0137m 0.0543m 0.0378m",
            "normal": "0.509m -0.049m 0.859m",
            "title": {
              "en": "Plaque (the yellow lump)",
              "kn": "ಪ್ಲೇಕ್ (ಹಳದಿ ಗಡ್ಡೆ)",
              "ta": "பிளேக் (மஞ்சள் கட்டி)"
            },
            "text": {
              "en": "Fat, cholesterol and other material stick to the inside of the artery wall. Over years, this lump grows and makes the pipe narrow.",
              "kn": "ಕೊಬ್ಬು, ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ಇತರ ವಸ್ತುಗಳು ಅಪಧಮನಿಯ ಒಳಗೋಡೆಗೆ ಅಂಟಿಕೊಳ್ಳುತ್ತವೆ. ವರ್ಷಗಳಲ್ಲಿ ಈ ಗಡ್ಡೆ ಬೆಳೆದು ನಾಳವನ್ನು ಕಿರಿದು ಮಾಡುತ್ತದೆ.",
              "ta": "கொழுப்பு, கொலஸ்ட்ரால் மற்றும் பிற பொருட்கள் தமனியின் உள்சுவரில் ஒட்டிக்கொள்கின்றன. பல ஆண்டுகளில் இந்தக் கட்டி வளர்ந்து குழாயைக் குறுக்குகிறது."
            }
          },
          {
            "id": "narrow",
            "position": "0.0068m 0.0322m 0.0304m",
            "normal": "0.198m -0.304m 0.932m",
            "title": {
              "en": "Narrow artery (thin dark line)",
              "kn": "ಕಿರಿದಾದ ಅಪಧಮನಿ (ತೆಳು ಕಪ್ಪು ಗೆರೆ)",
              "ta": "குறுகிய தமனி (மெல்லிய கருங்கோடு)"
            },
            "text": {
              "en": "Less blood can pass through here. When you walk fast or climb stairs, the heart needs more blood but cannot get it. This can cause chest pain or pressure. Doctors call this angina.",
              "kn": "ಇಲ್ಲಿ ಕಡಿಮೆ ರಕ್ತ ಹರಿಯುತ್ತದೆ. ವೇಗವಾಗಿ ನಡೆದಾಗ ಅಥವಾ ಮೆಟ್ಟಿಲು ಹತ್ತಿದಾಗ ಹೃದಯಕ್ಕೆ ಹೆಚ್ಚು ರಕ್ತ ಬೇಕು, ಆದರೆ ಸಿಗುವುದಿಲ್ಲ. ಇದರಿಂದ ಎದೆ ನೋವು ಅಥವಾ ಒತ್ತಡ ಬರಬಹುದು. ವೈದ್ಯರು ಇದನ್ನು ಆಂಜೈನಾ ಎನ್ನುತ್ತಾರೆ.",
              "ta": "இங்கே குறைவான இரத்தமே செல்ல முடியும். வேகமாக நடக்கும்போது அல்லது படி ஏறும்போது இதயத்திற்கு அதிக இரத்தம் தேவை, ஆனால் கிடைக்காது. இதனால் நெஞ்சு வலி அல்லது அழுத்தம் வரலாம். மருத்துவர்கள் இதை ஆஞ்சைனா என்பார்கள்."
            }
          },
          {
            "id": "risk",
            "position": "0.0180m 0.0257m 0.0239m",
            "normal": "0.421m -0.277m 0.863m",
            "title": {
              "en": "Heart muscle at risk (dark area)",
              "kn": "ಅಪಾಯದಲ್ಲಿರುವ ಹೃದಯ ಸ್ನಾಯು (ಕಪ್ಪು ಭಾಗ)",
              "ta": "ஆபத்தில் உள்ள இதயத் தசை (கருப்புப் பகுதி)"
            },
            "text": {
              "en": "This part of the heart gets its blood from the narrow artery. If the artery gets fully blocked, this muscle can be damaged. That is a heart attack.",
              "kn": "ಹೃದಯದ ಈ ಭಾಗಕ್ಕೆ ಕಿರಿದಾದ ಅಪಧಮನಿಯಿಂದ ರಕ್ತ ಬರುತ್ತದೆ. ಅಪಧಮನಿ ಪೂರ್ತಿ ಮುಚ್ಚಿದರೆ ಈ ಸ್ನಾಯುವಿಗೆ ಹಾನಿಯಾಗಬಹುದು. ಅದೇ ಹೃದಯಾಘಾತ.",
              "ta": "இதயத்தின் இந்தப் பகுதிக்கு குறுகிய தமனியிலிருந்து இரத்தம் வருகிறது. தமனி முழுவதுமாக அடைபட்டால் இந்தத் தசை பாதிக்கப்படலாம். அதுவே மாரடைப்பு."
            }
          }
        ]
      },
      "inside": {
        "healthyModel": "models/heart-healthy-inside.glb",
        "diseasedModel": "models/heart-diseased-inside.glb",
        "compareModel": "models/heart-compare-inside.glb",
        "orbit": "90deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "ra",
            "position": "-0.0330m 0.0649m 0.0241m",
            "normal": "0.998m -0.032m -0.056m",
            "title": {
              "en": "Right atrium",
              "kn": "ಬಲ ಹೃತ್ಕರ್ಣ",
              "ta": "வலது ஏட்ரியம்"
            },
            "text": {
              "en": "This top room collects used blood coming back from the body. This blood has little oxygen left.",
              "kn": "ಈ ಮೇಲಿನ ಕೋಣೆ ದೇಹದಿಂದ ಮರಳಿ ಬರುವ ಬಳಸಿದ ರಕ್ತವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ. ಈ ರಕ್ತದಲ್ಲಿ ಆಮ್ಲಜನಕ ಕಡಿಮೆ ಇರುತ್ತದೆ.",
              "ta": "இந்த மேல் அறை உடலிலிருந்து திரும்பி வரும் பயன்படுத்திய இரத்தத்தைச் சேகரிக்கிறது. இந்த இரத்தத்தில் ஆக்சிஜன் குறைவாக இருக்கும்."
            }
          },
          {
            "id": "rv",
            "position": "0.0175m 0.0335m 0.0165m",
            "normal": "0.844m 0.512m 0.162m",
            "title": {
              "en": "Right ventricle",
              "kn": "ಬಲ ಹೃತ್ಕುಕ್ಷಿ",
              "ta": "வலது வென்ட்ரிக்கிள்"
            },
            "text": {
              "en": "This lower room pumps the used blood to the lungs. In the lungs, the blood picks up fresh oxygen.",
              "kn": "ಈ ಕೆಳಗಿನ ಕೋಣೆ ಬಳಸಿದ ರಕ್ತವನ್ನು ಶ್ವಾಸಕೋಶಕ್ಕೆ ಪಂಪ್ ಮಾಡುತ್ತದೆ. ಅಲ್ಲಿ ರಕ್ತ ಹೊಸ ಆಮ್ಲಜನಕವನ್ನು ಪಡೆಯುತ್ತದೆ.",
              "ta": "இந்தக் கீழ் அறை பயன்படுத்திய இரத்தத்தை நுரையீரலுக்கு அனுப்புகிறது. அங்கே இரத்தம் புதிய ஆக்சிஜனைப் பெறுகிறது."
            }
          },
          {
            "id": "la",
            "position": "-0.0285m 0.0653m -0.0243m",
            "normal": "0.991m 0.127m -0.029m",
            "title": {
              "en": "Left atrium",
              "kn": "ಎಡ ಹೃತ್ಕರ್ಣ",
              "ta": "இடது ஏட்ரியம்"
            },
            "text": {
              "en": "This top room receives fresh, oxygen-rich blood coming back from the lungs.",
              "kn": "ಈ ಮೇಲಿನ ಕೋಣೆ ಶ್ವಾಸಕೋಶದಿಂದ ಬರುವ ಆಮ್ಲಜನಕ ತುಂಬಿದ ಹೊಸ ರಕ್ತವನ್ನು ಪಡೆಯುತ್ತದೆ.",
              "ta": "இந்த மேல் அறை நுரையீரலிலிருந்து வரும் ஆக்சிஜன் நிறைந்த புதிய இரத்தத்தைப் பெறுகிறது."
            }
          },
          {
            "id": "lv",
            "position": "0.0097m 0.0436m -0.0230m",
            "normal": "0.760m 0.115m 0.639m",
            "title": {
              "en": "Left ventricle",
              "kn": "ಎಡ ಹೃತ್ಕುಕ್ಷಿ",
              "ta": "இடது வென்ட்ரிக்கிள்"
            },
            "text": {
              "en": "The strongest room of the heart. See how thick its wall is. It pumps oxygen-rich blood to the whole body.",
              "kn": "ಹೃದಯದ ಅತ್ಯಂತ ಬಲವಾದ ಕೋಣೆ. ಇದರ ಗೋಡೆ ಎಷ್ಟು ದಪ್ಪ ಎಂದು ನೋಡಿ. ಇದು ಆಮ್ಲಜನಕ ತುಂಬಿದ ರಕ್ತವನ್ನು ಇಡೀ ದೇಹಕ್ಕೆ ಪಂಪ್ ಮಾಡುತ್ತದೆ.",
              "ta": "இதயத்தின் மிக வலிமையான அறை. இதன் சுவர் எவ்வளவு தடிமன் என்று பாருங்கள். ஆக்சிஜன் நிறைந்த இரத்தத்தை உடல் முழுவதற்கும் அனுப்புகிறது."
            }
          },
          {
            "id": "septum",
            "position": "0.0332m 0.0441m -0.0085m",
            "normal": "0.889m 0.405m -0.215m",
            "title": {
              "en": "Septum (middle wall)",
              "kn": "ಸೆಪ್ಟಮ್ (ನಡುವಿನ ಗೋಡೆ)",
              "ta": "செப்டம் (நடுச் சுவர்)"
            },
            "text": {
              "en": "A thick muscle wall down the middle. It keeps the used blood on the right side apart from the fresh blood on the left side.",
              "kn": "ಮಧ್ಯದಲ್ಲಿರುವ ದಪ್ಪ ಸ್ನಾಯು ಗೋಡೆ. ಇದು ಬಲಭಾಗದ ಬಳಸಿದ ರಕ್ತವನ್ನು ಎಡಭಾಗದ ಹೊಸ ರಕ್ತದಿಂದ ಬೇರೆಯಾಗಿಡುತ್ತದೆ.",
              "ta": "நடுவில் உள்ள தடித்த தசைச் சுவர். இது வலது பக்கப் பயன்படுத்திய இரத்தத்தை இடது பக்கப் புதிய இரத்தத்திலிருந்து பிரித்து வைக்கிறது."
            }
          },
          {
            "id": "valve",
            "position": "0.0192m 0.0541m -0.0319m",
            "normal": "0.976m -0.026m 0.214m",
            "title": {
              "en": "Valve and heart strings",
              "kn": "ಕವಾಟ ಮತ್ತು ಹೃದಯದ ದಾರಗಳು",
              "ta": "வால்வு மற்றும் இதய நாண்கள்"
            },
            "text": {
              "en": "Valves are doors between the rooms. They open to let blood through, then shut so it cannot flow back. The thin white strings hold the valve flaps in place.",
              "kn": "ಕವಾಟಗಳು ಕೋಣೆಗಳ ನಡುವಿನ ಬಾಗಿಲುಗಳು. ರಕ್ತ ಹೋಗಲು ತೆರೆಯುತ್ತವೆ, ನಂತರ ಹಿಂದಕ್ಕೆ ಹರಿಯದಂತೆ ಮುಚ್ಚುತ್ತವೆ. ತೆಳು ಬಿಳಿ ದಾರಗಳು ಕವಾಟದ ಪದರಗಳನ್ನು ಹಿಡಿದಿಡುತ್ತವೆ.",
              "ta": "வால்வுகள் அறைகளுக்கு இடையிலான கதவுகள். இரத்தம் செல்லத் திறந்து, பின்னோக்கிப் பாயாமல் மூடிக்கொள்கின்றன. மெல்லிய வெள்ளை நாண்கள் வால்வு மடிப்புகளைப் பிடித்து வைக்கின்றன."
            }
          },
          {
            "id": "aorta",
            "position": "-0.0153m 0.1077m -0.0081m",
            "normal": "0.951m -0.308m 0.012m",
            "title": {
              "en": "Aorta",
              "kn": "ಮಹಾಪಧಮನಿ (ಅಯೋರ್ಟಾ)",
              "ta": "பெருந்தமனி (அயோர்டா)"
            },
            "text": {
              "en": "The biggest pipe in the body. It carries blood out of the heart to the rest of the body.",
              "kn": "ದೇಹದ ಅತಿದೊಡ್ಡ ರಕ್ತನಾಳ. ಇದು ಹೃದಯದಿಂದ ರಕ್ತವನ್ನು ದೇಹದ ಉಳಿದ ಭಾಗಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ.",
              "ta": "உடலின் மிகப்பெரிய இரத்தக் குழாய். இது இதயத்திலிருந்து இரத்தத்தை உடலின் மற்ற பகுதிகளுக்குக் கொண்டு செல்கிறது."
            }
          },
          {
            "id": "pulm",
            "position": "0.0020m 0.0974m -0.0158m",
            "normal": "0.981m -0.048m 0.190m",
            "title": {
              "en": "Pulmonary artery (blue pipe)",
              "kn": "ಶ್ವಾಸಕೋಶದ ಅಪಧಮನಿ (ನೀಲಿ ನಾಳ)",
              "ta": "நுரையீரல் தமனி (நீலக் குழாய்)"
            },
            "text": {
              "en": "This pipe carries used blood from the right ventricle to the lungs to pick up oxygen. It is blue in pictures because its blood is low in oxygen.",
              "kn": "ಈ ನಾಳ ಬಲ ಹೃತ್ಕುಕ್ಷಿಯಿಂದ ಬಳಸಿದ ರಕ್ತವನ್ನು ಆಮ್ಲಜನಕ ಪಡೆಯಲು ಶ್ವಾಸಕೋಶಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ. ಅದರ ರಕ್ತದಲ್ಲಿ ಆಮ್ಲಜನಕ ಕಡಿಮೆ ಇರುವುದರಿಂದ ಚಿತ್ರಗಳಲ್ಲಿ ನೀಲಿಯಾಗಿ ತೋರಿಸುತ್ತಾರೆ.",
              "ta": "இந்தக் குழாய் வலது வென்ட்ரிக்கிளிலிருந்து பயன்படுத்திய இரத்தத்தை ஆக்சிஜன் பெற நுரையீரலுக்குக் கொண்டு செல்கிறது. அதன் இரத்தத்தில் ஆக்சிஜன் குறைவு என்பதால் படங்களில் நீலமாகக் காட்டப்படுகிறது."
            }
          },
          {
            "id": "vc",
            "position": "-0.0255m 0.1083m 0.0158m",
            "normal": "0.985m -0.016m -0.173m",
            "title": {
              "en": "Vena cava",
              "kn": "ಮಹಾಸಿರೆ",
              "ta": "பெருஞ்சிரை"
            },
            "text": {
              "en": "Big veins that bring used blood from the whole body back into the right atrium.",
              "kn": "ಇಡೀ ದೇಹದಿಂದ ಬಳಸಿದ ರಕ್ತವನ್ನು ಬಲ ಹೃತ್ಕರ್ಣಕ್ಕೆ ಮರಳಿ ತರುವ ದೊಡ್ಡ ಸಿರೆಗಳು.",
              "ta": "உடல் முழுவதிலிருந்தும் பயன்படுத்திய இரத்தத்தை வலது ஏட்ரியத்திற்குத் திரும்பக் கொண்டுவரும் பெரிய சிரைகள்."
            }
          },
          {
            "id": "coronary",
            "position": "0.0275m 0.0456m -0.0439m",
            "normal": "0.881m 0.295m -0.371m",
            "title": {
              "en": "Coronary artery (thin red line)",
              "kn": "ಕರೋನರಿ ಅಪಧಮನಿ (ತೆಳು ಕೆಂಪು ಗೆರೆ)",
              "ta": "கரோனரி தமனி (மெல்லிய சிவப்புக் கோடு)"
            },
            "text": {
              "en": "A small pipe on the outside of the heart. It feeds the heart muscle itself with oxygen-rich blood. Here it is wide and clear.",
              "kn": "ಹೃದಯದ ಹೊರಗಿರುವ ಸಣ್ಣ ನಾಳ. ಇದು ಹೃದಯದ ಸ್ನಾಯುವಿಗೇ ಆಮ್ಲಜನಕ ತುಂಬಿದ ರಕ್ತ ಕೊಡುತ್ತದೆ. ಇಲ್ಲಿ ಅದು ಅಗಲವಾಗಿ, ಸ್ವಚ್ಛವಾಗಿದೆ.",
              "ta": "இதயத்தின் வெளிப்புறம் உள்ள சிறிய குழாய். இது இதயத் தசைக்கே ஆக்சிஜன் நிறைந்த இரத்தம் தருகிறது. இங்கே அது அகலமாகவும் தெளிவாகவும் உள்ளது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "plaque",
            "position": "0.0329m 0.0404m -0.0463m",
            "normal": "0.805m 0.061m -0.590m",
            "title": {
              "en": "Plaque (the yellow lump)",
              "kn": "ಪ್ಲೇಕ್ (ಹಳದಿ ಗಡ್ಡೆ)",
              "ta": "பிளேக் (மஞ்சள் கட்டி)"
            },
            "text": {
              "en": "Fat, cholesterol and other material stick to the inside of the artery wall. Over years, this lump grows and makes the pipe narrow.",
              "kn": "ಕೊಬ್ಬು, ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ಇತರ ವಸ್ತುಗಳು ಅಪಧಮನಿಯ ಒಳಗೋಡೆಗೆ ಅಂಟಿಕೊಳ್ಳುತ್ತವೆ. ವರ್ಷಗಳಲ್ಲಿ ಈ ಗಡ್ಡೆ ಬೆಳೆದು ನಾಳವನ್ನು ಕಿರಿದು ಮಾಡುತ್ತದೆ.",
              "ta": "கொழுப்பு, கொலஸ்ட்ரால் மற்றும் பிற பொருட்கள் தமனியின் உள்சுவரில் ஒட்டிக்கொள்கின்றன. பல ஆண்டுகளில் இந்தக் கட்டி வளர்ந்து குழாயைக் குறுக்குகிறது."
            }
          },
          {
            "id": "narrow",
            "position": "0.0471m 0.0225m -0.0361m",
            "normal": "0.974m 0.160m -0.160m",
            "title": {
              "en": "Narrow artery (thin dark line)",
              "kn": "ಕಿರಿದಾದ ಅಪಧಮನಿ (ತೆಳು ಕಪ್ಪು ಗೆರೆ)",
              "ta": "குறுகிய தமனி (மெல்லிய கருங்கோடு)"
            },
            "text": {
              "en": "Less blood can pass through here. When you walk fast or climb stairs, the heart needs more blood but cannot get it. This can cause chest pain or pressure. Doctors call this angina.",
              "kn": "ಇಲ್ಲಿ ಕಡಿಮೆ ರಕ್ತ ಹರಿಯುತ್ತದೆ. ವೇಗವಾಗಿ ನಡೆದಾಗ ಅಥವಾ ಮೆಟ್ಟಿಲು ಹತ್ತಿದಾಗ ಹೃದಯಕ್ಕೆ ಹೆಚ್ಚು ರಕ್ತ ಬೇಕು, ಆದರೆ ಸಿಗುವುದಿಲ್ಲ. ಇದರಿಂದ ಎದೆ ನೋವು ಅಥವಾ ಒತ್ತಡ ಬರಬಹುದು. ವೈದ್ಯರು ಇದನ್ನು ಆಂಜೈನಾ ಎನ್ನುತ್ತಾರೆ.",
              "ta": "இங்கே குறைவான இரத்தமே செல்ல முடியும். வேகமாக நடக்கும்போது அல்லது படி ஏறும்போது இதயத்திற்கு அதிக இரத்தம் தேவை, ஆனால் கிடைக்காது. இதனால் நெஞ்சு வலி அல்லது அழுத்தம் வரலாம். மருத்துவர்கள் இதை ஆஞ்சைனா என்பார்கள்."
            }
          },
          {
            "id": "risk",
            "position": "0.0436m 0.0329m -0.0290m",
            "normal": "0.974m 0.217m 0.058m",
            "title": {
              "en": "Heart muscle at risk (dark area)",
              "kn": "ಅಪಾಯದಲ್ಲಿರುವ ಹೃದಯ ಸ್ನಾಯು (ಕಪ್ಪು ಭಾಗ)",
              "ta": "ஆபத்தில் உள்ள இதயத் தசை (கருப்புப் பகுதி)"
            },
            "text": {
              "en": "This part of the left ventricle wall gets its blood from the narrow artery. If the artery gets fully blocked, this muscle can be damaged. That is a heart attack.",
              "kn": "ಎಡ ಹೃತ್ಕುಕ್ಷಿಯ ಗೋಡೆಯ ಈ ಭಾಗಕ್ಕೆ ಕಿರಿದಾದ ಅಪಧಮನಿಯಿಂದ ರಕ್ತ ಬರುತ್ತದೆ. ಅಪಧಮನಿ ಪೂರ್ತಿ ಮುಚ್ಚಿದರೆ ಈ ಸ್ನಾಯುವಿಗೆ ಹಾನಿಯಾಗಬಹುದು. ಅದೇ ಹೃದಯಾಘಾತ.",
              "ta": "இடது வென்ட்ரிக்கிள் சுவரின் இந்தப் பகுதிக்கு குறுகிய தமனியிலிருந்து இரத்தம் வருகிறது. தமனி முழுவதுமாக அடைபட்டால் இந்தத் தசை பாதிக்கப்படலாம். அதுவே மாரடைப்பு."
            }
          }
        ]
      }
    }
  },
  {
    "id": "brain",
    "icon": "🧠",
    "organ": {
      "en": "Brain",
      "kn": "ಮೆದುಳು",
      "ta": "மூளை"
    },
    "name": {
      "en": "Stroke",
      "kn": "ಪಾರ್ಶ್ವವಾಯು (ಸ್ಟ್ರೋಕ್)",
      "ta": "பக்கவாதம் (ஸ்ட்ரோக்)"
    },
    "short": {
      "en": "When blood stops reaching part of the brain",
      "kn": "ಮೆದುಳಿನ ಒಂದು ಭಾಗಕ್ಕೆ ರಕ್ತ ತಲುಪದಿದ್ದಾಗ",
      "ta": "மூளையின் ஒரு பகுதிக்கு இரத்தம் செல்லாதபோது"
    },
    "organAbout": {
      "en": "The brain controls everything you do: moving, feeling, seeing, speaking, thinking and remembering. It uses about one fifth of the oxygen you breathe. The left side of the brain controls the right side of the body, and the right side controls the left side.",
      "kn": "ನೀವು ಮಾಡುವ ಎಲ್ಲವನ್ನೂ ಮೆದುಳು ನಿಯಂತ್ರಿಸುತ್ತದೆ: ಚಲನೆ, ಸ್ಪರ್ಶ, ನೋಟ, ಮಾತು, ಯೋಚನೆ ಮತ್ತು ನೆನಪು. ನೀವು ಉಸಿರಾಡುವ ಆಮ್ಲಜನಕದ ಸುಮಾರು ಐದನೇ ಒಂದು ಭಾಗವನ್ನು ಮೆದುಳು ಬಳಸುತ್ತದೆ. ಮೆದುಳಿನ ಎಡಭಾಗ ದೇಹದ ಬಲಭಾಗವನ್ನು, ಬಲಭಾಗ ಎಡಭಾಗವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
      "ta": "நீங்கள் செய்யும் அனைத்தையும் மூளை கட்டுப்படுத்துகிறது: அசைவு, உணர்வு, பார்வை, பேச்சு, சிந்தனை மற்றும் நினைவு. நீங்கள் சுவாசிக்கும் ஆக்சிஜனில் சுமார் ஐந்தில் ஒரு பங்கை மூளை பயன்படுத்துகிறது. மூளையின் இடது பக்கம் உடலின் வலது பக்கத்தையும், வலது பக்கம் இடது பக்கத்தையும் கட்டுப்படுத்துகிறது."
    },
    "about": {
      "en": "A stroke happens when blood suddenly stops reaching part of the brain. Most often, a blood clot blocks an artery in the brain. Without blood, brain cells get no oxygen and start to die within minutes. This can cause weakness on one side of the body, a drooping face, or trouble speaking. A stroke is an emergency. Fast treatment can save the brain.",
      "kn": "ಮೆದುಳಿನ ಒಂದು ಭಾಗಕ್ಕೆ ರಕ್ತ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ತಲುಪದಿದ್ದಾಗ ಪಾರ್ಶ್ವವಾಯು ಆಗುತ್ತದೆ. ಹೆಚ್ಚಾಗಿ, ರಕ್ತದ ಹೆಪ್ಪು ಮೆದುಳಿನ ಅಪಧಮನಿಯನ್ನು ಮುಚ್ಚುತ್ತದೆ. ರಕ್ತವಿಲ್ಲದೆ ಮೆದುಳಿನ ಜೀವಕೋಶಗಳಿಗೆ ಆಮ್ಲಜನಕ ಸಿಗುವುದಿಲ್ಲ, ಮತ್ತು ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಅವು ಸಾಯಲು ಶುರುವಾಗುತ್ತವೆ. ಇದರಿಂದ ದೇಹದ ಒಂದು ಬದಿ ದುರ್ಬಲವಾಗಬಹುದು, ಮುಖ ಜೋತುಬೀಳಬಹುದು, ಅಥವಾ ಮಾತನಾಡಲು ಕಷ್ಟವಾಗಬಹುದು. ಪಾರ್ಶ್ವವಾಯು ತುರ್ತು ಸ್ಥಿತಿ. ಬೇಗ ಚಿಕಿತ್ಸೆ ಸಿಕ್ಕರೆ ಮೆದುಳನ್ನು ಉಳಿಸಬಹುದು.",
      "ta": "மூளையின் ஒரு பகுதிக்கு திடீரென இரத்தம் செல்லாமல் போனால் பக்கவாதம் ஏற்படுகிறது. பெரும்பாலும், ஒரு இரத்த உறைவு மூளையில் உள்ள தமனியை அடைக்கிறது. இரத்தம் இல்லாமல் மூளை செல்களுக்கு ஆக்சிஜன் கிடைக்காது, சில நிமிடங்களில் அவை இறக்கத் தொடங்கும். இதனால் உடலின் ஒரு பக்கம் பலவீனமாகலாம், முகம் தொங்கலாம், அல்லது பேசுவது கடினமாகலாம். பக்கவாதம் ஒரு அவசர நிலை. விரைவான சிகிச்சை மூளையைக் காப்பாற்றும்."
    },
    "treatment": [
      {
        "title": {
          "en": "Clot-busting medicine",
          "kn": "ಹೆಪ್ಪು ಕರಗಿಸುವ ಔಷಧಿ",
          "ta": "உறைவைக் கரைக்கும் மருந்து"
        },
        "text": {
          "en": "If the patient reaches a stroke-ready hospital in time (usually within about 4.5 hours), doctors can give a medicine into the vein that dissolves the clot.",
          "kn": "ರೋಗಿ ಸಮಯಕ್ಕೆ (ಸಾಮಾನ್ಯವಾಗಿ ಸುಮಾರು 4.5 ಗಂಟೆಗಳಲ್ಲಿ) ಸ್ಟ್ರೋಕ್ ಚಿಕಿತ್ಸೆ ಇರುವ ಆಸ್ಪತ್ರೆಗೆ ಬಂದರೆ, ವೈದ್ಯರು ಸಿರೆಯೊಳಗೆ ಹೆಪ್ಪು ಕರಗಿಸುವ ಔಷಧಿ ಕೊಡಬಹುದು.",
          "ta": "நோயாளி நேரத்திற்குள் (பொதுவாக சுமார் 4.5 மணி நேரத்தில்) பக்கவாத சிகிச்சை உள்ள மருத்துவமனையை அடைந்தால், மருத்துவர்கள் உறைவைக் கரைக்கும் மருந்தை நரம்பில் செலுத்தலாம்."
        }
      },
      {
        "title": {
          "en": "Removing the clot",
          "kn": "ಹೆಪ್ಪನ್ನು ತೆಗೆಯುವುದು",
          "ta": "உறைவை அகற்றுதல்"
        },
        "text": {
          "en": "For a clot in a big artery, a doctor can pass a thin tube from the leg up to the brain and pull the clot out. This is called thrombectomy.",
          "kn": "ದೊಡ್ಡ ಅಪಧಮನಿಯಲ್ಲಿ ಹೆಪ್ಪು ಇದ್ದರೆ, ವೈದ್ಯರು ಕಾಲಿನಿಂದ ಮೆದುಳಿನವರೆಗೆ ತೆಳು ಕೊಳವೆಯನ್ನು ಕಳುಹಿಸಿ ಹೆಪ್ಪನ್ನು ಹೊರಗೆ ಎಳೆಯಬಹುದು. ಇದನ್ನು ಥ್ರಾಂಬೆಕ್ಟಮಿ ಎನ್ನುತ್ತಾರೆ.",
          "ta": "பெரிய தமனியில் உறைவு இருந்தால், மருத்துவர் காலிலிருந்து மூளை வரை ஒரு மெல்லிய குழாயைச் செலுத்தி உறைவை வெளியே இழுக்கலாம். இதற்கு த்ரோம்பெக்டமி என்று பெயர்."
        }
      },
      {
        "title": {
          "en": "Rehabilitation",
          "kn": "ಪುನರ್ವಸತಿ ಚಿಕಿತ್ಸೆ",
          "ta": "மறுவாழ்வு சிகிச்சை"
        },
        "text": {
          "en": "Physiotherapy, speech therapy and daily practice help the brain learn again. Many people get back much of their movement and speech over months.",
          "kn": "ಫಿಸಿಯೋಥೆರಪಿ, ಮಾತಿನ ಚಿಕಿತ್ಸೆ ಮತ್ತು ದಿನನಿತ್ಯದ ಅಭ್ಯಾಸ ಮೆದುಳು ಮತ್ತೆ ಕಲಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ. ಅನೇಕರು ತಿಂಗಳುಗಳಲ್ಲಿ ತಮ್ಮ ಚಲನೆ ಮತ್ತು ಮಾತನ್ನು ಬಹಳಷ್ಟು ಮರಳಿ ಪಡೆಯುತ್ತಾರೆ.",
          "ta": "பிசியோதெரபி, பேச்சுப் பயிற்சி மற்றும் தினசரி பயிற்சி மூளை மீண்டும் கற்க உதவுகின்றன. பலர் மாதங்களில் தங்கள் அசைவையும் பேச்சையும் பெருமளவு திரும்பப் பெறுகிறார்கள்."
        }
      },
      {
        "title": {
          "en": "Stopping another stroke",
          "kn": "ಮತ್ತೊಂದು ಪಾರ್ಶ್ವವಾಯು ತಡೆಯುವುದು",
          "ta": "மற்றொரு பக்கவாதத்தைத் தடுத்தல்"
        },
        "text": {
          "en": "Take blood thinners and other medicines as your doctor advises. Control blood pressure, sugar and cholesterol. Stop smoking.",
          "kn": "ವೈದ್ಯರು ಹೇಳಿದಂತೆ ರಕ್ತ ತೆಳು ಮಾಡುವ ಮತ್ತು ಇತರ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. ರಕ್ತದೊತ್ತಡ, ಸಕ್ಕರೆ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ನಿಯಂತ್ರಿಸಿ. ಧೂಮಪಾನ ಬಿಡಿ.",
          "ta": "மருத்துவர் சொன்னபடி இரத்தத்தை மெலிதாக்கும் மருந்துகளையும் பிற மருந்துகளையும் எடுத்துக்கொள்ளுங்கள். இரத்த அழுத்தம், சர்க்கரை மற்றும் கொலஸ்ட்ராலைக் கட்டுப்படுத்துங்கள். புகைப்பதை நிறுத்துங்கள்."
        }
      }
    ],
    "warning": {
      "en": "Think BE FAST: loss of Balance, blurred Eyes, Face drooping, Arm weakness, Speech trouble — Time to call 108. Every minute counts. Note the time the signs started.",
      "kn": "BE FAST ನೆನಪಿಡಿ: ಸಮತೋಲನ ತಪ್ಪುವುದು, ಕಣ್ಣು ಮಂಜಾಗುವುದು, ಮುಖ ಜೋತುಬೀಳುವುದು, ಕೈ ದುರ್ಬಲವಾಗುವುದು, ಮಾತು ತೊದಲುವುದು — ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ. ಪ್ರತಿ ನಿಮಿಷವೂ ಮುಖ್ಯ. ಲಕ್ಷಣಗಳು ಶುರುವಾದ ಸಮಯವನ್ನು ಗಮನಿಸಿ.",
      "ta": "BE FAST நினைவில் கொள்ளுங்கள்: சமநிலை இழப்பு, கண் மங்கல், முகம் தொங்குதல், கை பலவீனம், பேச்சுக் குழறல் — உடனே 108-ஐ அழையுங்கள். ஒவ்வொரு நிமிடமும் முக்கியம். அறிகுறிகள் தொடங்கிய நேரத்தைக் குறித்துக்கொள்ளுங்கள்."
    },
    "views": {
      "outside": {
        "healthyModel": "models/brain-healthy.glb",
        "diseasedModel": "models/brain-stroke.glb",
        "compareModel": "models/brain-compare.glb",
        "orbit": "90deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "frontal",
            "position": "0.0712m 0.1088m 0.0444m",
            "normal": "0.826m 0.092m 0.556m",
            "title": {
              "en": "Frontal lobe",
              "kn": "ಮುಂಭಾಗದ ಹಾಲೆ",
              "ta": "முன் மடல்"
            },
            "text": {
              "en": "The front part of the brain. It helps you think, plan, make decisions and control your mood. The back edge of this part starts your body movements.",
              "kn": "ಮೆದುಳಿನ ಮುಂಭಾಗ. ಇದು ಯೋಚಿಸಲು, ಯೋಜಿಸಲು, ನಿರ್ಧಾರ ಮಾಡಲು ಮತ್ತು ಮನಸ್ಥಿತಿಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಈ ಭಾಗದ ಹಿಂದಿನ ಅಂಚು ದೇಹದ ಚಲನೆಯನ್ನು ಶುರು ಮಾಡುತ್ತದೆ.",
              "ta": "மூளையின் முன் பகுதி. இது சிந்திக்க, திட்டமிட, முடிவெடுக்க மற்றும் மனநிலையைக் கட்டுப்படுத்த உதவுகிறது. இந்தப் பகுதியின் பின் விளிம்பு உடல் அசைவுகளைத் தொடங்குகிறது."
            }
          },
          {
            "id": "parietal",
            "position": "0.0574m 0.1311m -0.0166m",
            "normal": "0.748m 0.662m -0.035m",
            "title": {
              "en": "Parietal lobe",
              "kn": "ನೆತ್ತಿಯ ಹಾಲೆ",
              "ta": "சுவர் மடல்"
            },
            "text": {
              "en": "The top part of the brain. It feels touch, pain and heat. It also tells you where your body parts are without looking.",
              "kn": "ಮೆದುಳಿನ ಮೇಲ್ಭಾಗ. ಇದು ಸ್ಪರ್ಶ, ನೋವು ಮತ್ತು ಬಿಸಿಯನ್ನು ಅನುಭವಿಸುತ್ತದೆ. ನೋಡದೆಯೇ ನಿಮ್ಮ ದೇಹದ ಭಾಗಗಳು ಎಲ್ಲಿವೆ ಎಂದು ಹೇಳುತ್ತದೆ.",
              "ta": "மூளையின் மேல் பகுதி. இது தொடுதல், வலி மற்றும் வெப்பத்தை உணர்கிறது. பார்க்காமலேயே உங்கள் உடல் பாகங்கள் எங்கே உள்ளன என்று சொல்கிறது."
            }
          },
          {
            "id": "temporal",
            "position": "0.0483m 0.0537m -0.0368m",
            "normal": "0.764m -0.636m -0.108m",
            "title": {
              "en": "Temporal lobe",
              "kn": "ಕಿವಿಯ ಬಳಿಯ ಹಾಲೆ",
              "ta": "பொட்டு மடல்"
            },
            "text": {
              "en": "The side part, near your ears. It helps you hear, understand words and store memories.",
              "kn": "ಕಿವಿಯ ಹತ್ತಿರದ ಬದಿಯ ಭಾಗ. ಇದು ಕೇಳಲು, ಪದಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ನೆನಪುಗಳನ್ನು ಉಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
              "ta": "காதுக்கு அருகில் உள்ள பக்கப் பகுதி. இது கேட்க, வார்த்தைகளைப் புரிந்துகொள்ள மற்றும் நினைவுகளைச் சேமிக்க உதவுகிறது."
            }
          },
          {
            "id": "occipital",
            "position": "0.0439m 0.0907m -0.0581m",
            "normal": "0.786m -0.589m -0.187m",
            "title": {
              "en": "Occipital lobe",
              "kn": "ಹಿಂಭಾಗದ ಹಾಲೆ",
              "ta": "பின் மடல்"
            },
            "text": {
              "en": "The back part of the brain. It turns signals from your eyes into the pictures you see.",
              "kn": "ಮೆದುಳಿನ ಹಿಂಭಾಗ. ಇದು ಕಣ್ಣುಗಳಿಂದ ಬರುವ ಸಂಕೇತಗಳನ್ನು ನೀವು ನೋಡುವ ಚಿತ್ರಗಳಾಗಿ ಬದಲಾಯಿಸುತ್ತದೆ.",
              "ta": "மூளையின் பின் பகுதி. கண்களிலிருந்து வரும் சமிக்ஞைகளை நீங்கள் பார்க்கும் படங்களாக மாற்றுகிறது."
            }
          },
          {
            "id": "stem",
            "position": "-0.0035m 0.0225m -0.0161m",
            "normal": "0.942m -0.328m -0.072m",
            "title": {
              "en": "Brainstem",
              "kn": "ಮೆದುಳಿನ ಕಾಂಡ",
              "ta": "மூளைத் தண்டு"
            },
            "text": {
              "en": "This stalk joins the brain to the spinal cord. It controls things you do without thinking, like breathing, heartbeat and sleep.",
              "kn": "ಈ ಕಾಂಡ ಮೆದುಳನ್ನು ಬೆನ್ನುಹುರಿಗೆ ಜೋಡಿಸುತ್ತದೆ. ಉಸಿರಾಟ, ಹೃದಯ ಬಡಿತ ಮತ್ತು ನಿದ್ರೆಯಂತಹ ಯೋಚಿಸದೆ ನಡೆಯುವ ಕೆಲಸಗಳನ್ನು ಇದು ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
              "ta": "இந்தத் தண்டு மூளையைத் தண்டுவடத்துடன் இணைக்கிறது. சுவாசம், இதயத் துடிப்பு, தூக்கம் போன்ற யோசிக்காமல் நடக்கும் செயல்களை இது கட்டுப்படுத்துகிறது."
            }
          },
          {
            "id": "artery",
            "position": "0.0625m 0.0773m -0.0056m",
            "normal": "0.640m 0.744m -0.190m",
            "title": {
              "en": "Middle cerebral artery (red lines)",
              "kn": "ಮಧ್ಯ ಮೆದುಳಿನ ಅಪಧಮನಿ (ಕೆಂಪು ಗೆರೆಗಳು)",
              "ta": "நடு மூளைத் தமனி (சிவப்புக் கோடுகள்)"
            },
            "text": {
              "en": "This artery brings blood to the side of the brain. It feeds the areas for movement, feeling and speech. It is the artery most often blocked in a stroke.",
              "kn": "ಈ ಅಪಧಮನಿ ಮೆದುಳಿನ ಬದಿಗೆ ರಕ್ತ ತರುತ್ತದೆ. ಚಲನೆ, ಸ್ಪರ್ಶ ಮತ್ತು ಮಾತಿನ ಭಾಗಗಳಿಗೆ ಇದು ರಕ್ತ ಕೊಡುತ್ತದೆ. ಪಾರ್ಶ್ವವಾಯುವಿನಲ್ಲಿ ಹೆಚ್ಚಾಗಿ ಮುಚ್ಚುವುದು ಇದೇ ಅಪಧಮನಿ.",
              "ta": "இந்தத் தமனி மூளையின் பக்கவாட்டுக்கு இரத்தம் கொண்டுவருகிறது. அசைவு, உணர்வு மற்றும் பேச்சுப் பகுதிகளுக்கு இரத்தம் தருகிறது. பக்கவாதத்தில் பெரும்பாலும் அடைபடுவது இந்தத் தமனியே."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "clot",
            "position": "0.0653m 0.0808m 0.0038m",
            "normal": "0.324m 0.920m 0.221m",
            "title": {
              "en": "Blood clot (dark lump)",
              "kn": "ರಕ್ತದ ಹೆಪ್ಪು (ಕಪ್ಪು ಗಡ್ಡೆ)",
              "ta": "இரத்த உறைவு (கருங்கட்டி)"
            },
            "text": {
              "en": "A clot has blocked the artery. Clots often start in the heart or in a narrow neck artery, then travel up to the brain. After the clot, the branches get no blood (shown dark).",
              "kn": "ಒಂದು ಹೆಪ್ಪು ಅಪಧಮನಿಯನ್ನು ಮುಚ್ಚಿದೆ. ಹೆಪ್ಪುಗಳು ಹೆಚ್ಚಾಗಿ ಹೃದಯದಲ್ಲಿ ಅಥವಾ ಕುತ್ತಿಗೆಯ ಕಿರಿದಾದ ಅಪಧಮನಿಯಲ್ಲಿ ಶುರುವಾಗಿ, ಮೆದುಳಿಗೆ ಸಾಗುತ್ತವೆ. ಹೆಪ್ಪಿನ ನಂತರದ ಕವಲುಗಳಿಗೆ ರಕ್ತ ಸಿಗುವುದಿಲ್ಲ (ಕಪ್ಪಾಗಿ ತೋರಿಸಲಾಗಿದೆ).",
              "ta": "ஒரு உறைவு தமனியை அடைத்துவிட்டது. உறைவுகள் பெரும்பாலும் இதயத்தில் அல்லது கழுத்தில் உள்ள குறுகிய தமனியில் தொடங்கி, மூளைக்குச் செல்கின்றன. உறைவுக்குப் பின் உள்ள கிளைகளுக்கு இரத்தம் கிடைக்காது (கருப்பாகக் காட்டப்பட்டுள்ளது)."
            }
          },
          {
            "id": "area",
            "position": "0.0643m 0.1067m -0.0282m",
            "normal": "0.863m 0.166m -0.478m",
            "title": {
              "en": "Damaged brain area (purple)",
              "kn": "ಹಾನಿಯಾದ ಮೆದುಳಿನ ಭಾಗ (ನೇರಳೆ)",
              "ta": "பாதிக்கப்பட்ட மூளைப் பகுதி (ஊதா)"
            },
            "text": {
              "en": "This area gets no oxygen. Here it controls movement and feeling of the other side of the body. So a stroke on this left side can make the right arm, leg and face weak or numb.",
              "kn": "ಈ ಭಾಗಕ್ಕೆ ಆಮ್ಲಜನಕ ಸಿಗುತ್ತಿಲ್ಲ. ಇದು ದೇಹದ ಇನ್ನೊಂದು ಬದಿಯ ಚಲನೆ ಮತ್ತು ಸ್ಪರ್ಶವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಆದ್ದರಿಂದ ಈ ಎಡಭಾಗದ ಪಾರ್ಶ್ವವಾಯು ಬಲಗೈ, ಬಲಗಾಲು ಮತ್ತು ಮುಖವನ್ನು ದುರ್ಬಲ ಅಥವಾ ಜಡ ಮಾಡಬಹುದು.",
              "ta": "இந்தப் பகுதிக்கு ஆக்சிஜன் கிடைக்கவில்லை. இது உடலின் மறுபக்கத்தின் அசைவையும் உணர்வையும் கட்டுப்படுத்துகிறது. எனவே இந்த இடது பக்கப் பக்கவாதம் வலது கை, கால் மற்றும் முகத்தைப் பலவீனமாக்கலாம் அல்லது மரத்துப்போகச் செய்யலாம்."
            }
          },
          {
            "id": "speech",
            "position": "0.0738m 0.0892m 0.0212m",
            "normal": "0.952m 0.046m -0.302m",
            "title": {
              "en": "Speech area",
              "kn": "ಮಾತಿನ ಭಾಗ",
              "ta": "பேச்சுப் பகுதி"
            },
            "text": {
              "en": "In most people, speech is controlled by the left side of the brain, near here. If a stroke reaches this area, the person may have trouble speaking or understanding words.",
              "kn": "ಹೆಚ್ಚಿನ ಜನರಲ್ಲಿ, ಮಾತನ್ನು ಮೆದುಳಿನ ಎಡಭಾಗ, ಇಲ್ಲಿಯ ಹತ್ತಿರ, ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಪಾರ್ಶ್ವವಾಯು ಈ ಭಾಗವನ್ನು ತಲುಪಿದರೆ, ವ್ಯಕ್ತಿಗೆ ಮಾತನಾಡಲು ಅಥವಾ ಪದಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಕಷ್ಟವಾಗಬಹುದು.",
              "ta": "பெரும்பாலானவர்களுக்கு, பேச்சை மூளையின் இடது பக்கம், இங்கே அருகில், கட்டுப்படுத்துகிறது. பக்கவாதம் இந்தப் பகுதியை அடைந்தால், பேசுவதில் அல்லது வார்த்தைகளைப் புரிந்துகொள்வதில் சிரமம் வரலாம்."
            }
          }
        ]
      },
      "inside": {
        "healthyModel": "models/brain-healthy-inside.glb",
        "diseasedModel": "models/brain-stroke-inside.glb",
        "compareModel": "models/brain-compare-inside.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "frontal",
            "position": "0.0531m 0.1077m 0.0395m",
            "normal": "-0.102m -0.135m 0.986m",
            "title": {
              "en": "Frontal lobe",
              "kn": "ಮುಂಭಾಗದ ಹಾಲೆ",
              "ta": "முன் மடல்"
            },
            "text": {
              "en": "The front part of the brain. It helps you think, plan, make decisions and control your mood and behaviour.",
              "kn": "ಮೆದುಳಿನ ಮುಂಭಾಗ. ಇದು ಯೋಚಿಸಲು, ಯೋಜಿಸಲು, ನಿರ್ಧಾರ ಮಾಡಲು ಮತ್ತು ಮನಸ್ಥಿತಿ ಹಾಗೂ ನಡವಳಿಕೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
              "ta": "மூளையின் முன் பகுதி. இது சிந்திக்க, திட்டமிட, முடிவெடுக்க மற்றும் மனநிலை, நடத்தையைக் கட்டுப்படுத்த உதவுகிறது."
            }
          },
          {
            "id": "parietal",
            "position": "-0.0268m 0.1198m 0.0343m",
            "normal": "-0.078m -0.077m 0.994m",
            "title": {
              "en": "Parietal lobe",
              "kn": "ನೆತ್ತಿಯ ಹಾಲೆ",
              "ta": "சுவர் மடல்"
            },
            "text": {
              "en": "The top part of the brain. It feels touch, pain and heat, and tells you where your body parts are.",
              "kn": "ಮೆದುಳಿನ ಮೇಲ್ಭಾಗ. ಇದು ಸ್ಪರ್ಶ, ನೋವು ಮತ್ತು ಬಿಸಿಯನ್ನು ಅನುಭವಿಸುತ್ತದೆ, ಮತ್ತು ನಿಮ್ಮ ದೇಹದ ಭಾಗಗಳು ಎಲ್ಲಿವೆ ಎಂದು ಹೇಳುತ್ತದೆ.",
              "ta": "மூளையின் மேல் பகுதி. இது தொடுதல், வலி, வெப்பத்தை உணர்ந்து, உங்கள் உடல் பாகங்கள் எங்கே உள்ளன என்று சொல்கிறது."
            }
          },
          {
            "id": "occipital",
            "position": "-0.0666m 0.0836m 0.0242m",
            "normal": "0.028m -0.172m 0.985m",
            "title": {
              "en": "Occipital lobe",
              "kn": "ಹಿಂಭಾಗದ ಹಾಲೆ",
              "ta": "பின் மடல்"
            },
            "text": {
              "en": "The back part of the brain. It turns signals from your eyes into the pictures you see.",
              "kn": "ಮೆದುಳಿನ ಹಿಂಭಾಗ. ಇದು ಕಣ್ಣುಗಳಿಂದ ಬರುವ ಸಂಕೇತಗಳನ್ನು ನೀವು ನೋಡುವ ಚಿತ್ರಗಳಾಗಿ ಬದಲಾಯಿಸುತ್ತದೆ.",
              "ta": "மூளையின் பின் பகுதி. கண்களிலிருந்து வரும் சமிக்ஞைகளை நீங்கள் பார்க்கும் படங்களாக மாற்றுகிறது."
            }
          },
          {
            "id": "cc",
            "position": "0.0266m 0.0958m 0.0352m",
            "normal": "-0.011m -0.075m 0.997m",
            "title": {
              "en": "Corpus callosum (white curved band)",
              "kn": "ಕಾರ್ಪಸ್ ಕಲೋಸಮ್ (ಬಿಳಿ ಬಾಗಿದ ಪಟ್ಟಿ)",
              "ta": "கார்பஸ் கலோசம் (வெள்ளை வளைந்த பட்டை)"
            },
            "text": {
              "en": "A thick bridge of nerve fibres. It joins the left and right halves of the brain so they can share messages.",
              "kn": "ನರ ತಂತುಗಳ ದಪ್ಪ ಸೇತುವೆ. ಇದು ಮೆದುಳಿನ ಎಡ ಮತ್ತು ಬಲ ಭಾಗಗಳನ್ನು ಜೋಡಿಸಿ ಸಂದೇಶ ಹಂಚಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
              "ta": "நரம்பு இழைகளின் தடித்த பாலம். இது மூளையின் இடது, வலது பாதிகளை இணைத்துச் செய்திகளைப் பகிர உதவுகிறது."
            }
          },
          {
            "id": "thalamus",
            "position": "0.0134m 0.0835m 0.0307m",
            "normal": "0.018m -0.236m 0.972m",
            "title": {
              "en": "Thalamus",
              "kn": "ಥಾಲಮಸ್",
              "ta": "தாலமஸ்"
            },
            "text": {
              "en": "The brain's relay station, deep in the middle. Signals from the eyes, ears and skin pass through here on their way to the outer brain.",
              "kn": "ಮೆದುಳಿನ ಮಧ್ಯದ ಆಳದಲ್ಲಿರುವ ಸಂದೇಶ ಕೇಂದ್ರ. ಕಣ್ಣು, ಕಿವಿ ಮತ್ತು ಚರ್ಮದ ಸಂಕೇತಗಳು ಇಲ್ಲಿಂದ ಹಾದು ಮೆದುಳಿನ ಹೊರಭಾಗಕ್ಕೆ ಹೋಗುತ್ತವೆ.",
              "ta": "மூளையின் நடுவில் ஆழத்தில் உள்ள செய்தி மையம். கண், காது, தோலிலிருந்து வரும் சமிக்ஞைகள் இதன் வழியாக மூளையின் வெளிப்பகுதிக்குச் செல்கின்றன."
            }
          },
          {
            "id": "cerebellum",
            "position": "-0.0401m 0.0357m 0.0264m",
            "normal": "-0.044m -0.136m 0.990m",
            "title": {
              "en": "Cerebellum (little brain)",
              "kn": "ಅನುಮಸ್ತಿಷ್ಕ (ಚಿಕ್ಕ ಮೆದುಳು)",
              "ta": "சிறுமூளை"
            },
            "text": {
              "en": "This part at the back helps with balance and smooth, steady movement. Inside, it looks like the branches of a tree.",
              "kn": "ಹಿಂಭಾಗದ ಈ ಭಾಗ ಸಮತೋಲನ ಮತ್ತು ಸರಾಗ, ಸ್ಥಿರ ಚಲನೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಒಳಗೆ ಇದು ಮರದ ಕೊಂಬೆಗಳಂತೆ ಕಾಣುತ್ತದೆ.",
              "ta": "பின்புறம் உள்ள இந்தப் பகுதி சமநிலைக்கும் சீரான, நிலையான அசைவுக்கும் உதவுகிறது. உள்ளே இது மரக்கிளைகள் போலத் தெரியும்."
            }
          },
          {
            "id": "stem",
            "position": "0.0000m 0.0480m 0.0270m",
            "normal": "0.020m -0.004m 1.000m",
            "title": {
              "en": "Brainstem",
              "kn": "ಮೆದುಳಿನ ಕಾಂಡ",
              "ta": "மூளைத் தண்டு"
            },
            "text": {
              "en": "This stalk joins the brain to the spinal cord. It controls things you do without thinking, like breathing, heartbeat and sleep.",
              "kn": "ಈ ಕಾಂಡ ಮೆದುಳನ್ನು ಬೆನ್ನುಹುರಿಗೆ ಜೋಡಿಸುತ್ತದೆ. ಉಸಿರಾಟ, ಹೃದಯ ಬಡಿತ ಮತ್ತು ನಿದ್ರೆಯಂತಹ ಯೋಚಿಸದೆ ನಡೆಯುವ ಕೆಲಸಗಳನ್ನು ಇದು ನಿಯಂತ್ರಿಸುತ್ತದೆ.",
              "ta": "இந்தத் தண்டு மூளையைத் தண்டுவடத்துடன் இணைக்கிறது. சுவாசம், இதயத் துடிப்பு, தூக்கம் போன்ற யோசிக்காமல் நடக்கும் செயல்களை இது கட்டுப்படுத்துகிறது."
            }
          },
          {
            "id": "aca",
            "position": "0.0228m 0.1053m 0.0369m",
            "normal": "-0.134m -0.098m 0.986m",
            "title": {
              "en": "Anterior cerebral artery (red line)",
              "kn": "ಮುಂಭಾಗದ ಮೆದುಳಿನ ಅಪಧಮನಿ (ಕೆಂಪು ಗೆರೆ)",
              "ta": "முன் மூளைத் தமனி (சிவப்புக் கோடு)"
            },
            "text": {
              "en": "This artery runs along the inner side of the brain, above the white band. It brings blood to the inner frontal and top parts of the brain.",
              "kn": "ಈ ಅಪಧಮನಿ ಮೆದುಳಿನ ಒಳಬದಿಯಲ್ಲಿ, ಬಿಳಿ ಪಟ್ಟಿಯ ಮೇಲೆ ಸಾಗುತ್ತದೆ. ಇದು ಮೆದುಳಿನ ಒಳಗಿನ ಮುಂಭಾಗ ಮತ್ತು ಮೇಲ್ಭಾಗಕ್ಕೆ ರಕ್ತ ತರುತ್ತದೆ.",
              "ta": "இந்தத் தமனி மூளையின் உள்பக்கத்தில், வெள்ளைப் பட்டைக்கு மேலே செல்கிறது. இது மூளையின் உள் முன் பகுதிக்கும் மேல் பகுதிக்கும் இரத்தம் கொண்டுவருகிறது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "clot",
            "position": "0.0418m 0.1012m 0.0403m",
            "normal": "-0.061m -0.105m 0.993m",
            "title": {
              "en": "Blood clot (dark lump)",
              "kn": "ರಕ್ತದ ಹೆಪ್ಪು (ಕಪ್ಪು ಗಡ್ಡೆ)",
              "ta": "இரத்த உறைவு (கருங்கட்டி)"
            },
            "text": {
              "en": "A clot has blocked the artery. Clots often start in the heart or in a narrow neck artery, then travel up to the brain.",
              "kn": "ಒಂದು ಹೆಪ್ಪು ಅಪಧಮನಿಯನ್ನು ಮುಚ್ಚಿದೆ. ಹೆಪ್ಪುಗಳು ಹೆಚ್ಚಾಗಿ ಹೃದಯದಲ್ಲಿ ಅಥವಾ ಕುತ್ತಿಗೆಯ ಕಿರಿದಾದ ಅಪಧಮನಿಯಲ್ಲಿ ಶುರುವಾಗಿ ಮೆದುಳಿಗೆ ಸಾಗುತ್ತವೆ.",
              "ta": "ஒரு உறைவு தமனியை அடைத்துவிட்டது. உறைவுகள் பெரும்பாலும் இதயத்தில் அல்லது கழுத்தில் உள்ள குறுகிய தமனியில் தொடங்கி மூளைக்குச் செல்கின்றன."
            }
          },
          {
            "id": "after",
            "position": "-0.0013m 0.1039m 0.0349m",
            "normal": "-0.078m -0.082m 0.994m",
            "title": {
              "en": "Artery after the clot (thin dark line)",
              "kn": "ಹೆಪ್ಪಿನ ನಂತರದ ಅಪಧಮನಿ (ತೆಳು ಕಪ್ಪು ಗೆರೆ)",
              "ta": "உறைவுக்குப் பின் உள்ள தமனி (மெல்லிய கருங்கோடு)"
            },
            "text": {
              "en": "Past the clot, almost no blood can flow. Every part of the brain that this artery feeds now gets no oxygen.",
              "kn": "ಹೆಪ್ಪಿನ ನಂತರ ರಕ್ತ ಬಹುತೇಕ ಹರಿಯುವುದಿಲ್ಲ. ಈ ಅಪಧಮನಿ ರಕ್ತ ಕೊಡುವ ಮೆದುಳಿನ ಎಲ್ಲಾ ಭಾಗಗಳಿಗೆ ಈಗ ಆಮ್ಲಜನಕ ಸಿಗುವುದಿಲ್ಲ.",
              "ta": "உறைவுக்குப் பின் இரத்தம் கிட்டத்தட்டச் செல்ல முடியாது. இந்தத் தமனி இரத்தம் தரும் மூளையின் எல்லாப் பகுதிகளுக்கும் இப்போது ஆக்சிஜன் கிடைக்காது."
            }
          },
          {
            "id": "area",
            "position": "0.0075m 0.1224m 0.0373m",
            "normal": "-0.133m -0.106m 0.985m",
            "title": {
              "en": "Damaged brain area (purple)",
              "kn": "ಹಾನಿಯಾದ ಮೆದುಳಿನ ಭಾಗ (ನೇರಳೆ)",
              "ta": "பாதிக்கப்பட்ட மூளைப் பகுதி (ஊதா)"
            },
            "text": {
              "en": "This area gets no oxygen and starts to die within minutes. It controls the leg and foot on the other side of the body, so the person may suddenly have a weak or numb leg. It can also change behaviour.",
              "kn": "ಈ ಭಾಗಕ್ಕೆ ಆಮ್ಲಜನಕ ಸಿಗುವುದಿಲ್ಲ, ಮತ್ತು ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಹಾಳಾಗಲು ಶುರುವಾಗುತ್ತದೆ. ಇದು ದೇಹದ ಇನ್ನೊಂದು ಬದಿಯ ಕಾಲು ಮತ್ತು ಪಾದವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಕಾಲು ದುರ್ಬಲ ಅಥವಾ ಜಡವಾಗಬಹುದು. ನಡವಳಿಕೆಯೂ ಬದಲಾಗಬಹುದು.",
              "ta": "இந்தப் பகுதிக்கு ஆக்சிஜன் கிடைக்காமல், சில நிமிடங்களில் சேதமடையத் தொடங்கும். இது உடலின் மறுபக்கக் கால் மற்றும் பாதத்தைக் கட்டுப்படுத்துவதால், திடீரென கால் பலவீனமாகலாம் அல்லது மரத்துப்போகலாம். நடத்தையும் மாறலாம்."
            }
          }
        ]
      }
    }
  },
  {
    "id": "lungs",
    "icon": "🫁",
    "organ": {
      "en": "Lungs",
      "kn": "ಶ್ವಾಸಕೋಶಗಳು",
      "ta": "நுரையீரல்கள்"
    },
    "name": {
      "en": "Smoker's lungs",
      "kn": "ಧೂಮಪಾನಿಯ ಶ್ವಾಸಕೋಶ",
      "ta": "புகைப்பவரின் நுரையீரல்"
    },
    "short": {
      "en": "How years of smoking harm the lungs",
      "kn": "ವರ್ಷಗಳ ಧೂಮಪಾನ ಶ್ವಾಸಕೋಶಕ್ಕೆ ಹೇಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ",
      "ta": "பல ஆண்டுகள் புகைப்பது நுரையீரலை எப்படிப் பாதிக்கிறது"
    },
    "organAbout": {
      "en": "You have two lungs in your chest. When you breathe in, they take oxygen from the air into your blood. When you breathe out, they remove waste gas (carbon dioxide). The right lung has three parts. The left lung has two parts and is a little smaller, to make room for the heart.",
      "kn": "ನಿಮ್ಮ ಎದೆಯಲ್ಲಿ ಎರಡು ಶ್ವಾಸಕೋಶಗಳಿವೆ. ನೀವು ಉಸಿರು ಒಳಗೆ ಎಳೆದಾಗ, ಅವು ಗಾಳಿಯಿಂದ ಆಮ್ಲಜನಕವನ್ನು ರಕ್ತಕ್ಕೆ ತೆಗೆದುಕೊಳ್ಳುತ್ತವೆ. ಉಸಿರು ಬಿಟ್ಟಾಗ, ತ್ಯಾಜ್ಯ ಅನಿಲವನ್ನು (ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್) ಹೊರಹಾಕುತ್ತವೆ. ಬಲ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಮೂರು ಭಾಗಗಳಿವೆ. ಎಡ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಎರಡು ಭಾಗಗಳಿವೆ, ಹೃದಯಕ್ಕೆ ಜಾಗ ಕೊಡಲು ಅದು ಸ್ವಲ್ಪ ಚಿಕ್ಕದು.",
      "ta": "உங்கள் மார்பில் இரண்டு நுரையீரல்கள் உள்ளன. மூச்சை உள்ளிழுக்கும்போது, அவை காற்றிலிருந்து ஆக்சிஜனை இரத்தத்திற்கு எடுக்கின்றன. மூச்சை வெளிவிடும்போது, கழிவு வாயுவை (கார்பன் டை ஆக்சைடு) வெளியேற்றுகின்றன. வலது நுரையீரலில் மூன்று பகுதிகள் உள்ளன. இடது நுரையீரலில் இரண்டு பகுதிகள் உள்ளன, இதயத்திற்கு இடம் தர அது சற்று சிறியது."
    },
    "about": {
      "en": "Cigarette smoke has tar and many harmful chemicals. Over the years, tar collects in the lungs and turns them dark. Smoke also damages the airways and the tiny air sacs. This can lead to a cough that does not go away and shortness of breath. Doctors call this long-term damage COPD. Smoking also greatly raises the risk of lung cancer.",
      "kn": "ಸಿಗರೇಟ್ ಹೊಗೆಯಲ್ಲಿ ಟಾರ್ ಮತ್ತು ಅನೇಕ ಹಾನಿಕಾರಕ ರಾಸಾಯನಿಕಗಳಿವೆ. ವರ್ಷಗಳಲ್ಲಿ ಟಾರ್ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಸೇರಿ ಅವುಗಳನ್ನು ಕಪ್ಪಾಗಿಸುತ್ತದೆ. ಹೊಗೆ ಗಾಳಿನಾಳಗಳಿಗೆ ಮತ್ತು ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳಿಗೂ ಹಾನಿ ಮಾಡುತ್ತದೆ. ಇದರಿಂದ ಹೋಗದ ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ ಬರಬಹುದು. ವೈದ್ಯರು ಈ ದೀರ್ಘಕಾಲದ ಹಾನಿಯನ್ನು COPD ಎನ್ನುತ್ತಾರೆ. ಧೂಮಪಾನ ಶ್ವಾಸಕೋಶದ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯವನ್ನೂ ಬಹಳ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
      "ta": "சிகரெட் புகையில் தார் மற்றும் பல தீங்கான ரசாயனங்கள் உள்ளன. பல ஆண்டுகளில் தார் நுரையீரலில் படிந்து அவற்றைக் கருமையாக்குகிறது. புகை மூச்சுக் குழாய்களையும் சிறிய காற்றுப் பைகளையும் சேதப்படுத்துகிறது. இதனால் நீங்காத இருமலும் மூச்சுத் திணறலும் வரலாம். மருத்துவர்கள் இந்த நீண்டகால பாதிப்பை COPD என்பார்கள். புகைப்பது நுரையீரல் புற்றுநோய் அபாயத்தையும் பெருமளவு அதிகரிக்கிறது."
    },
    "treatment": [
      {
        "title": {
          "en": "Stop smoking",
          "kn": "ಧೂಮಪಾನ ಬಿಡಿ",
          "ta": "புகைப்பதை நிறுத்துங்கள்"
        },
        "text": {
          "en": "This is the most important step, at any age. Cough and breathing often get better within months. The risk of lung cancer and heart attack goes down year by year.",
          "kn": "ಯಾವ ವಯಸ್ಸಿನಲ್ಲಾದರೂ ಇದು ಅತ್ಯಂತ ಮುಖ್ಯ ಹೆಜ್ಜೆ. ಕೆಲವು ತಿಂಗಳುಗಳಲ್ಲಿ ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟ ಹೆಚ್ಚಾಗಿ ಸುಧಾರಿಸುತ್ತದೆ. ಶ್ವಾಸಕೋಶದ ಕ್ಯಾನ್ಸರ್ ಮತ್ತು ಹೃದಯಾಘಾತದ ಅಪಾಯ ವರ್ಷದಿಂದ ವರ್ಷಕ್ಕೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
          "ta": "எந்த வயதிலும் இதுவே மிக முக்கியமான படி. சில மாதங்களில் இருமலும் சுவாசமும் பெரும்பாலும் மேம்படும். நுரையீரல் புற்றுநோய் மற்றும் மாரடைப்பு அபாயம் ஆண்டுதோறும் குறையும்."
        }
      },
      {
        "title": {
          "en": "Help to quit",
          "kn": "ಬಿಡಲು ಸಹಾಯ",
          "ta": "நிறுத்த உதவி"
        },
        "text": {
          "en": "Counselling, nicotine gum or patches, and some medicines make quitting easier. In India, you can call the free National Tobacco Quit Line: 1800-11-2356.",
          "kn": "ಸಲಹೆ, ನಿಕೋಟಿನ್ ಗಮ್ ಅಥವಾ ಪ್ಯಾಚ್, ಮತ್ತು ಕೆಲವು ಔಷಧಿಗಳು ಬಿಡುವುದನ್ನು ಸುಲಭ ಮಾಡುತ್ತವೆ. ಭಾರತದಲ್ಲಿ ಉಚಿತ ರಾಷ್ಟ್ರೀಯ ತಂಬಾಕು ಬಿಡುವ ಸಹಾಯವಾಣಿ: 1800-11-2356.",
          "ta": "ஆலோசனை, நிகோடின் கம் அல்லது பேட்ச், சில மருந்துகள் நிறுத்துவதை எளிதாக்குகின்றன. இந்தியாவில் இலவச தேசிய புகையிலை நிறுத்த உதவி எண்: 1800-11-2356."
        }
      },
      {
        "title": {
          "en": "Inhalers",
          "kn": "ಇನ್‌ಹೇಲರ್‌ಗಳು",
          "ta": "இன்ஹேலர்கள்"
        },
        "text": {
          "en": "For people with COPD, inhaler medicines open the airways and make breathing easier.",
          "kn": "COPD ಇರುವವರಿಗೆ, ಇನ್‌ಹೇಲರ್ ಔಷಧಿಗಳು ಗಾಳಿನಾಳಗಳನ್ನು ತೆರೆದು ಉಸಿರಾಟವನ್ನು ಸುಲಭ ಮಾಡುತ್ತವೆ.",
          "ta": "COPD உள்ளவர்களுக்கு, இன்ஹேலர் மருந்துகள் மூச்சுக் குழாய்களைத் திறந்து சுவாசத்தை எளிதாக்குகின்றன."
        }
      },
      {
        "title": {
          "en": "Breathing exercises",
          "kn": "ಉಸಿರಾಟದ ವ್ಯಾಯಾಮ",
          "ta": "சுவாசப் பயிற்சிகள்"
        },
        "text": {
          "en": "A lung exercise programme (pulmonary rehab) teaches you how to breathe better and stay active.",
          "kn": "ಶ್ವಾಸಕೋಶದ ವ್ಯಾಯಾಮ ಕಾರ್ಯಕ್ರಮ (ಪಲ್ಮನರಿ ರಿಹ್ಯಾಬ್) ಚೆನ್ನಾಗಿ ಉಸಿರಾಡಲು ಮತ್ತು ಚುರುಕಾಗಿರಲು ಕಲಿಸುತ್ತದೆ.",
          "ta": "நுரையீரல் பயிற்சித் திட்டம் (பல்மனரி ரீஹேப்) நன்றாகச் சுவாசிக்கவும் சுறுசுறுப்பாக இருக்கவும் கற்றுத்தருகிறது."
        }
      }
    ],
    "warning": {
      "en": "See a doctor soon if you cough up blood, lose weight without trying, or have a cough for more than 3 weeks. Go to a hospital at once if you cannot breathe properly or your lips turn blue.",
      "kn": "ಕೆಮ್ಮಿನಲ್ಲಿ ರಕ್ತ ಬಂದರೆ, ಕಾರಣವಿಲ್ಲದೆ ತೂಕ ಕಡಿಮೆಯಾದರೆ, ಅಥವಾ 3 ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೆಮ್ಮು ಇದ್ದರೆ ಬೇಗ ವೈದ್ಯರನ್ನು ನೋಡಿ. ಸರಿಯಾಗಿ ಉಸಿರಾಡಲು ಆಗದಿದ್ದರೆ ಅಥವಾ ತುಟಿಗಳು ನೀಲಿಯಾದರೆ ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.",
      "ta": "இருமலில் இரத்தம் வந்தால், காரணமின்றி எடை குறைந்தால், அல்லது 3 வாரங்களுக்கு மேல் இருமல் இருந்தால் விரைவில் மருத்துவரைப் பாருங்கள். சரியாக மூச்சுவிட முடியாவிட்டால் அல்லது உதடுகள் நீலமானால் உடனே மருத்துவமனைக்குச் செல்லுங்கள்."
    },
    "views": {
      "outside": {
        "healthyModel": "models/lungs-healthy.glb",
        "diseasedModel": "models/lungs-smoker.glb",
        "compareModel": "models/lungs-compare.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "trachea",
            "position": "0.0001m 0.1729m 0.0175m",
            "normal": "0.046m -0.240m 0.970m",
            "title": {
              "en": "Windpipe (trachea)",
              "kn": "ಶ್ವಾಸನಾಳ",
              "ta": "மூச்சுக்குழாய்"
            },
            "text": {
              "en": "The main air tube. Its rings of cartilage keep it open. It carries air from your nose and mouth down to the lungs.",
              "kn": "ಮುಖ್ಯ ಗಾಳಿ ಕೊಳವೆ. ಇದರ ಮೃದ್ವಸ್ಥಿಯ ಉಂಗುರಗಳು ಇದನ್ನು ತೆರೆದಿಡುತ್ತವೆ. ಇದು ಮೂಗು ಮತ್ತು ಬಾಯಿಯಿಂದ ಗಾಳಿಯನ್ನು ಶ್ವಾಸಕೋಶಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ.",
              "ta": "முக்கிய காற்றுக் குழாய். இதன் குருத்தெலும்பு வளையங்கள் இதைத் திறந்து வைக்கின்றன. மூக்கு, வாயிலிருந்து காற்றை நுரையீரலுக்குக் கொண்டு செல்கிறது."
            }
          },
          {
            "id": "rlung",
            "position": "-0.0530m 0.1089m 0.0337m",
            "normal": "-0.254m 0.292m 0.922m",
            "title": {
              "en": "Right lung",
              "kn": "ಬಲ ಶ್ವಾಸಕೋಶ",
              "ta": "வலது நுரையீரல்"
            },
            "text": {
              "en": "Pink and soft, like a sponge. It has three parts (lobes). Inside are millions of tiny air sacs called alveoli, where oxygen passes into the blood.",
              "kn": "ಗುಲಾಬಿ ಬಣ್ಣ, ಸ್ಪಂಜಿನಂತೆ ಮೃದು. ಇದರಲ್ಲಿ ಮೂರು ಭಾಗಗಳಿವೆ (ಹಾಲೆಗಳು). ಒಳಗೆ ಆಲ್ವಿಯೋಲೈ ಎಂಬ ಲಕ್ಷಾಂತರ ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳಿವೆ, ಅಲ್ಲಿ ಆಮ್ಲಜನಕ ರಕ್ತಕ್ಕೆ ಹೋಗುತ್ತದೆ.",
              "ta": "இளஞ்சிவப்பு நிறம், பஞ்சு போல மென்மை. இதில் மூன்று பகுதிகள் (மடல்கள்) உள்ளன. உள்ளே அல்வியோலை எனப்படும் லட்சக்கணக்கான சிறிய காற்றுப் பைகள் உள்ளன, அங்கே ஆக்சிஜன் இரத்தத்திற்குச் செல்கிறது."
            }
          },
          {
            "id": "llung",
            "position": "0.0394m 0.1087m 0.0395m",
            "normal": "0.011m 0.192m 0.981m",
            "title": {
              "en": "Left lung",
              "kn": "ಎಡ ಶ್ವಾಸಕೋಶ",
              "ta": "இடது நுரையீரல்"
            },
            "text": {
              "en": "It has two parts (lobes) and is a little smaller than the right lung, because the heart sits next to it.",
              "kn": "ಇದರಲ್ಲಿ ಎರಡು ಭಾಗಗಳಿವೆ (ಹಾಲೆಗಳು). ಹೃದಯ ಪಕ್ಕದಲ್ಲಿರುವುದರಿಂದ ಇದು ಬಲ ಶ್ವಾಸಕೋಶಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಚಿಕ್ಕದು.",
              "ta": "இதில் இரண்டு பகுதிகள் (மடல்கள்) உள்ளன. இதயம் அருகில் இருப்பதால் இது வலது நுரையீரலை விடச் சற்று சிறியது."
            }
          },
          {
            "id": "fissure",
            "position": "-0.0260m 0.0867m 0.0453m",
            "normal": "0.128m 0.019m 0.992m",
            "title": {
              "en": "Fissure (line between lobes)",
              "kn": "ಬಿರುಕು (ಹಾಲೆಗಳ ನಡುವಿನ ಗೆರೆ)",
              "ta": "பிளவு (மடல்களுக்கு இடையிலான கோடு)"
            },
            "text": {
              "en": "This deep line divides the lung into parts called lobes. The right lung has three lobes, the left has two.",
              "kn": "ಈ ಆಳವಾದ ಗೆರೆ ಶ್ವಾಸಕೋಶವನ್ನು ಹಾಲೆಗಳು ಎಂಬ ಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸುತ್ತದೆ. ಬಲ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಮೂರು, ಎಡದಲ್ಲಿ ಎರಡು ಹಾಲೆಗಳಿವೆ.",
              "ta": "இந்த ஆழமான கோடு நுரையீரலை மடல்கள் எனப்படும் பகுதிகளாகப் பிரிக்கிறது. வலது நுரையீரலில் மூன்று, இடதில் இரண்டு மடல்கள் உள்ளன."
            }
          },
          {
            "id": "lower",
            "position": "-0.0527m 0.0651m 0.0509m",
            "normal": "-0.117m 0.064m 0.991m",
            "title": {
              "en": "Lower lobe",
              "kn": "ಕೆಳಗಿನ ಹಾಲೆ",
              "ta": "கீழ் மடல்"
            },
            "text": {
              "en": "The bottom part of the lung rests on the diaphragm, the muscle that moves down to pull air in when you breathe.",
              "kn": "ಶ್ವಾಸಕೋಶದ ಕೆಳಭಾಗ ವಪೆಯ (ಡಯಾಫ್ರಮ್) ಮೇಲೆ ಇರುತ್ತದೆ. ಉಸಿರು ಎಳೆದಾಗ ಈ ಸ್ನಾಯು ಕೆಳಗೆ ಸರಿದು ಗಾಳಿಯನ್ನು ಒಳಗೆ ಎಳೆಯುತ್ತದೆ.",
              "ta": "நுரையீரலின் கீழ்ப்பகுதி உதரவிதானத்தின் (டயாஃப்ரம்) மேல் உள்ளது. மூச்சை உள்ளிழுக்கும்போது இந்தத் தசை கீழே நகர்ந்து காற்றை உள்ளே இழுக்கிறது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "tar",
            "position": "0.0527m 0.0869m 0.0448m",
            "normal": "0.084m 0.141m 0.986m",
            "title": {
              "en": "Tar (dark spots and colour)",
              "kn": "ಟಾರ್ (ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಮತ್ತು ಬಣ್ಣ)",
              "ta": "தார் (கரும்புள்ளிகள், நிறம்)"
            },
            "text": {
              "en": "Sticky tar from cigarette smoke collects in the lungs. It turns them dark grey and brown, and it carries chemicals that can cause cancer.",
              "kn": "ಸಿಗರೇಟ್ ಹೊಗೆಯ ಅಂಟು ಟಾರ್ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಸೇರುತ್ತದೆ. ಅದು ಅವುಗಳನ್ನು ಗಾಢ ಬೂದು ಮತ್ತು ಕಂದಾಗಿಸುತ್ತದೆ, ಮತ್ತು ಕ್ಯಾನ್ಸರ್ ಉಂಟುಮಾಡುವ ರಾಸಾಯನಿಕಗಳನ್ನು ಹೊಂದಿದೆ.",
              "ta": "சிகரெட் புகையின் ஒட்டும் தார் நுரையீரலில் சேர்கிறது. அது அவற்றை அடர் சாம்பல், பழுப்பு நிறமாக்குகிறது, புற்றுநோய் உண்டாக்கும் ரசாயனங்களையும் கொண்டுள்ளது."
            }
          },
          {
            "id": "sacs",
            "position": "-0.0527m 0.0651m 0.0509m",
            "normal": "-0.117m 0.064m 0.991m",
            "title": {
              "en": "Damaged air sacs",
              "kn": "ಹಾನಿಯಾದ ಗಾಳಿ ಚೀಲಗಳು",
              "ta": "சேதமடைந்த காற்றுப் பைகள்"
            },
            "text": {
              "en": "Smoke breaks the thin walls of the tiny air sacs. Less oxygen can get into the blood, so you feel out of breath. This damage is called emphysema. It does not heal fully.",
              "kn": "ಹೊಗೆ ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳ ತೆಳು ಗೋಡೆಗಳನ್ನು ಒಡೆಯುತ್ತದೆ. ರಕ್ತಕ್ಕೆ ಕಡಿಮೆ ಆಮ್ಲಜನಕ ಹೋಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಉಸಿರು ಕಟ್ಟಿದಂತಾಗುತ್ತದೆ. ಈ ಹಾನಿಯನ್ನು ಎಂಫಿಸೀಮಾ ಎನ್ನುತ್ತಾರೆ. ಇದು ಪೂರ್ತಿ ಗುಣವಾಗುವುದಿಲ್ಲ.",
              "ta": "புகை சிறிய காற்றுப் பைகளின் மெல்லிய சுவர்களை உடைக்கிறது. இரத்தத்திற்குக் குறைவான ஆக்சிஜன் செல்வதால் மூச்சு வாங்குகிறது. இந்தப் பாதிப்புக்கு எம்ஃபிசீமா என்று பெயர். இது முழுமையாகக் குணமாகாது."
            }
          },
          {
            "id": "airways",
            "position": "0.0001m 0.1515m 0.0148m",
            "normal": "0.063m -0.063m 0.996m",
            "title": {
              "en": "Swollen airways",
              "kn": "ಊದಿಕೊಂಡ ಗಾಳಿನಾಳಗಳು",
              "ta": "வீங்கிய மூச்சுக் குழாய்கள்"
            },
            "text": {
              "en": "The airways become swollen and make extra mucus. This causes the daily cough that many smokers have.",
              "kn": "ಗಾಳಿನಾಳಗಳು ಊದಿಕೊಂಡು ಹೆಚ್ಚು ಕಫ ಮಾಡುತ್ತವೆ. ಇದರಿಂದ ಅನೇಕ ಧೂಮಪಾನಿಗಳಿಗೆ ಪ್ರತಿದಿನ ಕೆಮ್ಮು ಬರುತ್ತದೆ.",
              "ta": "மூச்சுக் குழாய்கள் வீங்கி அதிக சளியை உண்டாக்குகின்றன. இதனால் பல புகைப்பவர்களுக்குத் தினமும் இருமல் வருகிறது."
            }
          }
        ]
      },
      "inside": {
        "healthyModel": "models/lungs-healthy-inside.glb",
        "diseasedModel": "models/lungs-smoker-inside.glb",
        "compareModel": "models/lungs-compare-inside.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "trachea",
            "position": "0.0002m 0.2168m 0.0086m",
            "normal": "0.075m 0.044m 0.996m",
            "title": {
              "en": "Windpipe (trachea)",
              "kn": "ಶ್ವಾಸನಾಳ",
              "ta": "மூச்சுக்குழாய்"
            },
            "text": {
              "en": "The main air tube. Its rings of cartilage keep it open. It carries air from your nose and mouth down to the lungs.",
              "kn": "ಮುಖ್ಯ ಗಾಳಿ ಕೊಳವೆ. ಇದರ ಮೃದ್ವಸ್ಥಿಯ ಉಂಗುರಗಳು ಇದನ್ನು ತೆರೆದಿಡುತ್ತವೆ. ಇದು ಮೂಗು ಮತ್ತು ಬಾಯಿಯಿಂದ ಗಾಳಿಯನ್ನು ಶ್ವಾಸಕೋಶಕ್ಕೆ ಒಯ್ಯುತ್ತದೆ.",
              "ta": "முக்கிய காற்றுக் குழாய். இதன் குருத்தெலும்பு வளையங்கள் இதைத் திறந்து வைக்கின்றன. மூக்கு, வாயிலிருந்து காற்றை நுரையீரலுக்குக் கொண்டு செல்கிறது."
            }
          },
          {
            "id": "bronchi",
            "position": "0.0107m 0.1729m 0.0076m",
            "normal": "-0.074m -0.207m 0.976m",
            "title": {
              "en": "Airways (bronchi)",
              "kn": "ಗಾಳಿನಾಳಗಳು (ಬ್ರಾಂಕೈ)",
              "ta": "மூச்சுக் கிளைக்குழாய்கள் (பிராங்கை)"
            },
            "text": {
              "en": "The windpipe splits into two tubes, one for each lung. Inside the lung they split again many times, like the branches of a tree.",
              "kn": "ಶ್ವಾಸನಾಳ ಎರಡು ಕೊಳವೆಗಳಾಗಿ ಒಡೆಯುತ್ತದೆ, ಪ್ರತಿ ಶ್ವಾಸಕೋಶಕ್ಕೆ ಒಂದು. ಶ್ವಾಸಕೋಶದೊಳಗೆ ಮರದ ಕೊಂಬೆಗಳಂತೆ ಮತ್ತೆ ಮತ್ತೆ ಕವಲೊಡೆಯುತ್ತವೆ.",
              "ta": "மூச்சுக்குழாய் இரண்டு குழாய்களாகப் பிரிகிறது, ஒவ்வொரு நுரையீரலுக்கும் ஒன்று. நுரையீரலுக்குள் மரக்கிளைகள் போல மீண்டும் மீண்டும் பிரிகின்றன."
            }
          },
          {
            "id": "rlung",
            "position": "-0.0724m 0.1084m 0.0576m",
            "normal": "-0.153m 0.046m 0.987m",
            "title": {
              "en": "Right lung",
              "kn": "ಬಲ ಶ್ವಾಸಕೋಶ",
              "ta": "வலது நுரையீரல்"
            },
            "text": {
              "en": "Pink and soft, like a sponge. It has three parts (lobes). Inside are millions of tiny air sacs called alveoli, where oxygen passes into the blood.",
              "kn": "ಗುಲಾಬಿ ಬಣ್ಣ, ಸ್ಪಂಜಿನಂತೆ ಮೃದು. ಇದರಲ್ಲಿ ಮೂರು ಭಾಗಗಳಿವೆ (ಹಾಲೆಗಳು). ಒಳಗೆ ಆಲ್ವಿಯೋಲೈ ಎಂಬ ಲಕ್ಷಾಂತರ ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳಿವೆ, ಅಲ್ಲಿ ಆಮ್ಲಜನಕ ರಕ್ತಕ್ಕೆ ಹೋಗುತ್ತದೆ.",
              "ta": "இளஞ்சிவப்பு நிறம், பஞ்சு போல மென்மை. இதில் மூன்று பகுதிகள் (மடல்கள்) உள்ளன. உள்ளே அல்வியோலை எனப்படும் லட்சக்கணக்கான சிறிய காற்றுப் பைகள் உள்ளன, அங்கே ஆக்சிஜன் இரத்தத்திற்குச் செல்கிறது."
            }
          },
          {
            "id": "llung",
            "position": "0.0966m 0.1084m 0.0507m",
            "normal": "0.232m 0.049m 0.971m",
            "title": {
              "en": "Left lung",
              "kn": "ಎಡ ಶ್ವಾಸಕೋಶ",
              "ta": "இடது நுரையீரல்"
            },
            "text": {
              "en": "It has two parts (lobes) and is a little smaller than the right lung, because the heart sits next to it.",
              "kn": "ಇದರಲ್ಲಿ ಎರಡು ಭಾಗಗಳಿವೆ (ಹಾಲೆಗಳು). ಹೃದಯ ಪಕ್ಕದಲ್ಲಿರುವುದರಿಂದ ಇದು ಬಲ ಶ್ವಾಸಕೋಶಕ್ಕಿಂತ ಸ್ವಲ್ಪ ಚಿಕ್ಕದು.",
              "ta": "இதில் இரண்டு பகுதிகள் (மடல்கள்) உள்ளன. இதயம் அருகில் இருப்பதால் இது வலது நுரையீரலை விடச் சற்று சிறியது."
            }
          },
          {
            "id": "notch",
            "position": "0.0232m 0.0649m -0.0221m",
            "normal": "-0.417m -0.033m 0.908m",
            "title": {
              "en": "Heart notch",
              "kn": "ಹೃದಯದ ಕುಳಿ",
              "ta": "இதயப் பள்ளம்"
            },
            "text": {
              "en": "This dip in the left lung makes space for the heart.",
              "kn": "ಎಡ ಶ್ವಾಸಕೋಶದ ಈ ತಗ್ಗು ಹೃದಯಕ್ಕೆ ಜಾಗ ಮಾಡಿಕೊಡುತ್ತದೆ.",
              "ta": "இடது நுரையீரலில் உள்ள இந்தப் பள்ளம் இதயத்திற்கு இடம் தருகிறது."
            }
          },
          {
            "id": "lower",
            "position": "-0.0724m 0.0649m 0.0562m",
            "normal": "-0.133m -0.044m 0.990m",
            "title": {
              "en": "Lower lobe",
              "kn": "ಕೆಳಗಿನ ಹಾಲೆ",
              "ta": "கீழ் மடல்"
            },
            "text": {
              "en": "The bottom part of the lung rests on the diaphragm, the muscle that moves down to pull air in when you breathe.",
              "kn": "ಶ್ವಾಸಕೋಶದ ಕೆಳಭಾಗ ವಪೆಯ (ಡಯಾಫ್ರಮ್) ಮೇಲೆ ಇರುತ್ತದೆ. ಉಸಿರು ಎಳೆದಾಗ ಈ ಸ್ನಾಯು ಕೆಳಗೆ ಸರಿದು ಗಾಳಿಯನ್ನು ಒಳಗೆ ಎಳೆಯುತ್ತದೆ.",
              "ta": "நுரையீரலின் கீழ்ப்பகுதி உதரவிதானத்தின் (டயாஃப்ரம்) மேல் உள்ளது. மூச்சை உள்ளிழுக்கும்போது இந்தத் தசை கீழே நகர்ந்து காற்றை உள்ளே இழுக்கிறது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "tar",
            "position": "0.0724m 0.0866m 0.0620m",
            "normal": "0.173m -0.014m 0.985m",
            "title": {
              "en": "Tar (dark spots and colour)",
              "kn": "ಟಾರ್ (ಕಪ್ಪು ಚುಕ್ಕೆಗಳು ಮತ್ತು ಬಣ್ಣ)",
              "ta": "தார் (கரும்புள்ளிகள், நிறம்)"
            },
            "text": {
              "en": "Sticky tar from cigarette smoke collects in the lungs. It turns them dark grey and brown, and it carries chemicals that can cause cancer.",
              "kn": "ಸಿಗರೇಟ್ ಹೊಗೆಯ ಅಂಟು ಟಾರ್ ಶ್ವಾಸಕೋಶದಲ್ಲಿ ಸೇರುತ್ತದೆ. ಅದು ಅವುಗಳನ್ನು ಗಾಢ ಬೂದು ಮತ್ತು ಕಂದಾಗಿಸುತ್ತದೆ, ಮತ್ತು ಕ್ಯಾನ್ಸರ್ ಉಂಟುಮಾಡುವ ರಾಸಾಯನಿಕಗಳನ್ನು ಹೊಂದಿದೆ.",
              "ta": "சிகரெட் புகையின் ஒட்டும் தார் நுரையீரலில் சேர்கிறது. அது அவற்றை அடர் சாம்பல், பழுப்பு நிறமாக்குகிறது, புற்றுநோய் உண்டாக்கும் ரசாயனங்களையும் கொண்டுள்ளது."
            }
          },
          {
            "id": "sacs",
            "position": "-0.0965m 0.0650m 0.0483m",
            "normal": "-0.190m -0.024m 0.982m",
            "title": {
              "en": "Damaged air sacs",
              "kn": "ಹಾನಿಯಾದ ಗಾಳಿ ಚೀಲಗಳು",
              "ta": "சேதமடைந்த காற்றுப் பைகள்"
            },
            "text": {
              "en": "Smoke breaks the thin walls of the tiny air sacs. Less oxygen can get into the blood, so you feel out of breath. This damage is called emphysema. It does not heal fully.",
              "kn": "ಹೊಗೆ ಸಣ್ಣ ಗಾಳಿ ಚೀಲಗಳ ತೆಳು ಗೋಡೆಗಳನ್ನು ಒಡೆಯುತ್ತದೆ. ರಕ್ತಕ್ಕೆ ಕಡಿಮೆ ಆಮ್ಲಜನಕ ಹೋಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಉಸಿರು ಕಟ್ಟಿದಂತಾಗುತ್ತದೆ. ಈ ಹಾನಿಯನ್ನು ಎಂಫಿಸೀಮಾ ಎನ್ನುತ್ತಾರೆ. ಇದು ಪೂರ್ತಿ ಗುಣವಾಗುವುದಿಲ್ಲ.",
              "ta": "புகை சிறிய காற்றுப் பைகளின் மெல்லிய சுவர்களை உடைக்கிறது. இரத்தத்திற்குக் குறைவான ஆக்சிஜன் செல்வதால் மூச்சு வாங்குகிறது. இந்தப் பாதிப்புக்கு எம்ஃபிசீமா என்று பெயர். இது முழுமையாகக் குணமாகாது."
            }
          },
          {
            "id": "airways",
            "position": "0.0107m 0.1729m 0.0076m",
            "normal": "-0.074m -0.207m 0.976m",
            "title": {
              "en": "Swollen airways",
              "kn": "ಊದಿಕೊಂಡ ಗಾಳಿನಾಳಗಳು",
              "ta": "வீங்கிய மூச்சுக் குழாய்கள்"
            },
            "text": {
              "en": "The airways become swollen and make extra mucus. This causes the daily cough that many smokers have.",
              "kn": "ಗಾಳಿನಾಳಗಳು ಊದಿಕೊಂಡು ಹೆಚ್ಚು ಕಫ ಮಾಡುತ್ತವೆ. ಇದರಿಂದ ಅನೇಕ ಧೂಮಪಾನಿಗಳಿಗೆ ಪ್ರತಿದಿನ ಕೆಮ್ಮು ಬರುತ್ತದೆ.",
              "ta": "மூச்சுக் குழாய்கள் வீங்கி அதிக சளியை உண்டாக்குகின்றன. இதனால் பல புகைப்பவர்களுக்குத் தினமும் இருமல் வருகிறது."
            }
          }
        ]
      }
    }
  },
  {
    "id": "liver",
    "icon": "🟤",
    "organ": {
      "en": "Liver",
      "kn": "ಯಕೃತ್ತು (ಲಿವರ್)",
      "ta": "கல்லீரல்"
    },
    "name": {
      "en": "Fatty liver",
      "kn": "ಕೊಬ್ಬಿನ ಯಕೃತ್ತು (ಫ್ಯಾಟಿ ಲಿವರ್)",
      "ta": "கொழுப்புக் கல்லீரல்"
    },
    "short": {
      "en": "When too much fat builds up in the liver",
      "kn": "ಯಕೃತ್ತಿನಲ್ಲಿ ಹೆಚ್ಚು ಕೊಬ್ಬು ಸೇರಿದಾಗ",
      "ta": "கல்லீரலில் அதிக கொழுப்பு சேரும்போது"
    },
    "organAbout": {
      "en": "The liver is the biggest organ inside your body. It sits on the right side of your belly, under the ribs. It cleans the blood, stores energy, makes bile to digest fat, and breaks down medicines and alcohol. The liver can repair itself if the damage is caught early.",
      "kn": "ಯಕೃತ್ತು ದೇಹದೊಳಗಿನ ಅತಿದೊಡ್ಡ ಅಂಗ. ಇದು ಹೊಟ್ಟೆಯ ಬಲಭಾಗದಲ್ಲಿ, ಪಕ್ಕೆಲುಬುಗಳ ಕೆಳಗೆ ಇರುತ್ತದೆ. ಇದು ರಕ್ತವನ್ನು ಶುದ್ಧಗೊಳಿಸುತ್ತದೆ, ಶಕ್ತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ, ಕೊಬ್ಬನ್ನು ಜೀರ್ಣಿಸಲು ಪಿತ್ತರಸ ಮಾಡುತ್ತದೆ, ಮತ್ತು ಔಷಧಿ ಹಾಗೂ ಮದ್ಯವನ್ನು ವಿಭಜಿಸುತ್ತದೆ. ಹಾನಿಯನ್ನು ಬೇಗ ಗುರುತಿಸಿದರೆ ಯಕೃತ್ತು ತನ್ನನ್ನು ತಾನೇ ಸರಿಪಡಿಸಿಕೊಳ್ಳಬಲ್ಲದು.",
      "ta": "கல்லீரல் உடலுக்குள் உள்ள மிகப்பெரிய உறுப்பு. இது வயிற்றின் வலது பக்கத்தில், விலா எலும்புகளுக்குக் கீழே உள்ளது. இது இரத்தத்தைச் சுத்தம் செய்கிறது, ஆற்றலைச் சேமிக்கிறது, கொழுப்பைச் செரிக்க பித்தநீரை உருவாக்குகிறது, மருந்துகளையும் மதுவையும் உடைக்கிறது. பாதிப்பு ஆரம்பத்திலேயே கண்டறியப்பட்டால் கல்லீரல் தன்னைத் தானே சரிசெய்துகொள்ளும்."
    },
    "about": {
      "en": "In fatty liver, too much fat builds up inside the liver cells. Common causes are being overweight, diabetes, high cholesterol and drinking alcohol. Most people feel nothing at first. It is often found on an ultrasound or a blood test. If it is not treated, the fat can cause swelling and scarring of the liver. Over many years, this can lead to serious liver damage called cirrhosis.",
      "kn": "ಫ್ಯಾಟಿ ಲಿವರ್‌ನಲ್ಲಿ, ಯಕೃತ್ತಿನ ಜೀವಕೋಶಗಳಲ್ಲಿ ಹೆಚ್ಚು ಕೊಬ್ಬು ಸೇರುತ್ತದೆ. ಹೆಚ್ಚು ತೂಕ, ಸಕ್ಕರೆ ಕಾಯಿಲೆ, ಹೆಚ್ಚು ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ಮದ್ಯಪಾನ ಸಾಮಾನ್ಯ ಕಾರಣಗಳು. ಮೊದಲಿಗೆ ಹೆಚ್ಚಿನವರಿಗೆ ಏನೂ ಅನಿಸುವುದಿಲ್ಲ. ಇದು ಹೆಚ್ಚಾಗಿ ಅಲ್ಟ್ರಾಸೌಂಡ್ ಅಥವಾ ರಕ್ತ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ. ಚಿಕಿತ್ಸೆ ಮಾಡದಿದ್ದರೆ, ಕೊಬ್ಬು ಯಕೃತ್ತಿನಲ್ಲಿ ಊತ ಮತ್ತು ಗಾಯದ ಗುರುತು ಉಂಟುಮಾಡಬಹುದು. ಹಲವು ವರ್ಷಗಳಲ್ಲಿ ಇದು ಸಿರೋಸಿಸ್ ಎಂಬ ಗಂಭೀರ ಹಾನಿಗೆ ಕಾರಣವಾಗಬಹುದು.",
      "ta": "கொழுப்புக் கல்லீரலில், கல்லீரல் செல்களுக்குள் அதிக கொழுப்பு சேர்கிறது. அதிக எடை, சர்க்கரை நோய், அதிக கொலஸ்ட்ரால் மற்றும் மது அருந்துதல் பொதுவான காரணங்கள். ஆரம்பத்தில் பெரும்பாலானவர்களுக்கு எதுவும் தெரியாது. இது பெரும்பாலும் அல்ட்ராசவுண்ட் அல்லது இரத்தப் பரிசோதனையில் கண்டறியப்படுகிறது. சிகிச்சை இல்லாவிட்டால், கொழுப்பு கல்லீரலில் வீக்கத்தையும் தழும்பையும் உண்டாக்கலாம். பல ஆண்டுகளில் இது சிரோசிஸ் எனப்படும் கடுமையான பாதிப்புக்கு வழிவகுக்கலாம்."
    },
    "treatment": [
      {
        "title": {
          "en": "Lose some weight",
          "kn": "ಸ್ವಲ್ಪ ತೂಕ ಇಳಿಸಿ",
          "ta": "சிறிது எடையைக் குறையுங்கள்"
        },
        "text": {
          "en": "Losing even 5 to 10 percent of your body weight, slowly, can remove much of the fat from the liver.",
          "kn": "ನಿಮ್ಮ ದೇಹದ ತೂಕದ 5 ರಿಂದ 10 ಪ್ರತಿಶತ ನಿಧಾನವಾಗಿ ಇಳಿಸಿದರೂ, ಯಕೃತ್ತಿನ ಬಹಳಷ್ಟು ಕೊಬ್ಬು ಕಡಿಮೆಯಾಗಬಹುದು.",
          "ta": "உங்கள் உடல் எடையில் 5 முதல் 10 சதவீதம் மெதுவாகக் குறைத்தாலே, கல்லீரலின் கொழுப்பு பெருமளவு குறையலாம்."
        }
      },
      {
        "title": {
          "en": "Better food and exercise",
          "kn": "ಉತ್ತಮ ಆಹಾರ ಮತ್ತು ವ್ಯಾಯಾಮ",
          "ta": "நல்ல உணவும் உடற்பயிற்சியும்"
        },
        "text": {
          "en": "Eat less sugar, sweets, fried food and white rice or maida. Eat more vegetables. Walk or exercise for about 30 minutes most days.",
          "kn": "ಸಕ್ಕರೆ, ಸಿಹಿ, ಕರಿದ ಆಹಾರ ಮತ್ತು ಬಿಳಿ ಅನ್ನ ಅಥವಾ ಮೈದಾ ಕಡಿಮೆ ತಿನ್ನಿ. ತರಕಾರಿ ಹೆಚ್ಚು ತಿನ್ನಿ. ಹೆಚ್ಚಿನ ದಿನಗಳಲ್ಲಿ ಸುಮಾರು 30 ನಿಮಿಷ ನಡೆಯಿರಿ ಅಥವಾ ವ್ಯಾಯಾಮ ಮಾಡಿ.",
          "ta": "சர்க்கரை, இனிப்பு, பொரித்த உணவு மற்றும் வெள்ளை அரிசி அல்லது மைதாவைக் குறையுங்கள். காய்கறிகளை அதிகம் சாப்பிடுங்கள். பெரும்பாலான நாட்களில் சுமார் 30 நிமிடம் நடங்கள் அல்லது உடற்பயிற்சி செய்யுங்கள்."
        }
      },
      {
        "title": {
          "en": "Avoid alcohol",
          "kn": "ಮದ್ಯ ಬೇಡ",
          "ta": "மதுவைத் தவிருங்கள்"
        },
        "text": {
          "en": "Alcohol adds more damage to a fatty liver. Your doctor will usually advise you to stop it.",
          "kn": "ಮದ್ಯ ಕೊಬ್ಬಿನ ಯಕೃತ್ತಿಗೆ ಇನ್ನಷ್ಟು ಹಾನಿ ಮಾಡುತ್ತದೆ. ವೈದ್ಯರು ಸಾಮಾನ್ಯವಾಗಿ ಅದನ್ನು ಬಿಡಲು ಹೇಳುತ್ತಾರೆ.",
          "ta": "மது கொழுப்புக் கல்லீரலுக்கு மேலும் பாதிப்பைச் சேர்க்கிறது. மருத்துவர் பொதுவாக அதை நிறுத்தச் சொல்வார்."
        }
      },
      {
        "title": {
          "en": "Control sugar and cholesterol",
          "kn": "ಸಕ್ಕರೆ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ನಿಯಂತ್ರಿಸಿ",
          "ta": "சர்க்கரை, கொலஸ்ட்ராலைக் கட்டுப்படுத்துங்கள்"
        },
        "text": {
          "en": "Treating diabetes and high cholesterol protects the liver. Your doctor may also check for liver scarring with simple tests.",
          "kn": "ಸಕ್ಕರೆ ಕಾಯಿಲೆ ಮತ್ತು ಹೆಚ್ಚು ಕೊಲೆಸ್ಟ್ರಾಲ್‌ಗೆ ಚಿಕಿತ್ಸೆ ಯಕೃತ್ತನ್ನು ರಕ್ಷಿಸುತ್ತದೆ. ವೈದ್ಯರು ಸರಳ ಪರೀಕ್ಷೆಗಳಿಂದ ಯಕೃತ್ತಿನ ಗಾಯದ ಗುರುತನ್ನೂ ಪರಿಶೀಲಿಸಬಹುದು.",
          "ta": "சர்க்கரை நோய் மற்றும் அதிக கொலஸ்ட்ராலுக்குச் சிகிச்சை கல்லீரலைப் பாதுகாக்கிறது. மருத்துவர் எளிய சோதனைகள் மூலம் கல்லீரல் தழும்பையும் பரிசோதிக்கலாம்."
        }
      }
    ],
    "warning": {
      "en": "Go to a doctor at once if your eyes or skin turn yellow, your belly or legs swell, you vomit blood, or you feel very confused or sleepy.",
      "kn": "ಕಣ್ಣು ಅಥವಾ ಚರ್ಮ ಹಳದಿಯಾದರೆ, ಹೊಟ್ಟೆ ಅಥವಾ ಕಾಲುಗಳು ಊದಿಕೊಂಡರೆ, ರಕ್ತ ವಾಂತಿಯಾದರೆ, ಅಥವಾ ತುಂಬಾ ಗೊಂದಲ ಅಥವಾ ನಿದ್ದೆ ಬಂದಂತಾದರೆ ತಕ್ಷಣ ವೈದ್ಯರ ಬಳಿ ಹೋಗಿ.",
      "ta": "கண்கள் அல்லது தோல் மஞ்சளானால், வயிறு அல்லது கால்கள் வீங்கினால், இரத்த வாந்தி வந்தால், அல்லது மிகவும் குழப்பமாக அல்லது தூக்கமாக உணர்ந்தால் உடனே மருத்துவரிடம் செல்லுங்கள்."
    },
    "views": {
      "outside": {
        "healthyModel": "models/liver-healthy.glb",
        "diseasedModel": "models/liver-fatty.glb",
        "compareModel": "models/liver-compare.glb",
        "orbit": "0deg 75deg auto",
        "healthyHotspots": [
          {
            "id": "right",
            "position": "-0.0501m 0.0734m 0.0541m",
            "normal": "-0.050m -0.114m 0.992m",
            "title": {
              "en": "Right lobe",
              "kn": "ಬಲ ಹಾಲೆ",
              "ta": "வலது மடல்"
            },
            "text": {
              "en": "The big part of the liver. A healthy liver is dark reddish-brown and smooth, with sharp edges.",
              "kn": "ಯಕೃತ್ತಿನ ದೊಡ್ಡ ಭಾಗ. ಆರೋಗ್ಯಕರ ಯಕೃತ್ತು ಗಾಢ ಕೆಂಪು-ಕಂದು ಬಣ್ಣ, ನಯವಾಗಿ, ಚೂಪಾದ ಅಂಚುಗಳೊಂದಿಗೆ ಇರುತ್ತದೆ.",
              "ta": "கல்லீரலின் பெரிய பகுதி. ஆரோக்கியமான கல்லீரல் அடர் சிவப்பு-பழுப்பு நிறம், மென்மையானது, கூர்மையான விளிம்புகள் கொண்டது."
            }
          },
          {
            "id": "left",
            "position": "0.0504m 0.1182m 0.0283m",
            "normal": "0.198m 0.212m 0.957m",
            "title": {
              "en": "Left lobe",
              "kn": "ಎಡ ಹಾಲೆ",
              "ta": "இடது மடல்"
            },
            "text": {
              "en": "The smaller, thinner part. It reaches across towards the stomach.",
              "kn": "ಚಿಕ್ಕ, ತೆಳು ಭಾಗ. ಇದು ಜಠರದ ಕಡೆಗೆ ಚಾಚಿಕೊಂಡಿದೆ.",
              "ta": "சிறிய, மெல்லிய பகுதி. இது இரைப்பையை நோக்கி நீண்டுள்ளது."
            }
          },
          {
            "id": "ligament",
            "position": "0.0172m 0.1034m 0.0398m",
            "normal": "0.246m 0.174m 0.954m",
            "title": {
              "en": "Dividing line",
              "kn": "ವಿಭಜಿಸುವ ಗೆರೆ",
              "ta": "பிரிக்கும் கோடு"
            },
            "text": {
              "en": "A band of tissue here holds the liver to the belly wall. It also marks where the right and left lobes meet.",
              "kn": "ಇಲ್ಲಿರುವ ಅಂಗಾಂಶದ ಪಟ್ಟಿ ಯಕೃತ್ತನ್ನು ಹೊಟ್ಟೆಯ ಗೋಡೆಗೆ ಹಿಡಿದಿಡುತ್ತದೆ. ಬಲ ಮತ್ತು ಎಡ ಹಾಲೆಗಳು ಸೇರುವ ಜಾಗವನ್ನೂ ಇದು ತೋರಿಸುತ್ತದೆ.",
              "ta": "இங்கே உள்ள திசுப் பட்டை கல்லீரலை வயிற்றுச் சுவருடன் பிடித்து வைக்கிறது. வலது, இடது மடல்கள் சேரும் இடத்தையும் இது காட்டுகிறது."
            }
          },
          {
            "id": "ivc",
            "position": "-0.0166m 0.1473m -0.0339m",
            "normal": "0.058m 0.047m 0.997m",
            "title": {
              "en": "Inferior vena cava (blue)",
              "kn": "ಕೆಳಗಿನ ಮಹಾಸಿರೆ (ನೀಲಿ)",
              "ta": "கீழ் பெருஞ்சிரை (நீலம்)"
            },
            "text": {
              "en": "A big vein behind the liver. Clean blood leaves the liver through it and goes up to the heart.",
              "kn": "ಯಕೃತ್ತಿನ ಹಿಂದಿನ ದೊಡ್ಡ ಸಿರೆ. ಶುದ್ಧವಾದ ರಕ್ತ ಇದರ ಮೂಲಕ ಯಕೃತ್ತಿನಿಂದ ಹೃದಯಕ್ಕೆ ಹೋಗುತ್ತದೆ.",
              "ta": "கல்லீரலுக்குப் பின்னால் உள்ள பெரிய சிரை. சுத்தமான இரத்தம் இதன் வழியாகக் கல்லீரலிலிருந்து இதயத்திற்குச் செல்கிறது."
            }
          },
          {
            "id": "gall",
            "position": "-0.0338m 0.0438m -0.0175m",
            "normal": "-0.159m -0.130m -0.979m",
            "title": {
              "en": "Gallbladder (underside)",
              "kn": "ಪಿತ್ತಕೋಶ (ಕೆಳಭಾಗ)",
              "ta": "பித்தப்பை (அடிப்பகுதி)"
            },
            "text": {
              "en": "Turn the liver to see this small bag underneath. It stores bile, a green juice made by the liver, and squeezes it into the gut after a meal to help digest fat.",
              "kn": "ಕೆಳಗಿರುವ ಈ ಸಣ್ಣ ಚೀಲ ನೋಡಲು ಯಕೃತ್ತನ್ನು ತಿರುಗಿಸಿ. ಇದು ಯಕೃತ್ತು ಮಾಡುವ ಹಸಿರು ರಸವಾದ ಪಿತ್ತರಸವನ್ನು ಸಂಗ್ರಹಿಸಿ, ಊಟದ ನಂತರ ಕೊಬ್ಬು ಜೀರ್ಣಿಸಲು ಕರುಳಿಗೆ ಹಿಂಡುತ್ತದೆ.",
              "ta": "அடியில் உள்ள இந்தச் சிறிய பையைப் பார்க்கக் கல்லீரலைச் சுழற்றுங்கள். இது கல்லீரல் உருவாக்கும் பச்சைச் சாறான பித்தநீரைச் சேமித்து, உணவுக்குப் பின் கொழுப்பைச் செரிக்கக் குடலுக்குள் அழுத்தி அனுப்புகிறது."
            }
          },
          {
            "id": "portal",
            "position": "-0.0163m 0.0580m -0.0202m",
            "normal": "0.136m -0.298m -0.945m",
            "title": {
              "en": "Portal vein and hepatic artery (underside)",
              "kn": "ಪೋರ್ಟಲ್ ಸಿರೆ ಮತ್ತು ಯಕೃತ್ ಅಪಧಮನಿ (ಕೆಳಭಾಗ)",
              "ta": "போர்ட்டல் சிரை மற்றும் கல்லீரல் தமனி (அடிப்பகுதி)"
            },
            "text": {
              "en": "Under the liver, the portal vein brings blood full of food from the gut to be cleaned. The hepatic artery brings fresh oxygen.",
              "kn": "ಯಕೃತ್ತಿನ ಕೆಳಗೆ, ಪೋರ್ಟಲ್ ಸಿರೆ ಕರುಳಿನಿಂದ ಆಹಾರ ತುಂಬಿದ ರಕ್ತವನ್ನು ಶುದ್ಧಗೊಳಿಸಲು ತರುತ್ತದೆ. ಯಕೃತ್ ಅಪಧಮನಿ ಹೊಸ ಆಮ್ಲಜನಕವನ್ನು ತರುತ್ತದೆ.",
              "ta": "கல்லீரலுக்குக் கீழே, போர்ட்டல் சிரை குடலிலிருந்து உணவுச் சத்து நிறைந்த இரத்தத்தைச் சுத்தம் செய்யக் கொண்டுவருகிறது. கல்லீரல் தமனி புதிய ஆக்சிஜனைக் கொண்டுவருகிறது."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "fat",
            "position": "-0.0352m 0.0777m 0.0574m",
            "normal": "0.059m -0.152m 0.987m",
            "title": {
              "en": "Fat build-up (yellow colour and spots)",
              "kn": "ಕೊಬ್ಬಿನ ಶೇಖರಣೆ (ಹಳದಿ ಬಣ್ಣ ಮತ್ತು ಚುಕ್ಕೆಗಳು)",
              "ta": "கொழுப்புச் சேர்க்கை (மஞ்சள் நிறம், புள்ளிகள்)"
            },
            "text": {
              "en": "Fat droplets fill the liver cells. The liver turns pale and yellow. Doctors usually see this as a bright liver on an ultrasound scan.",
              "kn": "ಕೊಬ್ಬಿನ ಹನಿಗಳು ಯಕೃತ್ತಿನ ಜೀವಕೋಶಗಳನ್ನು ತುಂಬುತ್ತವೆ. ಯಕೃತ್ತು ಮಸುಕಾಗಿ ಹಳದಿಯಾಗುತ್ತದೆ. ಅಲ್ಟ್ರಾಸೌಂಡ್‌ನಲ್ಲಿ ವೈದ್ಯರು ಇದನ್ನು ಹೊಳೆಯುವ ಯಕೃತ್ತಾಗಿ ನೋಡುತ್ತಾರೆ.",
              "ta": "கொழுப்புத் துளிகள் கல்லீரல் செல்களை நிரப்புகின்றன. கல்லீரல் வெளிறி மஞ்சளாகிறது. அல்ட்ராசவுண்டில் மருத்துவர்கள் இதைப் பளிச்சென்ற கல்லீரலாகப் பார்ப்பார்கள்."
            }
          },
          {
            "id": "swollen",
            "position": "0.0534m 0.1253m 0.0300m",
            "normal": "0.198m 0.212m 0.957m",
            "title": {
              "en": "Bigger, swollen liver",
              "kn": "ದೊಡ್ಡದಾದ, ಊದಿದ ಯಕೃತ್ತು",
              "ta": "பெரிதான, வீங்கிய கல்லீரல்"
            },
            "text": {
              "en": "The extra fat makes the liver larger and heavier. Some people feel a dull ache or fullness on the upper right side of the belly.",
              "kn": "ಹೆಚ್ಚುವರಿ ಕೊಬ್ಬು ಯಕೃತ್ತನ್ನು ದೊಡ್ಡದಾಗಿ, ಭಾರವಾಗಿ ಮಾಡುತ್ತದೆ. ಕೆಲವರಿಗೆ ಹೊಟ್ಟೆಯ ಮೇಲಿನ ಬಲಭಾಗದಲ್ಲಿ ಮಂದ ನೋವು ಅಥವಾ ತುಂಬಿದ ಅನುಭವ ಆಗುತ್ತದೆ.",
              "ta": "அதிகப்படியான கொழுப்பு கல்லீரலைப் பெரிதாகவும் கனமாகவும் ஆக்குகிறது. சிலருக்கு வயிற்றின் மேல் வலது பக்கத்தில் மந்தமான வலி அல்லது நிறைவு உணர்வு இருக்கும்."
            }
          },
          {
            "id": "edge",
            "position": "-0.0705m 0.0308m 0.0441m",
            "normal": "0.063m -0.170m 0.983m",
            "title": {
              "en": "Rounded edges",
              "kn": "ದುಂಡಾದ ಅಂಚುಗಳು",
              "ta": "உருண்டையான விளிம்புகள்"
            },
            "text": {
              "en": "The sharp edges of the liver become round and blunt. If fat stays for years, it can cause swelling (inflammation) and scars. Losing weight early can reverse it.",
              "kn": "ಯಕೃತ್ತಿನ ಚೂಪಾದ ಅಂಚುಗಳು ದುಂಡಾಗುತ್ತವೆ. ಕೊಬ್ಬು ವರ್ಷಗಳ ಕಾಲ ಇದ್ದರೆ, ಊತ ಮತ್ತು ಗಾಯದ ಗುರುತುಗಳು ಉಂಟಾಗಬಹುದು. ಬೇಗ ತೂಕ ಕಡಿಮೆ ಮಾಡಿದರೆ ಇದನ್ನು ಸರಿಪಡಿಸಬಹುದು.",
              "ta": "கல்லீரலின் கூர்மையான விளிம்புகள் உருண்டையாகின்றன. கொழுப்பு பல ஆண்டுகள் இருந்தால், வீக்கமும் தழும்புகளும் ஏற்படலாம். ஆரம்பத்திலேயே எடையைக் குறைத்தால் இதைச் சரிசெய்யலாம்."
            }
          }
        ]
      },
      "inside": {
        "healthyModel": "models/liver-healthy-inside.glb",
        "diseasedModel": "models/liver-fatty-inside.glb",
        "compareModel": "models/liver-compare-inside.glb",
        "orbit": "0deg 75deg auto",
        "healthyHotspots": [
          {
            "id": "right",
            "position": "-0.0673m 0.0873m 0.0561m",
            "normal": "-0.310m 0.021m 0.951m",
            "title": {
              "en": "Right lobe",
              "kn": "ಬಲ ಹಾಲೆ",
              "ta": "வலது மடல்"
            },
            "text": {
              "en": "The big part of the liver. A healthy liver is dark reddish-brown and smooth, with sharp edges.",
              "kn": "ಯಕೃತ್ತಿನ ದೊಡ್ಡ ಭಾಗ. ಆರೋಗ್ಯಕರ ಯಕೃತ್ತು ಗಾಢ ಕೆಂಪು-ಕಂದು ಬಣ್ಣ, ನಯವಾಗಿ, ಚೂಪಾದ ಅಂಚುಗಳೊಂದಿಗೆ ಇರುತ್ತದೆ.",
              "ta": "கல்லீரலின் பெரிய பகுதி. ஆரோக்கியமான கல்லீரல் அடர் சிவப்பு-பழுப்பு நிறம், மென்மையானது, கூர்மையான விளிம்புகள் கொண்டது."
            }
          },
          {
            "id": "left",
            "position": "0.0503m 0.0873m 0.0758m",
            "normal": "0.141m 0.009m 0.990m",
            "title": {
              "en": "Left lobe",
              "kn": "ಎಡ ಹಾಲೆ",
              "ta": "இடது மடல்"
            },
            "text": {
              "en": "The smaller, thinner part. It reaches across towards the stomach.",
              "kn": "ಚಿಕ್ಕ, ತೆಳು ಭಾಗ. ಇದು ಜಠರದ ಕಡೆಗೆ ಚಾಚಿಕೊಂಡಿದೆ.",
              "ta": "சிறிய, மெல்லிய பகுதி. இது இரைப்பையை நோக்கி நீண்டுள்ளது."
            }
          },
          {
            "id": "segments",
            "position": "0.0003m 0.0620m 0.0698m",
            "normal": "0.156m -0.176m 0.972m",
            "title": {
              "en": "Segments (lines)",
              "kn": "ಭಾಗಗಳು (ಗೆರೆಗಳು)",
              "ta": "பகுதிகள் (கோடுகள்)"
            },
            "text": {
              "en": "Doctors divide the liver into 8 parts. Each part has its own blood supply, so a surgeon can remove one part and leave the rest working.",
              "kn": "ವೈದ್ಯರು ಯಕೃತ್ತನ್ನು 8 ಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸುತ್ತಾರೆ. ಪ್ರತಿ ಭಾಗಕ್ಕೂ ತನ್ನದೇ ರಕ್ತ ಪೂರೈಕೆ ಇದೆ, ಆದ್ದರಿಂದ ಶಸ್ತ್ರಚಿಕಿತ್ಸಕರು ಒಂದು ಭಾಗ ತೆಗೆದರೂ ಉಳಿದದ್ದು ಕೆಲಸ ಮಾಡುತ್ತದೆ.",
              "ta": "மருத்துவர்கள் கல்லீரலை 8 பகுதிகளாகப் பிரிக்கிறார்கள். ஒவ்வொரு பகுதிக்கும் தனி இரத்த ஓட்டம் உண்டு, எனவே ஒரு பகுதியை அகற்றினாலும் மற்றவை வேலை செய்யும்."
            }
          },
          {
            "id": "portal",
            "position": "0.0334m 0.0998m 0.0780m",
            "normal": "0.032m 0.045m 0.998m",
            "title": {
              "en": "Portal vein (purple)",
              "kn": "ಪೋರ್ಟಲ್ ಸಿರೆ (ನೇರಳೆ)",
              "ta": "போர்ட்டல் சிரை (ஊதா)"
            },
            "text": {
              "en": "Brings blood from the stomach and gut, full of food, into the liver. The liver cleans it and stores some of the food as energy.",
              "kn": "ಆಹಾರ ತುಂಬಿದ ರಕ್ತವನ್ನು ಜಠರ ಮತ್ತು ಕರುಳಿನಿಂದ ಯಕೃತ್ತಿಗೆ ತರುತ್ತದೆ. ಯಕೃತ್ತು ಅದನ್ನು ಶುದ್ಧಗೊಳಿಸಿ, ಸ್ವಲ್ಪ ಆಹಾರವನ್ನು ಶಕ್ತಿಯಾಗಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ.",
              "ta": "உணவுச் சத்து நிறைந்த இரத்தத்தை இரைப்பை, குடலிலிருந்து கல்லீரலுக்குக் கொண்டுவருகிறது. கல்லீரல் அதைச் சுத்தம் செய்து, சிறிது உணவை ஆற்றலாகச் சேமிக்கிறது."
            }
          },
          {
            "id": "artery",
            "position": "0.0000m 0.0871m 0.0756m",
            "normal": "0.000m -0.062m 0.998m",
            "title": {
              "en": "Hepatic artery (red)",
              "kn": "ಯಕೃತ್ ಅಪಧಮನಿ (ಕೆಂಪು)",
              "ta": "கல்லீரல் தமனி (சிவப்பு)"
            },
            "text": {
              "en": "Brings fresh, oxygen-rich blood to keep the liver cells alive.",
              "kn": "ಯಕೃತ್ತಿನ ಜೀವಕೋಶಗಳು ಜೀವಂತವಾಗಿರಲು ಆಮ್ಲಜನಕ ತುಂಬಿದ ಹೊಸ ರಕ್ತವನ್ನು ತರುತ್ತದೆ.",
              "ta": "கல்லீரல் செல்கள் உயிருடன் இருக்க ஆக்சிஜன் நிறைந்த புதிய இரத்தத்தைக் கொண்டுவருகிறது."
            }
          },
          {
            "id": "hv",
            "position": "-0.0335m 0.1124m 0.0708m",
            "normal": "-0.104m 0.140m 0.985m",
            "title": {
              "en": "Hepatic veins (blue)",
              "kn": "ಯಕೃತ್ ಸಿರೆಗಳು (ನೀಲಿ)",
              "ta": "கல்லீரல் சிரைகள் (நீலம்)"
            },
            "text": {
              "en": "Carry the cleaned blood out of the liver and up to the heart.",
              "kn": "ಶುದ್ಧವಾದ ರಕ್ತವನ್ನು ಯಕೃತ್ತಿನಿಂದ ಹೊರಗೆ ಹೃದಯಕ್ಕೆ ಒಯ್ಯುತ್ತವೆ.",
              "ta": "சுத்தமான இரத்தத்தைக் கல்லீரலிலிருந்து வெளியே இதயத்திற்குக் கொண்டு செல்கின்றன."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "fat",
            "position": "-0.0713m 0.1058m 0.0588m",
            "normal": "-0.302m 0.061m 0.951m",
            "title": {
              "en": "Fat build-up (yellow colour and spots)",
              "kn": "ಕೊಬ್ಬಿನ ಶೇಖರಣೆ (ಹಳದಿ ಬಣ್ಣ ಮತ್ತು ಚುಕ್ಕೆಗಳು)",
              "ta": "கொழுப்புச் சேர்க்கை (மஞ்சள் நிறம், புள்ளிகள்)"
            },
            "text": {
              "en": "Fat droplets fill the liver cells. The liver turns pale and yellow. Doctors usually see this as a bright liver on an ultrasound scan.",
              "kn": "ಕೊಬ್ಬಿನ ಹನಿಗಳು ಯಕೃತ್ತಿನ ಜೀವಕೋಶಗಳನ್ನು ತುಂಬುತ್ತವೆ. ಯಕೃತ್ತು ಮಸುಕಾಗಿ ಹಳದಿಯಾಗುತ್ತದೆ. ಅಲ್ಟ್ರಾಸೌಂಡ್‌ನಲ್ಲಿ ವೈದ್ಯರು ಇದನ್ನು ಹೊಳೆಯುವ ಯಕೃತ್ತಾಗಿ ನೋಡುತ್ತಾರೆ.",
              "ta": "கொழுப்புத் துளிகள் கல்லீரல் செல்களை நிரப்புகின்றன. கல்லீரல் வெளிறி மஞ்சளாகிறது. அல்ட்ராசவுண்டில் மருத்துவர்கள் இதைப் பளிச்சென்ற கல்லீரலாகப் பார்ப்பார்கள்."
            }
          },
          {
            "id": "swollen",
            "position": "0.0712m 0.0925m 0.0726m",
            "normal": "0.262m 0.011m 0.965m",
            "title": {
              "en": "Bigger, swollen liver",
              "kn": "ದೊಡ್ಡದಾದ, ಊದಿದ ಯಕೃತ್ತು",
              "ta": "பெரிதான, வீங்கிய கல்லீரல்"
            },
            "text": {
              "en": "The extra fat makes the liver larger and heavier. Some people feel a dull ache or fullness on the upper right side of the belly.",
              "kn": "ಹೆಚ್ಚುವರಿ ಕೊಬ್ಬು ಯಕೃತ್ತನ್ನು ದೊಡ್ಡದಾಗಿ, ಭಾರವಾಗಿ ಮಾಡುತ್ತದೆ. ಕೆಲವರಿಗೆ ಹೊಟ್ಟೆಯ ಮೇಲಿನ ಬಲಭಾಗದಲ್ಲಿ ಮಂದ ನೋವು ಅಥವಾ ತುಂಬಿದ ಅನುಭವ ಆಗುತ್ತದೆ.",
              "ta": "அதிகப்படியான கொழுப்பு கல்லீரலைப் பெரிதாகவும் கனமாகவும் ஆக்குகிறது. சிலருக்கு வயிற்றின் மேல் வலது பக்கத்தில் மந்தமான வலி அல்லது நிறைவு உணர்வு இருக்கும்."
            }
          },
          {
            "id": "edge",
            "position": "-0.0892m 0.0527m 0.0369m",
            "normal": "-0.398m -0.072m 0.914m",
            "title": {
              "en": "Rounded edges",
              "kn": "ದುಂಡಾದ ಅಂಚುಗಳು",
              "ta": "உருண்டையான விளிம்புகள்"
            },
            "text": {
              "en": "The sharp edges of the liver become round and blunt. If fat stays for years, it can cause swelling (inflammation) and scars. Losing weight early can reverse it.",
              "kn": "ಯಕೃತ್ತಿನ ಚೂಪಾದ ಅಂಚುಗಳು ದುಂಡಾಗುತ್ತವೆ. ಕೊಬ್ಬು ವರ್ಷಗಳ ಕಾಲ ಇದ್ದರೆ, ಊತ ಮತ್ತು ಗಾಯದ ಗುರುತುಗಳು ಉಂಟಾಗಬಹುದು. ಬೇಗ ತೂಕ ಕಡಿಮೆ ಮಾಡಿದರೆ ಇದನ್ನು ಸರಿಪಡಿಸಬಹುದು.",
              "ta": "கல்லீரலின் கூர்மையான விளிம்புகள் உருண்டையாகின்றன. கொழுப்பு பல ஆண்டுகள் இருந்தால், வீக்கமும் தழும்புகளும் ஏற்படலாம். ஆரம்பத்திலேயே எடையைக் குறைத்தால் இதைச் சரிசெய்யலாம்."
            }
          }
        ]
      }
    }
  },
  {
    "id": "kidney",
    "icon": "🫘",
    "organ": {
      "en": "Kidney",
      "kn": "ಮೂತ್ರಪಿಂಡ (ಕಿಡ್ನಿ)",
      "ta": "சிறுநீரகம்"
    },
    "name": {
      "en": "Kidney stone",
      "kn": "ಮೂತ್ರಪಿಂಡದ ಕಲ್ಲು",
      "ta": "சிறுநீரகக் கல்"
    },
    "short": {
      "en": "Hard lumps that form inside the kidney",
      "kn": "ಮೂತ್ರಪಿಂಡದೊಳಗೆ ಉಂಟಾಗುವ ಗಟ್ಟಿ ಗಡ್ಡೆಗಳು",
      "ta": "சிறுநீரகத்திற்குள் உருவாகும் கடினமான கட்டிகள்"
    },
    "organAbout": {
      "en": "You have two kidneys, each about the size of your fist, in your lower back. They clean your blood all day. Each kidney has about a million tiny filters. They remove waste and extra water, which becomes urine. The kidneys also help control blood pressure.",
      "kn": "ನಿಮ್ಮ ಬೆನ್ನಿನ ಕೆಳಭಾಗದಲ್ಲಿ ಮುಷ್ಟಿಯಷ್ಟು ದೊಡ್ಡ ಎರಡು ಮೂತ್ರಪಿಂಡಗಳಿವೆ. ಅವು ದಿನವಿಡೀ ರಕ್ತವನ್ನು ಶುದ್ಧಗೊಳಿಸುತ್ತವೆ. ಪ್ರತಿ ಮೂತ್ರಪಿಂಡದಲ್ಲಿ ಸುಮಾರು ಹತ್ತು ಲಕ್ಷ ಸಣ್ಣ ಸೋಸುಕಗಳಿವೆ. ಅವು ತ್ಯಾಜ್ಯ ಮತ್ತು ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ತೆಗೆಯುತ್ತವೆ, ಅದು ಮೂತ್ರವಾಗುತ್ತದೆ. ಮೂತ್ರಪಿಂಡಗಳು ರಕ್ತದೊತ್ತಡವನ್ನು ನಿಯಂತ್ರಿಸಲೂ ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
      "ta": "உங்கள் கீழ் முதுகில் முஷ்டி அளவுள்ள இரண்டு சிறுநீரகங்கள் உள்ளன. அவை நாள் முழுவதும் இரத்தத்தைச் சுத்தம் செய்கின்றன. ஒவ்வொரு சிறுநீரகத்திலும் சுமார் பத்து லட்சம் சிறிய வடிகட்டிகள் உள்ளன. அவை கழிவுகளையும் அதிகப்படியான நீரையும் நீக்குகின்றன, அது சிறுநீராகிறது. சிறுநீரகங்கள் இரத்த அழுத்தத்தைக் கட்டுப்படுத்தவும் உதவுகின்றன."
    },
    "about": {
      "en": "Sometimes minerals in the urine stick together and form hard pieces. These are kidney stones. Small stones often pass out with urine. Bigger stones can get stuck in the thin tube that carries urine to the bladder. This tube is called the ureter. A stuck stone can cause strong pain in the back or side, and blood in the urine.",
      "kn": "ಕೆಲವೊಮ್ಮೆ ಮೂತ್ರದಲ್ಲಿನ ಖನಿಜಗಳು ಒಟ್ಟಿಗೆ ಅಂಟಿಕೊಂಡು ಗಟ್ಟಿ ತುಂಡುಗಳಾಗುತ್ತವೆ. ಇವೇ ಮೂತ್ರಪಿಂಡದ ಕಲ್ಲುಗಳು. ಸಣ್ಣ ಕಲ್ಲುಗಳು ಹೆಚ್ಚಾಗಿ ಮೂತ್ರದೊಂದಿಗೆ ಹೊರಬರುತ್ತವೆ. ದೊಡ್ಡ ಕಲ್ಲುಗಳು ಮೂತ್ರವನ್ನು ಮೂತ್ರಕೋಶಕ್ಕೆ ಒಯ್ಯುವ ತೆಳು ಕೊಳವೆಯಲ್ಲಿ ಸಿಕ್ಕಿಕೊಳ್ಳಬಹುದು. ಈ ಕೊಳವೆಯನ್ನು ಯುರೇಟರ್ ಎನ್ನುತ್ತಾರೆ. ಸಿಕ್ಕಿಕೊಂಡ ಕಲ್ಲು ಬೆನ್ನು ಅಥವಾ ಪಕ್ಕೆಯಲ್ಲಿ ತೀವ್ರ ನೋವು ಮತ್ತು ಮೂತ್ರದಲ್ಲಿ ರಕ್ತ ಉಂಟುಮಾಡಬಹುದು.",
      "ta": "சில நேரங்களில் சிறுநீரில் உள்ள தாதுக்கள் ஒன்றாக ஒட்டி கடினமான துண்டுகளாகின்றன. இவையே சிறுநீரகக் கற்கள். சிறிய கற்கள் பெரும்பாலும் சிறுநீருடன் வெளியேறும். பெரிய கற்கள் சிறுநீரைச் சிறுநீர்ப்பைக்குக் கொண்டு செல்லும் மெல்லிய குழாயில் சிக்கிக்கொள்ளலாம். இந்தக் குழாய்க்கு யூரேட்டர் என்று பெயர். சிக்கிய கல் முதுகு அல்லது விலாவில் கடுமையான வலியையும் சிறுநீரில் இரத்தத்தையும் உண்டாக்கலாம்."
    },
    "treatment": [
      {
        "title": {
          "en": "Water and waiting",
          "kn": "ನೀರು ಮತ್ತು ಕಾಯುವುದು",
          "ta": "நீரும் காத்திருப்பும்"
        },
        "text": {
          "en": "Many small stones pass out on their own. Your doctor may ask you to drink more water and take pain medicine. Some medicines relax the ureter so the stone can pass more easily.",
          "kn": "ಅನೇಕ ಸಣ್ಣ ಕಲ್ಲುಗಳು ತಾವಾಗಿಯೇ ಹೊರಬರುತ್ತವೆ. ವೈದ್ಯರು ಹೆಚ್ಚು ನೀರು ಕುಡಿಯಲು ಮತ್ತು ನೋವಿನ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಲು ಹೇಳಬಹುದು. ಕೆಲವು ಔಷಧಿಗಳು ಯುರೇಟರ್ ಅನ್ನು ಸಡಿಲಗೊಳಿಸಿ ಕಲ್ಲು ಸುಲಭವಾಗಿ ಹೊರಬರಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
          "ta": "பல சிறிய கற்கள் தானாகவே வெளியேறும். மருத்துவர் அதிக நீர் குடிக்கவும் வலி மருந்து எடுக்கவும் சொல்லலாம். சில மருந்துகள் யூரேட்டரைத் தளர்த்தி கல் எளிதாக வெளியேற உதவும்."
        }
      },
      {
        "title": {
          "en": "Shock wave treatment",
          "kn": "ಶಾಕ್ ವೇವ್ ಚಿಕಿತ್ಸೆ",
          "ta": "அதிர்வலை சிகிச்சை"
        },
        "text": {
          "en": "Strong sound waves are sent from outside the body. They break the stone into small pieces. The pieces then pass out with urine. No cut is needed.",
          "kn": "ದೇಹದ ಹೊರಗಿನಿಂದ ಬಲವಾದ ಧ್ವನಿ ತರಂಗಗಳನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಅವು ಕಲ್ಲನ್ನು ಸಣ್ಣ ತುಂಡುಗಳಾಗಿ ಒಡೆಯುತ್ತವೆ. ತುಂಡುಗಳು ಮೂತ್ರದೊಂದಿಗೆ ಹೊರಬರುತ್ತವೆ. ಯಾವುದೇ ಕತ್ತರಿಸುವಿಕೆ ಬೇಕಿಲ್ಲ.",
          "ta": "உடலுக்கு வெளியிலிருந்து வலுவான ஒலி அலைகள் அனுப்பப்படுகின்றன. அவை கல்லைச் சிறு துண்டுகளாக உடைக்கின்றன. துண்டுகள் சிறுநீருடன் வெளியேறும். அறுவை தேவையில்லை."
        }
      },
      {
        "title": {
          "en": "Ureteroscopy",
          "kn": "ಯುರೆಟೆರೋಸ್ಕೋಪಿ",
          "ta": "யூரிட்டெரோஸ்கோபி"
        },
        "text": {
          "en": "A very thin tube with a camera goes up through the urine passage. The doctor finds the stone and breaks it with a laser or pulls it out. No cut on the skin.",
          "kn": "ಕ್ಯಾಮೆರಾ ಇರುವ ತುಂಬಾ ತೆಳು ಕೊಳವೆಯನ್ನು ಮೂತ್ರ ಮಾರ್ಗದ ಮೂಲಕ ಮೇಲೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ವೈದ್ಯರು ಕಲ್ಲನ್ನು ಕಂಡು ಲೇಸರ್‌ನಿಂದ ಒಡೆಯುತ್ತಾರೆ ಅಥವಾ ಹೊರಗೆ ತೆಗೆಯುತ್ತಾರೆ. ಚರ್ಮದ ಮೇಲೆ ಕತ್ತರಿಸುವಿಕೆ ಇಲ್ಲ.",
          "ta": "கேமரா உள்ள மிக மெல்லிய குழாய் சிறுநீர்ப் பாதை வழியாக மேலே செலுத்தப்படுகிறது. மருத்துவர் கல்லைக் கண்டு லேசர் மூலம் உடைக்கிறார் அல்லது வெளியே எடுக்கிறார். தோலில் அறுவை இல்லை."
        }
      },
      {
        "title": {
          "en": "Stopping new stones",
          "kn": "ಹೊಸ ಕಲ್ಲುಗಳನ್ನು ತಡೆಯುವುದು",
          "ta": "புதிய கற்களைத் தடுத்தல்"
        },
        "text": {
          "en": "Drink enough water every day, so your urine stays light yellow. Eat less salt. Follow the food advice your doctor gives you.",
          "kn": "ಮೂತ್ರ ತಿಳಿ ಹಳದಿಯಾಗಿರುವಷ್ಟು ಪ್ರತಿದಿನ ನೀರು ಕುಡಿಯಿರಿ. ಉಪ್ಪು ಕಡಿಮೆ ತಿನ್ನಿ. ವೈದ್ಯರು ಕೊಡುವ ಆಹಾರ ಸಲಹೆಯನ್ನು ಪಾಲಿಸಿ.",
          "ta": "சிறுநீர் வெளிர் மஞ்சளாக இருக்கும் அளவு தினமும் நீர் குடியுங்கள். உப்பைக் குறையுங்கள். மருத்துவர் தரும் உணவு ஆலோசனையைப் பின்பற்றுங்கள்."
        }
      }
    ],
    "warning": {
      "en": "Go to a hospital at once if you have stone pain with fever or shivering, if you cannot pass urine, or if the pain does not stop with medicine.",
      "kn": "ಕಲ್ಲಿನ ನೋವಿನ ಜೊತೆ ಜ್ವರ ಅಥವಾ ನಡುಕ ಇದ್ದರೆ, ಮೂತ್ರ ಹೋಗದಿದ್ದರೆ, ಅಥವಾ ಔಷಧಿಯಿಂದ ನೋವು ನಿಲ್ಲದಿದ್ದರೆ ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.",
      "ta": "கல் வலியுடன் காய்ச்சல் அல்லது நடுக்கம் இருந்தால், சிறுநீர் கழிக்க முடியாவிட்டால், அல்லது மருந்தால் வலி நிற்காவிட்டால் உடனே மருத்துவமனைக்குச் செல்லுங்கள்."
    },
    "views": {
      "outside": {
        "healthyModel": "models/kidney-healthy.glb",
        "diseasedModel": "models/kidney-stone.glb",
        "compareModel": "models/kidney-compare.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "outer",
            "position": "0.0096m 0.0597m 0.0225m",
            "normal": "-0.139m -0.129m 0.982m",
            "title": {
              "en": "Kidney surface (capsule)",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಮೇಲ್ಮೈ (ಕ್ಯಾಪ್ಸೂಲ್)",
              "ta": "சிறுநீரக மேற்பரப்பு (உறை)"
            },
            "text": {
              "en": "A thin, tough skin covers the kidney and protects it. A healthy kidney is bean-shaped, smooth and about the size of your fist.",
              "kn": "ತೆಳು, ಗಟ್ಟಿ ಚರ್ಮ ಮೂತ್ರಪಿಂಡವನ್ನು ಮುಚ್ಚಿ ರಕ್ಷಿಸುತ್ತದೆ. ಆರೋಗ್ಯಕರ ಮೂತ್ರಪಿಂಡ ಹುರುಳಿಯಾಕಾರ, ನಯವಾಗಿ, ನಿಮ್ಮ ಮುಷ್ಟಿಯಷ್ಟು ದೊಡ್ಡದಾಗಿರುತ್ತದೆ.",
              "ta": "மெல்லிய, உறுதியான தோல் சிறுநீரகத்தை மூடிப் பாதுகாக்கிறது. ஆரோக்கியமான சிறுநீரகம் அவரை விதை வடிவம், மென்மையானது, உங்கள் முஷ்டி அளவு."
            }
          },
          {
            "id": "adrenal",
            "position": "-0.0203m 0.1103m 0.0025m",
            "normal": "-0.313m 0.130m 0.941m",
            "title": {
              "en": "Adrenal gland (on top)",
              "kn": "ಅಡ್ರಿನಲ್ ಗ್ರಂಥಿ (ಮೇಲೆ)",
              "ta": "அட்ரீனல் சுரப்பி (மேலே)"
            },
            "text": {
              "en": "A small gland that sits like a cap on the kidney. It makes hormones such as adrenaline, which helps your body react to stress.",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಮೇಲೆ ಟೋಪಿಯಂತೆ ಕುಳಿತಿರುವ ಸಣ್ಣ ಗ್ರಂಥಿ. ಇದು ಅಡ್ರಿನಲಿನ್‌ನಂತಹ ಹಾರ್ಮೋನುಗಳನ್ನು ಮಾಡುತ್ತದೆ, ಒತ್ತಡಕ್ಕೆ ದೇಹ ಪ್ರತಿಕ್ರಿಯಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
              "ta": "சிறுநீரகத்தின் மேல் தொப்பி போல அமர்ந்திருக்கும் சிறிய சுரப்பி. இது அட்ரினலின் போன்ற ஹார்மோன்களை உருவாக்கி, மன அழுத்தத்திற்கு உடல் எதிர்வினையாற்ற உதவுகிறது."
            }
          },
          {
            "id": "hilum",
            "position": "-0.0156m 0.0792m 0.0070m",
            "normal": "-0.433m -0.413m 0.801m",
            "title": {
              "en": "Hilum (the dent)",
              "kn": "ಹೈಲಮ್ (ಒಳತಗ್ಗು)",
              "ta": "ஹைலம் (உள்வளைவு)"
            },
            "text": {
              "en": "The dent on the inner side of the kidney. Blood vessels go in and out here, and the ureter leaves from here.",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಒಳಬದಿಯ ತಗ್ಗು. ರಕ್ತನಾಳಗಳು ಇಲ್ಲಿಂದ ಒಳಗೆ, ಹೊರಗೆ ಹೋಗುತ್ತವೆ, ಮತ್ತು ಯುರೇಟರ್ ಇಲ್ಲಿಂದ ಹೊರಡುತ್ತದೆ.",
              "ta": "சிறுநீரகத்தின் உள்பக்கப் பள்ளம். இரத்தக் குழாய்கள் இங்கே உள்ளே, வெளியே செல்கின்றன, யூரேட்டர் இங்கிருந்து புறப்படுகிறது."
            }
          },
          {
            "id": "ureter",
            "position": "-0.0198m 0.0296m -0.0203m",
            "normal": "-0.032m -0.180m 0.983m",
            "title": {
              "en": "Ureter",
              "kn": "ಮೂತ್ರನಾಳ (ಯುರೇಟರ್)",
              "ta": "சிறுநீர்க்குழாய் (யூரேட்டர்)"
            },
            "text": {
              "en": "A thin tube that carries urine from the kidney down to the bladder.",
              "kn": "ಮೂತ್ರವನ್ನು ಮೂತ್ರಪಿಂಡದಿಂದ ಮೂತ್ರಕೋಶಕ್ಕೆ ಒಯ್ಯುವ ತೆಳು ಕೊಳವೆ.",
              "ta": "சிறுநீரைச் சிறுநீரகத்திலிருந்து சிறுநீர்ப்பைக்குக் கொண்டு செல்லும் மெல்லிய குழாய்."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "swell",
            "position": "0.0101m 0.0734m 0.0254m",
            "normal": "-0.134m -0.031m 0.990m",
            "title": {
              "en": "Swollen kidney",
              "kn": "ಊದಿದ ಮೂತ್ರಪಿಂಡ",
              "ta": "வீங்கிய சிறுநீரகம்"
            },
            "text": {
              "en": "If urine cannot flow out, it backs up and the kidney can swell. A doctor should check this soon, so the kidney is not harmed.",
              "kn": "ಮೂತ್ರ ಹೊರಗೆ ಹರಿಯದಿದ್ದರೆ, ಅದು ಹಿಂದಕ್ಕೆ ತುಂಬಿ ಮೂತ್ರಪಿಂಡ ಊದಿಕೊಳ್ಳಬಹುದು. ಮೂತ್ರಪಿಂಡಕ್ಕೆ ಹಾನಿಯಾಗದಂತೆ ವೈದ್ಯರು ಇದನ್ನು ಬೇಗ ಪರೀಕ್ಷಿಸಬೇಕು.",
              "ta": "சிறுநீர் வெளியேற முடியாவிட்டால், அது பின்னோக்கித் தேங்கி சிறுநீரகம் வீங்கலாம். சிறுநீரகம் பாதிக்கப்படாமல் இருக்க மருத்துவர் இதை விரைவில் பரிசோதிக்க வேண்டும்."
            }
          },
          {
            "id": "stuck",
            "position": "-0.0238m 0.0214m -0.0180m",
            "normal": "-0.487m 0.070m 0.870m",
            "title": {
              "en": "Stone stuck in the ureter",
              "kn": "ಯುರೇಟರ್‌ನಲ್ಲಿ ಸಿಕ್ಕಿಕೊಂಡ ಕಲ್ಲು",
              "ta": "யூரேட்டரில் சிக்கிய கல்"
            },
            "text": {
              "en": "When a stone moves into this thin tube, it can get stuck and block the urine. This causes sudden, very strong pain in the back or side that may move down to the lower belly.",
              "kn": "ಕಲ್ಲು ಈ ತೆಳು ಕೊಳವೆಗೆ ಬಂದಾಗ, ಸಿಕ್ಕಿಕೊಂಡು ಮೂತ್ರವನ್ನು ತಡೆಯಬಹುದು. ಇದರಿಂದ ಬೆನ್ನು ಅಥವಾ ಪಕ್ಕೆಯಲ್ಲಿ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ತೀವ್ರ ನೋವು ಬಂದು, ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗಕ್ಕೆ ಹರಡಬಹುದು.",
              "ta": "கல் இந்த மெல்லிய குழாய்க்குள் நகரும்போது, சிக்கிக்கொண்டு சிறுநீரைத் தடுக்கலாம். இதனால் முதுகு அல்லது விலாவில் திடீரென கடுமையான வலி வந்து, அடிவயிறு வரை பரவலாம்."
            }
          },
          {
            "id": "inside",
            "position": "0.0047m 0.0519m 0.0181m",
            "normal": "-0.238m -0.264m 0.935m",
            "title": {
              "en": "Stones are hidden inside",
              "kn": "ಕಲ್ಲುಗಳು ಒಳಗೆ ಅಡಗಿವೆ",
              "ta": "கற்கள் உள்ளே மறைந்துள்ளன"
            },
            "text": {
              "en": "From outside, a kidney with stones can look almost normal. Tap “Inside view” at the top to see where the stones sit.",
              "kn": "ಹೊರಗಿನಿಂದ, ಕಲ್ಲಿರುವ ಮೂತ್ರಪಿಂಡ ಬಹುತೇಕ ಸಾಮಾನ್ಯವಾಗಿ ಕಾಣಬಹುದು. ಕಲ್ಲುಗಳು ಎಲ್ಲಿವೆ ಎಂದು ನೋಡಲು ಮೇಲಿನ “ಒಳಗಿನ ನೋಟ” ಒತ್ತಿ.",
              "ta": "வெளியிலிருந்து, கல் உள்ள சிறுநீரகம் கிட்டத்தட்ட சாதாரணமாகத் தெரியலாம். கற்கள் எங்கே உள்ளன என்று பார்க்க மேலே உள்ள “உள்புறத் தோற்றம்” தொடுங்கள்."
            }
          }
        ]
      },
      "inside": {
        "healthyModel": "models/kidney-healthy-inside.glb",
        "diseasedModel": "models/kidney-stone-inside.glb",
        "compareModel": "models/kidney-compare-inside.glb",
        "orbit": "0deg 80deg auto",
        "healthyHotspots": [
          {
            "id": "cortex",
            "position": "-0.0429m 0.0698m 0.0111m",
            "normal": "-0.483m -0.106m 0.869m",
            "title": {
              "en": "Cortex (outer layer)",
              "kn": "ಕಾರ್ಟೆಕ್ಸ್ (ಹೊರ ಪದರ)",
              "ta": "புறணி (வெளி அடுக்கு)"
            },
            "text": {
              "en": "The outer layer holds about a million tiny filters. They clean waste and extra water out of your blood.",
              "kn": "ಹೊರ ಪದರದಲ್ಲಿ ಸುಮಾರು ಹತ್ತು ಲಕ್ಷ ಸಣ್ಣ ಸೋಸುಕಗಳಿವೆ. ಅವು ರಕ್ತದಿಂದ ತ್ಯಾಜ್ಯ ಮತ್ತು ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ತೆಗೆಯುತ್ತವೆ.",
              "ta": "வெளி அடுக்கில் சுமார் பத்து லட்சம் சிறிய வடிகட்டிகள் உள்ளன. அவை இரத்தத்திலிருந்து கழிவுகளையும் அதிகப்படியான நீரையும் நீக்குகின்றன."
            }
          },
          {
            "id": "pyramid",
            "position": "-0.0251m 0.0701m 0.0122m",
            "normal": "0.013m 0.065m 0.998m",
            "title": {
              "en": "Pyramid (medulla)",
              "kn": "ಪಿರಮಿಡ್ (ಮೆಡುಲ್ಲಾ)",
              "ta": "பிரமிடு (மெடுல்லா)"
            },
            "text": {
              "en": "These cone shapes are made of thousands of tiny tubes. They collect the cleaned liquid, which becomes urine.",
              "kn": "ಈ ಶಂಕುವಿನ ಆಕಾರಗಳು ಸಾವಿರಾರು ಸಣ್ಣ ಕೊಳವೆಗಳಿಂದ ಆಗಿವೆ. ಅವು ಸೋಸಿದ ದ್ರವವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತವೆ, ಅದು ಮೂತ್ರವಾಗುತ್ತದೆ.",
              "ta": "இந்தக் கூம்பு வடிவங்கள் ஆயிரக்கணக்கான சிறிய குழாய்களால் ஆனவை. அவை வடிகட்டிய திரவத்தைச் சேகரிக்கின்றன, அது சிறுநீராகிறது."
            }
          },
          {
            "id": "calyx",
            "position": "-0.0002m 0.0798m 0.0093m",
            "normal": "-0.118m -0.080m 0.990m",
            "title": {
              "en": "Calyx (cup)",
              "kn": "ಕ್ಯಾಲಿಕ್ಸ್ (ಬಟ್ಟಲು)",
              "ta": "கேலிக்ஸ் (கிண்ணம்)"
            },
            "text": {
              "en": "Small cups that catch urine dripping from the pyramids and pass it on to the centre of the kidney.",
              "kn": "ಪಿರಮಿಡ್‌ಗಳಿಂದ ಬರುವ ಮೂತ್ರವನ್ನು ಹಿಡಿದು ಮೂತ್ರಪಿಂಡದ ಮಧ್ಯಕ್ಕೆ ಕಳುಹಿಸುವ ಸಣ್ಣ ಬಟ್ಟಲುಗಳು.",
              "ta": "பிரமிடுகளிலிருந்து வரும் சிறுநீரைப் பிடித்து சிறுநீரகத்தின் நடுப்பகுதிக்கு அனுப்பும் சிறிய கிண்ணங்கள்."
            }
          },
          {
            "id": "pelvis",
            "position": "0.0088m 0.0504m 0.0093m",
            "normal": "0.190m 0.182m 0.965m",
            "title": {
              "en": "Renal pelvis",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಸೊಂಟ (ಪೆಲ್ವಿಸ್)",
              "ta": "சிறுநீரக இடுப்புப் பை (பெல்விஸ்)"
            },
            "text": {
              "en": "A funnel in the middle of the kidney. All the urine collects here before it flows down the ureter.",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಮಧ್ಯದಲ್ಲಿರುವ ಕೊಳವೆ ಬಾಯಿ. ಎಲ್ಲಾ ಮೂತ್ರ ಇಲ್ಲಿ ಸೇರಿ, ನಂತರ ಯುರೇಟರ್‌ನಲ್ಲಿ ಕೆಳಗೆ ಹರಿಯುತ್ತದೆ.",
              "ta": "சிறுநீரகத்தின் நடுவில் உள்ள புனல். எல்லாச் சிறுநீரும் இங்கே சேர்ந்து, பின் யூரேட்டர் வழியாகக் கீழே பாய்கிறது."
            }
          },
          {
            "id": "artery",
            "position": "0.0336m 0.0604m 0.0193m",
            "normal": "0.047m 0.177m 0.983m",
            "title": {
              "en": "Renal artery (red)",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಅಪಧಮನಿ (ಕೆಂಪು)",
              "ta": "சிறுநீரகத் தமனி (சிவப்பு)"
            },
            "text": {
              "en": "Brings blood into the kidney to be cleaned. About one fifth of all the blood your heart pumps goes to the kidneys.",
              "kn": "ಶುದ್ಧಗೊಳಿಸಲು ರಕ್ತವನ್ನು ಮೂತ್ರಪಿಂಡಕ್ಕೆ ತರುತ್ತದೆ. ಹೃದಯ ಪಂಪ್ ಮಾಡುವ ಒಟ್ಟು ರಕ್ತದ ಸುಮಾರು ಐದನೇ ಒಂದು ಭಾಗ ಮೂತ್ರಪಿಂಡಗಳಿಗೆ ಹೋಗುತ್ತದೆ.",
              "ta": "சுத்தம் செய்ய இரத்தத்தைச் சிறுநீரகத்திற்குள் கொண்டுவருகிறது. இதயம் அனுப்பும் மொத்த இரத்தத்தில் சுமார் ஐந்தில் ஒரு பங்கு சிறுநீரகங்களுக்குச் செல்கிறது."
            }
          },
          {
            "id": "vein",
            "position": "0.0343m 0.0497m 0.0300m",
            "normal": "0.389m -0.146m 0.910m",
            "title": {
              "en": "Renal vein (blue)",
              "kn": "ಮೂತ್ರಪಿಂಡದ ಸಿರೆ (ನೀಲಿ)",
              "ta": "சிறுநீரகச் சிரை (நீலம்)"
            },
            "text": {
              "en": "Carries the cleaned blood out of the kidney and back towards the heart.",
              "kn": "ಶುದ್ಧವಾದ ರಕ್ತವನ್ನು ಮೂತ್ರಪಿಂಡದಿಂದ ಹೊರಗೆ, ಹೃದಯದ ಕಡೆಗೆ ಒಯ್ಯುತ್ತದೆ.",
              "ta": "சுத்தமான இரத்தத்தைச் சிறுநீரகத்திலிருந்து வெளியே, இதயத்தை நோக்கிக் கொண்டு செல்கிறது."
            }
          },
          {
            "id": "ureter",
            "position": "0.0170m 0.0200m 0.0093m",
            "normal": "0.126m 0.010m 0.992m",
            "title": {
              "en": "Ureter",
              "kn": "ಮೂತ್ರನಾಳ (ಯುರೇಟರ್)",
              "ta": "சிறுநீர்க்குழாய் (யூரேட்டர்)"
            },
            "text": {
              "en": "A thin tube that carries urine from the kidney down to the bladder.",
              "kn": "ಮೂತ್ರವನ್ನು ಮೂತ್ರಪಿಂಡದಿಂದ ಮೂತ್ರಕೋಶಕ್ಕೆ ಒಯ್ಯುವ ತೆಳು ಕೊಳವೆ.",
              "ta": "சிறுநீரைச் சிறுநீரகத்திலிருந்து சிறுநீர்ப்பைக்குக் கொண்டு செல்லும் மெல்லிய குழாய்."
            }
          }
        ],
        "diseasedHotspots": [
          {
            "id": "stone",
            "position": "0.0084m 0.0561m 0.0147m",
            "normal": "0.008m 0.013m 1.000m",
            "title": {
              "en": "Stone in the pelvis (big yellow lump)",
              "kn": "ಪೆಲ್ವಿಸ್‌ನಲ್ಲಿ ಕಲ್ಲು (ದೊಡ್ಡ ಹಳದಿ ಗಡ್ಡೆ)",
              "ta": "பெல்விஸில் கல் (பெரிய மஞ்சள் கட்டி)"
            },
            "text": {
              "en": "A hard lump made of minerals, often calcium. A stone here can block urine from leaving the kidney.",
              "kn": "ಖನಿಜಗಳಿಂದ, ಹೆಚ್ಚಾಗಿ ಕ್ಯಾಲ್ಸಿಯಂನಿಂದ, ಆದ ಗಟ್ಟಿ ಗಡ್ಡೆ. ಇಲ್ಲಿರುವ ಕಲ್ಲು ಮೂತ್ರ ಮೂತ್ರಪಿಂಡದಿಂದ ಹೊರಹೋಗುವುದನ್ನು ತಡೆಯಬಹುದು.",
              "ta": "தாதுக்களால், பெரும்பாலும் கால்சியத்தால், ஆன கடினமான கட்டி. இங்கே உள்ள கல் சிறுநீர் சிறுநீரகத்திலிருந்து வெளியேறுவதைத் தடுக்கலாம்."
            }
          },
          {
            "id": "calyx",
            "position": "-0.0002m 0.0401m 0.0145m",
            "normal": "-0.028m 0.017m 0.999m",
            "title": {
              "en": "Small stone in a cup",
              "kn": "ಬಟ್ಟಲಿನಲ್ಲಿ ಸಣ್ಣ ಕಲ್ಲು",
              "ta": "கிண்ணத்தில் சிறிய கல்"
            },
            "text": {
              "en": "Stones often start small inside the kidney. They may cause no pain at first and are often found on a scan.",
              "kn": "ಕಲ್ಲುಗಳು ಹೆಚ್ಚಾಗಿ ಮೂತ್ರಪಿಂಡದೊಳಗೆ ಚಿಕ್ಕದಾಗಿ ಶುರುವಾಗುತ್ತವೆ. ಮೊದಲು ನೋವು ಕೊಡದಿರಬಹುದು, ಸ್ಕ್ಯಾನ್‌ನಲ್ಲಿ ಹೆಚ್ಚಾಗಿ ಕಾಣುತ್ತವೆ.",
              "ta": "கற்கள் பெரும்பாலும் சிறுநீரகத்திற்குள் சிறியதாகத் தொடங்குகின்றன. ஆரம்பத்தில் வலி தராமல் இருக்கலாம், ஸ்கேனில் பெரும்பாலும் தெரியும்."
            }
          },
          {
            "id": "stuck",
            "position": "0.0166m 0.0300m 0.0132m",
            "normal": "-0.025m 0.002m 1.000m",
            "title": {
              "en": "Stone stuck in the ureter",
              "kn": "ಯುರೇಟರ್‌ನಲ್ಲಿ ಸಿಕ್ಕಿಕೊಂಡ ಕಲ್ಲು",
              "ta": "யூரேட்டரில் சிக்கிய கல்"
            },
            "text": {
              "en": "When a stone moves into this thin tube, it can get stuck and block the urine. This causes sudden, very strong pain in the back or side that may move down to the lower belly.",
              "kn": "ಕಲ್ಲು ಈ ತೆಳು ಕೊಳವೆಗೆ ಬಂದಾಗ, ಸಿಕ್ಕಿಕೊಂಡು ಮೂತ್ರವನ್ನು ತಡೆಯಬಹುದು. ಇದರಿಂದ ಬೆನ್ನು ಅಥವಾ ಪಕ್ಕೆಯಲ್ಲಿ ಇದ್ದಕ್ಕಿದ್ದಂತೆ ತೀವ್ರ ನೋವು ಬಂದು, ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗಕ್ಕೆ ಹರಡಬಹುದು.",
              "ta": "கல் இந்த மெல்லிய குழாய்க்குள் நகரும்போது, சிக்கிக்கொண்டு சிறுநீரைத் தடுக்கலாம். இதனால் முதுகு அல்லது விலாவில் திடீரென கடுமையான வலி வந்து, அடிவயிறு வரை பரவலாம்."
            }
          }
        ]
      }
    }
  }
];
