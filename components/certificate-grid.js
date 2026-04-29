"use client";

import { useState } from "react";

export function CertificateGrid({ certificates, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  const categoryCount = (key) =>
    key === "all"
      ? certificates.length
      : certificates.filter((c) => c.category === key).length;

  return (
    <div className="cert-section">
      {/* Category Filter Bar */}
      <div className="cert-filter-bar">
        <button
          className={`cert-filter-btn${activeCategory === "all" ? " is-active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          <span className="cert-filter-label">All</span>
          <span className="cert-filter-count">{categoryCount("all")}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`cert-filter-btn${activeCategory === cat.key ? " is-active" : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <span className="cert-filter-icon">{cat.icon}</span>
            <span className="cert-filter-label">{cat.label}</span>
            <span className="cert-filter-count">{categoryCount(cat.key)}</span>
          </button>
        ))}
      </div>

      {/* Certificate Cards */}
      <div className="cert-grid">
        {filtered.map((cert, i) => (
          <article
            key={cert.credentialId || cert.title}
            className="cert-card"
            style={{
              "--card-accent": cert.color,
              animationDelay: `${i * 60}ms`,
            }}
          >
            <div className="cert-card-accent" />

            {/* Header */}
            <div className="cert-card-header">
              <div className="cert-card-issuer-badge">
                <span className="cert-issuer-dot" />
                {cert.issuer}
              </div>
              {cert.issued && (
                <span className="cert-card-date">{cert.issued}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="cert-card-title">{cert.title}</h3>

            {/* Skills */}
            <div className="cert-card-skills">
              {cert.skills.slice(0, 5).map((skill) => (
                <span key={skill} className="cert-skill-pill">
                  {skill}
                </span>
              ))}
              {cert.skills.length > 5 && (
                <span className="cert-skill-pill cert-skill-more">
                  +{cert.skills.length - 5}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="cert-card-footer">
              {cert.credentialId && (
                <span className="cert-credential-id">
                  ID: {cert.credentialId.length > 18
                    ? cert.credentialId.slice(0, 18) + "…"
                    : cert.credentialId}
                </span>
              )}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="cert-verify-link"
              >
                <span>Verify</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="cert-stats-bar">
        <div className="cert-stat">
          <span className="cert-stat-value">{certificates.length}</span>
          <span className="cert-stat-label">Total Certs</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">
            {[...new Set(certificates.map((c) => c.issuer))].length}
          </span>
          <span className="cert-stat-label">Platforms</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">
            {[...new Set(certificates.flatMap((c) => c.skills))].length}
          </span>
          <span className="cert-stat-label">Unique Skills</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">
            {categories.length}
          </span>
          <span className="cert-stat-label">Domains</span>
        </div>
      </div>
    </div>
  );
}
