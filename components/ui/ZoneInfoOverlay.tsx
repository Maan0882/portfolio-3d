"use client";

import { useScrollStore } from "@/lib/store";

// ─── Zone 1: About Me + Education ────────────────────────────────────────────
function AboutMePanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ ABOUT ME &amp; EDUCATION</div>

      {/* Bio */}
      <div className="zi-section">
        <h2 className="zi-name">Mansi Gajjar</h2>
        <p className="zi-role">Full Stack Developer</p>
        <p className="zi-bio">
          Results-oriented Full Stack Developer with 3+ years of experience
          building scalable systems across PHP/Laravel, ASP.NET, and Next.js —
          from architecture and development to production deployment.
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
          <span className="zi-stat-num">3+</span>
          <span className="zi-stat-lbl">Yrs Exp</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">4+</span>
          <span className="zi-stat-lbl">Languages</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">4+</span>
          <span className="zi-stat-lbl">Projects</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">8.24</span>
          <span className="zi-stat-lbl">GPA</span>
        </div>
      </div>

      <div className="zi-divider" />

      {/* Education */}
      <div className="zi-section">
        <p className="zi-section-title">EDUCATION</p>

        {/* MSc */}
        <div className="zi-edu-card">
          <div className="zi-edu-dot" style={{ background: "#00d9ff" }} />
          <div>
            <div className="zi-edu-degree">M.Sc. — Information Technology</div>
            <div className="zi-edu-school">Shree P. M. Patel Institute of PG Studies &amp; Research in Applied Science, Anand</div>
            <div className="zi-edu-meta">2024 – 2026 · GPA 8.24</div>
          </div>
        </div>

        {/* BCA */}
        <div className="zi-edu-card">
          <div className="zi-edu-dot" style={{ background: "#818cf8" }} />
          <div>
            <div className="zi-edu-degree">BCA — Bachelor of Computer Application</div>
            <div className="zi-edu-school">Shree P. M. Patel College of Computer Science &amp; Technology, Anand</div>
            <div className="zi-edu-meta">2021 – 2024 · CGPA 8.32</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zone 2: Skills — honest grouped display, no fake percentages ─────────────
const SKILL_GROUPS = [
  {
    title: "Languages",
    color: "#00d9ff",
    dot: "#00d9ff",
    skills: ["PHP", "Python", "C#", "Java", "TypeScript", "C / C++"],
  },
  {
    title: "Web & Frameworks",
    color: "#818cf8",
    dot: "#818cf8",
    skills: ["Laravel", "Next.js", "ASP.NET", "Tailwind CSS", "HTML5", "CSS3", "JS ES6+"],
  },
  {
    title: "Databases & Mobile",
    color: "#14b8a6",
    dot: "#14b8a6",
    skills: ["MySQL", "SQL Server", "Android (Java)"],
  },
];

const TOOLS = [
  "Git", "GitHub", "Vercel", "VS Code",
  "XAMPP", "Android Studio",
];

function SkillsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ SKILLS &amp; TECHNOLOGIES</div>

      {/* Grouped proficiency — no arbitrary percentages */}
      <div className="zi-section">
        <p className="zi-section-title">PROFICIENCY LEVELS</p>
        <div className="zi-skill-groups">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="zi-skill-group">
              {/* Group header */}
              <div className="zi-skill-group-header">
                <div className="zi-skill-group-dot" style={{ background: g.dot }} />
                <span className="zi-skill-group-title" style={{ color: g.color }}>
                  {g.title}
                </span>
              </div>
              {/* Skill chips */}
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
  );
}

// ─── Zone 3: Projects + Experience ───────────────────────────────────────────
const PROJECTS = [
  {
    name: "SSM Future Innovation FZE",
    stack: "Next.js · TypeScript · Tailwind CSS",
    desc: "Client-facing production app with SSR/SSG, type-safe architecture, and optimised asset delivery on Vercel. Built for a UAE-based client implementing pixel-perfect UI.",
    github: "https://github.com/Maan0882",
    live: "https://ssmfutureinnovationfze.com",
    color: "#00d9ff",
  },
  {
    name: "IAPES System",
    stack: "Laravel · PHP · Blade",
    desc: "Full-featured MVC web application with Eloquent ORM, RESTful routing, CSRF protection, and live deployment. Built and deployed at Techstrota.",
    github: "https://github.com/Maan0882",
    live: "https://techstrota.tech",
    color: "#ff2d20",
  },
  {
    name: "Attendance Management System",
    stack: "PHP · MySQL · JavaScript",
    desc: "Three-tier role-based system (Admin · Teacher · Student) with real-time AJAX reporting, colour-coded attendance alerts, and secure session auth.",
    github: "https://github.com/Maan0882",
    live: null,
    color: "#818cf8",
  },
  {
    name: "Quiz Up Platform",
    stack: "ASP.NET · C# · SQL Server",
    desc: "Interactive quiz platform with dynamic question creation, partial-credit scoring engine, analytics dashboard, and role-based access.",
    github: "https://github.com/Maan0882",
    live: null,
    color: "#f59e0b",
  },
];

const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Techstrota — Vadodara, GJ",
    period: "2025 – Present",
    bullets: [
      "Built and deployed IAPES System — a live multi-module Laravel MVC app with Eloquent ORM, RESTful routing, CSRF protection, and middleware-based access control",
      "Delivered SSM Future Innovation FZE (Next.js · TypeScript · Tailwind CSS) for a UAE-based client, implementing SSR/SSG, pixel-perfect UI, and Vercel deployment",
      "Owned the complete stack: schema design, PHP backend logic, responsive Blade frontend, and production server configuration",
    ],
    color: "#00d9ff",
  },
  {
    role: "Freelance Developer",
    company: "Self-Initiated Projects — Anand, GJ",
    period: "2021 – 2024",
    bullets: [
      "Attendance Management System (PHP/MySQL/JS): 3-tier role-based platform with real-time AJAX reporting and secure session auth",
      "Real-Time Chat Application (PHP/MySQL/JS): Multi-user concurrent messaging via AJAX long-polling, hashed passwords, and read indicators",
      "Quiz Up Platform (ASP.NET/C#/SQL Server): Dynamic quiz creation, custom partial-credit scoring engine, analytics dashboard, and role-based access",
    ],
    color: "#818cf8",
  },
];

function ProjectsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ PROJECTS &amp; EXPERIENCE</div>

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

              {/* Action links — proves the work is real */}
              <div className="zi-project-links">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zi-project-link"
                  >
                    GitHub →
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zi-project-link zi-project-link-live"
                  >
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
              <div style={{ flex: 1 }}>
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
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ZoneInfoOverlay() {
  const zone = useScrollStore((s) => s.zone);
  const landingVisible = useScrollStore((s) => s.landingVisible);

  const isAbout    = zone === "ZONE_01 :: ABOUT ME"  && !landingVisible;
  const isSkills   = zone === "ZONE_02 :: SKILLS"    && !landingVisible;
  const isProjects = zone === "ZONE_03 :: PROJECTS"  && !landingVisible;

  return (
    <div className="zi-wrapper">
      {isAbout    && <AboutMePanel    key="about"    />}
      {isSkills   && <SkillsPanel     key="skills"   />}
      {isProjects && <ProjectsPanel   key="projects" />}
    </div>
  );
}
