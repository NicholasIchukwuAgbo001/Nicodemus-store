import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDeliveryFee,
    freeShippingThreshold,
    freeShippingProgress,
    appliedPromoCode,
    promoDiscountPercent,
    cartDiscountAmount,
    cartTotal,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setActivePage,
    navigateToProduct
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E5E0D8] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2D8] bg-[#F4F0E8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#121212]" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-[#121212]">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              id="btn-close-cart-drawer"
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#555555] hover:text-[#121212] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#EFECE6] border-b border-[#E5DEC9] text-xs">
            <div className="flex items-center justify-between text-[#444444] mb-1.5 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} for Complimentary Global Express Delivery`
                    : '🎉 Complimentary Global Express Delivery Unlocked!'}
                </span>
              </div>
              <span className="font-semibold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#DDD6C8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#121212] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F0EBE2] border border-[#DDD5C7] mx-auto flex items-center justify-center text-[#888888]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-[#121212]">Your shopping bag is empty</h4>
                  <p className="text-xs text-[#777777] mt-1">Discover our Spring/Summer 2026 Collection.</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors"
                >
                  Explore Atelier
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#E5E0D8] shadow-sm relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateToProduct(item.product.id);
                    }}
                    className="w-20 h-24 object-cover rounded-lg border border-[#EDE7DB] cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-6">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigateToProduct(item.product.id);
                          }}
                          className="text-xs font-semibold text-[#121212] cursor-pointer hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#777777] mt-0.5">{item.product.brand}</p>
                      
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#555555]">
                        <span className="bg-[#F3EFEA] px-2 py-0.5 rounded border border-[#E5DEC9] font-medium">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-[10px] text-[#666666]">{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3EFEA]">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-[#FAF8F5] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-[#EAE4D8] text-[#555555] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-[#121212] min-w-[20px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-[#EAE4D8] text-[#555555] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-xs font-bold text-[#121212]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F4F0E8] border-t border-[#E8E2D8] space-y-4">
              
              {/* Promo code box */}
              <div>
                {appliedPromoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-semibold">{appliedPromoCode} ({promoDiscountPercent}% OFF applied)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[11px] underline text-amber-800 hover:text-amber-950"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. NICDEMUS2026)"
                      className="flex-1 px-3 py-2 bg-white border border-[#DDD5C7] rounded-xl text-xs text-[#121212] placeholder-zinc-400 focus:outline-none focus:border-[#121212]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold hover:bg-[#2A2A2A] transition-colors uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1 ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Financial Breakdowns */}
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#121212]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#9E5A3F] font-medium">
                    <span>Discount ({appliedPromoCode})</span>
                    <span>-{formatPrice(cartDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (Worldwide Courier)</span>
                  <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-700 uppercase text-[10px] font-bold">Complimentary</strong> : formatPrice(cartDeliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DDD5C7] text-sm font-bold text-[#121212]">
                  <span>Total Amount</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                id="btn-drawer-checkout"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/10"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#777777]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Bank Wire Settlement & Encrypted Card Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
