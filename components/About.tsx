import React from 'react';

export default function About() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Blade", "HTML5", "CSS3"]
    },
    {
      title: "Backend & APIs",
      skills: ["Laravel (PHP 8.2)", "Filament v3", "RESTful APIs", "FastAPI", "ASP.NET Core", "Node.js"]
    },
    {
      title: "Databases & Architecture",
      skills: ["MySQL", "PostgreSQL", "MS SQL Server", "Relational Normalization (3NF)", "RBAC"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "GitHub", "Linux VPS", "Apache", "Docker", "Postman", "VS Code"]
    }
  ];

  return (
    <section id="about" className="about">
      <h2 className="section-title">
        <span className="chonky-underline chonky-underline-yellow">About Me.</span>
      </h2>
      <div className="about-grid">
        <div className="about-content-left">
          <div className="about-text">
            <p>
              Hi, I'm Mansi Gajjar. Nice to meet you.
            </p>
            <p>
              I am a highly motivated and detail-oriented IT professional with a solid academic foundation in Computer Science and over 6 months of hands-on project and internship development experience.
              I have a proven ability to write clean, efficient, and maintainable code across full-stack ecosystems.
            </p>
            <p>
              Currently, I am pursuing my M.Sc. in Information Technology at Sardar Patel University (2024–2026), having previously completed my Bachelor of Computer Application (BCA) with a CGPA of 8.32.
            </p>
            <p>
              I speak English, Gujarati, and Hindi, and I love building interactive web experiences.
            </p>
          </div>
        </div>
        <div className="about-skills">
          <h3 style={{ fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>My Skills</h3>
          <div className="skill-categories-grid">
            {skillCategories.map(cat => (
              <div key={cat.title} className="skill-category-card">
                <h4 className="skill-category-title">{cat.title}</h4>
                <div className="skills-list">
                  {cat.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
