"use client";

import { useScrollStore } from "@/lib/store";

// Maps each nav item to an approximate scroll fraction (0-1)
// Based on the 600vh scroll-spacer and zone ranges in store.ts
const NAV_ITEMS = [
  { label: "About",    scrollFraction: 0.14 },
  { label: "Skills",   scrollFraction: 0.34 },
  { label: "Projects", scrollFraction: 0.54 },
  { label: "Contact",  scrollFraction: 0.92 },
];

function scrollToFraction(fraction: number) {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: maxScroll * fraction, behavior: "smooth" });
}

export default function PortfolioNav() {
  const zone = useScrollStore((s) => s.zone);
  const landingVisible = useScrollStore((s) => s.landingVisible);

  // Hide nav on the very first screen
  if (landingVisible) return null;

  const activeLabel =
    zone.includes("ABOUT")   ? "About"    :
    zone.includes("SKILLS")  ? "Skills"   :
    zone.includes("PROJECTS")? "Projects" :
    zone.includes("CONTACT") ? "Contact"  : "";

  return (
    <nav className="pnav" aria-label="Portfolio navigation">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          className={`pnav-item${activeLabel === item.label ? " pnav-item-active" : ""}`}
          onClick={() => scrollToFraction(item.scrollFraction)}
          aria-label={`Jump to ${item.label} section`}
          id={`nav-${item.label.toLowerCase()}`}
        >
          <span className="pnav-dot" />
          <span className="pnav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
