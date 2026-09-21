// Narrative waypoints for the cinematic portfolio world.
// These are metadata only: the smooth master-video scroll remains continuous.
// Timings 02–09 were matched against the combined master video; 01 and 10
// are the separate opening/closing stills.

export const PORTFOLIO_WORLD_STOPS = [
  {
    id: "01",
    title: "Arrival",
    kind: "still",
    asset: "PORTFOLIO_F01_ARRIVAL.png",
  },
  {
    id: "02",
    title: "Approach",
    kind: "video-anchor",
    time: 0,
  },
  {
    id: "03",
    title: "Threshold",
    kind: "video-anchor",
    time: 7.7,
  },
  {
    id: "04",
    title: "Study",
    kind: "video-anchor",
    time: 15.7,
  },
  {
    id: "05",
    title: "Passage",
    kind: "video-anchor",
    time: 23.7,
  },
  {
    id: "06",
    title: "Studio",
    kind: "video-anchor",
    time: 31.7,
  },
  {
    id: "07",
    title: "Archive",
    kind: "video-anchor",
    time: 39.7,
  },
  {
    id: "08",
    title: "Reflection",
    kind: "video-anchor",
    time: 48,
  },
  {
    id: "09",
    title: "Return",
    kind: "video-anchor",
    time: 55.7,
  },
  {
    id: "10",
    title: "Closing World",
    kind: "still",
    asset: "PORTFOLIO_F10_CLOSING_WORLD.png",
  },
];

export const MASTER_VIDEO_STOPS = PORTFOLIO_WORLD_STOPS.filter(
  (stop) => stop.kind === "video-anchor",
);
