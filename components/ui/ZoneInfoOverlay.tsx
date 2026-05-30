"use client";

import { useScrollStore } from "@/lib/store";

// ─── Zone 1: About Me + Education ────────────────────────────────────────────
function AboutMePanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ ZONE 01 :: ABOUT ME &amp; EDUCATION</div>

      {/* Bio section */}
      <div className="zi-section">
        <h2 className="zi-name">Mansi Gajjar</h2>
        <p className="zi-role">Full Stack Developer</p>
        <p className="zi-bio">
          Passionate builder of scalable web apps and immersive digital
          experiences. I love clean code, creative problem solving, and
          bringing ideas to life through technology.
        </p>
        <div className="zi-lang-row">
          <span className="zi-badge zi-badge-purple">English</span>
          <span className="zi-badge zi-badge-purple">Gujarati</span>
          <span className="zi-badge zi-badge-purple">Hindi</span>
        </div>
      </div>

      <div className="zi-divider" />

      {/* Stats */}
      <div className="zi-stats">
        <div className="zi-stat">
          <span className="zi-stat-num">7+</span>
          <span className="zi-stat-lbl">Languages</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">10+</span>
          <span className="zi-stat-lbl">Frameworks</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">5+</span>
          <span className="zi-stat-lbl">Projects</span>
        </div>
        <div className="zi-stat">
          <span className="zi-stat-num">4+</span>
          <span className="zi-stat-lbl">Yrs Exp</span>
        </div>
      </div>

      <div className="zi-divider" />

      {/* Education */}
      <div className="zi-section">
        <p className="zi-section-title">EDUCATION</p>

        <div className="zi-edu-card">
          <div className="zi-edu-dot" style={{ background: "#00d9ff" }} />
          <div>
            <div className="zi-edu-degree">MSc Information Technology</div>
            <div className="zi-edu-school">Gujarat University</div>
            <div className="zi-edu-meta">2022 – 2024 · CGPA 8.5 / 10</div>
          </div>
        </div>

        <div className="zi-edu-card">
          <div className="zi-edu-dot" style={{ background: "#818cf8" }} />
          <div>
            <div className="zi-edu-degree">BCA — Bachelor of Computer Applications</div>
            <div className="zi-edu-school">Gujarat University</div>
            <div className="zi-edu-meta">2019 – 2022 · CGPA 8.2 / 10</div>
          </div>
        </div>

        <div className="zi-edu-card">
          <div className="zi-edu-dot" style={{ background: "#14b8a6" }} />
          <div>
            <div className="zi-edu-degree">Higher Secondary — Science (PCM)</div>
            <div className="zi-edu-school">Gujarat Secondary Education Board</div>
            <div className="zi-edu-meta">2018 – 2019 · 76%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zone 2: Skills & Technologies ───────────────────────────────────────────
const PROG_LANGS = [
  { name: "JavaScript", level: 90, color: "#f7df1e" },
  { name: "TypeScript",  level: 82, color: "#3178c6" },
  { name: "PHP",         level: 88, color: "#8892be" },
  { name: "Python",      level: 65, color: "#3776ab" },
  { name: "SQL",         level: 88, color: "#00758f" },
  { name: "Dart",        level: 60, color: "#00b4ab" },
  { name: "HTML / CSS",  level: 95, color: "#e34f26" },
  { name: "Bash / Shell",level: 55, color: "#4ade80" },
];

const FRAMEWORKS = [
  { label: "Next.js",    color: "cyan" },
  { label: "React",      color: "cyan" },
  { label: "Laravel",    color: "red"  },
  { label: "Alpine.js",  color: "cyan" },
  { label: "Livewire",   color: "red"  },
  { label: "Node.js",    color: "cyan" },
  { label: "Vue.js",     color: "cyan" },
  { label: "Flutter",    color: "cyan" },
  { label: "Filament",   color: "red"  },
  { label: "Tailwind",   color: "cyan" },
  { label: "Inertia.js", color: "cyan" },
  { label: "Django",     color: "cyan" },
];

const TOOLS = [
  "Docker", "Git", "GitHub", "Postman",
  "VS Code", "Webpack", "Vite", "Linux",
  "MySQL", "PostgreSQL", "Redis", "SQLite",
];

function SkillsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ ZONE 02 :: SKILLS &amp; TECHNOLOGIES</div>

      {/* Programming languages */}
      <div className="zi-section">
        <p className="zi-section-title">PROGRAMMING LANGUAGES</p>
        <div className="zi-skillbars">
          {PROG_LANGS.map((lang) => (
            <div key={lang.name} className="zi-skillbar-row">
              <span className="zi-skillbar-name">{lang.name}</span>
              <div className="zi-skillbar-track">
                <div
                  className="zi-skillbar-fill"
                  style={{ width: `${lang.level}%`, background: lang.color }}
                />
              </div>
              <span className="zi-skillbar-pct" style={{ color: lang.color }}>
                {lang.level}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="zi-divider" />

      {/* Frameworks */}
      <div className="zi-section">
        <p className="zi-section-title">FRAMEWORKS &amp; LIBRARIES</p>
        <div className="zi-tag-grid">
          {FRAMEWORKS.map((f) => (
            <span
              key={f.label}
              className={`zi-tech-tag ${f.color === "red" ? "zi-tech-tag-red" : ""}`}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      <div className="zi-divider" />

      {/* Tools */}
      <div className="zi-section">
        <p className="zi-section-title">TOOLS &amp; DATABASES</p>
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
    name: "IAPES — Report Portal",
    stack: "Laravel · MySQL · Livewire · Filament · DomPDF",
    desc: "Automated PDF generation system with role-based access for admin, staff & students. Dynamic form builder, Filament admin panel, deployed with CI pipeline.",
    color: "#ff2d20",
  },
  {
    name: "3D Developer Portfolio",
    stack: "Next.js 16 · Three.js · React Three Fiber · TypeScript",
    desc: "Immersive scroll-driven WebGL experience with 6 interactive 3D zones, custom camera spline, low-poly character, and post-processing effects.",
    color: "#818cf8",
  },
  {
    name: "Task Manager App",
    stack: "React · Node.js · Express · PostgreSQL · JWT · WebSocket",
    desc: "Drag-and-drop Kanban board with real-time updates via WebSocket, JWT auth with refresh tokens, and Docker Compose dev environment.",
    color: "#14b8a6",
  },
  {
    name: "E-Commerce Platform",
    stack: "Laravel · Alpine.js · MySQL · Stripe API · Blade",
    desc: "Multi-vendor marketplace with Stripe payment gateway, advanced filtering, analytics dashboard, inventory management, and email queue.",
    color: "#f59e0b",
  },
];

const EXPERIENCES = [
  {
    role: "Full Stack Developer Intern",
    company: "Tech Company — Ahmedabad, India",
    period: "Jun 2023 – Nov 2023 · 6 Months",
    bullets: [
      "Built Laravel REST APIs consumed by React frontend",
      "Developed Livewire components for admin tooling",
      "Integrated DomPDF for automated PDF reporting",
      "Agile sprints with Git flow, PHPUnit test coverage >80%",
    ],
    color: "#ff2d20",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed / Upwork",
    period: "2022 – Present",
    bullets: [
      "Delivered 5+ client projects end-to-end",
      "Laravel + Blade CMS sites and React SPAs",
      "Handled deployment, DNS, and hosting setup",
    ],
    color: "#818cf8",
  },
];

function ProjectsPanel() {
  return (
    <div className="zi-panel">
      <div className="zi-tag">⬡ ZONE 03 :: PROJECTS &amp; EXPERIENCE</div>

      {/* Projects */}
      <div className="zi-section">
        <p className="zi-section-title">PROJECTS</p>
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

  const isAbout    = zone === "ZONE_01 :: ABOUT ME"   && !landingVisible;
  const isSkills   = zone === "ZONE_02 :: SKILLS"     && !landingVisible;
  const isProjects = zone === "ZONE_03 :: PROJECTS"   && !landingVisible;

  return (
    <div className="zi-wrapper">
      {isAbout    && <AboutMePanel key="about"    />}
      {isSkills   && <SkillsPanel  key="skills"   />}
      {isProjects && <ProjectsPanel key="projects" />}
    </div>
  );
}
