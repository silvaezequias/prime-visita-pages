/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { DocsView } from './components/DocsView';
import { PricingView } from './components/PricingView';
import { ContactView } from './components/ContactView';
import { CheckoutView } from './components/CheckoutView';
import { BetaView } from './components/BetaView';
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<TabType>('home');
  const [selectedPlanName, setSelectedPlanName] = useState<string>('Profissional');
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const handleSelectPlan = (planName: string, billingPeriod: 'monthly' | 'yearly') => {
    setSelectedPlanName(planName);
    setSelectedBillingPeriod(billingPeriod);
    setTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setTab={setTab} />;
      case 'docs':
        return <DocsView setTab={setTab} />;
      case 'pricing':
        return <PricingView setTab={setTab} onSelectPlan={handleSelectPlan} />;
      case 'beta':
        return <BetaView setTab={setTab} />;
      case 'privacy':
        return <PrivacyView setTab={setTab} />;
      case 'terms':
        return <TermsView setTab={setTab} />;
      case 'checkout':
        return (
          <CheckoutView 
            setTab={setTab} 
            selectedPlanName={selectedPlanName} 
            selectedBillingPeriod={selectedBillingPeriod} 
          />
        );
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setTab={setTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      
      {/* Dynamic Promotion Top Banner */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 font-mono flex items-center justify-center gap-2 overflow-hidden border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
        <span className="truncate">
          <strong>Programa Beta:</strong> Inscreva sua empresa hoje para testar o sistema em nossa Sandbox exclusiva de pré-lançamento!
        </span>
        <button 
          onClick={() => {
            setTab('beta');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-blue-400 hover:text-blue-300 transition-colors font-bold flex items-center gap-0.5 ml-2 cursor-pointer focus:outline-hidden"
          id="banner-link-pricing"
        >
          Acessar Beta
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation Header */}
      <Navbar currentTab={currentTab} setTab={setTab} />

      {/* Main Responsive Canvas container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Main SaaS Footer */}
      <Footer setTab={setTab} />
    </div>
  );
}

