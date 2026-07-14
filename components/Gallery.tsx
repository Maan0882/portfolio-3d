"use client";

import React, { useState } from 'react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('achievements');

  return (
    <section id="gallery" className="gallery" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <h2 className="section-title">
        <span className="chonky-underline chonky-underline-magenta">Gallery.</span>
      </h2>
      
      <div className="gallery-tabs" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          className="btn"
          onClick={() => setActiveTab('achievements')}
          style={{ 
            padding: '0.5rem 1.5rem', 
            background: activeTab === 'achievements' ? 'var(--color-cyan)' : 'transparent', 
            color: activeTab === 'achievements' ? 'var(--color-bg)' : 'var(--color-cyan)', 
            border: '1px solid var(--color-cyan)',
            cursor: 'pointer'
          }}
        >
          Achievements
        </button>
        <button 
          className="btn"
          onClick={() => setActiveTab('projects')}
          style={{ 
            padding: '0.5rem 1.5rem', 
            background: activeTab === 'projects' ? 'var(--color-cyan)' : 'transparent', 
            color: activeTab === 'projects' ? 'var(--color-bg)' : 'var(--color-cyan)', 
            border: '1px solid var(--color-cyan)',
            cursor: 'pointer'
          }}
        >
          Live Projects
        </button>
      </div>

      <div className="gallery-content">
        {activeTab === 'achievements' && (
          <div className="gallery-grid">
            <div className="gallery-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src="/1.jpg" alt="Techstrota Star Achiever" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Techstrota Star Achiever 2026</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>3rd Rank Holder in College</p>
            </div>
            {/* Add more achievement images here when ready */}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="gallery-grid">
            <div className="gallery-item" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '250px' }}>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>More project images coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
