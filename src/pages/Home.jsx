import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';
import Scene from '../components/3d/Scene';
import Navbar from '../components/ui/Navbar';
import HeroOverlay from '../components/ui/HeroOverlay';
import MenuPanel from '../components/ui/MenuPanel';
import GalleryModal from '../components/ui/GalleryModal';
import LocationScene from '../components/ui/LocationScene';
import ContactScene from '../components/ui/ContactScene';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import LoadingScreen from '../components/ui/LoadingScreen';
import { GALLERY_ITEMS } from '../components/3d/GalleryWall';
import { CAFE_INFO } from '../data/cafe';


const SECTIONS = [
  { id: 'hero', title: 'Exterior', subtitle: 'Storefront', index: 0 },
  { id: 'entrance', title: 'Entrance', subtitle: 'Step Inside', index: 1 },
  { id: 'counter', title: 'Counter', subtitle: 'Barista Station', index: 2 },
  { id: 'coffee', title: 'Coffee', subtitle: 'Fresh Steam', index: 3 },
  { id: 'about', title: 'Seating', subtitle: 'Cozy Corner', index: 4 },
  { id: 'menu', title: 'Menu', subtitle: '3D Showcase', index: 5 },
  { id: 'gallery', title: 'Gallery', subtitle: 'Photo Wall', index: 6 },
  { id: 'location', title: 'Location', subtitle: 'Trichy Hub', index: 7 },
  { id: 'contact', title: 'Contact', subtitle: 'Guestbook', index: 8 },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeFoodType, setActiveFoodType] = useState('coffee');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [_isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRefs = useRef([]);

  // Check screen size and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // Track window scroll and map to virtual 3D camera progression
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollY / docHeight));
      setScrollProgress(progress);

      // Determine active section index (0 to 8)
      const currentIdx = Math.min(
        SECTIONS.length - 1,
        Math.floor(progress * SECTIONS.length)
      );
      if (SECTIONS[currentIdx]) {
        setActiveSection(SECTIONS[currentIdx].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToScene = useCallback((index) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / (SECTIONS.length - 1)) * docHeight;
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, [prefersReducedMotion]);

  // Keyboard navigation up / down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (menuOpen || selectedGalleryItem) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);
        if (currentIdx < SECTIONS.length - 1) {
          e.preventDefault();
          navigateToScene(currentIdx + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);
        if (currentIdx > 0) {
          e.preventDefault();
          navigateToScene(currentIdx - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, menuOpen, selectedGalleryItem, navigateToScene]);


  // Gallery prev/next
  const handleNextPhoto = () => {
    if (!selectedGalleryItem) return;
    const idx = GALLERY_ITEMS.findIndex((it) => it.id === selectedGalleryItem.id);
    const nextIdx = (idx + 1) % GALLERY_ITEMS.length;
    setSelectedGalleryItem(GALLERY_ITEMS[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!selectedGalleryItem) return;
    const idx = GALLERY_ITEMS.findIndex((it) => it.id === selectedGalleryItem.id);
    const prevIdx = (idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedGalleryItem(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1325] text-[#FFF8EE] selection:bg-[#C5A059] selection:text-[#0B1325]">
      {/* 1. Loading Screen */}
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      {/* 2. Fullscreen 3D Virtual Cafe Canvas */}
      <Scene
        scrollProgress={scrollProgress}
        activeFoodType={activeFoodType}
        onPhotoClick={(item) => setSelectedGalleryItem(item)}
        onOpenMenu={() => setMenuOpen(true)}
        onCupClick={() => navigateToScene(3)}
        prefersReducedMotion={prefersReducedMotion}
        isMobile={isMobile}
      />

      {/* Subtle cinematic vignette overlay */}
      <div className="fixed inset-0 vignette-overlay z-10 pointer-events-none" />

      {/* 3. Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateToScene}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* 4. Vertical 3D Cafe Journey Timeline Indicator (Desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium pr-1">
          Cafe Tour
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => navigateToScene(sec.index)}
              className="group flex items-center gap-3 pointer-events-auto focus:outline-none"
              title={sec.title}
            >
              <span
                className={`text-[11px] tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-[#C5A059] font-semibold opacity-100 translate-x-0'
                    : 'text-[#FFF8EE]/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {sec.title}
              </span>
              <div
                className={`transition-all duration-300 rounded-full border ${
                  isActive
                    ? 'w-3 h-3 bg-[#C5A059] border-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.8)] scale-125'
                    : 'w-2 h-2 bg-transparent border-white/30 group-hover:border-[#C5A059]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 5. Scroll Track Container with 9 Spatial Scenes */}
      <div className="relative z-20">
        {/* ================= SCENE 0: EXTERIOR HERO ================= */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          id="hero"
          className="min-h-screen flex flex-col justify-center items-center relative"
        >
          <HeroOverlay
            onEnterCafe={() => navigateToScene(1)}
            onViewMenu={() => {
              navigateToScene(5);
              setTimeout(() => setMenuOpen(true), 600);
            }}
          />
        </section>

        {/* ================= SCENE 1: ENTRANCE WALKTHROUGH ================= */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          id="entrance"
          className="min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 pointer-events-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
              Scene 02 • Walk In
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#FFF8EE] mb-3">
              Step Into Brew Blue
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/85 leading-relaxed font-light mb-6">
              The glass doors part to unveil the scent of freshly roasted coffee beans, warm wooden acoustics, and an unhurried haven crafted in the heart of Trichy.
            </p>
            <button
              onClick={() => navigateToScene(2)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#FFF8EE] transition-colors"
            >
              <span>Approach Barista Counter</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </section>

        {/* ================= SCENE 2: BARISTA COUNTER ================= */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          id="counter"
          className="min-h-screen flex items-center justify-end px-6 sm:px-12 md:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 pointer-events-auto text-left"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
              Scene 03 • Barista Sanctuary
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#FFF8EE] mb-3">
              The Artisan Counter
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/85 leading-relaxed font-light mb-6">
              Dark walnut fluting meets Italian Carrara marble. Here, our commercial dual-group machine extracts rich espresso while the glass case displays golden baked croissants and cafe treats.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateToScene(3)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA6A] to-[#C5A059] text-[#0B1325] text-xs font-bold tracking-wider uppercase shadow-md transition-transform hover:-translate-y-0.5"
              >
                Inspect Coffee Station
              </button>
            </div>
          </motion.div>
        </section>

        {/* ================= SCENE 3: COFFEE EXTRACTION & STEAM ================= */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          id="coffee"
          className="min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                Scene 04 • Live Extraction
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#FFF8EE] mb-3">
              Specialty Sips & Steam
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/85 leading-relaxed font-light mb-6">
              Witness the delicate rising steam from our ceramic coffee cup. From robust single-origin espresso and frothy Caramel Cappuccino to soothing Madras Chai, every cup is crafted with precision.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Caramel Cappuccino', 'Brew Blue Iced', 'Affogato'].map((name) => (
                <span key={name} className="px-3 py-1 rounded-full bg-[#142344] text-[11px] text-[#C5A059] border border-white/5">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= SCENE 4: COZY SEATING LOUNGE (ABOUT) ================= */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          id="about"
          className="min-h-screen flex items-center justify-end px-6 sm:px-12 md:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 pointer-events-auto text-left space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
              Scene 05 • About Brew Blue
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8EE] leading-snug">
              A cozy corner for coffee, food and conversations.
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/85 leading-relaxed font-light">
              {CAFE_INFO.aboutText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {CAFE_INFO.highlights.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0E1A33]/80 border border-white/5 space-y-1">
                  <h4 className="text-xs font-serif font-bold text-[#C5A059]">{h.title}</h4>
                  <p className="text-[11px] text-[#E5D5C4]/70 leading-normal">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateToScene(5)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-[#FFF8EE] transition-colors"
              >
                <span>Continue to 3D Menu Board</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* ================= SCENE 5: MENU & 3D FOOD STAGE ================= */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          id="menu"
          className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl glass-panel p-6 sm:p-10 rounded-3xl border border-[#C5A059]/30 pointer-events-auto space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
                Scene 06 • Culinary Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF8EE]">
                Artisan Menu Experience
              </h2>
              <p className="text-xs sm:text-sm text-[#E5D5C4]/80 mt-2 font-light">
                Interact with the rotating 3D showcase model or touch the standing menu board.
              </p>
            </div>

            {/* 3D Model Switcher Buttons */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[
                { id: 'coffee', label: 'Coffee Cup' },
                { id: 'pizza', label: 'Gourmet Pizza' },
                { id: 'shake', label: 'Milkshake' },
                { id: 'fries', label: 'Crispy Fries' }
              ].map((model) => (
                <button
                  key={model.id}
                  onClick={() => setActiveFoodType(model.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeFoodType === model.id
                      ? 'bg-gradient-to-r from-[#DFBA6A] to-[#C5A059] text-[#0B1325] font-bold shadow-md shadow-[#C5A059]/20'
                      : 'bg-[#142344] text-[#FFF8EE]/70 hover:text-white border border-white/10'
                  }`}
                >
                  {model.label}
                </button>
              ))}
            </div>

            {/* Open Full Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#DFBA6A] to-[#A6813B] text-[#0B1325] font-bold text-xs tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              EXPLORE COMPLETE MENU (48 ITEMS)
            </button>
          </motion.div>
        </section>

        {/* ================= SCENE 6: 3D PHOTO WALL GALLERY ================= */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          id="gallery"
          className="min-h-screen flex items-center justify-start px-6 sm:px-12 md:px-24 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 pointer-events-auto space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
              Scene 07 • 3D Photo Wall
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#FFF8EE]">
              Cafe Moments Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C4]/85 leading-relaxed font-light">
              Click any illuminated frame on the 3D gallery wall to open high-resolution details. Curated aesthetic moments celebrating coffee culture, pizza pairings, and acoustic cafe evenings.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSelectedGalleryItem(GALLERY_ITEMS[0])}
                className="px-6 py-2.5 rounded-full bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/40 text-xs font-semibold tracking-wider uppercase text-[#FFF8EE] flex items-center gap-2 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                <span>Open Lightbox View</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* ================= SCENE 7: LOCATION & DIRECTIONS ================= */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          id="location"
          className="min-h-screen flex flex-col justify-center items-center py-16"
        >
          <LocationScene />
        </section>

        {/* ================= SCENE 8: CONTACT & FOOTER ================= */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          id="contact"
          className="min-h-screen flex flex-col justify-between items-center pt-16 pb-8"
        >
          <ContactScene />

          {/* Discreet Footer Note per prompt */}
          <footer className="w-full max-w-5xl mx-auto px-6 pt-12 pb-6 border-t border-white/10 text-center text-xs text-[#E5D5C4]/60 space-y-3 pointer-events-auto">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[#C5A059]/80 font-medium">
              <span>Brew Blue Cafe</span>
              <span>•</span>
              <span>Trichy, Tamil Nadu</span>
              <span>•</span>
              <span>Open Daily 11 AM - 11 PM</span>
            </div>

            <p className="text-[11px] text-white/40">
              {CAFE_INFO.disclaimer} • Designed as an interactive virtual 3D cafe concept. Not officially affiliated with Brew Blue Cafe.
            </p>
          </footer>
        </section>
      </div>

      {/* 6. Floating Interactive Modals & Actions */}
      <MenuPanel
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeFoodType={activeFoodType}
        onSelectFoodType={(type) => setActiveFoodType(type)}
      />

      <GalleryModal
        selectedItem={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onSelectNext={handleNextPhoto}
        onSelectPrev={handlePrevPhoto}
      />

      {/* Floating WhatsApp Action Pill */}
      <WhatsAppButton />
    </div>
  );
}
