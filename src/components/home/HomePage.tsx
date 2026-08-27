import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_BANK_DETAILS } from '../../data/mockupAsset';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  ShieldCheck,
  Truck,
  Building2,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    navigateToCategory,
    navigateToProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setActivePage,
    setIsDesignTemplateModalOpen,
    showToast
  } = useStore();

  const [copiedBank, setCopiedBank] = useState(false);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const copyBankNumber = () => {
    navigator.clipboard.writeText(STORE_BANK_DETAILS.accountNumber);
    setCopiedBank(true);
    showToast('Store Bank Account Number copied to clipboard', 'success');
    setTimeout(() => setCopiedBank(false), 3000);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO EDITORIAL SHOWCASE */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#111111] overflow-hidden text-white">
        {/* Background Editorial Image with subtle dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Nicdemus Atelier SS26"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top opacity-40 mix-blend-luminosity scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spring / Summer 2026 Atelier Collection</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
            Architectural Tailoring & Contemporary Luxury
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Meticulously constructed garments, sculptural footwear, and artisanal leather goods crafted with uncompromising European standards for the modern collector.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="btn-hero-explore-shop"
              onClick={() => setActivePage('shop')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F3EFEA] text-[#121212] rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-2xl hover:scale-105 duration-200"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-lookbook"
              onClick={() => setActivePage('lookbook')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold uppercase tracking-wider backdrop-blur-md flex items-center justify-center gap-2 transition-all"
            >
              <span>View Atelier Lookbook</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick value props pill */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto border-t border-white/10 text-xs text-zinc-400">
            <div>
              <span className="text-white font-semibold block">100% Certified</span>
              <span className="text-[11px]">Biella Cashmere & Silks</span>
            </div>
            <div>
              <span className="text-white font-semibold block">Bank Wire Option</span>
              <span className="text-[11px]">Direct account settlement</span>
            </div>
            <div>
              <span className="text-white font-semibold block">Global Courier</span>
              <span className="text-[11px]">Complimentary over $250</span>
            </div>
            <div>
              <span className="text-white font-semibold block">30-Day Returns</span>
              <span className="text-[11px]">Concierge pickup service</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DIRECT BANK TRANSFER CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#181818] border border-[#2D2D2D] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Direct Wire Settlement
                </span>
                <span className="text-xs text-zinc-400">• 0% Processing Surcharge</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Official Nicdemus Store Settlement Bank Account
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl">
                For swift international settlements and high-value atelier orders, you can wire directly to our Apex International account with automated slip verification.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-[#242424] border border-[#383838] text-xs font-mono text-center sm:text-left w-full sm:w-auto">
              <span className="text-[10px] text-zinc-500 block uppercase font-sans font-semibold">Account Number</span>
              <strong className="text-white text-sm tracking-wider">{STORE_BANK_DETAILS.accountNumber}</strong>
            </div>

            <button
              onClick={copyBankNumber}
              className="w-full sm:w-auto px-4 py-3 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              {copiedBank ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
              <span>{copiedBank ? 'Copied to Clipboard' : 'Copy Bank Account'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY VISUAL GALLERIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
              Curated Departments
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#121212] mt-1">
              Explore By Category
            </h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-semibold text-[#121212] hover:text-amber-800 flex items-center gap-1 group"
          >
            <span>View All Atelier Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Category Card: Clothing */}
          <div
            onClick={() => navigateToCategory('clothing')}
            className="md:col-span-8 group relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E0D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Clothing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">Signature Tailoring</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1">Coats, Blazers & Structured Knitwear</h3>
              <p className="text-xs text-zinc-300 max-w-md mt-2">Cut from double-faced cashmere and virgin wools from Biella.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 group-hover:underline">
                <span>Shop Clothing Collection</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Category Card: Shoes */}
          <div
            onClick={() => navigateToCategory('shoes')}
            className="md:col-span-4 group relative aspect-[4/5] md:aspect-auto rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E0D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
              alt="Shoes"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Footwear</span>
              <h3 className="text-xl font-serif font-bold mt-1">Shoes & Handcrafted Boots</h3>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <span>Explore Footwear</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 3 Column Grid for Bags, Accessories, Lifestyle */}
          <div
            onClick={() => navigateToCategory('bags')}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E0D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
              alt="Bags"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Leather Goods</span>
              <h3 className="text-xl font-serif font-bold mt-1">Handcrafted Bags & Totes</h3>
              <span className="text-xs text-zinc-300 mt-1">Tuscan vegetable-tanned leathers</span>
            </div>
          </div>

          <div
            onClick={() => navigateToCategory('accessories')}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E0D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"
              alt="Accessories"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Horology & Eyewear</span>
              <h3 className="text-xl font-serif font-bold mt-1">Accessories & Eyewear</h3>
              <span className="text-xs text-zinc-300 mt-1">Japanese titanium & Swiss movements</span>
            </div>
          </div>

          <div
            onClick={() => navigateToCategory('lifestyle')}
            className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-[#E5E0D8]"
          >
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop"
              alt="Lifestyle"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">Maison & Scent</span>
              <h3 className="text-xl font-serif font-bold mt-1">Maison & Lifestyle Objects</h3>
              <span className="text-xs text-zinc-300 mt-1">Extrait de parfum & brass artifacts</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED PRODUCTS BENTO / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-amber-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Bestselling Pieces</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#121212] mt-1">
              Featured Curations
            </h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-semibold text-[#121212] hover:underline"
          >
            View Entire Catalogue ({products.length} items) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm flex flex-col group hover:border-[#121212] transition-all"
            >
              {/* Image with hover switch */}
              <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                <img
                  src={p.thumbnail}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  onClick={() => navigateToProduct(p.id)}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-all duration-500"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#121212] text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isWishlisted(p.id) ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-zinc-700 hover:text-rose-600'
                  }`}
                  title={isWishlisted(p.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted(p.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setQuickViewProduct(p)}
                  className="absolute bottom-3 inset-x-3 py-2.5 bg-white/95 backdrop-blur-md rounded-xl text-xs font-semibold text-[#121212] shadow-lg opacity-0 group-hover:opacity-100 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#888888]">{p.brand}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => navigateToProduct(p.id)}
                    className="text-sm font-semibold text-[#121212] cursor-pointer hover:underline line-clamp-1 mt-1 font-serif"
                  >
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold font-mono text-[#121212]">{formatPrice(p.price)}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-[#888888] line-through font-mono">{formatPrice(p.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#EFECE6]">
                  <div className="flex items-center gap-1">
                    {p.colors.slice(0, 3).map(c => (
                      <span
                        key={c.name}
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1, true)}
                    className="px-4 py-2 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ATELIER MANIFESTO & CRAFTSMANSHIP SECTION */}
      <section className="bg-[#FAF4ED] border-y border-[#E8E0D5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
                The Nicdemus Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212] leading-tight">
                Crafted Without Compromise for the Discerning Individual
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Nicdemus was conceived as an antidote to ephemeral fast fashion. We treat garments as wearable architecture — developing bespoke textiles with Biella's historic mills and assembling each piece with seasoned master artisans in Italy, France, and Spain.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E0D7CB] text-xs">
                <div className="space-y-1">
                  <span className="text-2xl font-bold font-serif text-[#121212]">100%</span>
                  <p className="text-[#666666]">European Atelier Traceability & Ethical Sourcing</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold font-serif text-[#121212]">0.0%</span>
                  <p className="text-[#666666]">Synthetic filler fabrics in core tailoring lines</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsDesignTemplateModalOpen(true)}
                  className="px-6 py-3 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Inspect 2026 Visual Mockup Template</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
                alt="Crafting detail 1"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-[#E5E0D8] shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                alt="Crafting detail 2"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-[#E5E0D8] shadow-md mt-6"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. EDITORIAL PRESS & CLIENT REPUTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
            Critical Acclaim
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#121212]">
            What The Fashion Press Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm font-serif italic text-[#121212] leading-relaxed">
              "Nicdemus defines the post-minimalist luxury era with razor-sharp cuts and unprecedented textile density."
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#888888] block pt-2 border-t border-[#EFECE6]">
              Vogue Haute Paris
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm font-serif italic text-[#121212] leading-relaxed">
              "The direct bank settlement option and bespoke concierge packaging make acquiring their seasonal pieces effortless."
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#888888] block pt-2 border-t border-[#EFECE6]">
              Financial Times Luxury Edition
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm font-serif italic text-[#121212] leading-relaxed">
              "An extraordinary masterclass in modern European tailoring. The Double-Faced Cashmere Overcoat is an instant classic."
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#888888] block pt-2 border-t border-[#EFECE6]">
              GQ International
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
