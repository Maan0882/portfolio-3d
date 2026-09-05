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
            <div className="gallery-item project-card" style={{ padding: '1.25rem' }}>
              <img src="/1.jpg" alt="Techstrota Star Achiever" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
              <h3 className="gallery-title text-slate-900 dark:text-white" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Techstrota Star Achiever 2026</h3>
              <p className="gallery-caption text-slate-600 dark:text-slate-300" style={{ fontSize: '0.95rem' }}>3rd Rank Holder in College</p>
            </div>
            {/* Add more achievement images here when ready */}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="gallery-grid">
            <div className="gallery-item project-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '250px' }}>
              <p className="text-slate-600 dark:text-slate-300" style={{ fontFamily: 'var(--font-mono)' }}>More project images coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
