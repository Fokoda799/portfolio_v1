"use client";

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, X, Calendar, Award, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { useXP } from '@/contexts/XPContext';
import { useAudio } from '@/contexts/AudioContext';
import Image from 'next/image';
import { Project } from '@/types/database';
import { getTranslation } from '@/lib/i18n';
import { get } from 'node:http';

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   thumbnail_url: string;
//   tech_stack: string[];
//   category: string;
//   demo_url?: string;
//   repo_url?: string;
//   featured?: boolean;
//   year?: string;
//   status?: string;
// }

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addXP } = useXP();
  const { playSound } = useAudio();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (data && !error) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const featuredProjects = projects.filter(p => p.featured);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    addXP(5);
    playSound('click');
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
    playSound('click');
  };

  const categories = [
    { id: 'all', label: t('filter.all'), icon: Zap },
    { id: 'frontend', label: t('filter.frontend'), icon: Award },
    { id: 'backend', label: t('filter.backend'), icon: Award },
    { id: 'fullstack', label: t('filter.fullstack'), icon: Award },
  ];

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-pixel text-amber-400 mb-3">
            {t('title')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-6" />
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`
                  pixel-button font-pixel text-xs px-5 py-3 flex items-center gap-2
                  transition-all duration-300
                  ${filter === category.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Featured Projects Banner */}
        {filter === 'all' && featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-pixel text-amber-400 text-lg">{t('featured_quests')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rpg-card hover:shadow-xl hover:shadow-amber-500/20 transition-all cursor-pointer group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="aspect-video bg-slate-700 mb-4 pixel-image overflow-hidden relative">
                    {project.thumbnail_url ? (
                      <Image
                        fill
                        src={project.thumbnail_url}
                        alt={getTranslation(project.title_i18n, locale)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Github className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-pixel px-2 py-1 rounded">
                      {t('featured')}
                    </div>
                  </div>

                  <h3 className="font-pixel text-xl text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    {getTranslation(project.title_i18n, locale)}
                  </h3>

                  <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                    {getTranslation(project.description_i18n, locale)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-slate-700/70 text-amber-300 font-pixel rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="pixel-button bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 flex items-center gap-1 flex-1 justify-center"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t('liveDemo')}
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="pixel-button bg-slate-600 hover:bg-slate-700 text-white text-xs px-4 py-2 flex items-center gap-1 flex-1 justify-center"
                      >
                        <Github className="w-3 h-3" />
                        {t('sourceCode')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <div>
          {filter !== 'all' && (
            <h3 className="font-pixel text-amber-400 text-lg mb-6">
              {categories.find(c => c.id === filter)?.label} {t('projects')}
            </h3>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dialogue-box max-w-md mx-auto"
              >
                <p className="text-slate-400 font-pixel text-sm mb-2">{t('noQuests')}</p>
                <p className="text-slate-500 text-xs">{t('try')}</p>
              </motion.div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rpg-card hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="aspect-video bg-slate-700 mb-4 pixel-image overflow-hidden relative">
                    {project.thumbnail_url ? (
                      <Image
                        fill
                        src={project.thumbnail_url}
                        alt={getTranslation(project.title_i18n, locale)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Github className="w-16 h-16" />
                      </div>
                    )}
                    {project.status && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-pixel px-2 py-1 rounded">
                        {project.status}
                      </div>
                    )}
                  </div>

                  <h3 className="font-pixel text-lg text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    {getTranslation(project.title_i18n, locale)}
                  </h3>

                  <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                    {getTranslation(project.description_i18n, locale)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-slate-700/70 text-amber-300 font-pixel rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack?.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-slate-700/70 text-slate-400 font-pixel rounded">
                        +{project.tech_stack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="pixel-button bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-2 flex items-center gap-1 flex-1 justify-center"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t('liveDemo')}
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="pixel-button bg-slate-600 hover:bg-slate-700 text-white text-xs px-3 py-2 flex items-center gap-1 flex-1 justify-center"
                      >
                        <Github className="w-3 h-3" />
                        {t('sourceCode')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="rpg-card max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>

              {/* Project Image */}
              {selectedProject.thumbnail_url && (
                <div className="aspect-video bg-slate-700 mb-6 pixel-image overflow-hidden">
                  <Image
                    fill
                    src={selectedProject.thumbnail_url}
                    alt={getTranslation(selectedProject.title_i18n, locale)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Project Info */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-pixel text-2xl md:text-3xl text-amber-400 pr-8">
                  {getTranslation(selectedProject.title_i18n, locale)}
                </h3>
              </div>

              {/* Meta Info */}
              {(selectedProject.year || selectedProject.status) && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedProject.year && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedProject.year}</span>
                    </div>
                  )}
                  {selectedProject.status && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-pixel px-3 py-1 rounded">
                      {selectedProject.status}
                    </span>
                  )}
                </div>
              )}

              <p className="text-slate-300 mb-6 leading-relaxed text-base">
                {getTranslation(selectedProject.description_i18n, locale)}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="font-pixel text-amber-400 text-sm mb-3">{t('techStack')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-2 bg-slate-700/70 text-amber-300 font-pixel rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedProject.demo_url && (
                  <a
                    href={selectedProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-button bg-emerald-600 hover:bg-emerald-700 text-white font-pixel text-sm px-6 py-3 flex items-center gap-2 flex-1 justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('liveDemo')}
                  </a>
                )}
                {selectedProject.repo_url && (
                  <a
                    href={selectedProject.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-button bg-slate-600 hover:bg-slate-700 text-white font-pixel text-sm px-6 py-3 flex items-center gap-2 flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    {t('sourceCode')}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}