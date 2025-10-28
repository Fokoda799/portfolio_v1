'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from 'next/image';

export default function HeroCharacter() {
  const [position, setPosition] = useState({ x: 50, y: 70 });
  const [isWaving, setIsWaving] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newX = Math.random() * 80 + 10;
      const newY = Math.random() * 60 + 20;

      setDirection(newX < position.x ? 'left' : 'right');
      setPosition({ x: newX, y: newY });
    }, 4000);

    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }, 10000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(waveInterval);
    };
  }, [position.x]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '120px',
        height: '120px',
        zIndex: 5,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`,
      }}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
      }}
    >
      <Image
        src={isWaving ? '/hero_wave.gif' : '/hero_walk.gif'}
        alt="Hero Character"
        width={120}
        height={120}
        className="select-none pointer-events-none"
      />
    </motion.div>
  );
}
