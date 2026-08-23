import { techIcons } from "../lib/site-data";

export function TechStrip() {
  const duplicatedIcons = [...techIcons, ...techIcons];

  return (
    <section className="tech-strip" aria-label="Technology stack" style={{ marginBottom: "5rem" }}>
      <div className="tech-strip-inner">
        <div className="tech-strip-label tech-strip-label--left">
          <span>Core Stack</span>
        </div>

        <div className="tech-strip-overflow">
          <div className="tech-strip-track">
            {duplicatedIcons.map((tech, i) => (
              <div key={`${tech.label}-${i}`} className="tech-strip-item">
                <span className="tech-strip-item-mark" aria-hidden="true">
                  {tech.label.slice(0, 2).toUpperCase()}
                </span>
                <span className="tech-strip-item-label">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-strip-label tech-strip-label--right">
          <span>[ 43+ TECHNOLOGIES ]</span>
        </div>
      </div>
    </section>
  );
}
