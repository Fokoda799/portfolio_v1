"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  hasConsent: boolean;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  giveConsent: () => void;
  playSound: (soundName: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (true) return;

    const savedMuted = localStorage.getItem('rpg-audio-muted');
    const savedVolume = localStorage.getItem('rpg-audio-volume');
    const savedConsent = localStorage.getItem('rpg-audio-consent');

    if (savedMuted !== null) {
      setIsMuted(savedMuted === 'true');
    }
    if (savedVolume !== null) {
      setVolumeState(parseFloat(savedVolume));
    }
    if (savedConsent !== null) {
      setHasConsent(savedConsent === 'true');
    } else {
      setTimeout(() => setShowConsentModal(true), 2000);
    }
  }, [isClient]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (isClient) {
      localStorage.setItem('rpg-audio-muted', String(newMuted));
    }
    console.log('Audio muted:', newMuted);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (isClient) {
      localStorage.setItem('rpg-audio-volume', String(newVolume));
    }
  };

  const giveConsent = () => {
    setHasConsent(true);
    setShowConsentModal(false);
    setIsMuted(false);
    if (isClient) {
      localStorage.setItem('rpg-audio-consent', 'true');
      localStorage.setItem('rpg-audio-muted', 'false');
    }
    console.log('Audio consent given');
  };

  const declineConsent = () => {
    setHasConsent(false);
    setShowConsentModal(false);
    setIsMuted(true);
    if (isClient) {
      localStorage.setItem('rpg-audio-consent', 'false');
      localStorage.setItem('rpg-audio-muted', 'true');
    }
  };

  const playSound = (soundName: string) => {
    console.log('playSound called:', { soundName, isMuted, hasConsent, isClient });
    
    if (isMuted) {
      console.log('Sound blocked: Audio is muted');
      return;
    }

    if (!isClient) {
      console.log('Sound blocked: Not on client side');
      return;
    }

    try {
      // Create audio element if it doesn't exist
      if (!audioRefs.current[soundName]) {
        console.log('Creating new audio element for:', soundName);
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.preload = 'auto';
        audioRefs.current[soundName] = audio;
      }

      const audio = audioRefs.current[soundName];
      audio.volume = volume;
      audio.currentTime = 0;
      
      console.log('Attempting to play:', soundName);
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Sound played successfully:', soundName);
          })
          .catch((error) => {
            console.error('Failed to play sound:', soundName, error);
            console.error('Error details:', {
              name: error.name,
              message: error.message,
              code: error.code
            });
          });
      }
    } catch (error) {
      console.error('Error in playSound:', soundName, error);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, volume, hasConsent, toggleMute, setVolume, giveConsent, playSound }}>
      {children}
      {showConsentModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="pixel-borders bg-slate-900 p-8 max-w-md mx-4 text-center">
            <h3 className="text-xl font-pixel text-amber-400 mb-4">
              🎵 Audio Quest
            </h3>
            <p className="text-slate-300 mb-6">
              Would you like background music and sound effects for your adventure?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={giveConsent}
                className="pixel-button bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                Yes, Play Audio
              </button>
              <button
                onClick={declineConsent}
                className="pixel-button bg-slate-600 hover:bg-slate-700 text-white px-6 py-2"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}