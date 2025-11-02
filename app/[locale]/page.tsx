"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HUD from '@/components/rpg/HUD';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import { ArrowBigUpDash } from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showArrow, setShowArrow] = useState(false);

  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    { id: 'home', component: HeroSection },
    { id: 'about', component: AboutSection },
    { id: 'projects', component: ProjectsSection },
    { id: 'skills', component: SkillsSection },
    { id: 'experience', component: ExperienceSection },
    { id: 'contact', component: ContactSection },
    { id: 'footer', component: FooterSection },
  ];

  const handleNavigate = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollMiddle = window.scrollY + window.innerHeight / 2;

      // Update active section
      for (const section of sections) {
        const el = sectionsRef.current[section.id];
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < bottom) {
            if (activeSection !== section.id) setActiveSection(section.id);
            break;
          }
        }
      }

      // Show "scroll back to hero" arrow if scrolled past hero
      const heroEl = sectionsRef.current['home'];
      if (heroEl) {
        setShowArrow(window.scrollY > heroEl.offsetHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const idx = sections.findIndex(s => s.id === activeSection);
      if (e.key === 'ArrowDown' && idx < sections.length - 1) {
        e.preventDefault();
        handleNavigate(sections[idx + 1].id);
      }
      if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault();
        handleNavigate(sections[idx - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSection]);

  // Mouse position for glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <main className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        {/* Mouse glow */}
        <div
          className="pointer-events-none fixed z-30 transition-opacity duration-300"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle at center, rgba(216,216,216,0.15), transparent 80%)',
            filter: 'blur(80px)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
        />

        <HUD />

        {/* Scroll back to hero arrow */}
        {showArrow && (
          <motion.div 
            className="fixed bottom-10 right-2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border-2 border-amber-500/50 p-1 rounded transition-colors shadow-lg"
              onClick={() => handleNavigate('home')}
              title="Back to Top"
            >
              <ArrowBigUpDash className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {/* Sections */}
        <div className="relative z-20">
          {sections.map(({ id, component: Component }) => (
            <div
              key={id}
              ref={(el) => (sectionsRef.current[id] = el)}
              id={id}
            >
              <Component onNavigate={handleNavigate} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
 