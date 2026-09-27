import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);

  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onLoadedRef.current?.();
          }, 250);
          return 100;
        }
        const inc = Math.floor(Math.random() * 18) + 12;
        return Math.min(100, prev + inc);
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);


  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B16] text-[#FFF8EE] px-6 select-none"
        >
          {/* Subtle warm background glow */}
          <div className="absolute w-[450px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Animated Coffee Cup Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#142344] to-[#0E1A33] border border-[#C5A059]/30 flex items-center justify-center shadow-2xl shadow-[#C5A059]/20">
              <Coffee className="w-10 h-10 text-[#C5A059]" />
            </div>

            {/* Rising steam dots */}
            <motion.div
              animate={{ y: [-4, -14, -4], opacity: [0.3, 0.9, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-3 w-1.5 h-3 bg-[#FFF8EE]/60 rounded-full blur-[1px]"
            />
            <motion.div
              animate={{ y: [-2, -16, -2], opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.4, delay: 0.3, ease: "easeInOut" }}
              className="absolute -top-4 left-6 w-1.5 h-3.5 bg-[#C5A059]/70 rounded-full blur-[1px]"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif tracking-[0.25em] font-medium text-[#FFF8EE] mb-2 text-center"
          >
            BREW BLUE
          </motion.h1>

          {/* Location & Tagline */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.35em] text-[#C5A059] mb-8 font-medium"
          >
            Trichy • Tamil Nadu
          </motion.p>

          {/* Loading status quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-[#E5D5C4]/80 mb-6 font-light"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
            <span>Preparing your coffee...</span>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-64 max-w-full h-1 bg-[#142344] rounded-full overflow-hidden p-[1px] border border-[#C5A059]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C5A059] to-[#FFF8EE] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Percentage */}
          <span className="text-xs font-mono text-[#C5A059]/70 mt-3 tracking-widest">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
