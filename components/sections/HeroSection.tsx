"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Sword, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import PlayerAvatar from '../rpg/PlayerAvatar';
import { useAudio } from '@/contexts/AudioContext';
import { useXP } from '@/contexts/XPContext'; 

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const t = useTranslations('hero');
  const { playSound } = useAudio();
  const { addXP } = useXP();
  const [particles] = useState(() => 
    Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
  );
  

  const handleCTA = (section: string, xpAmount: number) => {
    playSound('click');
    // addXP(xpAmount);
    onNavigate(section);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">


      {/* Background particles using Framer Motion */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          className="dialogue-box mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-pixel text-amber-400 mb-4 leading-relaxed whitespace-nowrap">
            {t('greeting')}
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            {t('intro')}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => handleCTA('projects', 10)}
            className="pixel-button bg-emerald-600 hover:bg-emerald-700 text-white font-pixel text-sm px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sword className="w-6 h-6 inline-block mr-2" />
            
            {t('cta.projects')}
          </motion.button>

          <motion.button
            onClick={() => handleCTA('contact', 10)}
            className="pixel-button bg-blue-600 hover:bg-blue-700 text-white font-pixel text-sm px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-6 h-6 inline-block mr-2" />
            {t('cta.contact')}
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-12 text-xs font-pixel text-slate-500 animate-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ▼ {t('scroll')} ▼
        </motion.div>
      </div>
    </section>
  );
}