"use client";

import Image from "next/image";

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-corner corner-tl" />
        <div className="modal-corner corner-tr" />
        <div className="modal-corner corner-bl" />
        <div className="modal-corner corner-br" />

        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          x
        </button>

        <div className="project-modal-info">
          <div className="project-modal-header">
            <div className="bento-label" style={{ color: project.color || "var(--coral)" }}>
              {project.status || "Active"} | {project.id || "FT"}
            </div>
            <h2 className="project-modal-title">{project.name}</h2>
            <p className="project-stack">{project.stack}</p>
          </div>

          <div className="project-modal-body">
            <p className="bento-body">{project.description || project.summary}</p>
          </div>

          <div className="project-modal-links" style={{ marginTop: "2rem" }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="button button-solid"
              >
                View Code -&gt;
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                Open Live Site -&gt;
              </a>
            )}
          </div>
        </div>

        <div className={`project-modal-preview ${project.live && !project.previewImage ? 'is-live' : 'is-static'}`}>
          {project.previewImage ? (
            <div className="preview-image-wrap">
              <Image
                src={project.previewImage}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="preview-image"
              />
            </div>
          ) : project.live ? (
            <div className="iframe-wrapper">
              <iframe 
                src={project.live} 
                title={`${project.name} preview`}
                loading="lazy"
              />
              <button
                type="button"
                className="iframe-overlay-click"
                aria-label={`Open ${project.name} live preview in a new tab`}
                onClick={() =>
                  window.open(project.live, "_blank", "noopener,noreferrer")
                }
              />
            </div>
          ) : (
            <div className="project-modal-placeholder">
              [ PREVIEW_UNAVAILABLE ]
              <br />
              Repo: {project.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
