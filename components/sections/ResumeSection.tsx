"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Printer, FileText } from 'lucide-react';
import { useXP } from '@/contexts/XPContext';
import { useAudio } from '@/contexts/AudioContext';

export default function ResumeSection() {
  const t = useTranslations('resume');
  const { addXP } = useXP();
  const { playSound } = useAudio();

  const handleDownload = () => {
    playSound('click');
    addXP(15);
    alert('Resume download would trigger here. Add your PDF URL to /public/resume.pdf');
  };

  const handlePrint = () => {
    playSound('click');
    addXP(10);
    window.print();
  };

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-pixel text-amber-400 mb-2">
            {t('title')}
          </h2>
          <p className="text-slate-400 text-lg">{t('subtitle')}</p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rpg-card max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <FileText className="w-32 h-32 text-amber-400" />
          </div>

          <div className="dialogue-box mb-8">
            <p className="text-slate-300 text-center leading-relaxed">
              Your complete professional profile awaits! Download the legendary scroll containing
              all your skills, experience, and achievements in a recruiter-friendly format.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.button
              onClick={handleDownload}
              className="pixel-button bg-amber-500 hover:bg-amber-600 text-black font-pixel text-sm px-6 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 inline-block mr-2" />
              {t('download')}
            </motion.button>

            <motion.button
              onClick={handlePrint}
              className="pixel-button bg-slate-600 hover:bg-slate-700 text-white font-pixel text-sm px-6 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Printer className="w-5 h-5 inline-block mr-2" />
              {t('print')}
            </motion.button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-slate-700">
            <h3 className="font-pixel text-sm text-amber-400 mb-4 text-center">
              Quick Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-pixel text-2xl text-emerald-400">5+</div>
                <div className="text-xs text-slate-400 mt-1">Years</div>
              </div>
              <div>
                <div className="font-pixel text-2xl text-blue-400">50+</div>
                <div className="text-xs text-slate-400 mt-1">Projects</div>
              </div>
              <div>
                <div className="font-pixel text-2xl text-purple-400">20+</div>
                <div className="text-xs text-slate-400 mt-1">Skills</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
