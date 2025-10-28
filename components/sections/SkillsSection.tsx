"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export default function SkillsSection() {
  const t = useTranslations('skills');
  const [skills, setSkills] = useState<Skill[]>([]);

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
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-pixel text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-xs font-pixel text-amber-400">
                        {skill.proficiency}/100
                      </span>
                    </div>

                    <div className="stat-bar">
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
    </section>
  );
}
