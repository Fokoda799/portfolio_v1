"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useAudio } from '@/contexts/AudioContext';
import { useManualTheme } from '@/contexts/ThemContext';
import { Sparkles, Shield, Globe } from 'lucide-react';

export default function HUD() {
  const t = useTranslations();
  const { theme } = useManualTheme();
  const { isMuted, toggleMute, hasConsent } = useAudio();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const locales = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    // { code: 'ar', label: 'AR', name: 'العربية' },
  ];

  const currentLocale = pathname.split('/')[1] || 'en';

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const pathSegments = pathname.split('/').filter(Boolean);
    pathSegments[0] = newLocale;
    const newPath = '/' + pathSegments.join('/');

    if (newLocale !== 'ar') {
      router.push(newPath);
    } else {
      window.location.href = newPath;
    }
  };

  if (!mounted) {
    return (
      <div className="fixed top-5 right-4 z-40 flex gap-2">
        <div className="flex flex-row gap-2">
          <div className="pixel-button bg-slate-800 text-amber-400 p-3 w-[44px] h-[44px]" />
          <div className="pixel-button bg-slate-800 text-amber-400 p-3 w-[44px] h-[44px]" />
          <div className="pixel-button bg-slate-800 text-amber-400 p-3 w-[44px] h-[44px]" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Logo - Fixed at top left */}
      <motion.div
        className="absolute top-5 left-4 z-40"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-amber-500 to-purple-500 blur-2xl opacity-20"
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
            opacity: isHovered ? [0.2, 0.35, 0.2] : 0.2,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo Container */}
        <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-amber-500/40 rounded backdrop-blur-sm">
          {/* Animated corner decorations */}
          <motion.div
            className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-amber-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t border-r border-amber-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b border-l border-amber-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-amber-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />

          {/* Shield & initials */}
          <motion.div
            className="relative"
            animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-8 h-8">
              <Shield className="w-8 h-8 text-amber-500 absolute" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-bold text-purple-300 drop-shadow-lg" style={{ fontFamily: 'monospace' }}>
                  AN
                </span>
              </motion.div>

              {/* Orbiting particles */}
              {isHovered && Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full"
                  style={{ top: '50%', left: '50%' }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI) / 2) * 20],
                    y: [0, Math.sin((i * Math.PI) / 2) * 20],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Text Logo */}
          <div className="flex flex-col leading-tight">
            <motion.div
              className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 drop-shadow-lg whitespace-nowrap"
              animate={{ backgroundPosition: isHovered ? ['0%', '100%', '0%'] : '0%' }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ 
                backgroundSize: '200% 100%',
                fontFamily: 'monospace'
              }}
            >
              Abdellah N.H
            </motion.div>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <div className="w-6 h-px bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-[0.6rem] text-slate-400 whitespace-nowrap" style={{ fontFamily: 'monospace' }}>
                Lv.99 Dev
              </span>
            </div>
          </div>

          {/* Floating sparkles */}
          {isHovered && Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${25 + i * 20}%`, top: `${40 + (i % 2) * 20}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -15] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            >
              <Sparkles className="w-2 h-2 text-yellow-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* HUD Buttons - Fixed at top right */}
      <motion.div 
        className="absolute top-5 right-4 z-40 flex gap-2" 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-row gap-2">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border-2 border-amber-500/50 p-3 w-[44px] h-[44px] flex items-center justify-center transition-colors duration-200 shadow-lg"
              title="Change Language"
              style={{ imageRendering: 'pixelated' }}
            >
              <Globe className="w-4 h-4" />
            </button>
            
            {/* Language dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-slate-900/95 backdrop-blur-sm min-w-[140px] border-2 border-amber-500/30 shadow-xl">
                    {locales.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => handleLocaleChange(locale.code)}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                          currentLocale === locale.code
                            ? 'text-amber-400 bg-slate-800'
                            : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        }`}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {locale.label} - {locale.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
