import { SiteChrome } from "../../components/site-chrome";
import { ProjectsVisual } from "../../components/page-intro-visuals";
import {
  CTASection,
  PageIntro,
  SectionHead,
} from "../../components/site-sections";
import { ProjectArchive } from "../../components/project-archive";
import { ProjectBackgroundIcons } from "../../components/project-background-icons";
import { featuredProjects, projectArchive } from "../../lib/site-data";

export const metadata = {
  title: "Projects | Ankit Bhardwaj",
};

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="Projects / 01"
          title="Projects"
          text="A curated archive of full stack builds, product interfaces, backend systems, and technical experiments. Click on any project to explore details and source code."
          aside="Featured case studies at the top, full interactive archive below."
          visual={<ProjectsVisual />}
        />

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Featured Case Studies"
              kicker="Deep Work, Not Just Screenshots"
              code="[01] PROBLEM [02] BUILD [03] IMPACT"
            />

            <div className="stacked-projects">
              {featuredProjects.map((project, index) => (
                <article key={project.name} className="feature-strip">
                  <div className="feature-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="feature-body">
                    <div className="bento-label">{project.type}</div>
                    <h2 className="project-title">{project.name}</h2>
                    <p className="project-stack">{project.stack}</p>
                    <p className="bento-body">{project.summary}</p>
                  </div>
                  <div className="feature-side">
                    <div className="info-row">
                      <span className="info-label">Highlights</span>
                    </div>
                    <ul className="bullet-list">
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider">
          <ProjectBackgroundIcons />
          <div className="container">
            <SectionHead
              title="Project Archive"
              kicker="Click Any Row To View Details"
              code="[A] INDEX [B] STATUS [C] STACK"
            />

            <ProjectArchive projects={projectArchive} />
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
