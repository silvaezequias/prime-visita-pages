import React, { useState } from 'react';
import { Menu, X, HeartPulse, Sparkles, ExternalLink } from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  setTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: TabType }[] = [
    { label: 'Início', value: 'home' },
    { label: 'Documentação', value: 'docs' },
    { label: 'Precificação', value: 'pricing' },
    { label: 'Acesso Beta', value: 'beta' },
    { label: 'Contato', value: 'contact' },
  ];

  const handleNavClick = (tab: TabType) => {
    setTab(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 cursor-pointer group focus:outline-hidden"
              id="nav-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="https://prime-visita.vercel.app/icons/icon-512.png" 
                  alt="Prime Visita Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 block leading-tight">
                  Prime Visita
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-blue-600 block font-medium leading-none">
                  Gestão de Visitas
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.value;
              const isBeta = item.value === 'beta';
              return (
                <button
                  key={item.value}
                  id={`nav-item-${item.value}`}
                  onClick={() => handleNavClick(item.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/50 font-bold'
                      : isBeta
                      ? 'text-blue-600 hover:bg-blue-50/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isBeta && (
                    <span className="px-1.5 py-0.2 bg-blue-500 text-white text-[8px] font-mono font-bold rounded-md animate-pulse">
                      Novo
                    </span>
                  )}
                </button>
              );
            })}
            <div className="h-6 w-[1px] bg-slate-200 mx-3"></div>
            <a
              href="https://prime-visita.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-3xs active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              Acessar App
            </a>
            <button
              onClick={() => handleNavClick('beta')}
              id="nav-cta-demo"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Garantir Vaga Beta
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-hidden transition-colors"
            >
              <span className="sr-only">Abrir menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white/95 backdrop-blur-md absolute top-16 left-0 right-0 py-3 shadow-lg transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = currentTab === item.value;
              return (
                <button
                  key={item.value}
                  id={`mobile-nav-item-${item.value}`}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-1 border-t border-slate-100 px-4 space-y-2">
              <a
                href="https://prime-visita.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-center text-base font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                Acessar App
              </a>
              <button
                onClick={() => handleNavClick('beta')}
                id="mobile-nav-cta"
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-center text-base font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                Garantir Vaga Beta
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
