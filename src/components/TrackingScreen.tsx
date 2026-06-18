/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  PhoneCall,
  Clock,
  User,
  Download,
  Flame,
  Truck,
  MapPin,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Order, HistoryItem } from '../types';
import { HISTORY_ORDERS } from '../data';

interface TrackingScreenProps {
  activeOrder: Order | null;
  onNavigate: (view: 'menu' | 'checkout' | 'tracking' | 'receipt') => void;
  onViewHistoricReceipt: (historyId: string) => void;
}

export default function TrackingScreen({
  activeOrder,
  onNavigate,
  onViewHistoricReceipt,
}: TrackingScreenProps) {
  // Use a simulated order matching the screenshots verbatim if none is active
  const defaultOrder: Order = {
    id: '#LC-98234',
    customerName: 'Marc',
    serviceMode: 'delivery',
    paymentMethod: 'orange',
    paymentLabel: 'Orange Money',
    transactionId: 'TXN-492-9023',
    items: [
      {
        menuItem: {
          id: 'grillade_mixte',
          name: 'Grillade Mixte "Le Carnivore" (Chef\'s Selection)',
          category: 'boeuf',
          categoryLabel: 'PIÈCES DE BŒUF',
          price: 15500,
          description: 'Chef Selection...',
          image: '',
        },
        quantity: 1,
      },
      {
        menuItem: {
          id: 'alloco_premium',
          name: 'Alloco Premium (Banane Plantain)',
          category: 'accompagnements',
          categoryLabel: 'ACCOMPAGNEMENTS',
          price: 4000,
          description: 'Plantain...',
          image: '',
        },
        quantity: 2,
      },
      {
        menuItem: {
          id: 'bissap',
          name: 'Bissap Maison (75cl)',
          category: 'accompagnements',
          categoryLabel: 'ACCOMPAGNEMENTS',
          price: 2500,
          description: 'Hibiscus...',
          image: '',
        },
        quantity: 1,
      },
    ],
    subtotal: 22000,
    tax: 0,
    total: 22000,
    status: 'cooking', // matches Cuisine
    estimatedArrival: '13:20 - 13:35',
    driverName: 'Moussa Diouf',
    createdAt: '12:45',
  };

  const order = activeOrder || defaultOrder;
  const [currentStatus, setCurrentStatus] = useState<'received' | 'cooking' | 'delivery' | 'delivered'>(
    order.status
  );

  useEffect(() => {
    setCurrentStatus(order.status);
  }, [order.status]);

  // Status mapping to progress lines width
  const getProgressPercentage = () => {
    switch (currentStatus) {
      case 'received':
        return 5;
      case 'cooking':
        return 45;
      case 'delivery':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 45;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5EDE3] pt-28 pb-20 overflow-x-hidden">
      <main className="px-6 md:px-16 max-w-[1440px] mx-auto space-y-12">
        {/* Testing controls banner warning */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 no-print text-yellow-900 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 animate-bounce" />
            <p className="text-xs font-body-md">
              <strong>Simulateur de Commande Le Carnivore</strong>: Ajustez l'avancement physique de la préparation sur le gril pour voir comment l'application réagit en temps réel.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentStatus('received')}
              className={`px-3 py-1 text-[10px] uppercase font-label-md tracking-wider rounded transition-all cursor-pointer ${
                currentStatus === 'received' ? 'bg-black text-white font-bold' : 'bg-white/70 hover:bg-white text-black'
              }`}
            >
              1. Reçue
            </button>
            <button
              onClick={() => setCurrentStatus('cooking')}
              className={`px-3 py-1 text-[10px] uppercase font-label-md tracking-wider rounded transition-all cursor-pointer ${
                currentStatus === 'cooking' ? 'bg-[#C0282E] text-white font-bold' : 'bg-white/70 hover:bg-white text-black'
              }`}
            >
              2. Cuisine
            </button>
            <button
              onClick={() => setCurrentStatus('delivery')}
              className={`px-3 py-1 text-[10px] uppercase font-label-md tracking-wider rounded transition-all cursor-pointer ${
                currentStatus === 'delivery' ? 'bg-[#FF6600] text-white font-bold' : 'bg-white/70 hover:bg-white text-black'
              }`}
            >
              3. Livraison
            </button>
            <button
              onClick={() => setCurrentStatus('delivered')}
              className={`px-3 py-1 text-[10px] uppercase font-label-md tracking-wider rounded transition-all cursor-pointer ${
                currentStatus === 'delivered' ? 'bg-green-700 text-white font-bold' : 'bg-white/70 hover:bg-white text-black'
              }`}
            >
              4. Livrée
            </button>
          </div>
        </div>

        {/* Dashboard grid columns splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Live stats & Order recap checklist (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-2">
              <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#C0282E] block font-extrabold">
                Suivi en temps réel
              </span>
              <h2
                className="font-headline-lg text-3xl md:text-4xl text-[#1A1410] font-black leading-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Bon appétit bientôt, {order.customerName} !
              </h2>
              <p className="text-sm font-label-sm text-[#4c4546] font-medium tracking-wide">
                Commande {order.id} • Passée à {order.createdAt}
              </p>
            </section>

            {/* Stepper Card container */}
            <section className="bg-white p-8 md:p-10 rounded-2xl border border-[#E5E5E5] shadow-sm relative overflow-hidden">
              <div className="relative mb-14 pb-4">
                {/* Visual line */}
                <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-100 z-0" />
                <motion.div
                  className="absolute top-5 left-0 h-[3px] bg-black z-10 origin-left"
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                {/* Steps markers */}
                <div className="relative z-20 flex justify-between">
                  {/* Step 1: Reçue */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStatus === 'received' ||
                        currentStatus === 'cooking' ||
                        currentStatus === 'delivery' ||
                        currentStatus === 'delivered'
                          ? 'bg-black text-[#F5EDE3] shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    </div>
                    <span className="font-label-md text-[10px] uppercase tracking-wider text-black font-extrabold">
                      Reçue
                    </span>
                  </div>

                  {/* Step 2: Cuisine */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStatus === 'cooking' ||
                        currentStatus === 'delivery' ||
                        currentStatus === 'delivered'
                          ? 'bg-black text-[#F5EDE3] shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      <Flame className="w-5 h-5 fill-current" />
                    </div>
                    <span
                      className={`font-label-md text-[10px] uppercase tracking-wider font-extrabold ${
                        currentStatus === 'cooking' ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      Cuisine
                    </span>
                  </div>

                  {/* Step 3: Livraison */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStatus === 'delivery' || currentStatus === 'delivered'
                          ? 'bg-black text-[#F5EDE3] shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-label-md text-[10px] uppercase tracking-wider font-extrabold ${
                        currentStatus === 'delivery' ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      Livraison
                    </span>
                  </div>

                  {/* Step 4: Livrée */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentStatus === 'delivered'
                          ? 'bg-black text-[#F5EDE3] shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-label-md text-[10px] uppercase tracking-wider font-extrabold ${
                        currentStatus === 'delivered' ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      Livrée
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrival details footer inside stepper box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#E5E5E5] w-full">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black shadow-sm shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-label-sm text-[10px] text-[#4c4546] uppercase tracking-wider">
                      Arrivée estimée
                    </p>
                    <p className="font-headline-md text-lg text-[#1b1b1b] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {currentStatus === 'delivered' ? 'Livraison Terminée ✔' : order.estimatedArrival}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black shadow-sm shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-label-sm text-[10px] text-[#4c4546] uppercase tracking-wider">
                      Livreur désigné
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-headline-md text-lg text-[#1b1b1b] font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {order.driverName}
                      </p>
                      <button
                        onClick={() => alert(`Téléphone du coursier (${order.driverName}): +237 690-33-88-22`)}
                        className="p-1 hover:bg-gray-100 rounded text-[#ff4d00] cursor-pointer"
                        title="Appeler le coursier"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Receipt checkout detailed report card */}
            <section className="bg-white p-8 rounded-2xl border border-[#E5E5E5] shadow-sm space-y-6">
              <h3 className="font-headline-md text-xl font-bold tracking-tight text-black" style={{ fontFamily: 'Syne, sans-serif' }}>
                Récapitulatif de votre festin
              </h3>

              <div className="divide-y divide-[#E5E5E5] space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 first:pt-0">
                    <div className="flex items-center gap-4">
                      <span className="font-label-md text-xs text-[#C0282E] font-bold">
                        {item.quantity}x
                      </span>
                      <p className="font-body-md text-sm font-semibold text-[#1A1410]">
                        {item.menuItem.name}
                      </p>
                    </div>
                    <span className="font-label-md text-xs text-[#1A1410] font-bold">
                      {item.menuItem.price.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row paid */}
              <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap gap-4 justify-between items-center bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-2xl">
                <div>
                  <p className="font-label-md text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    Total Payé
                  </p>
                  <p className="font-headline-lg text-2xl font-black text-black" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {order.total.toLocaleString()} FCFA
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('receipt')}
                  className="bg-[#1A1410] text-[#F5EDE3] hover:bg-[#C0282E] hover:text-white px-6 py-3 rounded-lg font-label-md text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le reçu
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: Orange Money invoice & Historic timeline (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 no-print">
            {/* Mobile money details summary */}
            <section className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm relative overflow-hidden">
              <div className="absolute right-2 top-2 text-gray-100 opacity-60">
                <CheckCircle2 className="w-20 h-20 -mr-4 -mt-2 rotate-12" />
              </div>

              <h4
                className="font-headline-md text-xs uppercase tracking-widest text-gray-400 mb-6 font-extrabold"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Paiement Mobile Money
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                  <span className="text-gray-500 font-medium">Méthode de prélèvement:</span>
                  <span className="font-bold text-black uppercase">{order.paymentLabel}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                  <span className="text-gray-500 font-medium">ID de Transaction:</span>
                  <span className="font-mono font-semibold text-black">{order.transactionId}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                  <span className="text-gray-500 font-medium">Statut du virement:</span>
                  <span className="text-emerald-700 font-extrabold font-label-sm text-[10px] tracking-wider flex items-center gap-1 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                    ✔ Confirmé
                  </span>
                </div>

                <div className="mt-4 p-4 bg-[#F5EDE3]/60 rounded-xl border border-dashed border-[#E5E5E5] text-center">
                  <p className="font-body-md text-xs text-[#4c4546] leading-relaxed italic opacity-90">
                    Le montant a été débité de votre compte mobile avec succès. Le reçu scellé de transaction est prêt.
                  </p>
                </div>
              </div>
            </section>

            {/* Historical list */}
            <section className="space-y-6">
              <h4 className="font-headline-md text-lg text-black font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Historique récent
              </h4>

              <div className="space-y-3">
                {HISTORY_ORDERS.map((hOrder) => (
                  <div
                    key={hOrder.id}
                    onClick={() => onViewHistoricReceipt(hOrder.id)}
                    className="bg-white p-4 rounded-xl border border-[#E5E5E5] hover:border-black transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 bg-[#F5EDE3] group-hover:bg-black group-hover:text-white transition-colors duration-200 rounded-lg flex items-center justify-center text-[#1A1410] shrink-0">
                      {hOrder.icon === 'local_bar' ? (
                        <span className="material-symbols-outlined text-lg">local_bar</span>
                      ) : hOrder.icon === 'celebration' ? (
                        <span className="material-symbols-outlined text-lg">celebration</span>
                      ) : (
                        <span className="material-symbols-outlined text-lg">restaurant</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-label-md text-xs text-black font-extrabold tracking-wide">
                        {hOrder.date}
                      </p>
                      <p className="text-[11px] text-[#4c4546] leading-snug">{hOrder.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert("L'historique complet sur 12 mois a été compilé. Retrouvez vos archives de grillades dans votre boîte mail.")}
                className="w-full py-3 border border-black font-label-md text-xs uppercase tracking-widest font-extrabold text-black hover:bg-black hover:text-white transition-all cursor-pointer text-center"
              >
                Voir tout l'historique
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
