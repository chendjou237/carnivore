/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'brochettes' | 'poissons' | 'boeuf' | 'accompagnements';
  categoryLabel: string;
  price: number; // in FCFA
  originalPrice?: number; // for displaying promotions/discounts
  description: string;
  image: string;
  isSpeciality?: boolean;
  isSpicy?: boolean;
  iconName?: string; // used for custom icons
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type ServiceMode = 'dine_in' | 'delivery';

export type PaymentMethod = 'orange' | 'mtn' | 'card' | 'cash';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber?: string;
  deliveryAddress?: string;
  serviceMode: ServiceMode;
  paymentMethod: PaymentMethod;
  paymentLabel: string;
  transactionId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'received' | 'cooking' | 'delivery' | 'delivered';
  estimatedArrival: string;
  driverName: string;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  description: string;
  total: number;
  icon: string;
  items: { name: string; quantity: number; price: number }[];
}
