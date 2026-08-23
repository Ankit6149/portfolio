export const REST_STATES = [
  { id: "01", title: "Arrival", time: 0.0, radius: 0.0085 },
  { id: "02", title: "Approach", time: 4.0, radius: 0.0075 },
  { id: "03", title: "Threshold", time: 8.0, radius: 0.0075 },
  { id: "04", title: "Study", time: 16.0, radius: 0.0075 },
  { id: "05", title: "Passage", time: 24.0, radius: 0.0075 },
  { id: "06", title: "Studio", time: 32.0, radius: 0.0085 },
  { id: "07", title: "Archive", time: 40.0, radius: 0.0075 },
  { id: "08", title: "Reflection", time: 48.0, radius: 0.0075 },
  { id: "09", title: "Return", time: 55.0, radius: 0.0065 },
  { id: "10", title: "Closing World", time: 55.94, radius: 0.0045 },
];

// These are not generic effects. Each video is built from the actual cinematic master,
// stabilized against its fixed rest frame, cropped, and revealed through its real mask.
export const AMBIENT_REGIONS = [
  {
    id: "01-river",
    worlds: ["01"],
    kind: "water",
    src: "/portfolio-world/ambient/01-river.mp4",
    mask: "/portfolio-world/ambient/01-river-mask.png",
    opacity: 1,
    box: { x: 0.1302083333, y: 0.3888888889, width: 0.3697916667, height: 0.4351851852 },
  },
  {
    id: "06-studio-foliage",
    worlds: ["06"],
    kind: "foliage",
    src: "/portfolio-world/ambient/06-studio-foliage.mp4",
    mask: "/portfolio-world/ambient/06-studio-foliage-mask.png",
    opacity: 0.82,
    box: { x: 0.0625, y: 0, width: 0.2447916667, height: 0.6018518519 },
  },
  {
    id: "10-fountain-pool",
    worlds: ["09", "10"],
    kind: "water",
    src: "/portfolio-world/ambient/10-fountain-pool.mp4",
    mask: "/portfolio-world/ambient/10-fountain-pool-mask.png",
    opacity: 1,
    box: { x: 0, y: 0.5, width: 0.5, height: 0.3611111111 },
  },
];
