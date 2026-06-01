"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(5);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Smooth ramp-up that gives Three.js/WebGL time to actually initialize.
    // Total visible time ≈ 3 seconds before hiding.
    const steps: Array<{ val: number; delay: number }> = [
      { val: 20,  delay: 250 },
      { val: 38,  delay: 350 },
      { val: 55,  delay: 300 },
      { val: 70,  delay: 400 },
      { val: 82,  delay: 450 },
      { val: 91,  delay: 400 },
      { val: 97,  delay: 450 },
      { val: 100, delay: 350 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    steps.forEach(({ val, delay }) => {
      elapsed += delay;
      timers.push(setTimeout(() => setProgress(val), elapsed));
    });

    // Hide 650 ms after reaching 100 (gives a brief "READY TO LAUNCH" moment)
    timers.push(setTimeout(() => setHidden(true), elapsed + 650));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`loading-screen${hidden ? " hidden" : ""}`}>
      <div className="loading-logo">
        MANSI<span>.</span>GAJJAR
      </div>
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%`, transition: "width 0.35s ease" }}
        />
      </div>
      <div className="loading-text">
        {progress < 100 ? `INITIALIZING WORLD... ${progress}%` : "READY TO LAUNCH"}
      </div>
    </div>
  );
}
