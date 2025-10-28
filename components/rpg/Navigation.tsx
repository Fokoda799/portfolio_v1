"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, User, Sword, Target, Clock, Scroll, Mail, Users } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { useXP } from '@/contexts/XPContext';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, key: 'nav.home' },
  { id: 'about', icon: User, key: 'nav.about' },
  { id: 'projects', icon: Sword, key: 'nav.projects' },
  { id: 'skills', icon: Target, key: 'nav.skills' },
  { id: 'experience', icon: Clock, key: 'nav.experience' },
  { id: 'resume', icon: Scroll, key: 'nav.resume' },
  { id: 'contact', icon: Mail, key: 'nav.contact' },
  { id: 'testimonials', icon: Users, key: 'nav.testimonials' },
];

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const t = useTranslations();
  const { playSound } = useAudio();
  const { addXP, unlockAchievement } = useXP();

  const handleNavigate = (section: string) => {
    playSound('click');
    addXP(5, `Navigated to ${section}`);
    unlockAchievement('explorer');
    onNavigate(section);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="font-pixel text-amber-400 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            RPG.DEV
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  px-3 py-2 rounded-none text-xs font-pixel transition-all relative
                  ${activeSection === item.id
                    ? 'text-amber-400 bg-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }
                `}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <item.icon className="w-4 h-4 inline-block mr-1" />
                <span className="hidden lg:inline">{t(item.key)}</span>

                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"
                    layoutId="activeNav"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              className="font-pixel text-xs text-amber-400 hidden sm:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-slate-400">LV</span> 99
            </motion.div>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between pb-2 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`
                p-2 transition-colors
                ${activeSection === item.id
                  ? 'text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
