import { SiteChrome } from "../../components/site-chrome";
import { PublicationsVisual } from "../../components/page-intro-visuals";
import {
  CTASection,
  LinkGrid,
  PageIntro,
  SectionHead,
} from "../../components/site-sections";
import { profileLinks, publications, researchThemes } from "../../lib/site-data";

export const metadata = {
  title: "Publications | Ankit Bhardwaj",
};

export default function PublicationsPage() {
  const scholarlyLinks = profileLinks.filter((item) =>
    ["LinkedIn", "ORCID"].includes(item.label),
  );

  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="Publications / 02"
          title="Publications"
          text="Exploring the intersection of machine learning, algorithm optimization, and modern web technologies through technical research and writing."
          aside="Research interests span AI integration in web applications, algorithmic efficiency, and performance engineering."
          visual={<PublicationsVisual />}
        />

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Publication Log"
              kicker="Research Output"
              code="[01] TITLE
[02] VENUE
[03] LINK"
            />

            <div className="stacked-projects">
              {publications.map((paper, index) => (
                <article key={paper.title} className="feature-strip">
                  <div className="feature-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="feature-body">
                    <div className="bento-label">{paper.year}</div>
                    <h2 className="project-title">{paper.title}</h2>
                    <p className="project-stack">{paper.venue}</p>
                    <p className="bento-body">{paper.summary}</p>
                  </div>
                  <div className="feature-side">
                    <a href={paper.href} className="button">
                      {paper.linkLabel}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider">
          <div className="container dual-panel">
            <div className="panel">
              <div className="bento-label">Research Themes</div>
              <h3 className="panel-title">How the research layer connects back to engineering.</h3>
              <ul className="bullet-list">
                {researchThemes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </div>
            <LinkGrid items={scholarlyLinks} />
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
