"""Crayon drawing on white paper -> transparent paper cut-out WebP with a white border.
Usage: python cutout.py <in_dir> <out_dir>  (every *.png in in_dir) · needs: pip install opencv-python numpy
The drawing must not touch the image border (the background is flood-filled from the corner)."""
import pathlib, sys
import cv2
import numpy as np

src, dst = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
dst.mkdir(parents=True, exist_ok=True)
BORDER = 16  # px of white paper around the drawing (at 1024 source size)
MAX = 640

for p in sorted(src.glob("*.png")):
    img = cv2.imread(str(p))
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # ink or colour = darker than paper, or noticeably saturated
    fg = ((hsv[..., 2] < 225) | (hsv[..., 1] > 40)).astype(np.uint8) * 255
    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    # everything the border's background flood cannot reach is the object (fills holes inside outlines)
    flood = fg.copy()
    h, w = fg.shape
    mask = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(flood, mask, (0, 0), 128)
    obj = np.where(flood == 128, 0, 255).astype(np.uint8)
    # keep only the largest blobs (drop paper specks)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(obj)
    keep = np.zeros_like(obj)
    big = stats[1:, cv2.CC_STAT_AREA].max() if n > 1 else 0
    for i in range(1, n):
        part = lab == i
        # a drop shadow on the paper is grey: no dark ink and no colour -> not part of the drawing
        shadow = (hsv[..., 2][part] < 120).mean() < 0.01 and hsv[..., 1][part].mean() < 25
        if stats[i, cv2.CC_STAT_AREA] >= big * 0.04 and not shadow:
            keep[part] = 255
    cut = cv2.dilate(keep, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * BORDER + 1, 2 * BORDER + 1)))
    cut = cv2.GaussianBlur(cut, (5, 5), 0)  # soft scissors edge
    rgb = np.where(keep[..., None] > 0, img, 255).astype(np.uint8)  # border is clean white paper
    rgba = cv2.cvtColor(rgb, cv2.COLOR_BGR2BGRA)
    rgba[..., 3] = cut
    ys, xs = np.where(cut > 0)
    if ys.size == 0:
        print(p.stem, 'SKIPPED: nothing found on the paper')
        continue
    rgba = rgba[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]
    s = MAX / max(rgba.shape[:2])
    if s < 1:
        rgba = cv2.resize(rgba, (round(rgba.shape[1] * s), round(rgba.shape[0] * s)), interpolation=cv2.INTER_AREA)
    out = dst / f"{p.stem}.webp"
    cv2.imwrite(str(out), rgba, [cv2.IMWRITE_WEBP_QUALITY, 82])
    print(p.stem, rgba.shape[1], rgba.shape[0], f"{out.stat().st_size // 1024}KB")
