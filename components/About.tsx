import React from 'react';

export default function About() {
  const skills = [
    "Python", "C++", "C", "Java", "JavaScript", "TypeScript", "PHP", "SQL",
    "Next.js", "React", "Laravel", "ASP.NET Core", "FastAPI", "HTML5", "CSS Grid",
    "MySQL", "SQL Server", "PostgreSQL", "Git", "GitHub"
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
          <div className="skills-list">
            {skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
