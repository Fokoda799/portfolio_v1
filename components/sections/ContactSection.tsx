"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { useXP } from '@/contexts/XPContext';
import { useAudio } from '@/contexts/AudioContext';

export default function ContactSection() {
  const t = useTranslations('contact');
  const { addXP } = useXP();
  const { playSound } = useAudio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    playSound('click');

    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('success');
      addXP(25);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com', color: 'hover:text-purple-400' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-400' },
    { icon: Mail, label: 'Email', url: 'mailto:hello@example.com', color: 'hover:text-amber-400' },
  ];

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

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rpg-card"
          >
            <h3 className="font-pixel text-xl text-amber-400 mb-6">
              {t('social')}
            </h3>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700
                    transition-all pixel-borders border-slate-600
                    ${social.color}
                  `}
                >
                  <social.icon className="w-6 h-6" />
                  <span className="font-pixel text-sm">{social.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 dialogue-box">
              <p className="text-sm text-slate-300">
                {t('prompt')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rpg-card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-pixel text-amber-400 mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 text-slate-100 focus:border-amber-400 focus:outline-none"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-sm font-pixel text-amber-400 mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 text-slate-100 focus:border-amber-400 focus:outline-none"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-sm font-pixel text-amber-400 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 text-slate-100 focus:border-amber-400 focus:outline-none resize-none"
                  disabled={status === 'loading'}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`
                  pixel-button w-full font-pixel text-sm px-6 py-4
                  ${status === 'success' ? 'bg-emerald-500 text-white' :
                    status === 'error' ? 'bg-red-500 text-white' :
                    'bg-amber-500 hover:bg-amber-600 text-black'}
                `}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                <Send className="w-4 h-4 inline-block mr-2" />
                {status === 'loading' ? 'Sending...' :
                 status === 'success' ? t('success') :
                 status === 'error' ? t('error') :
                 t('form.send')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
