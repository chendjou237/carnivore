/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Printer, Download, Mail, ArrowLeft, Check, Send } from 'lucide-react';
import { Order, HistoryItem } from '../types';

interface ReceiptScreenProps {
  activeOrder: Order | null;
  historicOrder: HistoryItem | null;
  onNavigate: (view: 'menu' | 'checkout' | 'tracking' | 'receipt') => void;
}

export default function ReceiptScreen({
  activeOrder,
  historicOrder,
  onNavigate,
}: ReceiptScreenProps) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Fallback default mock order verbatim to screenshot
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
          description: 'Bissap...',
          image: '',
        },
        quantity: 1,
      },
    ],
    subtotal: 22000,
    tax: 0,
    total: 22000,
    status: 'cooking',
    estimatedArrival: '13:20 - 13:35',
    driverName: 'Moussa Diouf',
    createdAt: '12:45',
  };

  // Determine if viewing historical item or active checkout
  const isHistoric = !!historicOrder;
  const orderId = isHistoric ? historicOrder.id : (activeOrder?.id || defaultOrder.id);
  const customerName = isHistoric ? 'Marc' : (activeOrder?.customerName || defaultOrder.customerName);
  const transactionDate = isHistoric ? historicOrder.date : 'Aujourd’hui';
  const paymentMethod = isHistoric ? 'Orange Money' : (activeOrder?.paymentLabel || defaultOrder.paymentLabel);
  const transactionId = isHistoric ? 'TXN-492-9023' : (activeOrder?.transactionId || defaultOrder.transactionId);

  // Compute receipt items
  const receiptItems = isHistoric
    ? historicOrder.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      }))
    : (activeOrder || defaultOrder).items.map((i) => ({
        name: i.menuItem.name,
        quantity: i.quantity,
        price: i.menuItem.price * i.quantity,
      }));

  const subtotalAmt = isHistoric
    ? historicOrder.total
    : (activeOrder || defaultOrder).subtotal;

  const taxAmt = isHistoric ? 0 : (activeOrder || defaultOrder).tax;
  const deliveryAmt = isHistoric
    ? 0
    : (activeOrder?.serviceMode === 'delivery' ? 1500 : 0);

  const totalAmt = isHistoric
    ? historicOrder.total
    : (activeOrder || defaultOrder).total;

  // Trigger print
  const handlePrint = () => {
    window.print();
  };

  // Trigger fake receipt download
  const handleDownloadPDF = () => {
    alert(`Téléchargement de la facture PDF (${orderId}.pdf) en cours d'écriture locale...`);
  };

  // Fake email delivery submit
  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!emailValue) return;
    setIsEmailSent(true);
    setTimeout(() => {
      setEmailModalOpen(false);
      setIsEmailSent(false);
      setEmailValue('');
      alert(`Facture envoyée avec succès à l'adresse: ${emailValue}`);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#F5EDE3] pt-28 pb-20 overflow-x-hidden">
      {/* Context navigation bar back link */}
      <nav className="fixed top-0 w-full px-6 md:px-16 py-6 flex justify-between items-center z-40 bg-white/70 backdrop-blur-xl border-b border-[#E5E5E5] no-print text-[#1b1b1b]">
        <button
          onClick={() => onNavigate('menu')}
          className="flex items-center gap-2 font-label-md text-xs uppercase tracking-widest hover:opacity-75 transition-opacity cursor-pointer font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au menu
        </button>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 font-label-md text-xs uppercase tracking-widest px-4 py-2 bg-white border border-[#1b1b1b] hover:bg-black hover:text-white transition-all cursor-pointer font-extrabold"
          >
            <Printer className="w-4 h-4" /> Imprimer le reçu
          </button>
        </div>
      </nav>

      {/* Structured paper sheet receipt */}
      <main className="receipt-canvas w-full max-w-[760px] bg-[#F5EDE3] p-8 md:p-16 my-8 mx-auto relative overflow-hidden border border-[#E5E5E5] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Charcoal grill marks visual effects */}
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-25 -mr-16 -mt-16 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(26,20,16,0.12) 10px, rgba(26,20,16,0.12) 12px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 opacity-25 -ml-16 -mb-16 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(26,20,16,0.12) 10px, rgba(26,20,16,0.12) 12px)',
          }}
        />

        {/* Corporate header branding */}
        <header className="text-center mb-12 flex flex-col items-center">
          <h1
            className="text-6xl md:text-7xl text-[#1A1410] tracking-tighter mb-2 font-black font-brand-logo leading-none"
            style={{
              fontFamily: '"Anton", sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            LE CARNIVORE
          </h1>
          <p className="font-label-md text-xs uppercase tracking-[0.25em] text-gray-500 font-bold">
            Excellence Culinaire Africaine
          </p>
          <div className="w-12 h-1 bg-[#C0282E] mt-6" />

          <h2 className="mt-12 font-headline-md text-lg font-extrabold uppercase tracking-[0.15em] text-[#1A1410]">
            REÇU DE COMMANDE
          </h2>
        </header>

        {/* Customer / Payment data details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-y border-black/10 py-10 text-sm">
          <div className="space-y-4">
            <div>
              <h3 className="font-label-sm text-[10px] uppercase text-gray-400 font-bold">Numéro de Commande</h3>
              <p className="font-label-md text-sm font-extrabold text-[#1A1410] tracking-wide">{orderId}</p>
            </div>
            <div>
              <h3 className="font-label-sm text-[10px] uppercase text-gray-400 font-bold">Date de Transaction</h3>
              <p className="font-label-md text-sm text-[#1A1410] font-semibold">{transactionDate}</p>
            </div>
            <div>
              <h3 className="font-label-sm text-[10px] uppercase text-gray-400 font-bold">Client gourmand</h3>
              <p className="font-label-md text-sm text-[#1A1410] font-semibold">{customerName}</p>
            </div>
          </div>

          <div className="space-y-4 relative">
            <div>
              <h3 className="font-label-sm text-[10px] uppercase text-gray-400 font-bold">Méthode de Paiement</h3>
              <p className="font-label-md text-sm text-[#1A1410] font-semibold">{paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-label-sm text-[10px] uppercase text-gray-400 font-bold">ID Transaction</h3>
              <p className="font-label-md text-sm text-[#1A1410] font-mono">{transactionId}</p>
            </div>

            {/* Red Rubber "PAYÉ" Seal stamp */}
            <div className="absolute right-0 bottom-0 pointer-events-none">
              <div
                className="text-[#C0282E] text-2xl font-black rounded-lg border-4 border-[#C0282E]/90 px-5 py-2 inline-block shadow-md select-none rotate-[-12deg]"
                style={{
                  fontFamily: '"Anton", sans-serif',
                  letterSpacing: '0.1em',
                }}
              >
                PAYÉ
              </div>
            </div>
          </div>
        </section>

        {/* Items tabular breakdown */}
        <section className="mb-12">
          <table className="w-full text-left text-sm text-[#1A1410]">
            <thead>
              <tr className="border-b border-black/20 pb-4">
                <th className="pb-4 font-label-md text-xs uppercase text-gray-400 font-bold tracking-wider">Description</th>
                <th className="pb-4 font-label-md text-xs uppercase text-gray-400 font-bold tracking-wider text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {receiptItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-5">
                    <span className="font-label-md text-sm font-bold text-black">{item.quantity}x {item.name}</span>
                    <p className="text-[10px] text-gray-500 font-mono italic mt-1">Élevage local, braisé au charbon d’acacia</p>
                  </td>
                  <td className="py-5 text-right font-label-md text-sm font-semibold text-black">
                    {item.price.toLocaleString()} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Computations totals block */}
        <section className="flex flex-col items-end gap-3 pt-6 border-t border-black/15">
          <div className="flex justify-between w-full max-w-[300px] text-xs">
            <span className="font-label-sm uppercase text-gray-400 tracking-wider">Sous-total</span>
            <span className="font-label-md font-semibold font-mono text-black">{subtotalAmt.toLocaleString()} FCFA</span>
          </div>
          {taxAmt > 0 && (
            <div className="flex justify-between w-full max-w-[300px] text-xs">
              <span className="font-label-sm uppercase text-gray-400 tracking-wider">TVA locale (18%)</span>
              <span className="font-label-md font-semibold font-mono text-black">{taxAmt.toLocaleString()} FCFA</span>
            </div>
          )}
          {deliveryAmt > 0 && (
            <div className="flex justify-between w-full max-w-[300px] text-xs">
              <span className="font-label-sm uppercase text-gray-400 tracking-wider">Coursier Yaoundé</span>
              <span className="font-label-md font-semibold font-mono text-[#ff4d00]">{deliveryAmt.toLocaleString()} FCFA</span>
            </div>
          )}

          <div className="flex justify-between w-full max-w-[300px] mt-4 pt-4 border-t-2 border-[#C0282E]/30">
            <span className="font-headline-md text-sm uppercase tracking-widest text-[#1A1410] font-black">TOTAL</span>
            <span className="font-headline-md text-lg text-[#C0282E] font-black font-mono">
              {totalAmt.toLocaleString()} FCFA
            </span>
          </div>
        </section>

        {/* Footer address greetings */}
        <footer className="mt-16 pt-10 border-t border-black/5 flex flex-col items-center text-center">
          <p
            className="text-[#1A1410] text-[22px] tracking-tight font-extrabold mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Merci de votre visite !
          </p>

          <div className="space-y-1 font-label-sm text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            <p>Le Carnivore Restaurant &amp; Grillades Gastronomiques</p>
            <p>Rue de la Gastronomie, Bastos, Yaoundé, Cameroun</p>
            <p>+237 680 XX XX XX | contact@lecarnivore.com</p>
          </div>

          {/* Inline utility action links (Hidden when printing paper copies) */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center no-print w-full">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-[#1A1410] hover:bg-black hover:scale-103 text-white font-label-md text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-sm rounded"
            >
              <Download className="w-3.5 h-3.5" /> Télécharger PDF
            </button>
            <button
              onClick={() => setEmailModalOpen(true)}
              className="px-6 py-3 border border-[#1b1b1b] hover:bg-black hover:text-white hover:scale-103 text-black font-label-md text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-sm rounded"
            >
              <Mail className="w-3.5 h-3.5" /> Envoyer par Email
            </button>
          </div>
        </footer>
      </main>

      {/* Share invoice by mail modal popup */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 no-print">
          {/* Backdrop screen filter */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setEmailModalOpen(false)}
          />

          <div className="relative bg-white text-black p-8 max-w-sm w-full rounded-xl shadow-2xl border border-gray-100 z-10 animate-in zoom-in-95 duration-200">
            <div className="space-y-4">
              <h3 className="font-headline-md text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Facture par Mail
              </h3>
              <p className="text-xs text-gray-500">
                L’équipe de Le Carnivore vous transmettra une facture électronique haute définition par courrier.
              </p>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:border-red-600 focus:ring-0 outline-none"
                  placeholder="votre.email@domain.com"
                  required
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 rounded text-xs uppercase font-label-md hover:bg-gray-100 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded text-xs uppercase font-label-md font-extrabold flex items-center gap-1.5 hover:bg-gray-800 cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
