// =============================================================
// Personal case: changes the "with condition" 3D model to match a
// patient's report values (used by My Report and Hand AR).
//   heart  { block: 0-100 }   % blockage of the artery
//   kidney { mm: 0-25 }       stone size in mm
//   liver  { grade: 0-3 }     fatty liver grade
//   lungs  { sev: 0-1 }       smoking damage (from pack-years)
//   brain  { size: 0-1, recover: 0-1 }  stroke area, recovery
// The disease parts are the "...-add_N" meshes inside each model.
// =============================================================
import * as THREE from "three";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// find the disease part number N ("heart-diseased-add_3" -> 3)
function parts(root) {
  const out = {};
  root.traverse((n) => { const m = /-add_(\d+)$/.exec(n.name || ""); if (m && n.isMesh) out[m[1]] = n; });
  return out;
}
function mainMeshes(root) {
  const out = [];
  root.traverse((n) => { if (n.isMesh && !/-add_\d+$/.test(n.name || "") && n.name !== "flow") out.push(n); });
  return out;
}
// remember how a mesh looked at the start, so we can scale it about its own centre
function prep(mesh) {
  if (!mesh || mesh.userData.sev) return mesh;
  mesh.material = mesh.material.clone();
  mesh.updateMatrix();
  mesh.geometry.computeBoundingBox();
  const c = mesh.geometry.boundingBox.getCenter(new THREE.Vector3()).applyMatrix4(mesh.matrix);   // centre in parent space
  mesh.userData.sev = { p0: mesh.position.clone(), s0: mesh.scale.clone(), c, op: mesh.material.opacity, col: mesh.material.color.clone(), em: mesh.material.emissive ? mesh.material.emissive.clone() : null };
  return mesh;
}
function scaleAbout(mesh, s, at) {
  if (!mesh) return;
  const d = mesh.userData.sev, c = at || d.c;     // "at" moves the part to a new centre
  mesh.position.copy(d.p0).sub(d.c).multiplyScalar(s).add(c);
  mesh.scale.copy(d.s0).multiplyScalar(s);
  mesh.visible = s > 0.02;
}
function fade(mesh, a) {
  if (!mesh) return;
  const m = mesh.material;
  m.transparent = true; m.opacity = clamp(a, 0, 1); m.depthWrite = a > 0.95;
  mesh.visible = a > 0.01;
}
function tint(meshes, color, k) {
  meshes.forEach((mesh) => {
    if (!mesh.userData.sev) prep(mesh);
    mesh.material.color.copy(mesh.userData.sev.col).lerp(color, clamp(k, 0, 1));
  });
}

export function makeCase(organ, root) {
  const P = parts(root);
  Object.values(P).forEach(prep);
  const main = mainMeshes(root);
  main.forEach(prep);
  const glowParts = [];
  const glow = (mesh) => { if (mesh && mesh.material.emissive) glowParts.push(mesh); };

  let apply;
  if (organ === "heart") {
    // 3 = fatty plaque, 0 = muscle short of blood, 1 = narrowed segment
    glow(P[3]);
    apply = ({ block = 70 }) => {
      const b = clamp(block / 100, 0, 1);
      scaleAbout(P[3], b < 0.03 ? 0 : 0.35 + 1.05 * b);
      scaleAbout(P[1], b < 0.03 ? 0 : 0.6 + 0.5 * b);
      if (P[0]) { scaleAbout(P[0], 0.55 + 0.6 * b); fade(P[0], (P[0].userData.sev.op || 0.6) * smooth(0.35, 0.85, b) * 1.3); }
      if (P[2]) fade(P[2], 0.25 + 0.75 * smooth(0.3, 0.9, b));
    };
  } else if (organ === "kidney") {
    // the model's stone sits in the tube (ureter); for a stone in the kidney we move it inside
    // and make the kidney see-through
    glow(P[0]);
    const inKidney = new THREE.Vector3(0.006, 0.054, 0.002);
    const body = main.filter((m) => m.name !== "flow");
    apply = ({ mm = 8, where = "kidney" }) => {
      const k = where === "kidney";
      scaleAbout(P[0], clamp(mm, 0, k ? 30 : 10) / 7.5, k ? inKidney : null);
      body.forEach((m) => { m.material.transparent = k; m.material.opacity = k ? 0.42 : (m.userData.sev.op ?? 1); m.material.depthWrite = !k; });
    };
  } else if (organ === "liver") {
    const fatColor = new THREE.Color(1, 0.88, 0.55);
    apply = ({ grade = 2 }) => {
      const g = clamp(grade / 3, 0, 1);
      fade(P[0], g);
      tint(main.filter((m) => /liver/i.test(m.name)), fatColor, 0.45 * g);
    };
  } else if (organ === "lungs") {
    const tarColor = new THREE.Color(0.32, 0.3, 0.3);
    apply = ({ sev = 0.6 }) => {
      const s = clamp(sev, 0, 1);
      fade(P[0], 0.08 + 0.92 * s);
      tint(main, tarColor, 0.5 * s);
    };
  } else if (organ === "brain") {
    // 2 = damaged area, 0 = area at risk around it, 3 = clot, 1 = blocked artery
    glow(P[3]);
    apply = ({ size = 0.5, recover = 0 }) => {
      const z = clamp(size, 0, 1), r = clamp(recover, 0, 1);
      scaleAbout(P[2], 0.45 + 0.85 * z);
      if (P[0]) { scaleAbout(P[0], 0.55 + 0.85 * z); fade(P[0], (P[0].userData.sev.op || 0.62) * (1 - r)); }
      scaleAbout(P[3], (0.7 + 0.5 * z) * (1 - smooth(0.3, 0.9, r)));
    };
  } else apply = () => {};

  // a soft pulse on the main problem part, so the eye goes there
  function pulse(time) {
    const k = 0.35 + 0.35 * Math.sin(time * 3.2);
    glowParts.forEach((m) => { if (m.material.emissive) m.material.emissive.setRGB(k * 0.9, k * 0.55, k * 0.1); });
  }
  return { apply, pulse };
}

// read a case from a link (?case={"block":70})
export function caseFromURL() {
  try { const s = new URLSearchParams(location.search).get("case"); return s ? JSON.parse(s) : null; } catch (e) { return null; }
}
