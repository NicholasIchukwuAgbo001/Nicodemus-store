import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_BANK_DETAILS, NIGERIA_CONTACT_DETAILS } from '../../data/mockupAsset';
import {
  Building2,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  Clock,
  FileText,
  Upload,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  Globe,
  Smartphone,
  MessageCircle,
  CreditCard
} from 'lucide-react';

export const BankGuidePage: React.FC = () => {
  const { setActivePage, showToast } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard`, 'success');
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const copyAllBankDetails = () => {
    const fullText = `NICDEMUS LUXURY GROUP NIGERIA - OFFICIAL SETTLEMENT BANK ACCOUNTS\n\n1. NAIRA (NGN) NUBAN SETTLEMENT:\nBank: Guaranty Trust Bank (GTBank)\nAccount Name: ${STORE_BANK_DETAILS.accountName}\nNUBAN Account Number: ${STORE_BANK_DETAILS.accountNumber}\nSort Code: ${STORE_BANK_DETAILS.sortCode}\nInstant USSD Code: ${STORE_BANK_DETAILS.ussdCode}\n\n2. ZENITH BANK SECONDARY NUBAN:\nBank: Zenith Bank Plc\nAccount Name: Nicdemus Luxury Group Ltd\nAccount Number: 1019948271\nUSSD: *966*000*1019948271#\n\n3. DOMICILIARY ACCOUNTS:\nUSD Account: 0782910469 (GTBank)\nGBP Account: 0782910476 (GTBank)\nSwift/BIC: ${STORE_BANK_DETAILS.swiftBic}\n\nNote: Please include your Order Reference (e.g. NIC-2026-XXXXX) in the transfer narration/remarks.`;
    navigator.clipboard.writeText(fullText);
    setCopiedKey('all');
    showToast('Complete Nigerian Bank Settlement Dossier copied!', 'success');
    setTimeout(() => setCopiedKey(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 space-y-16">
      
      {/* Header Hero */}
      <section className="bg-[#111111] text-white py-20 border-b border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>NIBSS Instant NIP • GTBank & Zenith NUBAN Transfer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Nigerian Bank Settlement Guide
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Nicdemus offers instant, zero-surcharge corporate bank transfer settlement across all Nigerian banks with automated receipt confirmation and expedited Lagos same-day or nationwide VIP courier dispatch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={copyAllBankDetails}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
            >
              {copiedKey === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'all' ? 'All Nigerian Bank Details Copied' : 'Copy Full Nigerian Bank Dossier'}</span>
            </button>

            <a
              href={NIGERIA_CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider border border-emerald-500 flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Receipt on WhatsApp</span>
            </a>

            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all"
            >
              Explore Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* Main Bank Credentials Card & Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Primary Naira NUBAN Account (GTBank) */}
        <div className="bg-[#181818] border border-[#2D2D2D] rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A2A2A] gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Primary NGN Settlement Account (NUBAN)
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                Guaranty Trust Bank (GTBank)
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant NIP Settlement (2-5 mins)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Account Number */}
            <div className="p-5 rounded-2xl bg-[#222222] border border-[#333333] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400">NUBAN Account Number</span>
                <p className="text-2xl font-mono font-bold text-amber-400 mt-1 tracking-widest">
                  {STORE_BANK_DETAILS.accountNumber}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(STORE_BANK_DETAILS.accountNumber, 'NUBAN Account Number', 'acc_num')}
                className="mt-3 w-full py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-xs font-semibold text-zinc-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedKey === 'acc_num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'acc_num' ? 'Copied' : 'Copy NUBAN'}</span>
              </button>
            </div>

            {/* Account Name */}
            <div className="p-5 rounded-2xl bg-[#222222] border border-[#333333] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400">Beneficiary / Account Name</span>
                <p className="text-sm font-semibold text-white mt-1">
                  {STORE_BANK_DETAILS.accountName}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(STORE_BANK_DETAILS.accountName, 'Beneficiary Name', 'acc_name')}
                className="mt-3 w-full py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-xs font-semibold text-zinc-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedKey === 'acc_name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'acc_name' ? 'Copied' : 'Copy Name'}</span>
              </button>
            </div>

            {/* Instant USSD Code */}
            <div className="p-5 rounded-2xl bg-[#222222] border border-[#333333] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400">Instant GTBank USSD Dial</span>
                <p className="text-base font-mono font-bold text-amber-300 mt-1">
                  {STORE_BANK_DETAILS.ussdCode}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(STORE_BANK_DETAILS.ussdCode, 'USSD Code', 'ussd')}
                className="mt-3 w-full py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-xs font-semibold text-zinc-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedKey === 'ussd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'ussd' ? 'Copied' : 'Copy USSD'}</span>
              </button>
            </div>

            {/* Sort Code / Branch */}
            <div className="p-5 rounded-2xl bg-[#222222] border border-[#333333] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-zinc-400">Sort Code & Branch</span>
                <p className="text-xs font-mono font-bold text-white mt-1">
                  {STORE_BANK_DETAILS.sortCode} • Victoria Island
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(STORE_BANK_DETAILS.sortCode, 'Sort Code', 'sort')}
                className="mt-3 w-full py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-xs font-semibold text-zinc-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedKey === 'sort' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sort' ? 'Copied' : 'Copy Sort Code'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Secondary Accounts: Zenith Bank & Domiciliary FX (USD / GBP / EUR) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Zenith Bank NUBAN */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Secondary NGN Account</span>
                <h3 className="text-xl font-serif font-bold text-[#121212]">Zenith Bank Plc</h3>
              </div>
              <span className="text-xs font-mono bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg">Instant NIP</span>
            </div>
            <div className="space-y-2 text-xs text-[#555555]">
              <p><strong className="text-[#121212]">Account Name:</strong> Nicdemus Luxury Group Ltd</p>
              <p><strong className="text-[#121212]">NUBAN Account:</strong> <span className="font-mono text-base font-bold text-amber-800">1019948271</span></p>
              <p><strong className="text-[#121212]">USSD Code:</strong> <span className="font-mono">*966*000*1019948271#</span></p>
              <p><strong className="text-[#121212]">Branch:</strong> Maitama, Abuja FCT</p>
            </div>
            <button
              onClick={() => copyToClipboard('1019948271', 'Zenith Account Number', 'zenith_acc')}
              className="w-full py-2.5 bg-[#121212] hover:bg-[#2A2A2A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedKey === 'zenith_acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'zenith_acc' ? 'Copied Zenith Account' : 'Copy Zenith Account (1019948271)'}</span>
            </button>
          </div>

          {/* Domiciliary FX Accounts */}
          <div className="bg-white border border-[#E5E0D8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">International FX Wire</span>
                <h3 className="text-xl font-serif font-bold text-[#121212]">Domiciliary Accounts</h3>
              </div>
              <span className="text-xs font-mono bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg">USD / GBP / EUR</span>
            </div>
            <div className="space-y-2 text-xs text-[#555555]">
              <p><strong className="text-[#121212]">USD Domiciliary:</strong> <span className="font-mono font-bold text-zinc-800">0782910469</span> (GTBank)</p>
              <p><strong className="text-[#121212]">GBP Domiciliary:</strong> <span className="font-mono font-bold text-zinc-800">0782910476</span> (GTBank)</p>
              <p><strong className="text-[#121212]">SWIFT / BIC Code:</strong> <span className="font-mono font-bold text-amber-800">{STORE_BANK_DETAILS.swiftBic}</span></p>
              <p><strong className="text-[#121212]">Corporate RC:</strong> RC-1849204 (Corporate Affairs Commission)</p>
            </div>
            <button
              onClick={() => copyToClipboard(`USD: 0782910469 | GBP: 0782910476 | SWIFT: ${STORE_BANK_DETAILS.swiftBic}`, 'Domiciliary Details', 'dom_acc')}
              className="w-full py-2.5 bg-[#121212] hover:bg-[#2A2A2A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedKey === 'dom_acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'dom_acc' ? 'Copied Domiciliary Details' : 'Copy Domiciliary & SWIFT Details'}</span>
            </button>
          </div>

        </div>

        {/* 4-Step Verification Workflow */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
              Step-by-Step Instructions
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#121212]">
              How Nigerian Bank Transfer Settlement Works
            </h3>
            <p className="text-xs text-[#666666]">
              Complete your luxury purchase in 4 easy steps via NIP instant transfer or mobile banking app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#121212] text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                01
              </span>
              <h4 className="text-sm font-bold text-[#121212]">Place Order at Checkout</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Add your chosen pieces to bag and select "Direct Nigerian Bank Transfer" on the checkout page.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#121212] text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                02
              </span>
              <h4 className="text-sm font-bold text-[#121212]">Get Payment Reference</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                An instant Order Reference (e.g. <span className="font-mono font-bold text-black">NIC-2026-XXXXX</span>) will be displayed on screen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#121212] text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                03
              </span>
              <h4 className="text-sm font-bold text-[#121212]">Transfer via App or USSD</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Open your GTBank, Zenith, Access, Kuda, or any Nigerian banking app and transfer the order amount. Include reference in remarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#121212] text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                04
              </span>
              <h4 className="text-sm font-bold text-[#121212]">Upload Receipt / WhatsApp</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Upload your transaction slip on screen or send to our WhatsApp concierge (+234 803 900 2026) for instant VIP packing & dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Bank FAQ Accordion */}
        <div className="p-8 rounded-3xl bg-[#FAF4ED] border border-[#E8E0D5] space-y-6">
          <h3 className="text-2xl font-serif font-bold text-[#121212]">
            Frequently Asked Questions Regarding Nigerian Bank Settlement
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#444444]">
            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-[#E5E0D8]">
              <h5 className="font-bold text-[#121212]">How fast is NIP bank transfer verification?</h5>
              <p className="leading-relaxed">Instant NIP (NIBSS) transfers from Nigerian banks are verified within 2–5 minutes. Your order moves to atelier quality inspection immediately.</p>
            </div>

            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-[#E5E0D8]">
              <h5 className="font-bold text-[#121212]">Are items reserved while I complete my transfer?</h5>
              <p className="leading-relaxed">Yes. Upon completing checkout, your pieces are automatically reserved from our atelier inventory for 24 hours to allow transfer confirmation.</p>
            </div>

            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-[#E5E0D8]">
              <h5 className="font-bold text-[#121212]">Can I pay in US Dollars (USD) or British Pounds (GBP)?</h5>
              <p className="leading-relaxed">Yes. You can wire to our GTBank Domiciliary accounts or switch the currency selector at the top to pay in USD, GBP, or EUR.</p>
            </div>

            <div className="space-y-1.5 p-4 bg-white rounded-xl border border-[#E5E0D8]">
              <h5 className="font-bold text-[#121212]">Can I receive an official invoice with TIN / VAT details?</h5>
              <p className="leading-relaxed">Yes. Every purchase generates a downloadable formal PDF receipt compliant with Nigerian tax and corporate standards.</p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

