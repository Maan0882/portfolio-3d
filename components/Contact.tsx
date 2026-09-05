"use client";
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <h2 className="section-title text-center">
          <span className="chonky-underline chonky-underline-magenta">Get in Touch.</span>
        </h2>
        <p className="contact-subtitle">
          The journey ends here — but the collaboration begins. Whether it's an internship, project, or just a hello, reach out!
        </p>

        <div className="contact-container">
          <div className="contact-info-card">
            <h3>Direct Contact</h3>
            <p>Prefer sending an email directly from your mail app?</p>
            <a href="mailto:gajjarmansi2808@gmail.com" className="email-pill-btn">
              ✉️ gajjarmansi2808@gmail.com
            </a>
            <div className="social-links-pill">
              <a href="https://github.com/Maan0882" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/2808-mansi-gajjar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="contact-form-card">
            <h3>Send a Message</h3>
            {status === 'success' ? (
              <div className="contact-success-toast">
                <div className="success-icon">✨</div>
                <p style={{ fontWeight: 600, fontSize: '1.1rem', margin: '0.5rem 0' }}>Message Sent!</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. I will get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-secondary-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Hi Mansi, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn submit-btn"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
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
