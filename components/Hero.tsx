import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-greeting">Hello, world! I'm</div>
        <h1 className="hero-title">
          <span className="chonky-underline chonky-underline-magenta">Mansi Gajjar.</span>
        </h1>
        <h2 className="hero-subtitle">
          I'm a <span className="chonky-underline chonky-underline-blue">Web Developer $ Data Analyst </span> &amp; MSc Information Technology student. I'm highly motivated, with a solid academic foundation in Computer Science and hands-on full-stack development experience.
        </h2>
        <div className="project-links" style={{ marginTop: '2rem' }}>
          <a href="https://github.com/Maan0882" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.75rem 1.5rem', background: 'var(--color-bg)', border: '1px solid var(--color-cyan)', color: 'var(--color-cyan)' }}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/2808-mansi-gajjar" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.75rem 1.5rem', background: 'var(--color-bg)', border: '1px solid var(--color-cyan)', color: 'var(--color-cyan)' }}>
            LinkedIn
          </a>
          <a href="/Mansi_Gajjar_CV.pdf" download="Mansi_Gajjar_CV.pdf" className="btn">
            Download CV
          </a>
        </div>
      </div>

      <div className="code-quote-container" style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        borderRadius: '12px',
        padding: '1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1.2rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></span>
        </div>
        <pre style={{ margin: 0, overflowX: 'auto', color: 'var(--color-text)' }}>
          <code>
            <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>// Solving bugs is 10% writing code and 90% understanding why it didn't work.</span><br />
            <span style={{ color: 'var(--code-keyword)' }}>const</span> <span style={{ color: 'var(--color-cyan)' }}>solveBugs</span> = (<span style={{ color: 'var(--code-variable)' }}>code</span>) =&gt; &#123;<br />
            &nbsp;&nbsp;<span style={{ color: 'var(--code-keyword)' }}>while</span> (code.<span style={{ color: 'var(--code-function)' }}>hasBugs</span>()) &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--code-function)' }}>drinkCoffee</span>();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;code = <span style={{ color: 'var(--code-function)' }}>understandAndFix</span>(code);<br />
            &nbsp;&nbsp;&#125;<br />
            &nbsp;&nbsp;<span style={{ color: 'var(--code-keyword)' }}>return</span> <span style={{ color: 'var(--code-string)' }}>"✨ Success! Web App is Live."</span>;<br />
            &#125;;
          </code>
        </pre>
      </div>
    </section>
  );
}
