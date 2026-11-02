# Organ Explainer AR

**AR-Based 3D Patient Education System for Explaining Medical Conditions**
Course project — XR in Health Care, Dayananda Sagar University.

A mobile AR web app that helps doctors explain diseases to patients.
It shows a healthy organ and a diseased organ side by side in 3D.
On an Android phone, the models can be placed on a real table using the camera (AR).

> ⚠ For education only. This app does not diagnose any disease.

## Organs and conditions
Each organ has two views, switched with a button:
- **Outside view**: a realistic model, the way a doctor would see the organ.
- **Inside view**: a cut-open teaching model, to show the parts inside.

| Organ | Condition | Outside view | Inside view |
|---|---|---|---|
| Heart | Blocked coronary artery | Realistic heart + plaque, narrow artery, damaged area | Cut-open heart (chambers, valves, walls) |
| Brain | Stroke | Realistic brain, clot in the middle cerebral artery | Brain cut in half, clot in the anterior cerebral artery |
| Lungs | Smoker's lungs | Realistic lungs, darkened with tar spots | Textbook lungs with windpipe |
| Liver | Fatty liver | Realistic liver with gallbladder, yellow and swollen | See-through liver with vessels |
| Kidney | Kidney stone | Realistic kidney, swollen, stone in the ureter | Cut-open kidney, stones inside |

## XR features
- **Place on a table (markerless AR):** WebXR on Android Chrome; organs keep beating/breathing in AR.
- **Guided AR story:** step-by-step lesson for each organ (healthy → disease → inside view → treatment → warning signs). The story card stays visible inside AR, with Next/Back and voice narration (Web Speech API; Kannada/Tamil voice only if the phone has it).
- **Body AR mirror (`body.html`):** MediaPipe Pose finds a real person in the camera and places the brain, lungs, heart, liver and kidneys on their body (three.js). Healthy / With the condition switch. Tap an organ, or point at it with a finger (MediaPipe Hands, hold to choose); it flies out with its numbered parts. Pinch and move to turn it, pinch with two hands to zoom. Works with the phone back camera (point at a friend) or a laptop webcam (mirror). Positions are approximate.
- **AR cards (marker-based AR):** 5 printable cards (`cards.html`). `scan.html` uses MindAR image tracking + A-Frame to show healthy vs diseased organs on top of the card. Works with a phone or a laptop webcam (good for projector demos). Card targets are in `ar/targets.mind`.

## Features
- Home screen to pick a condition
- Living organs: the heart beats, the lungs breathe, the liver moves with breathing, blood flows through arteries and urine flows down the ureter. In the diseased organ the flow stops at the blockage (plaque, clot or stone). Works in AR too, with a Pause button.
- Healthy and diseased 3D models side by side (drag to turn, pinch/scroll to zoom)
- "View in AR" for each model, and "View both on your table" (Android, Chrome)
- Numbered tap-to-learn dots with simple explanations (6–10 parts on healthy organs, 3 on diseased)
- Clickable list of parts under each model; the model turns to show the part
- "About this organ" and "What is the condition?" sections
- "How treatment helps" and "Get help now" sections
- Language switch: English, Kannada, Tamil
- Works on laptop and projector too

## Tech
- Plain HTML, CSS, JavaScript
- Google `<model-viewer>` 4.4.0 for 3D and AR (WebXR / Scene Viewer)
- MindAR 1.2.5 + A-Frame 1.5.0 (+ aframe-extras) for card tracking
- MediaPipe Tasks Vision 0.10.18 (Pose Landmarker lite, Hand Landmarker) + three.js r172 for Body AR
- All libraries are hosted in `js/vendor/` and `js/draco/`, so the app does not depend on other websites
- 3D models in `.glb` format
- Hosted on GitHub Pages

## Files
| File | What it does |
|---|---|
| `index.html` | Home, organ pages, guided AR story |
| `scan.html` | AR card scanner (camera) |
| `body.html`, `js/body.js` | Body AR mirror (pose + hand tracking) |
| `cards.html` | Printable AR cards |
| `css/style.css` | Colours and design |
| `js/data.js` | All text, dot positions and model file names |
| `js/app.js` | How the app works (screens, dots, AR, language) |
| `models/*.glb` | 3D models (`*-inside.glb` = cut-open view) |
| `images/` | Preview pictures for the home screen |

## Model credits (Sketchfab)
| Model | Title | Author | Licence |
|---|---|---|---|
| Heart (outside) | Realistic Human Heart | neshallads | CC BY 4.0 |
| Heart (inside) | Human Heart Internal Structure 3D Model | Haiqa Arif | CC BY 4.0 |
| Brain (outside) | Human brain, Cerebrum & Brainstem | FrankJohansson | CC BY 4.0 |
| Brain (inside) | Human Brain Model - Midsagittal Section | 3-D Photogrammetry Anatomical Models | CC BY-NC-SA 4.0 |
| Lungs (outside) | Realistic Human Lungs | neshallads | CC BY 4.0 |
| Lungs (inside) | Respiratory System | Vikrama Raghuraman | CC BY 4.0 |
| Liver (outside) | Human liver and gallbladder | ElliotSS | CC BY 4.0 |
| Liver (inside) | Liver Segments | Dr. David Frias | CC BY 4.0 |
| Kidney (outside) | Kidney Cross-section | Medulla | CC BY 4.0 |
| Kidney (inside) | Kidney | cgmac | CC BY 4.0 |

Disease parts and colours were added for this project. Models were resized and simplified for phones.
The original downloads are on the `source-models` branch (fetched by the GitHub Action in `.github/workflows`).

## Languages
- English: done.
- Kannada: done. Please check once.
- Tamil: done, but NEEDS CHECKING by someone who reads Tamil.

## Status
- [x] Step 1 — App built
- [x] 5 organs, tap-to-learn parts, treatment and warning sections
- [x] Kannada and Tamil text
- [x] Step 2 — Real 3D models for all 5 organs
- [x] Step 4 — On GitHub Pages and tested on an Android phone (AR)
- [ ] Step 5 — Report, slides, demo video
