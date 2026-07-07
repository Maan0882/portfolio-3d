"use client";

import { useScrollStore } from "@/lib/store";

export default function LandingOverlay() {
  const landingVisible = useScrollStore((s) => s.landingVisible);

  return (
    <div className={`landing-overlay${landingVisible ? "" : " hidden"}`}>
      <div className="landing-panel">

        {/* Status tag */}
        <p className="landing-init-text">⬡ OPEN TO OPPORTUNITIES · AVAILABLE NOW ⬡</p>

        {/* Name */}
        <h1 className="landing-name">Mansi Gajjar</h1>

        {/* Role + degree on one line */}
        <p className="landing-title">Software Developer · MSc Information Technology</p>

        {/* Short sharp hook — what value do I bring? */}
        <p className="landing-hook">
          Highly motivated IT professional with a solid academic foundation in Computer Science and hands-on full-stack development experience.
        </p>

        {/* Quick social links — visible immediately */}
        <div className="landing-socials">
          <a
            href="https://github.com/Maan0882"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-btn"
            id="landing-github-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/2808-mansi-gajjar"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-social-btn"
            id="landing-linkedin-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="/Mansi_Gajjar_CV.pdf"
            download="Mansi_Gajjar_CV.pdf"
            className="landing-social-btn landing-social-cv"
            id="landing-cv-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Scroll CTA */}
        <span className="landing-cta">↓ &nbsp; SCROLL TO EXPLORE &nbsp; ↓</span>
      </div>
    </div>
  );
}
