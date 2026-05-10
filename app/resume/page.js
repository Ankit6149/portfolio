import { SiteChrome } from "../../components/site-chrome";
import { ResumePreview, ResumeToolbar } from "../../components/resume-preview";
import { resumeData } from "../../lib/site-data";

export const metadata = {
  title: "Resume | Ankit Bhardwaj",
};

export default function ResumePage() {
  return (
    <SiteChrome>
      <div className="page-main resume-page">
        <section className="resume-shell">
          <div className="container resume-layout">
            <aside className="resume-side">
              <div className="section-kicker">Resume</div>
              <h1 className="resume-side-title">Resume</h1>
              <p>Preview the resume here, then download it in your preferred format.</p>
              <ResumeToolbar resume={resumeData} />
            </aside>

            <article className="resume-preview-frame" aria-label="Resume preview">
              <ResumePreview resume={resumeData} />
            </article>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
