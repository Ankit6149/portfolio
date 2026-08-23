# Portfolio World UI Asset Audit

## Source library

The existing portfolio migration asset library contains 63 transparent PNG elements grouped as:

- `architecture_archways` — 6
- `architecture_structures` — 7
- `flora` — 5
- `scenery_depth` — 9
- `water` — 7
- `ui_clean` — 9
- `ui_cream_gold` — 12
- `ui_vintage` — 8

## Direction for the cinematic portfolio

The master video remains the camera and world. These assets are supporting layers, never replacements for the artwork.

### Prefer

- `ui_cream_gold/08.png` — blank torn-paper strip; useful for quotations, short labels, or a quiet note revealed from an object.
- `ui_cream_gold/09.png` — ornate blank frame; useful for project/research content opened inside the world.
- `ui_cream_gold/10.png` — blank hanging tag; useful for dates, artifact labels, or compact metadata.
- `ui_vintage/08.png` — restrained framed paper/card; useful when cream/gold would be too decorative.
- selected architecture/flora layers only where their perspective actually matches the scene.

### Reference only / avoid using literally

- UI assets with baked placeholder copy such as “Chapter 3”, “View Work”, “Label”, “Button Text”, or generic portfolio statistics.
- `ui_clean` as the dominant visual language; it reads too much like a conventional website layered over the world.
- generic water PNGs as a substitute for the real rivers/fountains visible in the master video.

## Ambient rule

Water, fountains, hall streams, and prominent foliage should be extracted from the actual scene and animated as masked layers. The existing water/flora library can help with tests, occlusion, and small foreground accents, but should not overwrite the visual geography of the master.

## Journey numbering

Numbering is chronological and starts at `01`:

| Stop | Working name | Source |
| --- | --- | --- |
| 01 | Arrival | opening still |
| 02 | Approach | master video 0.0s |
| 03 | Threshold | master video ~7.7s |
| 04 | Study | master video ~15.7s |
| 05 | Passage | master video ~23.7s |
| 06 | Studio | master video ~31.7s |
| 07 | Archive | master video ~39.7s |
| 08 | Reflection | master video ~48.0s |
| 09 | Return | master video ~55.7s |
| 10 | Closing World | closing still |

The numbers are production/narrative waypoints, not separate web pages. The visitor should still experience one continuous world.
