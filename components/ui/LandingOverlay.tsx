"use client";

import { useScrollStore } from "@/lib/store";

export default function LandingOverlay() {
  const landingVisible = useScrollStore((s) => s.landingVisible);

  return (
    <div className={`landing-overlay${landingVisible ? "" : " hidden"}`}>
      <div className="landing-panel">
        <p className="landing-init-text">⬡ INITIALIZING DEVELOPER JOURNEY ⬡</p>
        <h1 className="landing-name">Mansi Gajjar</h1>
        <p className="landing-title">Full Stack Developer · MSc Information Technology</p>
        <p className="landing-sub">JavaScript · TypeScript · PHP · Python · SQL · Dart</p>
        <span className="landing-cta">↓ &nbsp; SCROLL TO BEGIN &nbsp; ↓</span>
      </div>
    </div>
  );
}
