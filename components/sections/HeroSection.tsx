"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Sword, Send, Sparkles } from 'lucide-react';
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
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 3,
    }))
  );
  
  const handleCTA = (section: string, xpAmount: number) => {
    // playSound('click');
    // addXP(xpAmount);
    onNavigate(section);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black opacity-90" />
      
      {/* Radial glow effect */}
      <motion.div 
        className="absolute inset-0 bg-radial-gradient"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)'
        }}
      />

      {/* Enhanced background particles */}
      <div className="absolute inset-0 opacity-30">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              background: i % 4 === 0 ? '#fbbf24' : i % 4 === 1 ? '#f59e0b' : i % 4 === 2 ? '#10b981' : '#60a5fa',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-25 left-10 text-amber-500 opacity-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-10 text-blue-500 opacity-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Sword className="w-20 h-20" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main dialogue box with enhanced styling */}
        <motion.div
          className="dialogue-box mb-6 mt-7 max-w-3xl mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-pixel text-amber-400 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {t('greeting')}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {t('intro')}
          </motion.p>

          {/* Stats bar */}
          <motion.div
            className="flex justify-center gap-6 mt-6 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-sm font-pixel text-slate-400">
              <span className="text-red-500">❤</span>
              <span>Full Stack</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-pixel text-slate-400">
              <span className="text-blue-500">⚡</span>
              <span>Creative</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-pixel text-slate-400">
              <span className="text-amber-500">★</span>
              <span>Level 99</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-6 justify-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Projects Button - Epic Quest Style */}
          <motion.button
            onClick={() => handleCTA('projects', 10)}
            className="pixel-button relative group px-8 py-4 font-pixel text-base overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            
            {/* Corner crystals */}
            <span className="absolute top-0 left-0 w-2 h-2 bg-yellow-300 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 left-0 w-2 h-2 bg-yellow-300 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-300 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pulsing border effect */}
            <motion.div
              className="absolute inset-0 border-2 border-emerald-300"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Content */}
            <span className="relative z-10 flex items-center text-white drop-shadow-lg">
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sword className="w-5 h-5 inline-block mr-2" />
              </motion.span>
              {t('cta.projects')}
              <motion.span 
                className="ml-2 text-yellow-300 font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚔
              </motion.span>
            </span>
            
            {/* Sparkle particles on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={false}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [-10, -20],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    repeatDelay: 0.5,
                  }}
                />
              ))}
            </motion.div>
          </motion.button>

          {/* Contact Button - Mystical Portal Style */}
          <motion.button
            onClick={() => handleCTA('contact', 10)}
            className="pixel-button relative group px-8 py-4 font-pixel text-base overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              }}
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.3,
              }}
            />
            
            {/* Rotating magic circles */}
            <motion.div
              className="absolute inset-0 border-2 border-purple-300 rounded-sm opacity-40"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            
            <motion.div
              className="absolute inset-0 border-2 border-cyan-300 rounded-sm opacity-40"
              animate={{
                rotate: -360,
                scale: [1.05, 1, 1.05],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
            />
            
            {/* Corner runes */}
            <motion.span 
              className="absolute top-1 left-1 text-cyan-300 text-xs opacity-0 group-hover:opacity-100"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ◈
            </motion.span>
            <motion.span 
              className="absolute top-1 right-1 text-cyan-300 text-xs opacity-0 group-hover:opacity-100"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ◈
            </motion.span>
            <motion.span 
              className="absolute bottom-1 left-1 text-cyan-300 text-xs opacity-0 group-hover:opacity-100"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
            >
              ◈
            </motion.span>
            <motion.span 
              className="absolute bottom-1 right-1 text-cyan-300 text-xs opacity-0 group-hover:opacity-100"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
            >
              ◈
            </motion.span>
            
            {/* Content */}
            <span className="relative z-10 flex items-center text-white drop-shadow-lg">
              <motion.span
                animate={{ 
                  x: [0, 2, 0, -2, 0],
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Send className="w-5 h-5 inline-block mr-2" />
              </motion.span>
              {t('cta.contact')}
              <motion.span 
                className="ml-2 text-cyan-300 font-bold"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✦
              </motion.span>
            </span>
            
            {/* Magic particles on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={false}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: '3px',
                    height: '3px',
                    background: i % 2 === 0 ? '#67e8f9' : '#c084fc',
                    left: `${15 + i * 12}%`,
                    top: `${50}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, (i % 2 === 0 ? 10 : -10), 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    repeatDelay: 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="text-sm font-pixel text-slate-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t('scroll')}
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="flex flex-col gap-1 cursor-pointer" onClick={() => onNavigate('about')}>
              <span className="text-amber-400 text-xl">▼</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}