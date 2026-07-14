"use client";
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="header" style={{ position: 'relative', zIndex: 100 }}>
      <div className="logo">mg.</div>
      
      {/* Desktop Navigation */}
      <nav className="nav desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
      </nav>

      {/* Hamburger Button for Mobile */}
      <button 
        className="hamburger-btn" 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation Drawer Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
