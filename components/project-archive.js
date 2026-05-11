"use client";

import { useState } from "react";
import { ProjectModal } from "./project-modal";

export function ProjectArchive({ projects }) {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stackFilter, setStackFilter] = useState("all");
  const itemsPerPage = 8;
  const themeColors = ["var(--coral)", "var(--orange)", "var(--mint)", "var(--gold)", "var(--blue)"];
  const stackOptions = Array.from(
    new Set(
      projects.flatMap((project) =>
        project.stack
          .split(/[,/]/)
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const filteredProjects = projects.filter((project) => {
    const haystack = [
      project.id,
      project.name,
      project.stack,
      project.status,
      project.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesStack =
      stackFilter === "all" ||
      project.stack.toLowerCase().includes(stackFilter.toLowerCase());

    return matchesQuery && matchesStatus && matchesStack;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  function updateFilter(setter) {
    return (event) => {
      setter(event.target.value);
      setCurrentPage(1);
    };
  }

  return (
    <>
      <div className="archive-container">
        <div className="archive-controls">
          <label className="archive-search">
            <span>Search Archive</span>
            <input
              type="search"
              value={query}
              onChange={updateFilter(setQuery)}
              placeholder="Project, stack, status..."
            />
          </label>
          <label className="archive-select">
            <span>Status</span>
            <select value={statusFilter} onChange={updateFilter(setStatusFilter)}>
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label className="archive-select">
            <span>Stack</span>
            <select value={stackFilter} onChange={updateFilter(setStackFilter)}>
              <option value="all">All Stacks</option>
              {stackOptions.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>
          </label>
          <div className="archive-result-count">
            {String(filteredProjects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>
        <div className="archive-table">
          <div className="archive-row archive-row--head">
            <span>ID</span>
            <span>Project</span>
            <span>Stack</span>
            <span>Status</span>
          </div>
          {currentProjects.length > 0 ? currentProjects.map((project, index) => (
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
              <span className="archive-stack-cell">{project.stack}</span>
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
          )) : (
            <div className="archive-empty">No projects match the current filters.</div>
          )}
        </div>
        
        {totalPages > 1 && currentProjects.length > 0 && (
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
