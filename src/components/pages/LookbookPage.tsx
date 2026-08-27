import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Eye,
  Sliders,
  Award,
  Layers,
  Heart
} from 'lucide-react';

interface LookItem {
  id: string;
  title: string;
  season: string;
  location: string;
  model: string;
  description: string;
  image: string;
  aspect: string;
  featuredProductIds: string[];
  stylingTips: string[];
}

export const LookbookPage: React.FC = () => {
  const {
    products,
    navigateToProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setActivePage
  } = useStore();

  const [selectedSeason, setSelectedSeason] = useState<'SS26' | 'AW25' | 'ATELIER_CAPSULE'>('SS26');
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  const LOOKBOOK_ITEMS: LookItem[] = [
    {
      id: 'look-01',
      title: 'Look 01: The Architectural Obsidian Silhouette',
      season: 'Spring / Summer 2026 Atelier',
      location: 'Palais Royal, Paris',
      model: 'Elena Rostova',
      description: 'A dialogue between rigid tailoring and fluid movement. Double-faced cashmere outerwear layered over silk-crepe shirting with structured pleated trousers.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      aspect: 'aspect-[3/4]',
      featuredProductIds: ['prod_clothing_01', 'prod_clothing_03', 'prod_shoes_01'],
      stylingTips: [
        'Fasten the top two horn buttons for a structured, tapered neckline.',
        'Pair with minimal titanium horology and matte leather Chelsea boots.'
      ]
    },
    {
      id: 'look-02',
      title: 'Look 02: Tuscan Sun Suede & Sculptural Leather',
      season: 'Spring / Summer 2026 Atelier',
      location: 'Villa Medici, Rome',
      model: 'Arthur Pendelton',
      description: 'Monochromatic warm sandstone tones grounded by heavy-grain vegetable-tanned leather accessories and sculptural low-profile sneakers.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
      aspect: 'aspect-[4/5]',
      featuredProductIds: ['prod_bags_01', 'prod_shoes_02', 'prod_acc_01'],
      stylingTips: [
        'Carry the tote by the hand-stitched rolled handles rather than over the shoulder for a sharper silhouette.',
        'Contrast warm neutral apparel with brushed antique gold hardware.'
      ]
    },
    {
      id: 'look-03',
      title: 'Look 03: The Evening Gala Matrix in Silk & Velvet',
      season: 'Spring / Summer 2026 Atelier',
      location: 'Teatro alla Scala, Milan',
      model: 'Chiara Vane',
      description: 'Deep midnight blue tones cut in Mulberry silk-satin, offset by handcrafted architectural pumps and titanium acetate eyewear.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      aspect: 'aspect-[3/4]',
      featuredProductIds: ['prod_clothing_02', 'prod_shoes_03', 'prod_acc_02'],
      stylingTips: [
        'Leave the jacket unbuttoned to reveal the drape of the hand-spun silk camisole.',
        'Pair with extrait de parfum applied exclusively to pulse points.'
      ]
    },
    {
      id: 'look-04',
      title: 'Look 04: Maison Leisure & Raw Cashmere Essentials',
      season: 'Spring / Summer 2026 Atelier',
      location: 'Lake Como Atelier, Italy',
      model: 'Julian Vance',
      description: 'Effortless luxury designed for travel and residence. Ungauged knitwear paired with brass incense burner notes and calfskin cardholders.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
      aspect: 'aspect-[4/5]',
      featuredProductIds: ['prod_life_01', 'prod_life_02', 'prod_acc_03'],
      stylingTips: [
        'Layer over raw-edge linen tees during coastal transits.',
        'Keep accessories stored in their brushed microsuede sleeves.'
      ]
    }
  ];

  const currentLook = LOOKBOOK_ITEMS[activeLookIndex];
  const lookProducts = products.filter(p => currentLook.featuredProductIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 space-y-16">
      
      {/* Editorial Header */}
      <section className="bg-[#111111] text-white py-20 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Lookbook Catalogue</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
            Editorial Vol. VIII: Architectural Grace
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            A photographic retrospective capturing the Spring / Summer 2026 Atelier Collection across European architectural landmarks.
          </p>

          {/* Season Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-[#222222] border border-[#333333] text-xs font-semibold">
            <button
              onClick={() => setSelectedSeason('SS26')}
              className={`px-5 py-2 rounded-lg transition-all ${
                selectedSeason === 'SS26' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              SS26 Collection
            </button>
            <button
              onClick={() => setSelectedSeason('AW25')}
              className={`px-5 py-2 rounded-lg transition-all ${
                selectedSeason === 'AW25' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              AW25 Archive
            </button>
            <button
              onClick={() => setSelectedSeason('ATELIER_CAPSULE')}
              className={`px-5 py-2 rounded-lg transition-all ${
                selectedSeason === 'ATELIER_CAPSULE' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Atelier Capsule
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Lookbook Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Look Navigator Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-[#E5E0D8] text-xs font-semibold uppercase tracking-wider">
          {LOOKBOOK_ITEMS.map((look, index) => (
            <button
              key={look.id}
              onClick={() => setActiveLookIndex(index)}
              className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-2 ${
                activeLookIndex === index
                  ? 'bg-[#121212] text-amber-400 border-[#121212] shadow-sm'
                  : 'bg-white text-[#666666] border-[#E5E0D8] hover:border-[#121212] hover:text-[#121212]'
              }`}
            >
              <span className="font-mono text-[10px]">0{index + 1}</span>
              <span>{look.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Look Details Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8">
          
          {/* Main Editorial Image Frame */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-xl border border-[#E5E0D8] bg-[#EAE6DF]">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 max-h-[750px]"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-400 text-[10px] uppercase font-bold tracking-widest border border-white/10">
                {currentLook.season}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#121212] text-[10px] uppercase font-semibold tracking-wider">
                📍 {currentLook.location}
              </span>
            </div>
          </div>

          {/* Look Details & Shop the Look Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#8A7E72] font-mono">
                Look Curation 0{activeLookIndex + 1} of 0{LOOKBOOK_ITEMS.length}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#121212]">
                {currentLook.title}
              </h2>
              <p className="text-xs text-[#666666] leading-relaxed">
                {currentLook.description}
              </p>
            </div>

            {/* Styling Notes */}
            <div className="p-5 rounded-2xl bg-[#F4F0E8] border border-[#E5E0D8] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#121212] flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Atelier Styling Notes</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#555555]">
                {currentLook.stylingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Garments (Shop The Look) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#121212] flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Garments In This Look ({lookProducts.length})</span>
                </h3>
                <button
                  onClick={() => setActivePage('shop')}
                  className="text-xs font-semibold text-amber-900 hover:underline"
                >
                  View Full Catalogue →
                </button>
              </div>

              <div className="space-y-3">
                {lookProducts.map(p => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:border-[#121212] transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        onClick={() => navigateToProduct(p.id)}
                        className="w-16 h-20 object-cover rounded-xl bg-[#EAE6DF] cursor-pointer hover:opacity-90"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888]">{p.brand}</span>
                        <h4
                          onClick={() => navigateToProduct(p.id)}
                          className="text-xs font-bold text-[#121212] cursor-pointer hover:underline font-serif line-clamp-1"
                        >
                          {p.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-[#121212] block mt-1">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewProduct(p)}
                        className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DDD5C7] hover:bg-[#121212] hover:text-white transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1, true)}
                        className="px-3 py-2 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons between looks */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E0D8]">
              <button
                onClick={() => setActiveLookIndex((activeLookIndex - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length)}
                className="text-xs font-semibold text-[#555555] hover:text-black flex items-center gap-1"
              >
                ← Previous Look
              </button>
              <button
                onClick={() => setActiveLookIndex((activeLookIndex + 1) % LOOKBOOK_ITEMS.length)}
                className="text-xs font-semibold text-[#121212] hover:underline flex items-center gap-1"
              >
                <span>Next Look</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Grid of All Looks for fast browsing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10">
        <div className="border-t border-[#E5E0D8] pt-10 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#121212]">
              All Runway Looks in SS26
            </h3>
            <p className="text-xs text-[#666666]">Click any visual frame to inspect garments and styling specifications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((look, index) => (
            <div
              key={look.id}
              onClick={() => {
                setActiveLookIndex(index);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`rounded-2xl overflow-hidden bg-white border cursor-pointer transition-all group ${
                activeLookIndex === index ? 'ring-2 ring-[#121212] border-transparent shadow-lg' : 'border-[#E5E0D8] hover:border-[#121212]'
              }`}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[#ECE8E1]">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-amber-400 font-mono text-[9px] font-bold">
                  0{index + 1}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold font-serif text-[#121212] group-hover:underline line-clamp-1">
                  {look.title}
                </h4>
                <p className="text-[11px] text-[#777777]">{look.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
