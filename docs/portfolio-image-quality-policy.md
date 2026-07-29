# Portfolio Image Quality Policy

## Non-negotiable source rule

- Preserve every selected environment and UI asset as its original transparent PNG.
- Do not convert source assets to WebP, AVIF, JPEG, or another lossy format.
- Do not resize, resample, sharpen, or recompress the source files before committing them.
- Store the exact source bytes in the repository or a durable project-owned asset store; never use Canva preview, thumbnail, editor, or temporary signed media URLs in production.
- Canva remains the visual composition and archive workspace, not the website's asset delivery layer.

## Browser delivery rule

- Use the original PNG path directly.
- Disable Next.js image optimization for these art-directed transparent layers so the framework does not create alternate encoded files.
- Control performance through selective loading, scene-based lazy loading, visibility rules, and pausing off-screen motion—not through image degradation.
- Decorative below-the-fold layers should not be downloaded until their scene approaches the viewport.

## Resolution readiness

Preserving an original does not guarantee that it contains enough pixels for a large or high-density display.

For each asset, record:

- original pixel width and height
- intended maximum CSS width and height
- expected device-pixel ratio
- safe maximum display size
- whether a higher-resolution regeneration is required

A useful minimum is:

```text
required source width >= intended CSS width × target device-pixel ratio
```

Example: an arch displayed at 420 CSS pixels on a 2× screen should ideally be at least 840 source pixels wide.

Do not enlarge a low-resolution cutout merely because it is an original PNG. Regenerate or upscale the selected layer before implementation when it cannot meet its intended display size.

## Current hero audit

The present extracted hero cutouts are composition prototypes, not all final-resolution assets:

- far mountains: 994 × 188
- mid mountains: 1009 × 167
- forest line: 926 × 201
- mist band: 925 × 125
- clouds: 997 × 218
- meadow: 1000 × 123
- river: 577 × 295
- arch: 357 × 409
- flower bed: 599 × 376
- hanging vines: 491 × 414

Before the hero is enabled publicly:

- regenerate the arch, river, flower bed, and hanging vines at substantially higher resolution
- test mountains and horizontal layers at their maximum desktop crop on a 2× display
- never exceed the audited safe display size
- inspect transparency edges against both light and dark backgrounds
- verify files by checksum after upload

## Production safeguards

- No hotlinking to Canva.
- No expiring or signed source URLs.
- No screenshot exports used as individual layers.
- No baked-in text inside essential controls.
- Keep `master` unchanged until the branch preview passes visual, mobile, accessibility, and resolution review.
