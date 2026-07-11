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
  icons: {
    icon: "/favicon.ico", // Points to public/favicon.ico
  },
  openGraph: {
    title: "Mansi Gajjar | 3D Portfolio",
    description: "Immersive scroll-driven 3D developer portfolio",
    url: "https://tamalsen.dev",
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

import { Poppins, Roboto_Mono } from 'next/font/google';
import BackgroundLogos from '../components/BackgroundLogos';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body>
        <BackgroundLogos />
        {children}
      </body>
    </html>
  );
}
