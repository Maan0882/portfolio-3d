import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
