import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mansi Gajjar | 3D Portfolio",
  description:
    "Full Stack Developer portfolio — an immersive 3D scroll-driven journey through my tech stack: Next.js, Laravel, Alpine.js, Livewire, Docker & more.",
  keywords: [
    "Mansi Gajjar",
    "Full Stack Developer",
    "Next.js",
    "Laravel",
    "3D Portfolio",
    "React Three Fiber",
  ],
  authors: [{ name: "Mansi Gajjar" }],
  openGraph: {
    title: "Mansi Gajjar | 3D Portfolio",
    description: "Immersive scroll-driven 3D developer portfolio",
    url: "https://portfolio-mansi-gajjar.vercel.app",
    type: "website",
  },
};

// Proper viewport config — prevents mobile browsers from zooming in
// on tap and ensures 1:1 pixel ratio with layout width
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#070b14",
  // Fill the entire screen on notched/punch-hole phones
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload the 3D scene font at highest priority — prevents blank text on slow networks */}
        <link
          rel="preload"
          href="/fonts/SpaceMono-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
