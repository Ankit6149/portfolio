"use client";

import { useEffect, useRef } from "react";
import { SiteChrome } from "../components/site-chrome";
import { CTASection } from "../components/site-sections";
import {
  AgencyHero,
  ImmersiveMotion,
  DesignBrief,
  FeaturedWork,
  CapabilityLanes,
  ProofSignals,
  AgencyFooterCta,
} from "../components/agency-sections";

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    let scrollInstance;

    async function initScroll() {
      if (!scrollRef.current) return;

      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollInstance = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 0.95,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    }

    initScroll();

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, []);

  return (
    <SiteChrome>
      <div className="homepage-shell">
        <div ref={scrollRef} data-scroll-container>
          <AgencyHero />
          <ImmersiveMotion />
          <DesignBrief />
          <FeaturedWork />
          <CapabilityLanes />
          <ProofSignals />
          <AgencyFooterCta />
          <CTASection />
        </div>
      </div>
    </SiteChrome>
  );
}
