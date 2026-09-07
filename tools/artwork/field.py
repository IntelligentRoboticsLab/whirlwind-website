#!/usr/bin/env python3
"""The still frames of the noise field under the home lineup, one per theme.
Same maths as the WebGL shader in src/components/NoiseFieldCanvas.tsx at t = 7.
usage: field.py [width] [height]   (default 1920 x 760) -> src/assets/artwork/field-{light,dark}.jpg"""

import sys, numpy as np
from PIL import Image

W = int(sys.argv[1]) if len(sys.argv) > 1 else 1920
H = int(sys.argv[2]) if len(sys.argv) > 2 else 760
T = 7.0


def hashv(p):
    return np.mod(np.sin(p[..., 0] * 127.1 + p[..., 1] * 311.7) * 43758.5453, 1.0)


def noise(p):
    i = np.floor(p)
    f = p - i
    s = f * f * (3 - 2 * f)
    a = hashv(i)
    b = hashv(i + [1, 0])
    c = hashv(i + [0, 1])
    d = hashv(i + [1, 1])
    return (
        a
        + (b - a) * s[..., 0]
        + (c - a) * s[..., 1]
        + (a - b - c + d) * s[..., 0] * s[..., 1]
    )


def fbm(p):
    v = np.zeros(p.shape[:-1], np.float64)
    a = 0.5
    for _ in range(5):
        v += a * noise(p)
        p = p * 2.03 + [1.7, 9.2]
        a *= 0.5
    return v


ys, xs = np.mgrid[0:H, 0:W].astype(np.float64)
uv = np.stack([(xs + 0.5) / W, (ys + 0.5) / H], -1)  # uv.y is 1 at the ground
aspect = W / H
q = np.stack([uv[..., 0] * aspect * 2.2 + T * 0.09, uv[..., 1] * 2.2 - T * 0.035], -1)
# the smoke: warped noise, denser towards the ground
n = fbm(q + 0.35 * fbm(q * 1.7 - T * 0.06)[..., None])
g = np.clip((uv[..., 1] - 0.15) / 0.8, 0, 1)
ground = g * g * (3 - 2 * g)
d = np.clip((n - 0.42) * 1.6 * ground, 0, 1)
# its colour: a second, slower field says where it is orange (0) and where indigo (1),
# about half each; indigo needs more weight than orange to show, most of all on the dark ground
h = np.clip((fbm(q + [-T * 0.03, T * 0.02] + 4.0) - 0.40) / 0.16, 0, 1)
k = h * h * (3 - 2 * h)
orange = np.array([0.949, 0.404, 0.133])
indigo = np.array([0.173, 0.188, 0.525])
for theme, paper, blue in (("light", [0.980, 0.976, 0.965], 0.65), ("dark", [0.051, 0.047, 0.133], 0.9)):
    c = np.broadcast_to(np.array(paper), (H, W, 3)).copy()
    c = c + (orange - c) * (d * 0.55 * (1 - k))[..., None]
    c = c + (indigo - c) * (d * blue * k)[..., None]
    out = f"src/assets/artwork/field-{theme}.jpg"
    Image.fromarray((c.clip(0, 1) * 255).round().astype(np.uint8)).save(
        out, quality=88, subsampling=0, optimize=True
    )
    print("wrote", out)
