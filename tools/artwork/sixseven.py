#!/usr/bin/env python3
"""The six-seven gesture: twelve frames of the K1 weighing its hands, one cycle,
head to hips from the front, packed into one sprite strip for the footer easter
egg. Not in DESIGN.md, on purpose.

usage: tools/artwork/sixseven.py            -> src/assets/artwork/sixseven.png (+ prints frame size)

The one hand-keyed pose set on the site: no recording has this gesture. Body and
legs are the resting pose of k1-body; only the arms and the head move. Rendered
with render.py from the front at one camera distance, grained with grain.py as a
transparent cutout, then every frame is cropped to the same box, the upper body
only, so the figure does not jump between frames."""

import json
import math
import os
import subprocess
import sys
import tempfile

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, "src/assets/artwork/sixseven.png")
N = 12  # frames in one cycle (both hands up and down once)
W = 2048  # render width; 16:9, grain.py's shape; the upper body comes out about 520px tall
UPPER = 0.56  # the part of the figure's height kept, from the top: head to just below the hips

REST = {
    "left_shoulder_roll_joint": -1.45,
    "right_shoulder_roll_joint": 1.45,  # arms hanging, a little out
    "left_hip_pitch_joint": -0.25,
    "right_hip_pitch_joint": -0.25,
    "left_knee_pitch_joint": 0.5,
    "right_knee_pitch_joint": 0.5,
    "left_ankle_pitch_joint": -0.25,
    "right_ankle_pitch_joint": -0.25,
    "aahead_pitch_joint": 0.3,
}


# The MJCF's zero pose is a T-pose, so once the roll hangs the arm, the joint called
# elbow yaw is the elbow's bend (forward is positive on the right, negative on the
# left) and the joint called elbow pitch is the twist of the upper arm.
def arm(side, lift):
    """Forearm forward, palm up; lift in [-1, 1] raises (1) or lowers (-1) the hand,
    by swinging the upper arm forward and bending the elbow further."""
    sgn = 1 if side == "right" else -1
    return {
        f"aa{side}_shoulder_pitch_joint": -0.5 - 0.3 * lift,
        f"{side}_elbow_yaw_joint": sgn * (1.45 + 0.2 * lift),
        f"{side}_elbow_pitch_joint": 0.05,
    }


poses = []
for i in range(N):
    phase = 2 * math.pi * i / N
    lift = math.sin(phase)  # right hand up while the left is down, then the reverse
    j = dict(REST)
    j.update(arm("right", lift))
    j.update(arm("left", -lift))
    j["aahead_yaw_joint"] = -0.12 * lift  # the head follows the hand that is up
    poses.append(
        {
            "name": f"sixseven-{i}",
            "note": "hand-keyed, the six-seven gesture",
            "trunk_tilt_wxyz": [1, 0, 0, 0],
            "joints": j,
        }
    )

tmp = tempfile.mkdtemp(prefix="ww-sixseven-")
pj = os.path.join(tmp, "poses.json")
json.dump({"poses": poses}, open(pj, "w"))
cuts = []
for p in poses:
    raw = os.path.join(tmp, p["name"] + ".png")
    cut = os.path.join(tmp, p["name"] + "-cut.png")
    r = subprocess.run(
        [
            "blender",
            "-b",
            "--python",
            os.path.join(HERE, "render.py"),
            "--",
            "--mode",
            "pose",
            "--poses",
            pj,
            "--pose",
            p["name"],
            "--view",
            "front",
            "--fixed-dist",
            "2.75",
            "--lens",
            "60",
            "--size",
            f"{W}x{W * 9 // 16}",
            "--samples",
            "32",
            "--out",
            raw,
        ],
        capture_output=True,
        text=True,
    )
    if "RENDER DONE" not in r.stdout:
        print(r.stdout[-2000:], r.stderr[-2000:])
        sys.exit(1)
    subprocess.run(
        [sys.executable, os.path.join(HERE, "grain.py"), raw, cut, "none", str(W)],
        check=True,
        capture_output=True,
    )
    cuts.append(Image.open(cut).convert("RGBA"))
    print("frame", p["name"])

# one box for every frame, so the figure stays put; the upper body only
boxes = [im.getchannel("A").getbbox() for im in cuts]
l, t = min(b[0] for b in boxes), min(b[1] for b in boxes)
r, b = max(b[2] for b in boxes), max(b[3] for b in boxes)
b = t + round((b - t) * UPPER)
fw, fh = r - l, b - t
strip = Image.new("RGBA", (fw * N, fh), (0, 0, 0, 0))
for i, im in enumerate(cuts):
    strip.paste(im.crop((l, t, r, b)), (fw * i, 0))
# 256 colours are plenty for the duotone ramp plus grain, and a quarter of the bytes
strip.quantize(colors=256, method=Image.Quantize.FASTOCTREE).save(OUT, optimize=True)
print("wrote", OUT, f"{N} frames of {fw}x{fh}", f"{os.path.getsize(OUT) // 1024} KB")
