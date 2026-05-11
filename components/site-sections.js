"use client";

import Link from "next/link";
import { useState } from "react";
import { submitIntegrationRequest } from "../app/actions";


export function StatusBadge({
  text = "Portfolio Protocol v1.0.0",
  signalColor,
}) {
  return (
    <div className="status-badge">
      <div
        className="status-dot"
        style={
          signalColor
            ? { background: signalColor, borderRadius: "999px" }
            : undefined
        }
      />
      <span>{text}</span>
    </div>
  );
}

export function PageIntro({ code, title, text, aside, visual }) {
  return (
    <section className="page-intro">
      <div className="container intro-grid">
        <div className="page-intro-copy">
          <div>
            <div className="section-kicker">{code}</div>
            <h1 className="page-title">{title}</h1>
          </div>
          <div className="page-summary">
            <p>{text}</p>
            {aside ? <div className="page-summary-note">{aside}</div> : null}
          </div>
        </div>
        {visual ? <div className="intro-visual-wrap">{visual}</div> : null}
      </div>
    </section>
  );
}

export function SectionHead({ title, kicker, code }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {kicker ? <p className="section-kicker">{kicker}</p> : null}
      </div>
      {code ? <div className="section-code">{code}</div> : null}
    </div>
  );
}

export function LinkGrid({ items }) {
  return (
    <div className="link-grid">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="link-card"
          style={{ "--accent": item.color || "var(--coral)" }}
          target="_blank"
          rel="noreferrer"
        >
          <div className="bento-label">{item.label}</div>
          <p className="link-card-copy">{item.note}</p>
        </a>
      ))}
    </div>
  );
}

export function ArchiveTable({ rows, headers, twoColumn }) {
  return (
    <div className="archive-table">
      <div
        className={`archive-row archive-row--head${twoColumn ? " archive-row--two" : ""}`}
      >
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.join("-")}
          className={`archive-row${twoColumn ? " archive-row--two" : ""}`}
        >
          {row.map((cell) => (
            <span key={cell}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function InfoList({ items }) {
  return (
    <div className="info-list">
      {items.map(([label, value]) => (
        <div key={label} className="info-row">
          <span className="info-label">{label}</span>
          <span className="info-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function CTASection() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [statusMessage, setStatusMessage] = useState("");
  const [environment, setEnvironment] = useState("Professional Inquiry");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: "Professional Inquiry", label: "[A] PRODUCTION NODE // PROFESSIONAL INQUIRY", color: "#9EFFBF" },
    { value: "Collaboration", label: "[B] STAGING ENVIRONMENT // PROJECT COLLABORATION", color: "var(--blue)" },
    { value: "Feedback", label: "[C] LOCAL SANDBOX // SYSTEM FEEDBACK", color: "var(--gold)" }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setStatusMessage("");
    
    const formData = new FormData(form);
    formData.append("environment", environment);
    const result = await submitIntegrationRequest(formData).catch((error) => {
      console.error("[SYSTEM_ALPHA] Client action failed:", error);
      return {
        success: false,
        message: "SYSTEM ERROR. INITIALIZATION FAILED.",
      };
    });
    
    if (result.success) {
      setStatus("success");
      setStatusMessage(result.message);
      form.reset();
      return;
    }

    setStatus("error");
    setStatusMessage(result.message || "MAIL RELAY FAILED. CHECK SERVER MAIL LOGS.");
  }

  if (status === "success") {
    return (
      <section className="cta-section">
        <div className="container">
          <div className="cta-card success-state" style={{ borderRadius: 0, border: "1px solid rgba(58, 58, 56, 0.2)", position: "relative" }}>
            <div className="corner-marker top-left" /><div className="corner-marker top-right" /><div className="corner-marker bottom-left" /><div className="corner-marker bottom-right" />
            <div className="cta-head">
              <div className="status-dot success" style={{ background: 'var(--mint)', boxShadow: '0 0 15px var(--mint)' }} />
              <h2 style={{ fontSize: '2.5rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Transmission Received</h2>
              <p style={{ opacity: 0.8, maxWidth: '450px', margin: '1rem auto 0' }}>
                Handshake Protocol Complete. All data packets have been successfully ingested by SYSTEM_ALPHA.
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              margin: '3rem 0', 
              textAlign: 'left', 
              borderTop: '1px solid var(--grid-line)', 
              borderBottom: '1px solid var(--grid-line)' 
            }}>
              <div style={{ padding: '2rem', borderRight: '1px solid var(--grid-line)' }}>
                <span className="info-label" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.7rem', opacity: 0.5 }}>[ LINE_01 ] DIRECT_SYNC</span>
                <p className="bento-body" style={{ margin: 0, fontSize: '1.1rem', color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>+91 9555516408</p>
              </div>
              <div style={{ padding: '2rem' }}>
                <span className="info-label" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.7rem', opacity: 0.5 }}>[ LINE_02 ] MAINFRAME_RELAY</span>
                <p className="bento-body" style={{ margin: 0, fontSize: '1.1rem', color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>ankitbhardwaj80100@gmail.com</p>
              </div>
            </div>

            <div className="success-socials">
              <div className="info-label" style={{ marginBottom: '1.25rem', textAlign: 'center' }}>Social Network Sync</div>
              <div className="social-links" style={{ justifyContent: 'center', gap: '0.5rem' }}>
                <a href="https://github.com/Ankit6149" target="_blank" rel="noreferrer" className="social-pill" style={{ borderRadius: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>GitHub</a>
                <a href="https://www.linkedin.com/in/ankit-bhardwaj-6b9b62221/" target="_blank" rel="noreferrer" className="social-pill" style={{ borderRadius: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>LinkedIn</a>
                <a href="https://leetcode.com/u/ankit_bh_/" target="_blank" rel="noreferrer" className="social-pill" style={{ borderRadius: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>LeetCode</a>
                <a href="https://orcid.org/0009-0005-3408-0058" target="_blank" rel="noreferrer" className="social-pill" style={{ borderRadius: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>ORCID</a>
                <a href="https://www.instagram.com/ankit.bh_/" target="_blank" rel="noreferrer" className="social-pill" style={{ borderRadius: 0, padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Instagram</a>
              </div>
            </div>
            <button className="cta-submit" onClick={() => setStatus("idle")} style={{ marginTop: '3rem', borderRadius: 0 }}>Restart Protocol</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="corner-marker top-left" /><div className="corner-marker top-right" /><div className="corner-marker bottom-left" /><div className="corner-marker bottom-right" />
          <div className="cta-head">
            <h2>System Integration</h2>
            <p>Ready To Initialize Collaboration?</p>
          </div>
          <form className="form-stack" onSubmit={handleSubmit} style={{ opacity: status === "loading" ? 0.7 : 1, pointerEvents: status === "loading" ? 'none' : 'auto' }}>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />
            <div className="field">
              <label htmlFor="operator">Operator Identification</label>
              <input 
                id="operator" 
                name="operator" 
                type="text" 
                placeholder="Enter name or ID" 
                maxLength={80}
                required 
                disabled={status === "loading"}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Terminal Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="address@network.org" 
                maxLength={120}
                required 
                disabled={status === "loading"}
              />
            </div>
            <div className="field">
              <label>Operational Environment</label>
              <div className="custom-select-container" style={{ pointerEvents: status === "loading" ? 'none' : 'auto' }}>
                <div 
                  className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`} 
                  onClick={() => status !== "loading" && setIsDropdownOpen(!isDropdownOpen)}
                  style={{ cursor: status === "loading" ? 'not-allowed' : 'pointer' }}
                >
                  {options.find(opt => opt.value === environment).label}
                </div>
                {isDropdownOpen && status !== "loading" && (
                  <div className="custom-select-menu">
                    {options.map((opt) => (
                      <div 
                        key={opt.value} 
                        className="custom-select-option" 
                        style={{ '--hover-color': opt.color }} 
                        onClick={() => { setEnvironment(opt.value); setIsDropdownOpen(false); }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Transmission Content (Optional)</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Initialize message sequence (Optional)..." 
                rows={4} 
                maxLength={2000}
                style={{ resize: 'none' }} 
                disabled={status === "loading"}
              />
            </div>
            <button type="submit" className="cta-submit" disabled={status === "loading"}>
              {status === "loading" ? "Executing Sequence..." : "Execute Initialization Sequence"}
            </button>
          </form>
          {status === "error" ? (
            <p className="cta-error" role="alert">
              {statusMessage}
            </p>
          ) : null}
          <div className="cta-status">
            <StatusBadge
              text={
                status === "loading"
                  ? "Syncing Terminal..."
                  : status === "error"
                    ? "Relay Requires Attention"
                    : "All Systems Nominal"
              }
              signalColor={status === "loading" ? "#FFC107" : status === "error" ? "#FF6B6B" : "#9EFFBF"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InlineLink({ href, children }) {
  return (
    <Link href={href} className="inline-link">
      {children}
    </Link>
  );
}
