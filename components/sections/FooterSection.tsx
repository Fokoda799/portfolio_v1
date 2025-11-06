import { motion } from 'framer-motion';

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 border-t-4 border-amber-500 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* RPG Stats Bar */}
        <motion.div
          className="flex justify-center gap-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">❤</span>
            <span className="text-slate-400 font-pixel text-sm">Code Passion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">✦</span>
            <span className="text-slate-400 font-pixel text-sm">Creative Magic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-xl">⚡</span>
            <span className="text-slate-400 font-pixel text-sm">Pixel Power</span>
          </div>
        </motion.div>

        {/* Crafting message */}
        <motion.p
          className="text-slate-400 text-base md:text-lg font-pixel"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Crafted with{' '}
          <span className="text-red-500 text-2xl animate-pulse">♥</span>{' '}
          and{' '}
          <span className="text-amber-400 font-bold">pixels</span>
        </motion.p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500"></div>
          <span className="text-amber-500 text-2xl">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500"></div>
        </div>

        {/* Developer info and copyright */}
        <div className="space-y-3">
          <motion.p
            className="text-sm md:text-base text-slate-500 font-pixel uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Abdellah Nait Hadid
          </motion.p>
          
          <p className="text-xs md:text-sm text-slate-600 font-pixel">
            © 2025 RPG Portfolio • All Rights Reserved
          </p>
        </div>

        {/* Achievement badges */}
        <motion.div
          className="flex justify-center gap-3 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-yellow-400 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>★</span>
          <span className="text-amber-400 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>★</span>
          <span className="text-yellow-400 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>★</span>
        </motion.div>

        {/* Quest complete message */}
        <motion.p
          className="text-xs text-slate-600 font-pixel uppercase tracking-wider pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Quest Complete • Thank you for visiting
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;