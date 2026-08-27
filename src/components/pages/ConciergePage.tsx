import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NIGERIA_CONTACT_DETAILS } from '../../data/mockupAsset';
import {
  MessageSquare,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Send,
  Building2,
  ShieldCheck,
  Scissors,
  MessageCircle
} from 'lucide-react';

export const ConciergePage: React.FC = () => {
  const { user, showToast } = useStore();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [appointmentName, setAppointmentName] = useState(user?.fullName || '');
  const [appointmentEmail, setAppointmentEmail] = useState(user?.email || '');
  const [appointmentSalon, setAppointmentSalon] = useState('Lagos Victoria Island Atelier - Ozumba Mbadiwe Ave');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-15');
  const [appointmentService, setAppointmentService] = useState('Bespoke Made-to-Measure Tailoring');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

  // Direct Stylist Contact State
  const [contactSubject, setContactSubject] = useState('Garment Sizing Consultation');
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppointmentBooked(true);
    showToast('Salon appointment confirmed! Our Nigeria concierge will contact you.', 'success');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setIsMessageSent(true);
    showToast('Inquiry dispatched to Nicdemus Senior Stylist desk in Lagos', 'success');
    setContactMessage('');
  };

  const FAQS = [
    {
      q: 'How does delivery across Lagos and Nigerian states work?',
      a: 'We offer same-day VIP courier delivery across Lagos (Island & Mainland) and 1–3 business days express dispatch across all 36 Nigerian states (Abuja, Port Harcourt, Ibadan, Kano, Enugu, Asaba, etc.) via GIG Logistics and DHL Nigeria with real-time tracking.'
    },
    {
      q: 'How do I pay via Nigerian Bank Transfer (NIP / USSD)?',
      a: 'Select "Direct Bank Transfer" during checkout to view our verified GTBank & Zenith Bank NUBAN corporate accounts and instant USSD dial codes (*737# / *966#). Once transferred, upload your payment receipt or send it directly to our WhatsApp Concierge for immediate dispatch.'
    },
    {
      q: 'Can I visit a private salon for bespoke fitting in Nigeria?',
      a: 'Yes. You can book an exclusive appointment at our Victoria Island Atelier (Ozumba Mbadiwe) or our private fitting suite in Maitama, Abuja. Our master tailors provide customized measurements and private fabric curation.'
    },
    {
      q: 'What is the return and exchange policy in Nigeria?',
      a: 'We provide a 30-day effortless return and exchange privilege on all unworn garments with atelier seals. Our concierge will schedule a complimentary doorstep courier pickup anywhere in Nigeria.'
    },
    {
      q: 'How can I ensure my Nicdemus piece is authentic?',
      a: 'Every Nicdemus garment, handbag, and timepiece includes an embedded digital NFC authenticity certificate and a hand-numbered European provenance card.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 space-y-16">
      
      {/* Editorial Header */}
      <section className="bg-[#111111] text-white py-20 border-b border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Client Care & Nigeria Private Salon</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Nicdemus Client Concierge
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            From private fittings in Victoria Island & Maitama to nationwide courier logistics and instant Nigerian bank transfers, our dedicated concierge team is at your service.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Available 9AM – 8PM WAT</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>{NIGERIA_CONTACT_DETAILS.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="font-mono">{NIGERIA_CONTACT_DETAILS.mainPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="font-mono">Lagos: {NIGERIA_CONTACT_DETAILS.landlineLagos}</span>
            </div>
          </div>

          {/* WhatsApp Action Button */}
          <div className="pt-2">
            <a
              href={NIGERIA_CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-900/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Directly on WhatsApp: {NIGERIA_CONTACT_DETAILS.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Appointment Booking & Stylist Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Private Salon & Fitting Scheduler */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-3xl p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700">
                Private Consultation
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#121212]">
                Book a Private Salon or Virtual Fitting
              </h2>
              <p className="text-xs text-[#666666]">
                Experience bespoke wardrobe curation with a senior Nicdemus artisan in Lagos, Abuja, or online.
              </p>
            </div>

            {isAppointmentBooked ? (
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-emerald-300 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#121212]">Appointment Requested Successfully</h3>
                <p className="text-xs text-[#555555] max-w-md mx-auto">
                  A personal concierge has been assigned to coordinate your fitting session at <strong>{appointmentSalon}</strong> for <strong>{appointmentDate}</strong>. We will call you on your registered Nigerian phone number.
                </p>
                <button
                  onClick={() => setIsAppointmentBooked(false)}
                  className="px-5 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={appointmentName}
                      onChange={e => setAppointmentName(e.target.value)}
                      placeholder="e.g. Nicholas Agbo"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={appointmentEmail}
                      onChange={e => setAppointmentEmail(e.target.value)}
                      placeholder="e.g. ichukwunicholasagbo@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Salon Location / Mode</label>
                    <select
                      value={appointmentSalon}
                      onChange={e => setAppointmentSalon(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                    >
                      <option>Lagos Victoria Island Atelier - Ozumba Mbadiwe Ave</option>
                      <option>Lagos Ikoyi Private Salon - Bourdillon Road</option>
                      <option>Abuja Maitama VIP Suite - Gana Street</option>
                      <option>London Mayfair Salon - Bond Street</option>
                      <option>Paris Flagship - Rue du Faubourg Saint-Honoré</option>
                      <option>Virtual Video Atelier Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Service Type</label>
                    <select
                      value={appointmentService}
                      onChange={e => setAppointmentService(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                    >
                      <option>Bespoke Made-to-Measure Tailoring</option>
                      <option>Private Traditional & Agbada Tailoring</option>
                      <option>Private Seasonal Wardrobe Styling</option>
                      <option>Tuscan Leather & Footwear Sizing</option>
                      <option>Maison & Lifestyle Objects Curation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#444444] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#444444] mb-1">Special Preferences, Measurements, or Notes</label>
                  <textarea
                    rows={3}
                    value={appointmentNotes}
                    onChange={e => setAppointmentNotes(e.target.value)}
                    placeholder="Provide measurements, specific garment references, or concierge requirements..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Confirm Salon Reservation</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Stylist Messaging & Salons */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Message Card */}
            <div className="bg-[#FAF4ED] border border-[#E8E0D5] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8A7E72] tracking-widest">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-serif font-bold text-[#121212]">
                  Message Lagos Senior Stylist
                </h3>
              </div>

              {isMessageSent ? (
                <div className="p-4 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Inquiry received! Response timeframe: within 30 minutes.</span>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Topic</label>
                    <select
                      value={contactSubject}
                      onChange={e => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DDD5C7] rounded-xl text-xs"
                    >
                      <option>Garment Sizing Consultation</option>
                      <option>GTBank / Zenith NUBAN Transfer Verification</option>
                      <option>Lagos Same-Day & Interstate Dispatch</option>
                      <option>Custom Alterations & Monogramming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#444444] font-semibold mb-1">Your Message</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder="Describe your inquiry or question..."
                      className="w-full px-3 py-2 bg-white border border-[#DDD5C7] rounded-xl text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>

            {/* Global & Nigerian Salons Directory */}
            <div className="bg-white border border-[#E5E0D8] rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#121212] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>Nigeria & Global Salons Directory</span>
              </h4>

              <div className="space-y-3 text-xs text-[#555555]">
                <div className="pb-3 border-b border-[#EFECE6]">
                  <p className="font-bold text-[#121212]">Lagos Flagship Atelier</p>
                  <p>14B Ozumba Mbadiwe Avenue, Victoria Island, Lagos, Nigeria</p>
                  <p className="text-[11px] text-zinc-600 font-mono mt-0.5">Phone: +234 1 888 2900 / +234 803 900 2026</p>
                  <span className="text-[10px] text-amber-800 font-semibold font-mono">Mon – Sat: 09:00 – 20:00 WAT</span>
                </div>

                <div className="pb-3 border-b border-[#EFECE6]">
                  <p className="font-bold text-[#121212]">Abuja Maitama VIP Salon</p>
                  <p>22 Gana Street, Maitama, Abuja FCT, Nigeria</p>
                  <p className="text-[11px] text-zinc-600 font-mono mt-0.5">Phone: +234 9 460 2026 / +234 812 400 9000</p>
                  <span className="text-[10px] text-amber-800 font-semibold font-mono">Mon – Sat: 09:30 – 19:30 WAT</span>
                </div>

                <div>
                  <p className="font-bold text-[#121212]">London Mayfair & Paris Ateliers</p>
                  <p>14 New Bond St, London & 28 Rue du Faubourg Saint-Honoré, Paris</p>
                  <span className="text-[10px] text-amber-800 font-semibold font-mono">Global Shipping & Bespoke Tailoring</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8A7E72] font-semibold">
            Frequently Asked Questions
          </span>
          <h3 className="text-3xl font-serif font-bold text-[#121212]">
            Client Care & Nigeria Logistics FAQ
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#121212] hover:text-amber-800 transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-amber-800" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-[#888888]" />
                )}
              </button>

              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#555555] leading-relaxed border-t border-[#F0ECE6] pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

