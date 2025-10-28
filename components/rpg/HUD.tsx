"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Volume2, VolumeX, Sun, Moon, Globe } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useManualTheme } from '@/contexts/ThemContext';

export default function HUD() {
  const t = useTranslations();
  const { theme, toggleTheme } = useManualTheme();
  const { isMuted, toggleMute, hasConsent } = useAudio();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Set mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const locales = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'ar', label: 'AR', name: 'العربية' }
  ];

  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    console.log('Current locale:', currentLocale);
    console.log('Pathname:', pathname);
  }, [currentLocale, pathname]);

  const handleLocaleChange = (newLocale: string) => {
    // Prevent unnecessary change
    if (newLocale === currentLocale) return;

    const pathSegments = pathname.split('/').filter(Boolean);

    // Replace the first segment (current locale) with the new one
    pathSegments[0] = newLocale;

    const newPath = '/' + pathSegments.join('/');

    if (newLocale !== 'ar') {
      router.push(newPath);
    } else {
      // For Arabic, reload the page to apply RTL properly
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
    <motion.div
      className="absolute top-5 right-4 z-40 flex gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <AnimatePresence>
          <motion.div
            className="flex flex-row gap-2"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* {hasConsent && (
              <button
                onClick={toggleMute}
                className="pixel-button bg-slate-800 hover:bg-slate-700 text-amber-400 p-3"
                title={isMuted ? t('hud.unmute') : t('hud.mute')}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )} */}

            {/* <button
              onClick={() => {
                console.log('Toggling theme from:', theme);
                toggleTheme();
              }}
              className="pixel-button bg-slate-800 hover:bg-slate-700 text-amber-400 p-3"
              title={t('hud.them')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button> */}

            <div className="relative group">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="pixel-button bg-slate-800 hover:bg-slate-700 text-amber-400 p-3 w-full"
                title={t('hud.language')}
              >
                <Globe className="w-4 h-4" />
              </button>

              <div className={`absolute right-0 mt-2 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
                <div className="rpg-card bg-slate-900 backdrop-blur-sm min-w-[140px]">
                  {locales.map((locale) => (
                    <button
                      key={locale.code}
                      onClick={() => handleLocaleChange(locale.code)}
                      className={`
                        w-full text-left px-3 py-2 text-xs font-pixel transition-colors
                        ${currentLocale === locale.code
                          ? 'text-amber-400 bg-slate-800'
                          : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
                        }
                      `}
                    >
                      {locale.label} - {locale.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}