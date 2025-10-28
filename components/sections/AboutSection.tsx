"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { User, Heart, Code, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('about');

  const stats = [
    { icon: Code, label: 'Projects', value: '50+', color: 'text-blue-400' },
    { icon: Heart, label: 'Coffee Cups', value: '∞', color: 'text-red-400' },
    { icon: Sparkles, label: 'Lines of Code', value: '100k+', color: 'text-amber-400' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-pixel text-amber-400 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rpg-card"
          >
            <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center pixel-image">
              <User className="w-32 h-32 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="dialogue-box">
              <p className="text-lg text-slate-300 leading-relaxed">
                {t('mission')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rpg-card text-center"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="font-pixel text-xl text-amber-400">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pixel-button bg-amber-500 hover:bg-amber-600 text-black font-pixel text-sm px-6 py-3 w-full"
            >
              {t('readMore')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
