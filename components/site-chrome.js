"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, profileLinks, siteMeta } from "../lib/site-data";
import { ThemeToggle } from "./theme-toggle";

function LogoGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M5 18V6h10l4 4v8H5Z" />
      <path d="M15 6v4h4" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.8m12 5.6v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.8A5.3 5.3 0 0 0 18.8 5 4.9 4.9 0 0 0 18.7 1S17.5.7 15 2.4a13.2 13.2 0 0 0-6 0C6.5.7 5.3 1 5.3 1A4.9 4.9 0 0 0 5.2 5 5.3 5.3 0 0 0 3.8 8.4c0 5.2 3.1 6.4 6.1 6.8a3 3 0 0 0-.9 2.3v3.5" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function SiteChrome({ children }) {
  const pathname = usePathname();

  return (
    <main className="page-shell">
      <nav className="site-nav">
        <div className="container nav-row">
          <Link href="/" className="brand">
            <div className="brand-mark">
              <LogoGlyph />
            </div>
            <span className="brand-title">{siteMeta.shortName}</span>
          </Link>

          <div className="nav-links">
            {primaryNav.map(([index, label, href]) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={label}
                  href={href}
                  className={`nav-link${isActive ? " is-active" : ""}`}
                >
                  <span>{index}</span> {label}
                </Link>
              );
            })}
          </div>

          <div className="nav-actions">
            <ThemeToggle />
            <Link href="/credentials" className="button">
              Open Archive
            </Link>
            <Link href="/contact" className="button button-solid">
              Start Project
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer className="footer">
        <div className="container footer-row">
          <div className="footer-brand">
            <div className="brand-mark">
              <LogoGlyph />
            </div>
            <span className="brand-title">{siteMeta.name.toUpperCase()}</span>
          </div>

          <div className="footer-links">
            <Link href="/projects">Projects</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-socials">
            <a
              href={profileLinks[0].href}
              className="social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
            </a>
            <a
              href={profileLinks[1].href}
              className="social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <Link href="/" className="social-link" aria-label="Home">
              <ArrowUpRightIcon />
            </Link>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {siteMeta.shortName}. Crafted with
          clarity.
        </p>
      </footer>
    </main>
  );
}
