"use client";

import Link from "next/link";
import { SiteChrome } from "../components/site-chrome";
import {
  CTASection,
  LinkGrid,
  SectionHead,
  StatusBadge,
} from "../components/site-sections";
import { LiveStats } from "../components/live-stats";
import {
  capabilityCards,
  featuredProjects,
  profileLinks,
  siteMeta,
  projectArchive,
} from "../lib/site-data";
import { useState } from "react";
import { ProjectModal } from "../components/project-modal";

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-core">
        <div className="core-ring core-ring--1" />
        <div className="core-ring core-ring--2" />
        <div className="core-ring core-ring--3" />
      </div>

      <div className="visual-orbit visual-orbit--slow">
        <div
          className="orbit-node node--coral"
          style={{ top: "0", left: "50%" }}
        />
      </div>

      <div className="visual-orbit visual-orbit--fast">
        <div
          className="orbit-node node--mint"
          style={{ bottom: "20%", right: "10%" }}
        />
        <div
          className="orbit-node node--gold"
          style={{ top: "20%", left: "10%" }}
        />
      </div>

      <svg className="visual-lines" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--forest)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#line-grad)"
          strokeWidth="0.5"
          fill="none"
        />
        <line
          x1="100"
          y1="100"
          x2="180"
          y2="40"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="100"
          x2="20"
          y2="150"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="100"
          x2="160"
          y2="160"
          stroke="var(--forest)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      </svg>

      <div className="visual-data-label">SYS_READY: A-001</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.js file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
