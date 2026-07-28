'use client';

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
import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';
import { motion, AnimatePresence } from 'motion/react';

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

