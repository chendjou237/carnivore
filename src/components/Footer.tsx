/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, Share2 } from 'lucide-react';

interface FooterProps {
  darkTheme?: boolean;
}

export default function Footer({ darkTheme = false }: FooterProps) {
  return (
    <footer
      id="main-footer"
      className={`w-full py-12 px-6 md:px-16 mt-auto transition-colors duration-300 no-print ${
        darkTheme
          ? 'bg-[#120d09] text-white border-t border-white/5'
          : 'bg-[#1A1410] text-[#F5EDE3]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand identity */}
        <div className="text-center md:text-left">
          <h2
            className="font-bold text-2xl tracking-tighter mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Le Carnivore
          </h2>
          <p className="font-label-sm text-xs opacity-60 tracking-wider">
            © 12026 Le Carnivore - Excellence Culinaire Africaine. Tous droits réservés.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-label-sm text-xs uppercase tracking-wider opacity-85">
          <a
            href="#horaires"
            onClick={(e) => e.preventDefault()}
            className="hover:text-amber-500 transition-colors"
          >
            Horaires
          </a>
          <a
            href="#localisation"
            onClick={(e) => e.preventDefault()}
            className="hover:text-amber-500 transition-colors"
          >
            Localisation
          </a>
          <a
            href="#contact"
            onClick={(e) => e.preventDefault()}
            className="hover:text-amber-500 transition-colors"
          >
            Contact
          </a>
          <a
            href="#mentions-legales"
            onClick={(e) => e.preventDefault()}
            className="hover:text-amber-500 transition-colors"
          >
            Mentions Légales
          </a>
        </div>

        {/* Social interactions */}
        <div className="flex gap-4 opacity-80">
          <button
            className="p-2 rounded-full hover:bg-white/10 hover:opacity-100 transition-all cursor-pointer"
            title="Langue"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/10 hover:opacity-100 transition-all cursor-pointer"
            title="Partager"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
