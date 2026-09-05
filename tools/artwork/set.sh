#!/bin/bash
# Renders the whIRLwind artwork set into src/assets/artwork, both grounds.
# usage: tools/artwork/set.sh [name ...]     (no names = whole set)
# Needs blender, python3 with numpy+Pillow, the booster_assets repo and Epic.blend (see render.py).
set -e
cd "$(dirname "$0")/../.."
OUT=src/assets/artwork; TMP=${TMPDIR:-/tmp}/ww-artwork; mkdir -p "$TMP" "$OUT"

# name | render.py arguments
SET=(
  "k1-body         | --mode body"
  "k1-head         | --mode head"
  "k1-kick-windup  | --mode pose --pose kick-windup-1  --view side    --ball auto"
  "k1-kick-contact | --mode pose --pose kick-contact-1 --view low     --ball auto --ball-blur away --ball-speed 0.25"
  "k1-kick-follow  | --mode pose --pose kick-follow-2  --view front34 --ball auto --ball-blur away --ball-speed 0.8"
  "k1-walk-stride  | --mode pose --pose walk-stride-1  --view front"
  "k1-walk-swing   | --mode pose --pose walk-swing-2   --view side"
  "k1-dribble      | --mode pose --pose walk-stride-3  --view high    --ball auto --ball-blur roll --ball-speed 0.6"
  "k1-keeper-arms  | --mode pose --pose keeper-arms-1  --view front   --ball auto --ball-blur incoming --ball-speed 1.2"
  "k1-keeper-crouch| --mode pose --pose keeper-crouch-1 --view low"
  "k1-keeper-step  | --mode pose --pose keeper-step-1  --view front34 --ball auto --ball-offset 0.1,-0.25,-0.3 --ball-blur incoming --ball-speed 0.6"
  "k1-fallen-front | --mode pose --pose keeper-arms-1  --fallen front --view front34"
  "k1-fallen-back  | --mode pose --pose walk-stride-1  --fallen back  --view side"
)

# The 3D logo is not a framed piece but the footer crest: a transparent cutout, cropped to the
# object, with white blades for the dark ground and indigo blades for paper (DESIGN.md, section 3).
if [ $# -eq 0 ] || printf '%s\n' "$@" | grep -qx "mark-3d"; then
  for pair in "dark:white" "light:indigo"; do
    ground=${pair%%:*}; blades=${pair#*:}
    blender -b --python tools/artwork/render.py -- --mode logo --blades $blades --size 2048x1152 --out "$TMP/mark-3d-$ground.png" 2>&1 | grep -E "RENDER DONE|Traceback|Error:" || true
    python3 tools/artwork/grain.py "$TMP/mark-3d-$ground.png" "$TMP/mark-3d-$ground-cut.png" none 1200
    python3 - "$TMP/mark-3d-$ground-cut.png" "$OUT/mark-3d-$ground.png" <<'PY'
import sys; from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA'); im.crop(im.getchannel('A').getbbox()).save(sys.argv[2], optimize=True); print('wrote', sys.argv[2])
PY
  done
  rm -f "$OUT/mark-3d-light.jpg" "$OUT/mark-3d-dark.jpg"
fi

for entry in "${SET[@]}"; do
  name=$(echo "${entry%%|*}" | xargs); args=${entry#*|}
  if [ $# -gt 0 ] && ! printf '%s\n' "$@" | grep -qx "$name"; then continue; fi
  blender -b --python tools/artwork/render.py -- $args --out "$TMP/$name.png" 2>&1 | grep -E "RENDER DONE|Traceback|Error:" || true
  for ground in light dark; do
    python3 tools/artwork/grain.py "$TMP/$name.png" "$OUT/$name-$ground.jpg" $ground
  done
  # and a transparent cutout cropped to the subject, for the openers (feet exactly on the rule)
  mkdir -p "$OUT/cut"
  python3 tools/artwork/grain.py "$TMP/$name.png" "$TMP/$name-cut.png" none 1200
  python3 - "$TMP/$name-cut.png" "$OUT/cut/$name.png" <<'PY'
import sys; from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA'); im.crop(im.getchannel('A').getbbox()).save(sys.argv[2], optimize=True); print('wrote', sys.argv[2])
PY
done
