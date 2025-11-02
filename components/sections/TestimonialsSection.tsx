"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar_url?: string;
  company_logo_url?: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order', { ascending: true });

    if (data && !error) {
      setTestimonials(data);
    }
  };

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

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 font-pixel text-sm">No testimonials yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rpg-card hover:scale-105 transition-transform"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-700 pixel-borders flex items-center justify-center flex-shrink-0">
                    {testimonial.avatar_url ? (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="w-full h-full object-cover pixel-image"
                      />
                    ) : (
                      <Quote className="w-8 h-8 text-amber-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-pixel text-lg text-amber-400">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>

                  {testimonial.company_logo_url && (
                    <img
                      src={testimonial.company_logo_url}
                      alt={testimonial.company}
                      className="w-12 h-12 object-contain pixel-image"
                    />
                  )}
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {testimonial.content}
                </p>

                <Quote className="w-8 h-8 text-amber-400/20 ml-auto mt-4" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
