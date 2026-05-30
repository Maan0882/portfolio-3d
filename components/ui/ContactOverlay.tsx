"use client";

import { useScrollStore } from "@/lib/store";
import { useState } from "react";

export default function ContactOverlay() {
  const contactVisible = useScrollStore((s) => s.contactVisible);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:gajjarmansi2808@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className={`contact-overlay${contactVisible ? " visible" : ""}`}>
      <div className="contact-panel">
        {/* Left — info */}
        <div className="contact-info">
          <span className="zone-tag">{"{ ZONE_05 :: COMMAND CENTER }"}</span>
          <h2>Initiate Connection</h2>
          <p>
            The journey ends here — but the collaboration begins. Whether it's
            an internship, project, or just a hello, reach out.
          </p>
          <div className="contact-links">
            <a href="mailto:gajjarmansi2808@gmail.com" className="contact-link">
              <span className="contact-link-icon">✉</span>
              gajjarmansi2808@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/2808-mansi-gajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">in</span>
              linkedin.com/in/2808-mansi-gajjar
            </a>
            <a
              href="https://portfolio-mansi-gajjar.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🌐</span>
              portfolio-mansi-gajjar.vercel.app
            </a>
          </div>
        </div>

        {/* Right — form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="c-name">Name</label>
            <input
              id="c-name"
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-email">Email</label>
            <input
              id="c-email"
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              rows={4}
              placeholder="What's on your mind?"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-btn">
            {sent ? "✓ MESSAGE TRANSMITTED" : "TRANSMIT MESSAGE →"}
          </button>
        </form>
      </div>
    </div>
  );
}
