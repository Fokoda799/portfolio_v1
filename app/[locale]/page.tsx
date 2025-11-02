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

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Add all sections including footer
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
      const offsetTop = element.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollMiddle = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = sectionsRef.current[section.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollMiddle >= offsetTop && scrollMiddle < offsetBottom) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
        />

        <HUD />

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
    </>
  );
}
