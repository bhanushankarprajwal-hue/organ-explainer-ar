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
| Heart | Blocked coronary artery | Cut-open model (chambers, valves, walls) + coronary artery, plaque and damaged area added |
| Brain | Stroke | Brain cut in half + artery, clot and damaged area added |
| Lungs | Smoker's lungs | Lungs with windpipe; smoker version recoloured with tar spots |
| Liver | Fatty liver | See-through liver with vessels; fatty version yellow, swollen, with fat spots |
| Kidney | Kidney stone | Cut-open kidney; stones added in the cup, pelvis and ureter |

## Features
- Home screen to pick a condition
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

## Model credits (Sketchfab)
- Heart: "Human Heart Internal Structure 3D Model" by Haiqa Arif — CC BY 4.0
- Brain: "Human Brain Model - Midsagittal Section" by 3-D Photogrammetry Anatomical Models — CC BY-NC-SA 4.0 (non-commercial)
- Lungs: "Respiratory System" by Vikrama Raghuraman — CC BY 4.0
- Liver: "Liver Segments" by Dr. David Frias — CC BY 4.0
- Kidney: "Kidney" by cgmac — CC BY 4.0
- Disease parts and colours were added for this project. Models were resized and simplified for phones.
- The original downloads are kept on the `source-models` branch (fetched by the GitHub Action in `.github/workflows`).

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
