import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_BANK_DETAILS } from '../../data/mockupAsset';
import { Address } from '../../types';
import confetti from 'canvas-confetti';
import {
  Building2,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  FileText,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  Tag,
  Lock
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscountAmount,
    appliedPromoCode,
    cartTotal,
    formatPrice,
    placeOrder,
    user,
    setActivePage,
    showToast
  } = useStore();

  // Selected default or custom address
  const defaultAddr = user?.addresses.find(a => a.isDefault) || user?.addresses[0];

  const [email, setEmail] = useState(user?.email || 'ichukwunicholasagbo@gmail.com');
  const [fullName, setFullName] = useState(user?.fullName || 'Nicholas Agbo');
  const [phone, setPhone] = useState(user?.phone || '+234 803 900 2026');
  const [street, setStreet] = useState(defaultAddr?.street || 'Plot 14, Adeola Odeku Street');
  const [apartment, setApartment] = useState(defaultAddr?.apartment || 'Suite 4B, Nicdemus Tower');
  const [city, setCity] = useState(defaultAddr?.city || 'Victoria Island, Lagos');
  const [state, setState] = useState(defaultAddr?.state || 'Lagos State');
  const [postalCode, setPostalCode] = useState(defaultAddr?.postalCode || '101241');
  const [country, setCountry] = useState(defaultAddr?.country || 'Nigeria');

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'card' | 'apple_pay' | 'pay_on_delivery'>('bank_transfer');

  // Generate unique payment reference on load
  const [paymentReference] = useState(`NIC-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const [copiedBankInfo, setCopiedBankInfo] = useState<string | null>(null);

  // Payment proof file upload state
  const [paymentProofFile, setPaymentProofFile] = useState<{ name: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Card mock fields
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif text-[#121212]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#777777]">Please add items before proceeding to checkout.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(label);
    showToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => setCopiedBankInfo(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaymentProofFile({
          name: file.name,
          url: event.target?.result as string
        });
        setIsUploading(false);
        showToast('Payment proof slip attached successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !street || !city || !postalCode) {
      showToast('Please complete all required shipping address fields', 'warning');
      return;
    }

    setIsProcessingOrder(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      const deliveryAddress: Address = {
        id: `addr_order_${Date.now()}`,
        label: 'Order Address',
        fullName,
        street,
        apartment,
        city,
        state,
        postalCode,
        country,
        phone,
        isDefault: false
      };

      placeOrder({
        deliveryAddress,
        deliveryOption,
        paymentMethod,
        paymentReference,
        paymentProofName: paymentProofFile?.name,
        paymentProofUrl: paymentProofFile?.url,
        customerEmail: email,
        customerPhone: phone
      });

      setIsProcessingOrder(false);
    }, 1200);
  };

  const calculatedDeliveryFee = deliveryOption === 'express' ? Math.max(35, cartDeliveryFee + 10) : cartDeliveryFee;
  const finalTotalAmount = Math.max(0, cartSubtotal - cartDiscountAmount + calculatedDeliveryFee);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Checkout Top Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
            Secure Payment & Settlement
          </span>
          <h1 className="text-3xl font-serif text-[#121212] font-semibold mt-1">
            Nicdemus Atelier Checkout
          </h1>
        </div>
        <button
          onClick={() => setActivePage('cart')}
          className="text-xs text-[#555555] hover:text-[#121212] flex items-center gap-2 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        
        {/* Left Column: Details & Payment Methods */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Information */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#121212] text-white text-[10px] flex items-center justify-center font-mono">1</span>
                <span>Customer Contact Information</span>
              </h3>
              {user && (
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
                  {user.tier} Account
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#444444] font-semibold mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Nicholas Agbo"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[#444444] font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#444444] font-semibold mb-1">Phone Number (for Courier SMS dispatch) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+44 20 7946 0912"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#121212] text-white text-[10px] flex items-center justify-center font-mono">2</span>
              <span>Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[#444444] font-semibold mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  placeholder="e.g. 742 Evergreen Luxury Blvd"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[#444444] font-semibold mb-1">Apartment, Suite, Unit</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={e => setApartment(e.target.value)}
                  placeholder="Penthouse 14B"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[#444444] font-semibold mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="London"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[#444444] font-semibold mb-1">State / Region</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="Greater London"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div>
                <label className="block text-[#444444] font-semibold mb-1">Postal Code *</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  placeholder="W1K 4QG"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#444444] font-semibold mb-1">Country / Destination *</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs text-[#121212] focus:outline-none focus:border-[#121212]"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            {/* Delivery Speed Choices */}
            <div className="pt-3 border-t border-[#EFECE6] space-y-2">
              <label className="block text-[#444444] font-semibold text-xs mb-1">Courier Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryOption === 'standard'
                      ? 'border-[#121212] bg-[#FAF8F5] ring-1 ring-[#121212]'
                      : 'border-[#DDD5C7] bg-white hover:border-[#121212]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="text-[#121212]"
                    />
                    <div>
                      <p className="font-semibold text-[#121212]">Complimentary Standard</p>
                      <p className="text-[11px] text-[#777777]">4-6 Business Days</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700">Free</span>
                </label>

                <label
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    deliveryOption === 'express'
                      ? 'border-[#121212] bg-[#FAF8F5] ring-1 ring-[#121212]'
                      : 'border-[#DDD5C7] bg-white hover:border-[#121212]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="text-[#121212]"
                    />
                    <div>
                      <p className="font-semibold text-[#121212]">DHL Priority Air Express</p>
                      <p className="text-[11px] text-[#777777]">2-3 Days Guaranteed</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#121212]">+$35.00</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method & Bank Account Details */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#121212] text-white text-[10px] flex items-center justify-center font-mono">3</span>
                <span>Payment Method</span>
              </h3>
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 256-bit Encrypted
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#121212] bg-[#121212] text-amber-400 shadow-sm'
                    : 'border-[#DDD5C7] bg-[#FAF8F5] text-[#333333] hover:border-[#121212]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-[#121212] bg-[#121212] text-amber-400 shadow-sm'
                    : 'border-[#DDD5C7] bg-[#FAF8F5] text-[#333333] hover:border-[#121212]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#121212] bg-[#121212] text-amber-400 shadow-sm'
                    : 'border-[#DDD5C7] bg-[#FAF8F5] text-[#333333] hover:border-[#121212]'
                }`}
              >
                <span className="text-base font-bold leading-none"></span>
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('pay_on_delivery')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'pay_on_delivery'
                    ? 'border-[#121212] bg-[#121212] text-amber-400 shadow-sm'
                    : 'border-[#DDD5C7] bg-[#FAF8F5] text-[#333333] hover:border-[#121212]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>VIP Concierge POD</span>
              </button>
            </div>

            {/* DIRECT BANK TRANSFER DETAILS DISPLAY */}
            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#121212] text-amber-400 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212]">
                          Guaranty Trust Bank (GTBank) • Official NUBAN
                        </h4>
                        <p className="text-[10px] text-[#706450]">NIBSS Instant Transfer (NIP) • Instant Clearance</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded uppercase">
                      Instant Clearing
                    </span>
                  </div>

                  {/* Bank detail rows with copy buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    <div className="p-3 bg-white rounded-lg border border-[#E5DEC9] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888] block">Primary Bank</span>
                        <span className="font-semibold text-[#121212]">{STORE_BANK_DETAILS.bankName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText(STORE_BANK_DETAILS.bankName, 'Bank Name')}
                        className="p-1.5 hover:bg-[#F3EFEA] rounded text-[#666666]"
                      >
                        {copiedBankInfo === 'Bank Name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#E5DEC9] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888] block">Account Name</span>
                        <span className="font-semibold text-[#121212] truncate max-w-[150px]">{STORE_BANK_DETAILS.accountName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText(STORE_BANK_DETAILS.accountName, 'Account Name')}
                        className="p-1.5 hover:bg-[#F3EFEA] rounded text-[#666666]"
                      >
                        {copiedBankInfo === 'Account Name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#E5DEC9] flex items-center justify-between sm:col-span-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888] block">NUBAN Account Number</span>
                        <span className="text-base font-bold font-mono text-amber-800 tracking-wider">{STORE_BANK_DETAILS.accountNumber}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText(STORE_BANK_DETAILS.accountNumber, 'NUBAN Account Number')}
                        className="px-3 py-1.5 bg-[#121212] text-white rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-[#2A2A2A]"
                      >
                        {copiedBankInfo === 'NUBAN Account Number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedBankInfo === 'NUBAN Account Number' ? 'Copied' : 'Copy NUBAN'}</span>
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#E5DEC9] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888] block">Instant USSD Dial</span>
                        <span className="font-mono font-bold text-amber-700">{STORE_BANK_DETAILS.ussdCode}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText(STORE_BANK_DETAILS.ussdCode, 'USSD Code')}
                        className="p-1.5 hover:bg-[#F3EFEA] rounded text-[#666666]"
                      >
                        {copiedBankInfo === 'USSD Code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-[#E5DEC9] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#888888] block">Zenith Secondary NUBAN</span>
                        <span className="font-mono font-semibold text-[#121212]">1019948271</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText('1019948271', 'Zenith Account')}
                        className="p-1.5 hover:bg-[#F3EFEA] rounded text-[#666666]"
                      >
                        {copiedBankInfo === 'Zenith Account' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                  </div>

                  {/* Payment Reference Code */}
                  <div className="p-3.5 rounded-lg bg-[#121212] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                        Your Unique Payment Reference
                      </span>
                      <span className="font-mono text-sm font-bold text-white tracking-widest">
                        {paymentReference}
                      </span>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Please paste this in your bank transfer narration / remarks.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(paymentReference, 'Payment Reference')}
                      className="px-3 py-1.5 bg-amber-400 text-black rounded text-xs font-bold flex items-center justify-center gap-1 hover:bg-amber-300 transition-colors shrink-0"
                    >
                      {copiedBankInfo === 'Payment Reference' ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBankInfo === 'Payment Reference' ? 'Copied' : 'Copy Reference'}</span>
                    </button>
                  </div>
                </div>

                {/* PAYMENT PROOF UPLOAD FIELD */}
                <div className="p-4 rounded-xl border border-dashed border-[#DDD5C7] bg-[#FAF8F5] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-[#121212] block">
                        Upload Payment Proof / Bank Transfer Slip (Optional)
                      </label>
                      <p className="text-[11px] text-[#777777]">
                        Attach screenshot or receipt PDF for instant concierge verification.
                      </p>
                    </div>
                    {paymentProofFile && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                      </span>
                    )}
                  </div>

                  {paymentProofFile ? (
                    <div className="p-3 bg-white border border-emerald-300 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-emerald-600" />
                        <div>
                          <p className="text-xs font-semibold text-[#121212] max-w-[200px] truncate">{paymentProofFile.name}</p>
                          <p className="text-[10px] text-[#777777]">Ready for automated receipt matching</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPaymentProofFile(null)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border border-[#DDD5C7] rounded-xl p-4 bg-white hover:bg-[#F8F5F0] transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-center">
                      <Upload className="w-6 h-6 text-[#888888]" />
                      <div>
                        <span className="text-xs font-semibold text-[#121212]">Click to upload payment receipt</span>
                        <span className="text-xs text-[#777777] block">PNG, JPG, PDF up to 10MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

              </div>
            )}

            {/* Credit Card mockup form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <label className="block text-[#444444] font-semibold mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Nicholas Agbo"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[#444444] font-semibold mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl pr-10 font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={e => setCardCvc(e.target.value)}
                      placeholder="888"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Apple pay info */}
            {paymentMethod === 'apple_pay' && (
              <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] text-center space-y-2">
                <p className="text-xs font-semibold text-black">Apple Pay Express Authorization</p>
                <p className="text-[11px] text-[#86868B]">Clicking "Place Order" will trigger FaceID / TouchID biometric payment authorization on your Apple device.</p>
              </div>
            )}

            {/* Pay on Delivery info */}
            {paymentMethod === 'pay_on_delivery' && (
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] text-xs text-[#6B5A40] space-y-1">
                <p className="font-semibold text-[#483B28]">VIP Concierge Hand Delivery:</p>
                <p>Payment settled directly with our white-glove courier via point-of-sale terminal or certified bank draft upon delivery.</p>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#F4F0E8] border border-[#E5E0D8] shadow-sm space-y-5 sticky top-28">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212] pb-3 border-b border-[#DDD5C7]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Item list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#E0D9CD] pr-1">
              {cart.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover rounded-lg border border-[#DDD5C7]"
                    />
                    <div>
                      <h4 className="font-semibold text-[#121212] line-clamp-1">{item.product.name}</h4>
                      <p className="text-[11px] text-[#777777]">
                        Size: {item.selectedSize} • {item.selectedColor.name} • Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#121212] shrink-0 font-mono">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#555555] pt-3 border-t border-[#DDD5C7]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#121212] font-mono">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscountAmount > 0 && (
                <div className="flex justify-between text-[#9E5A3F] font-semibold">
                  <span>Discount ({appliedPromoCode})</span>
                  <span className="font-mono">-{formatPrice(cartDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({deliveryOption === 'express' ? 'Priority Express Air' : 'Standard'})</span>
                <span className="font-mono">
                  {calculatedDeliveryFee === 0 ? <strong className="text-emerald-700 uppercase text-[10px]">Complimentary</strong> : formatPrice(calculatedDeliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes & Atelier Packing</span>
                <span className="text-emerald-700 font-semibold uppercase text-[10px]">Included</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-[#DDD5C7] text-base font-bold text-[#121212]">
                <span>Total Due</span>
                <span className="font-mono">{formatPrice(finalTotalAmount)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              id="btn-submit-order"
              type="submit"
              disabled={isProcessingOrder}
              className="w-full py-4 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/15 disabled:opacity-70"
            >
              {isProcessingOrder ? (
                <span>Generating Order Confirmation...</span>
              ) : (
                <>
                  <span>Place Order • {formatPrice(finalTotalAmount)}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>

            {/* Guarantees */}
            <div className="text-[11px] text-[#777777] space-y-2 pt-2 border-t border-[#DDD5C7]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>30-day effortless returns with complimentary courier collection.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Authenticated European luxury guarantee & insured dispatch.</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};
