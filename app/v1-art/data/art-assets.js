// Declarative Asset & Layer Manifest for V1 Art Direction ("Quiet Grandeur in a Living World")
// Visual Source of Truth: V1_SCOPE_REFERENCE export

export const artAssets = {
  hero: {
    backdropPlate: {
      src: "/v1-art/hero-plate.png",
      role: "midground-wash",
      depth: 0.04,
      desktopPosition: "center right",
      tabletPosition: "75% center",
      mobilePosition: "80% center",
      alt: "Ethereal watercolor wash with blossoming floral branches",
    },
    foregroundBranch: {
      src: "/v1-art/botanical-branch-fg.png",
      role: "foreground-occlusion",
      depth: 0.12,
      desktopPosition: "top right",
      alt: "Delicate blooming foreground branch with golden leaves",
    },
    threadRibbon: {
      src: "/v1-art/flowing-thread-ribbon.png",
      role: "spatial-thread",
      depth: 0.07,
      alt: "Flowing botanical ribbon with golden thread traces",
    },
    petals1: {
      src: "/v1-art/petals-layer-1.png",
      role: "ambient-drift",
      depth: 0.09,
    },
    petals2: {
      src: "/v1-art/petals-layer-2.png",
      role: "ambient-drift",
      depth: 0.14,
    },
  },
  story: {
    signalsPlate: {
      src: "/v1-art/story-signals.png",
      role: "narrative-strata",
      depth: 0.05,
      alt: "Botanical strata interwoven with electrical signal waveforms",
    },
    threadRibbon: {
      src: "/v1-art/flowing-thread-ribbon.png",
      role: "transition-path",
      depth: 0.08,
      alt: "Golden thread and petal path guiding narrative progression",
    },
  },
  work: {
    gardenPanorama: {
      src: "/v1-art/garden-panoramic.png",
      role: "chapter-backdrop",
      depth: 0.04,
      alt: "Expansive teal and coral botanical garden landscape",
    },
    cornerBouquet: {
      src: "/v1-art/botanical-corner-bouquet.png",
      role: "framing-accent",
      depth: 0.10,
      alt: "Gilded peony and botanical corner framing element",
    },
  },
  research: {
    strata: {
      src: "/v1-art/research-strata.png",
      role: "signal-scientific-field",
      depth: 0.05,
      alt: "Deep emerald and gold strata with mathematical data points and waveforms",
    },
  },
  closing: {
    floralBand: {
      src: "/v1-art/floral-band.png",
      role: "closing-flourish",
      depth: 0.03,
      alt: "Soft painterly floral wash and divider band",
    },
  },
};
