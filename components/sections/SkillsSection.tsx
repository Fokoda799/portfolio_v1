"use client";

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Skill } from '@/types/database';
import { getTranslation } from '@/lib/i18n';

export default function SkillsSection() {
  const t = useTranslations('skills');
  const locale = useLocale();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true });

    if (data && !error) {
      setSkills(data);
    }
  };

  const categories = ['languages', 'frameworks', 'tools', 'technologies'];

  const getSkillsByCategory = (category: string) =>
    skills.filter(skill => skill.category === category);

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category];
    if (!container) return;
    
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-pixel text-amber-400 mb-2">
            {t('title')}
          </h2>
          <p className="text-slate-400">{t('subtitle')}</p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-3" />
        </motion.div>

        {/* Categories with Horizontal Scroll */}
        <div className="space-y-10">
          {categories.map((category, categoryIndex) => {
            const categorySkills = getSkillsByCategory(category);
            
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header with Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-pixel text-xl text-amber-400">
                    {t(`categories.${category}`)}
                  </h3>
                  
                  {/* Scroll Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => scroll(category, 'left')}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => scroll(category, 'right')}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrolling Container */}
                <div
                  ref={(el) => { scrollRefs.current[category] = el; }}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: skillIndex * 0.05 }}
                      onClick={() => setSelectedSkill(skill)}
                      className="group flex-shrink-0 w-64 rpg-card p-5 cursor-pointer hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/30 transition-all hover:-translate-y-1"
                    >
                      {/* Card Content */}
                      <div className="flex items-start gap-4 mb-4">
                        {/* Logo */}
                        <div className="relative w-16 h-16 bg-white rounded-lg flex-shrink-0 overflow-hidden group-hover:scale-110 transition-transform shadow-md">
                          {skill.icon ? (
                            <Image
                              src={skill.icon}
                              alt={`${getTranslation(skill.name_i18n, locale)} logo`}
                              width={64}
                              height={64}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-300 rounded flex items-center justify-center text-2xl font-bold text-slate-600">
                              {getTranslation(skill.name_i18n, locale).charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Name & Proficiency */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-pixel text-sm text-slate-200 mb-1 truncate">
                            {getTranslation(skill.name_i18n, locale)}
                          </h4>
                          <p className="text-xs font-pixel text-amber-400">
                            {skill.proficiency}% {t('proficient')}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="stat-bar h-3 mb-3">
                        <motion.div
                          className="stat-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.05 + 0.2, ease: "easeOut" }}
                        />
                      </div>

                      {/* Additional Info */}
                      <div className="flex gap-3 text-xs text-slate-400">
                        {skill.years_experience && (
                          <span className="font-pixel">
                            {skill.years_experience}+ {t('yrs')}
                          </span>
                        )}
                        {skill.projects_count && (
                          <span className="font-pixel">
                            {skill.projects_count}+ {t('projects')}
                          </span>
                        )}
                      </div>

                      {/* Hover Indicator */}
                      <div className="mt-3 text-xs text-slate-500 group-hover:text-amber-400 transition-colors text-center font-pixel">
                        {t('details')} →
                      </div>
                    </motion.div>
                  ))}

                  {/* Scroll indicator on mobile */}
                  <div className="flex-shrink-0 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border-4 border-amber-400 rounded-lg p-6 max-w-lg w-full relative shadow-2xl shadow-amber-400/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-amber-400 transition-colors p-1 hover:bg-slate-700 rounded"
              >
                <X size={20} />
              </button>

              {/* Header with Logo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 bg-white rounded-lg p-3 flex-shrink-0 overflow-hidden shadow-lg">
                  {selectedSkill.icon ? (
                    <Image
                      fill
                      src={selectedSkill.icon}
                      alt={`${getTranslation(selectedSkill.name_i18n, locale)} logo`}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-300 rounded flex items-center justify-center text-4xl font-bold text-slate-600">
                      {getTranslation(selectedSkill.name_i18n, locale).charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-pixel text-amber-400 mb-1">
                    {getTranslation(selectedSkill.name_i18n, locale)}
                  </h3>
                  <p className="text-sm text-slate-400 font-pixel uppercase">
                    {t(`categories.${selectedSkill.category}`)}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-[10px] font-pixel text-amber-400 mb-1">{t('proficient')}</p>
                  <p className="text-2xl font-pixel text-slate-300">
                    {selectedSkill.proficiency}%
                  </p>
                </div>
                
                {selectedSkill.years_experience && (
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-[10px] font-pixel text-amber-400 mb-1">{t('experience')}</p>
                    <p className="text-2xl font-pixel text-slate-300">
                      {selectedSkill.years_experience}y
                    </p>
                  </div>
                )}

                {selectedSkill.projects_count && (
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 col-span-2">
                    <p className="text-[10px] font-pixel text-amber-400 mb-1">{t('projectsCompleted')}</p>
                    <p className="text-2xl font-pixel text-slate-300">
                      {selectedSkill.projects_count}+
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="stat-bar h-3">
                  <motion.div
                    className="stat-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.proficiency}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Description */}
              {selectedSkill.description_i18n && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-[10px] font-pixel text-amber-400 mb-2">{t('about')}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {getTranslation(selectedSkill.description_i18n, locale)}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}