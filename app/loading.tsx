"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Sparkles } from 'lucide-react';

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Quest...');

  const loadingMessages = [
    'Initializing Quest...',
    'Loading Character Data...',
    'Preparing Adventure...',
    'Summoning Magic...',
    'Forging Weapons...',
    'Ready for Battle!',
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Change loading text
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Radial glow effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-6 max-w-md">
              {/* Shield Logo with rotating effect */}
              <motion.div
                className="mb-8 relative inline-block"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-amber-500 rounded-full blur-3xl opacity-40"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <Shield className="w-24 h-24 text-amber-500" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <span className="text-3xl font-bold text-purple-300" style={{ fontFamily: 'monospace' }}>
                      AN
                    </span>
                  </motion.div>

                  {/* Orbiting swords */}
                  <motion.div
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sword className="w-6 h-6 text-cyan-400 absolute" style={{ top: -30, left: 9 }} />
                  </motion.div>
                  <motion.div
                    className="absolute"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 absolute" style={{ bottom: -30, left: 9 }} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"
                style={{ 
                  fontFamily: 'monospace',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Abdellah Nait Hadid
              </motion.h1>

              <motion.p
                className="text-purple-300 text-lg mb-8"
                style={{ fontFamily: 'monospace' }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Portfolio Quest
              </motion.p>

              {/* Loading text with typewriter effect */}
              <motion.div
                className="mb-6 h-8"
                key={loadingText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-amber-400 text-sm" style={{ fontFamily: 'monospace' }}>
                  {loadingText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                </p>
              </motion.div>

              {/* Progress bar container */}
              <div className="relative w-full">
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

                {/* Progress bar background */}
                <div className="bg-slate-900/80 border-2 border-amber-500/50 rounded h-8 overflow-hidden backdrop-blur-sm">
                  {/* Progress fill */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 relative"
                    style={{
                      width: `${progress}%`,
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Progress percentage */}
                <motion.div
                  className="mt-2 text-amber-400 text-sm font-bold"
                  style={{ fontFamily: 'monospace' }}
                  animate={{
                    scale: progress === 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  {progress}%
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}