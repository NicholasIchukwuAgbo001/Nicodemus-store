import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  ShieldCheck,
  Building2,
  Gift
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
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
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#EFECE6] border border-[#DDD5C7] mx-auto flex items-center justify-center text-[#777777]">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h2 className="text-3xl font-serif text-[#121212] font-semibold">Your Shopping Bag is Empty</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            Your selection awaits. Explore our curated collections of luxury tailoring, handcrafted leather bags, footwear, and artisanal maison pieces.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">Nicdemus Atelier</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#121212] font-semibold mt-1">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
        </div>
        <button
          onClick={() => setActivePage('shop')}
          className="text-xs text-[#555555] hover:text-[#121212] flex items-center gap-2 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Free Shipping Banner */}
          <div className="p-4 rounded-2xl bg-[#F0ECE4] border border-[#DDD5C7] text-xs">
            <div className="flex items-center justify-between text-[#333333] mb-2 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Complimentary Global Express Delivery`
                    : '🎉 You have unlocked Complimentary Worldwide Express Courier Delivery!'}
                </span>
              </div>
              <span className="font-bold font-mono">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#DDD6C8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#121212] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#EAE4D8] border-y border-[#EAE4D8]">
            {cart.map(item => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  onClick={() => navigateToProduct(item.product.id)}
                  className="w-28 h-36 object-cover rounded-xl border border-[#E0D9CD] cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold">{item.product.brand}</span>
                        <h3
                          onClick={() => navigateToProduct(item.product.id)}
                          className="text-base font-serif font-semibold text-[#121212] cursor-pointer hover:underline"
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      <span className="text-base font-semibold text-[#121212]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#555555]">
                      <span className="bg-[#EFECE6] px-2.5 py-1 rounded-lg border border-[#DDD5C7] font-medium">
                        Size: {item.selectedSize}
                      </span>
                      <span className="flex items-center gap-1.5 bg-[#EFECE6] px-2.5 py-1 rounded-lg border border-[#DDD5C7]">
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-xs">{item.selectedColor.name}</span>
                      </span>
                      <span className="text-xs text-zinc-400">Unit Price: {formatPrice(item.product.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#555555]">Qty:</span>
                      <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs hover:bg-[#F3EFEA] text-[#555555]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold text-[#121212] min-w-[24px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs hover:bg-[#F3EFEA] text-[#555555]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-[#888888] hover:text-rose-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Complimentary Gift Box option */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0D8] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F4F0E8] text-amber-600 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#121212]">
                  Nicdemus Signature Velvet Gift Packaging
                </h4>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={e => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded text-[#121212] focus:ring-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-[#666666] mt-1">
                Receive your order encased in our handcrafted rigid keepsake box, tied with silk grograin ribbon and embossed seal. (Complimentary)
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#F4F0E8] border border-[#E5E0D8] shadow-sm space-y-5">
            <h3 className="text-base font-semibold uppercase tracking-wider text-[#121212]">
              Order Summary
            </h3>

            {/* Promo Code input */}
            <div>
              {appliedPromoCode ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-700" />
                    <span className="font-semibold">{appliedPromoCode} ({promoDiscountPercent}% OFF applied)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs underline text-amber-800 hover:text-amber-950"
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
                    placeholder="Coupon code (e.g. NICDEMUS2026)"
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
              {promoMsg && (
                <p className={`text-[11px] mt-1.5 ${promoMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {promoMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#555555] pt-2 border-t border-[#DDD5C7]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#121212]">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscountAmount > 0 && (
                <div className="flex justify-between text-[#9E5A3F] font-medium">
                  <span>Promotional Discount</span>
                  <span>-{formatPrice(cartDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Worldwide Shipping</span>
                <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-700 uppercase text-[10px] font-bold">Complimentary</strong> : formatPrice(cartDeliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gift Packaging</span>
                <span className="text-emerald-700 uppercase text-[10px] font-bold">Complimentary</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#DDD5C7] text-base font-bold text-[#121212]">
                <span>Grand Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              id="btn-cart-page-checkout"
              onClick={() => {
                setActivePage('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/10"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bank wire & card guarantees */}
            <div className="pt-2 text-[11px] text-[#777777] space-y-2 border-t border-[#DDD5C7]">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Direct Bank Wire Settlement supported with instant verification.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Encrypted 256-bit TLS transaction security.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
