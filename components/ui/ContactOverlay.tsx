"use client";

import { useScrollStore } from "@/lib/store";
import { useState } from "react";

interface ContactOverlayProps {
  visible?: boolean;
}

export default function ContactOverlay({ visible }: ContactOverlayProps) {
  const contactVisible = useScrollStore((s) => s.contactVisible);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send form data asynchronously to Formspree endpoints
      const response = await fetch("https://formspree.io/f/mredwagb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" }); // Reset text fields upon clean delivery
        setTimeout(() => setSent(false), 3000);
      } else {
        alert("Transmission anomaly encountered. Please attempt fallback email instead.");
      }
    } catch (error) {
      console.error("Formspree Submission Error:", error);
      alert("Network connectivity issue. Please reach out via email directly.");
    } finally {
      setSubmitting(false);
    }
  };

  // components/ui/ContactOverlay.tsx layout segment update
  return (
    <div className={`contact-overlay${contactVisible ? " visible" : ""}`}>
      <div className="contact-panel">

        {/* Left — info block element context */}
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
              <span className="contact-link-text">gajjarmansi2808@gmail.com</span>
            </a>
            <a href="tel:+918320768968" className="contact-link">
              <span className="contact-link-icon">📞</span>
              <span className="contact-link-text">+91 8320768968</span>
            </a>
            <a
              href="https://www.linkedin.com/in/2808-mansi-gajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">in</span>
              <span className="contact-link-text">linkedin.com/in/2808-mansi-gajjar</span>
            </a>
            <a
              href="https://github.com/Maan0882"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🐙</span>
              <span className="contact-link-text">github.com/Maan0882</span>
            </a>
            <a
              href="https://mansi-portfolio-3d.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon">🌐</span>
              <span className="contact-link-text">mansi-portfolio-3d.vercel.app</span>
            </a>
          </div>
        </div>

        <div className="zi-divider mobile-only-divider" style={{ display: 'none' }} />

        {/* Right — form input block layout elements */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="c-name">Name</label>
            <input
              id="c-name"
              type="text"
              placeholder="Your name"
              required
              disabled={submitting || sent}
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
              disabled={submitting || sent}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              rows={3}
              placeholder="What's on your mind?"
              required
              disabled={submitting || sent}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={submitting || sent}>
            {submitting ? "TRANSMITTING..." : sent ? "✓ MESSAGE TRANSMITTED" : "TRANSMIT MESSAGE →"}
          </button>
        </form>

      </div>
    </div>
  );
}