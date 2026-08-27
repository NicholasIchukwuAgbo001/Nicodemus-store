import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Building2,
  Ruler,
  Check,
  Plus,
  Minus,
  Share2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';

export const ProductPage: React.FC = () => {
  const {
    activeProduct,
    products,
    addToCart,
    buyNow,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    setIsSizeGuideModalOpen,
    setQuickViewProduct,
    navigateToProduct,
    setActivePage,
    addReview,
    showToast
  } = useStore();

  if (!activeProduct) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif text-[#121212]">Product Not Found</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Browse Full Catalogue
        </button>
      </div>
    );
  }

  const p = activeProduct;
  const inWishlist = isWishlisted(p.id);

  const [selectedImage, setSelectedImage] = useState(p.images[0] || p.thumbnail);
  const [selectedSize, setSelectedSize] = useState(p.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(p.colors[0] || { name: 'Default', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'reviews' | 'shipping'>('details');

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isAddingReview, setIsAddingReview] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    addReview(p.id, {
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      verified: true
    });
    setReviewAuthor('');
    setReviewComment('');
    setIsAddingReview(false);
  };

  // Related products from same category or curated
  const relatedProducts = products
    .filter(item => item.id !== p.id && (item.category === p.category || item.isFeatured))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#777777]">
        <button onClick={() => setActivePage('home')} className="hover:text-[#121212]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActivePage('shop')} className="hover:text-[#121212]">Shop</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="capitalize hover:text-[#121212]">{p.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#121212] font-semibold truncate max-w-[200px]">{p.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Multi-Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Stage */}
          <div className="relative aspect-[3/4] bg-[#EFECE6] rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm">
            <img
              src={selectedImage}
              alt={p.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            {p.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#121212] text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
                {p.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(p.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-zinc-700 hover:text-rose-600'
              }`}
              title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {p.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === img
                    ? 'border-[#121212] ring-2 ring-[#121212]/20 scale-105'
                    : 'border-[#DDD5C7] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Angle ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying Controls & Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#8A7E72] font-semibold">
                {p.brand} Atelier
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-[#777777] hover:text-[#121212] flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#121212] mt-1">
              {p.name}
            </h1>
            
            {/* Rating Stars & Stock */}
            <div className="flex items-center gap-4 mt-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-[#121212]">{p.rating}</span>
                <span className="text-xs text-[#777777]">({p.reviewCount} verified reviews)</span>
              </div>
              <span className="text-zinc-300">•</span>
              <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>In Stock ({p.stock} units available)</span>
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold font-mono text-[#121212]">
                {formatPrice(p.price)}
              </span>
              {p.originalPrice && (
                <span className="text-sm text-[#888888] line-through ml-2 font-mono">
                  {formatPrice(p.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-[#706450] bg-[#EFECE6] px-2.5 py-1 rounded-full border border-[#DDD5C7]">
              Duties & Import Taxes Included
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#121212]">Color Palette:</span>
              <span className="text-[#666666]">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {p.colors.map(col => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor.name === col.name
                      ? 'ring-2 ring-[#121212] ring-offset-2 scale-110'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {selectedColor.name === col.name && (
                    <Check className={`w-4 h-4 ${col.hex.toLowerCase() === '#ffffff' || col.hex.toLowerCase() === '#ece7df' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#121212]">Select Size:</span>
              <button
                onClick={() => setIsSizeGuideModalOpen(true)}
                className="text-amber-700 hover:text-amber-900 flex items-center gap-1 font-medium underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Measurements</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {p.sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedSize === sz
                      ? 'bg-[#121212] text-white shadow-sm'
                      : 'bg-white border border-[#DDD5C7] text-[#333333] hover:border-[#121212]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-semibold text-[#121212]">Quantity:</span>
            <div className="flex items-center border border-[#DDD5C7] rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-2 text-xs hover:bg-[#FAF8F5] text-[#555555] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 py-2 text-xs font-bold text-[#121212] min-w-[32px] text-center font-mono">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(p.stock, quantity + 1))}
                className="px-3.5 py-2 text-xs hover:bg-[#FAF8F5] text-[#555555] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              id="btn-add-to-cart-page"
              onClick={() => addToCart(p, selectedSize, selectedColor, quantity, true)}
              className="w-full py-4 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/10"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag • {formatPrice(p.price * quantity)}</span>
            </button>

            <button
              id="btn-buy-now-page"
              onClick={() => buyNow(p, selectedSize, selectedColor, quantity)}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Instant Buy Now (Direct Checkout)</span>
            </button>
          </div>

          {/* Value Assurance Badges */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2.5 text-xs text-[#555555]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Complimentary global express courier on orders above $250.</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Direct Bank Wire Transfer option supported at checkout.</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
              <span>30-day effortless returns with complimentary pickup.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Product Information Tabs */}
      <div className="border-t border-[#E5E0D8] pt-10">
        <div className="flex border-b border-[#E5E0D8] overflow-x-auto text-xs font-semibold uppercase tracking-wider text-[#777777]">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 px-6 border-b-2 transition-all shrink-0 ${
              activeTab === 'details' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            Description & Craftsmanship
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 px-6 border-b-2 transition-all shrink-0 ${
              activeTab === 'specs' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            Specifications & Material
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-4 px-6 border-b-2 transition-all shrink-0 ${
              activeTab === 'care' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            Garment Care
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-6 border-b-2 transition-all shrink-0 ${
              activeTab === 'reviews' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            Client Reviews ({p.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-4 px-6 border-b-2 transition-all shrink-0 ${
              activeTab === 'shipping' ? 'border-[#121212] text-[#121212]' : 'border-transparent hover:text-[#121212]'
            }`}
          >
            Courier & Wire Settlement
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'details' && (
          <div className="py-8 max-w-3xl space-y-4 text-xs text-[#444444] leading-relaxed">
            <p className="text-sm font-serif text-[#121212]">{p.description}</p>
            <p>
              Each piece in the Nicdemus Atelier portfolio is cut and constructed to balance architectural rigidity with fluid mobility. Sourced from generational European fabric mills in Biella and Lyon, this silhouette represents timeless modern elegance tailored for contemporary lifestyles.
            </p>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs">
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#888888]">Material Composition</span>
              <p className="font-semibold text-[#121212]">{p.specs?.material || p.details?.[0] || '100% Certified Luxury European Textile'}</p>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#888888]">Country of Origin</span>
              <p className="font-semibold text-[#121212]">{p.specs?.origin || 'Handcrafted in Italy & France'}</p>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#888888]">Silhouette & Fit</span>
              <p className="font-semibold text-[#121212]">{p.specs?.fit || p.subcategory || 'Contemporary Atelier Cut'}</p>
            </div>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#888888]">Atelier SKU Reference</span>
              <p className="font-mono font-semibold text-[#121212]">{p.sku}</p>
            </div>
          </div>
        )}

        {/* Tab 3: Care */}
        {activeTab === 'care' && (
          <div className="py-8 max-w-2xl text-xs text-[#444444] space-y-3">
            <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl">
              <h4 className="font-bold text-[#121212] mb-1">Recommended Maintenance Instructions:</h4>
              <p>{p.specs?.care || (p.fabricCare ? p.fabricCare.join('. ') : 'Specialist dry clean only. Store on shaped wooden hangers away from direct sunlight.')}</p>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-[#121212]">Verified Client Endorsements</h3>
                <p className="text-xs text-[#777777]">Average Score: {p.rating} / 5.0 across {p.reviews.length} clients</p>
              </div>
              <button
                onClick={() => setIsAddingReview(!isAddingReview)}
                className="px-4 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                {isAddingReview ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* New Review Form */}
            {isAddingReview && (
              <form onSubmit={handleReviewSubmit} className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-4 text-xs shadow-sm">
                <h4 className="font-bold text-[#121212]">Submit Your Client Review</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={e => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      value={reviewRating}
                      onChange={e => setReviewRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                    >
                      <option value={5}>5 Stars - Perfection</option>
                      <option value={4}>4 Stars - Exceeded Expectations</option>
                      <option value={3}>3 Stars - Satisfactory</option>
                      <option value={2}>2 Stars - Needs Improvement</option>
                      <option value={1}>1 Star - Dissatisfied</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#444444] font-semibold mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      placeholder="Describe the fabric feel, drape, fit, and aesthetic..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Publish Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {p.reviews.map(rev => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#121212]">{rev.author}</span>
                      {(rev.verifiedPurchase || (rev as any).verified) && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Verified Purchaser
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#888888] font-mono">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-[#444444] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Shipping & Bank Wire */}
        {activeTab === 'shipping' && (
          <div className="py-8 max-w-3xl space-y-4 text-xs text-[#444444]">
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-3">
              <h4 className="font-bold text-[#121212] uppercase text-xs tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-700" />
                Direct Bank Transfer & Wire Settlement
              </h4>
              <p>
                This item can be purchased using our Direct Bank Wire Settlement method during checkout. You will be provided with our official Apex International account credentials and a unique payment reference for instant matching.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Complete the Look / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E5E0D8] pt-14 pb-16 md:pb-0 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">Atelier Curation</span>
              <h3 className="text-2xl font-serif font-bold text-[#121212]">Complete The Silhouette</h3>
            </div>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs text-[#555555] hover:text-[#121212] font-medium"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-sm flex flex-col group"
              >
                <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    onClick={() => navigateToProduct(item.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                  <button
                    onClick={() => setQuickViewProduct(item)}
                    className="absolute bottom-3 inset-x-3 py-2 bg-white/95 backdrop-blur-md rounded-xl text-xs font-semibold text-[#121212] shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-center"
                  >
                    Quick View
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold">{item.brand}</span>
                    <h4
                      onClick={() => navigateToProduct(item.id)}
                      className="text-xs font-semibold text-[#121212] cursor-pointer hover:underline line-clamp-1"
                    >
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-[#121212] mt-1 font-mono">{formatPrice(item.price)}</p>
                  </div>

                  <button
                    onClick={() => addToCart(item, item.sizes[0], item.colors[0], 1, true)}
                    className="w-full py-2 bg-[#FAF8F5] border border-[#DDD5C7] text-[#121212] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#121212] hover:text-white transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed md:hidden bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E5E0D8] p-3 z-40 flex items-center gap-3 shadow-2xl safe-area-pb">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[#777777] truncate">{p.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-mono text-[#121212]">{formatPrice(p.price * quantity)}</span>
            <span className="text-[10px] uppercase font-semibold text-[#8C8275] bg-[#F4F0E8] px-1.5 py-0.5 rounded">
              Size {selectedSize}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(p, selectedSize, selectedColor, quantity, true)}
            className="px-4 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
          <button
            onClick={() => buyNow(p, selectedSize, selectedColor, quantity)}
            className="px-3.5 py-2.5 bg-amber-400 text-black rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-md active:scale-95 transition-transform"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy</span>
          </button>
        </div>
      </div>

    </div>
  );
};
