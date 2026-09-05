"use client";

import React, { useState, useEffect } from 'react';

interface Artifact {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
}

export default function Gallery() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const artifacts: Artifact[] = [
    {
      id: 'pearl-logistics',
      title: "Pearl Logistics — Global Agro-Export Platform",
      image: "/images/artifacts/pearl-logistics-real.png",
      tags: ["Next.js", "Tailwind CSS", "Agro-Export", "Responsive UI"],
      description: "Production international export platform for premium Basmati rice, wheat, and pulses, serving bulk buyers across 50+ countries worldwide."
    },
    {
      id: 'iapes-console',
      title: "IAPES — Enterprise Admin Console",
      image: "/images/artifacts/iapes-dashboard-ui.png",
      tags: ["Laravel 11", "Filament v3", "MySQL 8.0", "RBAC"],
      description: "Administrative evaluation dashboard managing candidate intake, mentor reviews, task milestones, and QR-verified certifications."
    },
    {
      id: 'resumark-engine',
      title: "Resumark — ATS Resume Engine",
      image: "/images/artifacts/resumark-product-ui.png",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Print Media CSS"],
      description: "Developer-first Markdown-to-PDF compiler featuring bidirectional synchronized scrolling and real-time ATS diagnostic scoring."
    },
    {
      id: 'techstrota-award',
      title: "TechStrota Star Achiever Award (2026)",
      image: "/images/gallery/techstrota-award.jpg",
      tags: ["Industry Recognition", "Full-Stack Delivery"],
      description: "Official company commendation for full-stack system architecture and milestone delivery."
    }
  ];

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtifact(null);
      }
    };
    if (selectedArtifact) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArtifact]);

  return (
    <section id="gallery" className="gallery" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="gallery-header">
        <h2 className="section-title">
          <span className="chonky-underline chonky-underline-magenta">Engineering Artifacts & Architecture.</span>
        </h2>
        <p className="gallery-subtitle text-slate-600 dark:text-slate-300">
          High-fidelity interfaces, enterprise consoles, and production platforms from my full-stack projects.
        </p>
      </div>

      <div className="artifacts-grid">
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            className="artifact-card project-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-cyan-500/10"
            style={{ cursor: 'pointer', overflow: 'hidden' }}
          >
            <div className="artifact-image-wrapper">
              <img
                src={artifact.image}
                alt={artifact.title}
                className="artifact-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (artifact.id === 'techstrota-award') {
                    e.currentTarget.src = '/1.jpg';
                  }
                }}
              />
              <div className="artifact-overlay">
                <span>🔍 Click to expand</span>
              </div>
            </div>

            <div className="artifact-body">
              <h3 className="artifact-title text-slate-900 dark:text-white">
                {artifact.title}
              </h3>
              
              <div className="artifact-tags">
                {artifact.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>

              <p className="artifact-desc text-slate-600 dark:text-slate-300">
                {artifact.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal / Lightbox Overlay */}
      {selectedArtifact && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedArtifact(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedArtifact(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="lightbox-image-container">
              <img
                src={selectedArtifact.image}
                alt={selectedArtifact.title}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-details">
              <h3 className="lightbox-title text-slate-900 dark:text-white">
                {selectedArtifact.title}
              </h3>
              <div className="artifact-tags" style={{ margin: '0.75rem 0' }}>
                {selectedArtifact.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
              <p className="lightbox-desc text-slate-600 dark:text-slate-300">
                {selectedArtifact.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
