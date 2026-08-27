import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductPage } from './components/product/ProductPage';
import { CartView } from './components/cart/CartView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderConfirmationView } from './components/checkout/OrderConfirmationView';
import { AccountView } from './components/account/AccountView';
import { LookbookPage } from './components/pages/LookbookPage';
import { AtelierPage } from './components/pages/AtelierPage';
import { BankGuidePage } from './components/pages/BankGuidePage';
import { ConciergePage } from './components/pages/ConciergePage';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { SizeGuideModal } from './components/ui/SizeGuideModal';
import { DesignTemplateModal } from './components/ui/DesignTemplateModal';
import { ToastNotification } from './components/ui/ToastNotification';

const AppContent: React.FC = () => {
  const { activePage, isSizeGuideModalOpen, setIsSizeGuideModalOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-white">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page View Router */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductPage />}
        {activePage === 'cart' && <CartView />}
        {activePage === 'checkout' && <CheckoutView />}
        {activePage === 'order-confirmation' && <OrderConfirmationView />}
        {activePage === 'account' && <AccountView />}
        {activePage === 'lookbook' && <LookbookPage />}
        {activePage === 'atelier' && <AtelierPage />}
        {activePage === 'bank-guide' && <BankGuidePage />}
        {activePage === 'concierge' && <ConciergePage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Slide-out & Modal Layers */}
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal isOpen={isSizeGuideModalOpen} onClose={() => setIsSizeGuideModalOpen(false)} />
      <DesignTemplateModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
