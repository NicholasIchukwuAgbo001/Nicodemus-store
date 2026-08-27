import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_BANK_DETAILS, NIGERIA_CONTACT_DETAILS } from '../data/mockupAsset';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CreditCard,
  Building2,
  Copy,
  Check,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MessageCircle,
  MapPin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    navigateToCategory,
    setActivePage,
    setIsDesignTemplateModalOpen,
    showToast
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      showToast('Welcome to the Nicdemus Privé Collective. Code WELCOME10 sent!', 'success');
      setNewsletterEmail('');
    }
  };

  const copyBankDetails = () => {
    const text = `Bank: ${STORE_BANK_DETAILS.bankName}\nAccount Name: ${STORE_BANK_DETAILS.accountName}\nAccount Number (NUBAN): ${STORE_BANK_DETAILS.accountNumber}\nSort Code: ${STORE_BANK_DETAILS.sortCode}\nUSSD: ${STORE_BANK_DETAILS.ussdCode}`;
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(true);
    showToast('Nigerian NUBAN bank transfer details copied to clipboard', 'success');
    setTimeout(() => setCopiedBankInfo(false), 3000);
  };

  return (
    <footer className="bg-[#0D0D0D] text-[#ECE7DF] border-t border-[#222222] pt-16 pb-12">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#222222]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Nationwide & Global Courier</h4>
              <p className="text-xs text-zinc-400 mt-1">Same-day VIP Lagos dispatch & fast doorstep delivery across all 36 Nigerian states.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Instant NIP Bank Settlement</h4>
              <p className="text-xs text-zinc-400 mt-1">GTBank & Zenith Bank NUBAN transfers with instant receipt verification & 0% fees.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Atelier Authenticity</h4>
              <p className="text-xs text-zinc-400 mt-1">100% handcrafted European tailoring, certified materials, and numbered editions.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Complimentary Returns</h4>
              <p className="text-xs text-zinc-400 mt-1">30-day effortless return and exchange privileges on unworn items.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Manifesto & Nigerian Bank Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-white">
                NICDEMUS
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold -mt-1">
                Modern Luxury E-Commerce Store • Nigeria & Global
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Founded on principles of architectural precision, fine Italian textiles, and uncompromised craftsmanship. Operating luxury private salons in Lagos, Abuja, Paris, and London.
            </p>

            {/* Direct Bank Account Quick Summary Card */}
            <div className="p-4 rounded-xl bg-[#151515] border border-[#282828] max-w-md space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Official NUBAN Settlement Account
                </span>
                <button
                  onClick={copyBankDetails}
                  className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1 bg-[#222222] px-2 py-0.5 rounded border border-[#333333] transition-colors"
                >
                  {copiedBankInfo ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBankInfo ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-xs text-zinc-300 space-y-1 font-mono">
                <p className="text-[11px] text-zinc-400">{STORE_BANK_DETAILS.bankName}</p>
                <p><span className="text-zinc-500 font-sans text-[11px]">Account Name:</span> {STORE_BANK_DETAILS.accountName}</p>
                <p><span className="text-zinc-500 font-sans text-[11px]">NUBAN Account:</span> <strong className="text-amber-400 font-bold text-sm tracking-wider">{STORE_BANK_DETAILS.accountNumber}</strong></p>
                <p><span className="text-zinc-500 font-sans text-[11px]">Instant USSD:</span> <span className="text-zinc-300">{STORE_BANK_DETAILS.ussdCode}</span></p>
              </div>
            </div>

            {/* WhatsApp & Concierge Quick Trigger */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={NIGERIA_CONTACT_DETAILS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Concierge: {NIGERIA_CONTACT_DETAILS.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Collections</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateToCategory('clothing')} className="hover:text-white transition-colors">
                  Clothing & Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('shoes')} className="hover:text-white transition-colors">
                  Footwear & Boots
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('bags')} className="hover:text-white transition-colors">
                  Handcrafted Bags & Totes
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('accessories')} className="hover:text-white transition-colors">
                  Eyewear & Horology
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('lifestyle')} className="hover:text-white transition-colors">
                  Maison & Home Fragrance
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors">
                  View Full Catalogue
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Nigeria Salons */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Client Concierge</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => setActivePage('account')} className="hover:text-white transition-colors">
                  Track Order & Shipment
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('bank-guide')} className="hover:text-white transition-colors text-amber-300">
                  Nigerian Bank Settlement Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('lookbook')} className="hover:text-white transition-colors">
                  Editorial Lookbook SS26
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('atelier')} className="hover:text-white transition-colors">
                  Atelier & Savoir-Faire
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('concierge')} className="hover:text-white transition-colors">
                  Lagos & Abuja Private Salons
                </button>
              </li>
              <li>
                <button onClick={() => setIsDesignTemplateModalOpen(true)} className="text-amber-400 hover:underline transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>2026 UI/UX Design Mockup</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Nigeria Salons & Care</h4>
            
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>VI Atelier: 14B Ozumba Mbadiwe Ave, Lagos</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Abuja Salon: 22 Gana St, Maitama, Abuja</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-[11px]">{NIGERIA_CONTACT_DETAILS.mainPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono text-[11px]">Lagos: {NIGERIA_CONTACT_DETAILS.landlineLagos}</span>
              </div>
            </div>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing to Nicdemus!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-[#181818] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-colors flex items-center justify-center"
                    title="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© 2026 Nicdemus Store (Nicdemus Luxury Group Nigeria Ltd & Global). All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>CBN Settlement Compliance</span>
        </div>
      </div>
    </footer>
  );
};

