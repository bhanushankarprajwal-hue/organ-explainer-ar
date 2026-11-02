"""Downloads source 3D models from Sketchfab (runs on GitHub Actions, not on the phone/laptop).
Needs the SKETCHFAB_TOKEN repository secret."""
import json, os, sys, urllib.request, zipfile, io

TOKEN = os.environ.get("SKETCHFAB_TOKEN", "").strip()
if not TOKEN:
    sys.exit("SKETCHFAB_TOKEN secret is missing")

MODELS = {
    "heart-internal":   "21d346f72230432e8ed5fe448b03cca5",  # Human Heart Internal Structure (cut open)
    "brain-midsagittal":"f435004b87bb4792877404f8ccd4c6aa",  # Human Brain Model - Midsagittal Section
    "kidney-section":   "686992c2a7fb456eaa8997b0366f4062",  # Kidney (cut open)
    "kidney-section-2": "b59cc02d4e964af7a2c1fcb0001919d8",  # Kidney Cross-section
    "liver-segments":   "4fa7acc0bbd449fb965fe41a6b5e6ee8",  # Liver Segments (vessels inside)
    "liver-gallbladder":"6c4e9bd0d49f4828b804259330c0c6c4",  # Human liver and gallbladder
    "lungs":            "ce09f4099a68467880f46e61eb9a3531",  # Realistic Human Lungs
    "lungs-respiratory":"a7ac43a140644662a9b896b8a8a10f57",  # Respiratory System
}
OUT = "source-models"
os.makedirs(OUT, exist_ok=True)
H = {"Authorization": "Token " + TOKEN, "User-Agent": "organ-explainer-ar"}
info = {}
for name, uid in MODELS.items():
    try:
        meta = json.loads(urllib.request.urlopen(urllib.request.Request(f"https://api.sketchfab.com/v3/models/{uid}", headers={"User-Agent": "x"}), timeout=30).read())
        d = json.loads(urllib.request.urlopen(urllib.request.Request(f"https://api.sketchfab.com/v3/models/{uid}/download", headers=H), timeout=30).read())
        if "glb" in d and d["glb"].get("size", 0) < 95_000_000:
            data = urllib.request.urlopen(d["glb"]["url"], timeout=600).read()
            open(f"{OUT}/{name}.glb", "wb").write(data); kind = "glb"
        else:
            data = urllib.request.urlopen(d["gltf"]["url"], timeout=600).read()
            zipfile.ZipFile(io.BytesIO(data)).extractall(f"{OUT}/{name}"); kind = "gltf"
        info[name] = {"uid": uid, "kind": kind, "bytes": len(data), "name": meta["name"],
                      "author": meta["user"]["displayName"], "license": (meta.get("license") or {}).get("label"),
                      "url": meta["viewerUrl"], "faces": meta.get("faceCount")}
        print("OK", name, kind, len(data))
    except Exception as e:
        info[name] = {"uid": uid, "error": repr(e)}
        print("FAIL", name, e)
json.dump(info, open(f"{OUT}/models.json", "w"), indent=1)
