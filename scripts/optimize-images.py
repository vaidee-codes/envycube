#!/usr/bin/env python3
"""Generate responsive WebP variants for every photo under src/assets/works.

For each source JPEG it writes <name>-<width>.webp files (960, 1920 and the
original width when it is larger, capped at 2560) next to the source, and
records the original dimensions in src/assets/works/images.json, which
src/assets/images.js reads to build src/srcSet/width/height.

Usage: python3 scripts/optimize-images.py   (requires Pillow)
"""
import json
import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "works"
PHOTO_DIRS = ["bedroom", "living room", "bathroom", "kitchen", "dining room",
              "utility areas", "services", "about"]
TARGET_WIDTHS = [960, 1920]
MAX_WIDTH = 2560
QUALITY = 80

manifest = {}
for folder in PHOTO_DIRS:
    for src in sorted((ROOT / folder).glob("*.jp*g")):
        img = Image.open(src).convert("RGB")
        w, h = img.size
        widths = [tw for tw in TARGET_WIDTHS if tw < w]
        widths.append(min(w, MAX_WIDTH))
        for tw in widths:
            th = round(h * tw / w)
            out = src.with_name(f"{src.stem}-{tw}.webp")
            img.resize((tw, th), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
        manifest[f"{folder}/{src.stem}"] = {"width": w, "height": h, "widths": widths}

(ROOT / "images.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"{len(manifest)} images processed")
