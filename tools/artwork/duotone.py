#!/usr/bin/env python3
"""Duotone a photograph through the brand ramp: luminance -> indigo, orange, paper,
with the same film grain as the renders.

  python tools/artwork/duotone.py in.jpg out.jpg [--width 1600]
"""

import sys, argparse, numpy as np
from PIL import Image, ImageFilter, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("dst")
ap.add_argument("--width", type=int, default=1600)
A = ap.parse_args()


def hexc(h):
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], np.float32) / 255


INDIGO, ORANGE, PAPER = hexc("#2c3086"), hexc("#f26722"), hexc("#faf9f6")
# ramp stops on luminance (0..1): shadows indigo, mids orange, highlights paper
STOPS = [(0.0, INDIGO), (0.3, INDIGO), (0.62, ORANGE), (0.92, PAPER), (1.0, PAPER)]

im = Image.open(A.src)
im = ImageOps.exif_transpose(im).convert("RGB")
if im.width > A.width:
    im = im.resize((A.width, round(im.height * A.width / im.width)), Image.LANCZOS)
g = (
    np.asarray(ImageOps.autocontrast(im.convert("L"), cutoff=1)).astype(np.float32)
    / 255
)
# smoothstep-ish easing between stops
lut = np.zeros((256, 3), np.float32)
xs = np.linspace(0, 1, 256)
for i, x in enumerate(xs):
    for (p0, c0), (p1, c1) in zip(STOPS[:-1], STOPS[1:]):
        if p0 <= x <= p1:
            t = 0 if p1 == p0 else (x - p0) / (p1 - p0)
            t = t * t * (3 - 2 * t)
            lut[i] = c0 * (1 - t) + c1 * t
            break
out = lut[(g * 255).round().astype(np.uint8)]
rng = np.random.default_rng(7)
noise = rng.normal(0, 0.06, g.shape).astype(np.float32)
noise = (
    np.asarray(
        Image.fromarray(((noise * 4 + 0.5).clip(0, 1) * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(0.35)
        )
    ).astype(np.float32)
    / 255
)
out = out + ((noise - 0.5) / 4)[..., None]
Image.fromarray((out.clip(0, 1) * 255).round().astype(np.uint8)).save(
    A.dst, quality=88, subsampling=0, optimize=True
)
print("wrote", A.dst)
