'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Phone, MapPin, CheckCircle, Send, Sparkles, Building2, Users
} from 'lucide-react';

export const ContactView: React.FC = () => {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [reps, setReps] = useState('1-5');
  const [message, setMessage] = useState('');
  
  // Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick Validation
    if (!name.trim() || !email.trim() || !company.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Empresa).');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setReps('1-5');
    setMessage('');
    setIsSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          Fale Conosco
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Pronto para revolucionar seu time de campo?
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Nossa equipe de consultores está a postos para montar uma demonstração personalizada do Prime Visita baseada na realidade da sua carteira médica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* CONTACT INFO PANEL - 5 Columns */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          <div className="space-y-4 bg-slate-50 border border-slate-200/50 rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Sede Comercial
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Atendemos indústrias farmacêuticas, distribuidoras de medicamentos e redes de saúde em todo o território nacional com suporte humanizado e ágil.
            </p>

            <div className="space-y-4.5 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400 font-bold">E-mail de Contato</p>
                  <a href="mailto:contato@primevisita.com.br" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                    contato@primevisita.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400 font-bold">Telefone Comercial</p>
                  <a href="tel:+551140028922" className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                    0800 591 1020
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400 font-bold">Endereço Principal</p>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo - SP, CEP 01310-100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick SLA / trust banner */}
          <div className="p-5 border border-dashed border-slate-200 rounded-2xl flex items-start gap-3 bg-white">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 animate-pulse"></div>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-800">Tempo de resposta garantido:</strong> Respondemos todas as solicitações comerciais e dúvidas técnicas em menos de <strong className="text-slate-800">2 horas úteis</strong>.
            </p>
          </div>
        </div>

        {/* INTERACTIVE FORM PANEL - 7 Columns */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-5 text-left"
              >
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-display text-lg font-extrabold text-slate-900">
                    Solicitar Proposta Comercial
                  </h3>
                  <p className="text-xs text-slate-400">Preencha os campos abaixo e entraremos em contato.</p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="space-y-1">
                    <label htmlFor="form-name" className="text-xs font-bold text-slate-700 block">
                      Nome Completo *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="Ex: Dra. Helena Souza"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30"
                    />
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="text-xs font-bold text-slate-700 block">
                      E-mail Corporativo *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="Ex: helena@empresa.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Telefone */}
                  <div className="space-y-1">
                    <label htmlFor="form-phone" className="text-xs font-bold text-slate-700 block">
                      Telefone / Celular
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="Ex: (11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30"
                    />
                  </div>

                  {/* Empresa */}
                  <div className="space-y-1">
                    <label htmlFor="form-company" className="text-xs font-bold text-slate-700 block">
                      Nome da Empresa *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        id="form-company"
                        type="text"
                        placeholder="Ex: Farmacêutica Alfa"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of representatives */}
                <div className="space-y-1">
                  <label htmlFor="form-reps" className="text-xs font-bold text-slate-700 block flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Número de Representantes na Equipe
                  </label>
                  <select
                    id="form-reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30 cursor-pointer"
                  >
                    <option value="1-5">Até 5 representantes</option>
                    <option value="6-15">De 6 a 15 representantes</option>
                    <option value="16-50">De 16 a 50 representantes</option>
                    <option value="50+">Mais de 50 representantes</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div className="space-y-1">
                  <label htmlFor="form-message" className="text-xs font-bold text-slate-700 block">
                    Observações ou Necessidades Adicionais
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Nos conte um pouco sobre como controlam suas visitas atualmente e o que esperam do Prime Visita..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="form-submit-btn"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500/80 disabled:cursor-not-allowed text-white font-bold font-display text-sm rounded-xl shadow-md shadow-blue-100 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processando solicitação...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-6 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-extrabold text-slate-900">
                    Solicitação Recebida!
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Muito obrigado pelo interesse, <strong className="text-slate-800">{name}</strong>. Nossa equipe comercial já foi alertada sobre a sua solicitação para a empresa <strong className="text-slate-800">{company}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 text-xs text-slate-500 max-w-sm mx-auto text-left space-y-2">
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Próximos Passos:
                  </p>
                  <ul className="list-decimal pl-4.5 space-y-1">
                    <li>Análise de cobertura da sua região por nossos consultores.</li>
                    <li>Envio de e-mail com agendamento da demo técnica.</li>
                    <li>Liberação do seu login para testes de simulação.</li>
                  </ul>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Enviar Outra Mensagem
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
