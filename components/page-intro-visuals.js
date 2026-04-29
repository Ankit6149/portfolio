function Frame({ className = "", children, code }) {
  return (
    <div className={`intro-visual ${className}`.trim()} aria-hidden="true">
      <div className="intro-visual__frame">{children}</div>
      {code ? <div className="intro-visual__code">{code}</div> : null}
    </div>
  );
}

export function ProjectsVisual() {
  return (
    <Frame className="intro-visual--projects" code="Case_Grid: P-101">
      <div className="project-visual-stack">
        <div className="project-sheet project-sheet--one" />
        <div className="project-sheet project-sheet--two" />
        <div className="project-sheet project-sheet--three" />
        <div className="project-scanline" />
      </div>
    </Frame>
  );
}

export function ExperienceVisual() {
  return (
    <Frame className="intro-visual--experience" code="Timeline: E-204">
      <div className="experience-axis" />
      <div className="experience-node experience-node--one" />
      <div className="experience-node experience-node--two" />
      <div className="experience-node experience-node--three" />
      <div className="experience-node experience-node--four" />
    </Frame>
  );
}

export function PublicationsVisual() {
  return (
    <Frame className="intro-visual--publications" code="Citation_Ring: R-302">
      <div className="publication-ring publication-ring--outer" />
      <div className="publication-ring publication-ring--inner" />
      <div className="publication-core" />
      <div className="publication-orbit">
        <span className="publication-dot publication-dot--one" />
        <span className="publication-dot publication-dot--two" />
        <span className="publication-dot publication-dot--three" />
      </div>
    </Frame>
  );
}

export function CredentialsVisual() {
  return (
    <Frame className="intro-visual--credentials" code="Credential_Stack: C-118">
      <div className="credential-grid">
        <div className="credential-stamp credential-stamp--one" />
        <div className="credential-stamp credential-stamp--two" />
        <div className="credential-stamp credential-stamp--three" />
        <div className="credential-stamp credential-stamp--four" />
      </div>
      <div className="credential-beam" />
    </Frame>
  );
}

export function LinksVisual() {
  return (
    <Frame className="intro-visual--links" code="Link_Map: N-440">
      <div className="links-hub" />
      <div className="links-node links-node--one" />
      <div className="links-node links-node--two" />
      <div className="links-node links-node--three" />
      <div className="links-node links-node--four" />
      <svg
        className="links-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="50" y1="50" x2="18" y2="20" />
        <line x1="50" y1="50" x2="82" y2="20" />
        <line x1="50" y1="50" x2="80" y2="82" />
        <line x1="50" y1="50" x2="20" y2="84" />
      </svg>
    </Frame>
  );
}

export function AboutVisual() {
  return (
    <Frame className="intro-visual--about" code="Profile_Field: A-009">
      <div className="about-gridline about-gridline--vertical" />
      <div className="about-gridline about-gridline--horizontal" />
      <div className="about-square about-square--one" />
      <div className="about-square about-square--two" />
      <div className="about-square about-square--three" />
    </Frame>
  );
}

export function ContactVisual() {
  return (
    <Frame className="intro-visual--contact" code="Signal_Channel: T-511">
      <div className="contact-wave contact-wave--one" />
      <div className="contact-wave contact-wave--two" />
      <div className="contact-wave contact-wave--three" />
      <div className="contact-target" />
    </Frame>
  );
}
