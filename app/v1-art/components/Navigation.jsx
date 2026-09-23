"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { personalInfo, primaryNavLinks, deepDoorways } from "../data/portfolio-content";
import styles from "../v1-art.module.css";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Track active section for indicator
      const sections = ["hero", "story", "work", "research", "beyond", "connect"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key for mobile drawer & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const scrollTo = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`${styles.navHeader} ${isScrolled ? styles.navHeaderScrolled : ""}`}
        role="banner"
      >
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          className={styles.navBrand}
          aria-label="Ankit Bhardwaj Home"
        >
          <span className={styles.brandMonogram}>{personalInfo.initials}</span>
          <div className={styles.brandMeta}>
            <span className={styles.brandName}>{personalInfo.name}</span>
            <span className={styles.brandDescriptor}>{personalInfo.title}</span>
          </div>
        </a>

        {/* Desktop Primary Navigation */}
        <nav className={styles.navMenuDesktop} aria-label="Main Navigation">
          {primaryNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`${styles.navItem} ${
                activeSection === link.href.slice(1) ? styles.navItemActive : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className={styles.navRightActions}>
          <a
            href="#connect"
            onClick={(e) => scrollTo(e, "#connect")}
            className={styles.navConnectBtn}
          >
            <span>Let&apos;s Connect</span>
            <svg
              width="13"
              height="13"
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

          {/* Accessible Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close menu" : "Open navigation menu"}
            aria-controls="mobile-navigation-drawer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Modal */}
      <div
        id="mobile-navigation-drawer"
        className={`${styles.mobileDrawerOverlay} ${isMobileOpen ? styles.mobileDrawerOpen : ""}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden={!isMobileOpen}
      >
        <div
          className={styles.mobileDrawerContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className={styles.mobileDrawerHead}>
              <span className={styles.brandName}>{personalInfo.name}</span>
              <button
                type="button"
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile Main Navigation">
              <ul className={styles.mobileDrawerNavList}>
                {primaryNavLinks.map((link, idx) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className={styles.mobileNavAnchor}
                    >
                      <span className={styles.mobileNavNum}>0{idx + 1}</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.mobileDoorwaysSection}>
              <div className={styles.mobileDoorwaysTitle}>Deeper Pages</div>
              <div className={styles.mobileDoorwayLinks}>
                {deepDoorways.map((doorway) => (
                  <Link
                    key={doorway.label}
                    href={doorway.href}
                    className={styles.mobileDoorwayItem}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {doorway.label} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <a
              href="#connect"
              onClick={(e) => scrollTo(e, "#connect")}
              className={styles.navConnectBtn}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
