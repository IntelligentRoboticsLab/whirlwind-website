#!/usr/bin/env python3
"""Extract a set of striking K1 poses from recorded motion and write poses.json.

Sources (paths are arguments):
  walk.pkl / kick.pkl   dicts with dof_pos (N, 22), root_rot (N, 4, xyzw), root_pos (N, 3), fps
  goalkeeper CSV        maelstrom sim export with <Joint>.q columns and roll/pitch/yaw

  python tools/artwork/poses.py walk.pkl kick.pkl goalkeeper_joint_states_active_only.csv

Joint order in all sources is the Booster K1 22-dof order. The output maps each pose to
MJCF joint names in K1_22dof_parallel.xml, plus the trunk tilt (yaw removed) as a wxyz
quaternion, so render.py can reproduce it exactly.
"""

import sys, json, csv, pickle, math
import numpy as np

K1_ORDER = [
    "Head_Yaw",
    "Head_Pitch",
    "Left_Shoulder_Pitch",
    "Left_Shoulder_Roll",
    "Left_Elbow_Pitch",
    "Left_Elbow_Yaw",
    "Right_Shoulder_Pitch",
    "Right_Shoulder_Roll",
    "Right_Elbow_Pitch",
    "Right_Elbow_Yaw",
    "Left_Hip_Pitch",
    "Left_Hip_Roll",
    "Left_Hip_Yaw",
    "Left_Knee_Pitch",
    "Left_Ankle_Pitch",
    "Left_Ankle_Roll",
    "Right_Hip_Pitch",
    "Right_Hip_Roll",
    "Right_Hip_Yaw",
    "Right_Knee_Pitch",
    "Right_Ankle_Pitch",
    "Right_Ankle_Roll",
]
MJCF = {
    "Head_Yaw": "aahead_yaw_joint",
    "Head_Pitch": "aahead_pitch_joint",
    "Left_Shoulder_Pitch": "aaleft_shoulder_pitch_joint",
    "Left_Shoulder_Roll": "left_shoulder_roll_joint",
    "Left_Elbow_Pitch": "left_elbow_pitch_joint",
    "Left_Elbow_Yaw": "left_elbow_yaw_joint",
    "Right_Shoulder_Pitch": "aaright_shoulder_pitch_joint",
    "Right_Shoulder_Roll": "right_shoulder_roll_joint",
    "Right_Elbow_Pitch": "right_elbow_pitch_joint",
    "Right_Elbow_Yaw": "right_elbow_yaw_joint",
    "Left_Hip_Pitch": "left_hip_pitch_joint",
    "Left_Hip_Roll": "left_hip_roll_joint",
    "Left_Hip_Yaw": "left_hip_yaw_joint",
    "Left_Knee_Pitch": "left_knee_pitch_joint",
    "Left_Ankle_Pitch": "left_ankle_pitch_joint",
    "Left_Ankle_Roll": "left_ankle_roll_joint",
    "Right_Hip_Pitch": "right_hip_pitch_joint",
    "Right_Hip_Roll": "right_hip_roll_joint",
    "Right_Hip_Yaw": "right_hip_yaw_joint",
    "Right_Knee_Pitch": "right_knee_pitch_joint",
    "Right_Ankle_Pitch": "right_ankle_pitch_joint",
    "Right_Ankle_Roll": "right_ankle_roll_joint",
}
I = {n: i for i, n in enumerate(K1_ORDER)}


def q_xyzw_to_tilt_wxyz(q):
    """Remove the yaw component of a world-frame xyzw quaternion; return wxyz."""
    x, y, z, w = [float(v) for v in q]
    # yaw from quaternion (ZYX)
    yaw = math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z))
    cy, sy = math.cos(yaw / 2), math.sin(yaw / 2)
    # q_tilt = inv(q_yaw) * q   (q_yaw = (w=cy, z=sy))
    iw, ix, iy, iz = cy, 0.0, 0.0, -sy
    tw = iw * w - ix * x - iy * y - iz * z
    tx = iw * x + ix * w + iy * z - iz * y
    ty = iw * y - ix * z + iy * w + iz * x
    tz = iw * z + ix * y - iy * x + iz * w
    return [round(v, 5) for v in (tw, tx, ty, tz)]


def rpy_to_tilt_wxyz(roll, pitch):
    cr, sr, cp, sp = (
        math.cos(roll / 2),
        math.sin(roll / 2),
        math.cos(pitch / 2),
        math.sin(pitch / 2),
    )
    return [round(v, 5) for v in (cr * cp, sr * cp, cr * sp, -sr * sp)]


def peaks(sig, n, min_sep, key=None):
    order = np.argsort(-sig) if key is None else np.argsort(key)
    chosen = []
    for i in order:
        if all(abs(i - c) >= min_sep for c in chosen):
            chosen.append(int(i))
        if len(chosen) == n:
            break
    return chosen


def pose(name, source, frame, q, tilt, note, kick_leg=None):
    d = {
        "name": name,
        "source": source,
        "frame": int(frame),
        "note": note,
        "trunk_tilt_wxyz": tilt,
        "joints": {MJCF[n]: round(float(q[I[n]]), 4) for n in K1_ORDER},
    }
    if kick_leg:
        d["kick_foot"] = f"{kick_leg}_Foot"
    return d


poses = []
# --seq START END N  (kick.pkl only): also write N evenly spaced frames of a continuous kick
SEQ = None
if "--seq" in sys.argv:
    i = sys.argv.index("--seq")
    SEQ = (int(sys.argv[i + 1]), int(sys.argv[i + 2]), int(sys.argv[i + 3]))
    del sys.argv[i : i + 4]
for path in sys.argv[1:]:
    if path.endswith(".pkl"):
        d = pickle.load(open(path, "rb"))
        Q = np.asarray(d["dof_pos"])
        R = np.asarray(d["root_rot"])
        tag = "walk" if "walk" in path else "kick"
        hipL, hipR = Q[:, I["Left_Hip_Pitch"]], Q[:, I["Right_Hip_Pitch"]]
        kneeL, kneeR = Q[:, I["Left_Knee_Pitch"]], Q[:, I["Right_Knee_Pitch"]]
        spread = np.abs(hipL - hipR)
        if tag == "walk":
            for k, f in enumerate(peaks(spread, 4, 40)):
                lead = "left" if hipL[f] < hipR[f] else "right"
                poses.append(
                    pose(
                        f"walk-stride-{k + 1}",
                        path,
                        f,
                        Q[f],
                        q_xyzw_to_tilt_wxyz(R[f]),
                        f"full stride, {lead} leg forward",
                    )
                )
            knee = np.maximum(kneeL, kneeR)
            for k, f in enumerate(peaks(knee, 2, 60)):
                poses.append(
                    pose(
                        f"walk-swing-{k + 1}",
                        path,
                        f,
                        Q[f],
                        q_xyzw_to_tilt_wxyz(R[f]),
                        "knee at its highest mid swing",
                    )
                )
        else:
            # kicking leg = the one with the larger hip pitch range
            rngL, rngR = hipL.max() - hipL.min(), hipR.max() - hipR.min()
            leg = "Left" if rngL > rngR else "Right"
            hip = Q[:, I[f"{leg}_Hip_Pitch"]]
            knee = Q[:, I[f"{leg}_Knee_Pitch"]]
            # Booster convention: negative hip pitch = leg forward. Wind-up is the leg furthest
            # back (max hip pitch), follow-through the leg furthest forward (min hip pitch),
            # contact the fastest forward swing (most negative hip velocity).
            for k, f in enumerate(peaks(hip, 3, 100)):
                poses.append(
                    pose(
                        f"kick-windup-{k + 1}",
                        path,
                        f,
                        Q[f],
                        q_xyzw_to_tilt_wxyz(R[f]),
                        f"{leg.lower()} leg drawn back before the kick",
                        leg,
                    )
                )
            for k, f in enumerate(peaks(-hip, 3, 100)):
                poses.append(
                    pose(
                        f"kick-follow-{k + 1}",
                        path,
                        f,
                        Q[f],
                        q_xyzw_to_tilt_wxyz(R[f]),
                        f"{leg.lower()} leg swung through after contact",
                        leg,
                    )
                )
            vel = np.gradient(hip)
            for k, f in enumerate(peaks(-vel, 3, 100)):
                poses.append(
                    pose(
                        f"kick-contact-{k + 1}",
                        path,
                        f,
                        Q[f],
                        q_xyzw_to_tilt_wxyz(R[f]),
                        f"{leg.lower()} foot swinging through the ball",
                        leg,
                    )
                )
            if SEQ:
                a, b, n = SEQ
                for k, f in enumerate(np.linspace(a, b, n).round().astype(int)):
                    poses.append(
                        pose(
                            f"kick-seq-{k + 1}",
                            path,
                            int(f),
                            Q[f],
                            q_xyzw_to_tilt_wxyz(R[f]),
                            f"kick sequence frame {k + 1} of {n}",
                            leg,
                        )
                    )
    else:
        rows = list(csv.DictReader(open(path)))
        Q = np.array([[float(r[n + ".q"]) for n in K1_ORDER] for r in rows])
        rp = np.array([[float(r["roll"]), float(r["pitch"])] for r in rows])
        shL, shR = Q[:, I["Left_Shoulder_Roll"]], Q[:, I["Right_Shoulder_Roll"]]
        armsout = -np.abs(shL) - np.abs(shR)  # shoulders rolled away from the body
        crouch = Q[:, I["Left_Knee_Pitch"]] + Q[:, I["Right_Knee_Pitch"]]
        lateral = np.abs(Q[:, I["Left_Hip_Roll"]]) + np.abs(Q[:, I["Right_Hip_Roll"]])
        for k, f in enumerate(peaks(armsout, 3, 60)):
            poses.append(
                pose(
                    f"keeper-arms-{k + 1}",
                    path,
                    f,
                    Q[f],
                    rpy_to_tilt_wxyz(*rp[f]),
                    "arms spread across the goal",
                )
            )
        for k, f in enumerate(peaks(crouch, 2, 60)):
            poses.append(
                pose(
                    f"keeper-crouch-{k + 1}",
                    path,
                    f,
                    Q[f],
                    rpy_to_tilt_wxyz(*rp[f]),
                    "low ready stance",
                )
            )
        for k, f in enumerate(peaks(lateral, 3, 60)):
            poses.append(
                pose(
                    f"keeper-step-{k + 1}",
                    path,
                    f,
                    Q[f],
                    rpy_to_tilt_wxyz(*rp[f]),
                    "stepping across the goal line",
                )
            )

out = {
    "joint_order_note": "joints keyed by MJCF joint name; ankle pitch/roll set directly, parallel drive joints ignored",
    "trunk_tilt_note": "wxyz quaternion of the trunk with yaw removed; the robot always faces +x",
    "poses": poses,
}
json.dump(out, open("tools/artwork/poses.json", "w"), indent=1)
print(len(poses), "poses ->", "tools/artwork/poses.json")
for p in poses:
    print(f"  {p['name']:18s} frame {p['frame']:4d}  {p['note']}")
