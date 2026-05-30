"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useScrollStore, getZoneForProgress } from "@/lib/store";
import HUD from "@/components/ui/HUD";
import LandingOverlay from "@/components/ui/LandingOverlay";
import ContactOverlay from "@/components/ui/ContactOverlay";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CanvasErrorBoundary from "@/components/ui/CanvasErrorBoundary";
import ZoneInfoOverlay from "@/components/ui/ZoneInfoOverlay";

// Dynamic import so Three.js never runs on server
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  const { setProgress, setZone, setContactVisible, setLandingVisible } =
    useScrollStore();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorDiv = document.createElement("div");
      errorDiv.id = "global-error-banner";
      errorDiv.style.position = "fixed";
      errorDiv.style.top = "10px";
      errorDiv.style.left = "10px";
      errorDiv.style.right = "10px";
      errorDiv.style.background = "#ef4444";
      errorDiv.style.color = "#ffffff";
      errorDiv.style.padding = "15px";
      errorDiv.style.zIndex = "99999";
      errorDiv.style.fontFamily = "monospace";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.borderRadius = "8px";
      errorDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";
      errorDiv.style.maxHeight = "40vh";
      errorDiv.style.overflowY = "auto";
      errorDiv.innerHTML = `<strong>Global Error Caught:</strong> ${event.message} <br/> <small>in ${event.filename} at line ${event.lineno}:${event.colno}</small><br/><pre style="margin-top:10px;white-space:pre-wrap;font-size:10px;">${event.error?.stack || ""}</pre>`;
      document.body.appendChild(errorDiv);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorDiv = document.createElement("div");
      errorDiv.id = "global-rejection-banner";
      errorDiv.style.position = "fixed";
      errorDiv.style.top = "10px";
      errorDiv.style.left = "10px";
      errorDiv.style.right = "10px";
      errorDiv.style.background = "#f59e0b";
      errorDiv.style.color = "#070b14";
      errorDiv.style.padding = "15px";
      errorDiv.style.zIndex = "99999";
      errorDiv.style.fontFamily = "monospace";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.borderRadius = "8px";
      errorDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";
      errorDiv.style.maxHeight = "40vh";
      errorDiv.style.overflowY = "auto";
      errorDiv.innerHTML = `<strong>Unhandled Promise Rejection:</strong> ${event.reason?.message || event.reason} <br/><pre style="margin-top:10px;white-space:pre-wrap;font-size:10px;">${event.reason?.stack || ""}</pre>`;
      document.body.appendChild(errorDiv);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // Guard against division by zero (page not scrollable yet)
      if (maxScroll <= 0) return;

      const p = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      setProgress(p);
      const zone = getZoneForProgress(p);
      setZone(zone.id);
      setContactVisible(p >= 0.82);
      setLandingVisible(p < 0.06);
    };

    // Fire once on mount to set initial state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setProgress, setZone, setContactVisible, setLandingVisible]);


  return (
    <div className="scroll-container">
      {/* Fixed 3D canvas — stays in place while page scrolls underneath */}
      <div className="canvas-wrapper">
        <CanvasErrorBoundary>
          <Scene />
        </CanvasErrorBoundary>
      </div>

      {/* Scroll-driving spacer — 600vh gives 6 pages of scroll travel */}
      <div className="scroll-spacer" />

      {/* DOM Overlays (all fixed-position internally) */}
      <LoadingScreen />
      <LandingOverlay />
      <HUD />
      <ZoneInfoOverlay />
      <ContactOverlay />
    </div>
  );
}

