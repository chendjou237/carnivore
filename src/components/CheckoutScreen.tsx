/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Truck,
  CreditCard,
  DollarSign,
  Info,
  ArrowRight,
  CheckCircle,
  Phone,
  ArrowLeft,
  X,
} from 'lucide-react';
import { CartItem, ServiceMode, PaymentMethod, Order } from '../types';
import EmberBackground from './EmberBackground';

interface CheckoutScreenProps {
  cart: CartItem[];
  onNavigate: (view: 'menu' | 'checkout' | 'tracking' | 'receipt') => void;
  onSubmitOrder: (order: Order) => void;
}

export default function CheckoutScreen({
  cart,
  onNavigate,
  onSubmitOrder,
}: CheckoutScreenProps) {
  const [serviceMode, setServiceMode] = useState<ServiceMode>('dine_in');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange');

  // Input states
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('Marc');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [mtnRefCode, setMtnRefCode] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  // Simulation states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);

  // Cooking/Gourmet options for items
  const [cookingLevel, setCookingLevel] = useState<string>('Saignante');
  const [sauceChoice, setSauceChoice] = useState<string>('Chimichurri');

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const deliveryFee = serviceMode === 'delivery' ? 1500 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckoutSubmit = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Create a simulated order
      const newOrder: Order = {
        id: `LC-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: customerName || 'Marc',
        phoneNumber: phoneNumber || '+237 680-XX-XX-XX',
        deliveryAddress: serviceMode === 'delivery' ? deliveryAddress || 'Bastos, Yaoundé' : undefined,
        serviceMode,
        paymentMethod,
        paymentLabel:
          paymentMethod === 'orange'
            ? 'Orange Money'
            : paymentMethod === 'mtn'
            ? 'MTN MoMo'
            : paymentMethod === 'card'
            ? 'Carte Bancaire'
            : 'Espèces',
        transactionId: `TXN-${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`,
        items: [...cart],
        subtotal,
        tax,
        total,
        status: 'received',
        estimatedArrival: serviceMode === 'delivery' ? '13:20 - 13:35' : 'Sur Place (~20 mins)',
        driverName: 'Moussa Diouf',
        createdAt: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setGeneratedOrder(newOrder);
      onSubmitOrder(newOrder);
      setShowSuccessModal(true);
    }, 3000); // 3 seconds of immersive ember spinning processing animation
  };

  return (
    <div className="relative min-h-screen bg-[#1A1410] text-white pt-28 pb-20 overflow-hidden">
      {/* Background with elegant canvas charcoal burning simulation */}
      <EmberBackground />

      <main className="relative z-10 px-6 md:px-16 max-w-[1440px] mx-auto">
        {/* Navigation context bar */}
        <section className="mb-10 flex justify-between items-center no-print">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-2 font-label-md text-xs uppercase tracking-widest text-[#F5EDE3]/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au menu
          </button>
          <span className="text-[10px] uppercase font-label-sm tracking-[0.2em] text-[#ff4d00] font-bold">
            Paiement Sécurisé Mobile Money / Espèces
          </span>
        </section>

        {/* Layout Column Splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Shipping details and Mode selects (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Service Mode */}
            <section className="space-y-6">
              <h2 className="font-headline-md text-xl md:text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                1. Mode de service
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {/* Dine In */}
                <label className="cursor-pointer group relative">
                  <input
                    type="radio"
                    name="service_mode"
                    checked={serviceMode === 'dine_in'}
                    onChange={() => setServiceMode('dine_in')}
                    className="sr-only"
                  />
                  <div
                    className={`p-6 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center ${
                      serviceMode === 'dine_in'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10 shadow-[0_0_20px_rgba(255,77,0,0.25)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Utensils className={`w-8 h-8 ${serviceMode === 'dine_in' ? 'text-[#ff4d00]' : 'text-white/60'}`} />
                    <span className="font-label-md text-xs uppercase tracking-wider font-extrabold block">
                      Sur Place
                    </span>
                  </div>
                </label>

                {/* Delivery */}
                <label className="cursor-pointer group relative">
                  <input
                    type="radio"
                    name="service_mode"
                    checked={serviceMode === 'delivery'}
                    onChange={() => setServiceMode('delivery')}
                    className="sr-only"
                  />
                  <div
                    className={`p-6 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center ${
                      serviceMode === 'delivery'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10 shadow-[0_0_20px_rgba(255,77,0,0.25)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Truck className={`w-8 h-8 ${serviceMode === 'delivery' ? 'text-[#ff4d00]' : 'text-white/60'}`} />
                    <span className="font-label-md text-xs uppercase tracking-wider font-extrabold block">
                      Livraison
                    </span>
                  </div>
                </label>
              </div>
            </section>

            {/* Delivery address precision section (if Delivery selected) */}
            <AnimatePresence>
              {serviceMode === 'delivery' && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="font-headline-md text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Détails de la livraison
                    </h3>
                    <span className="px-3 py-1 bg-[#ff4d00]/15 border border-[#ff4d00] text-[#ff4d00] text-[10px] font-label-md uppercase tracking-wider rounded font-extrabold">
                      Uniquement disponible à Yaoundé
                    </span>
                  </div>

                  <div className="p-8 bg-white/3 border border-white/10 rounded-xl space-y-6">
                    <div>
                      <label className="block font-label-sm text-[10px] uppercase tracking-wider text-white/60 mb-2">
                        Précision de l’adresse de livraison
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white focus:ring-0 transition-all outline-none text-white font-body-md text-sm"
                        placeholder="Quartier, point de repère, route de Bastos, numéro de villa..."
                      />
                    </div>
                    <div>
                      <label className="block font-label-sm text-[10px] uppercase tracking-wider text-white/60 mb-2">
                        Votre Nom
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white focus:ring-0 transition-all outline-none text-white font-body-md text-sm"
                        placeholder="Marc..."
                      />
                    </div>

                    <div className="flex items-start gap-3 text-white/40">
                      <Info className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5" />
                      <p className="text-xs italic leading-relaxed">
                        Nos coursiers opèrent exclusivement dans la zone urbaine de Yaoundé (Bastos, Tsinga, Golfe, Omnisports). Délais de 30 à 45 minutes garantis sous emballage thermique.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* 2. Payment Method Selector */}
            <section className="space-y-6">
              <h2 className="font-headline-md text-xl md:text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                2. Mode de paiement
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Orange Money */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'orange'}
                    onChange={() => setPaymentMethod('orange')}
                    className="sr-only"
                  />
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      paymentMethod === 'orange'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10 shadow-[0_0_20px_rgba(255,102,0,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#FF6600] flex items-center justify-center rounded shrink-0">
                      <span className="font-bold text-white text-[10px] font-mono tracking-tighter">ORANGE</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs uppercase tracking-wide font-extrabold text-white">
                        Orange Money
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">Push Notification</span>
                    </div>
                  </div>
                </label>

                {/* MTN MoMo */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'mtn'}
                    onChange={() => setPaymentMethod('mtn')}
                    className="sr-only"
                  />
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      paymentMethod === 'mtn'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10 shadow-[0_0_20px_rgba(255,204,0,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#FFCC00] flex items-center justify-center rounded shrink-0">
                      <span className="font-extrabold text-black text-[10px] font-mono tracking-tighter">MTN</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs uppercase tracking-wide font-bold text-white">
                        MTN MoMo
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">Référence Directe</span>
                    </div>
                  </div>
                </label>

                {/* Card */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      paymentMethod === 'card'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10 shadow-[0_0_20px_rgba(255,77,0,0.15)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white/15 flex items-center justify-center rounded shrink-0 text-[#ff4d00]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs uppercase tracking-wide font-bold text-white">
                        Carte Bancaire
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">Visa, Mastercard</span>
                    </div>
                  </div>
                </label>

                {/* Cash */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="sr-only"
                  />
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      paymentMethod === 'cash'
                        ? 'border-[#ff4d00] bg-[#ff4d00]/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white/15 flex items-center justify-center rounded shrink-0 text-[#ff4d00]">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs uppercase tracking-wide font-bold text-white">
                        Espèces / Cash
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">Paiement au comptoir</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Dynamic input fields based on payment state */}
              <div className="bg-white/3 border border-white/5 p-6 rounded-xl relative overflow-hidden">
                {paymentMethod === 'orange' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-white/70 text-xs font-label-sm leading-relaxed">
                      Saisissez votre numéro Orange Money. Vous recevrez instantanément une notification Push de confirmation de saisie de votre code secret pour valider le débit de <strong className="text-[#ff4d00]">{total.toLocaleString()} FCFA</strong>.
                    </p>
                    <div>
                      <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                        Numéro de téléphone Orange Money
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white/5 rounded-lg border border-white/10 pl-10 pr-4 py-3 focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all outline-none font-mono text-base tracking-widest text-white"
                          placeholder="6 9X XX XX XX"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'mtn' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                          Numéro de téléphone MoMo
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white/5 rounded-lg border border-white/10 px-4 py-3 focus:border-[#ff4d00] focus:ring-0 transition-all font-mono text-sm"
                          placeholder="6 7X XX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                          Code/ID de validation transaction
                        </label>
                        <input
                          type="text"
                          value={mtnRefCode}
                          onChange={(e) => setMtnRefCode(e.target.value)}
                          className="w-full bg-white/5 rounded-lg border border-white/10 px-4 py-3 focus:border-[#ff4d00] focus:ring-0 transition-all font-mono text-sm text-[#FFCC00] font-bold"
                          placeholder="REF-89XXXX"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div>
                      <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                        Nom inscrit sur la carte
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white/5 rounded-lg border border-white/10 px-4 py-3 focus:border-[#ff4d00] focus:ring-0 transition-all text-xs font-mono"
                        placeholder="MARC DUPONT"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white/5 rounded-lg border border-white/10 px-4 py-3 focus:border-[#ff4d00] focus:ring-0 transition-all text-xs font-mono tracking-widest"
                          placeholder="4000 1234 5678 9010"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-label-sm uppercase tracking-wider text-white/60 mb-2">
                          CVC
                        </label>
                        <input
                          type="password"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          maxLength={3}
                          className="w-full bg-white/5 rounded-lg border border-white/10 px-4 py-3 focus:border-[#ff4d00] focus:ring-0 transition-all text-xs text-center font-mono"
                          placeholder="***"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="p-4 border-l-4 border-[#ff4d00] bg-white/5 text-white/90 text-xs font-body-md flex items-start gap-3 animate-in fade-in duration-300">
                    <Info className="w-4 h-4 stroke-[2] shrink-0 text-[#ff4d00]" />
                    <p>
                      Vous réglerez votre commande directement à la caisse du restaurant lors de votre passage ou en espèces au livreur lors de la livraison. S’il vous plaît, préparez la monnaie si possible.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: Order Summary checklist column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 bg-white/4 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-xl">
                {/* Glowing ember halo */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#ff4d00]/10 blur-[90px] rounded-full pointer-events-none" />

                <h3 className="font-headline-md text-xl font-bold tracking-tight mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Votre Commande
                </h3>

                {/* Items checklist */}
                <div className="space-y-6 max-h-[250px] overflow-y-auto pr-2 divide-y divide-white/5 scrollbar-thin">
                  {cart.map((item, index) => (
                    <div key={item.menuItem.id} className={`flex justify-between items-start pt-4 first:pt-0`}>
                      <div className="space-y-1 pr-4">
                        <p className="font-label-md text-xs text-white uppercase tracking-wider">
                          {item.quantity}x {item.menuItem.name}
                        </p>
                        {item.menuItem.category === 'boeuf' && (
                          <div className="flex gap-2 text-[10px] text-white/50 italic">
                            <span>Cuisson:</span>
                            <select
                              value={cookingLevel}
                              onChange={(e) => setCookingLevel(e.target.value)}
                              className="bg-transparent border-none p-0 focus:ring-0 text-white/70 italic cursor-pointer"
                            >
                              <option value="Bleu">Bleu</option>
                              <option value="Saignante">Saignante</option>
                              <option value="À Point">À Point</option>
                              <option value="Bien Cuit">Bien Cuit</option>
                            </select>
                            <span>• Sauce:</span>
                            <select
                              value={sauceChoice}
                              onChange={(e) => setSauceChoice(e.target.value)}
                              className="bg-transparent border-none p-0 focus:ring-0 text-white/70 italic cursor-pointer"
                            >
                              <option value="Chimichurri">Chimichurri</option>
                              <option value="Poivre Sauvage">Poivre de Penja</option>
                              <option value="Yaji Spicy">Yaji BBQ</option>
                            </select>
                          </div>
                        )}
                        {item.menuItem.category === 'accompagnements' && (
                          <p className="text-[10px] text-white/40">Portion généreuse et assaisonnée</p>
                        )}
                        {item.menuItem.category === 'poissons' && (
                          <p className="text-[10px] text-[#ff4d00]">Mariné 24h &amp; Braisé</p>
                        )}
                      </div>
                      <span className="font-label-md text-xs text-white/90">
                        {(item.menuItem.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider bar */}
                <div className="border-t border-white/5 my-6" />

                {/* Calculations info */}
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-white/50">
                    <span className="font-label-sm uppercase tracking-wider">Sous-total</span>
                    <span className="font-mono">{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/50">
                    <span className="font-label-sm uppercase tracking-wider">TVA locale (18%)</span>
                    <span className="font-mono">{tax.toLocaleString()} FCFA</span>
                  </div>
                  {serviceMode === 'delivery' && (
                    <div className="flex justify-between text-xs text-[#ff4d00]/90">
                      <span className="font-label-sm uppercase tracking-wider">Frais de livraison</span>
                      <span className="font-mono">{deliveryFee.toLocaleString()} FCFA</span>
                    </div>
                  )}

                  <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-4 mt-4">
                    <span className="font-headline-md text-sm uppercase tracking-widest text-[#F5EDE3]">Total</span>
                    <span className="text-2xl font-bold font-mono text-[#ff4d00]">
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                {/* Confirmer Payment CTA */}
                <button
                  onClick={handleCheckoutSubmit}
                  disabled={cart.length === 0}
                  className="w-full mt-8 py-5 bg-white text-black hover:bg-[#ff4d00] hover:text-white transition-all font-label-md text-xs uppercase tracking-[0.2em] font-extrabold flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer shadow-lg"
                >
                  Confirmer le paiement <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-white/30 font-label-sm mt-4">
                  🔒 Paiement crypté SSL 256 bits • Serveur bancaire sécurisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal Container */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop dark gloss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1A1410]/95 backdrop-blur-sm pointer-events-auto"
            />

            {/* Content box popup */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-[#1A1410] border border-white/10 p-8 md:p-12 max-w-lg w-full rounded-xl text-center space-y-6 max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-[#ff4d00]/15 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,77,0,0.2)]">
                <CheckCircle className="w-8 h-8 text-[#ff4d00]" />
              </div>

              <div className="space-y-2">
                <h2
                  className="font-headline-lg text-2xl md:text-3xl tracking-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Félicitations !
                </h2>
                <p className="font-body-md text-sm text-[#F5EDE3]">
                  Votre commande a été enregistrée avec succès.
                </p>
                <p className="text-white/50 text-xs italic">
                  Un conseiller de clinique gastronomique ou coursier culinaire va vous contacter sous peu sur votre téléphone portable pour l’expédition.
                </p>
              </div>

              {/* Order quick recap */}
              {generatedOrder && (
                <div className="text-left bg-white/3 border border-white/10 rounded-lg p-4 font-mono text-[11px] text-white/80 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/40">COMMANDE:</span>
                    <strong className="text-[#ff4d00]">{generatedOrder.id}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">MODE DE SERVICE:</span>
                    <span>{generatedOrder.serviceMode === 'delivery' ? 'Livraison Yaoundé' : 'Sur Place'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">METHODE DE PAIEMENT:</span>
                    <span>{generatedOrder.paymentLabel}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                    <span className="text-white/40">TOTAL PAYÉ:</span>
                    <strong className="text-white">{generatedOrder.total.toLocaleString()} FCFA</strong>
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigate('tracking');
                  }}
                  className="block w-full py-4 bg-white text-black hover:bg-[#ff4d00] hover:text-white transition-all font-label-md text-xs uppercase tracking-widest font-extrabold text-center rounded cursor-pointer"
                >
                  SUIVRE MA COMMANDE EN DIRECT
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigate('menu');
                  }}
                  className="block w-full text-center text-xs underline text-white/60 hover:text-white py-2 cursor-pointer"
                >
                  Retourner au menu principal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Loading Overlay spinner when processing */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1410]/95 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border-r-2 border-b-2 border-l-2 border-white/10 border-t-2 border-[#ff4d00] rounded-full animate-spin mx-auto mb-6" />
              <p
                className="font-label-md uppercase tracking-[0.25em] text-xs text-[#ff4d00] font-bold"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Traitement sécurisé...
              </p>
              <p className="text-xs text-white/50 italic animate-pulse">
                Initiation de la demande Orange/MTN Mobile Money
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
