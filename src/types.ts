export type Category = 'all' | 'clothing' | 'shoes' | 'bags' | 'accessories' | 'lifestyle';
export type ProductCategory = 'clothing' | 'shoes' | 'bags' | 'accessories' | 'lifestyle';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  details: string[];
  fabricCare: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  images: string[];
  thumbnail: string;
  tags: string[];
  sku: string;
  specs?: {
    material: string;
    origin: string;
    fit: string;
    care: string;
  };
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${size}-${color}`
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  label: string; // "Home", "Office", etc.
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export type OrderStatus = 'payment_pending' | 'processing' | 'quality_check' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  promoCodeApplied?: string;
  totalAmount: number;
  currency: string;
  paymentMethod: 'bank_transfer' | 'card' | 'apple_pay' | 'pay_on_delivery';
  paymentReference: string;
  paymentProofName?: string;
  paymentProofUrl?: string;
  deliveryAddress: Address;
  deliveryOption: 'standard' | 'express';
  trackingNumber: string;
  estimatedDelivery: string;
  timeline: TrackingStep[];
  customerEmail: string;
  customerPhone: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  joinedDate: string;
  tier: 'VIP Client' | 'Platinum Member' | 'Privé Collective';
}

export interface FilterState {
  category: Category;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  sort: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'account' 
  | 'order-confirmation' 
  | 'lookbook' 
  | 'atelier' 
  | 'bank-guide' 
  | 'concierge';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'NGN';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD base
  format: (amount: number) => string;
}
