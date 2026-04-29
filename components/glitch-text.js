"use client";

import { useEffect, useState } from "react";

export function GlitchText({ text = "GLITCH", className = "" }) {
  const [glitchedText, setGlitchedText] = useState(text);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const interval = setInterval(() => {
      setGlitchedText(
        text
          .split("")
          .map((char, index) => {
            if (Math.random() < 0.1) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join(""),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={`glitch-text ${className}`}>
      <span className="glitch-text-primary">{glitchedText}</span>
      <span className="glitch-text-secondary" aria-hidden="true">
        {glitchedText}
      </span>
      <span className="glitch-text-tertiary" aria-hidden="true">
        {glitchedText}
      </span>
    </div>
  );
}
