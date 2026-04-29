"use client";

import { useState } from "react";
import { ProjectModal } from "./project-modal";

export function ProjectArchive({ projects }) {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const themeColors = ["var(--coral)", "var(--mint)", "var(--gold)", "var(--blue)"];

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="archive-container">
        <div className="archive-table">
          <div 
            className="archive-row archive-row--head"
            style={{ 
              position: 'sticky', 
              top: '4rem', 
              zIndex: 10, 
              background: 'var(--paper)',
              paddingTop: '1rem',
              paddingBottom: '1rem'
            }}
          >
            <span>ID</span>
            <span>Project</span>
            <span>Stack</span>
            <span>Status</span>
          </div>
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              className="archive-row archive-row--clickable"
              style={{ "--accent": project.color || themeColors[(startIndex + index) % themeColors.length] }}
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelected(project);
              }}
            >
              <span>{project.id}</span>
              <span>{project.name}</span>
              <span>{project.stack}</span>
              <span
                className={
                  project.status === "Active"
                    ? "status-active"
                    : "status-completed"
                }
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn pagination-btn--prev" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>PREV</span>
            </button>
            
            <div className="pagination-track">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-dot ${currentPage === page ? 'is-active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {String(page).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button 
              className="pagination-btn pagination-btn--next" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <span>NEXT</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selected} 
        onClose={() => setSelected(null)} 
      />
    </>
  );
}
