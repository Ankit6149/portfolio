"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";

const MASTER_VIDEO = "/portfolio-world/master/master-scroll-1080p.mp4";
const SCROLL_HEIGHT = 1320;
const SEEK_EPSILON = 1 / 36;
const MOTION_WEIGHT = 1;
const DWELL_WEIGHT = 0.42;

const ENDPOINTS = [
  {
    id: "02",
    time: 0,
    title: "Arrival",
    note: "The world opens before the work does.",
    waterMask: "polygon(0% 47%, 16% 38%, 30% 28%, 43% 33%, 52% 45%, 41% 57%, 31% 73%, 18% 88%, 0% 100%)",
    hotspots: [
      {
        id: "begin",
        x: 66,
        y: 63,
        label: "Begin",
        title: "A portfolio you move through",
        body: "The camera is the navigation. Scroll moves through one continuous world; the destinations are moments inside it, not separate pages.",
      },
    ],
  },
  {
    id: "03",
    time: 8,
    title: "Curiosity",
    note: "Questions before categories.",
    hotspots: [
      {
        id: "curiosity",
        x: 79,
        y: 67,
        label: "Curiosity",
        title: "How the questions began",
        body: "This space is reserved for the interests, science, books, biology, and questions that shaped the way I approach engineering and software.",
      },
    ],
  },
  {
    id: "04",
    time: 16,
    title: "Study",
    note: "Evidence, thinking, iteration.",
    hotspots: [
      {
        id: "research",
        x: 23,
        y: 73,
        label: "Research",
        title: "Research desk",
        body: "Papers, experiments, results and the reasoning behind them can open here without pulling the visitor out of the environment.",
      },
      {
        id: "lens",
        x: 74,
        y: 58,
        label: "Look closer",
        title: "The lens",
        body: "Small objects can carry secondary stories: methods, tools, decisions, references, or details that are optional to explore.",
      },
    ],
  },
  {
    id: "05",
    time: 24,
    title: "Passage",
    note: "Movement between ways of thinking.",
    hotspots: [
      {
        id: "journey",
        x: 70,
        y: 50,
        label: "Journey",
        title: "A connected path",
        body: "The portfolio can explain transitions in the story here — not as a timeline card, but as a place the visitor literally passes through.",
      },
    ],
  },
  {
    id: "06",
    time: 32,
    title: "Studio",
    note: "Where ideas become things.",
    hotspots: [
      {
        id: "projects",
        x: 18,
        y: 60,
        label: "Projects",
        title: "Selected work",
        body: "The canvases and worktables can become project entrances. Each project can expand in place with its problem, decisions, system, result and links.",
      },
      {
        id: "process",
        x: 58,
        y: 70,
        label: "Process",
        title: "How I build",
        body: "This interaction can show sketches, architecture, iterations and the decisions behind the finished result instead of only showing a thumbnail grid.",
      },
    ],
  },
  {
    id: "07",
    time: 40,
    title: "Archive",
    note: "The work, with its context intact.",
    hotspots: [
      {
        id: "archive",
        x: 61,
        y: 70,
        label: "Open archive",
        title: "Work archive",
        body: "A deeper collection can live here: research, engineering work, experiments, publications and technical notes, revealed only when someone wants the detail.",
      },
    ],
  },
  {
    id: "08",
    time: 48,
    title: "Reflection",
    note: "What the work changed.",
    hotspots: [
      {
        id: "experience",
        x: 28,
        y: 73,
        label: "Experience",
        title: "Experience and outcomes",
        body: "Instead of a resume dump, this stop can connect roles and outcomes to the work already seen in the journey.",
      },
    ],
  },
  {
    id: "09",
    time: 55.72,
    title: "Return",
    note: "The world remains open.",
    waterMask: "polygon(28% 60%, 64% 57%, 75% 72%, 65% 91%, 33% 94%, 23% 78%)",
    hotspots: [
      {
        id: "contact",
        x: 74,
        y: 74,
        label: "Say hello",
        title: "Continue the conversation",
        body: "The final destination can become the quiet contact point — no abrupt footer, just the end of the walk and a clear way to continue.",
        href: "/contact",
      },
    ],
  },
];

const DUST = [
  [9, 16, 12, 0], [17, 70, 15, -7], [24, 36, 10, -3], [31, 82, 14, -11],
  [39, 23, 16, -4], [47, 61, 12, -9], [55, 12, 14, -6], [62, 77, 11, -2],
  [69, 32, 17, -13], [77, 67, 13, -5], [84, 21, 15, -8], [91, 52, 12, -1],
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smootherstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function createJourney(endpoints) {
  const segments = [];
  let cursor = 0;

  endpoints.forEach((endpoint, index) => {
    const dwellWeight = index === 0 || index === endpoints.length - 1 ? 0.55 : DWELL_WEIGHT;
    segments.push({ kind: "dwell", endpoint, start: cursor, end: cursor + dwellWeight });
    cursor += dwellWeight;

    const next = endpoints[index + 1];
    if (!next) return;

    segments.push({ kind: "motion", from: endpoint, to: next, start: cursor, end: cursor + MOTION_WEIGHT });
    cursor += MOTION_WEIGHT;
  });

  const endpointProgress = new Map();
  segments.forEach((segment) => {
    if (segment.kind === "dwell") {
      endpointProgress.set(segment.endpoint.id, ((segment.start + segment.end) / 2) / cursor);
    }
  });

  return { segments, total: cursor, endpointProgress };
}

const JOURNEY = createJourney(ENDPOINTS);

function mapProgressToJourney(progress) {
  const unit = clamp(progress, 0, 1) * JOURNEY.total;
  const segment = JOURNEY.segments.find((item) => unit <= item.end) || JOURNEY.segments[JOURNEY.segments.length - 1];

  if (segment.kind === "dwell") {
    return { time: segment.endpoint.time, endpointId: segment.endpoint.id, restStrength: 1 };
  }

  const local = clamp((unit - segment.start) / Math.max(0.0001, segment.end - segment.start), 0, 1);
  const eased = smootherstep(local);
  const time = segment.from.time + (segment.to.time - segment.from.time) * eased;
  const approachFrom = 1 - smootherstep(clamp(local / 0.14, 0, 1));
  const approachTo = smootherstep(clamp((local - 0.86) / 0.14, 0, 1));

  return {
    time,
    endpointId: null,
    restStrength: Math.max(approachFrom, approachTo) * 0.32,
  };
}

function ContinuousVideoWorld() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const loadingRef = useRef(null);
  const rafRef = useRef(null);
  const previousEndpointRef = useRef(null);

  const durationRef = useRef(56);
  const targetTimeRef = useRef(0);
  const [metadataReady, setMetadataReady] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [activeEndpointId, setActiveEndpointId] = useState("02");
  const [activeDetail, setActiveDetail] = useState(null);

  const lenis = useLenis();
  const activeEndpoint = useMemo(
    () => ENDPOINTS.find((endpoint) => endpoint.id === activeEndpointId) || null,
    [activeEndpointId],
  );

  useEffect(() => {
    const tick = () => {
      const root = rootRef.current;
      const video = videoRef.current;

      if (root) {
        const maxScroll = Math.max(1, root.offsetHeight - window.innerHeight);
        const rootTop = root.getBoundingClientRect().top;
        const progress = clamp(-rootTop / maxScroll, 0, 1);
        const mapped = mapProgressToJourney(progress);

        targetTimeRef.current = Math.min(mapped.time, Math.max(0, durationRef.current - 0.02));
        root.style.setProperty("--rest-intensity", String(mapped.restStrength));

        const endpointId = mapped.endpointId;
        if (endpointId !== previousEndpointRef.current) {
          previousEndpointRef.current = endpointId;
          setActiveEndpointId(endpointId);
          setActiveDetail(null);
        }

        if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(0.004, progress)})`;
        if (percentRef.current) percentRef.current.textContent = `${Math.round(progress * 100)}%`;
        if (introRef.current) {
          const opacity = clamp(1 - progress / 0.065, 0, 1);
          introRef.current.style.opacity = String(opacity);
          introRef.current.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
        }
      }

      if (video && metadataReady && Number.isFinite(video.duration) && !video.seeking) {
        const desired = clamp(targetTimeRef.current, 0, Math.max(0, video.duration - 0.02));
        const delta = desired - video.currentTime;

        if (Math.abs(delta) > SEEK_EPSILON) {
          try {
            video.currentTime = desired;
          } catch {
            // Keep the last decoded frame until the decoder can accept another seek.
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [metadataReady]);

  const updateBufferLabel = () => {
    const video = videoRef.current;
    const label = loadingRef.current;
    if (!video || !label || !Number.isFinite(video.duration) || video.duration <= 0) return;

    let bufferedEnd = 0;
    for (let index = 0; index < video.buffered.length; index += 1) bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
    const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
    label.textContent = percent > 0 ? `Preparing motion · ${percent}%` : "Preparing motion";
  };

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    durationRef.current = video.duration;
    targetTimeRef.current = 0;
    video.pause();
    setMetadataReady(true);

    try {
      video.currentTime = 0.001;
    } catch {
      // loadeddata will reveal the first decoded frame when available.
    }

    updateBufferLabel();
  };

  const handleLoadedData = () => {
    setFirstFrameReady(true);
    setLoadError(false);
    updateBufferLabel();
  };

  const scrollToEndpoint = (endpointId) => {
    const root = rootRef.current;
    if (!root) return;
    const endpointProgress = JOURNEY.endpointProgress.get(endpointId) || 0;
    const maxScroll = Math.max(1, root.offsetHeight - window.innerHeight);
    const destination = root.offsetTop + endpointProgress * maxScroll;

    if (lenis) lenis.scrollTo(destination, { duration: 1.35 });
    else window.scrollTo({ top: destination, behavior: "smooth" });
  };

  return (
    <main
      ref={rootRef}
      className="continuous-world"
      data-render-mode="single-master-video"
      data-video-ready={firstFrameReady ? "true" : "false"}
      data-active-endpoint={activeEndpointId || "moving"}
      data-resting={activeEndpoint ? "true" : "false"}
      style={{ "--scroll-height": `${SCROLL_HEIGHT}svh`, "--rest-intensity": 1 }}
    >
      <div className="continuous-world__stage">
        <Image src={frame01} alt="" fill priority sizes="100vw" quality={100} className={`continuous-world__poster${firstFrameReady ? " is-hidden" : ""}`} />

        <video
          ref={videoRef}
          className={`continuous-world__video${firstFrameReady ? " is-ready" : ""}`}
          src={MASTER_VIDEO}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={handleMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleLoadedData}
          onProgress={updateBufferLabel}
          onError={() => setLoadError(true)}
          aria-label="A continuous cinematic journey through Ankit Bhardwaj's portfolio world"
        />

        <div className="world-ambient" aria-hidden="true">
          <div className="world-ambient__mist" />
          <div className="world-ambient__light" />
          <div className={`world-ambient__water${activeEndpoint?.waterMask ? " is-active" : ""}`} style={{ clipPath: activeEndpoint?.waterMask || "polygon(0 0, 0 0, 0 0)" }} />
          <div className="world-ambient__dust">
            {DUST.map(([x, y, duration, delay], index) => (
              <i key={`${x}-${y}`} style={{ "--dust-x": `${x}%`, "--dust-y": `${y}%`, "--dust-duration": `${duration}s`, "--dust-delay": `${delay}s`, "--dust-size": `${index % 3 === 0 ? 2 : 1}px` }} />
            ))}
          </div>
        </div>

        <div className="continuous-world__veil" aria-hidden="true" />

        <header className="continuous-world__header">
          <Link href="/redesign" className="continuous-world__brand">Ankit Bhardwaj</Link>
          <nav aria-label="Portfolio navigation"><Link href="/contact">Contact</Link></nav>
        </header>

        <div ref={introRef} className="continuous-world__intro">
          <p>Scroll to move through the world</p>
          <h1>Ankit Bhardwaj</h1>
          <span>Software, research, systems — and the questions that came before them.</span>
        </div>

        <nav className="world-endpoints" aria-label="Journey destinations">
          {ENDPOINTS.map((endpoint) => (
            <button key={endpoint.id} type="button" className={activeEndpointId === endpoint.id ? "is-active" : ""} onClick={() => scrollToEndpoint(endpoint.id)} aria-label={`Go to ${endpoint.id} — ${endpoint.title}`} aria-current={activeEndpointId === endpoint.id ? "step" : undefined}>
              <span>{endpoint.id}</span><i />
            </button>
          ))}
        </nav>

        <div className={`world-rest-caption${activeEndpoint ? " is-visible" : ""}`} aria-live="polite">
          {activeEndpoint ? <><span>{activeEndpoint.id}</span><div><strong>{activeEndpoint.title}</strong><p>{activeEndpoint.note}</p></div></> : null}
        </div>

        <div className={`world-hotspots${activeEndpoint ? " is-visible" : ""}`}>
          {activeEndpoint?.hotspots.map((hotspot) => (
            <button key={hotspot.id} type="button" className="world-hotspot" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} onClick={() => setActiveDetail(hotspot)} aria-label={`Explore ${hotspot.label}`}>
              <i /><span>{hotspot.label}</span>
            </button>
          ))}
        </div>

        <aside className={`world-folio${activeDetail ? " is-open" : ""}`} aria-hidden={!activeDetail}>
          {activeDetail ? <><button type="button" className="world-folio__close" onClick={() => setActiveDetail(null)} aria-label="Close detail">×</button><span className="world-folio__kicker">{activeEndpoint?.id} · {activeEndpoint?.title}</span><h2>{activeDetail.title}</h2><p>{activeDetail.body}</p>{activeDetail.href ? <Link href={activeDetail.href}>Continue →</Link> : null}</> : null}
        </aside>

        {!firstFrameReady && !loadError ? <div className="continuous-world__loading" role="status"><span /> <b ref={loadingRef}>Preparing motion</b></div> : null}
        {loadError ? <div className="continuous-world__loading continuous-world__loading--error" role="status">Motion is unavailable. The high-resolution opening still remains visible.</div> : null}

        <div className="continuous-world__progress" aria-hidden="true"><i ref={progressRef} /><span ref={percentRef}>0%</span></div>
      </div>
    </main>
  );
}

export default function PortfolioWorldBase() {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.105, smoothWheel: true, wheelMultiplier: 0.72, touchMultiplier: 1 }}>
      <ContinuousVideoWorld />
    </ReactLenis>
  );
}
