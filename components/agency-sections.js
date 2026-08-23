import Link from "next/link";
import {
  launchHero,
  caseStudies,
  buildLanes,
  proofSignals,
  designRules,
} from "../lib/velocity-data";

export function AgencyHero() {
  return (
    <section className="hero-section" id="hero" data-scroll-section>
      <div className="hero-copy" data-scroll data-scroll-speed="0.8" data-scroll-sticky data-scroll-target="#hero">
        <span className="eyebrow">A digital studio for ambitious product systems</span>
        <h1>Design that elevates your digital presence.</h1>
        <p>
          A homepage that reads like a modern brand experience — bold, clear, and built with performance in mind.
          This is the start of a portfolio shaped like a launch-ready digital product.
        </p>

        <div className="hero-actions">
          <Link href="/projects" className="button button-primary">
            View work
          </Link>
          <Link href="/contact" className="button button-secondary">
            Connect
          </Link>
        </div>

        <div className="hero-notice">
          <span>BRAND SYSTEMS</span>
          <span>AGENCY QUALITY</span>
          <span>BUILD MOMENTUM</span>
        </div>
      </div>

      <aside className="hero-aside" data-scroll data-scroll-speed="1.2">
        <div className="hero-aside__card">
          <p>Selected signal</p>
          <h2>Fast first. Deliberate second.</h2>
          <p>
            Web experiences that are designed for clarity, engineered for speed,
            and tuned to retain attention through motion and meaning.
          </p>
        </div>

        <div className="hero-aside__grid">
          {proofSignals.slice(0, 3).map(([value, label]) => (
            <div key={label} className="hero-aside__stat">
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </aside>

      <div className="hero-scene" data-scroll data-scroll-speed="1.2">
        <div className="hero-scene__backdrop" />
        <div className="hero-scene__terrain" />
        <div className="hero-scene__igloo" />
        <div className="hero-scene__halo" />
        <div className="hero-scene__panel hero-scene__panel--left">Creative systems</div>
        <div className="hero-scene__panel hero-scene__panel--right">Motion-led experiences</div>
      </div>
    </section>
  );
}

export function ImmersiveMotion() {
  return (
    <section className="section-block section-immersive" data-scroll-section>
      <div className="immersive-shell">
        <div className="immersive-copy" data-scroll data-scroll-speed="0.85">
          <p className="section-label">00 / Immersion</p>
          <h2>A motion-led launch that feels cinematic.</h2>
          <p>
            The scroll is longer, the transitions are softer, and every section feels like an unfolding chapter of a high-end product story.
          </p>
        </div>

        <div className="immersive-stack">
          <div className="immersive-card immersive-card--left" data-scroll data-scroll-speed="1.1">
            <span className="immersive-pill">Visual systems</span>
            <strong>Layered geometry, soft gradients, and elegant motion.</strong>
            <p>Content builds in dimensional space, with cards that drift, glow, and shift as you scroll.</p>
          </div>

          <div className="immersive-card immersive-card--right" data-scroll data-scroll-speed="0.95">
            <span className="immersive-pill">Performance first</span>
            <strong>Speed, clarity, and premium pacing.</strong>
            <p>Each screen feels like a deliberate step in a curated flow — designed to retain attention and communicate ambition.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignBrief() {
  return (
    <section className="section-block section-grid section-grid--rules" data-scroll-section>
      <div className="section-copy" data-scroll data-scroll-speed="0.7">
        <p className="section-label">01 / Purpose</p>
        <h2>Each section exists to move a brand forward.</h2>
        <p>
          The homepage is rebuilt as an experience, not a biography. It leads with
          impact, defines service direction clearly, and makes contact the natural next step.
        </p>
      </div>

      <div className="rule-stack" data-scroll data-scroll-speed="0.9">
        {designRules.map((rule, index) => (
          <div key={rule} className="rule-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{rule}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="section-block section-featured" data-scroll-section>
      <div className="section-head" data-scroll data-scroll-speed="0.7">
        <div>
          <p className="section-label">02 / Work</p>
          <h2>Recent launches with a refined product edge.</h2>
        </div>
        <Link href="/projects" className="section-link">
          Explore full archive
        </Link>
      </div>

      <div className="featured-grid">
        {caseStudies.map((project, index) => (
          <article key={project.id} className={`featured-card featured-card--${index}`} data-scroll data-scroll-speed="0.9">
            <div className="featured-card__meta">
              <span>{project.type}</span>
              <strong>{project.name}</strong>
            </div>
            <p>{project.summary}</p>
            <div className="featured-card__footer">
              <span>{project.stack}</span>
              <span>{project.id}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CapabilityLanes() {
  return (
    <section className="section-block section-grid--lanes" data-scroll-section>
      <div className="section-copy" data-scroll data-scroll-speed="0.7">
        <p className="section-label">03 / Capabilities</p>
        <h2>Systems built for product, AI, and operational growth.</h2>
        <p>
          The homepage now carries a confident services section that shows what
          the work actually delivers, not just what it looks like.
        </p>
      </div>

      <div className="lane-stack" data-scroll data-scroll-speed="0.9">
        {buildLanes.map((lane, index) => (
          <article key={lane.label} className="lane-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{lane.label}</strong>
              <p>{lane.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProofSignals() {
  return (
    <section className="section-block section-proof" data-scroll-section>
      <div className="section-head" data-scroll data-scroll-speed="0.7">
        <div>
          <p className="section-label">04 / Proof</p>
          <h2>Signals that make the homepage feel grounded and real.</h2>
        </div>
      </div>

      <div className="proof-grid proof-grid--wide">
        {proofSignals.map(([value, label]) => (
          <div key={label} className="proof-card proof-card--wide" data-scroll data-scroll-speed="0.8">
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AgencyFooterCta() {
  return (
    <section className="section-block section-cta" data-scroll-section>
      <div className="cta-copy" data-scroll data-scroll-speed="0.8">
        <p className="section-label">05 / Get in touch</p>
        <h2>Ready to build a premium web experience?</h2>
        <p>
          Tell me about the project, the goals, and the audience. I’ll translate it into
          a digital experience that feels designed and engineered from the first interaction.
        </p>
      </div>
      <Link href="/contact" className="button button-primary button-large" data-scroll data-scroll-speed="0.9">
        Start a project
      </Link>
    </section>
  );
}
