"use client";
import React, { useEffect, useState } from 'react';

export default function ThemeToggleInner() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="btn" 
      style={{ padding: '0.5rem 1rem', marginLeft: '1rem', fontSize: '0.9rem', cursor: 'pointer' }}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
    </button>
  );
}
