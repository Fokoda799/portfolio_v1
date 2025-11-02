"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeDebug() {
  const { theme, setTheme, resolvedTheme, themes, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 font-mono text-xs">Loading...</div>;

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 font-mono text-xs max-w-md z-50 border-2 border-white">
      <h3 className="font-bold mb-2">Theme Debug Info:</h3>
      <div>theme: {String(theme)}</div>
      <div>resolvedTheme: {String(resolvedTheme)}</div>
      <div>systemTheme: {String(systemTheme)}</div>
      <div>themes: {themes?.join(', ')}</div>
      <div className="mt-2">
        <button 
          onClick={() => setTheme('light')} 
          className="bg-white text-black px-2 py-1 mr-2"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')} 
          className="bg-gray-800 text-white px-2 py-1"
        >
          Dark
        </button>
      </div>
      <div className="mt-2 text-xs">
        HTML class: {document.documentElement.className || '(empty)'}
      </div>
    </div>
  );
}