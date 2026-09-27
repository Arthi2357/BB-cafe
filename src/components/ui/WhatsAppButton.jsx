import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafe';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CAFE_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/40 border border-emerald-400/40 backdrop-blur-md group focus:outline-none"
      aria-label="Chat with Brew Blue Cafe on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFF8EE] rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFF8EE] rounded-full" />
      </div>

      <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
        WhatsApp Order & Info
      </span>
    </motion.a>
  );
}
