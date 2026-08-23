#!/usr/bin/env python3
"""Build subtle living-world loops from the real cinematic master.

The important rule: do not synthesize generic water/mist. Instead, stabilize a short
piece of the actual source footage against a rest frame, crop only the scene region
we want to keep alive, and publish a feathered mask beside it. The browser then
composites those real pixels over the paused master while the camera is resting.
"""

from __future__ import annotations

import json
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "public/portfolio-world/master/master-scroll-1080p.mp4"
OUT = ROOT / "public/portfolio-world/ambient"
WORK = ROOT / ".ambient-build"
FRAME_W = 1920
FRAME_H = 1080


@dataclass(frozen=True)
class AmbientSpec:
    slug: str
    worlds: tuple[str, ...]
    kind: str
    ref_time: float
    start_time: float
    duration: float
    fps: int
    bbox: tuple[int, int, int, int]
    polygons: tuple[tuple[tuple[int, int], ...], ...]
    blend_seconds: float = 0.4
    opacity: float = 1.0


SPECS = (
    AmbientSpec(
        slug="01-river",
        worlds=("01",),
        kind="water",
        ref_time=0.0,
        start_time=0.0,
        duration=2.4,
        fps=20,
        bbox=(250, 420, 960, 890),
        polygons=(
            (
                (952, 430), (920, 442), (890, 455), (860, 474), (835, 496),
                (813, 520), (790, 548), (765, 578), (742, 607), (718, 636),
                (692, 664), (665, 690), (638, 713), (610, 734), (582, 752),
                (553, 769), (522, 787), (490, 806), (456, 824), (422, 841),
                (388, 856), (355, 869), (327, 876), (305, 875), (292, 864),
                (304, 846), (329, 836), (360, 822), (392, 806), (423, 790),
                (454, 773), (485, 753), (515, 733), (545, 712), (574, 688),
                (603, 662), (632, 634), (660, 606), (688, 578), (716, 550),
                (744, 525), (773, 503), (803, 485), (835, 470), (868, 458),
                (901, 448), (930, 438),
            ),
        ),
        blend_seconds=0.45,
    ),
    AmbientSpec(
        slug="06-studio-foliage",
        worlds=("06",),
        kind="foliage",
        ref_time=32.0,
        start_time=32.0,
        duration=2.2,
        fps=18,
        bbox=(120, 0, 590, 650),
        polygons=(
            (
                (170, 0), (390, 0), (425, 45), (420, 100), (405, 145),
                (438, 195), (430, 260), (405, 330), (392, 395), (370, 455),
                (352, 520), (330, 570), (295, 595), (245, 588), (218, 552),
                (225, 495), (232, 440), (228, 380), (216, 320), (205, 260),
                (184, 205), (170, 150), (160, 90),
            ),
        ),
        blend_seconds=0.5,
        opacity=0.82,
    ),
    AmbientSpec(
        slug="10-fountain-pool",
        worlds=("09", "10"),
        kind="water",
        ref_time=55.94,
        start_time=54.35,
        duration=1.55,
        fps=20,
        bbox=(0, 540, 960, 930),
        polygons=(
            (
                (0, 575), (72, 578), (125, 615), (150, 670), (155, 725),
                (172, 780), (190, 835), (180, 890), (118, 918), (45, 910),
                (0, 885),
            ),
            (
                (275, 812), (360, 804), (455, 805), (560, 810), (665, 807),
                (760, 800), (840, 800), (905, 812), (935, 830), (918, 855),
                (855, 875), (770, 885), (665, 892), (555, 895), (445, 892),
                (355, 885), (300, 868),
            ),
            (
                (418, 742), (452, 746), (482, 768), (495, 805), (490, 842),
                (466, 856), (440, 842), (430, 808),
            ),
        ),
        blend_seconds=0.35,
    ),
)


def read_frame(cap: cv2.VideoCapture, time_seconds: float) -> np.ndarray:
    cap.set(cv2.CAP_PROP_POS_MSEC, time_seconds * 1000)
    ok, frame = cap.read()
    if not ok:
        raise RuntimeError(f"Could not read frame at {time_seconds:.3f}s")
    return frame


def align_to_reference(
    frame: np.ndarray,
    ref: np.ndarray,
    ref_keypoints,
    ref_descriptors,
    orb,
    matcher,
) -> np.ndarray:
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    keypoints, descriptors = orb.detectAndCompute(gray, None)
    if descriptors is None or ref_descriptors is None:
        return frame

    pairs = matcher.knnMatch(descriptors, ref_descriptors, k=2)
    good = [
        first
        for pair in pairs
        if len(pair) == 2
        for first, second in [pair]
        if first.distance < 0.72 * second.distance
    ]
    if len(good) < 40:
        return frame

    source = np.float32([keypoints[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    target = np.float32([ref_keypoints[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
    matrix, _ = cv2.findHomography(source, target, cv2.RANSAC, 2.5)
    if matrix is None:
        return frame

    return cv2.warpPerspective(
        frame,
        matrix,
        (ref.shape[1], ref.shape[0]),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_REFLECT,
    )


def build_mask(spec: AmbientSpec, shape: tuple[int, int]) -> np.ndarray:
    mask = np.zeros(shape, np.uint8)
    for polygon in spec.polygons:
        points = np.asarray(polygon, dtype=np.int32)
        cv2.fillPoly(mask, [points], 255)
    return cv2.GaussianBlur(mask, (0, 0), sigmaX=3.2, sigmaY=3.2)


def crossfade_tail(frames: list[np.ndarray], frame_count: int) -> None:
    count = min(frame_count, max(0, len(frames) // 3))
    for index in range(count):
        tail_index = len(frames) - count + index
        alpha = (index + 1) / (count + 1)
        frames[tail_index] = cv2.addWeighted(
            frames[tail_index], 1 - alpha, frames[index], alpha, 0
        )


def encode_loop(frames: list[np.ndarray], fps: int, destination: Path) -> None:
    sequence = WORK / destination.stem
    sequence.mkdir(parents=True, exist_ok=True)
    for index, frame in enumerate(frames):
        cv2.imwrite(
            str(sequence / f"{index:04d}.jpg"),
            frame,
            [cv2.IMWRITE_JPEG_QUALITY, 93],
        )

    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-framerate", str(fps),
            "-i", str(sequence / "%04d.jpg"),
            "-an",
            "-c:v", "libx264",
            "-preset", "slow",
            "-crf", "20",
            "-pix_fmt", "yuv420p",
            "-profile:v", "high",
            "-g", str(fps),
            "-keyint_min", str(fps),
            "-sc_threshold", "0",
            "-movflags", "+faststart",
            str(destination),
        ],
        check=True,
    )


def build_spec(spec: AmbientSpec) -> dict:
    print(f"building {spec.slug}")
    cap = cv2.VideoCapture(str(MASTER))
    reference = read_frame(cap, spec.ref_time)

    gray_reference = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)
    orb = cv2.ORB_create(nfeatures=8000, fastThreshold=8)
    ref_keypoints, ref_descriptors = orb.detectAndCompute(gray_reference, None)
    matcher = cv2.BFMatcher(cv2.NORM_HAMMING)

    x1, y1, x2, y2 = spec.bbox
    frames: list[np.ndarray] = []
    frame_total = max(1, int(round(spec.duration * spec.fps)))
    for index in range(frame_total):
        time_seconds = spec.start_time + index / spec.fps
        frame = read_frame(cap, time_seconds)
        stabilized = align_to_reference(
            frame,
            reference,
            ref_keypoints,
            ref_descriptors,
            orb,
            matcher,
        )
        frames.append(stabilized[y1:y2, x1:x2])
    cap.release()

    crossfade_tail(frames, int(round(spec.blend_seconds * spec.fps)))

    mask = build_mask(spec, reference.shape[:2])
    cropped_mask = mask[y1:y2, x1:x2]

    video_path = OUT / f"{spec.slug}.mp4"
    mask_path = OUT / f"{spec.slug}-mask.png"
    encode_loop(frames, spec.fps, video_path)
    cv2.imwrite(str(mask_path), cropped_mask)

    return {
        "id": spec.slug,
        "worlds": list(spec.worlds),
        "kind": spec.kind,
        "src": f"/portfolio-world/ambient/{spec.slug}.mp4",
        "mask": f"/portfolio-world/ambient/{spec.slug}-mask.png",
        "anchorTime": spec.ref_time,
        "opacity": spec.opacity,
        "box": {
            "x": x1 / FRAME_W,
            "y": y1 / FRAME_H,
            "width": (x2 - x1) / FRAME_W,
            "height": (y2 - y1) / FRAME_H,
        },
    }


def main() -> None:
    if not MASTER.exists():
        raise SystemExit(f"Missing master video: {MASTER}")

    shutil.rmtree(WORK, ignore_errors=True)
    WORK.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    manifest = {
        "version": 1,
        "frame": {"width": FRAME_W, "height": FRAME_H},
        "principle": "stabilized real source pixels, never generic ambient overlays",
        "regions": [build_spec(spec) for spec in SPECS],
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    shutil.rmtree(WORK, ignore_errors=True)
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
