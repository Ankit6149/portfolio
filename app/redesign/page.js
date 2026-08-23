"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import frame01 from "../../portfolio-assets/PORTFOLIO_F01_ARRIVAL.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const MANIFEST_URL = "/portfolio-world/frames/master/manifest.json";
const FRAME_BASE = "/portfolio-world/frames/master";
const SCROLL_HEIGHT = 940;
const MAX_DECODED_FRAMES = 96;
const PRELOAD_AHEAD = 24;
const PRELOAD_BEHIND = 8;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function frameUrl(index) {
  return `${FRAME_BASE}/frame-${String(index).padStart(4, "0")}.webp`;
}

function drawCover(ctx, image, width, height, alpha = 1) {
  if (!image?.naturalWidth || !image?.naturalHeight) return;

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
  ctx.restore();
}

function ContinuousFrameWorld() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  const manifestRef = useRef(null);
  const frameCache = useRef(new Map());
  const framePromises = useRef(new Map());
  const targetFrame = useRef(1);
  const renderedFrame = useRef(1);
  const lastWarmCenter = useRef(-999);
  const previousTarget = useRef(1);
  const directionRef = useRef(1);
  const rafRef = useRef(null);
  const dprRef = useRef(1);
  const viewportRef = useRef({ width: 1, height: 1 });

  const [manifest, setManifest] = useState(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useLenis(() => ScrollTrigger.update());

  const loadFrame = useCallback((index, priority = "auto") => {
    const data = manifestRef.current;
    if (!data) return Promise.resolve(null);

    const safeIndex = clamp(index, 1, data.frameCount);
    const cached = frameCache.current.get(safeIndex);
    if (cached?.complete) return Promise.resolve(cached);

    const existing = framePromises.current.get(safeIndex);
    if (existing) return existing;

    const promise = new Promise((resolve) => {
      const image = new window.Image();
      image.decoding = "async";
      image.fetchPriority = priority;
      image.onload = () => {
        frameCache.current.set(safeIndex, image);
        framePromises.current.delete(safeIndex);
        resolve(image);
      };
      image.onerror = () => {
        framePromises.current.delete(safeIndex);
        resolve(null);
      };
      image.src = frameUrl(safeIndex);
    });

    framePromises.current.set(safeIndex, promise);
    return promise;
  }, []);

  const pruneCache = useCallback((center) => {
    const cache = frameCache.current;
    if (cache.size <= MAX_DECODED_FRAMES) return;

    const keep = [...cache.keys()]
      .sort((a, b) => Math.abs(a - center) - Math.abs(b - center))
      .slice(0, MAX_DECODED_FRAMES);
    const keepSet = new Set(keep);

    for (const [key, image] of cache) {
      if (!keepSet.has(key)) {
        image.src = "";
        cache.delete(key);
      }
    }
  }, []);

  const warmFrameWindow = useCallback((center) => {
    const data = manifestRef.current;
    if (!data) return;

    const rounded = Math.round(center);
    if (Math.abs(rounded - lastWarmCenter.current) < 3) return;
    lastWarmCenter.current = rounded;

    const direction = directionRef.current || 1;
    const queue = [rounded, rounded + 1, rounded - 1];

    for (let step = 2; step <= PRELOAD_AHEAD; step += 1) {
      queue.push(rounded + step * direction);
      if (step <= PRELOAD_BEHIND) queue.push(rounded - step * direction);
    }

    for (const index of queue) {
      if (index >= 1 && index <= data.frameCount) loadFrame(index);
    }

    pruneCache(rounded);
  }, [loadFrame, pruneCache]);

  const paint = useCallback((frameValue) => {
    const canvas = canvasRef.current;
    const data = manifestRef.current;
    if (!canvas || !data) return;

    const { width, height } = viewportRef.current;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const dpr = dprRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#0a0d0b";
    ctx.fillRect(0, 0, width, height);

    const safeFrame = clamp(frameValue, 1, data.frameCount);
    const lower = Math.floor(safeFrame);
    const upper = Math.min(data.frameCount, lower + 1);
    const mix = safeFrame - lower;

    const lowerImage = frameCache.current.get(lower);
    const upperImage = frameCache.current.get(upper);

    if (lowerImage?.complete) {
      drawCover(ctx, lowerImage, width, height, 1);
      if (upperImage?.complete && upper !== lower && mix > 0.025) {
        drawCover(ctx, upperImage, width, height, clamp(mix, 0, 1));
      }
      return;
    }

    if (upperImage?.complete) {
      drawCover(ctx, upperImage, width, height, 1);
      return;
    }

    // Never flash black when the user outruns the preload window. Keep the
    // nearest decoded frame on screen until the exact neighbouring frame lands.
    let nearest = null;
    let nearestDistance = Infinity;
    for (const [index, image] of frameCache.current) {
      const distance = Math.abs(index - safeFrame);
      if (image.complete && distance < nearestDistance) {
        nearest = image;
        nearestDistance = distance;
      }
    }
    if (nearest) drawCover(ctx, nearest, width, height, 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(MANIFEST_URL, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Frame manifest returned ${response.status}`);
        return response.json();
      })
      .then(async (data) => {
        if (cancelled) return;
        manifestRef.current = data;
        setManifest(data);
        targetFrame.current = 1;
        renderedFrame.current = 1;

        const first = await loadFrame(1, "high");
        if (cancelled || !first) return;

        setFirstFrameReady(true);
        warmFrameWindow(1);
        paint(1);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [loadFrame, paint, warmFrameWindow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      viewportRef.current = { width, height };
      dprRef.current = dpr;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      paint(renderedFrame.current);
      ScrollTrigger.refresh();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [paint]);

  useEffect(() => {
    const tick = () => {
      const data = manifestRef.current;
      if (data) {
        const target = targetFrame.current;
        const current = renderedFrame.current;
        const distance = target - current;

        // Lenis smooths input; this second, light interpolation smooths the
        // visual playhead itself so wheel ticks never become frame jumps.
        const next = Math.abs(distance) < 0.002 ? target : current + distance * 0.24;
        renderedFrame.current = next;
        directionRef.current = target >= current ? 1 : -1;

        warmFrameWindow(next);
        paint(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paint, warmFrameWindow]);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const data = manifestRef.current;
        if (!data) return;

        const frame = 1 + self.progress * (data.frameCount - 1);
        directionRef.current = frame >= previousTarget.current ? 1 : -1;
        previousTarget.current = frame;
        targetFrame.current = frame;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.max(0.004, self.progress)})`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(self.progress * 100)}%`;
        }
        if (introRef.current) {
          const opacity = clamp(1 - self.progress / 0.11, 0, 1);
          const y = self.progress * -34;
          introRef.current.style.opacity = String(opacity);
          introRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      },
    });

    return () => trigger.kill();
  }, { scope: rootRef, dependencies: [manifest?.frameCount] });

  return (
    <main
      ref={rootRef}
      className="continuous-world"
      data-render-mode="frame-sequence"
      data-sequence-ready={firstFrameReady ? "true" : "false"}
      style={{ "--scroll-height": `${SCROLL_HEIGHT}svh` }}
    >
      <div className="continuous-world__stage">
        <Image
          src={frame01}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={100}
          className={`continuous-world__poster${firstFrameReady ? " is-hidden" : ""}`}
        />

        <canvas
          ref={canvasRef}
          className={`continuous-world__canvas${firstFrameReady ? " is-ready" : ""}`}
          aria-label="A continuous cinematic journey through Ankit Bhardwaj's portfolio world"
        />

        <div className="continuous-world__veil" aria-hidden="true" />

        <header className="continuous-world__header">
          <Link href="/redesign" className="continuous-world__brand">Ankit Bhardwaj</Link>
          <nav aria-label="Portfolio navigation">
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <div ref={introRef} className="continuous-world__intro">
          <p>Scroll to move through the world</p>
          <h1>Ankit Bhardwaj</h1>
          <span>Software, research, systems — and the questions that came before them.</span>
        </div>

        {!firstFrameReady && !loadError ? (
          <div className="continuous-world__loading" role="status">
            <span /> Preparing the journey
          </div>
        ) : null}

        {loadError ? (
          <div className="continuous-world__loading continuous-world__loading--error" role="status">
            Motion assets are unavailable. The still experience remains usable.
          </div>
        ) : null}

        <div className="continuous-world__progress" aria-hidden="true">
          <i ref={progressRef} />
          <span ref={percentRef}>0%</span>
        </div>
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
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.05,
      }}
    >
      <ContinuousFrameWorld />
    </ReactLenis>
  );
}
