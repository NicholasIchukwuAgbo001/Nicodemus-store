// Reference to the 2026 UI/UX Design System Mockup & Template
import mockupImg from '../assets/images/nicdemus_store_mockup_1787869627493.jpg';

export const STORE_MOCKUP_IMAGE = mockupImg;

export const NIGERIA_CONTACT_DETAILS = {
  mainPhone: "+234 803 900 2026",
  landlineLagos: "+234 1 888 2900",
  landlineAbuja: "+234 9 460 2026",
  whatsappNumber: "+234 803 900 2026",
  whatsappUrl: "https://wa.me/2348039002026?text=Hello%20Nicdemus%20Concierge%2C%20I%20would%20like%20assistance%20with%20my%20order.",
  email: "concierge@nicdemus.ng",
  lagosAtelier: "14B Ozumba Mbadiwe Avenue, Victoria Island, Lagos, Nigeria",
  lagosIkoyiSalon: "24 Bourdillon Road, Ikoyi, Lagos, Nigeria",
  abujaSalon: "22 Gana Street, Maitama, Abuja FCT, Nigeria",
  operatingHours: "Monday – Saturday: 9:00 AM – 8:00 PM WAT (West Africa Time)"
};

export const STORE_BANK_DETAILS = {
  // Primary Nigerian NUBAN Settlement (Instant NIP / USSD)
  bankName: "Guaranty Trust Bank (GTBank Plc)",
  accountName: "Nicdemus Luxury Group Nigeria Ltd",
  accountNumber: "0782910452",
  accountType: "Corporate Current Account (NGN)",
  sortCode: "058152062",
  ussdCode: "*737*2*Amount*0782910452#",
  cbnCbnCompliant: true,
  
  // Secondary Nigerian Bank Option (Zenith Bank)
  secondaryBankName: "Zenith Bank Plc",
  secondaryAccountName: "Nicdemus Luxury Group Ltd",
  secondaryAccountNumber: "1224890311",
  secondaryUssdCode: "*966*Amount*1224890311#",

  // Domiciliary USD/GBP/EUR Account (For Foreign Wire Settlement)
  domiciliaryBank: "GTBank Nigeria (Domiciliary Division)",
  domiciliaryUsdAccount: "0782910469",
  domiciliaryGbpAccount: "0782910476",
  domiciliaryEurAccount: "0782910483",
  swiftBic: "GTBINGLAXXX",
  iban: "NG82 GTBI 0580 0007 8291 04",
  currency: "NGN (₦) / USD ($) / GBP (£) / EUR (€) Multi-Currency Settlement",
  paymentNotes: "Please input your unique Order Reference (e.g. NIC-REF-XXXXXX) into the transfer narration/memo for instant automated verification."
};

export const PROMO_CODES: Record<string, { discountPercent: number; minSubtotal: number; description: string }> = {
  'NICDEMUS2026': { discountPercent: 15, minSubtotal: 100, description: '15% Off 2026 Spring/Summer Collection' },
  'WELCOME10': { discountPercent: 10, minSubtotal: 50, description: '10% Off First Luxury Order' },
  'VIPPRIVILEGE': { discountPercent: 20, minSubtotal: 300, description: '20% Off Orders Above ₦300,000 / $300' },
  'NAIRALUXURY': { discountPercent: 15, minSubtotal: 80, description: '15% Off Instant Nigerian Bank Transfers' }
};

export const CURRENCY_CONFIGS: Record<string, { code: string; symbol: string; rate: number; label: string }> = {
  NGN: { code: 'NGN', symbol: '₦', rate: 1480, label: 'NGN (₦) - Nigeria' },
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' }
};

