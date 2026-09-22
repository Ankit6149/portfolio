"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const work = [
  {
    no: "01",
    title: "Skribly",
    eyebrow: "Contextual desktop notes",
    thought: "A thought should be able to return with the place that made it matter.",
    body: "A Windows-first note system built around app context, overlays, shortcuts, handwriting, local persistence and keeping the tool present without letting it take over the screen.",
    tags: ["Tauri", "React", "Rust", "Windows APIs"],
    href: "https://github.com/Ankit6149/skribly",
    art: "note"
  },
  {
    no: "02",
    title: "SignalFlow Studio",
    eyebrow: "Evidence-aware content systems",
    thought: "Generation becomes useful when the source, the judgment and the final decision stay visible.",
    body: "A multi-stage studio for mixed context, model choice, editable outputs, review and publishing handoffs — designed around preserving evidence instead of hiding it behind automation.",
    tags: ["Next.js", "LLM integrations", "Product systems"],
    href: "https://github.com/Ankit6149/SignalFlow-Studio",
    art: "flow"
  },
  {
    no: "03",
    title: "Emotion-H Net",
    eyebrow: "Published EEG research",
    thought: "Before a model can learn from a signal, the signal has to become a useful representation.",
    body: "Emotion classification on DEAP using engineered EEG features, recursive feature elimination and a lightweight four-encoder Transformer architecture.",
    tags: ["PyTorch", "Transformers", "EEG", "ICDSA 2025"],
    href: "https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18",
    art: "signal"
  }
];

const practices = [
  ["Observe", "Look closely before deciding what the problem is."],
  ["Connect", "Move between biology, signals, interfaces and systems."],
  ["Build", "Turn the useful part of an idea into something tangible."],
  ["Refine", "Let testing, friction and real use reshape the work."]
];

function PainterlyField({ variant = "hero" }) {
  return (
    <svg className={"paint-field paint-field--" + variant} viewBox="0 0 1400 900" aria-hidden="true">
      <defs>
        <linearGradient id={"forest-" + variant} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e7efe7" stopOpacity=".18" />
          <stop offset=".38" stopColor="#789a82" stopOpacity=".65" />
          <stop offset=".72" stopColor="#245f58" stopOpacity=".92" />
          <stop offset="1" stopColor="#103f3a" />
        </linearGradient>
        <linearGradient id={"rose-" + variant} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7d9d3" />
          <stop offset=".5" stopColor="#efa3ae" />
          <stop offset="1" stopColor="#d9778e" />
        </linearGradient>
        <filter id={"ink-" + variant}>
          <feTurbulence type="fractalNoise" baseFrequency=".012 .035" numOctaves="3" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <filter id={"soft-" + variant}>
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <g filter={"url(#ink-" + variant + ")"} opacity=".98">
        <path d="M535 34C760 12 1030 88 1220 252c124 107 180 231 180 432 0 116-33 185-99 216H710c-120-52-210-124-278-223-85-122-128-252-124-388 4-112 65-194 227-255Z" fill={"url(#forest-" + variant + ")"} />
        <path d="M322 641C473 518 610 460 769 455c176-6 318 61 520 248-165-46-323-44-463 13-136 55-284 96-504 90-63-2-116-12-159-30 56-34 109-79 159-135Z" fill="#f2b3bc" opacity=".56" />
        <path d="M418 548c190-145 352-180 515-105 130 60 239 94 405 87-180 81-354 115-515 103-161-11-276-40-405-85Z" fill="#f7dfd3" opacity=".58" />
        <path d="M716 278c110-108 221-146 332-114 89 25 151 78 219 171-105-46-204-48-297-7-93 42-178 39-254-50Z" fill="#8eaa8b" opacity=".74" />
      </g>

      <g fill="none" stroke="#c7a664" strokeWidth="2" opacity=".68">
        <path d="M1265 58C1120 144 1005 235 907 356 821 463 757 582 651 742" />
        <path d="M1378 203c-165 35-287 108-391 218-87 92-153 188-223 326" />
        <path d="M1180 22c-84 121-175 192-310 251" />
      </g>

      <g fill={"url(#rose-" + variant + ")"} opacity=".94">
        <path d="M1120 141c40-54 91-43 95 3-33 27-66 26-95-3Z" />
        <path d="M1184 176c38-42 82-23 73 17-29 19-57 13-73-17Z" />
        <path d="M1016 280c39-59 94-48 95-1-32 29-64 29-95 1Z" />
        <path d="M1079 314c43-45 89-19 77 22-34 18-61 10-77-22Z" />
        <path d="M901 430c34-47 80-36 82 4-27 24-54 22-82-4Z" />
        <path d="M791 572c35-52 84-43 89-1-28 28-58 28-89 1Z" />
      </g>

      <g fill="#d8e1bf">
        <path d="M1024 248c48-59 100-66 139-35-40 48-85 60-139 35Z" />
        <path d="M938 356c43-69 96-84 143-54-34 55-82 73-143 54Z" />
        <path d="M848 483c-3-66 27-104 72-106 3 53-21 88-72 106Z" />
        <path d="M730 621c49-52 99-57 136-25-42 40-86 49-136 25Z" />
      </g>

      <path d="M330 692C532 568 661 548 837 576c180 29 293 92 486 136" fill="none" stroke="#fff8ee" strokeWidth="78" strokeLinecap="round" opacity=".20" filter={"url(#soft-" + variant + ")"} />
    </svg>
  );
}

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => <span key={i} className={"petal petal-" + (i + 1)} />)}
    </div>
  );
}

function MiniArt({ type }) {
  if (type === "note") {
    return (
      <div className="mini-art mini-art--note" aria-hidden="true">
        <span className="paper paper-a">remember why</span>
        <span className="paper paper-b">same place</span>
        <i className="orbit" />
      </div>
    );
  }
  if (type === "flow") {
    return (
      <div className="mini-art mini-art--flow" aria-hidden="true">
        <div className="flow-line">
          <span>context</span><i /><span>model</span><i /><span>review</span><i /><span>ship</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mini-art mini-art--signal" aria-hidden="true">
      <svg viewBox="0 0 720 260" preserveAspectRatio="none">
        <path d="M0 145 C45 145 62 75 108 75 S160 205 213 205 268 105 324 105 377 160 428 160 483 48 539 48 595 194 646 194 686 125 720 125" />
        <path className="soft" d="M0 171 C73 119 98 205 166 154 S281 84 354 146 446 211 520 142 628 91 720 161" />
      </svg>
      <span>86.82%</span>
    </div>
  );
}

export default function PortfolioV1() {
  const root = useRef(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.utils.toArray("[data-float]").forEach((el) => {
      const amount = Number(el.dataset.float || 0);
      gsap.to(el, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(el, { y: 44, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: .9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    gsap.utils.toArray(".work-row").forEach((row) => {
      gsap.fromTo(row.querySelector(".work-ghost"), { xPercent: -5 }, {
        xPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 1 }
      });
    });
  }, { scope: root });

  return (
    <div ref={root} className="v1">
      <header className="v1-nav">
        <a href="#top" className="brand"><span>AB</span><b>Ankit Bhardwaj</b></a>
        <nav aria-label="Primary navigation">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#beyond">Beyond</a>
        </nav>
        <a className="connect" href="mailto:ankitbhardwaj80100@gmail.com">Let&apos;s connect <span>→</span></a>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="texture" />
          <div className="hero-art" data-float="-8"><PainterlyField variant="hero" /></div>
          <Petals />

          <div className="hero-copy">
            <p className="micro reveal">Living systems · signals · software · making</p>
            <h1 className="reveal">Curiosity is<br />the <em>thread.</em></h1>
            <p className="hero-intro reveal">
              I started by wanting to understand how living things sense, adapt and stay coordinated.
              Instrumentation gave those questions another language. Software became a place to build with them.
            </p>
            <div className="hero-actions reveal">
              <a href="#story" className="primary">Follow the story <span>↓</span></a>
              <a href="#work" className="quiet">Selected work <span>↘</span></a>
            </div>
          </div>

          <aside className="hero-quote reveal">
            <p>Questions came before code.</p>
            <span>They still do.</span>
          </aside>

          <div className="hero-axis" aria-hidden="true">
            <span>observe</span><i /><span>connect</span><i /><span>build</span>
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-art" data-float="7"><PainterlyField variant="story" /></div>
          <div className="section-no">01</div>
          <div className="story-copy reveal">
            <p className="micro">Where it began</p>
            <h2>The medium changed.<br /><em>The questions kept moving.</em></h2>
            <p>
              Biology made me interested in systems before I knew that word would become important.
              Instrumentation &amp; Control brought signals, feedback, noise and changing states into view.
              Software widened the canvas: interfaces, APIs, automation, AI, desktop behaviour and products.
            </p>
            <p>
              What connects them is not a single technology. It is the habit of looking for relationships,
              understanding what changes when one part moves, and turning that understanding into something useful.
            </p>
          </div>

          <div className="practice-grid">
            {practices.map(([title, body], index) => (
              <article key={title} className="practice reveal">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-head">
          <div className="section-no">02</div>
          <p className="micro reveal">Selected work</p>
          <h2 className="reveal">Ideas become interesting<br /><em>when they have to work.</em></h2>
          <div className="work-head-art" data-float="-7"><PainterlyField variant="work" /></div>
        </section>

        <section className="work-list" aria-label="Selected projects">
          {work.map((item) => (
            <article className="work-row" key={item.title}>
              <div className="work-ghost" aria-hidden="true">{item.title}</div>
              <div className="work-index">{item.no}</div>
              <div className="work-copy reveal">
                <p className="micro">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <blockquote>{item.thought}</blockquote>
                <p>{item.body}</p>
                <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a href={item.href} target="_blank" rel="noreferrer">Inspect the work <span>↗</span></a>
              </div>
              <MiniArt type={item.art} />
            </article>
          ))}
        </section>

        <section id="research" className="research">
          <div className="research-art" data-float="9"><PainterlyField variant="research" /></div>
          <div className="section-no">03</div>
          <div className="research-copy reveal">
            <p className="micro">Research · Emotion-H Net</p>
            <h2>Biology and software<br /><em>met again in a signal.</em></h2>
            <p>
              EEG emotion recognition on the DEAP dataset using engineered features, recursive feature elimination
              and a lightweight Transformer architecture. The work was published in Springer LNNS after ICDSA 2025.
            </p>
            <div className="metrics">
              <div><strong>86.82%</strong><span>Test accuracy</span></div>
              <div><strong>0.977</strong><span>AUROC</span></div>
              <div><strong>164</strong><span>Selected features</span></div>
            </div>
            <a href="https://link.springer.com/chapter/10.1007/978-3-032-15407-1_18" target="_blank" rel="noreferrer">
              Read the publication <span>↗</span>
            </a>
          </div>
        </section>

        <section id="beyond" className="beyond">
          <div className="beyond-art" data-float="-6"><PainterlyField variant="beyond" /></div>
          <Petals />
          <div className="section-no">04</div>
          <div className="beyond-copy reveal">
            <p className="micro">Beyond output</p>
            <h2>Not everything needs<br />to become a project.</h2>
            <p>
              Drawing and painting, music, basketball, biology, nature, architecture, culture and questions about life
              sit beside the engineering work. Some change how I notice rhythm, movement, structure and detail.
              Some are simply parts of living.
            </p>
          </div>
          <div className="beyond-words" aria-hidden="true">
            <span>sketch</span><span>play</span><span>listen</span><span>observe</span>
          </div>
        </section>

        <section className="closing">
          <p className="script">still curious</p>
          <p className="micro">Current chapter</p>
          <h2>The questions continue.</h2>
          <p>
            I&apos;m building software across product interfaces, backend behaviour, data, integrations and automation —
            while continuing the research, practice and experiments that brought me here.
          </p>
          <div className="closing-links">
            <a href="https://github.com/Ankit6149" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ankit-bhardwaj-6b9b62221/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://orcid.org/0009-0005-3408-0058" target="_blank" rel="noreferrer">ORCID ↗</a>
            <a href="mailto:ankitbhardwaj80100@gmail.com">Email ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Ankit Bhardwaj</span>
        <span>V1 · painterly editorial study</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
