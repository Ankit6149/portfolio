import { SiteChrome } from "../../components/site-chrome";
import { AboutVisual } from "../../components/page-intro-visuals";
import {
  CTASection,
  InfoList,
  PageIntro,
  SectionHead,
} from "../../components/site-sections";
import { aboutBlocks, stackGroups } from "../../lib/site-data";

export const metadata = {
  title: "About | Ankit Bhardwaj",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="About / 04"
          title="About"
          text="As an engineer, I focus on building robust, scalable systems that bridge the gap between elegant interfaces and powerful backends."
          aside="My approach is rooted in clean architecture, performance optimization, and continuous learning."
          visual={<AboutVisual />}
        />

        <section className="section section-divider">
          <div className="container dual-panel">
            <div className="panel">
              <div className="bento-label">Profile Overview</div>
              <h3 className="panel-title">A full stack developer with product and research range.</h3>
              <div className="block-stack">
                {aboutBlocks.map((block) => (
                  <div key={block.label} className="text-block">
                    <div className="info-label">{block.label}</div>
                    <p className="bento-body">{block.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel">
              <div className="bento-label">Core Stack</div>
              <h3 className="panel-title">The tools and layers you work across.</h3>
              <InfoList items={stackGroups} />
            </div>
          </div>
        </section>

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Working Style"
              kicker="My Engineering Philosophy"
              code="[01] SCALABLE [02] EFFICIENT [03] USER-CENTRIC"
            />
            <div className="panel panel--bordered">
              <p className="bento-body">
                I believe in shipping software that not only works flawlessly but is built to scale. 
                Whether I'm optimizing database queries, integrating machine learning capabilities, or crafting 
                responsive user interfaces, my goal is always to deliver clean, maintainable, and 
                efficient code. I thrive in environments that challenge me to solve complex problems 
                while keeping the end-user experience paramount.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
