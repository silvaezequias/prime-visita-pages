'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Check, Info, Sparkles, Building2, Loader2, AlertTriangle, RefreshCw, MessageCircle, Users } from 'lucide-react';

interface ApiPlanFeature {
  key: string;
  label: string;
}

interface ApiPlanUserLimit {
  role: string;
  label: string;
  max: number | null;
}

interface ApiPlanLimits {
  users?: ApiPlanUserLimit[];
  appointmentsPerWeek?: number | null;
}

interface ApiPlan {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  price: string;
  billingPeriod: string;
  features: ApiPlanFeature[];
  featured?: boolean;
  limits?: ApiPlanLimits;
}

// Rota pública do Prime Visita (app real) que lista os planos ativos —
// ver src/app/api/plans/route.ts no projeto prime-visita.
const PLANS_API_URL = 'https://app.primevisita.com.br/api/plans';

export const PricingView: React.FC = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<ApiPlan[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const loadPlans = () => {
    setLoading(true);
    setError(null);
    fetch(PLANS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => setPlans(Array.isArray(data.plans) ? data.plans : []))
      .catch(() => setError('Não foi possível carregar os planos agora. Tente novamente em instantes.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleCtaClick = (plan: ApiPlan) => {
    const period = plan.billingPeriod === 'YEARLY' ? 'yearly' : 'monthly';
    router.push(`/checkout?plan=${encodeURIComponent(plan.name)}&billing=${period}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const availablePeriods = new Set((plans ?? []).map((p) => p.billingPeriod));
  const showPeriodToggle = availablePeriods.has('MONTHLY') && availablePeriods.has('YEARLY');
  const visiblePlans = showPeriodToggle
    ? (plans ?? []).filter((p) => p.billingPeriod === (billingPeriod === 'yearly' ? 'YEARLY' : 'MONTHLY'))
    : plans ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          Planos Justos
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Planos flexíveis para qualquer tamanho de equipe.
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Sem contratos ocultos ou multas de rescisão. Escolha o plano ideal para gerenciar suas visitas médicas e altere ou cancele quando quiser.
        </p>

        {/* Period Switcher (only shown when the API offers both periods) */}
        {showPeriodToggle && (
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

            <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
              Faturamento Anual
            </span>
          </div>
        )}
      </div>

      {/* 2. Plans: loading / error / list */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <p className="text-xs font-mono uppercase tracking-wider">Carregando planos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="max-w-md mx-auto text-center space-y-4 py-10">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <p className="text-sm text-slate-600">{error}</p>
          <button
            onClick={loadPlans}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && visiblePlans.length === 0 && (
        <p className="text-center text-sm text-slate-400">Nenhum plano disponível no momento.</p>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          {visiblePlans.map((plan) => {
            const isPopular = plan.featured ?? false;
            const isFree = plan.priceCents === 0;
            const suffix = plan.billingPeriod === 'YEARLY' ? '/ano' : '/mês';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-slate-950 text-white border-0 shadow-2xl scale-102 z-10 md:-translate-y-2'
                    : 'border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 shadow-3xs'
                }`}
              >
                {isPopular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-blue-500 text-slate-950 text-[11px] font-mono uppercase tracking-widest font-extrabold flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    Mais Escolhido
                  </span>
                )}

                {/* Plan Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    {!isFree && <Building2 className="w-5 h-5 text-slate-400" />}
                  </div>

                  {plan.description && (
                    <p className={`text-xs leading-relaxed min-h-[36px] ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>
                  )}

                  <div className="pt-2 flex items-baseline gap-1">
                    <span className={`text-3xl sm:text-4xl font-extrabold font-display ${isPopular ? 'text-white' : 'text-slate-950'}`}>
                      {isFree ? 'Grátis' : plan.price}
                    </span>
                    {!isFree && (
                      <span className={`text-xs font-medium font-sans ${isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                        {suffix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Checklist Divider */}
                <div className={`h-[1px] my-6 ${isPopular ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                    O que está incluso:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature.key} className="flex items-start gap-2.5 text-xs leading-normal">
                        <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          isPopular
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            : 'bg-blue-50 border-blue-100 text-blue-600'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        <span className={`font-sans ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>{feature.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage Limits — only rendered once the API exposes them */}
                {plan.limits?.users && plan.limits.users.length > 0 && (
                  <div className="space-y-3 mb-8">
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                      Limites do plano:
                    </p>
                    <ul className="space-y-1.5">
                      {plan.limits.users.map((limit) => (
                        <li key={limit.role} className="flex items-center justify-between gap-2 text-xs">
                          <span className={`flex items-center gap-1.5 font-sans ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                            <Users className="w-3 h-3 shrink-0 opacity-60" />
                            {limit.label}
                          </span>
                          <span className={`font-mono font-semibold ${isPopular ? 'text-white' : 'text-slate-800'}`}>
                            {limit.max === null ? 'Ilimitado' : limit.max}
                          </span>
                        </li>
                      ))}
                      {plan.limits.appointmentsPerWeek !== undefined && (
                        <li className="flex items-center justify-between gap-2 text-xs">
                          <span className={`font-sans ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                            Agendamentos por semana
                          </span>
                          <span className={`font-mono font-semibold ${isPopular ? 'text-white' : 'text-slate-800'}`}>
                            {plan.limits.appointmentsPerWeek === null ? 'Ilimitado' : plan.limits.appointmentsPerWeek}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleCtaClick(plan)}
                  id={`pricing-cta-${plan.slug}`}
                  className={`w-full py-3 rounded-xl font-bold font-display text-sm tracking-wide transition-all duration-200 cursor-pointer text-center ${
                    isPopular
                      ? 'bg-white hover:bg-slate-100 text-slate-950 active:scale-98 shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-98'
                  }`}
                >
                  {isFree ? 'Começar Grátis' : 'Contratar Plano'}
                </button>
              </div>
            );
          })}

          {/* Static contact-us card — not part of the API, always offered as a fallback */}
          <div
            key="contact-plan"
            className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left border border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50/60 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-extrabold text-slate-900">
                  Deseja mais benefícios?
                </h3>
                <MessageCircle className="w-5 h-5 text-blue-500" />
              </div>

              <p className="text-xs leading-relaxed min-h-[36px] text-slate-500">
                Precisa de algo além dos planos padrão? Fale com nosso time comercial e monte uma proposta sob medida para sua empresa.
              </p>

              <div className="pt-2 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950">
                  Sob Consulta
                </span>
              </div>
            </div>

            <div className="h-[1px] my-6 bg-slate-100"></div>

            <div className="space-y-3 mb-8">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Ideal para:
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-xs leading-normal">
                  <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border bg-blue-50 border-blue-100 text-blue-600">
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                  <span className="font-sans text-slate-600">Times grandes ou necessidades específicas</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs leading-normal">
                  <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border bg-blue-50 border-blue-100 text-blue-600">
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                  <span className="font-sans text-slate-600">Integrações e condições comerciais personalizadas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                router.push('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="pricing-cta-contact"
              className="w-full py-3 rounded-xl font-bold font-display text-sm tracking-wide transition-all duration-200 cursor-pointer text-center bg-slate-900 hover:bg-slate-800 text-white active:scale-98"
            >
              Fale Conosco
            </button>
          </div>
        </motion.div>
      )}

      {/* 3. Feature Comparison Mini-Grid */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto text-left space-y-6">
        <h3 className="font-display text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Perguntas sobre os planos?
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
              Para equipes maiores, oferecemos faturamento por boleto bancário anual mediante contrato SLA firmado com a farmacêutica ou empresa.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
