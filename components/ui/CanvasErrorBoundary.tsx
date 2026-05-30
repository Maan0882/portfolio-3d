"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside 3D Canvas:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070b14",
          color: "#ff2d20",
          fontFamily: "var(--font-mono), monospace",
          padding: "20px",
          textAlign: "center",
          zIndex: 9999,
          overflow: "auto"
        }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
            3D Canvas Hydration Error
          </h2>
          <p style={{ color: "#e2e8f0", maxWidth: "600px", fontSize: "1rem", lineHeight: "1.5" }}>
            An unexpected error occurred while rendering the interactive 3D WebGL scene.
          </p>
          <div style={{
            color: "#ff8b8b",
            fontWeight: "bold",
            marginTop: "1.5rem",
            fontSize: "0.95rem"
          }}>
            {this.state.error?.message || this.state.error?.toString()}
          </div>
          <pre style={{
            background: "#0f172a",
            border: "1px solid rgba(255, 45, 32, 0.2)",
            padding: "1.5rem",
            borderRadius: "12px",
            fontSize: "0.75rem",
            textAlign: "left",
            marginTop: "1.5rem",
            overflowX: "auto",
            maxWidth: "800px",
            width: "90%",
            color: "#94a3b8",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
          }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #0ea5e9, #818cf8)",
              border: "none",
              borderRadius: "50px",
              color: "#070b14",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.1em"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
