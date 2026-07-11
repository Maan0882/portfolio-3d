import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Header from '../components/Header';

export default function Page() {
  return (
    <div className="container">
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
      </main>

      <Contact />
    </div>
  );
}
