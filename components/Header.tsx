"use client";
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--color-heading)',
          fontSize: '1.8rem',
          cursor: 'pointer',
          zIndex: 110
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation Drawer Overlay */}
      {menuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.5rem',
            zIndex: 105,
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <a href="#about" onClick={closeMenu} style={{ fontSize: '1.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>About</a>
          <a href="#projects" onClick={closeMenu} style={{ fontSize: '1.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>Projects</a>
          <a href="#gallery" onClick={closeMenu} style={{ fontSize: '1.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>Gallery</a>
          <a href="#contact" onClick={closeMenu} style={{ fontSize: '1.5rem', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>Contact</a>
          <div style={{ marginTop: '1rem' }}>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Styles local to mobile header behavior */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
