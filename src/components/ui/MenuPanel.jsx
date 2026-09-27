import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, Sparkles, Coffee, Flame, Sandwich,
  Popcorn, Soup, Salad, UtensilsCrossed, Eye
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu';

const ICON_MAP = {
  UtensilsCrossed,
  Sparkles,
  Coffee,
  Flame,
  Sandwich,
  Popcorn,
  Soup,
  Salad
};

export default function MenuPanel({
  isOpen,
  onClose,
  activeFoodType,
  onSelectFoodType
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badge?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !filterVegOnly || item.isVeg;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [selectedCategory, searchQuery, filterVegOnly]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070B16]/80 backdrop-blur-md transition-opacity"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-2xl h-full bg-[#0B1325]/95 border-l border-[#C5A059]/25 flex flex-col shadow-2xl backdrop-blur-2xl z-10 text-[#FFF8EE]"
          >
            {/* Panel Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0E1A33]/70">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-medium block">
                  Artisan Food & Drinks
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#FFF8EE]">
                  Brew Blue Menu
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-[#142344] hover:bg-[#1E3462] border border-[#C5A059]/30 text-[#FFF8EE] transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D Showcase Quick-Selector Toolbar */}
            <div className="px-6 py-3 bg-[#142344]/50 border-b border-white/5 flex items-center justify-between text-xs">
              <span className="text-[#C5A059] flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                3D Interactive Model Stage:
              </span>
              <div className="flex items-center gap-1">
                {[
                  { id: 'coffee', label: 'Coffee' },
                  { id: 'pizza', label: 'Pizza' },
                  { id: 'shake', label: 'Shake' },
                  { id: 'fries', label: 'Fries' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => onSelectFoodType?.(type.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      activeFoodType === type.id
                        ? 'bg-[#C5A059] text-[#0B1325] font-bold shadow-sm'
                        : 'bg-[#0E1A33] text-[#FFF8EE]/70 hover:text-white border border-white/5'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Veg Toggle Bar */}
            <div className="p-4 sm:p-6 space-y-3 bg-[#0B1325]/50 border-b border-white/5">
              <div className="flex gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pizzas, shakes, toasts, pasta..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E1A33] border border-white/10 text-xs text-[#FFF8EE] placeholder-[#E5D5C4]/40 focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Vegetarian filter button */}
                <button
                  onClick={() => setFilterVegOnly(!filterVegOnly)}
                  className={`px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all border ${
                    filterVegOnly
                      ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 font-semibold'
                      : 'bg-[#0E1A33] border-white/10 text-white/70 hover:border-emerald-500/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Veg Only</span>
                </button>
              </div>

              {/* Category Pills Slider */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {MENU_CATEGORIES.map((cat) => {
                  const Icon = ICON_MAP[cat.icon] || UtensilsCrossed;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#0B1325] font-bold shadow-md shadow-[#C5A059]/20'
                          : 'bg-[#142344]/80 text-[#FFF8EE]/70 hover:text-white hover:bg-[#1E3462] border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Items List Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Coffee className="w-12 h-12 text-[#C5A059]/40 mx-auto" />
                  <p className="text-base font-serif text-[#FFF8EE]/80">No menu items found</p>
                  <p className="text-xs text-[#E5D5C4]/60">Try searching with a different keyword</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#0E1A33]/90 to-[#142344]/60 border border-white/5 hover:border-[#C5A059]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Veg / Non-Veg Indicator */}
                        <span
                          className={`w-3 h-3 rounded-sm border flex items-center justify-center p-[2px] ${
                            item.isVeg ? 'border-emerald-500' : 'border-red-500'
                          }`}
                          title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        </span>

                        <h3 className="font-serif text-base font-semibold text-[#FFF8EE] group-hover:text-[#C5A059] transition-colors">
                          {item.name}
                        </h3>

                        {item.badge && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#DFBA6A] font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#E5D5C4]/75 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and 3D preview switch */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <span className="text-xs font-mono text-[#C5A059] bg-[#070B16]/80 px-2.5 py-1 rounded-md border border-[#C5A059]/20">
                        {item.price}
                      </span>

                      {/* Preview 3D representation button */}
                      <button
                        onClick={() => onSelectFoodType?.(item.modelType)}
                        className="text-[11px] text-[#FFF8EE]/60 hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                        title={`View ${item.modelType} in 3D center stage`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>3D View</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Menu Footer note */}
            <div className="p-4 border-t border-white/10 bg-[#070B16]/90 text-center">
              <p className="text-[11px] text-[#E5D5C4]/60">
                * Exact pricing & special combos available at cafe counter. Ask your barista for daily roast recommendations.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
