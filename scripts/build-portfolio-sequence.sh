#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIDEO_DIR="$ROOT/public/portfolio-world/videos"
OUT_DIR="$ROOT/public/portfolio-world/frames/master"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# This order is taken from the uploaded 56 s master sequence: seven 8 s shots,
# start to finish. Keeping one canonical order prevents the browser from
# stitching unrelated camera moves at runtime.
CLIPS=(
  "stone-balcony-enter.mp4"
  "rustic-study-track.mp4"
  "study-window.mp4"
  "art-studio-enter.mp4"
  "art-studio-glide.mp4"
  "ancient-library-reverse.mp4"
  "library-dolly.mp4"
)

for clip in "${CLIPS[@]}"; do
  if [[ ! -f "$VIDEO_DIR/$clip" ]]; then
    echo "Missing source clip: $VIDEO_DIR/$clip" >&2
    exit 1
  fi
done

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required" >&2
  exit 1
fi

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

CONCAT_FILE="$TMP_DIR/concat.txt"
: > "$CONCAT_FILE"
for clip in "${CLIPS[@]}"; do
  printf "file '%s'\n" "$VIDEO_DIR/$clip" >> "$CONCAT_FILE"
done

# 10 fps is deliberate: the React renderer blends neighbouring frames and
# Lenis smooths scroll velocity, so we keep random access deterministic while
# avoiding hundreds of megabytes of 30 fps stills.
ffmpeg -hide_banner -loglevel error -y \
  -f concat -safe 0 -i "$CONCAT_FILE" \
  -an \
  -vf "fps=10,scale=1280:-2:flags=lanczos" \
  -c:v libwebp -quality 78 -compression_level 4 \
  "$OUT_DIR/frame-%04d.webp"

FRAME_COUNT="$(find "$OUT_DIR" -maxdepth 1 -type f -name 'frame-*.webp' | wc -l | tr -d ' ')"
if [[ "$FRAME_COUNT" -lt 550 ]]; then
  echo "Unexpectedly low frame count: $FRAME_COUNT" >&2
  exit 1
fi

cat > "$OUT_DIR/manifest.json" <<EOF
{
  "version": 1,
  "sourceDurationSeconds": 56,
  "sourceFps": 30,
  "sequenceFps": 10,
  "frameCount": $FRAME_COUNT,
  "width": 1280,
  "height": 720,
  "pattern": "/portfolio-world/frames/master/frame-%04d.webp",
  "segments": [
    { "index": 0, "label": "Arrival / balcony", "startFrame": 1,   "endFrame": 80,  "source": "stone-balcony-enter.mp4" },
    { "index": 1, "label": "Study passage",     "startFrame": 81,  "endFrame": 160, "source": "rustic-study-track.mp4" },
    { "index": 2, "label": "Study window",      "startFrame": 161, "endFrame": 240, "source": "study-window.mp4" },
    { "index": 3, "label": "Enter studio",      "startFrame": 241, "endFrame": 320, "source": "art-studio-enter.mp4" },
    { "index": 4, "label": "Creation studio",   "startFrame": 321, "endFrame": 400, "source": "art-studio-glide.mp4" },
    { "index": 5, "label": "Library passage",   "startFrame": 401, "endFrame": 480, "source": "ancient-library-reverse.mp4" },
    { "index": 6, "label": "Library to garden", "startFrame": 481, "endFrame": $FRAME_COUNT, "source": "library-dolly.mp4" }
  ]
}
EOF

echo "Built $FRAME_COUNT deterministic WebP frames in $OUT_DIR"
