import { SiteChrome } from "../../components/site-chrome";
import { ExperienceVisual } from "../../components/page-intro-visuals";
import {
  CTASection,
  InfoList,
  PageIntro,
  SectionHead,
} from "../../components/site-sections";
import { experienceTimeline, quickFacts } from "../../lib/site-data";

export const metadata = {
  title: "Experience | Ankit Bhardwaj",
};

export default function ExperiencePage() {
  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="Experience / 02"
          title="Experience"
          text="From a B.Tech at NSUT to a software engineering internship at Wyrd Media Labs, my journey spans full-stack product development, competitive programming, and AI-driven systems."
          aside="Currently interning at Wyrd Media Labs while continuing to build independent projects and sharpen algorithmic skills."
          visual={<ExperienceVisual />}
        />

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Timeline"
              kicker="Roles, phases, and progression"
              code="[01] ROLE [02] SCOPE [03] OUTPUT"
            />

            <div className="stacked-projects">
              {experienceTimeline.map((item) => (
                <article key={`${item.period}-${item.role}`} className="feature-strip">
                  <div className="feature-index">{item.period}</div>
                  <div className="feature-body">
                    <div className="bento-label">{item.place}</div>
                    <h2 className="project-title">{item.role}</h2>
                    <p className="bento-body">{item.summary}</p>
                  </div>
                  <div className="feature-side">
                    <ul className="bullet-list">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Quick Facts"
              kicker="Professional snapshot"
              code="[A] ROLE [B] FOCUS [C] LOCALE"
            />
            <div className="panel panel--bordered">
              <InfoList items={quickFacts} />
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
