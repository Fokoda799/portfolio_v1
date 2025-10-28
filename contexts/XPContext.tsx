"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  unlocked: boolean;
}

interface XPContextType {
  xp: number;
  achievements: Achievement[];
  addXP: (amount: number, reason?: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

const defaultAchievements: Achievement[] = [
  { id: 'first-visit', title: 'First Visit', unlocked: false },
  { id: 'explorer', title: 'Section Explorer', unlocked: false },
  { id: 'reader', title: 'Lore Master', unlocked: false },
  { id: 'clicker', title: 'Button Masher', unlocked: false },
];

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpGained, setXPGained] = useState(0);

  useEffect(() => {
    const savedXP = localStorage.getItem('rpg-xp');
    const savedAchievements = localStorage.getItem('rpg-achievements');

    if (savedXP) setXP(parseInt(savedXP));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

    unlockAchievement('first-visit');
  }, []);

  const addXP = (amount: number, reason?: string) => {
    setXP(prev => {
      const newXP = prev + amount;
      localStorage.setItem('rpg-xp', String(newXP));
      return newXP;
    });

    setXPGained(amount);
    setShowXPNotification(true);
    setTimeout(() => setShowXPNotification(false), 2000);
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => {
      const updated = prev.map(a =>
        a.id === achievementId && !a.unlocked
          ? { ...a, unlocked: true }
          : a
      );
      localStorage.setItem('rpg-achievements', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <XPContext.Provider value={{ xp, achievements, addXP, unlockAchievement }}>
      {children}
      {showXPNotification && (
        <div className="fixed top-4 right-4 z-50 pixel-borders bg-amber-500 text-black px-4 py-2 font-pixel text-sm animate-bounce">
          +{xpGained} XP
        </div>
      )}
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}
