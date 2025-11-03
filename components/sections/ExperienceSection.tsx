"use client";

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import Image from 'next/image';
import { Experience } from '@/types/database';
import { getTranslation, getTranslationArray } from '@/lib/i18n';

// interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   location: string;
//   start_date: string;
//   end_date?: string;
//   description: string;
//   achievements: string[];
//   logo_url?: string;
// }

export default function ExperienceSection() {
  const t = useTranslations('experience');
  const locale = useLocale();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const INITIAL_DISPLAY_COUNT = 4;

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: true });

    if (data && !error) {
      setExperiences(data);
      // Expand the first item by default
      if (data.length > 0) {
        setExpandedItems(new Set([data[0].id]));
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const displayedExperiences = showAll 
    ? experiences 
    : experiences.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = experiences.length > INITIAL_DISPLAY_COUNT;

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-pixel text-amber-400 mb-3">
            {t('title')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">{t('subtitle')}</p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent hidden lg:block" />

          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="dialogue-box max-w-md mx-auto">
                <p className="text-slate-400 font-pixel text-sm">{t('noExperience')}</p>
                <p className="text-slate-500 text-xs mt-2">{t('checkBackSoon')}</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="space-y-12">
                {displayedExperiences.map((exp, index) => {
                  const isExpanded = expandedItems.has(exp.id);
                  const isLeft = index % 2 === 0;
                  const isCurrent = !exp.end_date;
                  const achievements = getTranslationArray(exp.achievements_i18n, locale) ?? [];
                  
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-center ${
                        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      } flex-col gap-12`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.15 }}
                          className={`
                            relative w-8 h-8 flex items-center justify-center rounded-md 
                            pixel-borders cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)]
                            ${isCurrent
                              ? 'bg-gradient-to-br from-amber-400 to-amber-600 ring-4 ring-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.7)]'
                              : 'bg-gradient-to-br from-blue-600 to-purple-700 ring-2 ring-indigo-500/30 shadow-[0_0_10px_rgba(147,197,253,0.3)]'}
                          `}
                        >
                          {/* Glowing outer halo (adds RPG magic effect) */}
                          <div
                            className={`absolute inset-0 rounded-md blur-sm transition-all duration-300 ${
                              isCurrent
                                ? 'bg-amber-400/30 animate-pulse'
                                : 'bg-blue-500/10'
                            }`}
                          />

                          {/* Icon Layer */}
                          <div className="relative z-10">
                            {isCurrent ? (
                              <Star className="w-5 h-5 text-black drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] animate-pulse" />
                            ) : (
                              <Briefcase className="w-5 h-5 text-white/90 drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]" />
                            )}
                          </div>
                        </motion.div>
                      </div>


                      {/* Spacer for desktop */}
                      <div className="hidden lg:block w-1/2" />

                      {/* Content Card */}
                      <div className="w-3/4 lg:w-1/2">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`rpg-card relative ${
                            isCurrent ? 'ring-2 ring-amber-500/50' : ''
                          } hover:shadow-xl hover:shadow-amber-500/10 transition-all`}
                        >
                          {/* Current Badge */}
                          {isCurrent && (
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-pixel px-3 py-1 rounded-full shadow-lg">
                              Current
                            </div>
                          )}

                          {/* Connector Line to Timeline (Desktop) */}
                          {/* <div className={`absolute top-1/2 hidden lg:block w-8 h-0.5 bg-gradient-to-r ${
                            isLeft 
                              ? 'left-full from-slate-700 to-transparent' 
                              : 'right-full from-transparent to-slate-700'
                          }`} /> */}

                          {/* Header - Always Visible */}
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleExpand(exp.id)}
                          >
                            <div className="flex justify-between items-start mb-3 gap-4">
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <h3 className="font-pixel text-lg md:text-xl text-amber-400 hover:text-amber-300 transition-colors mb-1">
                                      {getTranslation(exp.position_i18n, locale)}
                                    </h3>
                                    <p className="text-base md:text-lg text-slate-200 font-semibold">{getTranslation(exp.institution_i18n, locale)}</p>
                                  </div>
                                  <motion.button
                                    className="p-1 hover:bg-slate-700/50 rounded transition-colors flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-amber-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-amber-400" />
                                    )}
                                  </motion.button>
                                </div>
                              </div>

                              {exp.logo_url && (
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-700 p-2">
                                  <Image
                                    fill
                                    src={exp.logo_url}
                                    alt={getTranslation(exp.institution_i18n, locale) + " logo"}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-3 text-xs md:text-sm text-slate-400">
                              <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
                                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : t('present')}
                              </span>
                              {exp.location && (
                                <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
                                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                                  {exp.location}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expandable Content */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 border-t border-slate-700/50 mt-4">
                                  {exp.description_i18n && (
                                    <p className="text-sm md:text-base text-slate-300 mb-4 leading-relaxed">
                                      {getTranslation(exp.description_i18n, locale)}
                                    </p>
                                  )}
                                  {achievements && achievements.length > 0 && (
                                    <div>
                                      <h4 className="font-pixel text-xs md:text-sm text-emerald-400 mb-3 flex items-center gap-2">
                                        <Star className="w-4 h-4" />
                                        Key Achievements:
                                      </h4>
                                      <ul className="space-y-2">
                                        {achievements.map((achievement, i) => (
                                          <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="text-xs md:text-sm text-slate-300 flex gap-2 bg-slate-700/30 p-2 rounded"
                                          >
                                            <span className="text-amber-400 flex-shrink-0">▸</span>
                                            <span>{achievement}</span>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Show More/Less Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={() => setShowAll(!showAll)}
                    className="pixel-button bg-amber-500 hover:bg-amber-600 text-black font-pixel text-sm px-8 py-3 flex items-center gap-2 mx-auto shadow-lg shadow-amber-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showAll ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        {t('showLess')}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        {t('viewAllExperience')} ({experiences.length - INITIAL_DISPLAY_COUNT}{t('more')})
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}