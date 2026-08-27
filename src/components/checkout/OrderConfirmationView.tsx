import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_BANK_DETAILS } from '../../data/mockupAsset';
import {
  CheckCircle2,
  Building2,
  Copy,
  Check,
  Upload,
  FileText,
  Truck,
  ArrowRight,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Clock
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const {
    activeOrderConfirmation,
    formatPrice,
    setActivePage,
    setSelectedOrderForTracking,
    updateOrderPaymentProof,
    showToast
  } = useStore();

  const [copiedBankInfo, setCopiedBankInfo] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<{ name: string; url: string } | null>(null);

  if (!activeOrderConfirmation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif text-[#121212]">No active order found</h2>
        <button
          onClick={() => setActivePage('home')}
          className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const order = activeOrderConfirmation;

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(label);
    showToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => setCopiedBankInfo(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setProofFile({ name: file.name, url });
        updateOrderPaymentProof(order.id, file.name, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackInAccount = () => {
    setSelectedOrderForTracking(order);
    setActivePage('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      
      {/* Success Banner */}
      <div className="text-center space-y-4 pb-6 border-b border-[#E5E0D8]">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/10 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
          Order Confirmation & Receipt
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#121212]">
          Thank You For Your Order
        </h1>
        <p className="text-sm text-[#555555] max-w-lg mx-auto">
          We have registered your order <strong className="text-[#121212] font-mono">{order.orderNumber}</strong>. A full confirmation email has been dispatched to <strong>{order.customerEmail}</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <span className="bg-[#FAF6EE] border border-[#E5DEC9] px-3.5 py-1.5 rounded-full text-[#121212] font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Status: <strong>{order.status === 'payment_pending' ? 'Awaiting Bank Wire Verification' : 'Processing in Atelier'}</strong></span>
          </span>
          <span className="bg-[#FAF8F5] border border-[#E0D9CD] px-3.5 py-1.5 rounded-full text-[#666666] font-mono">
            Tracking No: {order.trackingNumber}
          </span>
        </div>
      </div>

      {/* Bank Transfer Payment Instructions Box (if bank transfer chosen) */}
      {order.paymentMethod === 'bank_transfer' && (
        <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#E5DEC9] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#121212] text-amber-400 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                  Nicdemus Store Bank Account Details
                </h3>
                <p className="text-xs text-[#706450]">Please complete your wire transfer to finalize dispatch.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#121212] bg-white px-3 py-1 rounded-lg border border-[#E5DEC9]">
              Total Due: {formatPrice(order.totalAmount)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] block">Bank Name</span>
                <span className="font-semibold text-[#121212]">{STORE_BANK_DETAILS.bankName}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(STORE_BANK_DETAILS.bankName, 'Bank Name')}
                className="p-1 hover:bg-[#F3EFEA] rounded text-[#666666]"
              >
                {copiedBankInfo === 'Bank Name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] block">Account Name</span>
                <span className="font-semibold text-[#121212]">{STORE_BANK_DETAILS.accountName}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(STORE_BANK_DETAILS.accountName, 'Account Name')}
                className="p-1 hover:bg-[#F3EFEA] rounded text-[#666666]"
              >
                {copiedBankInfo === 'Account Name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex items-center justify-between sm:col-span-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] block">Account Number</span>
                <span className="text-sm font-bold font-mono text-[#121212] tracking-wider">{STORE_BANK_DETAILS.accountNumber}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(STORE_BANK_DETAILS.accountNumber, 'Account Number')}
                className="px-3 py-1.5 bg-[#121212] text-white rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-[#2A2A2A]"
              >
                {copiedBankInfo === 'Account Number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBankInfo === 'Account Number' ? 'Copied' : 'Copy Number'}</span>
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] block">Swift / BIC</span>
                <span className="font-mono font-semibold text-[#121212]">{STORE_BANK_DETAILS.swiftBic}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(STORE_BANK_DETAILS.swiftBic, 'Swift/BIC')}
                className="p-1 hover:bg-[#F3EFEA] rounded text-[#666666]"
              >
                {copiedBankInfo === 'Swift/BIC' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E5DEC9] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#888888] block">Payment Reference Code</span>
                <span className="font-mono font-bold text-[#9E5A3F]">{order.paymentReference}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyText(order.paymentReference, 'Payment Reference')}
                className="p-1 hover:bg-[#F3EFEA] rounded text-[#666666]"
              >
                {copiedBankInfo === 'Payment Reference' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          {/* Payment Proof Status or Upload */}
          <div className="pt-2">
            {order.paymentProofName || proofFile ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold block">Payment Slip Uploaded: {proofFile?.name || order.paymentProofName}</span>
                    <span className="text-[11px] text-emerald-700">Under review by Nicdemus Financial Concierge</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-200/60 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Uploaded
                </span>
              </div>
            ) : (
              <div className="p-4 bg-white border border-dashed border-[#DDD5C7] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-[#121212]">Have you completed your bank wire transfer?</p>
                  <p className="text-[11px] text-[#777777]">Attach transfer receipt slip to expedite shipping queue.</p>
                </div>
                <label className="px-4 py-2 bg-[#121212] text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#2A2A2A] flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Receipt Slip</span>
                  <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Order Itemized Summary Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFECE6] gap-2">
          <div>
            <h3 className="text-base font-serif font-bold text-[#121212]">Itemized Atelier Invoice</h3>
            <p className="text-xs text-[#777777]">Estimated Delivery: <strong>{order.estimatedDelivery}</strong></p>
          </div>
          <button
            onClick={() => window.print()}
            className="text-xs text-[#555555] hover:text-[#121212] flex items-center gap-1.5 font-medium self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>
        </div>

        {/* Items */}
        <div className="divide-y divide-[#EFECE6]">
          {order.items.map(item => (
            <div key={item.id} className="py-4 flex items-center justify-between text-xs gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-16 object-cover rounded-lg border border-[#DDD5C7]"
                />
                <div>
                  <h4 className="font-semibold text-[#121212]">{item.product.name}</h4>
                  <p className="text-[11px] text-[#777777]">
                    Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-[#121212] font-mono">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Address & Payment Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EFECE6] text-xs text-[#555555]">
          <div className="space-y-1">
            <span className="font-bold text-[#121212] uppercase tracking-wider text-[10px] block">Shipping Destination</span>
            <p className="text-[#121212] font-medium">{order.deliveryAddress.fullName}</p>
            <p>{order.deliveryAddress.street}, {order.deliveryAddress.apartment}</p>
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}</p>
            <p>{order.deliveryAddress.country}</p>
            <p className="text-[11px] text-[#777777]">{order.deliveryAddress.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-[#121212] uppercase tracking-wider text-[10px] block">Settlement Summary</span>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#9E5A3F]">
                <span>Discount ({order.promoCodeApplied}):</span>
                <span className="font-mono">-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-mono">{order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#EFECE6] font-bold text-sm text-[#121212]">
              <span>Grand Total:</span>
              <span className="font-mono">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => setActivePage('shop')}
          className="w-full sm:w-auto px-6 py-3 border border-[#DDD5C7] text-[#121212] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
        >
          Continue Shopping
        </button>

        <button
          onClick={handleTrackInAccount}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#2A2A2A] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
        >
          <span>Track Order in Customer Account</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

    </div>
  );
};
