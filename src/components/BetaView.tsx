import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, Send, ShieldCheck, HelpCircle, 
  Settings, Database, Server, RefreshCw, Smartphone, Key,
  Clock, Mail, Hourglass, Users
} from 'lucide-react';
import { TabType } from '../types';

interface BetaViewProps {
  setTab: (tab: TabType) => void;
}

export const BetaView: React.FC<BetaViewProps> = ({ setTab }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [reps, setReps] = useState('1-5');
  const [message, setMessage] = useState('');
  const [interest, setInterest] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [simStep, setSimStep] = useState('');

  const handleInterestToggle = (id: string) => {
    if (interest.includes(id)) {
      setInterest(interest.filter(item => item !== id));
    } else {
      setInterest([...interest, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSimulatedProgress(0);
    setSimStep('Registrando solicitação de convite no banco de dados...');

    // Simulate waitlist registration step by step
    const steps = [
      { progress: 25, text: 'Validando e-mail corporativo e credenciais de segurança...' },
      { progress: 55, text: 'Inserindo sua empresa na fila de prioridade do Beta Privado...' },
      { progress: 85, text: 'Gerando número exclusivo da fila e preparando protocolo...' },
      { progress: 100, text: 'Inscrição efetuada com sucesso! Redirecionando...' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulatedProgress(step.progress);
        setSimStep(step.text);
        if (step.progress === 100) {
          setIsSubmitting(false);
          setIsRegistered(true);
        }
      }, (index + 1) * 800);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          Programa de Testes
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Acesso ao Beta Privado
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          O Prime Visita está em fase final de desenvolvimento técnico. Inscreva sua empresa hoje para testar os recursos com exclusividade antes do lançamento oficial e ajudar a moldar o futuro da plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Registration form or success dashboard */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-3xs text-left">
          <AnimatePresence mode="wait">
            {!isRegistered ? (
              <motion.div
                key="beta-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Solicitar Convite de Teste
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Preencha os dados básicos para registrar seu interesse na fila do programa Beta.
                  </p>
                </div>

                {isSubmitting ? (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                    <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
                    <div className="space-y-2 max-w-sm">
                      <p className="text-xs font-mono font-bold text-blue-600">{simulatedProgress}% COMPLETO</p>
                      <p className="text-sm font-semibold text-slate-800">{simStep}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${simulatedProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="beta-name" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Seu Nome
                        </label>
                        <input
                          id="beta-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="beta-company" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Nome da Empresa ou Clínica
                        </label>
                        <input
                          id="beta-company"
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="beta-email" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          E-mail Corporativo
                        </label>
                        <input
                          id="beta-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="beta-reps" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          Representantes de Campo
                        </label>
                        <select
                          id="beta-reps"
                          value={reps}
                          onChange={(e) => setReps(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 cursor-pointer"
                        >
                          <option value="1-5">Até 5 representantes</option>
                          <option value="6-15">De 6 a 15 representantes</option>
                          <option value="16-50">De 16 a 50 representantes</option>
                          <option value="50+">Mais de 50 representantes</option>
                        </select>
                      </div>
                    </div>

                    {/* Checkboxes of interest */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        O que você mais gostaria de testar? (Opcional)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: 'pwa', label: 'Aplicativo Celular Offline (PWA)' },
                          { id: 'routes', label: 'Planejamento de Rotas no Mapa' },
                          { id: 'stats', label: 'Dashboard de Indicadores' },
                          { id: 'sheets', label: 'Importador inteligente de planilhas' }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleInterestToggle(item.id)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between cursor-pointer transition-all duration-150 ${
                              interest.includes(item.id)
                                ? 'bg-blue-50 border-blue-500 text-blue-700'
                                : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            <span>{item.label}</span>
                            {interest.includes(item.id) && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3px]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="beta-message" className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Qual o maior desafio da sua equipe hoje?
                      </label>
                      <textarea
                        id="beta-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ex: controle de visitas pendentes, falta de histórico, dificuldades do representante na rua..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50 resize-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold font-display text-sm rounded-xl shadow-md shadow-blue-100 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      Solicitar Beta
                    </button>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="beta-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-blue-800">
                  <Hourglass className="w-6 h-6 text-blue-600 shrink-0 animate-pulse" />
                  <div className="text-xs">
                    <p className="font-bold">Inscrição Confirmada com Sucesso!</p>
                    <p className="text-blue-700/80 mt-0.5">Sua solicitação de interesse foi recebida e sua empresa está registrada na fila de prioridade.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-sm">Protocolo do Registro</h4>
                  
                  {/* Queue Details Block */}
                  <div className="bg-slate-50 rounded-2xl p-5 space-y-4 text-xs border border-slate-200 shadow-3xs text-left">
                    <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-150 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-400 block uppercase font-bold text-[9px] tracking-wider">Status da Solicitação</span>
                        <span className="text-blue-600 font-bold flex items-center gap-1 mt-1">
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                          Em Fila de Análise
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-bold text-[9px] tracking-wider">Código de Espera</span>
                        <span className="text-slate-700 font-bold mt-1 block">PV-WLT-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 text-[11px]">E-mail Corporativo:</span>
                          <p className="text-slate-500 text-[11px] mt-0.5">{email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 text-[11px]">Empresa Vinculada:</span>
                          <p className="text-slate-500 text-[11px] mt-0.5">{company}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 text-[11px]">Próximas Etapas Importantes:</span>
                          <ul className="text-slate-500 text-[11px] mt-1 space-y-1.5 list-disc pl-4 leading-relaxed">
                            <li><strong>Avaliação Cadastral:</strong> Nosso time valida os dados fornecidos e as especialidades requeridas para certificar a elegibilidade.</li>
                            <li><strong>Liberação em Lotes:</strong> Os acessos de teste são liberados periodicamente por e-mail de acordo com a ordem de registro e disponibilidade de suporte técnico.</li>
                            <li><strong>Notificação Oficial:</strong> Você receberá a resposta definitiva com as credenciais oficiais de teste e o guia de onboarding diretamente no e-mail informado.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setIsRegistered(false);
                      setName('');
                      setEmail('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Novo Registro
                  </button>
                  <button
                    onClick={() => {
                      setTab('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Voltar para Início
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Beta Perks / FAQ cards */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="bg-slate-950 text-white border-0 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 space-y-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Settings className="w-5 h-5 text-blue-400 animate-spin-slow" />
                Vantagens do Beta Privado
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-100">Ambiente de Testes Dedicado</p>
                    <p className="text-slate-400 mt-0.5">Acesso a um ambiente Sandbox simulado e seguro, liberado via convite por e-mail para validar seus fluxos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-100">Mentoria de Implantação</p>
                    <p className="text-slate-400 mt-0.5">Nossa equipe de engenharia dará suporte direto para configurar e importar suas planilhas de teste.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-100">Prioridade no Lançamento</p>
                    <p className="text-slate-400 mt-0.5">Garantia de 20% de desconto adicional permanente em qualquer plano quando lançarmos oficialmente.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Vagas limitadas neste ciclo</span>
                <span>Ciclo: Q3-2026</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 text-xs text-slate-500 space-y-4">
            <h4 className="font-display font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <HelpCircle className="w-4.5 h-4.5 text-blue-600" />
              Perguntas frequentes do Beta
            </h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">O que é a Sandbox de testes?</p>
                <p className="leading-relaxed">É uma réplica virtual idêntica ao sistema final, porém com dados fictícios para que sua equipe explore a usabilidade sem impactar operações reais.</p>
              </div>
              <div className="space-y-1 border-t border-slate-200/50 pt-2.5">
                <p className="font-bold text-slate-800">Por quanto tempo dura o Beta?</p>
                <p className="leading-relaxed">O programa de testes ficará ativo até o nosso lançamento oficial planejado para os próximos meses. Os participantes serão notificados por e-mail com antecedência.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
