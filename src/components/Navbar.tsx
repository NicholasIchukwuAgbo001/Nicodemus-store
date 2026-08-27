import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Currency, Category } from '../types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Globe,
  SlidersHorizontal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    navigateToCategory,
    navigateToProduct,
    currency,
    setCurrency,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    user,
    products,
    filterState,
    setFilterState,
    setIsDesignTemplateModalOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInlineSearchFocused, setIsInlineSearchFocused] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const inlineSearchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inlineSearchRef.current?.focus();
        setIsInlineSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setIsInlineSearchFocused(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close inline search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsInlineSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const searchResults = searchInput.trim()
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchInput.toLowerCase()))
    ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilterState(prev => ({
        ...prev,
        searchQuery: searchInput.trim(),
        category: 'all'
      }));
      setActivePage('shop');
      setIsSearchOpen(false);
      setIsInlineSearchFocused(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (page: typeof activePage, category?: Category) => {
    if (category) {
      navigateToCategory(category);
    } else {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#0D0D0D] text-[#E0DCD3] border-b border-[#222222]">
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-14 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium tracking-wider flex items-center justify-between gap-2">
          {/* Desktop Announcement */}
          <div className="hidden md:flex items-center gap-4 text-zinc-400">
            <span>Complimentary Global Express Delivery on $250+</span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-400 font-semibold">15% Off with Code: NICDEMUS2026</span>
          </div>

          {/* Clean concise message for mobile */}
          <div className="flex-1 md:hidden text-left sm:text-center text-amber-300 font-semibold text-[10px] tracking-tight truncate">
            <span>NICDEMUS2026 for 15% Off • Free VIP Courier</span>
          </div>

          {/* Right actions: Currency picker */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-[10px] font-mono"
              >
                <Globe className="w-3 h-3 text-zinc-400" />
                <span>{currency}</span>
                <ChevronDown className="w-2.5 h-2.5 text-zinc-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {(['USD', 'EUR', 'GBP', 'NGN'] as Currency[]).map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-white/10 ${currency === c ? 'text-amber-400 font-semibold' : 'text-zinc-300'
                        }`}
                    >
                      <span>{c}</span>
                      <span className="text-zinc-500 font-mono text-[10px]">
                        {c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '₦'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-2.5 sm:py-3.5 border-b border-[#E8E2D8]'
          : 'bg-[#FAF8F5] py-3 sm:py-5 border-b border-[#EDE7DD]'
          }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-14 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">

          {/* Mobile hamburger & search icons */}
          <div className="flex items-center lg:hidden gap-1 sm:gap-2 shrink-0">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-black/5 text-[#121212] transition-colors"
              aria-label="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 text-[#121212] transition-colors"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#2A2A2A]" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left flex justify-center lg:justify-start min-w-0">
            <button
              id="brand-logo"
              onClick={() => handleNavClick('home')}
              className="text-center lg:text-left group flex flex-col items-center lg:items-start select-none"
            >
              <span className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.18em] sm:tracking-[0.2em] text-[#0E0E0E] group-hover:opacity-80 transition-opacity">
                NICDEMUS
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8C8275] -mt-1 font-semibold whitespace-nowrap">
                Atelier & Lifestyle
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-10 text-xs font-semibold uppercase tracking-widest text-[#2A2A2A]">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'home' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Home
            </button>

            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('shop')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'shop' && filterState.category === 'all' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Shop
            </button>

            <button
              id="nav-link-clothing"
              onClick={() => handleNavClick('shop', 'clothing')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'shop' && filterState.category === 'clothing' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Clothing
            </button>

            <button
              id="nav-link-shoes"
              onClick={() => handleNavClick('shop', 'shoes')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'shop' && filterState.category === 'shoes' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Shoes
            </button>

            <button
              id="nav-link-bags"
              onClick={() => handleNavClick('shop', 'bags')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'shop' && filterState.category === 'bags' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Bags
            </button>

            <button
              id="nav-link-accessories"
              onClick={() => handleNavClick('shop', 'accessories')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'shop' && filterState.category === 'accessories' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Accessories
            </button>

            <button
              id="nav-link-lookbook"
              onClick={() => handleNavClick('lookbook')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'lookbook' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Lookbook
            </button>

            <button
              id="nav-link-atelier"
              onClick={() => handleNavClick('atelier')}
              className={`hover:text-black transition-colors relative py-1 ${activePage === 'atelier' ? 'text-black after:w-full' : 'text-[#555555]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#121212] after:transition-all after:w-0 hover:after:w-full`}
            >
              Atelier
            </button>
          </div>

          {/* Right Action Icons & Expanded Search */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
            {/* Expanded Desktop Search Bar */}
            <div ref={searchContainerRef} className="relative hidden md:block w-56 lg:w-72 xl:w-96">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 pointer-events-none" />
                <input
                  ref={inlineSearchRef}
                  type="text"
                  value={searchInput}
                  onChange={e => {
                    setSearchInput(e.target.value);
                    setIsInlineSearchFocused(true);
                  }}
                  onFocus={() => setIsInlineSearchFocused(true)}
                  placeholder="Search cashmere coats, blazers, bags..."
                  className="w-full pl-10 pr-14 py-2.5 text-xs rounded-full border border-[#DDD5C7] bg-[#F4F0E8]/90 focus:bg-white focus:border-[#121212] focus:ring-1 focus:ring-[#121212] text-[#121212] placeholder-[#8C8275] transition-all outline-none shadow-inner"
                />
                {searchInput ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setIsInlineSearchFocused(false);
                    }}
                    className="absolute right-3 p-0.5 rounded-full hover:bg-black/5 text-[#8C8275] hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="absolute right-3 hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono text-[#8C8275] bg-white/80 border border-[#DDD5C7] rounded shadow-xs">
                    ⌘K
                  </kbd>
                )}
              </form>

              {/* Inline Search Live Dropdown */}
              {isInlineSearchFocused && searchInput.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#FAF8F5] border border-[#E0D9CD] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-[#E8E2D8] bg-white flex justify-between items-center text-[11px] text-[#777777] font-semibold">
                    <span>MATCHING PIECES ({searchResults.length})</span>
                    <button
                      type="button"
                      onClick={() => setIsInlineSearchFocused(false)}
                      className="hover:text-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-[#EFECE6] max-h-64 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            navigateToProduct(prod.id);
                            setIsInlineSearchFocused(false);
                            setSearchInput('');
                          }}
                          className="p-2.5 flex items-center justify-between hover:bg-[#F3EFEA] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prod.thumbnail}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-9 h-11 object-cover rounded border border-[#E5DEC9]"
                            />
                            <div>
                              <p className="text-xs font-semibold text-[#121212] line-clamp-1">{prod.name}</p>
                              <p className="text-[10px] text-[#777777]">{prod.brand} • {prod.subcategory}</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#121212]">${prod.price}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-[#777777]">
                        No matches found. Press Enter to search entire store.
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 bg-[#F4F0E8] hover:bg-[#EDE7DC] border-t border-[#E8E2D8] text-[11px] font-semibold text-[#121212] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View All Search Results for "{searchInput}"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="btn-nav-wishlist"
              onClick={() => handleNavClick('account')}
              className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-black/5 text-[#2A2A2A] transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#9E5A3F] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account (Desktop & Tablet) */}
            <button
              id="btn-nav-account"
              onClick={() => handleNavClick('account')}
              className="hidden sm:flex p-1.5 sm:p-2.5 rounded-full hover:bg-black/5 text-[#2A2A2A] transition-colors items-center gap-1.5"
              title="Customer Account & Orders"
              aria-label="Customer Account"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-[#DDD5C7]"
                />
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {user && (
                <span className="hidden xl:inline text-xs font-semibold tracking-normal text-[#121212] max-w-[90px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Floating Shopping Cart Trigger */}
            <button
              id="btn-nav-cart"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-[#121212] hover:bg-[#2A2A2A] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 text-black text-[9px] sm:text-[10px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Live Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E0D9CD] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <form onSubmit={handleSearchSubmit} className="flex items-center px-5 py-4 border-b border-[#E8E2D8] bg-white">
              <Search className="w-5 h-5 text-[#888888] mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search cashmere coats, blazers, leather bags, sneakers, watches..."
                className="w-full text-sm bg-transparent border-none outline-none text-[#121212] placeholder-[#888888]"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 text-[#777777] hover:text-[#121212]"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Results */}
            <div className="p-5 max-h-80 overflow-y-auto space-y-3">
              {searchResults.length > 0 ? (
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#888888] font-semibold mb-2 block">
                    Matching Atelier Pieces
                  </span>
                  <div className="divide-y divide-[#EFECE6]">
                    {searchResults.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          navigateToProduct(prod.id);
                          setIsSearchOpen(false);
                          setSearchInput('');
                        }}
                        className="py-2.5 flex items-center justify-between hover:bg-[#F3EFEA] px-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.thumbnail}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover rounded-md border border-[#E5DEC9]"
                          />
                          <div>
                            <p className="text-xs font-semibold text-[#121212]">{prod.name}</p>
                            <p className="text-[11px] text-[#777777]">{prod.brand} • {prod.subcategory}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#121212]">${prod.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchInput.trim() ? (
                <div className="text-center py-6 text-xs text-[#777777]">
                  No direct matches found for "{searchInput}". Press Enter to view all catalogue filters.
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#888888] font-semibold block">
                    Popular Collections
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Cashmere Trench', 'Tailored Blazers', 'Silk Slip Dress', 'Calfskin Loafers', 'Leather Totes', 'Artisanal Candle'].map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchInput(term);
                          setFilterState(prev => ({ ...prev, searchQuery: term, category: 'all' }));
                          setActivePage('shop');
                          setIsSearchOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white border border-[#DDD5C7] text-xs text-[#333333] hover:border-[#121212] hover:bg-[#FAF8F5] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 bg-[#F4F0E8] border-t border-[#E8E2D8] flex justify-between items-center text-xs text-[#666666]">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#D5CEC2] rounded text-[10px] font-mono">ESC</kbd> to close</span>
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="font-semibold text-[#121212] hover:underline flex items-center gap-1"
              >
                <span>View Full Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[120px] bottom-0 bg-[#FAF8F5] border-b border-[#E8E2D8] shadow-2xl overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-5 sm:p-6 space-y-4 pb-20">
            <div className="p-5 sm:p-6 space-y-4 pb-20">
              {/* Mobile User Profile Bar */}
              {user && (
                <div
                  onClick={() => handleNavClick('account')}
                  className="p-3 bg-white border border-[#E8E2D8] rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#F3EFEA] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#DDD5C7]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#121212]">{user.fullName}</p>
                      <p className="text-[10px] text-[#777777] font-mono">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    VIP Account
                  </span>
                </div>
              )}

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search cashmere, blazers, bags..."
                  className="w-full pl-9 pr-9 py-2.5 text-xs rounded-xl border border-[#DDD5C7] bg-white text-[#121212] placeholder-[#8C8275] outline-none focus:border-[#121212]"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 p-1 text-[#8C8275]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              <div className="space-y-0.5 text-xs font-semibold uppercase tracking-wider text-[#2A2A2A]">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Home</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center font-bold text-[#121212]"
                >
                  <span>Shop All Products</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'clothing')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center text-[#9E5A3F]"
                >
                  <span>Clothing & Tailoring</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'shoes')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Footwear & Shoes</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'bags')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Handcrafted Bags</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'accessories')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Accessories & Eyewear</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('shop', 'lifestyle')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Maison & Lifestyle</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('lookbook')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center text-amber-800"
                >
                  <span>Editorial Lookbook SS26</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('atelier')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Atelier & Savoir-Faire</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => handleNavClick('account')}
                  className="w-full text-left py-2.5 px-2 hover:bg-[#F0EBE1] rounded-lg border-b border-[#EFECE6] flex justify-between items-center"
                >
                  <span>Customer Account & Bank Wire</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/2348039002026?text=Hello%20Nicdemus%20Atelier,%20I%20would%20like%20to%20inquire%20about%20your%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#0D0D0D] text-amber-400 hover:bg-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-amber-400/20"
                >
                  <span>WhatsApp VIP Concierge (+234 803 900 2026)</span>
                </a>
              </div>
            </div>
      )}
          </header>
          );
};
