import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  CreditCard, 
  QrCode, 
  Barcode, 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Copy, 
  CheckCircle2, 
  Ticket, 
  Loader2,
  Info,
  ChevronRight
} from 'lucide-react';
import { pricingPlans } from '../data';
import { TabType } from '../types';

interface CheckoutViewProps {
  setTab: (tab: TabType) => void;
  selectedPlanName: string;
  selectedBillingPeriod: 'monthly' | 'yearly';
}

type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

export const CheckoutView: React.FC<CheckoutViewProps> = ({ 
  setTab, 
  selectedPlanName, 
  selectedBillingPeriod 
}) => {
  // Plan & Billing state
  const [planName, setPlanName] = useState<string>(selectedPlanName || 'Profissional');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(selectedBillingPeriod || 'yearly');
  const [extraReps, setExtraReps] = useState<number>(0);
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent?: number; discountValue?: number } | null>(null);
  const [couponError, setCouponError] = useState<string>('');
  
  // Form values
  const [email, setEmail] = useState<string>('contato@empresa.com.br');
  const [fullName, setFullName] = useState<string>('Dr. Carlos Albuquerque');
  const [document, setDocument] = useState<string>('12.345.678/0001-90');
  
  // Credit card form values
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');
  
  // Status states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // PIX dynamic status
  const [pixStatus, setPixStatus] = useState<'waiting' | 'paid'>('waiting');
  const [pixTimeLeft, setPixTimeLeft] = useState<number>(900); // 15 mins

  // Find selected plan configuration
  const currentPlan = pricingPlans.find(p => p.name === planName) || pricingPlans[1];

  // Price calculations
  const baseMonthlyPrice = billingPeriod === 'yearly' ? currentPlan.priceYearly : currentPlan.priceMonthly;
  const extraRepCost = billingPeriod === 'yearly' ? 20 : 25; // per rep per month
  const extraRepsTotal = extraReps * extraRepCost;
  const monthlySubtotal = baseMonthlyPrice + extraRepsTotal;
  
  // Calculate total depending on faturamento
  const periodMonths = billingPeriod === 'yearly' ? 12 : 1;
  let subtotal = monthlySubtotal * periodMonths;
  
  // Apply coupon
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = subtotal * (appliedCoupon.discountPercent / 100);
    } else if (appliedCoupon.discountValue) {
      discountAmount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }
  
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Countdown timer for PIX simulation
  useEffect(() => {
    if (paymentMethod !== 'pix' || isSuccess || pixStatus === 'paid') return;
    
    const interval = setInterval(() => {
      setPixTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentMethod, isSuccess, pixStatus]);

  // Simulated auto-payment for PIX (to show dynamic interactivity)
  useEffect(() => {
    if (paymentMethod !== 'pix' || pixStatus === 'paid' || isSuccess) return;

    // Simulate payment confirmation after 12 seconds of visiting the PIX screen
    const timer = setTimeout(() => {
      setPixStatus('paid');
      // Toast notice or simple notification
    }, 12000);

    return () => clearTimeout(timer);
  }, [paymentMethod, pixStatus, isSuccess]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (code === 'PRIME20') {
      setAppliedCoupon({ code: 'PRIME20', discountPercent: 20 });
      setCouponCode('');
    } else if (code === 'BEMVINDO') {
      setAppliedCoupon({ code: 'BEMVINDO', discountValue: 50 });
      setCouponCode('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    if (value.length <= 5) {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      setCardCvv(value);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate PCI Secure network processing latency
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Helper to get card brand logo
  const getCardBrand = (num: string) => {
    const cleanNum = num.replace(/\s/g, '');
    if (cleanNum.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleanNum)) return 'Mastercard';
    if (/^3[47]/.test(cleanNum)) return 'Amex';
    return 'Card';
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5px]" />
        </motion.div>

        <div className="space-y-3">
          <span className="text-xs font-mono font-bold bg-emerald-100 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-widest">
            Assinatura Ativa
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Parabéns! Seu Prime Visita está pronto.
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Enviamos os dados de acesso da sua nova instância de banco de dados isolada (tenant) e o link do aplicativo para o seu e-mail: <strong className="text-slate-800">{email}</strong>.
          </p>
        </div>

        {/* Invoice breakdown mockup */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-4 shadow-3xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3 font-mono text-[11px] text-slate-400">
            <span>ID DO PEDIDO: #PV-{Math.floor(100000 + Math.random() * 900000)}</span>
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Plano {planName} ({billingPeriod === 'yearly' ? 'Anual' : 'Mensal'})</span>
              <span>{formatCurrency(baseMonthlyPrice * periodMonths)}</span>
            </div>
            
            {extraReps > 0 && (
              <div className="flex justify-between text-slate-500">
                <span>+ {extraReps} representates adicionais</span>
                <span>{formatCurrency(extraRepsTotal * periodMonths)}</span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Cupom ({appliedCoupon.code})</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            
            <div className="h-[1px] bg-slate-200 my-2"></div>
            
            <div className="flex justify-between text-sm font-extrabold text-slate-950">
              <span>Valor Total Pago</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>

            <div className="text-[10px] text-slate-400 font-mono pt-2">
              Cobrança via {paymentMethod === 'credit_card' ? 'Cartão de Crédito' : paymentMethod === 'pix' ? 'PIX' : 'Boleto Bancário'}
            </div>
          </div>
        </div>

        {/* Quick Instructions list */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3">
          <h4 className="font-display font-bold text-sm text-blue-900 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-blue-600 stroke-[3px]" />
            Próximos passos recomendados:
          </h4>
          <ol className="text-xs text-slate-600 list-decimal pl-4.5 space-y-1.5 leading-relaxed">
            <li>Acesse o painel do administrador pelo link enviado por e-mail.</li>
            <li>Baixe o aplicativo celular usando o guia PWA na aba <strong>Guia do Usuário</strong>.</li>
            <li>Adicione seus primeiros representantes e sincronize sua base de médicos.</li>
          </ol>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => setTab('home')}
            className="px-6 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Voltar para a Home
          </button>
          <button
            onClick={() => setTab('docs')}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold font-display hover:bg-blue-700 active:scale-98 transition-all cursor-pointer shadow-md shadow-blue-100"
          >
            Acessar Manual do Usuário
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Return link */}
      <div className="text-left">
        <button
          onClick={() => setTab('pricing')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar aos Planos
        </button>
      </div>

      <div className="text-left space-y-2">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Checkout Seguro
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Complete as informações abaixo para ativar instantaneamente seu ecossistema.
        </p>
      </div>

      {/* Main Grid Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Payment Method Info */}
        <div className="lg:col-span-7 space-y-6">
          
          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            
            {/* Step 1: Account Information */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-3xs">
              <h3 className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-mono text-xs flex items-center justify-center font-bold">1</span>
                Dados Cadastrais da Empresa
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="checkout-name" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Nome Completo do Gestor
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 font-sans"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="checkout-doc" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    CNPJ ou CPF da Empresa
                  </label>
                  <input
                    id="checkout-doc"
                    type="text"
                    required
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="checkout-email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  E-mail para Recebimento de Acesso
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 font-sans"
                />
              </div>
            </div>

            {/* Step 2: Payment Details Selectors */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-3xs">
              <h3 className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-mono text-xs flex items-center justify-center font-bold">2</span>
                Forma de Pagamento
              </h3>

              {/* Toggle Buttons */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Cartão
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  PIX
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'boleto'
                      ? 'bg-white text-blue-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Barcode className="w-4 h-4" />
                  Boleto
                </button>
              </div>

              {/* Form Areas depending on method */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'credit_card' && (
                  <motion.div
                    key="credit-card-area"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    
                    {/* Interactive Animated Card Graphic */}
                    <div className="relative w-full max-w-sm h-48 mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-850 p-6 text-white flex flex-col justify-between shadow-lg overflow-hidden font-mono tracking-widest text-left select-none">
                      {/* Stylized geometric background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-7 bg-slate-700/60 rounded-md border border-slate-600 flex items-center justify-center">
                          <span className="text-[9px] font-mono font-extrabold text-slate-400">CHIP</span>
                        </div>
                        <span className="text-xs font-mono font-bold tracking-widest uppercase italic text-slate-300">
                          {getCardBrand(cardNumber)}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base md:text-lg font-bold py-2">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">Titular</span>
                          <div className="text-[11px] font-sans truncate font-medium max-w-[180px] tracking-normal">
                            {cardName.toUpperCase() || 'NOME DO TITULAR'}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">Validade</span>
                            <div className="text-[11px]">{cardExpiry || 'MM/AA'}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">CVV</span>
                            <div className="text-[11px]">{cardCvv || '•••'}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="card-number-input" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Número do Cartão
                        </label>
                        <input
                          id="card-number-input"
                          type="text"
                          required
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          onFocus={() => setFocusedField('number')}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="card-name-input" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Nome Impresso no Cartão
                        </label>
                        <input
                          id="card-name-input"
                          type="text"
                          required
                          placeholder="CARLOS ALBUQUERQUE"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="card-expiry-input" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Data de Expiração (MM/AA)
                        </label>
                        <input
                          id="card-expiry-input"
                          type="text"
                          required
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          onFocus={() => setFocusedField('expiry')}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="card-cvv-input" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Código de Segurança (CVV)
                        </label>
                        <input
                          id="card-cvv-input"
                          type="text"
                          required
                          placeholder="123"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          onFocus={() => setFocusedField('cvv')}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 text-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'pix' && (
                  <motion.div
                    key="pix-area"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Pague com PIX para liberação imediata. Aponte a câmera do seu celular para o QR Code abaixo ou copie a chave de pagamento.
                      </p>
                    </div>

                    {/* QR Code Graphic Frame */}
                    <div className="w-44 h-44 mx-auto bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 relative shadow-inner">
                      {/* Simulating scanning effect */}
                      {pixStatus !== 'paid' && (
                        <div className="absolute top-4 left-4 right-4 h-0.5 bg-blue-500/80 animate-bounce"></div>
                      )}
                      
                      <QrCode className={`w-32 h-32 ${pixStatus === 'paid' ? 'opacity-20 text-slate-400' : 'text-slate-800'}`} />
                      
                      {pixStatus === 'paid' && (
                        <div className="absolute inset-0 bg-emerald-50/90 rounded-2xl flex flex-col items-center justify-center space-y-1">
                          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-800">Pagamento Pago!</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono">
                      <span>Código expira em:</span>
                      <span className="font-bold text-red-600">
                        {Math.floor(pixTimeLeft / 60)}:{String(pixTimeLeft % 60).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                      <button
                        type="button"
                        onClick={() => handleCopy(
                          "00020101021226830014br.gov.bcb.pix2561primevisita.vercel.app/pix-checkout-saas-secure-pci-gate-compliance",
                          "pix"
                        )}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedText === 'pix' ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                            Chave Copiada!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copiar Chave Copia e Cola
                          </>
                        )}
                      </button>
                      
                      {pixStatus !== 'paid' && (
                        <button
                          type="button"
                          onClick={() => setPixStatus('paid')}
                          className="py-2 px-4 rounded-xl border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          Simular Confirmação PIX
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'boleto' && (
                  <motion.div
                    key="boleto-area"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 flex items-start gap-3">
                      <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-500 leading-relaxed">
                        <p className="font-bold text-slate-700">Aviso sobre liberação de Boleto Bancário</p>
                        <p className="mt-0.5">
                          O pagamento via boleto pode demorar de 1 a 2 dias úteis para compensação bancária automática pelo sistema. Se precisar de liberação imediata, por favor utilize a opção PIX ou Cartão.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="boleto-line" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Linha Digitável do Boleto
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="boleto-line"
                          type="text"
                          readOnly
                          value="34191.79001 01043.513184 91020.150008 7 94520000031900"
                          className="flex-1 px-3 py-2 bg-slate-100 text-slate-600 text-[11px] font-mono rounded-xl border border-slate-200 outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleCopy("34191.79001 01043.513184 91020.150008 7 94520000031900", "boleto")}
                          className="px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          {copiedText === 'boleto' ? <Check className="w-4 h-4 stroke-[3px]" /> : <Copy className="w-4 h-4" />}
                          {copiedText === 'boleto' ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PCI Compliance Note & Action CTA */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isProcessing || (paymentMethod === 'pix' && pixStatus !== 'paid')}
                id="checkout-confirm-btn"
                className={`w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold font-display text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando com Segurança SSL...
                  </>
                ) : paymentMethod === 'pix' && pixStatus !== 'paid' ? (
                  'Aguardando Pagamento do PIX para Confirmar...'
                ) : (
                  <>
                    <Lock className="w-4.5 h-4.5" />
                    Finalizar Ativação da Conta
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  PCI-DSS Compliant
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  Criptografia SSL de 256 bits
                </span>
              </div>
            </div>

          </form>
        </div>

        {/* Right Column: Dynamic Price Breakdown & Selected Plan summary */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Plan customization card */}
          <div className="bg-slate-950 text-white border-0 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Plano Selecionado</span>
                  <h3 className="font-display text-xl font-extrabold text-white mt-1">
                    {planName}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    {formatCurrency(baseMonthlyPrice)}
                  </span>
                  <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider">
                    /mês
                  </span>
                </div>
              </div>

              {/* Toggle or change plans within checkout */}
              <div className="space-y-2">
                <label htmlFor="checkout-plan-select" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Alterar Plano da Assinatura:
                </label>
                <select
                  id="checkout-plan-select"
                  value={planName}
                  onChange={(e) => {
                    setPlanName(e.target.value);
                    setExtraReps(0); // reset extra reps when changing plans
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-hidden focus:border-blue-500 cursor-pointer"
                >
                  <option value="Iniciante">Plano Iniciante (Até 3 reps)</option>
                  <option value="Profissional">Plano Profissional (Até 15 reps)</option>
                </select>
              </div>

              {/* Billing Cycle Switcher inside Cart */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Ciclo de Faturamento:
                </span>
                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setBillingPeriod('monthly')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingPeriod('yearly')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      billingPeriod === 'yearly'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Anual
                    <span className="bg-emerald-500 text-slate-950 text-[8px] font-mono uppercase tracking-widest font-extrabold px-1 rounded-sm leading-none py-0.5">
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Interactive Multiplier: Number of representatives slider or select */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  <span>Adicionar Representantes Extras:</span>
                  <span className="text-white font-sans text-xs bg-slate-900 px-2 py-0.5 rounded-md">
                    +{extraReps} reps
                  </span>
                </div>
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={extraReps}
                    onChange={(e) => setExtraReps(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-900 rounded-lg h-1.5 appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>Sem extras</span>
                    <span>+{extraReps} representates ({formatCurrency(extraRepCost)}/mês cada)</span>
                  </div>
                </div>
              </div>

              {/* What is included checklist bullet summary */}
              <div className="pt-4 border-t border-slate-900 space-y-2 text-xs">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Incluso neste plano:</span>
                <ul className="space-y-1.5">
                  {currentPlan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                  {extraReps > 0 && (
                    <li className="flex items-center gap-2 text-blue-400 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Espaço para mais {extraReps} representantes ativos</span>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </div>

          {/* Coupon Code input area */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 text-left shadow-3xs space-y-4">
            <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-blue-600" />
              Tem um cupom de desconto?
            </h4>
            
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-2.5 rounded-xl">
                <span className="font-bold flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                  CUPOM ATIVO: {appliedCoupon.code}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer underline hover:no-underline"
                >
                  Remover
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código do Cupom (Ex: PRIME20)"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError('');
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50/50 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
            )}
            
            {couponError && (
              <p className="text-[10px] font-mono text-red-600">{couponError}</p>
            )}
            
            {!appliedCoupon && !couponError && (
              <p className="text-[10px] font-mono text-slate-400">
                Dica: Experimente utilizar o cupom <strong className="text-slate-600">PRIME20</strong> para 20% de desconto adicional!
              </p>
            )}
          </div>

          {/* Checkout dynamic breakdown card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-3xs">
            <h4 className="font-display text-sm font-extrabold text-slate-900">
              Resumo do Faturamento
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>
                  Plano {planName} 
                  <span className="font-semibold block sm:inline sm:ml-1">
                    ({billingPeriod === 'yearly' ? '12 meses' : '1 mês'})
                  </span>
                </span>
                <span>{formatCurrency(baseMonthlyPrice * periodMonths)}</span>
              </div>
              
              {extraReps > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>
                    +{extraReps} representantes extras 
                    <span className="font-semibold block sm:inline sm:ml-1">
                      ({billingPeriod === 'yearly' ? '12 meses' : '1 mês'})
                    </span>
                  </span>
                  <span>{formatCurrency(extraRepsTotal * periodMonths)}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Cupom aplicado ({appliedCoupon.code})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="h-[1px] bg-slate-200 my-2"></div>
              
              <div className="flex justify-between text-slate-800">
                <span className="font-bold">Subtotal de Cobrança</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>

              {billingPeriod === 'yearly' && (
                <div className="text-[10px] text-emerald-600 font-mono flex items-start gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Você economizou {formatCurrency((currentPlan.priceMonthly - currentPlan.priceYearly) * 12)} com a opção de faturamento anual!</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
