"use client";

import Link from "next/link";
import { personalInfo, navLinks } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function Navigation() {
  const scrollTo = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={styles.navHeader} role="banner">
      <a
        href="#hero"
        onClick={(e) => scrollTo(e, "#hero")}
        className={styles.navBrand}
        aria-label="Ankit Bhardwaj Home"
      >
        <span className={styles.brandMonogram}>{personalInfo.initials}</span>
        <div className={styles.brandMeta}>
          <span className={styles.brandName}>{personalInfo.name}</span>
          <span className={styles.brandTitle}>{personalInfo.title}</span>
        </div>
      </a>

      <nav className={styles.navMenu} aria-label="Main Navigation">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className={styles.navLink}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#connect"
        onClick={(e) => scrollTo(e, "#connect")}
        className={styles.navActionBtn}
      >
        <span>Let&apos;s Connect</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </header>
  );
}
