import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  UserAccount,
  FilterState,
  ActivePage,
  Currency,
  OrderStatus,
  TrackingStep,
  ProductColor
} from '../types';
import { LUXURY_PRODUCTS } from '../data/products';
import { CURRENCY_CONFIGS, PROMO_CODES } from '../data/mockupAsset';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface StoreContextType {
  // Navigation & Routing
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (category: FilterState['category']) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;

  // Products & Filtering
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  appliedPromoCode: string | null;
  promoDiscountPercent: number;
  cartDiscountAmount: number;
  cartTotal: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;

  // Active Product & Details
  activeProduct: Product | null;
  buyNow: (product: Product, size?: string, color?: ProductColor, quantity?: number) => void;
  addReview: (productId: string, review: { author: string; rating: number; title: string; comment: string }) => void;

  // Sizing Modal
  isSizeGuideModalOpen: boolean;
  setIsSizeGuideModalOpen: (open: boolean) => void;

  // Shop filter helpers
  selectedCategory: FilterState['category'];
  setSelectedCategory: (cat: FilterState['category']) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  sortBy: string;
  setSortBy: (sort: any) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // User & Authentication
  user: UserAccount | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserAccount>) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Checkout & Orders
  orders: Order[];
  activeOrderConfirmation: Order | null;
  setActiveOrderConfirmation: (order: Order | null) => void;
  placeOrder: (orderData: {
    deliveryAddress: Address;
    deliveryOption: 'standard' | 'express';
    paymentMethod: 'bank_transfer' | 'card' | 'apple_pay' | 'pay_on_delivery';
    paymentReference: string;
    paymentProofName?: string;
    paymentProofUrl?: string;
    customerEmail: string;
    customerPhone: string;
  }) => Order;
  selectedOrderForTracking: Order | null;
  setSelectedOrderForTracking: (order: Order | null) => void;
  updateOrderPaymentProof: (orderId: string, proofName: string, proofUrl: string) => void;

  // Modals & UI
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isDesignTemplateModalOpen: boolean;
  setIsDesignTemplateModalOpen: (open: boolean) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: ToastState['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  subcategory: '',
  minPrice: 0,
  maxPrice: 1500,
  sizes: [],
  colors: [],
  sort: 'featured',
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: ''
};

const DEMO_USER: UserAccount = {
  id: 'usr_nicdemus_01',
  fullName: 'Nicholas Agbo',
  email: 'ichukwunicholasagbo@gmail.com',
  phone: '+234 803 456 7890',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  joinedDate: 'January 2026',
  tier: 'VIP Client',
  addresses: [
    {
      id: 'addr_1',
      label: 'Main Residence (Ikoyi)',
      fullName: 'Nicholas Agbo',
      street: '24 Bourdillon Road',
      apartment: 'Penthouse 6B, Bella Vista Towers',
      city: 'Ikoyi, Lagos',
      state: 'Lagos State',
      postalCode: '101233',
      country: 'Nigeria',
      phone: '+234 803 456 7890',
      isDefault: true
    },
    {
      id: 'addr_2',
      label: 'Abuja Executive Residence',
      fullName: 'Nicholas Agbo',
      street: '22 Gana Street',
      apartment: 'Villa 4, Diplomatic Zone',
      city: 'Maitama, Abuja',
      state: 'Abuja FCT',
      postalCode: '900271',
      country: 'Nigeria',
      phone: '+234 812 345 6789',
      isDefault: false
    }
  ]
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Currency - Defaults to Nigerian Naira (NGN)
  const [currency, setCurrency] = useState<Currency>('NGN');

  // Filters & Products
  const [products, setProducts] = useState<Product[]>(LUXURY_PRODUCTS);
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTERS);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nicdemus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>('NICDEMUS2026');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist state with persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nicdemus_wishlist');
      return saved ? JSON.parse(saved) : ['nic-cl-01', 'nic-bg-01', 'nic-ac-01'];
    } catch {
      return ['nic-cl-01', 'nic-bg-01', 'nic-ac-01'];
    }
  });

  // User state
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('nicdemus_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Orders state with initial demo luxury order tailored to Nigeria
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nicdemus_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 'ord_sample_01',
        orderNumber: 'NIC-2026-89421',
        date: '2026-08-25T14:30:00Z',
        status: 'in_transit',
        items: [
          {
            id: 'nic-cl-01-M-Oatmeal Beige',
            product: LUXURY_PRODUCTS[0],
            selectedSize: 'M',
            selectedColor: LUXURY_PRODUCTS[0].colors[0],
            quantity: 1
          },
          {
            id: 'nic-lf-01-Standard-Terracotta Vessel',
            product: LUXURY_PRODUCTS[9],
            selectedSize: '380g / 13.4 oz',
            selectedColor: LUXURY_PRODUCTS[9].colors[0],
            quantity: 1
          }
        ],
        subtotal: 765,
        deliveryFee: 0,
        discountAmount: 114.75,
        promoCodeApplied: 'NICDEMUS2026',
        totalAmount: 650.25,
        currency: 'NGN',
        paymentMethod: 'bank_transfer',
        paymentReference: 'NIC-BANK-79941',
        paymentProofName: 'gtbank_nip_transfer_receipt.pdf',
        deliveryAddress: DEMO_USER.addresses[0],
        deliveryOption: 'express',
        trackingNumber: 'NIC-GIGL-992817441-NG',
        estimatedDelivery: 'August 29, 2026',
        customerEmail: 'ichukwunicholasagbo@gmail.com',
        customerPhone: '+234 803 456 7890',
        timeline: [
          {
            status: 'payment_pending',
            title: 'Order Placed & GTBank NIP Wire Received',
            description: 'Direct NUBAN transfer receipt matched with payment ref NIC-BANK-79941.',
            timestamp: 'Aug 25, 2026 - 14:32 WAT',
            completed: true,
            current: false
          },
          {
            status: 'processing',
            title: 'Verified by Nicdemus Lagos Concierge',
            description: 'Payment authenticated by GTBank / NIBSS instant settlement system.',
            timestamp: 'Aug 25, 2026 - 14:45 WAT',
            completed: true,
            current: false
          },
          {
            status: 'quality_check',
            title: 'Victoria Island Atelier Quality Inspection',
            description: 'Garments hand-steamed and boxed in signature velvet dust bags with authenticity certificate.',
            timestamp: 'Aug 26, 2026 - 10:30 WAT',
            completed: true,
            current: false
          },
          {
            status: 'in_transit',
            title: 'Dispatched via Priority VIP Courier',
            description: 'Handed over to Lagos VIP Dispatch. En route to Ikoyi, Lagos.',
            timestamp: 'Aug 27, 2026 - 09:15 WAT',
            completed: true,
            current: true
          },
          {
            status: 'delivered',
            title: 'Scheduled Doorstep Delivery',
            description: 'Signature delivery to Bella Vista Towers, Ikoyi.',
            timestamp: 'Aug 29, 2026 (Estimated)',
            completed: false,
            current: false
          }
        ]
      }
    ];
  });

  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<Order | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);

  // Modals & Toasts
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isDesignTemplateModalOpen, setIsDesignTemplateModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nicdemus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nicdemus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nicdemus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nicdemus_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nicdemus_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast helper
  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Currency formatting helper
  const formatPrice = (usdAmount: number) => {
    const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.USD;
    const converted = usdAmount * config.rate;
    if (currency === 'NGN') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Navigation helpers
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (cat: FilterState['category']) => {
    setFilterState(prev => ({
      ...prev,
      category: cat,
      subcategory: '',
      searchQuery: ''
    }));
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterState(INITIAL_FILTERS);
  };

  // Filtered Products computation
  const filteredProducts = products.filter(p => {
    // Category
    if (filterState.category !== 'all' && p.category !== filterState.category) {
      return false;
    }
    // Subcategory
    if (filterState.subcategory && p.subcategory.toLowerCase() !== filterState.subcategory.toLowerCase()) {
      return false;
    }
    // Price
    if (p.price < filterState.minPrice || p.price > filterState.maxPrice) {
      return false;
    }
    // Sizes
    if (filterState.sizes.length > 0) {
      const hasSize = p.sizes.some(s => filterState.sizes.includes(s));
      if (!hasSize) return false;
    }
    // Colors
    if (filterState.colors.length > 0) {
      const hasColor = p.colors.some(c => filterState.colors.includes(c.name));
      if (!hasColor) return false;
    }
    // In Stock Only
    if (filterState.inStockOnly && p.stock <= 0) {
      return false;
    }
    // On Sale Only
    if (filterState.onSaleOnly && (!p.discountPercent || p.discountPercent <= 0)) {
      return false;
    }
    // Search Query
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchDesc && !matchTags) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (filterState.sort === 'newest') {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    if (filterState.sort === 'price-asc') {
      return a.price - b.price;
    }
    if (filterState.sort === 'price-desc') {
      return b.price - a.price;
    }
    if (filterState.sort === 'rating') {
      return b.rating - a.rating;
    }
    // 'featured'
    return ((b.isTrending ? 2 : 0) + (b.isBestSeller ? 1 : 0)) - ((a.isTrending ? 2 : 0) + (a.isBestSeller ? 1 : 0));
  });

  // Cart operations
  const addToCart = (product: Product, size?: string, color?: ProductColor, quantity = 1, openDrawer = true) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0];
    const itemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" (${chosenSize}) to cart`, 'success');
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const clamped = Math.min(quantity, item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const freeShippingThreshold = 250;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const cartDeliveryFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 25;

  const promoInfo = appliedPromoCode ? PROMO_CODES[appliedPromoCode.toUpperCase()] : null;
  const promoDiscountPercent = promoInfo ? promoInfo.discountPercent : 0;
  const cartDiscountAmount = promoDiscountPercent > 0 ? (cartSubtotal * promoDiscountPercent) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscountAmount + (cart.length > 0 ? cartDeliveryFee : 0));

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a coupon code' };
    const found = PROMO_CODES[clean];
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code' };
    }
    if (cartSubtotal < found.minSubtotal) {
      return {
        success: false,
        message: `Order must be at least $${found.minSubtotal} for code ${clean}`
      };
    }
    setAppliedPromoCode(clean);
    showToast(`Code "${clean}" applied! (${found.description})`, 'success');
    return { success: true, message: `Code applied: ${found.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your luxury wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const activeProduct = products.find(p => p.id === selectedProductId) || products[0] || null;

  const buyNow = (product: Product, size?: string, color?: ProductColor, quantity = 1) => {
    addToCart(product, size, color, quantity, false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addReview = (productId: string, newRev: { author: string; rating: number; title: string; comment: string }) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const rev = {
            id: `rev_${Date.now()}`,
            author: newRev.author || 'Valued Client',
            rating: newRev.rating || 5,
            date: 'Just now',
            title: newRev.title || 'Exceptional Atelier Quality',
            comment: newRev.comment,
            verifiedPurchase: true
          };
          const allRevs = [rev, ...p.reviews];
          const newAvg = Number((allRevs.reduce((acc, r) => acc + r.rating, 0) / allRevs.length).toFixed(1));
          return {
            ...p,
            reviews: allRevs,
            rating: newAvg,
            reviewCount: allRevs.length
          };
        }
        return p;
      })
    );
    showToast('Thank you for submitting your bespoke review', 'success');
  };

  // Filter setters
  const setSelectedCategory = (category: FilterState['category']) => {
    setFilterState(prev => ({ ...prev, category }));
  };

  const setPriceRange = (range: [number, number]) => {
    setFilterState(prev => ({ ...prev, minPrice: range[0], maxPrice: range[1] }));
  };

  const setSelectedColors = (colors: string[]) => {
    setFilterState(prev => ({ ...prev, colors }));
  };

  const setSelectedSizes = (sizes: string[]) => {
    setFilterState(prev => ({ ...prev, sizes }));
  };

  const setSortBy = (sort: any) => {
    setFilterState(prev => ({ ...prev, sort }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilterState(prev => ({ ...prev, searchQuery }));
  };

  // User auth & profile
  const login = (email: string, name = 'Valued Client') => {
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      fullName: name || 'Nicholas Agbo',
      email,
      phone: '+234 803 456 7890',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'August 2026',
      tier: 'VIP Client',
      addresses: [
        {
          id: 'addr_1',
          label: 'Main Residence (Ikoyi)',
          fullName: name || 'Nicholas Agbo',
          street: '24 Bourdillon Road',
          apartment: 'Penthouse 6B, Bella Vista Towers',
          city: 'Ikoyi, Lagos',
          state: 'Lagos State',
          postalCode: '101233',
          country: 'Nigeria',
          phone: '+234 803 456 7890',
          isDefault: true
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.fullName}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    // Clear sensitive user data from localStorage
    localStorage.removeItem('nicdemus_user');
    showToast('You have been signed out successfully', 'info');
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (data: Partial<UserAccount>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
    showToast('Profile updated successfully', 'success');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr_${Date.now()}`
    };
    setUser(prev => {
      if (!prev) return null;
      const updated = addr.isDefault
        ? prev.addresses.map(a => ({ ...a, isDefault: false }))
        : [...prev.addresses];
      return {
        ...prev,
        addresses: [newAddr, ...updated]
      };
    });
    showToast('Address added to your address book', 'success');
  };

  const deleteAddress = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter(a => a.id !== id)
      };
    });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map(a => ({
          ...a,
          isDefault: a.id === id
        }))
      };
    });
    showToast('Default address updated', 'success');
  };

  // Place Order
  const placeOrder = (orderData: {
    deliveryAddress: Address;
    deliveryOption: 'standard' | 'express';
    paymentMethod: 'bank_transfer' | 'card' | 'apple_pay' | 'pay_on_delivery';
    paymentReference: string;
    paymentProofName?: string;
    paymentProofUrl?: string;
    customerEmail: string;
    customerPhone: string;
  }) => {
    const orderId = `ord_${Date.now()}`;
    const orderNumber = `NIC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `NIC-DHL-${Math.floor(100000000 + Math.random() * 900000000)}-EX`;

    const fee = orderData.deliveryOption === 'express' ? Math.max(35, cartDeliveryFee + 10) : cartDeliveryFee;
    const finalTotal = Math.max(0, cartSubtotal - cartDiscountAmount + fee);

    const nowStr = new Date().toISOString();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + (orderData.deliveryOption === 'express' ? 3 : 6));

    const initialTimeline: TrackingStep[] = [
      {
        status: 'payment_pending',
        title: orderData.paymentMethod === 'bank_transfer'
          ? 'Order Placed — Awaiting Direct Bank Transfer Confirmation'
          : 'Payment Authorized',
        description: orderData.paymentMethod === 'bank_transfer'
          ? `Payment Reference: ${orderData.paymentReference}. Please transfer to Nicdemus Store Apex Bank account.`
          : 'Electronic payment received securely.',
        timestamp: 'Just now',
        completed: true,
        current: true
      },
      {
        status: 'processing',
        title: 'Payment Verification & Atelier Dispatch Queue',
        description: 'Our financial concierge confirms wire allocation.',
        timestamp: 'Within 2-4 hours',
        completed: false,
        current: false
      },
      {
        status: 'quality_check',
        title: 'Garment Inspection & Luxury Packaging',
        description: 'Items packed in bespoke boxes with luxury seal.',
        timestamp: 'Pending',
        completed: false,
        current: false
      },
      {
        status: 'in_transit',
        title: 'Dispatched via Premium Global Courier',
        description: `Tracking code: ${trackingNumber}`,
        timestamp: 'Pending',
        completed: false,
        current: false
      },
      {
        status: 'delivered',
        title: 'Estimated Delivery',
        description: `Delivering to ${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city}`,
        timestamp: estDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        completed: false,
        current: false
      }
    ];

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      date: nowStr,
      status: orderData.paymentMethod === 'bank_transfer' ? 'payment_pending' : 'processing',
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: fee,
      discountAmount: cartDiscountAmount,
      promoCodeApplied: appliedPromoCode || undefined,
      totalAmount: finalTotal,
      currency,
      paymentMethod: orderData.paymentMethod,
      paymentReference: orderData.paymentReference,
      paymentProofName: orderData.paymentProofName,
      paymentProofUrl: orderData.paymentProofUrl,
      deliveryAddress: orderData.deliveryAddress,
      deliveryOption: orderData.deliveryOption,
      trackingNumber,
      estimatedDelivery: estDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      timeline: initialTimeline
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderConfirmation(newOrder);
    clearCart();
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderPaymentProof = (orderId: string, proofName: string, proofUrl: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            paymentProofName: proofName,
            paymentProofUrl: proofUrl,
            timeline: ord.timeline.map((step, idx) => {
              if (idx === 0) {
                return {
                  ...step,
                  title: 'Wire Transfer Proof Uploaded',
                  description: `Uploaded receipt "${proofName}". Verification in progress.`,
                  completed: true
                };
              }
              if (idx === 1) {
                return {
                  ...step,
                  current: true
                };
              }
              return step;
            })
          };
        }
        return ord;
      })
    );
    showToast('Payment proof submitted for verification', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        navigateToProduct,
        navigateToCategory,
        currency,
        setCurrency,
        formatPrice,
        products,
        filterState,
        setFilterState,
        resetFilters,
        filteredProducts,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
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
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlisted,
        activeProduct,
        buyNow,
        addReview,
        isSizeGuideModalOpen,
        setIsSizeGuideModalOpen,
        selectedCategory: filterState.category,
        setSelectedCategory,
        priceRange: [filterState.minPrice, filterState.maxPrice] as [number, number],
        setPriceRange,
        selectedColors: filterState.colors,
        setSelectedColors,
        selectedSizes: filterState.sizes,
        setSelectedSizes,
        sortBy: filterState.sort,
        setSortBy,
        searchQuery: filterState.searchQuery,
        setSearchQuery,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        activeOrderConfirmation,
        setActiveOrderConfirmation,
        placeOrder,
        selectedOrderForTracking,
        setSelectedOrderForTracking,
        updateOrderPaymentProof,
        quickViewProduct,
        setQuickViewProduct,
        isDesignTemplateModalOpen,
        setIsDesignTemplateModalOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
