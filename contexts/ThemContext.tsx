"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ManualThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('rpg-manual-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (!mounted) return;
    
    console.log('Applying theme:', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('rpg-manual-theme', theme);
    console.log('HTML classes:', document.documentElement.className);
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log('toggleTheme called, current:', theme);
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      console.log('Setting theme to:', newTheme);
      return newTheme;
    });
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useManualTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useManualTheme must be used within a ManualThemeProvider');
  }
  return context;
}