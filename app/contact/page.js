import { SiteChrome } from "../../components/site-chrome";
import { ContactVisual } from "../../components/page-intro-visuals";
import {
  CTASection,
  InfoList,
  LinkGrid,
  PageIntro,
  SectionHead,
  StatusBadge,
} from "../../components/site-sections";
import { contactChannels, codingProfiles, profileLinks, siteMeta } from "../../lib/site-data";

export const metadata = {
  title: "Contact & Links | Ankit Bhardwaj",
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="Contact / 05"
          title="Contact & Links"
          text="Let's build something great together. Whether you have a project in mind, a full-time opportunity, or just want to chat about tech, I'm always open to connecting."
          aside="Reach out via email or connect with me on any of my professional channels below."
          visual={<ContactVisual />}
        />

        <section className="section section-divider">
          <div className="container dual-panel">
            <div className="panel">
              <div className="bento-label">Availability</div>
              <h3 className="panel-title">Current collaboration status.</h3>
              <StatusBadge text="Open For New Opportunities" signalColor="#9EFFBF" />
              <p className="bento-body" style={{ marginTop: "1.5rem" }}>
                {siteMeta.availability}
              </p>
              <div className="block-stack" style={{ marginTop: "1.5rem" }}>
                <div className="text-block">
                  <div className="info-label">Personal Email</div>
                  <p className="bento-body">{siteMeta.email}</p>
                </div>
                <div className="text-block">
                  <div className="info-label">Company Email</div>
                  <p className="bento-body">{siteMeta.companyEmail}</p>
                </div>
                <div className="text-block">
                  <div className="info-label">Phone</div>
                  <p className="bento-body">{siteMeta.phone}</p>
                </div>
                <div className="text-block">
                  <div className="info-label">Location</div>
                  <p className="bento-body">{siteMeta.location}</p>
                </div>
              </div>
            </div>

            <div className="panel">
              <SectionHead
                title="Channels"
                kicker="Direct & Public"
                code="[A] DIRECT [B] PUBLIC [C] SYNC"
              />
              <InfoList items={contactChannels} />
            </div>
          </div>
        </section>

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Profile Network"
              kicker="Public Destinations"
              code="[01] GITHUB [02] LINKEDIN [03] LEETCODE [04] ORCID"
            />
            <LinkGrid items={profileLinks} />
          </div>
        </section>

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Platform Roles"
              kicker="Each Link Has A Purpose"
              code="[A] CODE [B] CAREER [C] RESEARCH [D] SOC"
            />
            <div className="archive-table">
              <div className="archive-row archive-row--head">
                <span>Platform</span>
                <span>Purpose</span>
              </div>
              {codingProfiles.map(([platform, purpose]) => (
                <div key={platform} className="archive-row archive-row--two">
                  <span>{platform}</span>
                  <span>{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
