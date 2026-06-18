/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';

interface NavbarProps {
  currentView: 'menu' | 'checkout' | 'tracking' | 'receipt';
  onNavigate: (view: 'menu' | 'checkout' | 'tracking' | 'receipt') => void;
  cart: CartItem[];
  cartCount: number;
  onOpenCart: () => void;
  darkTheme?: boolean;
}

export default function Navbar({
  currentView,
  onNavigate,
  cart,
  cartCount,
  onOpenCart,
  darkTheme = false,
}: NavbarProps) {
  return (
    <header
      id="main-header"
      className={`fixed top-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 transition-all duration-300 ${
        darkTheme
          ? 'bg-red-700/90 backdrop-blur-xl border-b border-red-500/40 text-white shadow-lg'
          : 'bg-red-600/90 backdrop-blur-xl border-b border-red-500/40 text-white shadow-sm'
      }`}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-12">
        <button
          onClick={() => onNavigate('menu')}
          className="font-headline-lg text-2xl tracking-tighter hover:opacity-85 transition-opacity font-bold cursor-pointer text-left"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Le Carnivore
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex gap-8">
          <button
            onClick={() => onNavigate('menu')}
            className={`font-label-md text-xs uppercase tracking-[0.2em] transition-all relative pb-1 cursor-pointer font-medium ${
              currentView === 'menu'
                ? 'text-primary font-bold'
                : 'opacity-60 hover:opacity-100 text-on-surface-variant'
            }`}
          >
            Menu
            {currentView === 'menu' && (
              <motion.div
                layoutId="navUnderline"
                className={`absolute bottom-0 left-0 w-full h-[2px] ${
                  darkTheme ? 'bg-[#ff4d00]' : 'bg-black'
                }`}
              />
            )}
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className={`font-label-md text-xs uppercase tracking-[0.2em] transition-all relative pb-1 cursor-pointer font-medium ${
              currentView === 'checkout'
                ? 'text-primary font-bold'
                : 'opacity-60 hover:opacity-100 text-on-surface-variant'
            }`}
          >
            Caisse
            {currentView === 'checkout' && (
              <motion.div
                layoutId="navUnderline"
                className={`absolute bottom-0 left-0 w-full h-[2px] ${
                  darkTheme ? 'bg-[#ff4d00]' : 'bg-black'
                }`}
              />
            )}
          </button>

          <button
            onClick={() => onNavigate('tracking')}
            className={`font-label-md text-xs uppercase tracking-[0.2em] transition-all relative pb-1 cursor-pointer font-medium ${
              currentView === 'tracking'
                ? 'text-primary font-bold'
                : 'opacity-60 hover:opacity-100 text-on-surface-variant'
            }`}
          >
            Suivi En Direct
            {currentView === 'tracking' && (
              <motion.div
                layoutId="navUnderline"
                className={`absolute bottom-0 left-0 w-full h-[2px] ${
                  darkTheme ? 'bg-[#ff4d00]' : 'bg-black'
                }`}
              />
            )}
          </button>
        </nav>
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-6">
        {/* Shopping bag button with dynamic bubble */}
        <button
          onClick={onOpenCart}
          className={`relative p-2.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center ${
            darkTheme ? 'hover:bg-white/5 text-white' : 'text-black'
          }`}
          aria-label="Voir le panier"
        >
          <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full text-white ${
                darkTheme ? 'bg-[#ff4d00]' : 'bg-black'
              }`}
            >
              {cartCount}
            </motion.span>
          )}
        </button>

        {/* User Portrait with quick view / details */}
        <button
          onClick={() => onNavigate('tracking')}
          className={`w-9 h-9 rounded-full overflow-hidden border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            darkTheme ? 'border-white/20' : 'border-[#E5E5E5]'
          }`}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDVQtIioKMk7rjvvZMrinGH1XwNo6SBhvI5YokxRGWfBRAPC2XK9jfUkE0jNFl-mG2cibBmLP5Oo1AT61Wk1w9h-09ia8bxXNG_l3x85vHBGq0BU653j69IleC_ipwYIgmDuTm6KnqiL1uri-i7TXTC8ascJYRv9Ge225hFcSwsI8sYaughscU0skTyOfzRAfF_C2Zx9EB7HP5duH50W-_Qr8_PvNYyMiYnjpGfHP6BtLoiRncgTJcPyKwDott2Ng_xrmyj7A4Ihs"
            alt="Customer avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
