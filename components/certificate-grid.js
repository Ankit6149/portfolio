"use client";

import { useState } from "react";

function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function CertificateGrid({ certificates, categories }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === activeCategory);

  const featured = filtered.slice(0, 3);
  const categoryLabels = new Map(
    categories.map((category) => [category.key, category.label]),
  );
  const rowAccents = ["var(--coral)", "var(--mint)", "var(--gold)", "var(--orange)", "var(--blue)"];
  const filterAccents = new Map([
    ["all", "var(--forest)"],
    ["ai-ml", "var(--coral)"],
    ["web-dev", "var(--mint)"],
    ["programming", "var(--gold)"],
    ["professional", "var(--orange)"],
  ]);

  const categoryCount = (key) =>
    key === "all"
      ? certificates.length
      : certificates.filter((cert) => cert.category === key).length;

  const skillSummary = (cert) => cert.skills.slice(0, 3).join(" / ");

  return (
    <div className="cert-section">
      <div className="cert-filter-bar" aria-label="Certificate categories">
        <button
          type="button"
          className={`cert-filter-btn${activeCategory === "all" ? " is-active" : ""}`}
          style={{ "--filter-accent": filterAccents.get("all") }}
          onClick={() => setActiveCategory("all")}
        >
          <span className="cert-filter-label">All</span>
          <span className="cert-filter-count">{categoryCount("all")}</span>
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.key}
            className={`cert-filter-btn${activeCategory === category.key ? " is-active" : ""}`}
            style={{ "--filter-accent": filterAccents.get(category.key) || "var(--forest)" }}
            onClick={() => setActiveCategory(category.key)}
          >
            <span className="cert-filter-label">{category.label}</span>
            <span className="cert-filter-count">
              {categoryCount(category.key)}
            </span>
          </button>
        ))}
      </div>

      <div className="cert-feature-grid">
        {featured.map((cert, index) => (
          <article
            key={`featured-${cert.credentialId || cert.title}`}
            className="cert-feature-card"
            style={{ "--card-accent": rowAccents[index % rowAccents.length] }}
          >
            <div className="cert-feature-meta">
              <span>{cert.issuer}</span>
              <span>{cert.issued}</span>
            </div>
            <h3 className="cert-feature-title">{cert.title}</h3>
            <p className="cert-feature-skills">{skillSummary(cert)}</p>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="cert-verify-link"
            >
              Verify <ExternalArrow />
            </a>
          </article>
        ))}
      </div>

      <div className="cert-archive" role="table" aria-label="Certificate archive">
        <div className="cert-archive-row cert-archive-head" role="row">
          <span role="columnheader">Certificate</span>
          <span role="columnheader">Issuer</span>
          <span role="columnheader">Domain</span>
          <span role="columnheader">Issued</span>
          <span role="columnheader">Verify</span>
        </div>
        {filtered.map((cert, index) => (
          <div
            key={cert.credentialId || cert.title}
            className="cert-archive-row"
            role="row"
            style={{ "--card-accent": rowAccents[index % rowAccents.length] }}
          >
            <span className="cert-archive-title" role="cell">
              <span>{cert.title}</span>
              <small>{skillSummary(cert)}</small>
            </span>
            <span role="cell">{cert.issuer}</span>
            <span role="cell">{categoryLabels.get(cert.category) || cert.category}</span>
            <span role="cell">{cert.issued}</span>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="cert-archive-link"
              role="cell"
              aria-label={`Verify ${cert.title}`}
            >
              Open <ExternalArrow />
            </a>
          </div>
        ))}
      </div>

      <div className="cert-stats-bar">
        <div className="cert-stat">
          <span className="cert-stat-value">{certificates.length}</span>
          <span className="cert-stat-label">Total Certs</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">
            {[...new Set(certificates.map((cert) => cert.issuer))].length}
          </span>
          <span className="cert-stat-label">Platforms</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">
            {[...new Set(certificates.flatMap((cert) => cert.skills))].length}
          </span>
          <span className="cert-stat-label">Unique Skills</span>
        </div>
        <div className="cert-stat">
          <span className="cert-stat-value">{categories.length}</span>
          <span className="cert-stat-label">Domains</span>
        </div>
      </div>
    </div>
  );
}
