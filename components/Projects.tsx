"use client";
import React, { useState } from 'react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ["All", "Full-Stack", "Client Work", "Open Source"];

  const projects = [
    {
      name: "Resumark — ATS Markdown Resume Engine",
      category: "Open Source",
      stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Print CSS", "Open Source"],
      desc: "A developer-first, client-side Markdown-to-PDF resume generator featuring bidirectional synchronized scrolling, a real-time ATS diagnostic scorecard, custom themes, and 100% client-side privacy.",
      github: "https://github.com/mansigajjar-dev/markdown-resume-builder",
      live: "https://resume-builder-markdown.vercel.app/",
    },
    {
      name: "IAPES Project(Internship Administration and Progress Evaluation System)",
      category: "Full-Stack",
      stack: ["React", "Node.js", "Laravel", "Filament"],
      desc: "Developed a comprehensive platform for the IAPES initiative, focusing on intuitive user experience and robust data handling.",
      github: "https://github.com/Maan0882",
      live: "https://www.techstrota.tech",
    },
    {
      name: "Pearl Logistics Website",
      category: "Client Work",
      stack: ["Next.js", "Tailwind CSS", "UI/UX"],
      desc: "Designed and engineered the Pearl Logistics website, delivering a modern, responsive interface with a focus on elegant aesthetics and performance.",
      github: "https://github.com/Maan0882",
      live: "https://www.pearllogistics.in",
    },
    {
      name: "SSM Future Innovation FZE",
      category: "Client Work",
      stack: ["React", "Next.js", "TypeScript"],
      desc: "Responsive, client-facing web application developed under an agile workflow. Spearheaded troubleshooting, state management, and edge-case testing.",
      github: null,
      live: "https://ssmfutureinnovationfze.com",
    },
    {
      name: "Quiz Up Platform",
      category: "Full-Stack",
      stack: [".NET", "C#"],
      desc: "Interactive testing utility featuring a custom evaluation calculation layer and structured identity access limits.",
      github: "https://github.com/Maan0882",
      live: null,
    },
    {
      name: "Attendance Tracker & Chat App",
      category: "Full-Stack",
      stack: ["AJAX", "JavaScript", "PHP"],
      desc: "Programmed multi-tier communication layers utilizing asynchronous AJAX scripts and secure authentication parameters to verify environment data.",
      github: "https://github.com/Maan0882",
      live: null,
    },
  ];

  const experience = [
    {
      role: "Full Stack Developer — Internship",
      company: "TechStrota — Vadodara, Gujarat",
      period: "2025 – 2026",
      desc: "Co-developed a responsive web application for SSM Future Innovation FZE, UAE. Engineered and tested a complex multi-module internal administrative platform. Wrote clean server-side logic and optimized data retrieval actions."
    },
    {
      role: "Independent Systems Developer",
      company: "Academic & Self-Initiated Projects",
      period: "2021 – 2024",
      desc: "Built various applications including Quiz Up Platform in .NET and an Attendance Tracker & Chat App. Maintained precise code documentation and utilized version control systems across all development stages."
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.stack.includes(activeFilter));

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">
        <span className="chonky-underline chonky-underline-blue">Selected Projects.</span>
      </h2>

      {/* Quick Project Category Filter */}
      <div className="project-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(p => (
          <div key={p.name} className="project-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-cyan-500/10">
            <h3 className="project-title">{p.name}</h3>
            <div className="project-tech">
              {p.stack.map(tech => <span key={tech}>{tech}</span>)}
            </div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-links">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  <span>GitHub →</span>
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  <span>Live URL →</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: '5rem' }}>
        <span className="chonky-underline chonky-underline-violet">Work Experience.</span>
      </h2>
      <div className="projects-grid">
        {experience.map(e => (
          <div key={e.role} className="project-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-cyan-500/10">
            <h3 className="project-title">{e.role}</h3>
            <div className="project-tech">
              <span>{e.company}</span>
              <span>•</span>
              <span>{e.period}</span>
            </div>
            <p className="project-desc">{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
