"use client";

import { useScrollStore, ZONES } from "@/lib/store";

export default function HUD() {
  const { progress, zone, landingVisible } = useScrollStore();
  const currentZone = ZONES.find((z) => z.id === zone);
  const show = !landingVisible;

  return (
    <>
      {/* Top-left: Zone label */}
      <div className="hud hud-zone">
        <span className={`hud-zone-label${show ? " visible" : ""}`}>
          CURRENT ZONE
        </span>
        <span className={`hud-zone-name${show ? " visible" : ""}`}>
          {currentZone?.id ?? zone}
        </span>
      </div>

      {/* Bottom-center: Progress bar */}
      <div className="hud hud-progress">
        {!landingVisible && (
          <>
            <div className="hud-progress-track">
              <div
                className="hud-progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {progress < 0.82 && (
              <span className="hud-scroll-hint">SCROLL TO EXPLORE</span>
            )}
          </>
        )}
      </div>
    </>
  );
}
