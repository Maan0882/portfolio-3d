import React from 'react';

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact">
        <h2 className="section-title">
          <span className="chonky-underline chonky-underline-magenta">Get in Touch.</span>
        </h2>
        <p className="contact-text">
          The journey ends here — but the collaboration begins. Whether it's an internship, project, or just a hello, reach out!
        </p>
        <a href="mailto:gajjarmansi2808@gmail.com" className="btn">
          Say Hello
        </a>
      </section>

      <footer className="footer">
        <p style={{ marginBottom: '0.5rem', opacity: 0.85 }}>Crafted with code ✧ tea ✧ curiosity</p>
        <p style={{ fontSize: '0.95rem' }}>
          © {new Date().getFullYear()} Mansi Gajjar — "Debug the present | Design the future"
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <a href="https://github.com/Maan0882" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/2808-mansi-gajjar" target="_blank" rel="noopener noreferrer">LinkedIn</a>

        </div>
      </footer>
    </>
  );
}
