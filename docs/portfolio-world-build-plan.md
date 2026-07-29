# Portfolio World Build Plan

## Status and safety

- Work only on the `portfolio-redesign` branch.
- Keep PR #1 in draft until the complete redesign has been reviewed and explicitly approved.
- Do not merge into `master` during visual implementation.
- Build and validate one scene at a time rather than replacing the full portfolio in one commit.

## Goal

Build a professional personal portfolio as a believable layered environment rather than a flat landing page or a collection of cards. The scenery, architecture, plants, water, paper UI and product content should exist as independent 2D layers that create controlled faux-3D depth through scale, parallax, occlusion, light and motion.

The environment must remain readable, responsive, accessible and fast. Motion must support meaning rather than delay content.

## Existing foundation

The redesign already uses Next.js, React, GSAP ScrollTrigger and Lenis. It includes pinned hero motion, section-triggered world states, reduced-motion checks, project-story transitions and a draft PR workflow. We should reuse this foundation and replace the abstract background system incrementally.

## Asset architecture

### Source library

Generated master sheets are not placed directly into page layouts. Each sheet must be split into independent transparent elements, named semantically and inspected for edge quality.

Current extracted categories:

- architecture archways and gateways
- columns, stairways, balconies, balustrades and pedestals
- distant mountain, ridge, forest, meadow, cliff, mist and cloud layers
- river bends, waterfalls, ponds, stream sections and riverbanks
- flower beds, vines, branches, planters and shrub groups
- paper notes, tags, frames, chapter markers and editorial labels
- navigation, buttons, project panels, progress rails and stat strips

### Repository paths

```text
public/portfolio-world/
  scenery/
    sky/
    mountains/
    midground/
    ground/
    mist/
  water/
  architecture/
    arches/
    columns/
    stairs/
    railings/
  flora/
    foreground/
    climbing/
    hanging/
    planters/
  ui/
    navigation/
    buttons/
    notes/
    frames/
    labels/
  textures/
  masks/
```

### Quality policy

- Keep full-resolution source PNGs in the private Canva/source archive.
- Commit web-ready transparent WebP or optimized PNG files to the repository.
- Do not resize a source destructively.
- Create dedicated desktop, tablet and mobile crops when composition changes materially.
- Avoid one enormous background image; depth requires separate layers.
- GitHub stores committed binary files byte-for-byte and does not recompress them.

## Scene system

Each scene should use a declarative asset manifest rather than hard-coded image paths throughout JSX.

Example structure:

```js
{
  id: "hero-mountain-morning",
  layers: [
    { id: "sky", depth: 0.02, type: "ambient" },
    { id: "far-mountains", depth: 0.05 },
    { id: "mist", depth: 0.08, loop: "mist" },
    { id: "mid-ridge", depth: 0.11 },
    { id: "estate-arch", depth: 0.16 },
    { id: "river", depth: 0.18, loop: "water" },
    { id: "foreground-flora", depth: 0.26, loop: "foliage" },
    { id: "content", depth: 0, stable: true }
  ]
}
```

Each layer should define:

- source path
- semantic alt or decorative status
- depth ratio
- initial position
- desktop, tablet and mobile crop/visibility rules
- scroll transform range
- ambient motion preset
- pointer-response limit
- z-index
- opacity and blur rules
- whether it can occlude content

## Motion model

### Scroll-driven motion

Use scroll for large spatial changes:

- distant mountains: 2–5% translation
- middle hills and architecture: 6–14%
- foreground plants and railings: 14–24%
- restrained camera scale: approximately 1.00 to 1.04
- section handoffs through existing objects such as an arch, path, river or page

Avoid simulated flying, aggressive perspective and large rotations.

### Continuous river flow

The river should move gently even when the visitor is not scrolling.

Recommended implementation:

1. Use the transparent river asset as the base shape.
2. Derive a monochrome alpha mask from that shape.
3. Place a seamless water-highlight texture beneath or above the base.
4. Clip the texture with CSS `mask-image` or an SVG mask.
5. Animate only `background-position` or a small translate loop.
6. Add a second slower reflection layer at lower opacity to prevent mechanical repetition.
7. Use 8–14 second loops with linear movement and no visible restart.

Do not distort the river banks or move the complete river image as a single object.

### Ambient motion presets

- mist: 20–36 second lateral drift with subtle opacity change
- water: 8–14 second directional texture movement
- leaves: 5–11 second irregular sway, varied by group
- hanging flowers: 7–13 second low-amplitude sway
- light: 20–35 second mask/opacity shift
- fabric: 8–15 second subtle deformation when used indoors
- reflections: maximum 1–3% pointer or scroll response

Loops should use different durations and delays so the environment does not move in synchrony.

### Reactive elements

Interactive decoration may provide optional information, but essential content must remain visible without hovering.

Good uses:

- chapter medallion reveals the current section label
- architectural plaque opens a short project context note
- a paper tag exposes year, role or status
- a plant-covered pillar responds slightly to pointer depth
- project frame provides a conventional focus/hover state
- progress rail tracks chapter position

Rules:

- hover effects must also work with keyboard focus
- no meaning may depend only on hover
- interactions should move 2–8 pixels, not jump dramatically
- decorative layers use `pointer-events: none` unless intentionally interactive
- touch devices receive tap or static alternatives

## Component architecture

```text
app/redesign/
  components/
    world/
      WorldScene.jsx
      WorldLayer.jsx
      AmbientLayer.jsx
      WaterFlowLayer.jsx
      InteractiveHotspot.jsx
      SceneTransition.jsx
    ui/
      EditorialNav.jsx
      ChapterRail.jsx
      PaperNote.jsx
      ProjectFrame.jsx
      ArchiveTag.jsx
      WorldButton.jsx
  data/
    world-assets.js
    scenes.js
    projects.js
  hooks/
    useReducedMotion.js
    useWorldParallax.js
    useAmbientMotion.js
```

Keep content data separate from animation logic. The same content must remain understandable if every decorative layer is disabled.

## Responsive behaviour

### Desktop

- full depth stack
- restrained pinned hero sequence
- ambient river, mist and foliage
- optional pointer depth

### Tablet

- fewer foreground layers
- shorter pinned moments
- reduced blur and shadow work
- no pointer-only interactions

### Mobile

- linear content flow
- two or three major scenery layers only
- static or very light ambient loops
- no long scroll pinning
- portrait-specific crops
- no scroll hijacking

## Performance rules

- target initial visual payload below 2.5 MB where practical
- lazy-load layers below the first viewport
- use responsive `sizes` and explicit dimensions
- animate transform and opacity rather than layout properties
- avoid large runtime blur and filter animations
- pause off-screen ambient loops with IntersectionObserver
- stop all optional loops under `prefers-reduced-motion`
- test low-powered mobile hardware before expanding the world

## Accessibility rules

- text contrast must remain stable independent of scenery
- maintain conventional keyboard navigation and focus outlines
- provide reduced-motion crossfades instead of removing content
- decorative images use empty alt text or CSS backgrounds
- meaningful diagrams and product imagery receive concise alt text
- do not place essential links inside moving scenery only

## Build sequence

### Phase 0 — Asset preparation

- split all master sheets into independent transparent files
- remove edge contamination and inspect alpha quality
- assign semantic names and categories
- generate web-ready formats
- create the asset manifest

### Phase 1 — Hero world prototype

Build only the first scene:

- sky
- far mountains
- green ridge
- mist
- river
- one architectural arch/terrace
- foreground flowers/plants
- stable name, role and primary routes

Add:

- restrained scroll depth
- continuous calm river flow
- ambient mist and foliage
- reduced-motion version
- tablet/mobile composition

The hero must be approved before the same system is expanded.

### Phase 2 — Editorial interface language

Implement and validate:

- navigation
- chapter marker
- progress rail
- buttons
- note/quote components
- project frame
- metadata tags

Use real HTML and CSS for text, controls and borders. Raster UI assets should be used as visual references or decorative shells, not as baked-in unreadable text.

### Phase 3 — Origins transition

Use the river/path as the visual handoff from landscape into biology, signals, instrumentation and software. Avoid a hard reset between sections.

### Phase 4 — Project environments

Build one project story at a time. Product screenshots remain readable and primary. Environmental assets frame and connect the story rather than covering the interface.

### Phase 5 — About, practice and closing

Introduce warmer protected spaces, paper, books, drawing, music, basketball and reflective material without turning them into a grid of hobby cards.

### Phase 6 — QA and optimization

- production build and lint
- desktop, tablet and mobile visual QA
- keyboard and reduced-motion QA
- performance profiling
- image/crop audit
- broken-link and content review
- Vercel preview review before merge consideration

## First implementation milestone

The first milestone is not the complete site. It is a polished hero scene that proves:

- separate transparent layers work together
- the world feels realistic rather than like a collage
- river flow is calm and continuous
- scroll creates depth without becoming distracting
- professional identity is immediately readable
- mobile and reduced-motion versions remain strong

Only after this milestone passes review should the remaining sections be rebuilt with the same system.
