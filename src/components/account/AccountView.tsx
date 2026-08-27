import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Address, Order, OrderStatus } from '../../types';
import { STORE_BANK_DETAILS } from '../../data/mockupAsset';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  Truck,
  ExternalLink,
  ShieldCheck,
  Building2,
  Upload,
  FileText,
  Clock,
  Check,
  Copy,
  X,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    user,
    login,
    logout,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    formatPrice,
    selectedOrderForTracking,
    setSelectedOrderForTracking,
    updateOrderPaymentProof,
    navigateToProduct,
    setActivePage,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'payment-methods' | 'prive-tier' | 'profile'>('orders');
  const [copiedBankKey, setCopiedBankKey] = useState<string | null>(null);

  // Measurement Profile State
  const [chestSize, setChestSize] = useState('40R (102 cm)');
  const [waistSize, setWaistSize] = useState('32 in (81 cm)');
  const [shoeSize, setShoeSize] = useState('EU 43 / US 10');
  const [heightFit, setHeightFit] = useState('184 cm (6 ft 0 in)');
  const [collarSize, setCollarSize] = useState('16.0 in (41 cm)');
  const [savedMeasurements, setSavedMeasurements] = useState(false);

  const copyBankDetail = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankKey(key);
    showToast(`${label} copied to clipboard`, 'success');
    setTimeout(() => setCopiedBankKey(null), 3000);
  };

  // Auth Form State (if not logged in)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('ichukwunicholasagbo@gmail.com');
  const [authName, setAuthName] = useState('Nicholas Agbo');
  const [authPassword, setAuthPassword] = useState('••••••••••••');

  // Address Modal State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('Home Residence');
  const [newFullName, setNewFullName] = useState(user?.fullName || 'Nicholas Agbo');
  const [newStreet, setNewStreet] = useState('');
  const [newApartment, setNewApartment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newCountry, setNewCountry] = useState('United Kingdom');
  const [newPhone, setNewPhone] = useState(user?.phone || '+44 20 7946 0912');
  const [newIsDefault, setNewIsDefault] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(authEmail, authName);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPostalCode) {
      showToast('Please fill all required address fields', 'warning');
      return;
    }
    addAddress({
      label: newLabel,
      fullName: newFullName,
      street: newStreet,
      apartment: newApartment,
      city: newCity,
      state: newState,
      postalCode: newPostalCode,
      country: newCountry,
      phone: newPhone,
      isDefault: newIsDefault
    });
    setIsAddAddressOpen(false);
    setNewStreet('');
    setNewApartment('');
    setNewCity('');
    setNewPostalCode('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName,
      phone: editPhone
    });
  };

  // If user is not logged in, show luxury authentication portal
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white border border-[#E5E0D8] rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#121212]">
              NICDEMUS
            </span>
            <h2 className="text-xl font-serif font-semibold text-[#121212]">
              {authMode === 'login' ? 'Client Identification' : 'Create Privé Account'}
            </h2>
            <p className="text-xs text-[#777777]">
              Access bespoke tailoring records, order tracking, and VIP member benefits.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-[#F4F0E8] p-1 rounded-xl border border-[#DDD5C7] text-xs font-semibold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'login' ? 'bg-white text-[#121212] shadow-sm' : 'text-[#777777] hover:text-[#121212]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'register' ? 'bg-white text-[#121212] shadow-sm' : 'text-[#777777] hover:text-[#121212]'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block text-[#444444] font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  placeholder="Nicholas Agbo"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>
            )}

            <div>
              <label className="block text-[#444444] font-semibold mb-1">Email Address</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={e => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-[#444444] font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={e => setAuthPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors shadow-lg shadow-black/10 mt-2"
            >
              {authMode === 'login' ? 'Sign In to Account' : 'Create Account'}
            </button>

            {/* Quick Demo Fill Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => login('ichukwunicholasagbo@gmail.com', 'Nicholas Agbo')}
                className="w-full py-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>⚡ Instant VIP Client Demo Sign-In</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Wishlist products resolution
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header / Profile Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F4F0E8] border border-[#E5E0D8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user.avatar}
            alt={user.fullName}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#121212]">
                {user.fullName}
              </h1>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-[#121212] text-amber-400 font-mono">
                {user.tier}
              </span>
            </div>
            <p className="text-xs text-[#666666] mt-0.5">{user.email} • {user.phone}</p>
            <p className="text-[11px] text-[#888888] mt-1">Client since {user.joinedDate}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-white border border-[#DDD5C7] rounded-xl text-xs font-semibold text-[#555555] hover:text-rose-600 hover:border-rose-200 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#E5E0D8] overflow-x-auto text-xs font-semibold uppercase tracking-wider text-[#777777]">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'orders'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History & Tracking ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'wishlist'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'addresses'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Address Book ({user.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payment-methods')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'payment-methods'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Bank Wire & Settlement</span>
        </button>

        <button
          onClick={() => setActiveTab('prive-tier')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'prive-tier'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Atelier Privé VIP ({user.tier})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-5 border-b-2 transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'profile'
              ? 'border-[#121212] text-[#121212]'
              : 'border-transparent hover:text-[#121212]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Sizing Profile</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-[#E5E0D8] text-center space-y-3">
              <Package className="w-10 h-10 text-[#888888] mx-auto" />
              <h3 className="text-base font-semibold text-[#121212]">No order records yet</h3>
              <p className="text-xs text-[#777777]">Your past order invoices and tracking numbers will appear here.</p>
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            orders.map(ord => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm space-y-5"
              >
                {/* Top Info Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFECE6]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-[#121212]">{ord.orderNumber}</span>
                      <span className="text-xs text-[#888888]">• {new Date(ord.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <p className="text-xs text-[#666666] mt-0.5">
                      Destination: {ord.deliveryAddress.city}, {ord.deliveryAddress.country} • {ord.deliveryOption === 'express' ? 'DHL Express' : 'Standard Delivery'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'in_transit'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'payment_pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#F0ECE4] text-[#121212]'
                      }`}
                    >
                      {ord.status === 'payment_pending'
                        ? 'Payment Pending'
                        : ord.status === 'in_transit'
                        ? 'In Transit'
                        : ord.status === 'delivered'
                        ? 'Delivered'
                        : 'Processing'}
                    </span>

                    <button
                      onClick={() => setSelectedOrderForTracking(ord)}
                      className="px-3.5 py-1.5 bg-[#121212] text-white rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#2A2A2A] transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Live Tracker</span>
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ord.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE7DB]">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded-lg border border-[#DDD5C7]"
                      />
                      <div className="text-xs">
                        <h4 className="font-semibold text-[#121212] line-clamp-1">{item.product.name}</h4>
                        <p className="text-[11px] text-[#777777]">
                          Size {item.selectedSize} • Qty {item.quantity}
                        </p>
                        <p className="font-semibold text-[#121212] font-mono mt-0.5">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Order Details & Payment Reference */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#EFECE6] text-xs text-[#666666]">
                  <div className="space-y-1">
                    <p>
                      Payment: <strong className="text-[#121212] uppercase font-semibold">{ord.paymentMethod.replace('_', ' ')}</strong>
                      {ord.paymentReference && ` (Ref: ${ord.paymentReference})`}
                    </p>
                    {ord.paymentProofName && (
                      <p className="text-emerald-700 flex items-center gap-1 font-medium">
                        <FileText className="w-3.5 h-3.5" /> Receipt Attached: {ord.paymentProofName}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#777777]">Order Total: </span>
                    <span className="text-sm font-bold text-[#121212] font-mono">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SAVED WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-[#E5E0D8] text-center space-y-3">
              <Heart className="w-10 h-10 text-[#888888] mx-auto" />
              <h3 className="text-base font-semibold text-[#121212]">Your wishlist is currently empty</h3>
              <p className="text-xs text-[#777777]">Save pieces you adore while browsing the catalogue.</p>
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map(prod => (
                <div
                  key={prod.id}
                  className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-sm flex flex-col group"
                >
                  <div className="relative aspect-[3/4] bg-[#EFECE6] overflow-hidden">
                    <img
                      src={prod.thumbnail}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      onClick={() => navigateToProduct(prod.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow text-rose-600 flex items-center justify-center hover:bg-white transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold">{prod.brand}</span>
                      <h4
                        onClick={() => navigateToProduct(prod.id)}
                        className="text-xs font-semibold text-[#121212] cursor-pointer hover:underline line-clamp-1"
                      >
                        {prod.name}
                      </h4>
                      <p className="text-xs font-bold text-[#121212] mt-1 font-mono">{formatPrice(prod.price)}</p>
                    </div>

                    <button
                      onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1, true)}
                      className="w-full py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESS BOOK */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-bold text-[#121212]">Saved Delivery Destinations</h3>
            <button
              onClick={() => setIsAddAddressOpen(true)}
              className="px-4 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2A2A2A]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses.map(addr => (
              <div
                key={addr.id}
                className={`p-6 rounded-2xl border transition-all relative ${
                  addr.isDefault
                    ? 'bg-white border-[#121212] ring-1 ring-[#121212] shadow-sm'
                    : 'bg-white border-[#E5E0D8]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#121212]">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] text-[#777777] hover:text-[#121212] underline"
                      >
                        Set Default
                      </button>
                    )}
                    {user.addresses.length > 1 && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-zinc-400 hover:text-rose-600 p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-[#555555] space-y-1">
                  <p className="font-semibold text-[#121212]">{addr.fullName}</p>
                  <p>{addr.street} {addr.apartment ? `, ${addr.apartment}` : ''}</p>
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                  <p className="text-[11px] text-[#888888] pt-1">{addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BANK WIRE & PAYMENT METHODS */}
      {activeTab === 'payment-methods' && (
        <div className="space-y-8">
          {/* Store Bank Settlement Credentials */}
          <div className="bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2A] gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Verified Store Bank Wire Credentials
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1.5">
                  Nicdemus Luxury Group Settlement Account
                </h3>
              </div>
              <button
                onClick={() => {
                  const dossier = `Bank: ${STORE_BANK_DETAILS.bankName}\nAccount Name: ${STORE_BANK_DETAILS.accountName}\nNUBAN Account: ${STORE_BANK_DETAILS.accountNumber}\nSort Code: ${STORE_BANK_DETAILS.sortCode}\nUSSD: ${STORE_BANK_DETAILS.ussdCode}\nSWIFT/BIC: ${STORE_BANK_DETAILS.swiftBic}`;
                  copyBankDetail(dossier, 'Complete Nigerian Bank Settlement Dossier', 'all_wire');
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                {copiedBankKey === 'all_wire' ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBankKey === 'all_wire' ? 'Dossier Copied' : 'Copy All Bank Details'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">NUBAN Account Number</span>
                  <p className="text-amber-400 font-bold text-base tracking-widest mt-1">{STORE_BANK_DETAILS.accountNumber}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.accountNumber, 'NUBAN Account Number', 'acc_num')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">Account Name</span>
                  <p className="text-white font-sans font-semibold text-xs mt-1">{STORE_BANK_DETAILS.accountName}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.accountName, 'Account Name', 'acc_name')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">Instant USSD Code</span>
                  <p className="text-amber-300 font-bold text-xs mt-1">{STORE_BANK_DETAILS.ussdCode}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.ussdCode, 'USSD Code', 'ussd')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">Primary Bank</span>
                  <p className="text-white font-sans text-xs mt-1">{STORE_BANK_DETAILS.bankName}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.bankName, 'Bank Name', 'bank_name')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">Sort Code</span>
                  <p className="text-white font-bold text-xs mt-1">{STORE_BANK_DETAILS.sortCode}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.sortCode, 'Sort Code', 'sort')}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] flex justify-between items-start">
                <div className="truncate">
                  <span className="text-[10px] text-zinc-400 uppercase font-sans font-semibold">SWIFT / BIC</span>
                  <p className="text-white font-bold text-xs mt-1 truncate">{STORE_BANK_DETAILS.swiftBic}</p>
                </div>
                <button
                  onClick={() => copyBankDetail(STORE_BANK_DETAILS.swiftBic, 'SWIFT', 'swift')}
                  className="text-zinc-400 hover:text-white p-1 shrink-0 ml-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Saved Cards on File */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0D8] space-y-4">
            <h4 className="text-base font-serif font-bold text-[#121212]">Saved Payment Cards</h4>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE7DB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-[10px] tracking-widest">
                  VISA
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-[#121212]">Visa Infinite Ending in •••• 4092</p>
                  <p className="text-[11px] text-[#777777]">Expires 11/2028 • Nicholas Agbo</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                Primary Card
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PRIVÉ VIP MEMBERSHIP */}
      {activeTab === 'prive-tier' && (
        <div className="space-y-8">
          <div className="bg-[#121212] text-white p-8 rounded-3xl border border-[#2D2D2D] relative overflow-hidden space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400">
                  Nicdemus Privé Collective
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  VIP Tier: {user.tier}
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 self-start sm:self-auto">
                Member ID: NIC-VIP-9042
              </span>
            </div>

            {/* Progress bar to Platinum */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-zinc-300">
                <span>Current Tier Progress</span>
                <span className="font-mono text-amber-400 font-bold">$3,450 / $5,000 to Platinum Privé</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" style={{ width: '69%' }} />
              </div>
            </div>

            {/* VIP Privileges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-400 font-bold block">Complimentary Tailoring</span>
                <p className="text-zinc-400 text-[11px]">Free made-to-measure alterations on all suits & coats.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-400 font-bold block">Priority Courier</span>
                <p className="text-zinc-400 text-[11px]">Next-day DHL Express dispatch on all international orders.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-400 font-bold block">Private Salon Access</span>
                <p className="text-zinc-400 text-[11px]">Champagne fittings at our Paris, London, & Milan ateliers.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-amber-400 font-bold block">Dedicated Stylist</span>
                <p className="text-zinc-400 text-[11px]">24/7 personal WhatsApp concierge desk.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-serif font-bold text-[#121212]">Profile Credentials</h3>
              <p className="text-xs text-[#777777]">Manage contact credentials for dispatch verification.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#444444] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#444444] mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2.5 bg-[#F0ECE4] border border-[#DDD5C7] rounded-xl text-xs text-[#777777]"
                />
                <p className="text-[10px] text-[#888888] mt-1">Contact financial concierge to modify account email.</p>
              </div>

              <div>
                <label className="block font-semibold text-[#444444] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A]"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Bespoke Tailoring Sizing Profile */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0D8] shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-[#121212]">Atelier Sizing & Measurement Profile</h3>
                {savedMeasurements && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Saved to Atelier
                  </span>
                )}
              </div>
              <p className="text-xs text-[#777777]">Used by our master tailors to pre-adjust garments prior to shipment.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#444444] mb-1">Suit / Chest Size</label>
                <input
                  type="text"
                  value={chestSize}
                  onChange={e => setChestSize(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#444444] mb-1">Trouser Waist</label>
                <input
                  type="text"
                  value={waistSize}
                  onChange={e => setWaistSize(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#444444] mb-1">Footwear Size</label>
                <input
                  type="text"
                  value={shoeSize}
                  onChange={e => setShoeSize(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#444444] mb-1">Collar Circumference</label>
                <input
                  type="text"
                  value={collarSize}
                  onChange={e => setCollarSize(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSavedMeasurements(true);
                showToast('Bespoke tailoring measurements saved to your client file', 'success');
                setTimeout(() => setSavedMeasurements(false), 4000);
              }}
              className="px-6 py-2.5 bg-[#FAF8F5] border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Update Sizing Profile
            </button>
          </div>
        </div>
      )}

      {/* LIVE ORDER TRACKING MODAL */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FAF8F5] border border-[#E5E0D8] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-5 bg-[#F4F0E8] border-b border-[#E8E2D8] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#888888]">Live DHL Concierge Tracking</span>
                <h3 className="text-base font-serif font-bold text-[#121212]">
                  Order {selectedOrderForTracking.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#555555]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Courier metadata pill */}
              <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#888888] block">Tracking Airway Bill</span>
                  <span className="font-mono font-bold text-sm text-[#121212]">{selectedOrderForTracking.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#888888] block">Estimated Signature Delivery</span>
                  <span className="font-bold text-emerald-800">{selectedOrderForTracking.estimatedDelivery}</span>
                </div>
              </div>

              {/* Step by step timeline */}
              <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDD5C7]">
                {selectedOrderForTracking.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        step.completed
                          ? 'bg-[#121212] text-amber-400'
                          : step.current
                          ? 'bg-amber-500 text-black animate-pulse'
                          : 'bg-[#DDD5C7] text-white'
                      }`}
                    >
                      {step.completed ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-xs ${step.current ? 'text-[#121212] font-bold' : 'text-[#333333]'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-[#888888] font-mono">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#666666] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Transfer Proof Upload in Tracker (if applicable) */}
              {selectedOrderForTracking.paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#121212] text-xs">Wire Transfer Verification</span>
                    <span className="font-mono text-[11px] text-[#9E5A3F] font-bold">Ref: {selectedOrderForTracking.paymentReference}</span>
                  </div>
                  {selectedOrderForTracking.paymentProofName ? (
                    <p className="text-emerald-800 text-[11px] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Attached Slip: {selectedOrderForTracking.paymentProofName}
                    </p>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-[#777777]">Need to attach wire payment receipt?</p>
                      <label className="px-3 py-1.5 bg-[#121212] text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 hover:bg-[#2A2A2A]">
                        <Upload className="w-3 h-3" />
                        <span>Upload Slip</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={e => {
                            const f = e.target.files?.[0];
                            if (f) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                updateOrderPaymentProof(selectedOrderForTracking.id, f.name, ev.target?.result as string);
                              };
                              reader.readAsDataURL(f);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="p-4 bg-[#F4F0E8] border-t border-[#E8E2D8] flex justify-end">
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-5 py-2 bg-[#121212] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Close Tracker
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADD ADDRESS MODAL */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-[#E5E0D8] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 bg-[#F4F0E8] border-b border-[#E8E2D8] flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-[#121212]">Add New Shipping Address</h3>
              <button onClick={() => setIsAddAddressOpen(false)} className="p-1.5 rounded-full hover:bg-black/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddressSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Address Label</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="e.g. Summer Villa / Milan Office"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Full Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={e => setNewFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={e => setNewStreet(e.target.value)}
                    placeholder="128 Mercer St"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Apartment / Suite</label>
                  <input
                    type="text"
                    value={newApartment}
                    onChange={e => setNewApartment(e.target.value)}
                    placeholder="Apt 4B"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    placeholder="New York"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">State / Province</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={e => setNewState(e.target.value)}
                    placeholder="NY"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={newPostalCode}
                    onChange={e => setNewPostalCode(e.target.value)}
                    placeholder="10012"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={e => setNewCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="chk-default-addr"
                  checked={newIsDefault}
                  onChange={e => setNewIsDefault(e.target.checked)}
                  className="rounded text-[#121212]"
                />
                <label htmlFor="chk-default-addr" className="text-xs text-[#555555] cursor-pointer">
                  Set as default shipping destination
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE6]">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 border border-[#DDD5C7] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#121212] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
