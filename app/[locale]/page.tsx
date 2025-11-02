"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import Navigation from '@/components/rpg/Navigation';
import HUD from '@/components/rpg/HUD';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
// import MagicCursor from '@/components/ui/MagicCursor';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sections = [
    { id: 'home', component: HeroSection },
    { id: 'about', component: AboutSection },
    { id: 'projects', component: ProjectsSection },
    { id: 'skills', component: SkillsSection },
    { id: 'experience', component: ExperienceSection },
    // { id: 'resume', component: ResumeSection },
    { id: 'contact', component: ContactSection },
    // { id: 'testimonials', component: TestimonialsSection },
  ];

  const handleNavigate = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = sectionsRef.current[section.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const currentIndex = sections.findIndex(s => s.id === activeSection);

      if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        handleNavigate(sections[currentIndex + 1].id);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        handleNavigate(sections[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSection]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const burst = document.createElement("div");
      burst.className = "click-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 600);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <main className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
        {/* Mouse glow effect */}
        <div
          className="pointer-events-none fixed z-30 transition-opacity duration-300"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle at center, rgba(216, 216, 216, 0.15), transparent 80%)',
            filter: 'blur(80px)',
            left: mousePosition.x - 396,
            top: mousePosition.y - 396,
          }}
        />
        {/* <Navigation activeSection={activeSection} onNavigate={handleNavigate} /> */}
        <HUD />
        {/* <MagicCursor /> */}
        <div className="relative z-20">
          {sections.map(({ id, component: Component }) => (
            <div
              key={id}
              ref={(el) => {
                sectionsRef.current[id] = el;
              }}
              id={id}
            >
              <Component onNavigate={handleNavigate} />
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-slate-950 border-t-4 border-amber-500 py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.p
              className="text-slate-400 text-sm mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Crafted with{' '}
              <span className="text-red-500">♥</span>{' '}
              and{' '}
              <span className="text-amber-400">pixels</span>
            </motion.p>
            <div className="flex justify-center gap-4 flex-wrap text-xs text-slate-500">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <span>© 2025 RPG Portfolio</span>
            </div>
            <p className="text-xs text-slate-600 mt-4 font-pixel">
              Level 99 Developer
            </p>
          </div>
        </footer>
    </>
  );
}