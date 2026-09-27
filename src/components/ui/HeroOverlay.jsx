import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Compass } from 'lucide-react';

import { CAFE_INFO } from '../../data/cafe';

export default function HeroOverlay({ onEnterCafe, onViewMenu }) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-28 pb-12 relative z-10 pointer-events-none select-none">
      {/* Top Welcome Pill */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A33]/80 border border-[#C5A059]/30 backdrop-blur-md shadow-lg"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#FFF8EE]/90 font-medium">
          Trichy, Tamil Nadu • Virtual Cafe Experience
        </span>
      </motion.div>

      {/* Hero Center Headline & Story */}
      <div className="max-w-4xl mx-auto my-auto space-y-6">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase text-[#C5A059] block mb-2">
            Welcome to
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight text-[#FFF8EE] drop-shadow-2xl">
            BREW BLUE
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-gold-gradient font-medium"
        >
          {CAFE_INFO.tagline}
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-xl mx-auto text-sm sm:text-base text-[#E5D5C4]/90 font-light leading-relaxed px-4"
        >
          {CAFE_INFO.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto"
        >
          {/* Primary: ENTER CAFE */}
          <button
            onClick={onEnterCafe}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#DFBA6A] via-[#C5A059] to-[#A6813B] text-[#0B1325] font-bold text-sm tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(197,160,89,0.35)] hover:shadow-[0_0_40px_rgba(197,160,89,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            <span>ENTER CAFE</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary: VIEW MENU */}
          <button
            onClick={onViewMenu}
            className="px-8 py-4 rounded-full bg-[#0E1A33]/80 hover:bg-[#142344] border border-[#C5A059]/40 text-[#FFF8EE] font-semibold text-sm tracking-[0.2em] uppercase backdrop-blur-md transition-all hover:border-[#C5A059] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>VIEW MENU</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="flex flex-col items-center gap-2 pointer-events-auto"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059]/80 font-medium">
          Scroll to physically walk through cafe
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-[#C5A059]/40 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"
          />
        </div>
      </motion.div>
    </div>
  );
}
