import Link from "next/link";
import { launchHero } from "../lib/velocity-data";

export function VelocityHero() {
  return (
    <section className="launch-hero">
      <div className="launch-noise" aria-hidden="true" />

      <div className="container launch-hero__grid">
        <div className="launch-hero__copy">
          <p className="launch-eyebrow">{launchHero.eyebrow}</p>
          <h1>{launchHero.title}</h1>
          <p className="launch-lead">{launchHero.lead}</p>

          <div className="launch-actions">
            <Link href="/projects" className="launch-button launch-button--dark">
              View Projects
            </Link>
            <Link href="/contact" className="launch-button">
              Start a Build
            </Link>
          </div>
        </div>

        <div className="launch-visual" aria-label="Abstract project motion board">
          <div className="launch-visual__rail">
            <span>AI</span>
            <span>WEB</span>
            <span>OPS</span>
            <span>R&D</span>
          </div>
          <div className="launch-orbit launch-orbit--one" />
          <div className="launch-orbit launch-orbit--two" />
          <div className="launch-frame launch-frame--a">
            <span>CardXpert</span>
          </div>
          <div className="launch-frame launch-frame--b">
            <span>Automation</span>
          </div>
          <div className="launch-frame launch-frame--c">
            <span>Research</span>
          </div>
          <div className="launch-core">
            <span>AB</span>
          </div>
        </div>
      </div>

      <div className="container launch-strip" aria-label="Primary capabilities">
        {launchHero.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
