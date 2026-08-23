"use client";

import { useEffect, useRef } from "react";

const sections = [
  {
    id: "services",
    title: "Services built for bold brands",
    description:
      "Design systems, motion-led storytelling, and campaign-driven product launches that feel premium, polished, and engineered for growth.",
    items: [
      "Brand-led digital strategy",
      "Immersive experience design",
      "Frontend performance engineering",
      "Campaign launch & conversion flow",
    ],
  },
  {
    id: "work",
    title: "Featured work in motion",
    description:
      "A curated, high-impact showcase that emphasizes clarity with dynamic visual rhythm and clear messaging.",
    cards: [
      {
        title: "Ignite launch",
        subtitle: "Product campaign website",
        detail: "Bold hero animation and sectional pacing to introduce new digital products with premium polish.",
      },
      {
        title: "Noomo brand studio",
        subtitle: "Creative agency experience",
        detail: "A modular storytelling grid with fast scroll transitions and focused messaging tiers.",
      },
      {
        title: "Pangram platform",
        subtitle: "Design system showcase",
        detail: "A clean editorial layout with animated section reveal and strong typographic hierarchy.",
      },
    ],
  },
  {
    id: "process",
    title: "Process built around movement",
    description:
      "From concept to launch, each phase is designed to keep page flow alive, maintain momentum, and create memorable digital touchpoints.",
    steps: [
      "Research & strategy",
      "Experience architecture",
      "Visual motion design",
      "Development & delivery",
    ],
  },
];

export default function LocomotivePage() {
  const scrollRef = useRef(null);

  useEffect(() => {
    let locomotiveScroll;
    let scrollInstance;

    async function initScroll() {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1.1,
        class: "is-reveal",
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
      scrollInstance = locomotiveScroll;
    }

    if (typeof window !== "undefined") {
      initScroll();
    }

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, []);

  return (
    <main className="locomotive-page">
      <div className="locomotive-header">
        <div className="locomotive-brand">
          <span>LOC</span>
          <strong>STUDIO</strong>
        </div>
        <nav className="locomotive-nav">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      <div ref={scrollRef} data-scroll-container>
        <section className="locomotive-hero" data-scroll-section>
          <div className="locomotive-hero__content" data-scroll data-scroll-speed="0.8">
            <span className="locomotive-eyebrow">Locomotive website demo</span>
            <h1>Build premium digital experiences with motion-led scroll.</h1>
            <p>
              Inspired by agency sites like Igloo, Webisoft, and Pangram Pangram — this page uses smooth scroll,
              soft motion, and bold layout to convey brand clarity.
            </p>
            <div className="locomotive-actions">
              <a href="#work" className="button button-primary">
                View showcase
              </a>
              <a href="#contact" className="button button-secondary">
                Start a project
              </a>
            </div>
          </div>

          <div className="locomotive-hero__visual" data-scroll data-scroll-speed="1.6">
            <div className="hero-matrix">
              <span>STRATEGY</span>
              <span>DESIGN</span>
              <span>PERFORMANCE</span>
              <span>LAUNCH</span>
            </div>
          </div>
        </section>

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="locomotive-section"
            data-scroll-section
          >
            <div className="container">
              <div className="section-heading" data-scroll data-scroll-speed="0.6">
                <p className="section-label">0{index + 1}</p>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              {section.items ? (
                <div className="service-grid">
                  {section.items.map((item) => (
                    <div key={item} className="service-card" data-scroll data-scroll-speed="0.8">
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.cards ? (
                <div className="work-grid">
                  {section.cards.map((card) => (
                    <article key={card.title} className="work-card" data-scroll data-scroll-speed="0.9">
                      <span className="work-pill">{card.subtitle}</span>
                      <h3>{card.title}</h3>
                      <p>{card.detail}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {section.steps ? (
                <div className="process-stack">
                  {section.steps.map((step, stepIndex) => (
                    <div key={step} className="process-step" data-scroll data-scroll-speed="0.8">
                      <span>0{stepIndex + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}

        <section id="contact" className="locomotive-cta" data-scroll-section>
          <div className="container">
            <div className="cta-panel" data-scroll data-scroll-speed="0.7">
              <div>
                <p className="section-label">07</p>
                <h2>Ready to turn motion into momentum?</h2>
              </div>
              <a href="/contact" className="button button-primary button-large">
                Let's talk
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
