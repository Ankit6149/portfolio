#!/usr/bin/env python3
"""Build small living-region loops from the real cinematic master.

The output is deliberately not procedural water/mist. Each region is a stabilized crop
of the master video, revealed by a hand-audited scene mask and looped softly around a
fixed rest-state frame.
"""

import json
import shutil
import subprocess
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public/portfolio-world/master/master-scroll-1080p.mp4"
OUT = ROOT / "public/portfolio-world/ambient"
WORK = ROOT / ".ambient-build"
W, H = 1920, 1080

SPECS = [
    dict(slug="01-river", worlds=["01"], kind="water", ref=0.0, start=0.0, dur=2.4, fps=20,
         bbox=(250,420,960,890), blend=.45, opacity=1.0,
         polys=[[(952,430),(920,442),(890,455),(860,474),(835,496),(813,520),(790,548),(765,578),(742,607),(718,636),(692,664),(665,690),(638,713),(610,734),(582,752),(553,769),(522,787),(490,806),(456,824),(422,841),(388,856),(355,869),(327,876),(305,875),(292,864),(304,846),(329,836),(360,822),(392,806),(423,790),(454,773),(485,753),(515,733),(545,712),(574,688),(603,662),(632,634),(660,606),(688,578),(716,550),(744,525),(773,503),(803,485),(835,470),(868,458),(901,448),(930,438)]]),
    dict(slug="03-threshold-river", worlds=["03"], kind="water", ref=8.0, start=8.0, dur=1.8, fps=18,
         bbox=(520,550,770,800), blend=.40, opacity=.92,
         polys=[[(715,570),(690,580),(670,595),(650,615),(630,640),(610,665),(590,695),(570,725),(550,755),(560,775),(590,785),(625,775),(650,755),(675,730),(700,700),(720,665),(735,630),(740,600),(730,580)]]),
    dict(slug="04-study-river", worlds=["04"], kind="water", ref=16.0, start=16.0, dur=1.8, fps=18,
         bbox=(1260,515,1490,735), blend=.40, opacity=.92,
         polys=[[(1450,535),(1428,545),(1410,560),(1392,580),(1374,602),(1355,625),(1338,650),(1320,675),(1300,700),(1310,720),(1340,720),(1370,705),(1395,685),(1415,660),(1435,630),(1450,600),(1460,570)]]),
    dict(slug="05-passage-stream", worlds=["05"], kind="water", ref=24.0, start=24.0, dur=1.9, fps=20,
         bbox=(1190,545,1565,1080), blend=.42, opacity=.96,
         polys=[[(1525,565),(1512,596),(1498,628),(1482,659),(1465,692),(1448,726),(1428,761),(1407,797),(1385,833),(1362,870),(1340,908),(1318,948),(1298,988),(1278,1030),(1260,1080),(1330,1080),(1345,1045),(1364,1007),(1384,969),(1405,932),(1427,894),(1448,856),(1470,818),(1491,780),(1510,742),(1528,704),(1542,665),(1552,626),(1556,590),(1548,568)]]),
    dict(slug="06-studio-foliage", worlds=["06"], kind="foliage", ref=32.0, start=32.0, dur=2.2, fps=18,
         bbox=(120,0,590,650), blend=.50, opacity=.82,
         polys=[[(170,0),(390,0),(425,45),(420,100),(405,145),(438,195),(430,260),(405,330),(392,395),(370,455),(352,520),(330,570),(295,595),(245,588),(218,552),(225,495),(232,440),(228,380),(216,320),(205,260),(184,205),(170,150),(160,90)]]),
    dict(slug="06-studio-river", worlds=["06"], kind="water", ref=32.0, start=32.0, dur=1.8, fps=18,
         bbox=(925,455,1045,610), blend=.40, opacity=.78,
         polys=[[(1008,475),(998,487),(990,499),(984,512),(976,525),(970,538),(962,551),(955,565),(948,580),(952,593),(962,588),(970,578),(979,566),(988,553),(996,540),(1005,526),(1015,512),(1025,499),(1035,488),(1028,478)]]),
    dict(slug="07-archive-river", worlds=["07"], kind="water", ref=40.0, start=40.0, dur=1.8, fps=18,
         bbox=(900,470,1065,620), blend=.40, opacity=.78,
         polys=[[(1018,492),(1005,500),(994,509),(983,520),(972,531),(961,543),(950,555),(940,568),(930,582),(920,594),(925,605),(938,600),(950,591),(961,580),(972,568),(983,555),(994,542),(1005,529),(1018,516),(1030,506),(1040,498),(1034,492)]]),
    dict(slug="08-reflection-river", worlds=["08"], kind="water", ref=48.0, start=48.0, dur=1.9, fps=20,
         bbox=(1250,340,1600,580), blend=.42, opacity=.94,
         polys=[[(1495,370),(1470,385),(1450,405),(1430,430),(1410,455),(1390,485),(1365,515),(1335,540),(1325,555),(1360,565),(1400,560),(1440,548),(1480,530),(1515,510),(1545,485),(1570,455),(1580,425),(1560,400),(1530,382)]]),
    dict(slug="10-fountain-pool", worlds=["09","10"], kind="water", ref=55.94, start=54.35, dur=1.55, fps=20,
         bbox=(0,540,960,930), blend=.35, opacity=1.0,
         polys=[[(0,575),(72,578),(125,615),(150,670),(155,725),(172,780),(190,835),(180,890),(118,918),(45,910),(0,885)],[(275,812),(360,804),(455,805),(560,810),(665,807),(760,800),(840,800),(905,812),(935,830),(918,855),(855,875),(770,885),(665,892),(555,895),(445,892),(355,885),(300,868)],[(418,742),(452,746),(482,768),(495,805),(490,842),(466,856),(440,842),(430,808)]]),
]


def read_frame(cap, time_s):
    cap.set(cv2.CAP_PROP_POS_MSEC, time_s * 1000)
    ok, frame = cap.read()
    if not ok:
        raise RuntimeError(f"Unable to read master at {time_s}s")
    return frame


def stabilize_frames(spec):
    cap = cv2.VideoCapture(str(VIDEO))
    reference = read_frame(cap, spec["ref"])
    ref_gray = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)
    orb = cv2.ORB_create(nfeatures=7000, fastThreshold=8)
    ref_kp, ref_des = orb.detectAndCompute(ref_gray, None)
    matcher = cv2.BFMatcher(cv2.NORM_HAMMING)
    x1, y1, x2, y2 = spec["bbox"]
    frames = []

    for index in range(round(spec["dur"] * spec["fps"])):
        current = read_frame(cap, spec["start"] + index / spec["fps"])
        gray = cv2.cvtColor(current, cv2.COLOR_BGR2GRAY)
        kp, des = orb.detectAndCompute(gray, None)
        warped = current

        if des is not None and ref_des is not None:
            pairs = matcher.knnMatch(des, ref_des, k=2)
            good = [m for pair in pairs if len(pair) == 2 for m, n in [pair] if m.distance < .72 * n.distance]
            if len(good) >= 40:
                src = np.float32([kp[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
                dst = np.float32([ref_kp[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
                matrix, _ = cv2.findHomography(src, dst, cv2.RANSAC, 2.4)
                if matrix is not None:
                    warped = cv2.warpPerspective(current, matrix, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

        frames.append(warped[y1:y2, x1:x2])

    cap.release()
    blend_count = min(round(spec["blend"] * spec["fps"]), len(frames) // 3)
    for j in range(blend_count):
        tail = len(frames) - blend_count + j
        alpha = (j + 1) / (blend_count + 1)
        frames[tail] = cv2.addWeighted(frames[tail], 1 - alpha, frames[j], alpha, 0)
    return reference, frames


def build(spec):
    reference, frames = stabilize_frames(spec)
    x1, y1, x2, y2 = spec["bbox"]
    mask = np.zeros((H, W), np.uint8)
    for polygon in spec["polys"]:
        cv2.fillPoly(mask, [np.asarray(polygon, np.int32)], 255)
    mask = cv2.GaussianBlur(mask, (0, 0), 2.8, 2.8)
    cv2.imwrite(str(OUT / f'{spec["slug"]}-mask.png'), mask[y1:y2, x1:x2])

    sequence = WORK / spec["slug"]
    sequence.mkdir(parents=True, exist_ok=True)
    for index, frame in enumerate(frames):
        cv2.imwrite(str(sequence / f"{index:04d}.jpg"), frame, [cv2.IMWRITE_JPEG_QUALITY, 93])

    destination = OUT / f'{spec["slug"]}.mp4'
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error",
        "-framerate", str(spec["fps"]), "-i", str(sequence / "%04d.jpg"),
        "-an", "-vf", "pad=ceil(iw/2)*2:ceil(ih/2)*2",
        "-c:v", "libx264", "-preset", "medium", "-crf", "21",
        "-pix_fmt", "yuv420p", "-profile:v", "high",
        "-g", str(spec["fps"]), "-keyint_min", str(spec["fps"]), "-sc_threshold", "0",
        "-movflags", "+faststart", str(destination),
    ], check=True)

    return {
        "id": spec["slug"], "worlds": spec["worlds"], "kind": spec["kind"],
        "src": f'/portfolio-world/ambient/{spec["slug"]}.mp4',
        "mask": f'/portfolio-world/ambient/{spec["slug"]}-mask.png',
        "anchorTime": spec["ref"], "opacity": spec["opacity"],
        "box": {"x": x1 / W, "y": y1 / H, "width": (x2 - x1) / W, "height": (y2 - y1) / H},
    }


def main():
    if not VIDEO.exists():
        raise SystemExit(f"Missing scrub master: {VIDEO}")
    OUT.mkdir(parents=True, exist_ok=True)
    shutil.rmtree(WORK, ignore_errors=True)
    WORK.mkdir(parents=True)
    regions = [build(spec) for spec in SPECS]
    manifest = {
        "version": 2,
        "frame": {"width": W, "height": H},
        "principle": "stabilized real source pixels, never generic ambient overlays",
        "regions": regions,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    shutil.rmtree(WORK, ignore_errors=True)
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
