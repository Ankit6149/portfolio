import { CredentialsVisual } from "../../components/page-intro-visuals";
import { CertificateGrid } from "../../components/certificate-grid";
import { SiteChrome } from "../../components/site-chrome";
import {
  ArchiveTable,
  CTASection,
  PageIntro,
  SectionHead,
} from "../../components/site-sections";
import { certificates, certificateCategories, codingProfiles } from "../../lib/site-data";

export const metadata = {
  title: "Credentials | Ankit Bhardwaj",
};

export default function CredentialsPage() {
  return (
    <SiteChrome>
      <div className="page-main">
        <PageIntro
          code="Credentials / 03"
          title="Credentials"
          text="Technical certifications and coding profiles organized by domain. Each credential represents a verified skill set across programming, web development, AI/ML, and cloud infrastructure."
          aside={`${certificates.length} verified credentials across ${certificateCategories.length} domains`}
          visual={<CredentialsVisual />}
        />

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Certifications"
              kicker="Verified Credentials"
              code={`[TOTAL] ${certificates.length} CERTS\n[ISSUERS] ${[...new Set(certificates.map(c => c.issuer))].length} PLATFORMS`}
            />

            <CertificateGrid
              certificates={certificates}
              categories={certificateCategories}
            />
          </div>
        </section>

        <section className="section section-divider">
          <div className="container">
            <SectionHead
              title="Coding Profiles"
              kicker="External Validation Points"
              code="[A] PLATFORM [B] FOCUS [C] STATUS"
            />

            <ArchiveTable
              headers={["Platform", "Purpose"]}
              rows={codingProfiles}
              twoColumn
            />
          </div>
        </section>

        <CTASection />
      </div>
    </SiteChrome>
  );
}
