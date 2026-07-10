import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info, ShieldAlert, Sparkles, Building2, HelpCircle, Lock, Eye, AlertTriangle } from 'lucide-react';
import { pricingPlans } from '../data';
import { TabType } from '../types';

interface PricingViewProps {
  setTab: (tab: TabType) => void;
  onSelectPlan?: (planName: string, billingPeriod: 'monthly' | 'yearly') => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ setTab, onSelectPlan }) => {
  const [showDraft, setShowDraft] = useState<boolean>(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const handleCtaClick = (planName: string) => {
    if (planName === 'Corporativo') {
      setTab('contact');
    } else {
      if (onSelectPlan) {
        onSelectPlan(planName, billingPeriod);
      } else {
        setTab('contact');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showDraft) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Lock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          Planos em Definição
        </div>
        
        <div className="space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Nossos Planos e Preços <br className="hidden sm:inline" />
            <span className="text-blue-600">Disponíveis em Breve!</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Estamos finalizando o desenho dos planos comerciais do Prime Visita para garantir modelos flexíveis, justos e escaláveis para médicos individuais, clínicas locais e grandes redes de saúde.
          </p>
        </div>

        {/* Informational teaser card */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl max-w-lg mx-auto text-left space-y-4 shadow-3xs">
          <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-slate-400">ESTRUTURA EM DESENVOLVIMENTO</h4>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
              <p><strong>Plano Iniciante</strong> para representantes individuais ou consultórios iniciando digitalização.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
              <p><strong>Plano Profissional</strong> com dashboards completos de relacionamento e métricas geográficas.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
              <p><strong>Plano Corporativo</strong> com bases de dados 100% isoladas (Multi-tenant), logs e integrações de API.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              setTab('beta');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-100 cursor-pointer"
          >
            Participar do Programa Beta Grátis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Draft Warning Banner */}
      <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span><strong>Modo Demonstrativo:</strong> Os planos e preços abaixo são simulações técnicas para teste do fluxo de checkout e faturamento de sandbox.</span>
        </div>
        <button
          onClick={() => setShowDraft(false)}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors text-[11px] shrink-0 self-start sm:self-center cursor-pointer"
        >
          Voltar para Aviso
        </button>
      </div>
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          Precificação Justa
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Planos flexíveis para qualquer tamanho de equipe.
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Sem contratos ocultos ou multas de rescisão. Escolha o plano ideal para gerenciar suas visitas médicas e altere ou cancele quando quiser.
        </p>

        {/* Period Switcher (Pill style toggle with 20% discount badge) */}
        <div className="pt-6 flex justify-center items-center gap-3">
          <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
            Faturamento Mensal
          </span>
          
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6.5 bg-slate-200 hover:bg-slate-300 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer"
            aria-label="Alternar período de cobrança"
            id="billing-period-toggle"
          >
            <div
              className={`w-4.5 h-4.5 bg-white rounded-full shadow-xs transform transition-transform duration-300 ${
                billingPeriod === 'yearly' ? 'translate-x-5.5 bg-blue-600' : ''
              }`}
            />
          </button>
          
          <div className="flex items-center gap-1.5">
            <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
              Faturamento Anual
            </span>
            <span className="bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
              Economize 20%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Responsive Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {pricingPlans.map((plan) => {
          const price = billingPeriod === 'yearly' ? plan.priceYearly : plan.priceMonthly;
          const displayPrice = `R$ ${price}`;
          
          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-slate-950 text-white border-0 shadow-2xl scale-102 z-10 md:-translate-y-2'
                  : 'border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 shadow-3xs'
              }`}
            >
              {/* Popularity Badge */}
              {plan.isPopular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-blue-500 text-slate-950 text-[11px] font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  Mais Escolhido
                </span>
              )}

              {/* Plan Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`font-display text-xl font-extrabold ${plan.isPopular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  {plan.name === 'Corporativo' && (
                    <Building2 className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                
                <p className={`text-xs leading-relaxed min-h-[36px] ${plan.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="pt-2 flex items-baseline gap-1">
                  <span className={`text-3xl sm:text-4xl font-extrabold font-display ${plan.isPopular ? 'text-white' : 'text-slate-950'}`}>
                    {displayPrice}
                  </span>
                  <span className={`text-xs font-medium font-sans ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                    /mês
                  </span>
                </div>
                
                <p className={`text-[10px] font-mono ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                  {billingPeriod === 'yearly' 
                    ? `Faturado anualmente: R$ ${(price * 12).toLocaleString('pt-BR')}/ano`
                    : 'Cancelamento mensal flexível'
                  }
                </p>
              </div>

              {/* Checklist Divider */}
              <div className={`h-[1px] my-6 ${plan.isPopular ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                  O que está incluso:
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-normal">
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                        plan.isPopular 
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                          : 'bg-blue-50 border-blue-100 text-blue-600'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span className={`font-sans ${plan.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleCtaClick(plan.name)}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                className={`w-full py-3 rounded-xl font-bold font-display text-sm tracking-wide transition-all duration-200 cursor-pointer text-center ${
                  plan.isPopular
                    ? 'bg-white hover:bg-slate-100 text-slate-950 active:scale-98 shadow-md'
                    : plan.name === 'Corporativo'
                    ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-98'
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. Feature Comparison Mini-Grid */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto text-left space-y-6">
        <h3 className="font-display text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Perguntas sobre precificação?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">Posso mudar de plano quando quiser?</h4>
            <p className="text-slate-500 leading-relaxed">
              Sim, você pode fazer upgrade ou downgrade de plano diretamente do seu painel corporativo a qualquer momento, e a diferença será proporcionalmente recalculada em sua fatura.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800">Como funciona o faturamento corporativo?</h4>
            <p className="text-slate-500 leading-relaxed">
              Para o plano Corporativo ou equipes com mais de 30 representantes, oferecemos faturamento por boleto bancário anual mediante contrato SLA firmado com a farmacêutica ou empresa.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
