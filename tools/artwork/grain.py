#!/usr/bin/env python3
"""Film grain on the subject only, exact page colour on the ground.
usage: grain.py in.png out.jpg light|dark|none [width]   (default 2048 wide, 16:9; none = transparent PNG cutout)"""

import sys, numpy as np
from PIL import Image, ImageFilter

src, dst, ground = sys.argv[1], sys.argv[2], sys.argv[3]
W = int(sys.argv[4]) if len(sys.argv) > 4 else 2048
H = round(W * 9 / 16)
BG = {
    "light": (0xFA, 0xF9, 0xF6),
    "dark": (0x0D, 0x0C, 0x22),
    "indigo": (0x2C, 0x30, 0x86),
    "none": (0x80, 0x80, 0x80),
}[ground]
im = (
    Image.open(src)
    .convert("RGBA")
    .resize((W, H), Image.LANCZOS)
    .filter(ImageFilter.GaussianBlur(1.1 * W / 2048))
)
rgba = np.asarray(im).astype(np.float32) / 255.0
bg = np.array(BG, np.float32) / 255.0
alpha = rgba[..., 3:4]
# the render is transparent around the subject; composite it onto the page colour
a = rgba[..., :3] * alpha + bg * (1 - alpha)
# grain only on and just around the subject
mask = (
    np.asarray(
        Image.fromarray((alpha[..., 0] * 255).astype(np.uint8))
        .filter(ImageFilter.MaxFilter(9))
        .filter(ImageFilter.GaussianBlur(6 * W / 2048))
    ).astype(np.float32)
    / 255.0
)
rng = np.random.default_rng(7)
noise = rng.normal(0.0, 0.075, a.shape[:2]).astype(np.float32)
noise = (
    np.asarray(
        Image.fromarray(((noise * 4 + 0.5).clip(0, 1) * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(0.35)
        )
    ).astype(np.float32)
    / 255.0
)
noise = (noise - 0.5) / 4
if ground == "none":
    # cutout: transparent PNG, grain on the subject only
    rgb = rgba[..., :3] + (noise * mask)[..., None]
    Image.fromarray(
        np.dstack(
            [
                (rgb.clip(0, 1) * 255).round().astype(np.uint8),
                (alpha[..., 0] * 255).round().astype(np.uint8),
            ]
        )
    ).save(dst, optimize=True)
else:
    out = a + (noise * mask)[..., None]
    out = np.where(
        mask[..., None] < 0.002, bg, out
    )  # ground is exactly the page colour
    Image.fromarray((out.clip(0, 1) * 255).round().astype(np.uint8)).save(
        dst, quality=90, subsampling=0, optimize=True
    )
print("wrote", dst)
