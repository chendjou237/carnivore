/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MenuItem, CartItem, Order, HistoryItem } from './types';
import { HISTORY_ORDERS } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuScreen from './components/MenuScreen';
import CheckoutScreen from './components/CheckoutScreen';
import TrackingScreen from './components/TrackingScreen';
import ReceiptScreen from './components/ReceiptScreen';

export default function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'checkout' | 'tracking' | 'receipt'>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [selectedHistoricOrder, setSelectedHistoricOrder] = useState<HistoryItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { menuItem: item, quantity: 1 }];
    });
    // Open cart drawer on first item addition
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.menuItem.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((ci) =>
        ci.menuItem.id === itemId ? { ...ci, quantity } : ci
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (view: 'menu' | 'checkout' | 'tracking' | 'receipt') => {
    // Scroll cleanly back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (view !== 'receipt') {
      setSelectedHistoricOrder(null);
    }
  };

  // Order submission
  const handleSubmitOrder = (order: Order) => {
    setActiveOrder(order);
    setCart([]); // Reset custom cart on submission
  };

  // Historic item viewing
  const handleViewHistoricReceipt = (historyId: string) => {
    const historical = HISTORY_ORDERS.find((h) => h.id === historyId);
    if (historical) {
      setSelectedHistoricOrder(historical);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentView('receipt');
    }
  };

  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const isDarkLayout = currentView === 'checkout';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#ff4d00]/30 selection:text-[#ff4d00]">
      {/* Dynamic branding header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        darkTheme={isDarkLayout}
      />

      {/* Screen component switcher */}
      <div className="flex-1">
        {currentView === 'menu' && (
          <MenuScreen
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onClearCart={handleClearCart}
            onCheckout={() => handleNavigate('checkout')}
            isCartOpen={isCartOpen}
            onToggleCart={setIsCartOpen}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            onNavigate={handleNavigate}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {currentView === 'tracking' && (
          <TrackingScreen
            activeOrder={activeOrder}
            onNavigate={handleNavigate}
            onViewHistoricReceipt={handleViewHistoricReceipt}
          />
        )}

        {currentView === 'receipt' && (
          <ReceiptScreen
            activeOrder={activeOrder}
            historicOrder={selectedHistoricOrder}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Corporate branding info block */}
      <Footer darkTheme={isDarkLayout} />
    </div>
  );
}
