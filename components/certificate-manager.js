"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-certificates";

const emptyForm = {
  title: "",
  issuer: "",
  year: "",
  link: "",
};

export function CertificateManager() {
  const [form, setForm] = useState(emptyForm);
  const [certificates, setCertificates] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {}

    return [];
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
  }, [certificates]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.issuer.trim() || !form.year.trim()) {
      return;
    }

    setCertificates((current) => [
      {
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        year: form.year.trim(),
        link: form.link.trim(),
      },
      ...current,
    ]);

    setForm(emptyForm);
  }

  function handleRemove(indexToRemove) {
    setCertificates((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  }

  return (
    <section className="section section-divider">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Certificate Input</h2>
            <p className="section-kicker">Frontend-only local browser storage</p>
          </div>
          <div className="section-code">
            [FORM] ADD
            <br />
            [LOCAL] SAVE
          </div>
        </div>

        <div className="dual-panel">
          <div className="panel">
            <form className="form-stack" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="certificate-title">Certificate Title</label>
                <input
                  id="certificate-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="AWS Cloud Practitioner"
                />
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="certificate-issuer">Issuer</label>
                  <input
                    id="certificate-issuer"
                    name="issuer"
                    type="text"
                    value={form.issuer}
                    onChange={handleChange}
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div className="field">
                  <label htmlFor="certificate-year">Year</label>
                  <input
                    id="certificate-year"
                    name="year"
                    type="text"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="2026"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="certificate-link">Certificate Link</label>
                <input
                  id="certificate-link"
                  name="link"
                  type="text"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <button type="submit" className="button button-solid certificate-submit">
                Add Certificate
              </button>
            </form>
          </div>

          <div className="panel">
            <div className="certificate-list">
              {certificates.map((certificate, index) => (
                <article key={`${certificate.title}-${index}`} className="certificate-card">
                  <div className="certificate-card-head">
                    <div>
                      <div className="bento-label">{certificate.year}</div>
                      <h3 className="certificate-title">{certificate.title}</h3>
                    </div>
                    <button
                      type="button"
                      className="button certificate-remove"
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="project-stack">{certificate.issuer}</p>
                  {certificate.link ? (
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Open certificate
                    </a>
                  ) : (
                    <p className="certificate-empty-link">No certificate link yet</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
