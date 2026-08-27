import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Check, ShoppingBag, Eye, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { SizeGuideModal } from './SizeGuideModal';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    navigateToProduct
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || 'Standard';
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity, true);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    navigateToProduct(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E5E0D8] text-[#121212] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#EBE5DB] bg-[#F4F0E8]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#888888]">Quick Atelier View</span>
            <span className="text-[#CCCCCC]">•</span>
            <span className="text-xs font-medium text-[#555555]">{product.brand}</span>
          </div>
          <button
            id="btn-close-quickview"
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#666666] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Gallery left */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-[#EFECE6] rounded-xl overflow-hidden border border-[#E8E2D6] group">
              <img
                src={product.images[selectedImgIndex] || product.thumbnail}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.discountPercent && (
                <span className="absolute top-3 left-3 bg-[#9E5A3F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.discountPercent}% Off
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImgIndex === idx ? 'border-[#121212] shadow-md scale-105' : 'border-[#E0D9CD] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info right */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-widest text-[#8A7E72] font-semibold">{product.subcategory}</span>
                <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-[#888888]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-serif text-[#121212] mt-1 font-semibold leading-snug">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-semibold text-[#121212]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#999999] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Made to Order'}
                </span>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed mt-4 line-clamp-3">
                {product.description}
              </p>

              {/* Color Picker */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#333333]">Color: <span className="font-normal text-[#666666]">{currentColor.name}</span></span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColorIndex === idx ? 'ring-2 ring-offset-2 ring-[#121212] border-transparent scale-110' : 'border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColorIndex === idx && (
                        <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex === '#F3EFE6' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Picker */}
              {product.sizes.length > 0 && (
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#333333]">Select Size: <span className="font-normal text-[#666666]">{currentSize}</span></span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[11px] underline text-[#777777] hover:text-[#121212] transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          currentSize === sz
                            ? 'bg-[#121212] text-white shadow-sm'
                            : 'bg-white border border-[#DDD5C7] text-[#333333] hover:border-[#121212]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-semibold text-[#333333]">Quantity:</span>
                <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm hover:bg-[#F3EFEA] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold min-w-[28px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-3 py-1 text-sm hover:bg-[#F3EFEA] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#EBE5DB]">
              <div className="flex gap-3">
                <button
                  id="btn-quickview-add-cart"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#121212] hover:bg-[#2A2A2A] text-white py-3.5 px-5 rounded-xl font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • {formatPrice(product.price * quantity)}</span>
                </button>

                <button
                  id="btn-quickview-wishlist"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-[#DDD5C7] bg-white text-[#555555] hover:text-[#121212] hover:border-[#121212]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullPage}
                className="w-full py-2.5 text-xs text-[#555555] hover:text-[#121212] flex items-center justify-center gap-1.5 font-medium transition-colors"
              >
                <span>View Full Atelier Product Page & Care Instructions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
