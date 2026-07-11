"use client";
import dynamic from 'next/dynamic';

const ThemeToggleInner = dynamic(() => import('./ThemeToggleInner'), { ssr: false });

export default function ThemeToggle() {
  return <ThemeToggleInner />;
}

