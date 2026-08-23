import Link from "next/link";
import { buildLanes, caseStudies, designRules, proofSignals } from "../lib/velocity-data";

export function RouteOverview() {
  return (
    <section className="launch-section launch-section--index">
      <div className="container launch-index">
        <div className="launch-section__head">
          <p className="launch-kicker">01 / Performance Brief</p>
          <h2>Fast first, expressive second.</h2>
        </div>

        <div className="launch-rules">
          {designRules.map((rule, index) => (
            <div key={rule} className="launch-rule">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissionDeck() {
  return (
    <section className="launch-section launch-section--cases">
      <div className="container launch-section__head launch-section__head--wide">
        <p className="launch-kicker">02 / Selected Work</p>
        <h2>Three builds with enough range to show the system.</h2>
        <Link href="/projects" className="launch-text-link">
          Open archive
        </Link>
      </div>

      <div className="container launch-case-grid">
        {caseStudies.map((study) => (
          <article
            key={study.id}
            className={`launch-case launch-case--${study.palette}`}
          >
            <div className="launch-case__media" aria-hidden="true">
              <div className="launch-case__mesh" />
              <span>{study.id}</span>
            </div>
            <div className="launch-case__body">
              <p>{study.type}</p>
              <h3>{study.name}</h3>
              <span>{study.stack}</span>
              <p>{study.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SystemModules() {
  return (
    <section className="launch-section launch-section--lanes">
      <div className="container launch-lanes">
        <div className="launch-section__head">
          <p className="launch-kicker">03 / Capability Lanes</p>
          <h2>The work is grouped by what it can actually do.</h2>
        </div>

        <div className="launch-lane-list">
          {buildLanes.map((lane, index) => (
            <article key={lane.label} className="launch-lane">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{lane.label}</h3>
              <p>{lane.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperatorProfile() {
  return (
    <section className="launch-section launch-section--manifesto">
      <div className="container launch-manifesto">
        <p className="launch-kicker">04 / Builder Manifesto</p>
        <h2>
          I want the site to feel engineered: beautiful, quick, and clear under
          pressure.
        </h2>
        <p>
          The next layers can add interactive WebGL, richer motion, or video,
          but the base experience should already feel complete without waiting
          for a single heavy asset. That gives us room to get ambitious without
          breaking the page.
        </p>
        <div className="launch-manifesto__actions">
          <Link href="/about" className="launch-button launch-button--light">
            About Me
          </Link>
          <Link href="/resume" className="launch-button launch-button--ghost">
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}

export function VelocityMetrics() {
  return (
    <section className="launch-section launch-section--proof">
      <div className="container launch-proof">
        <div className="launch-section__head">
          <p className="launch-kicker">05 / Proof Signals</p>
          <h2>Numbers stay static on load, so the page stays instant.</h2>
        </div>

        <div className="launch-proof-grid">
          {proofSignals.map(([value, label]) => (
            <div key={label} className="launch-proof-card">
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
