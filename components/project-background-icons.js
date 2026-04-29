"use client";

import { techIcons } from "../lib/site-data";
import { Icon } from "@iconify/react";

export function ProjectBackgroundIcons() {
  // We'll use a subset of icons to keep it elegant and not too crowded
  const displayIcons = techIcons.filter((_, i) => i % 2 === 0);

  return (
    <div className="project-bg-icons-layer" aria-hidden="true">
      {displayIcons.map((tech, i) => {
        // Deterministic "randomness" based on index to avoid hydration mismatches
        const top = (i * 17) % 90;
        const left = (i * 31) % 90;
        const rotate = (i * 45) % 360;
        const size = 40 + (i % 4) * 20;

        return (
          <div
            key={`${tech.label}-${i}`}
            className="bg-floating-icon"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            <Icon icon={tech.icon} width={size} height={size} />
          </div>
        );
      })}
    </div>
  );
}
