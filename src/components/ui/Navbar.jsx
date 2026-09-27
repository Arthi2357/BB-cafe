import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X, Volume2, VolumeX, MapPin, Phone } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafe';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME', sceneIndex: 0 },
  { id: 'menu', label: 'MENU', sceneIndex: 5 },
  { id: 'about', label: 'ABOUT', sceneIndex: 4 },
  { id: 'gallery', label: 'GALLERY', sceneIndex: 6 },
  { id: 'location', label: 'LOCATION', sceneIndex: 7 },
  { id: 'contact', label: 'CONTACT', sceneIndex: 8 },
];

export default function Navbar({
  activeSection = 'hero',
  onNavigate,
  onOpenMenu
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

  // Soft cafe ambient sound generator using Web Audio API (gentle warm pink noise / cozy cafe atmosphere)
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Create brown/pink noise buffer for warm room acoustic hum
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 0.08; // very soft, comfortable ambient murmur
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400; // Mellow warm sound

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start();

        setAudioCtx(ctx);
        setSoundEnabled(true);
      } catch (err) {
        console.error("Audio error:", err);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setSoundEnabled(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate(0)}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Brew Blue Cafe Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0E1A33]/90 border border-[#C5A059]/40 flex items-center justify-center transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]">
              <Coffee className="w-5 h-5 text-[#C5A059] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <span className="block text-lg font-serif tracking-[0.2em] font-semibold text-[#FFF8EE] group-hover:text-[#C5A059] transition-colors">
                BREW BLUE
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#C5A059]/80 font-medium">
                Trichy
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E1A33]/80 backdrop-blur-md border border-[#C5A059]/20 shadow-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.sceneIndex)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-[0.18em] transition-all duration-200 rounded-full focus:outline-none ${
                    isActive
                      ? 'text-[#0B1325] font-semibold'
                      : 'text-[#FFF8EE]/80 hover:text-[#FFF8EE]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#DFBA6A] to-[#C5A059] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Sound Toggle + Menu CTA */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Button */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-full transition-all duration-300 border ${
                soundEnabled
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                  : 'bg-[#0E1A33]/80 border-white/10 text-white/60 hover:text-white hover:border-[#C5A059]/40'
              } backdrop-blur-md focus:outline-none`}
              title={soundEnabled ? "Mute cafe ambiance" : "Play cozy cafe soundscape"}
              aria-label="Toggle cafe audio ambience"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Explore Menu CTA (Desktop) */}
            <button
              onClick={onOpenMenu}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C5A059] to-[#DFBA6A] text-[#0B1325] font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
            >
              <span>Explore Menu</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#0E1A33]/90 border border-[#C5A059]/30 text-[#FFF8EE] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5 text-[#C5A059]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-24 px-6 pb-8 bg-[#0B1325]/95 backdrop-blur-2xl flex flex-col justify-between md:hidden"
          >
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-medium mb-4">
                Virtual Cafe Navigation
              </p>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.sceneIndex);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left font-serif text-lg tracking-wider border transition-all ${
                    activeSection === item.id
                      ? 'bg-[#142344] border-[#C5A059] text-[#C5A059]'
                      : 'border-white/5 text-[#FFF8EE]/80 hover:bg-[#142344]/50'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#C5A059]/60 font-sans tracking-normal">
                    Scene 0{item.sceneIndex + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Contact & Menu buttons in mobile menu */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  onOpenMenu();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFBA6A] text-[#0B1325] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/20"
              >
                <Coffee className="w-4 h-4" />
                <span>View Complete Menu</span>
              </button>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#FFF8EE]/70">
                <a
                  href={`tel:${CAFE_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#142344] border border-white/10 hover:border-[#C5A059]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call Cafe</span>
                </a>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#142344] border border-white/10 hover:border-[#C5A059]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
