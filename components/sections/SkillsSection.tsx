"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';
import { X } from 'lucide-react';
import Image from 'next/image';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  logo_url?: string;
  description?: string;
  years_experience?: number;
  projects_count?: number;
}

export default function SkillsSection() {
  const t = useTranslations('skills');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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

  const categories = ['frontend', 'backend', 'tools', 'soft'];

  const getSkillsByCategory = (category: string) =>
    skills.filter(skill => skill.category === category);

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="rpg-card"
            >
              <h3 className="font-pixel text-xl text-amber-400 mb-6">
                {t(`categories.${category}`)}
              </h3>

              <div className="space-y-4">
                {getSkillsByCategory(category).map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    onClick={() => setSelectedSkill(skill)}
                    className="cursor-pointer hover:bg-slate-700/30 p-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {/* Brand Logo */}
                      <div className="w-8 h-8 flex items-center justify-center bg-white rounded p-1 flex-shrink-0">
                        {skill.icon ? (
                          <Image
                            src={skill.icon} 
                            alt={`${skill.name} logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-300 rounded flex items-center justify-center text-xs font-bold text-slate-600">
                            {skill.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-sm font-pixel text-slate-300">
                          {skill.name}
                        </span>
                        <span className="text-xs font-pixel text-amber-400">
                          {skill.proficiency}/100
                        </span>
                      </div>
                    </div>

                    <div className="stat-bar ml-11">
                      <motion.div
                        className="stat-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}

                {getSkillsByCategory(category).length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4">
                    No skills in this category yet
                  </p>
                )}
              </div>
            </motion.div>
          ))}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border-4 border-amber-400 rounded-lg p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-amber-400 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg p-2">
                  {selectedSkill.icon ? (
                    <Image
                      src={selectedSkill.icon} 
                      alt={`${selectedSkill.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-300 rounded flex items-center justify-center text-2xl font-bold text-slate-600">
                      {selectedSkill.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-pixel text-amber-400">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-sm text-slate-400 font-pixel">
                    {t(`categories.${selectedSkill.category}`)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-pixel text-amber-400 mb-1">PROFICIENCY</p>
                  <div className="stat-bar">
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.proficiency}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-right text-xs font-pixel text-slate-400 mt-1">
                    {selectedSkill.proficiency}/100
                  </p>
                </div>

                {selectedSkill.description && (
                  <div>
                    <p className="text-xs font-pixel text-amber-400 mb-2">DESCRIPTION</p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedSkill.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                  {selectedSkill.years_experience && (
                    <div>
                      <p className="text-xs font-pixel text-amber-400 mb-1">EXPERIENCE</p>
                      <p className="text-lg font-pixel text-slate-300">
                        {selectedSkill.years_experience}+ years
                      </p>
                    </div>
                  )}
                  {selectedSkill.projects_count && (
                    <div>
                      <p className="text-xs font-pixel text-amber-400 mb-1">PROJECTS</p>
                      <p className="text-lg font-pixel text-slate-300">
                        {selectedSkill.projects_count}+ done
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}