"use client";

import { useScrollStore } from "@/lib/store";

// ─── Zone 1: About Me + Education ────────────────────────────────────────────
function AboutMePanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ ABOUT ME &amp; EDUCATION</div>

      {/* Internal Scroll Window Container */}
      <div className="zi-scroll-box">
        {/* Bio */}
        <div className="zi-section">
          <h2 className="zi-name">Mansi Gajjar</h2>
          <p className="zi-role">Full Stack Developer</p>
          <p className="zi-bio">
            Highly motivated and detail-oriented IT professional with a solid academic foundation in Computer Science and over 6 months of hands-on project and internship development experience. Proven ability to write clean, efficient, and maintainable code across full-stack ecosystems.
          </p>

          {/* Spoken languages */}
          <div className="zi-lang-row">
            <span className="zi-badge zi-badge-purple">English</span>
            <span className="zi-badge zi-badge-purple">Gujarati</span>
            <span className="zi-badge zi-badge-purple">Hindi</span>
          </div>
        </div>

        <div className="zi-divider" />

        {/* At-a-glance stats */}
        <div className="zi-stats">
          <div className="zi-stat">
            <span className="zi-stat-num">6+</span>
            <span className="zi-stat-lbl">Mos Exp</span>
          </div>
          <div className="zi-stat">
            <span className="zi-stat-num">8+</span>
            <span className="zi-stat-lbl">Languages</span>
          </div>
          <div className="zi-stat">
            <span className="zi-stat-num">4+</span>
            <span className="zi-stat-lbl">Projects</span>
          </div>
          <div className="zi-stat">
            <span className="zi-stat-num">7.89</span>
            <span className="zi-stat-lbl">CGPA</span>
          </div>
        </div>

        <div className="zi-divider" />

        {/* Education */}
        <div className="zi-section">
          <p className="zi-section-title">EDUCATION</p>

          {/* MSc */}
          <div className="zi-edu-card">
            <div className="zi-edu-dot" style={{ background: "#00d9ff" }} />
            <div className="zi-item-content">
              <div className="zi-edu-degree">M.Sc. in Information Technology</div>
              <div className="zi-edu-school">Sardar Patel University</div>
              <div className="zi-edu-meta">2024 – 2026 · CGPA 7.89</div>
            </div>
          </div>

          {/* BCA */}
          <div className="zi-edu-card">
            <div className="zi-edu-dot" style={{ background: "#818cf8" }} />
            <div className="zi-item-content">
              <div className="zi-edu-degree">Bachelor of Computer Application (BCA)</div>
              <div className="zi-edu-school">Sardar Patel University</div>
              <div className="zi-edu-meta">2021 – 2024 · CGPA 8.32</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zone 2: Skills ───────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    title: "Core Languages",
    color: "#00d9ff",
    dot: "#00d9ff",
    skills: ["Python", "C++", "C", "Java", "JavaScript", "TypeScript", "PHP", "SQL"],
  },
  {
    title: "Web Frameworks",
    color: "#818cf8",
    dot: "#818cf8",
    skills: ["Next.js", "React", "Laravel", "ASP.NET Core", "FastAPI", "HTML5", "CSS Grid"],
  },
  {
    title: "Databases & Systems",
    color: "#14b8a6",
    dot: "#14b8a6",
    skills: ["MySQL", "SQL Server", "PostgreSQL", "Query Optimization"],
  },
];

const TOOLS = [
  "Git / GitHub", "VS Code IDE", "SDLC", "OOP", "Testing & Debugging", "Troubleshooting"
];

function SkillsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ SKILLS &amp; TECHNOLOGIES</div>

      <div className="zi-scroll-box">
        <div className="zi-section">
          <p className="zi-section-title">PROFICIENCY LEVELS</p>
          <div className="zi-skill-groups">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="zi-skill-group">
                <div className="zi-skill-group-header">
                  <div className="zi-skill-group-dot" style={{ background: g.dot }} />
                  <span className="zi-skill-group-title" style={{ color: g.color }}>
                    {g.title}
                  </span>
                </div>
                <div className="zi-skill-chips">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="zi-skill-chip"
                      style={{ borderColor: `${g.dot}33`, color: g.color }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="zi-divider" />

        {/* Tools */}
        <div className="zi-section">
          <p className="zi-section-title">TOOLS &amp; ENVIRONMENT</p>
          <div className="zi-tag-grid">
            {TOOLS.map((t) => (
              <span key={t} className="zi-tech-tag zi-tech-tag-dim">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zone 3: Projects + Experience ───────────────────────────────────────────
const PROJECTS = [
  {
    name: "SSM Future Innovation FZE",
    stack: "React · Next.js · TypeScript",
    desc: "Responsive, client-facing web application developed under an agile workflow. Spearheaded troubleshooting, state management, and edge-case testing.",
    github: null,
    live: "https://ssmfutureinnovationfze.com",
    color: "#00d9ff",
  },
  {
    name: "Quiz Up Platform",
    stack: ".NET · C#",
    desc: "Interactive testing utility featuring a custom evaluation calculation layer and structured identity access limits.",
    github: "https://github.com/Maan0882",
    live: null,
    color: "#f59e0b",
  },
  {
    name: "Attendance Tracker & Chat App",
    stack: "AJAX",
    desc: "Programmed multi-tier communication layers utilizing asynchronous AJAX scripts and secure authentication parameters to verify environment data.",
    github: "https://github.com/Maan0882",
    live: null,
    color: "#818cf8",
  },
];

const EXPERIENCES = [
  {
    role: "Full Stack Developer — Internship",
    company: "TechStrota — Vadodara, Gujarat",
    period: "2025 – 2026",
    bullets: [
      "Client Project Deployment (SSM Future Innovation FZE, UAE): Co-developed a responsive web application utilizing React, Next.js, and TypeScript.",
      "Frontend Engineering: Spearheaded troubleshooting, state management, and edge-case testing for the client application.",
      "Administrative System Architecture: Designed, engineered, and tested a complex, multi-module internal administrative platform.",
      "Backend & Database Optimization: Wrote clean server-side logic and optimized data retrieval actions.",
    ],
    color: "#00d9ff",
  },
  {
    role: "Independent Systems Developer",
    company: "Academic & Self-Initiated Projects — Gujarat",
    period: "2021 – 2024",
    bullets: [
      "Quiz Up Platform (.NET/C#): Designed and built an interactive testing utility featuring a custom evaluation calculation layer.",
      "Attendance Tracker & Chat App: Programmed multi-tier communication layers utilizing asynchronous AJAX scripts.",
      "Maintained precise code documentation and utilized version control systems across all development stages.",
    ],
    color: "#818cf8",
  },
];

function ProjectsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ PROJECTS &amp; EXPERIENCE</div>

      <div className="zi-scroll-box">
        {/* Projects */}
        <div className="zi-section">
          <p className="zi-section-title">SELECTED PROJECTS</p>
          <div className="zi-project-list">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="zi-project-card"
                style={{ borderLeftColor: p.color }}
              >
                <div className="zi-project-name" style={{ color: p.color }}>
                  {p.name}
                </div>
                <div className="zi-project-stack">{p.stack}</div>
                <div className="zi-project-desc">{p.desc}</div>

                <div className="zi-project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="zi-project-link">
                      GitHub →
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="zi-project-link zi-project-link-live">
                      Live →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="zi-divider" />

        {/* Experience */}
        <div className="zi-section">
          <p className="zi-section-title">WORK EXPERIENCE</p>
          <div className="zi-exp-list">
            {EXPERIENCES.map((e) => (
              <div key={e.role} className="zi-exp-item">
                <div className="zi-exp-dot" style={{ background: e.color }} />
                <div className="zi-item-content">
                  <div className="zi-exp-role" style={{ color: e.color }}>{e.role}</div>
                  <div className="zi-exp-company">{e.company}</div>
                  <div className="zi-exp-period">{e.period}</div>
                  <ul className="zi-exp-bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ZoneInfoOverlay() {
  const zone = useScrollStore((s) => s.zone);
  const landingVisible = useScrollStore((s) => s.landingVisible);

  const isAbout = zone === "ZONE_01 :: ABOUT ME" && !landingVisible;
  const isSkills = zone === "ZONE_02 :: SKILLS" && !landingVisible;
  const isProjects = zone === "ZONE_03 :: PROJECTS" && !landingVisible;

  return (
    <div className="zi-wrapper">
      {isAbout && <AboutMePanel key="about" />}
      {isSkills && <SkillsPanel key="skills" />}
      {isProjects && <ProjectsPanel key="projects" />}
    </div>
  );
}