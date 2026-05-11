"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Terminal } from "./terminal";
import { SectionHead } from "./site-sections";

export function FloatingTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPing, setShowPing] = useState(true);

  useEffect(() => {
    // Hide initial ping after 8 seconds
    const timer = setTimeout(() => setShowPing(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="floating-terminal-container">
        {showPing && !isOpen && (
          <div className="terminal-bubble">
            [SYSTEM_ALPHA]: ACCESS_POINT_READY. QUERY?
          </div>
        )}
        <button 
          className="floating-terminal-trigger" 
          onClick={() => {
            setIsOpen(true);
            setShowPing(false);
          }}
          aria-label="Access System Alpha Terminal"
        >
          <span className="floating-core-orbit floating-core-orbit--outer" aria-hidden="true" />
          <span className="floating-core-orbit floating-core-orbit--inner" aria-hidden="true" />
          <span className="floating-core-scan" aria-hidden="true" />
          <span className="floating-core-tick floating-core-tick--one" aria-hidden="true" />
          <span className="floating-core-tick floating-core-tick--two" aria-hidden="true" />
          <span className="floating-core-tick floating-core-tick--three" aria-hidden="true" />
          <div className="terminal-ping" />
          <Image
            src="/system-alpha-core.png"
            alt="System Alpha Core"
            width={56}
            height={56}
            className="floating-core-image"
            priority
          />
          <span className="floating-core-status" aria-hidden="true" />
        </button>
      </div>

      {/* Terminal Modal */}
      {isOpen && (
        <div className="terminal-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="terminal-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="terminal-modal-shell">
              <button 
                onClick={() => setIsOpen(false)}
                className="terminal-modal-close"
              >
                [ ESC_TERMINATE ]
              </button>
              <SectionHead
                title="SYSTEM_ALPHA Console"
                kicker="Interactive Command Center"
                code={"[CMD] DIRECT ACCESS\n[AI] GEMMA_3_CORE"}
              />
              <Terminal />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
