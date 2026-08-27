import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_MOCKUP_IMAGE } from '../../data/mockupAsset';
import { X, ZoomIn, ZoomOut, Maximize2, Sparkles, Layers, Palette, Type, CheckCircle } from 'lucide-react';

export const DesignTemplateModal: React.FC = () => {
  const { isDesignTemplateModalOpen, setIsDesignTemplateModalOpen } = useStore();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'mockup' | 'specs' | 'palette'>('mockup');

  if (!isDesignTemplateModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#181818] border border-[#333333] text-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B2B2B] bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold tracking-wide">2026 UI/UX Website Template & Visual Blueprint</h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Nicdemus Store
                </span>
              </div>
              <p className="text-xs text-zinc-400">High-Fidelity Architectural Mockup & Design System Reference</p>
            </div>
          </div>

          {/* Tab switchers */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-[#222222] p-1 rounded-xl border border-[#333333]">
              <button
                onClick={() => setActiveTab('mockup')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'mockup' ? 'bg-[#333333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Visual Mockup
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'specs' ? 'bg-[#333333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Design System Specs
              </button>
              <button
                onClick={() => setActiveTab('palette')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'palette' ? 'bg-[#333333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Color & Tokens
              </button>
            </div>

            <button
              id="btn-close-design-modal"
              onClick={() => setIsDesignTemplateModalOpen(false)}
              className="p-2 rounded-xl bg-[#222222] hover:bg-[#2F2F2F] text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0E0E0E]">
          {activeTab === 'mockup' && (
            <div className="space-y-6">
              {/* Image Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#181818] rounded-xl border border-[#2B2B2B]">
                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Interactive high-resolution rendered template depicting the homepage, product card grid, and floating cart drawer.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
                    className="p-2 rounded-lg bg-[#252525] hover:bg-[#333333] text-zinc-300 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-zinc-400 px-1">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
                    className="p-2 rounded-lg bg-[#252525] hover:bg-[#333333] text-zinc-300 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-2 rounded-lg bg-[#252525] hover:bg-[#333333] text-zinc-300 transition-colors"
                    title="Reset Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mockup Display Box */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2B2B2B] bg-[#141414] shadow-2xl flex items-center justify-center p-2 min-h-[460px]">
                <div
                  className="transition-transform duration-200 ease-out origin-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={STORE_MOCKUP_IMAGE}
                    alt="Nicdemus Store 2026 UI/UX Website Template & Mockup Reference"
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[70vh] rounded-xl shadow-2xl object-contain border border-[#333333]"
                  />
                </div>
              </div>

              {/* Annotation Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626]">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Editorial Hero & Sticky Navigation</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Designed with generous negative space, serif headline typography, translucent navigation bar with quick category jump and live multi-currency switcher.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626]">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Curated Product Cards</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    High-contrast photography, hover quick-view micro-interactions, size and color swatches, and direct 1-click cart insertion.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#161616] border border-[#262626]">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Bank Transfer & Proof Flow</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Integrated Apex Private Bank transfer account details, auto-generated payment references, and digital receipt proof verification uploader.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-6 text-sm">
              <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
                  <Layers className="w-5 h-5" />
                  <h4>2026 UI/UX Design System Specifications</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300">
                  <div className="space-y-3">
                    <h5 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-[#2E2E2E] pb-2">Layout & Grid</h5>
                    <ul className="space-y-2 text-zinc-400">
                      <li>• <strong>Container Width:</strong> 1440px max fluid with responsive outer margins</li>
                      <li>• <strong>12-Column Grid:</strong> 24px gutter on desktop, 16px on mobile</li>
                      <li>• <strong>Border Radii:</strong> Strict 12–16px container radius, 8px for pills</li>
                      <li>• <strong>Negative Space:</strong> Minimum 64px to 96px vertical section padding</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-[#2E2E2E] pb-2">E-Commerce Architecture</h5>
                    <ul className="space-y-2 text-zinc-400">
                      <li>• <strong>Multi-Category:</strong> Clothing, Footwear, Handcrafted Bags, Accessories, Lifestyle</li>
                      <li>• <strong>Payment Architecture:</strong> Direct Wire/Bank Transfer + Swift + Card/Apple Pay</li>
                      <li>• <strong>Persistence:</strong> Real-time LocalStorage synchronization for orders and cart</li>
                      <li>• <strong>Tracking:</strong> Real-time 5-stage courier timeline visualization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
                  <Type className="w-5 h-5" />
                  <h4>Typography Pairing Hierarchy</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C]">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">Display & Headlines</span>
                    <p className="text-xl font-serif mt-2 text-white">Cormorant Garamond</p>
                    <p className="text-xs text-zinc-400 mt-1">Used for luxury editorial titles, product names, and manifesto quotes.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C]">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">Body & UI Microcopy</span>
                    <p className="text-xl font-sans mt-2 font-medium text-white">Plus Jakarta Sans</p>
                    <p className="text-xs text-zinc-400 mt-1">Used for readable descriptions, checkout forms, pricing, and specs.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C]">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">Brand Logo & Badges</span>
                    <p className="text-xl font-mono tracking-widest mt-2 uppercase text-amber-400">Syne / Inter</p>
                    <p className="text-xs text-zinc-400 mt-1">Used for brand insignia, SKU numbers, and status chips.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'palette' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
                  <Palette className="w-5 h-5" />
                  <h4>Curated 2026 Luxury Color Palette</h4>
                </div>
                <p className="text-xs text-zinc-400">Warm neutrals, rich charcoal, and golden accent tones creating timeless sophistication.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#0A0A0A] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-zinc-400">#0A0A0A</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Onyx Black</p>
                    <p className="text-[10px] text-zinc-500">Primary text & buttons</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#FAF8F5] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-zinc-800">#FAF8F5</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Warm Ivory</p>
                    <p className="text-[10px] text-zinc-500">Primary background</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#EFECE6] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-zinc-800">#EFECE6</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Linen Beige</p>
                    <p className="text-[10px] text-zinc-500">Container card fill</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#D4AF37] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-zinc-900 font-bold">#D4AF37</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Gilded Gold</p>
                    <p className="text-[10px] text-zinc-500">Brand luxury accent</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#9E5A3F] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-white">#9E5A3F</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Terracotta Earth</p>
                    <p className="text-[10px] text-zinc-500">Secondary warm tone</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-20 rounded-xl bg-[#2C2E33] border border-[#333333] shadow-inner flex items-end p-2">
                      <span className="text-[10px] font-mono text-zinc-400">#2C2E33</span>
                    </div>
                    <p className="text-xs font-semibold text-white">Deep Charcoal</p>
                    <p className="text-[10px] text-zinc-500">Subtle borders & badges</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#121212] border-t border-[#2B2B2B] flex items-center justify-between">
          <span className="text-xs text-zinc-400">Nicdemus Store Architectural Master Layout & Interactive Reference</span>
          <button
            id="btn-close-design-modal-bottom"
            onClick={() => setIsDesignTemplateModalOpen(false)}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
          >
            Explore Live Store
          </button>
        </div>

      </div>
    </div>
  );
};
