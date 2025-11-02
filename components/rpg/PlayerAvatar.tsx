"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PlayerAvatarProps {
  position?: { x: number; y: number };
  isMoving?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function PlayerAvatar({
  position = { x: 0, y: 0 },
  isMoving = false,
  direction = 'down'
}: PlayerAvatarProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isMoving) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, [isMoving]);

  const getRotation = () => {
    switch (direction) {
      case 'up': return 180;
      case 'down': return 0;
      case 'left': return 90;
      case 'right': return -90;
      default: return 0;
    }
  };

  return (
    <motion.div
      className="relative w-16 h-16 pixel-image"
      animate={{
        x: position.x,
        y: position.y,
        rotate: getRotation()
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 pixel-borders relative">
        {/* Face/helmet detail */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full" />

        {/* Moving shadow */}
        {isMoving && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900/30 rounded-full blur-sm"
            animate={{
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
            }}
          />
        )}
      </div>

      {/* Name label */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-pixel text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Hero
        </span>
      </motion.div>
    </motion.div>
  );
}