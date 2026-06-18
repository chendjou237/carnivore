/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ShoppingCart, Trash2, X, AlertTriangle } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuScreenProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onUpdateCartQuantity: (itemId: string, qty: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  isCartOpen: boolean;
  onToggleCart: (isOpen: boolean) => void;
}

export default function MenuScreen({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
  onCheckout,
  isCartOpen,
  onToggleCart,
}: MenuScreenProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tout le Menu' },
    { id: 'brochettes', label: 'Brochettes' },
    { id: 'poissons', label: 'Poissons' },
    { id: 'boeuf', label: 'Pièces de Bœuf' },
    { id: 'accompagnements', label: 'Accompagnements' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#F5EDE3] pt-24 pb-20 overflow-x-hidden">
      {/* Editorial Headline Hero Banner */}
      <section className="px-6 md:px-16 pt-12 pb-16 max-w-[1440px] mx-auto border-b border-[#E5E5E5]">
        <div className="max-w-4xl space-y-6">
          <span className="font-label-sm text-xs uppercase tracking-[0.3em] text-[#C0282E] block font-semibold">
            Excellence Culinaire Africaine
          </span>
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1A1410] leading-[1.05]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Le Feu, L'Épice &amp;<br />
            L'Exception.
          </h1>
          <p className="font-body-md text-base md:text-lg text-[#4c4546] max-w-xl leading-relaxed">
            Découvrez notre sélection de grillades de prestige, préparées avec passion sur notre brasier traditionnel à flamme vive pour une intensité aromatique inégalée.
          </p>
        </div>
      </section>

      {/* Category selector */}
      <section className="sticky top-[73px] bg-[#F5EDE3]/90 backdrop-blur-md z-45 border-b border-[#E5E5E5] no-print">
        <div className="px-6 md:px-16 py-4 max-w-[1440px] mx-auto flex gap-4 overflow-x-auto scrollbar-none items-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1b1b1b] text-[#f9f9f9] shadow-md font-bold'
                  : 'bg-[#eeeeee]/60 hover:bg-[#eeeeee] text-[#4c4546] font-medium'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="px-6 md:px-16 py-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const cartItem = cart.find((ci) => ci.menuItem.id === item.id);
              const qtyInCart = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  key={item.id}
                  id={`item-card-${item.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] flex flex-col group hover:shadow-xl transition-all duration-300 relative"
                >
                  {/* Item Image with tags */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#E5E5E5]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.isSpicy && (
                        <span className="px-2 py-1 bg-black text-[#F5EDE3] text-[9px] font-label-md uppercase tracking-wider font-extrabold rounded shadow-sm">
                          ÉPICÉ 🔥
                        </span>
                      )}
                      {item.isSpeciality && (
                        <span className="px-2 py-1 bg-[#C0282E] text-white text-[9px] font-label-md uppercase tracking-wider font-extrabold rounded shadow-sm">
                          SPÉCIALITÉ ⭐
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-headline-md text-lg font-bold text-[#1b1b1b] tracking-tight group-hover:text-[#C0282E] transition-colors duration-200">
                          {item.name}
                        </h3>
                        {item.originalPrice ? (
                          <div className="flex flex-col items-end">
                            <span className="font-label-md text-[#C0282E] font-bold text-sm whitespace-nowrap">
                              {item.price.toLocaleString()} FCFA
                            </span>
                            <span className="font-label-sm text-xs line-through opacity-40">
                              {item.originalPrice.toLocaleString()} FCFA
                            </span>
                          </div>
                        ) : (
                          <span className="font-label-md text-[#1b1b1b] font-extrabold text-sm whitespace-nowrap">
                            {item.price.toLocaleString()} FCFA
                          </span>
                        )}
                      </div>

                      <p className="font-body-md text-sm text-[#4c4546] leading-relaxed italic opacity-85">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-[#E5E5E5] flex items-center justify-between">
                      {qtyInCart > 0 ? (
                        <div className="flex items-center gap-2 bg-[#eeeeee] rounded-full p-1 w-full justify-between">
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, qtyInCart - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-black active:scale-90 transition-all cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-label-md font-bold text-xs">
                            {qtyInCart} ajouté{qtyInCart > 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, qtyInCart + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-black active:scale-90 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-full py-2.5 bg-black hover:bg-black/90 active:scale-[0.98] text-[#f9f9f9] text-[11px] font-label-md font-extrabold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Cart Button (If drawer is closed) */}
      {!isCartOpen && totalQuantity > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleCart(true)}
          className="fixed bottom-8 right-8 bg-[#C0282E] hover:bg-[#a82025] text-white p-5 rounded-full shadow-2xl z-40 flex items-center justify-center gap-3 cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="font-label-md font-bold text-sm tracking-wider">
            ({totalQuantity}) • M’y Régalé
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono">
            {cartTotal.toLocaleString()} FCFA
          </span>
        </motion.button>
      )}

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => onToggleCart(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col pointer-events-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-[#1A1410] text-[#F5EDE3]">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-[#ff4d00]" />
                  <h2
                    className="font-bold text-xl tracking-tight"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Votre Festin
                  </h2>
                  <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full font-mono text-white/80">
                    {totalQuantity}
                  </span>
                </div>
                <button
                  onClick={() => onToggleCart(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-70 py-12">
                    <img
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop"
                      alt="Empty plate steak"
                      className="w-24 h-24 rounded-full object-cover grayscale opacity-20 mb-4"
                    />
                    <p className="font-headline-md text-base font-bold text-[#1A1410] mb-2">
                      Le gril est encore vide !
                    </p>
                    <p className="text-sm text-[#4c4546] max-w-xs">
                      Parcourez notre collection de brochettes, poissons et pièces maturées pour commencer à composer votre régal.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs text-[#4c4546] font-label-sm border-b border-[#E5E5E5] pb-2">
                      <span>ARTICLE</span>
                      <span>PRIX DES PORTIONS</span>
                    </div>

                    <div className="space-y-4 divide-y divide-[#E5E5E5]/60">
                      {cart.map((item, idx) => (
                        <div
                          key={item.menuItem.id}
                          className={`flex gap-4 pt-4 ${idx === 0 ? 'pt-0 border-t-0' : ''}`}
                        >
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-12 object-cover rounded bg-[#E5E5E5]"
                          />
                          <div className="flex-1 space-y-1">
                            <h3 className="font-label-md font-bold text-xs text-black">
                              {item.menuItem.name}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-mono">
                              {item.menuItem.price.toLocaleString()} FCFA
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() =>
                                  onUpdateCartQuantity(
                                    item.menuItem.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateCartQuantity(
                                    item.menuItem.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => onRemoveFromCart(item.menuItem.id)}
                                className="ml-auto text-[#C0282E]/70 hover:text-[#C0282E] p-1 cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <span className="font-label-md text-xs text-black font-semibold whitespace-nowrap">
                            {(item.menuItem.price * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={onClearCart}
                      className="text-xs text-[#C0282E] hover:underline font-label-sm uppercase tracking-wide cursor-pointer text-left block"
                    >
                      Vider tout le panier
                    </button>
                  </>
                )}
              </div>

              {/* Drawer Footer summary & actions */}
              <div className="p-6 border-t border-[#E5E5E5] bg-gray-50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-label-sm text-[#4c4546] uppercase">Sous-total</span>
                  <span className="font-label-md text-lg text-black font-extrabold font-mono">
                    {cartTotal.toLocaleString()} FCFA
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 italic">
                  Les taxes locales et frais d’emballage isotherme sont estimés lors de l’étape de livraison.
                </p>

                <div className="pt-2">
                  {cart.length > 0 ? (
                    <button
                      onClick={() => {
                        onToggleCart(false);
                        onCheckout();
                      }}
                      className="w-full py-4 bg-[#1A1410] hover:bg-black text-[#F5EDE3] font-label-md uppercase tracking-[0.15em] text-xs font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Passer à la caisse (Checkout) →
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 bg-gray-300 text-gray-500 font-label-md uppercase tracking-[0.15em] text-xs font-bold rounded cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Sélectionnez des grillades
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
