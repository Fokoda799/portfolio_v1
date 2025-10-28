"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date?: string;
  description: string;
  achievements: string[];
  logo_url?: string;
}

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });

    if (data && !error) {
      setExperiences(data);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
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

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-500/30" />

          {experiences.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 font-pixel text-sm">No experience entries yet</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20 pb-12"
              >
                <div className="absolute left-4 w-8 h-8 bg-amber-500 pixel-borders flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-black" />
                </div>

                <div className="rpg-card">
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="font-pixel text-xl text-amber-400 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-slate-300">{exp.company}</p>
                    </div>

                    {exp.logo_url && (
                      <img
                        src={exp.logo_url}
                        alt={exp.company}
                        className="w-12 h-12 object-contain pixel-image"
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : t('present')}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <h4 className="font-pixel text-sm text-emerald-400 mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-slate-300 flex gap-2">
                            <span className="text-amber-400">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
