/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, HistoryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // BROCHETTES
  {
    id: 'soya',
    name: 'Soya',
    category: 'brochettes',
    categoryLabel: 'BROCHETTES',
    price: 4500,
    description: 'Fines tranches de bœuf grillées au feu de bois, enrobées de notre mélange secret d’épices Yaji et d’arachides torréfiées.',
    image: 'https://images.unsplash.com/photo-1603360946369-bc9cdbfbd68a?q=80&w=800&auto=format&fit=crop',
    isSpicy: true,
    isSpeciality: true,
  },
  {
    id: 'brochettes_poulet',
    name: 'Brochettes de Poulet',
    category: 'brochettes',
    categoryLabel: 'BROCHETTES',
    price: 3800,
    description: 'Blancs de poulet marinés au citron vert et gingembre frais, grillés à la perfection sur brasier.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?q=80&w=800&auto=format&fit=crop',
  },
  // POISSONS
  {
    id: 'tilapia_braise',
    name: 'Tilapia Braisé',
    category: 'poissons',
    categoryLabel: 'POISSONS',
    price: 8500,
    originalPrice: 9500,
    description: '"L’âme du littoral dans chaque bouchée, mariné 24h avec nos herbes locales et grillé lentement au feu de bois."',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
    isSpeciality: true,
  },
  // PIÈCES DE BŒUF
  {
    id: 'entrecote',
    name: 'Entrecôte',
    category: 'boeuf',
    categoryLabel: 'PIÈCES DE BŒUF',
    price: 12000,
    description: '350g de bœuf mûri de première qualité, saisi de manière experte sur grill volcanique, servi avec une sauce au poivre de Penja.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'filet_boeuf',
    name: 'Filet de Bœuf',
    category: 'boeuf',
    categoryLabel: 'PIÈCES DE BŒUF',
    price: 14500,
    description: 'La pièce la plus tendre, fondante et savoureuse, grillée selon votre appoint préférée, escortée d’oignons rissolés.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop',
  },
  // ACCOMPAGNEMENTS
  {
    id: 'plantain_grille',
    name: 'Plantain Grillé',
    category: 'accompagnements',
    categoryLabel: 'ACCOMPAGNEMENTS',
    price: 1500,
    description: 'Bananes plantains mûres entières rôties sur braises, douces et caramélisées, un régal traditionnel.',
    image: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?q=80&w=800&auto=format&fit=crop',
    iconName: 'sandwich',
  },
  {
    id: 'attieke',
    name: 'Attiéké',
    category: 'accompagnements',
    categoryLabel: 'ACCOMPAGNEMENTS',
    price: 1200,
    description: 'Semoule de manioc cuite à la vapeur, légère, acidulée, et garnie d’une fine julienne de piments doux.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=800&auto=format&fit=crop',
    iconName: 'grid',
  },
  {
    id: 'frites_patate',
    name: 'Frites de Patate',
    category: 'accompagnements',
    categoryLabel: 'ACCOMPAGNEMENTS',
    price: 1500,
    description: 'Frites de patate douce locale fraîches, croustillantes au sel de mer et légèrement parfumées de paprika.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
    iconName: 'soup',
  },
  {
    id: 'alloco',
    name: 'Alloco',
    category: 'accompagnements',
    categoryLabel: 'ACCOMPAGNEMENTS',
    price: 1500,
    description: 'Dés de bananes plantains mûres frites à la couleur dorée, idéalement sucrés et fondants.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
    iconName: 'utensils',
  },
];

export const HISTORY_ORDERS: HistoryItem[] = [
  {
    id: 'hist-1',
    date: '12 Janvier 2024',
    description: 'Capitaine Braisé + Attiéké',
    total: 13500,
    icon: 'restaurant',
    items: [
      { name: 'Capitaine Braisé d’Ébène', quantity: 1, price: 11000 },
      { name: 'Attiéké Traditionnel', quantity: 2, price: 12500 }
    ]
  },
  {
    id: 'hist-2',
    date: '05 Janvier 2024',
    description: 'Dégustation Vins & Viandes',
    total: 42000,
    icon: 'local_bar',
    items: [
      { name: 'Plateau Dégustation Carnivore', quantity: 1, price: 30000 },
      { name: 'Sélection Côte de Nuits Recu', quantity: 1, price: 12000 }
    ]
  },
  {
    id: 'hist-3',
    date: '24 Décembre 2023',
    description: 'Menu de Noël Traiteur',
    total: 85000,
    icon: 'celebration',
    items: [
      { name: 'Buffet de Fêtes Le Carnivore', quantity: 1, price: 85000 }
    ]
  }
];
