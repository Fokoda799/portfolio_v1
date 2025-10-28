"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { useXP } from '@/contexts/XPContext';
import { useAudio } from '@/contexts/AudioContext';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  tech_stack: string[];
  category: string;
  demo_url?: string;
  repo_url?: string;
}

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { addXP } = useXP();
  const { playSound } = useAudio();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (data && !error) {
      setProjects(data);
    }
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    addXP(5);
    playSound('click');
  };

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-b from-slate-800 to-slate-900">
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

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['all', 'frontend', 'backend', 'fullstack'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`
                pixel-button font-pixel text-xs px-6 py-2
                ${filter === category
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`filter.${category}`)}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 font-pixel text-sm">No quests found in this category</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rpg-card hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="aspect-video bg-slate-700 mb-4 pixel-image overflow-hidden">
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Github className="w-16 h-16" />
                    </div>
                  )}
                </div>

                <h3 className="font-pixel text-lg text-amber-400 mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-slate-700 text-amber-300 font-pixel"
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
                      className="pixel-button bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-2 flex-1"
                    >
                      <ExternalLink className="w-3 h-3 inline mr-1" />
                      Demo
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="pixel-button bg-slate-600 hover:bg-slate-700 text-white text-xs px-3 py-2 flex-1"
                    >
                      <Github className="w-3 h-3 inline mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rpg-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-pixel text-2xl text-amber-400 mb-4">
              {selectedProject.title}
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-slate-700 text-amber-300 font-pixel"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="pixel-button bg-slate-600 hover:bg-slate-700 text-white font-pixel text-sm px-6 py-3 w-full"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
