"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";
import { featuredProjects } from "../../lib/site-data";
import { AMBIENT_REGIONS, REST_STATES } from "./data/rest-states";

const MASTER_VIDEO = "/portfolio-world/master/master-scroll-1080p.mp4";
const ORNATE_FRAME = "/portfolio-world/ui/cream-gold-frame.png";
const SCROLL_HEIGHT = 1180;
const SEEK_EPSILON = 1 / 36;

const WORLDS = [
  { id: "01", title: "Arrival", start: 0, end: 0.03 },
  { id: "02", title: "Approach", start: 0.03, end: 0.135 },
  { id: "03", title: "Threshold", start: 0.135, end: 0.28 },
  { id: "04", title: "Study", start: 0.28, end: 0.42 },
  { id: "05", title: "Passage", start: 0.42, end: 0.555 },
  { id: "06", title: "Studio", start: 0.555, end: 0.705 },
  { id: "07", title: "Archive", start: 0.705, end: 0.855 },
  { id: "08", title: "Reflection", start: 0.855, end: 0.95 },
  { id: "09", title: "Return", start: 0.95, end: 0.988 },
  { id: "10", title: "Closing World", start: 0.988, end: 1.001 },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smootherstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function worldAtProgress(progress) {
  return WORLDS.find((world) => progress >= world.start && progress < world.end) || WORLDS[WORLDS.length - 1];
}

function nearestRestState(progress, duration) {
  let nearest = null;

  for (const state of REST_STATES) {
    const anchorProgress = clamp(state.time / Math.max(duration, 0.001), 0, 1);
    const distance = Math.abs(progress - anchorProgress);

    if (distance <= state.radius && (!nearest || distance < nearest.distance)) {
      nearest = { ...state, anchorProgress, distance };
    }
  }

  return nearest;
}

function studioStrengthAtProgress(progress) {
  const fadeIn = smootherstep((progress - 0.54) / 0.04);
  const fadeOut = 1 - smootherstep((progress - 0.665) / 0.04);
  return clamp(Math.min(fadeIn, fadeOut), 0, 1);
}

function StudioFolio({ onClose }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const project = featuredProjects[projectIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setProjectIndex((index) => (index + 1) % featuredProjects.length);
      if (event.key === "ArrowLeft") setProjectIndex((index) => (index - 1 + featuredProjects.length) % featuredProjects.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="world-folio" id="studio-folio" role="dialog" aria-modal="true" aria-labelledby="studio-folio-title">
      <button className="world-folio__scrim" type="button" aria-label="Close selected work" onClick={onClose} />

      <section className="world-folio__frame" aria-label="Selected work folio">
        <Image
          src={ORNATE_FRAME}
          alt=""
          fill
          sizes="(max-width: 760px) 94vw, 860px"
          className="world-folio__ornament"
          unoptimized
          priority
        />

        <div className="world-folio__paper">
          <div className="world-folio__heading">
            <div>
              <span>06 · Studio</span>
              <p>Selected work</p>
            </div>
            <button className="world-folio__close" type="button" onClick={onClose} aria-label="Close selected work">
              Close
            </button>
          </div>

          <div className="world-folio__project" key={project.name}>
            <p className="world-folio__type">{project.type}</p>
            <h2 id="studio-folio-title">{project.name}</h2>
            <p className="world-folio__summary">{project.summary}</p>
            <p className="world-folio__stack">{project.stack}</p>

            <ul className="world-folio__highlights" aria-label={`${project.name} highlights`}>
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>

            {project.live ? (
              <a className="world-folio__link" href={project.live} target="_blank" rel="noreferrer">
                Visit project <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="world-folio__link world-folio__link--quiet">Private / process work</span>
            )}
          </div>

          <div className="world-folio__pagination" aria-label="Choose featured project">
            {featuredProjects.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === projectIndex ? "is-active" : ""}
                onClick={() => setProjectIndex(index)}
                aria-label={`Show ${item.name}`}
                aria-pressed={index === projectIndex}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AmbientRegions({ videoRefs }) {
  return (
    <div className="world-ambients" aria-hidden="true">
      {AMBIENT_REGIONS.map((region) => (
        <div
          key={region.id}
          className="world-ambient-region"
          data-ambient-id={region.id}
          data-kind={region.kind}
          style={{
            left: `${region.box.x * 100}%`,
            top: `${region.box.y * 100}%`,
            width: `${region.box.width * 100}%`,
            height: `${region.box.height * 100}%`,
            opacity: region.opacity,
            WebkitMaskImage: `url(${region.mask})`,
            maskImage: `url(${region.mask})`,
          }}
        >
          <video
            ref={(node) => {
              if (node) videoRefs.current.set(region.id, node);
              else videoRefs.current.delete(region.id);
            }}
            src={region.src}
            muted
            loop
            playsInline
            preload={region.id === "01-river" ? "auto" : "metadata"}
            tabIndex={-1}
          />
        </div>
      ))}
    </div>
  );
}

function ContinuousVideoWorld() {
  const rootRef = useRef(null);
  const cameraPlaneRef = useRef(null);
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const loadingRef = useRef(null);
  const studioRef = useRef(null);
  const rafRef = useRef(null);
  const activeWorldRef = useRef("01");
  const activeRestRef = useRef(null);
  const ambientVideoRefs = useRef(new Map());

  const durationRef = useRef(56);
  const targetTimeRef = useRef(0);
  const lastProgressRef = useRef(0);
  const lastMotionAtRef = useRef(0);
  const restStrengthRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });

  const [metadataReady, setMetadataReady] = useState(false);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [activeWorldId, setActiveWorldId] = useState("01");
  const [folioOpen, setFolioOpen] = useState(false);
  const lenis = useLenis();

  const activeWorld = WORLDS.find((world) => world.id === activeWorldId) || WORLDS[0];

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return undefined;

    const handlePointerMove = (event) => {
      pointerTargetRef.current.x = clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      pointerTargetRef.current.y = clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
    };

    const resetPointer = () => {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", resetPointer);
    };
  }, []);

  useEffect(() => {
    if (!folioOpen) {
      lenis?.start();
      return undefined;
    }

    lenis?.stop();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [folioOpen, lenis]);

  useEffect(() => {
    const syncAmbientPlayback = (restId) => {
      for (const region of AMBIENT_REGIONS) {
        const media = ambientVideoRefs.current.get(region.id);
        if (!media) continue;

        const shouldPlay = Boolean(restId && region.worlds.includes(restId));
        if (shouldPlay && media.paused) {
          media.play().catch(() => {
            // Muted autoplay is expected to work; if a browser blocks it, the base
            // frame remains perfectly valid and the next interaction can retry it.
          });
        } else if (!shouldPlay && !media.paused) {
          media.pause();
        }
      }
    };

    const tick = (now) => {
      const root = rootRef.current;
      const video = videoRef.current;
      const cameraPlane = cameraPlaneRef.current;
      let progress = lastProgressRef.current;
      let nearestRest = null;

      if (root) {
        const maxScroll = Math.max(1, root.offsetHeight - window.innerHeight);
        const rootTop = root.getBoundingClientRect().top;
        progress = clamp(-rootTop / maxScroll, 0, 1);
        const world = worldAtProgress(progress);
        const studioStrength = studioStrengthAtProgress(progress);

        if (lastMotionAtRef.current === 0) lastMotionAtRef.current = now;
        const progressDelta = Math.abs(progress - lastProgressRef.current);
        if (progressDelta > 0.000018) lastMotionAtRef.current = now;
        lastProgressRef.current = progress;

        nearestRest = nearestRestState(progress, durationRef.current);
        const idleFor = now - lastMotionAtRef.current;
        const restTarget = nearestRest && idleFor > 110
          ? smootherstep((idleFor - 110) / 260)
          : 0;
        const restFollow = restTarget > restStrengthRef.current ? 0.085 : 0.28;
        restStrengthRef.current += (restTarget - restStrengthRef.current) * restFollow;
        if (restStrengthRef.current < 0.001) restStrengthRef.current = 0;

        const settledRestId = nearestRest && restStrengthRef.current > 0.18 ? nearestRest.id : null;
        if (settledRestId !== activeRestRef.current) {
          activeRestRef.current = settledRestId;
          root.dataset.restWorld = settledRestId || "none";
          syncAmbientPlayback(settledRestId);
        }

        const displayProgress = nearestRest
          ? progress + (nearestRest.anchorProgress - progress) * restStrengthRef.current
          : progress;
        targetTimeRef.current = displayProgress * durationRef.current;

        root.dataset.activeWorld = world.id;
        root.style.setProperty("--rest-strength", String(restStrengthRef.current));

        if (world.id !== activeWorldRef.current) {
          activeWorldRef.current = world.id;
          setActiveWorldId(world.id);
        }

        if (studioRef.current) {
          studioRef.current.style.setProperty("--studio-strength", String(studioStrength));
          studioRef.current.dataset.visible = studioStrength > 0.24 ? "true" : "false";
        }

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.max(0.004, progress)})`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(progress * 100)}%`;
        }
        if (introRef.current) {
          const opacity = clamp(1 - progress / 0.075, 0, 1);
          introRef.current.style.opacity = String(opacity);
          introRef.current.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
        }
      }

      const pointer = pointerCurrentRef.current;
      const pointerTarget = pointerTargetRef.current;
      pointer.x += (pointerTarget.x - pointer.x) * 0.075;
      pointer.y += (pointerTarget.y - pointer.y) * 0.075;

      const depthStrength = folioOpen ? 0 : restStrengthRef.current;
      if (cameraPlane) {
        cameraPlane.style.setProperty("--depth-x", `${(-pointer.x * 5.5 * depthStrength).toFixed(3)}px`);
        cameraPlane.style.setProperty("--depth-y", `${(-pointer.y * 3.8 * depthStrength).toFixed(3)}px`);
        cameraPlane.style.setProperty("--depth-ry", `${(pointer.x * 0.32 * depthStrength).toFixed(3)}deg`);
        cameraPlane.style.setProperty("--depth-rx", `${(-pointer.y * 0.22 * depthStrength).toFixed(3)}deg`);
        cameraPlane.style.setProperty("--depth-scale", String(1.012 + 0.008 * depthStrength));
      }
      if (root) {
        root.style.setProperty("--ui-depth-x", `${(-pointer.x * 7 * depthStrength).toFixed(3)}px`);
        root.style.setProperty("--ui-depth-y", `${(-pointer.y * 5 * depthStrength).toFixed(3)}px`);
        root.style.setProperty("--near-depth-x", `${(-pointer.x * 2.2 * depthStrength).toFixed(3)}px`);
        root.style.setProperty("--near-depth-y", `${(-pointer.y * 1.6 * depthStrength).toFixed(3)}px`);
      }

      if (video && metadataReady && Number.isFinite(video.duration) && !video.seeking && !folioOpen) {
        const desired = clamp(targetTimeRef.current, 0, Math.max(0, video.duration - 0.02));
        const delta = desired - video.currentTime;

        if (Math.abs(delta) > SEEK_EPSILON) {
          try {
            video.currentTime = desired;
          } catch {
            // Preserve the last decoded frame until the media element catches up.
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [metadataReady, folioOpen]);

  const updateBufferLabel = () => {
    const video = videoRef.current;
    const label = loadingRef.current;
    if (!video || !label || !Number.isFinite(video.duration) || video.duration <= 0) return;

    let bufferedEnd = 0;
    for (let index = 0; index < video.buffered.length; index += 1) {
      bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
    }
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

  return (
    <main
      ref={rootRef}
      className="continuous-world"
      data-render-mode="single-master-video"
      data-video-ready={firstFrameReady ? "true" : "false"}
      data-world-sequence="01-10"
      data-active-world="01"
      data-rest-world="none"
      data-folio-open={folioOpen ? "true" : "false"}
      style={{ "--scroll-height": `${SCROLL_HEIGHT}svh`, "--rest-strength": 0 }}
    >
      <div className="continuous-world__stage">
        <div ref={cameraPlaneRef} className="continuous-world__camera-plane">
          <Image
            src={frame01}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={100}
            className={`continuous-world__poster${firstFrameReady ? " is-hidden" : ""}`}
          />

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

          <AmbientRegions videoRefs={ambientVideoRefs} />
        </div>

        <div className="continuous-world__veil" aria-hidden="true" />

        <header className="continuous-world__header">
          <Link href="/redesign" className="continuous-world__brand">Ankit Bhardwaj</Link>
          <nav aria-label="Portfolio navigation">
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <div className="world-index" aria-live="polite">
          <span>{activeWorld.id}</span>
          <i aria-hidden="true" />
          <p>{activeWorld.title}</p>
        </div>

        <div ref={introRef} className="continuous-world__intro">
          <p>Scroll to move through the world</p>
          <h1>Ankit Bhardwaj</h1>
          <span>Software, research, systems — and the questions that came before them.</span>
        </div>

        <div ref={studioRef} className="world-studio-interaction" data-visible="false" style={{ "--studio-strength": 0 }}>
          <button
            type="button"
            className="world-hotspot world-hotspot--studio"
            aria-label="Open selected work in the studio"
            aria-controls="studio-folio"
            onClick={() => setFolioOpen(true)}
            disabled={activeWorldId !== "06"}
          >
            <span className="world-hotspot__mark" aria-hidden="true"><i /></span>
            <span className="world-hotspot__label">Open selected work</span>
          </button>
        </div>

        {!firstFrameReady && !loadError ? (
          <div className="continuous-world__loading" role="status">
            <span /> <b ref={loadingRef}>Preparing motion</b>
          </div>
        ) : null}

        {loadError ? (
          <div className="continuous-world__loading continuous-world__loading--error" role="status">
            Motion is unavailable. The high-resolution opening still remains visible.
          </div>
        ) : null}

        <div className="continuous-world__progress" aria-hidden="true">
          <i ref={progressRef} />
          <span ref={percentRef}>0%</span>
        </div>

        {folioOpen ? <StudioFolio onClose={() => setFolioOpen(false)} /> : null}
      </div>
    </main>
  );
}

export default function PortfolioWorldBase() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.105,
        smoothWheel: true,
        wheelMultiplier: 0.72,
        touchMultiplier: 1,
      }}
    >
      <ContinuousVideoWorld />
    </ReactLenis>
  );
}
