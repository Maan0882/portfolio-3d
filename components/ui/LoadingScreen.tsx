"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const steps = [20, 45, 65, 80, 95, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 600);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-screen${hidden ? " hidden" : ""}`}>
      <div className="loading-logo">
        MANSI<span>.</span>GAJJAR
      </div>
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-text">
        {progress < 100 ? "COMPILING DEVELOPER JOURNEY..." : "READY"}
      </div>
    </div>
  );
}
