# Organ Explainer AR

**AR-Based 3D Patient Education System for Explaining Medical Conditions**
Course project — XR in Health Care, Dayananda Sagar University.

A mobile AR web app that helps doctors explain diseases to patients.
It shows a healthy organ and a diseased organ side by side in 3D.
On an Android phone, the models can be placed on a real table using the camera (AR).

> ⚠ For education only. This app does not diagnose any disease.

## Organs and conditions
| Organ | Condition | 3D model |
|---|---|---|
| Heart | Blocked coronary artery | Real model (Sketchfab) + disease parts added |
| Brain | Stroke | Real model (Sketchfab) + disease parts added |
| Lungs | Smoker's lungs | Placeholder shape |
| Liver | Fatty liver | Placeholder shape |
| Kidney | Kidney stone | Placeholder shape |

## Features
- Home screen to pick a condition
- Healthy and diseased 3D models side by side (drag to turn, pinch/scroll to zoom)
- "View in AR" for each model, and "View both on your table" (Android, Chrome)
- Numbered tap-to-learn dots with simple explanations (6 parts on healthy organs, 3 on diseased)
- Clickable list of parts under each model; the model turns to show the part
- "About this organ" and "What is the condition?" sections
- "How treatment helps" and "Get help now" sections
- Language switch: English, Kannada, Tamil
- Works on laptop and projector too

## Tech
- Plain HTML, CSS, JavaScript
- Google `<model-viewer>` 4.4.0 for 3D and AR (WebXR / Scene Viewer)
- 3D models in `.glb` format
- Hosted on GitHub Pages

## Files
| File | What it does |
|---|---|
| `index.html` | The page layout |
| `css/style.css` | Colours and design |
| `js/data.js` | All text, dot positions and model file names |
| `js/app.js` | How the app works (screens, dots, AR, language) |
| `models/*.glb` | 3D models |
| `images/` | Preview pictures for the home screen |

## Model credits
- Heart: "Realistic Human Heart" by neshallads, CC BY 4.0 — https://sketchfab.com/3d-models/realistic-human-heart-3f8072336ce94d18b3d0d055a1ece089
- Brain: "Human brain, Cerebrum & Brainstem" by FrankJohansson, CC BY 4.0 — https://sketchfab.com/3d-models/human-brain-cerebrum-brainstem-0aa0e33c5c854d1bab7bac9e1c7acaec
- Disease parts (plaque, narrow artery, stroke area, clot) were added for this project.

## Languages
- English: done.
- Kannada: done. Please check once.
- Tamil: done, but NEEDS CHECKING by someone who reads Tamil.

## Status
- [x] Step 1 — App built
- [x] 5 organs, tap-to-learn parts, treatment and warning sections
- [x] Kannada and Tamil text
- [~] Step 2 — Real 3D models: heart and brain done; lungs, liver, kidney still placeholders
- [ ] Step 4 — On GitHub Pages and tested on an Android phone (AR)
- [ ] Step 5 — Report, slides, demo video
