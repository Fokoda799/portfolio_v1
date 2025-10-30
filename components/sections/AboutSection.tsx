"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Image from 'next/image';

interface AboutSectionProps {
  onNavigate?: (section: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const t = useTranslations('about');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownloadResume = () => {
    // Add your resume download logic here
    const resumeUrl = '/resume.pdf'; // Update with your actual resume path
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-pixel text-amber-400 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rpg-card cursor-pointer group w-full max-w-md mx-auto"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div 
              className="aspect-square w-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg overflow-hidden pixel-image relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Image */}
                <div 
                  className="absolute w-full h-full inset-0 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image 
                    src="/images/pixel_me.png" 
                    alt="Profile Picture" 
                    width={400} 
                    height={400} 
                    className="rounded-lg w-full h-full object-cover object-center" 
                  />
                </div>
                
                {/* Back Image */}
                <div 
                  className="absolute w-full h-full inset-0 flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <Image 
                    src="/images/me.png" 
                    alt="Alternate Profile" 
                    width={400} 
                    height={400} 
                    className="rounded-lg w-full h-full object-cover object-center" 
                  />
                </div>
              </motion.div>
              
              {/* Click hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/70 px-3 py-1 rounded-full text-xs text-white font-pixel">
                  {t('image')}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="dialogue-box">
              <h3 className="text-xl md:text-2xl font-pixel text-amber-400 mb-4">
                {t('heading')}
              </h3>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-4">
                {t('mission')}
              </p>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                {t('about')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="pixel-button bg-amber-500 hover:bg-amber-600 text-black font-pixel text-xs px-4 py-3 flex items-center justify-center"
              >
                {t('resume')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}