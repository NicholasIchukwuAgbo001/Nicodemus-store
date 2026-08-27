import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory, Product } from '../../types';
import {
  Filter,
  Grid,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setQuickViewProduct,
    navigateToProduct
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4 | 1>(3);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Available unique colors and sizes from dataset
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach(p => {
      p.colors.forEach(c => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => set.add(s)));
    return Array.from(set);
  }, [products]);

  // Categories list
  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Atelier' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'shoes', label: 'Shoes & Footwear' },
    { id: 'bags', label: 'Handcrafted Bags' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'lifestyle', label: 'Lifestyle & Maison' }
  ];

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // Colors
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some(c => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }
      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      // In stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesBrand) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, priceRange, selectedColors, selectedSizes, inStockOnly, searchQuery, sortBy]);

  const handleColorToggle = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSearchQuery('');
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    searchQuery.trim().length > 0 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
            Spring / Summer 2026 Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212] mt-1">
            {selectedCategory === 'all' ? 'All Collections & Pieces' : categories.find(c => c.id === selectedCategory)?.label}
          </h1>
          <p className="text-xs text-[#777777] mt-1">
            Showing {filteredProducts.length} curated luxury pieces with express international delivery.
          </p>
        </div>

        {/* Top Controls: View Switcher & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Layout Switcher */}
          <div className="hidden sm:flex items-center bg-[#F4F0E8] p-1 rounded-xl border border-[#DDD5C7]">
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded-lg transition-colors ${gridColumns === 3 ? 'bg-white text-[#121212] shadow-sm' : 'text-[#777777]'}`}
              title="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 rounded-lg transition-colors ${gridColumns === 4 ? 'bg-white text-[#121212] shadow-sm' : 'text-[#777777]'}`}
              title="4 Columns"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(1)}
              className={`p-1.5 rounded-lg transition-colors ${gridColumns === 1 ? 'bg-white text-[#121212] shadow-sm' : 'text-[#777777]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#777777] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DDD5C7] text-[#121212] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#121212]"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals (2026)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({selectedColors.length + selectedSizes.length + (selectedCategory !== 'all' ? 1 : 0)})</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#121212] text-white shadow-sm'
                : 'bg-white border border-[#DDD5C7] text-[#555555] hover:border-[#121212] hover:text-[#121212]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-6 sticky top-28">
            
            {/* Header & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#121212] flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
                <span>Refine Selection</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-[#9E5A3F] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#121212]">Price Filter:</span>
                <span className="font-mono text-[#8A7E72] font-semibold">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[#121212] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono">
                <span>$0</span>
                <span>$1,000</span>
                <span>$2,000+</span>
              </div>
            </div>

            {/* Color Palette Filter */}
            <div className="space-y-3 pt-3 border-t border-[#EFECE6]">
              <span className="text-xs font-semibold text-[#121212] block">Color Swatches</span>
              <div className="flex flex-wrap gap-2">
                {allColors.map(col => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => handleColorToggle(col.name)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#121212] ring-offset-2 scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${col.hex.toLowerCase() === '#ffffff' || col.hex.toLowerCase() === '#ece7df' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizing Filter */}
            <div className="space-y-3 pt-3 border-t border-[#EFECE6]">
              <span className="text-xs font-semibold text-[#121212] block">Garment & Footwear Sizes</span>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map(sz => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSizeToggle(sz)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                        isSelected
                          ? 'bg-[#121212] text-white'
                          : 'bg-[#FAF8F5] border border-[#DDD5C7] text-[#555555] hover:border-[#121212]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
              <label htmlFor="chk-instock" className="text-xs text-[#121212] font-semibold cursor-pointer">
                In-Stock Ready for Immediate Dispatch
              </label>
              <input
                id="chk-instock"
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded text-[#121212] focus:ring-0 cursor-pointer"
              />
            </div>

          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="p-16 bg-white rounded-2xl border border-[#E5E0D8] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#DDD5C7] mx-auto flex items-center justify-center text-[#888888]">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#121212]">No matching luxury items</h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto">
                No items meet your exact filter criteria. Try clearing selected swatches or adjusting the price threshold.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A]"
              >
                Clear All Filters
              </button>
            </div>
          ) : gridColumns === 1 ? (
            /* LIST VIEW */
            <div className="space-y-4">
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-2xl border border-[#E5E0D8] shadow-sm flex flex-col sm:flex-row gap-6 group hover:border-[#121212] transition-all"
                >
                  <div className="relative w-full sm:w-48 aspect-[3/4] bg-[#EFECE6] rounded-xl overflow-hidden shrink-0">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      onClick={() => navigateToProduct(p.id)}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#121212] text-amber-400 text-[9px] font-bold uppercase rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#888888]">{p.brand}</span>
                          <h3
                            onClick={() => navigateToProduct(p.id)}
                            className="text-base font-serif font-bold text-[#121212] cursor-pointer hover:underline"
                          >
                            {p.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className={`p-2 rounded-full border transition-colors ${
                            isWishlisted(p.id) ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-zinc-400 hover:text-rose-600 border-[#E5E0D8]'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted(p.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-[#555555] line-clamp-2 mt-1">{p.description}</p>

                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-[#121212]">{p.rating}</span>
                          <span className="text-[#888888]">({p.reviewCount})</span>
                        </div>
                        <span className="text-zinc-300">•</span>
                        <span className="font-bold font-mono text-sm text-[#121212]">{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-[#888888] line-through font-mono">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#EFECE6]">
                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1, true)}
                        className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] flex items-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        onClick={() => setQuickViewProduct(p)}
                        className="px-4 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#121212] rounded-xl text-xs font-semibold hover:bg-white flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 3 OR 4 COLUMNS GRID VIEW */
            <div
              className={`grid gap-6 ${
                gridColumns === 4
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm flex flex-col group hover:border-[#121212] transition-all"
                >
                  {/* Image Stage with hover flip */}
                  <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      onClick={() => navigateToProduct(p.id)}
                      className={`w-full h-full object-cover cursor-pointer transition-all duration-500 ${
                        p.images[1] ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                      }`}
                    />
                    {p.images[1] && (
                      <img
                        src={p.images[1]}
                        alt={`${p.name} alternate`}
                        referrerPolicy="no-referrer"
                        onClick={() => navigateToProduct(p.id)}
                        className="w-full h-full object-cover cursor-pointer absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    )}

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {p.badge && (
                        <span className="px-2.5 py-0.5 bg-[#121212] text-amber-400 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                        isWishlisted(p.id) ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-zinc-700 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted(p.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={() => setQuickViewProduct(p)}
                      className="absolute bottom-3 inset-x-3 py-2.5 bg-white/95 backdrop-blur-md rounded-xl text-xs font-semibold text-[#121212] shadow-lg opacity-0 group-hover:opacity-100 transition-all text-center flex items-center justify-center gap-1.5 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#888888]">{p.brand}</span>
                        <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-bold text-[#121212]">{p.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateToProduct(p.id)}
                        className="text-xs font-semibold text-[#121212] cursor-pointer hover:underline line-clamp-1 mt-1"
                      >
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-bold font-mono text-[#121212]">{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-[11px] text-[#888888] line-through font-mono">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    {/* Color Swatch Dots & Add to Cart */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#EFECE6]">
                      <div className="flex items-center gap-1">
                        {p.colors.slice(0, 3).map(c => (
                          <span
                            key={c.name}
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors[0], 1, true)}
                        className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] text-[#121212] rounded-lg text-[11px] font-semibold uppercase tracking-wider hover:bg-[#121212] hover:text-white transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full ml-auto p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">Filter Collection</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-[#555555]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#121212] block">Price Threshold</span>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#121212]"
                />
                <span className="text-xs font-mono text-[#8A7E72] block font-semibold">{formatPrice(priceRange[1])}</span>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#121212] block">Colors</span>
                <div className="flex flex-wrap gap-2">
                  {allColors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => handleColorToggle(c.name)}
                      className={`w-7 h-7 rounded-full border ${selectedColors.includes(c.name) ? 'ring-2 ring-black' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#121212] block">Sizes</span>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSizeToggle(s)}
                      className={`px-3 py-1 rounded text-xs ${selectedSizes.includes(s) ? 'bg-[#121212] text-white' : 'bg-[#F4F0E8]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
