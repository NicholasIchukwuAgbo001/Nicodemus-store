import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  Scissors,
  Layers,
  Leaf,
  Clock,
  ArrowRight,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const AtelierPage: React.FC = () => {
  const { setActivePage, navigateToCategory, setIsDesignTemplateModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'craft' | 'materials' | 'sustainability' | 'history'>('craft');

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 space-y-16">
      
      {/* Editorial Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0F0F0F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1800&auto=format&fit=crop"
            alt="Nicdemus Atelier Craft"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Scissors className="w-3.5 h-3.5" />
            <span>Savoir-Faire & Maison Heritage</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            The Architecture of Timeless European Tailoring
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Nicdemus was founded with a singular conviction: luxury should be felt in the weight of raw textile, the precision of a hand-rolled collar, and the quiet dignity of garments built to outlive seasons.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-3.5 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#F3EFEA] transition-all flex items-center gap-2"
            >
              <span>Explore Atelier Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDesignTemplateModalOpen(true)}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/20 backdrop-blur-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Design Blueprint</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-[#E5E0D8] overflow-x-auto text-xs font-semibold uppercase tracking-wider text-[#777777]">
          <button
            onClick={() => setActiveTab('craft')}
            className={`pb-4 px-6 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'craft' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Atelier Tailoring & Construction</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-4 px-6 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'materials' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Historic Mills & Sourcing</span>
          </button>

          <button
            onClick={() => setActiveTab('sustainability')}
            className={`pb-4 px-6 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sustainability' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Ethical Circularity & Traceability</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-6 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'history' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Maison Milestones & Heritage</span>
          </button>
        </div>

        {/* TAB 1: TAILORING & CRAFT */}
        {activeTab === 'craft' && (
          <div className="py-10 space-y-12 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
                  Handcrafted In Small Batches
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#121212]">
                  48 Hours of Manual Craftsmanship per Garment
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Every Nicdemus coat and jacket is hand-basted with floating horsehair canvas chest pieces. Unlike modern fused adhesives which stiffen with age, our floating canvas conforms organically to the contours of your body over decades of wear.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span><strong>Hand-Set Shoulders:</strong> Padded with natural Italian wool felt for subtle architectural drape without stiffness.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span><strong>Real Horn & Mother of Pearl:</strong> Hand-turned natural buttons secured with cross-stitch shank anchors.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span><strong>Individual Atelier Serial Numbers:</strong> Every piece is stamped with its production number and artisan seal.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => navigateToCategory('clothing')}
                    className="px-6 py-3 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors"
                  >
                    View Tailoring Line →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
                  alt="Tailoring close up"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/5] object-cover rounded-2xl border border-[#E5E0D8] shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                  alt="Pattern cutting"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/5] object-cover rounded-2xl border border-[#E5E0D8] shadow-md mt-6"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MATERIALS & MILLS */}
        {activeTab === 'materials' && (
          <div className="py-10 space-y-12 animate-in fade-in duration-200">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
                Rare & Certified Fibers
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#121212]">
                Our Partner Textile Mills
              </h2>
              <p className="text-xs text-[#666666]">
                We partner exclusively with century-old family mills in Piedmont, Lombardy, and Tuscany.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
                <span className="text-2xl font-serif font-bold text-[#121212]">Biella, Italy</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold block">Double-Faced Cashmere & 180s Wool</span>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Fed by pristine glacial spring waters from the Italian Alps, Biella mills produce unmatched fiber softness and density without harsh chemical softeners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
                <span className="text-2xl font-serif font-bold text-[#121212]">Lake Como, Italy</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold block">Mulberry Silk & Jacquard Lining</span>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Historic silk workshops weaving heavyweight 32-momme silk twill for jackets, ties, and pocket squares with hand-rolled borders.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
                <span className="text-2xl font-serif font-bold text-[#121212]">Santa Croce, Tuscany</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold block">Vegetable-Tanned Full-Grain Leather</span>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Tanned over 60 days in wooden drums with organic chestnut and mimosa tannins. Creates a supple leather that develops a rich patina over time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUSTAINABILITY */}
        {activeTab === 'sustainability' && (
          <div className="py-10 space-y-10 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-widest text-emerald-800 font-bold">
                  Circular Sustainability Charter
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#121212]">
                  Zero Waste, Monitored Carbon, Lifelong Care
                </h2>
                <p className="text-xs text-[#666666] leading-relaxed">
                  We believe true luxury is inherently sustainable because it is designed never to be discarded. We offer complimentary lifetime repair service for all Nicdemus bespoke and core tailoring items.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-2xl font-bold font-serif text-emerald-900">100%</span>
                    <p className="text-emerald-800 font-medium">Plastic-free recyclable concierge packaging</p>
                  </div>
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-2xl font-bold font-serif text-emerald-900">Lifetime</span>
                    <p className="text-emerald-800 font-medium">Complimentary seam & button restoration</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#F4F0E8] border border-[#E5E0D8] space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#121212]">
                  The Nicdemus Archival Buyback Initiative
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Should you ever wish to retire a Nicdemus garment, our Maison will repurchase it at up to 40% of its original purchase value as store credit, restoring the piece for our vintage archive or reweaving its noble fibers.
                </p>
                <button
                  onClick={() => setActivePage('concierge')}
                  className="text-xs font-bold uppercase tracking-wider text-amber-900 hover:underline"
                >
                  Contact Concierge about Archival Service →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MAISON HISTORY */}
        {activeTab === 'history' && (
          <div className="py-10 space-y-8 animate-in fade-in duration-200">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="relative pl-8 border-l-2 border-[#DDD5C7] space-y-8">
                
                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#121212] border-4 border-[#FAF8F5]" />
                  <span className="text-xs font-mono font-bold text-amber-800">2020 • THE GENESIS</span>
                  <h4 className="text-lg font-serif font-bold text-[#121212]">Founding of the Paris Atelier</h4>
                  <p className="text-xs text-[#666666] mt-1">
                    Nicdemus begins as a private bespoke tailoring salon on Rue du Faubourg Saint-Honoré, crafting custom garments for European collectors.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#121212] border-4 border-[#FAF8F5]" />
                  <span className="text-xs font-mono font-bold text-amber-800">2023 • FOOTWEAR & LEATHER</span>
                  <h4 className="text-lg font-serif font-bold text-[#121212]">Expansion into Tuscan Leatherwork</h4>
                  <p className="text-xs text-[#666666] mt-1">
                    Partnership established with Santa Croce master tanners, debuting our signature Tuscan Handcrafted Tote and Chelsea Boot series.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-amber-400 border-4 border-[#FAF8F5]" />
                  <span className="text-xs font-mono font-bold text-amber-800">2026 • GLOBAL DIGITAL MAISON</span>
                  <h4 className="text-lg font-serif font-bold text-[#121212]">Modern Global E-Commerce & Direct Settlement</h4>
                  <p className="text-xs text-[#666666] mt-1">
                    Launch of the 2026 Digital Flagship, offering worldwide courier dispatch, multi-currency pricing, and direct international bank settlement.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
