import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';


export default function GalleryModal({ selectedItem, onClose, onSelectNext, onSelectPrev }) {
  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070B16]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full bg-[#0E1A33] border border-[#C5A059]/40 rounded-2xl overflow-hidden shadow-2xl z-10 text-[#FFF8EE] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0B1325]/80 hover:bg-[#142344] border border-[#C5A059]/30 text-[#FFF8EE] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Visual Presentation Box */}
          <div
            className="md:w-3/5 h-64 md:h-auto min-h-[340px] relative flex flex-col items-center justify-center p-8 text-center overflow-hidden"
            style={{
              background: `radial-gradient(circle at center, ${selectedItem.color} 0%, #070B16 100%)`
            }}
          >
            {/* Geometric Art Matting */}
            <div className="absolute inset-6 border border-[#C5A059]/30 rounded-xl pointer-events-none" />
            <div className="absolute inset-8 border border-[#C5A059]/15 rounded-lg pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0B1325]/70 border border-[#C5A059]/40 flex items-center justify-center shadow-lg">
                <ImageIcon className="w-8 h-8 text-[#C5A059]" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] block font-semibold">
                {selectedItem.tag}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#FFF8EE]">
                {selectedItem.title}
              </h3>
            </div>

            {/* Prev / Next navigation arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); onSelectPrev?.(); }}
                className="p-2 rounded-full bg-[#070B16]/80 hover:bg-[#142344] border border-white/20 text-[#FFF8EE] pointer-events-auto transition-colors"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onSelectNext?.(); }}
                className="p-2 rounded-full bg-[#070B16]/80 hover:bg-[#142344] border border-white/20 text-[#FFF8EE] pointer-events-auto transition-colors"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Narrative Details Box */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#0B1325]/90 border-t md:border-t-0 md:border-l border-white/10">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-1">
                  Collection Entry • {selectedItem.category}
                </span>
                <h4 className="text-xl font-serif font-bold text-[#FFF8EE]">
                  {selectedItem.title}
                </h4>
              </div>

              <p className="text-sm text-[#E5D5C4]/85 leading-relaxed font-light">
                {selectedItem.subtitle}
              </p>

              <div className="p-3.5 rounded-xl bg-[#0E1A33] border border-white/5 space-y-1.5">
                <span className="text-xs text-[#C5A059] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Portfolio Concept Note
                </span>
                <p className="text-[11px] text-[#FFF8EE]/60 leading-normal">
                  Curated photographic showcase for the Brew Blue Cafe portfolio concept. Designed for high-res photo wall replacement once on-location cafe photography is available.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/40 text-xs font-semibold tracking-wider uppercase text-[#FFF8EE] transition-colors"
              >
                Return to Cafe Walkthrough
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
