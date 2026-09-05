"""
whIRLwind artwork renderer.

Builds the Booster K1 from its MuJoCo model (or the swirl mark from mark.svg), poses it
from tools/artwork/poses.json, shades it with the brand ramp (indigo -> orange -> paper),
optionally adds the match ball from a .blend, and renders with Eevee on a transparent
film. grain.py then composites the render onto the page colour and adds the grain.

  blender -b --python tools/artwork/render.py -- --mode pose --pose kick-contact-1 --ball auto --out k1.png
  blender -b --python tools/artwork/render.py -- --mode head --out head.png
  blender -b --python tools/artwork/render.py -- --mode logo --out mark.png
  blender -b --python tools/artwork/render.py -- --mode contact --contact-dir /tmp/contact   # every pose, small
  python tools/artwork/grain.py k1.png src/assets/artwork/k1-kick-light.jpg light

Needs the booster_assets repo (BOOSTER_ASSETS, default ~/repos/booster_assets) and, for the
ball, a .blend containing an object named Ball (--epic, default ~/Documents/Epic.blend).
See DESIGN.md, section "Artwork", for where the results may be used.
"""

import bpy, sys, os, math, json, argparse, xml.etree.ElementTree as ET
from mathutils import Vector, Quaternion, Matrix

HERE = os.path.dirname(os.path.abspath(__file__))
ARGV = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--out", default="render.png")
ap.add_argument(
    "--mode", default="pose", choices=["pose", "body", "head", "logo", "contact", "seq"]
)
ap.add_argument(
    "--fallen",
    default="none",
    choices=["none", "front", "back", "left", "right"],
    help="pose mode: tip the whole robot over onto the floor (the joint angles stay those of the recording)",
)
ap.add_argument(
    "--blades",
    default="white",
    choices=["white", "indigo"],
    help="logo mode: colour of the non-orange blades (white for the dark ground, indigo for paper)",
)
ap.add_argument(
    "--seq-prefix",
    default="kick-seq",
    help="seq mode: poses whose name starts with this, in order",
)
ap.add_argument("--seq-dir", default="")
ap.add_argument(
    "--fixed-dist",
    type=float,
    default=0,
    help="pose mode: camera at this distance from the robot centre instead of auto framing, so several renders share one scale",
)
ap.add_argument("--pose", default="default")
ap.add_argument("--poses", default=os.path.join(HERE, "poses.json"))
ap.add_argument(
    "--ball",
    default="none",
    help="none | auto | x,y,z (metres, robot faces +x, floor at z=0)",
)
ap.add_argument(
    "--ball-offset", default="0,0,0", help="dx,dy,dz added to the auto placement"
)
ap.add_argument(
    "--ball-blur",
    default="none",
    help="none | away | incoming | roll  (motion blur on the ball, with spin)",
)
ap.add_argument(
    "--ball-speed", type=float, default=1.0, help="blur strength multiplier"
)
ap.add_argument(
    "--view",
    default="front34",
    choices=["front34", "front", "side", "low", "back34", "high"],
)
ap.add_argument("--lens", type=float, default=0)
ap.add_argument("--size", default="2048x1152")
ap.add_argument("--samples", type=int, default=64)
ap.add_argument("--epic", default=os.path.expanduser("~/Documents/Epic.blend"))
ap.add_argument("--contact-dir", default="")
ap.add_argument(
    "--only", default="", help="contact mode: only poses whose name contains this"
)
A = ap.parse_args(ARGV)

BOOSTER = os.environ.get("BOOSTER_ASSETS", os.path.expanduser("~/repos/booster_assets"))
XML = os.path.join(BOOSTER, "robots/K1/K1_22dof_parallel.xml")
MESHDIR = os.path.join(BOOSTER, "robots/K1/meshes/")

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


# ---------------------------------------------------------------- colours
def hexc(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)


def lin(c):
    return tuple(
        (v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4) if i < 3 else v
        for i, v in enumerate(c)
    )


INDIGO = lin(hexc("#2c3086"))
ORANGE = lin(hexc("#f26722"))
PAPER = lin(hexc("#faf9f6"))
INK2 = lin(hexc("#aeabc6"))


def ramp_material(name, stops, texture_image=None):
    """Diffuse shading -> (optional texture luminance) -> colour ramp -> emission."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    emis = nt.nodes.new("ShaderNodeEmission")
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    s2r = nt.nodes.new("ShaderNodeShaderToRGB")
    diff = nt.nodes.new("ShaderNodeBsdfDiffuse")
    diff.inputs["Color"].default_value = (1, 1, 1, 1)
    nt.links.new(diff.outputs[0], s2r.inputs[0])
    src = s2r.outputs["Color"]
    if texture_image is not None:
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = texture_image
        bw = nt.nodes.new("ShaderNodeRGBToBW")
        nt.links.new(tex.outputs["Color"], bw.inputs[0])
        # panel pattern darkens the shading a little: fac = shade * (0.55 + 0.45*lum)
        mr = nt.nodes.new("ShaderNodeMath")
        mr.operation = "MULTIPLY_ADD"
        mr.inputs[1].default_value = 0.45
        mr.inputs[2].default_value = 0.55
        nt.links.new(bw.outputs[0], mr.inputs[0])
        mul = nt.nodes.new("ShaderNodeMath")
        mul.operation = "MULTIPLY"
        nt.links.new(src, mul.inputs[0])
        nt.links.new(mr.outputs[0], mul.inputs[1])
        src = mul.outputs[0]
    nt.links.new(src, ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], emis.inputs["Color"])
    nt.links.new(emis.outputs[0], out.inputs[0])
    cr = ramp.color_ramp
    cr.interpolation = "EASE"
    cr.elements[0].position = stops[0][0]
    cr.elements[0].color = stops[0][1]
    cr.elements[1].position = stops[-1][0]
    cr.elements[1].color = stops[-1][1]
    for pos, col in stops[1:-1]:
        e = cr.elements.new(pos)
        e.color = col
    return m


def mix(a, b, t):
    return tuple(a[i] * (1 - t) + b[i] * t for i in range(3)) + (1.0,)


BLACK = (0.0, 0.0, 0.0, 1.0)
HOT = [(0.0, INDIGO), (0.28, INDIGO), (0.62, ORANGE), (0.9, PAPER)]
WHITE = [(0.0, INDIGO), (0.22, INDIGO), (0.4, INK2), (0.6, PAPER), (1.0, PAPER)]
# indigo blades for the paper ground: deep indigo in shadow, the brand indigo in the light, a touch of paper at the highlight
BLUE = [
    (0.0, mix(INDIGO, BLACK, 0.6)),
    (0.22, mix(INDIGO, BLACK, 0.6)),
    (0.5, INDIGO),
    (0.85, mix(INDIGO, PAPER, 0.35)),
    (1.0, mix(INDIGO, PAPER, 0.5)),
]
mat_hot = ramp_material("ramp", HOT)
mat_white = ramp_material("ramp-white", WHITE)
mat_blue = ramp_material("ramp-blue", BLUE)


# ---------------------------------------------------------------- robot
class Body:
    def __init__(self, el, parent):
        self.el = el
        self.parent = parent
        self.children = []
        self.pos = Vector([float(v) for v in el.get("pos", "0 0 0").split()])
        w, x, y, z = [float(v) for v in el.get("quat", "1 0 0 0").split()]
        self.quat = Quaternion((w, x, y, z))
        self.joints = [
            (
                j.get("name"),
                Vector([float(v) for v in j.get("axis", "0 0 1").split()]),
                Vector([float(v) for v in j.get("pos", "0 0 0").split()]),
            )
            for j in el.findall("joint")
            if j.get("type") != "free"
        ]
        self.geoms = []  # (object, local matrix)
        self.world = Matrix.Identity(4)


bodies = []
objs = []


def import_stl(path):
    before = set(bpy.data.objects)
    bpy.ops.wm.stl_import(filepath=path)
    new = [o for o in bpy.data.objects if o not in before]
    return new[0] if new else None


def build(el, parent):
    b = Body(el, parent)
    bodies.append(b)
    if parent:
        parent.children.append(b)
    for g in el.findall("geom"):
        if g.get("type") != "mesh" or g.get("group") != "1":
            continue
        o = import_stl(os.path.join(MESHDIR, g.get("mesh") + ".STL"))
        if not o:
            continue
        o.name = g.get("mesh")
        objs.append(o)
        gp = Vector([float(v) for v in g.get("pos", "0 0 0").split()])
        w, x, y, z = [float(v) for v in g.get("quat", "1 0 0 0").split()]
        b.geoms.append(
            (o, Matrix.Translation(gp) @ Quaternion((w, x, y, z)).to_matrix().to_4x4())
        )
    for c in el.findall("body"):
        build(c, b)
    return b


def apply_pose(joints, tilt_wxyz):
    root = bodies[0]
    for b in bodies:
        if b.parent is None:
            m = (
                Quaternion(tilt_wxyz).to_matrix().to_4x4()
            )  # trunk at origin, yaw removed, facing +x
        else:
            m = b.parent.world @ Matrix.Translation(b.pos) @ b.quat.to_matrix().to_4x4()
        for name, axis, jp in b.joints:
            a = joints.get(name)
            if a:
                m = (
                    m
                    @ Matrix.Translation(jp)
                    @ Matrix.Rotation(a, 4, axis)
                    @ Matrix.Translation(-jp)
                )
        b.world = m
        for o, gm in b.geoms:
            o.matrix_world = m @ gm
    bpy.context.view_layer.update()
    # floor: lowest point of any part sits at z = 0
    zmin = min((o.matrix_world @ Vector(c)).z for o in objs for c in o.bound_box)
    for o in objs:
        o.matrix_world = Matrix.Translation((0, 0, -zmin)) @ o.matrix_world
    bpy.context.view_layer.update()


def bbox(things):
    lo = Vector((1e9,) * 3)
    hi = Vector((-1e9,) * 3)
    for o in things:
        for c in o.bound_box:
            w = o.matrix_world @ Vector(c)
            lo = Vector(map(min, lo, w))
            hi = Vector(map(max, hi, w))
    return lo, hi


DEFAULT_POSE = {
    "left_shoulder_roll_joint": -1.35,
    "right_shoulder_roll_joint": 1.35,
    "aaleft_shoulder_pitch_joint": 0.25,
    "aaright_shoulder_pitch_joint": 0.25,
    "left_elbow_pitch_joint": -0.5,
    "right_elbow_pitch_joint": -0.5,
    "left_elbow_yaw_joint": -0.3,
    "right_elbow_yaw_joint": 0.3,
    "left_hip_pitch_joint": -0.25,
    "right_hip_pitch_joint": -0.25,
    "left_knee_pitch_joint": 0.5,
    "right_knee_pitch_joint": 0.5,
    "left_ankle_pitch_joint": -0.25,
    "right_ankle_pitch_joint": -0.25,
    "aahead_pitch_joint": 0.35,
}

POSES = {
    "default": {
        "joints": DEFAULT_POSE,
        "trunk_tilt_wxyz": [1, 0, 0, 0],
        "note": "hand pose",
    }
}
if os.path.exists(A.poses):
    for p in json.load(open(A.poses))["poses"]:
        POSES[p["name"]] = p

# ---------------------------------------------------------------- ball
ball = None


def get_ball():
    global ball
    if ball:
        return ball
    bpy.ops.wm.append(
        filepath=os.path.join(A.epic, "Object", "Ball"),
        directory=os.path.join(A.epic, "Object") + os.sep,
        filename="Ball",
    )
    ball = bpy.data.objects.get("Ball")
    if not ball:
        print("NO BALL in", A.epic)
        return None
    img = None
    for m in ball.data.materials:
        if m and m.use_nodes:
            for n in m.node_tree.nodes:
                if n.type == "TEX_IMAGE" and n.image and "bsm" in n.image.name:
                    img = n.image
    ball.data.materials.clear()
    ball.data.materials.append(ramp_material("ramp-ball", HOT, img))
    # the ball in the source file may be animated, parented or constrained; we drive it directly
    print(
        "BALL anim",
        ball.animation_data is not None,
        "parent",
        ball.parent,
        "constraints",
        len(ball.constraints),
        "modifiers",
        [m.type for m in ball.modifiers],
    )
    ball.animation_data_clear()
    ball.parent = None
    ball.constraints.clear()
    ball.scale = (1, 1, 1)
    ball.rotation_mode = "XYZ"
    return ball


def intersects(b, o, margin=0.02):
    lo1, hi1 = bbox([b])
    lo2, hi2 = bbox([o])
    return all(lo1[i] - margin < hi2[i] and hi1[i] + margin > lo2[i] for i in range(3))


def place_ball(spec, pose_name, pose=None):
    b = get_ball()
    if not b:
        return None
    r = 0.094
    dx, dy, dz = [float(v) for v in A.ball_offset.split(",")]
    if spec == "auto":
        feet = {o.name: o for o in objs if o.name in ("Left_Foot", "Right_Foot")}
        kick = feet.get((pose or {}).get("kick_foot", "Right_Foot"))
        support = [o for o in feet.values() if o is not kick][0]
        klo, khi = bbox([kick])
        slo, shi = bbox([support])
        ky = (klo.y + khi.y) / 2
        sy = (slo.y + shi.y) / 2
        if (
            "kick-windup" in pose_name
        ):  # ball waiting just ahead of the standing foot, in the kick leg's line
            loc = Vector((shi.x + r + 0.04, ky, r))
        elif "kick-contact" in pose_name:  # ball on the toe of the swinging boot
            loc = Vector((khi.x + r * 1.05, ky, max(r, (klo.z + khi.z) / 2 + 0.01)))
        elif "kick-follow" in pose_name:  # ball away and rising
            loc = Vector((khi.x + 0.62, ky * 0.7, r + 0.30))
        elif (
            "keeper" in pose_name
        ):  # shot arriving, off the keeper's shoulder on the camera side
            front = max(khi.x, shi.x)
            loc = Vector((front + 0.55, -0.52, 0.62))
        else:  # at the feet, just outside the leading boot
            lead = kick if khi.x > shi.x else support
            llo, lhi = bbox([lead])
            ly = (llo.y + lhi.y) / 2
            loc = Vector((lhi.x + r + 0.02, ly - 0.06 if ly < 0 else ly + 0.06, r))
        loc += Vector((dx, dy, dz))
        b.location = loc
        bpy.context.view_layer.update()
        # never inside the robot: nudge forward until the ball clears every part
        for _ in range(40):
            hit = [o for o in objs if intersects(b, o)]
            if not hit:
                break
            b.location.x += 0.015
            bpy.context.view_layer.update()
        if b.location.z < r:
            b.location.z = r
        b.rotation_euler = (0.4, 0.2, 1.1)
    else:
        x, y, z = [float(v) for v in spec.split(",")]
        b.location = (x + dx, y + dy, z + dz)
    bpy.context.view_layer.update()
    if A.ball_blur != "none":
        # motion blur: keyframe the ball across one frame; Eevee blurs it along that path
        v = {
            "away": Vector((0.55, 0.05, 0.22)),
            "incoming": Vector((-0.6, 0.12, -0.12)),
            "roll": Vector((0.3, 0, 0)),
        }[A.ball_blur] * A.ball_speed
        spin = 0.9 * A.ball_speed
        scene.frame_start = 1
        scene.frame_end = 3
        scene.frame_set(2)
        b.animation_data_clear()
        try:
            bpy.context.preferences.edit.keyframe_new_interpolation_type = "LINEAR"
        except Exception:
            pass
        p0 = Vector(b.location)
        rot = Vector(b.rotation_euler)
        for f, k in ((1, -1), (2, 0), (3, 1)):
            b.location = p0 + v * k * 0.5
            b.rotation_euler = (
                rot.x + spin * k * 0.5 * 0.3,
                rot.y + spin * k * 0.5,
                rot.z,
            )
            b.keyframe_insert("location", frame=f)
            b.keyframe_insert("rotation_euler", frame=f)
        scene.frame_set(2)
        scene.render.use_motion_blur = True
        scene.render.motion_blur_shutter = 0.5
        try:
            scene.eevee.motion_blur_steps = 4
        except Exception:
            pass
    print(
        "BALL at",
        tuple(round(v, 3) for v in b.matrix_world.translation),
        "blur",
        A.ball_blur,
        "for",
        pose_name,
    )
    return b


# ---------------------------------------------------------------- lights & camera
def add_light(name, loc, energy, size, look_at):
    ld = bpy.data.lights.new(name, "AREA")
    ld.energy = energy
    ld.size = size
    lo_ = bpy.data.objects.new(name, ld)
    scene.collection.objects.link(lo_)
    lo_.location = loc
    lo_.rotation_euler = (
        (look_at - Vector(loc)).normalized().to_track_quat("-Z", "Y").to_euler()
    )
    return lo_


cam_d = bpy.data.cameras.new("cam")
cam = bpy.data.objects.new("cam", cam_d)
scene.collection.objects.link(cam)
scene.camera = cam
cam_d.dof.use_dof = True
cam_d.sensor_width = 36


def frame(things, view, lens, fstop, margin=1.22):
    lo, hi = bbox(things)
    center = (lo + hi) / 2
    size = hi - lo
    W, H = [int(v) for v in A.size.split("x")]
    cam_d.lens = lens
    fov_h = 2 * math.atan(18 / lens)
    fov_v = 2 * math.atan(math.tan(fov_h / 2) * H / W)
    dirs = {
        "front34": Vector((0.85, -0.7, 0.18)),
        "front": Vector((1, -0.15, 0.15)),
        "side": Vector((0.05, -1, 0.12)),
        "low": Vector((0.9, -0.6, -0.05)),
        "back34": Vector((-0.8, -0.75, 0.2)),
        "high": Vector((0.7, -0.6, 0.75)),
    }
    d = dirs[view].normalized()
    # distance so the bbox's largest extents fit (rough: use its diagonal footprint)
    ext_v = size.z
    ext_h = max(size.x, size.y) * 0.8 + size.length * 0.2
    dist = (
        max(ext_v / (2 * math.tan(fov_v / 2)), ext_h / (2 * math.tan(fov_h / 2)))
        * margin
        + size.length * 0.15
    )
    target = center
    if view == "low":
        target = center + Vector((0, 0, -size.z * 0.15))
    loc = target + d * dist
    if view == "low":
        loc.z = max(loc.z, 0.12)
    cam.location = loc
    cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
    cam_d.dof.focus_distance = (target - loc).length
    cam_d.dof.aperture_fstop = fstop
    s = max(size.z, 0.5)
    add_light("key", target + Vector((1.6, -1.3, 1.7)) * s, 75 * s * s, 1.5 * s, target)
    add_light(
        "fill", target + Vector((-2.0, -0.5, 0.4)) * s, 12 * s * s, 3.0 * s, target
    )
    add_light("rim", target + Vector((-1.0, 1.6, 1.2)) * s, 60 * s * s, 1.0 * s, target)


# ---------------------------------------------------------------- scene setup per mode
if A.mode in ("pose", "body", "head", "contact", "seq"):
    root = ET.parse(XML).getroot().find("worldbody")
    for b in root.findall("body"):
        build(b, None)
    for o in objs:
        o.data.polygons.foreach_set("use_smooth", [True] * len(o.data.polygons))
        o.data.update()
        o.data.materials.clear()
        o.data.materials.append(mat_hot)
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
    except Exception as e:
        print("smooth-by-angle failed", e)
    print("IMPORTED", len(objs), "meshes")
else:
    import addon_utils

    addon_utils.enable("io_curve_svg", default_set=False)
    before = set(bpy.data.objects)
    bpy.ops.import_curve.svg(filepath=os.path.join(HERE, "mark.svg"))
    curves = [o for o in bpy.data.objects if o not in before and o.type == "CURVE"]
    for o in curves:
        # the SVG importer (Blender 4/5) gives each fill a plain diffuse material; its colour is in diffuse_color
        c = (0.5, 0.5, 0.5)
        for m in o.data.materials:
            if not m:
                continue
            c = tuple(m.diffuse_color[:3])
            if m.use_nodes:
                for n in m.node_tree.nodes:
                    if n.type == "BSDF_PRINCIPLED":
                        c = tuple(n.inputs["Base Color"].default_value[:3])
        orange = c[0] > 0.5 and c[2] < 0.3
        o.scale = (22, 22, 22)
        o.data.extrude = 0.0035
        o.data.bevel_depth = 0.0006
        o.data.bevel_resolution = 4
        o.data.fill_mode = "BOTH"
        o.data.materials.clear()
        o.data.materials.append(
            mat_hot if orange else (mat_blue if A.blades == "indigo" else mat_white)
        )
        objs.append(o)
    bpy.context.view_layer.update()

scene.world = bpy.data.worlds.new("w")
scene.world.use_nodes = True
bg = scene.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0, 0, 0, 1)
bg.inputs[1].default_value = 0.0
scene.render.film_transparent = True
scene.render.engine = "BLENDER_EEVEE"
W, H = [int(v) for v in A.size.split("x")]
scene.render.resolution_x = W
scene.render.resolution_y = H
scene.render.resolution_percentage = 100
scene.eevee.taa_render_samples = A.samples
scene.view_settings.view_transform = "Standard"
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_depth = "16"
scene.render.image_settings.color_mode = "RGBA"


def clear_lights():
    for o in [o for o in scene.objects if o.type == "LIGHT"]:
        bpy.data.objects.remove(o, do_unlink=True)


def render(path):
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print("RENDER DONE", path)


if A.mode == "seq":
    os.makedirs(A.seq_dir, exist_ok=True)
    names = [n for n in POSES if n.startswith(A.seq_prefix)]
    names.sort(key=lambda n: int(n.rsplit("-", 1)[1]))
    r = 0.094
    # frame the camera once, on the widest pose (largest x extent) so nothing leaves the frame
    widest = None
    wext = -1
    for n in names:
        apply_pose(POSES[n]["joints"], POSES[n]["trunk_tilt_wxyz"])
        lo, hi = bbox(objs)
        if hi.x - lo.x > wext:
            wext = hi.x - lo.x
            widest = n
    apply_pose(POSES[widest]["joints"], POSES[widest]["trunk_tilt_wxyz"])
    # ball waits ahead of the support foot of the first frame
    first = POSES[names[0]]
    apply_pose(first["joints"], first["trunk_tilt_wxyz"])
    feet = {o.name: o for o in objs if o.name in ("Left_Foot", "Right_Foot")}
    kick = feet[first.get("kick_foot", "Right_Foot")]
    support = [o for o in feet.values() if o is not kick][0]
    slo, shi = bbox([support])
    klo, khi = bbox([kick])
    ky = (klo.y + khi.y) / 2
    ball_pos = Vector((shi.x + r + 0.18, ky, r))
    struck_at = None
    b = get_ball()
    b.location = ball_pos
    apply_pose(POSES[widest]["joints"], POSES[widest]["trunk_tilt_wxyz"])
    # a stand-in object at the ball's furthest flight point keeps it in frame
    things = list(objs) + [b]
    save = Vector(b.location)
    b.location = ball_pos + Vector((1.1, 0, 0.35))
    things.append(b)
    frame(things, A.view, A.lens or 50, 4.0)
    b.location = save
    for i, n in enumerate(names):
        p = POSES[n]
        apply_pose(p["joints"], p["trunk_tilt_wxyz"])
        klo, khi = bbox([kick])
        if struck_at is None and khi.x >= ball_pos.x - r * 0.9:
            struck_at = i
        if struck_at is None:
            b.location = ball_pos
            b.rotation_euler = (0.4, 0.2, 1.1)
        else:
            k = i - struck_at
            t = k / max(1, len(names) - struck_at - 1)
            b.location = ball_pos + Vector(
                (1.1 * t, 0.05 * t, 0.5 * t * (1 - t) * 1.4 + 0.02 * t)
            )
            b.rotation_euler = (0.4 + k * 0.7, 0.2, 1.1)
        render(os.path.join(A.seq_dir, f"{n}.png"))
elif A.mode == "contact":
    os.makedirs(A.contact_dir, exist_ok=True)
    for name, p in POSES.items():
        if A.only and A.only not in name:
            continue
        apply_pose(p["joints"], p["trunk_tilt_wxyz"])
        things = list(objs)
        if "kick" in name or "keeper" in name:
            b = place_ball("auto", name, p)
            things.append(b)
        elif ball:
            ball.location = (0, 0, -5)
        clear_lights()
        frame(things, A.view, A.lens or 50, 4.0)
        render(os.path.join(A.contact_dir, name + ".png"))
elif A.mode in ("pose", "body"):
    p = POSES[A.pose if A.mode == "pose" else "default"]
    tilt = Quaternion(p["trunk_tilt_wxyz"])
    if A.fallen != "none":
        # a fallen robot: the recorded pose, rotated onto the floor (apply_pose then rests its lowest point on z = 0)
        axis, ang = {
            "front": ("Y", 82),
            "back": ("Y", -84),
            "left": ("X", -86),
            "right": ("X", 86),
        }[A.fallen]
        tilt = (
            Quaternion(
                Vector((0, 1, 0)) if axis == "Y" else Vector((1, 0, 0)),
                math.radians(ang),
            )
            @ tilt
        )
    apply_pose(p["joints"], tilt)
    things = list(objs)
    if A.ball != "none":
        b = place_ball(A.ball, A.pose, p)
        things.append(b)
    if A.fixed_dist:
        # same distance and lens for every render: the robots come out at one scale
        lo, hi = bbox(objs)
        target = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, 0.5))
        dirs = {
            "front34": Vector((0.85, -0.7, 0.18)),
            "front": Vector((1, -0.15, 0.15)),
            "side": Vector((0.05, -1, 0.12)),
            "low": Vector((0.9, -0.6, -0.05)),
            "back34": Vector((-0.8, -0.75, 0.2)),
            "high": Vector((0.7, -0.6, 0.75)),
        }
        loc = target + dirs[A.view].normalized() * A.fixed_dist
        cam_d.lens = A.lens or 50
        cam.location = loc
        cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
        cam_d.dof.focus_distance = (target - loc).length
        cam_d.dof.aperture_fstop = 4.0
        add_light("key", target + Vector((1.6, -1.3, 1.7)), 75, 1.5, target)
        add_light("fill", target + Vector((-2.0, -0.5, 0.4)), 12, 3.0, target)
        add_light("rim", target + Vector((-1.0, 1.6, 1.2)), 60, 1.0, target)
    else:
        frame(things, A.view, A.lens or 50, 4.0)
    render(A.out)
elif A.mode == "head":
    p = dict(POSES["default"])
    j = dict(p["joints"])
    j["aahead_pitch_joint"] = 0.12
    apply_pose(j, p["trunk_tilt_wxyz"])
    lo, hi = bbox(objs)
    target = Vector(((lo.x + hi.x) / 2 + 0.02, (lo.y + hi.y) / 2, hi.z - 0.09))
    loc = target + Vector((0.60, -0.30, 0.04))
    cam.location = loc
    cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
    cam_d.lens = A.lens or 85
    cam_d.dof.focus_distance = (target - loc).length
    cam_d.dof.aperture_fstop = 2.8
    add_light("key", target + Vector((0.7, -0.5, 0.55)), 10.5, 0.8, target)
    add_light("fill", target + Vector((0.3, 0.9, 0.1)), 2.5, 2.0, target)
    add_light("rim", target + Vector((-0.6, 0.5, 0.6)), 8, 0.6, target)
    render(A.out)
else:  # logo
    lo, hi = bbox(objs)
    d = max(hi.x - lo.x, hi.y - lo.y)
    # frame the swirl's circle, not the whole mark: the two small triangles sit outside it on the left
    swirl = [o for o in objs if max((bbox([o])[1] - bbox([o])[0])[:2]) > 0.3 * d]
    lo, hi = bbox(swirl)
    target = (lo + hi) / 2
    d = max(hi.x - lo.x, hi.y - lo.y)
    loc = target + Vector((d * 0.9, -d * 1.5, d * 1.3))
    cam.location = loc
    cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
    cam_d.lens = A.lens or 55
    cam_d.dof.focus_distance = (target - loc).length
    cam_d.dof.aperture_fstop = 1.8
    add_light(
        "key", target + Vector((d * 1.4, -d * 0.7, d * 0.45)), 16, d * 0.9, target
    )
    add_light(
        "fill", target + Vector((-d * 1.2, -d * 0.3, d * 0.4)), 4, d * 2.5, target
    )
    add_light("rim", target + Vector((-d * 0.5, d * 1.2, d * 0.6)), 22, d * 0.8, target)
    render(A.out)
