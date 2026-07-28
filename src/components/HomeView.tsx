'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Plus,
  AlertCircle,
  HeartPulse,
  Sparkles,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Zap,
  Star,
  ExternalLink,
} from "lucide-react";
import { features, faqList } from "../data";
import { renderIcon } from "./IconHelper";

// Simple Mock Data for the Dashboard Simulator
interface SimulatorVisit {
  id: string;
  doctor: string;
  specialty: string;
  time: string;
  status: "concluida" | "agendada";
  priority: "A" | "B" | "C";
}

export const HomeView: React.FC = () => {
  const router = useRouter();
  // Simulator State
  const [simulatorVisits, setSimulatorVisits] = useState<SimulatorVisit[]>([
    {
      id: "1",
      doctor: "Dra. Helena Souza",
      specialty: "Cardiologia",
      time: "09:00",
      status: "concluida",
      priority: "A",
    },
    {
      id: "2",
      doctor: "Dr. Arthur Lima",
      specialty: "Pediatria",
      time: "11:30",
      status: "concluida",
      priority: "B",
    },
    {
      id: "3",
      doctor: "Dra. Camila Nogueira",
      specialty: "Ortopedia",
      time: "14:15",
      status: "agendada",
      priority: "A",
    },
    {
      id: "4",
      doctor: "Dr. Roberto Mendes",
      specialty: "Dermatologia",
      time: "16:00",
      status: "agendada",
      priority: "C",
    },
  ]);
  const [newDocName, setNewDocName] = useState("");
  const [newDocSpec, setNewDocSpec] = useState("Geral");
  const [newDocPriority, setNewDocPriority] = useState<"A" | "B" | "C">("A");
  const [simFeedback, setSimFeedback] = useState("");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Workflow Steps State
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "1. Contratação",
      desc: "Sua empresa contrata o plano e o ambiente dedicado é liberado instantaneamente.",
    },
    {
      title: "2. Configuração",
      desc: "O administrador importa a planilha de médicos e define os representantes.",
    },
    {
      title: "3. Planejamento",
      desc: "Os representantes montam sua agenda de visitas da semana de forma inteligente.",
    },
    {
      title: "4. Execução",
      desc: "Em campo (web ou celular), as visitas são concluídas e as observações relatadas.",
    },
    {
      title: "5. Decisão",
      desc: "Os gestores analisam relatórios de cobertura geográfica e tomam decisões ágeis.",
    },
  ];

  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newVisit: SimulatorVisit = {
      id: Date.now().toString(),
      doctor: newDocName,
      specialty: newDocSpec,
      time: "17:30",
      status: "agendada",
      priority: newDocPriority,
    };

    setSimulatorVisits([...simulatorVisits, newVisit]);
    setNewDocName("");
    setSimFeedback("Agendamento simulado com sucesso!");
    setTimeout(() => setSimFeedback(""), 4000);
  };

  const handleToggleStatus = (id: string) => {
    setSimulatorVisits(
      simulatorVisits.map((visit) =>
        visit.id === id
          ? {
              ...visit,
              status: visit.status === "concluida" ? "agendada" : "concluida",
            }
          : visit,
      ),
    );
  };

  const stats = {
    total: simulatorVisits.length,
    concluded: simulatorVisits.filter((v) => v.status === "concluida").length,
    scheduled: simulatorVisits.filter((v) => v.status === "agendada").length,
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        {/* Abstract light background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left: Text Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                Projeto em Desenvolvimento • Lançamento em Breve!
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Controle inteligente de{" "}
                <span className="text-blue-600 relative inline-block">
                  visitação médica
                </span>{" "}
                sem planilhas.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                O <strong>Prime Visita</strong> é um ecossistema inteligente em
                desenvolvimento projetado para organizar médicos, otimizar
                roteiros e dar inteligência a representantes de campo.
                Conheça a plataforma completa e comece a organizar suas
                visitas hoje mesmo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => router.push("/pricing")}
                  id="hero-cta-pricing"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-100 font-display"
                >
                  Ver Planos
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <a
                  href="https://app.primevisita.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 active:scale-98 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 font-display shadow-3xs"
                >
                  <ExternalLink className="w-4.5 h-4.5 text-slate-400" />
                  Acessar App
                </a>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-500" />
                  Garantia de segurança em nuvem
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-500" />
                  Suporte técnico especializado
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-500" />
                  Isolamento total de base de dados
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Simulator Card */}
            <div className="lg:col-span-6 w-full max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden"
              >
                {/* Simulator Header */}
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      Painel do Representante (Simulador)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 uppercase font-bold tracking-wider">
                    Modo Interativo
                  </span>
                </div>

                {/* Simulator Main Content */}
                <div className="p-5 sm:p-6 space-y-6 bg-slate-50/50">
                  {/* Simulator Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Médicos
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-800">
                        {stats.total}
                      </p>
                    </div>
                    <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100 text-center">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-600">
                        Concluídas
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-700">
                        {stats.concluded}
                      </p>
                    </div>
                    <div className="bg-amber-50/30 p-3 rounded-xl border border-amber-100 text-center">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-amber-600">
                        Pendentes
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-700">
                        {stats.scheduled}
                      </p>
                    </div>
                  </div>

                  {/* Simulator Quick Action Form */}
                  <form
                    onSubmit={handleAddVisit}
                    className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Plus className="w-4 h-4 text-blue-500" />
                        Simular Novo Agendamento
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          placeholder="Nome do Médico..."
                          value={newDocName}
                          onChange={(e) => setNewDocName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50/50"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <select
                          value={newDocSpec}
                          onChange={(e) => setNewDocSpec(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50/50"
                        >
                          <option value="Cardiologia">Cardiologia</option>
                          <option value="Pediatria">Pediatria</option>
                          <option value="Ortopedia">Ortopedia</option>
                          <option value="Dermatologia">Dermatologia</option>
                          <option value="Clínico Geral">Clínico Geral</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <button
                          type="submit"
                          className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                      <span className="font-mono">Prioridade:</span>
                      <div className="flex items-center gap-2">
                        {(["A", "B", "C"] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setNewDocPriority(p)}
                            className={`px-2 py-0.5 rounded-md font-bold transition-all text-[10px] ${
                              newDocPriority === p
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          >
                            Prioridade {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>

                  {/* Simulator Action List */}
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider flex justify-between items-center px-1">
                      <span>Roteiro de Visitas</span>
                      <span className="text-[10px] font-normal italic lowercase text-slate-400">
                        Clique na caixa para alternar check-in
                      </span>
                    </p>

                    <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                      {simulatorVisits.map((visit) => (
                        <div
                          key={visit.id}
                          onClick={() => handleToggleStatus(visit.id)}
                          className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                            visit.status === "concluida"
                              ? "bg-emerald-50/10 border-emerald-100 opacity-75"
                              : "bg-white border-slate-200/60 hover:border-slate-300 shadow-3xs"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                visit.status === "concluida"
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "border-slate-300 group-hover:border-blue-500"
                              }`}
                            >
                              {visit.status === "concluida" && (
                                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                              )}
                            </div>
                            <div className="text-left">
                              <p
                                className={`text-xs font-bold ${visit.status === "concluida" ? "line-through text-slate-500" : "text-slate-800"}`}
                              >
                                {visit.doctor}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {visit.specialty} • {visit.time}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                visit.priority === "A"
                                  ? "bg-red-50 text-red-600 border border-red-100"
                                  : visit.priority === "B"
                                    ? "bg-yellow-50 text-yellow-600 border border-yellow-100"
                                    : "bg-blue-50 text-blue-600 border border-blue-100"
                              }`}
                            >
                              Prioridade {visit.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback feedback alert */}
                  <AnimatePresence>
                    {simFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-emerald-500 text-white text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium"
                      >
                        <Check className="w-4 h-4 shrink-0" />
                        {simFeedback}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION & STATS */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              O fim do retrabalho e da perda de dados
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Acompanhar o relacionamento com médicos em planilhas dispersas
              gera ruídos, furos de agenda e falta de indicadores comerciais de
              mercado. O Prime Visita centraliza tudo para que você tome
              decisões ágeis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-center">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-3xs space-y-2">
              <span className="text-4xl font-extrabold text-blue-600 font-display">
                85%
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Menos Tempo Operacional
              </p>
              <p className="text-xs text-slate-500">
                Elimine a conferência manual de planilhas após cada visita
                semanal de campo.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-3xs space-y-2">
              <span className="text-4xl font-extrabold text-blue-600 font-display">
                100%
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Rastreabilidade Histórica
              </p>
              <p className="text-xs text-slate-500">
                Histórico completo de visitas, amostras de medicamentos
                entregues e feedbacks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-3xs space-y-2">
              <span className="text-4xl font-extrabold text-blue-600 font-display">
                40%
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Aumento de Visitas Efetivas
              </p>
              <p className="text-xs text-slate-500">
                Agenda integrada por geolocalização e rotas mais inteligentes de
                viagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider font-mono">
            Funcionalidades
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Completo por fora. Simples por dentro.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            O Prime Visita conta com tudo o que sua equipe médica de
            relacionamento precisa para executar e acompanhar as visitas de
            forma impecável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 text-left space-y-4 relative group"
            >
              {/* Feature Icon Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  {renderIcon(feat.icon, "w-6 h-6")}
                </div>
                {feat.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wide font-semibold uppercase bg-slate-50 border border-slate-200 text-slate-500">
                    {feat.badge}
                  </span>
                )}
              </div>

              {/* Text content */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE FLOW / STEP PROCESS */}
      <section className="bg-blue-900/5 border-y border-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Como Funciona
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              Do contrato aos resultados: 5 passos simples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Simplificamos a implantação para que você comece a monitorar suas
              visitas em tempo recorde.
            </p>
          </div>

          {/* Interactive Flow Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8 max-w-5xl mx-auto">
            {/* Steps buttons on left */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-2.5">
              {steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-white border-blue-500 shadow-md translate-x-1.5"
                        : "bg-white/40 border-slate-200/50 hover:bg-white/70"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold ${isSelected ? "text-blue-700" : "text-slate-800"}`}
                      >
                        {step.title}
                      </h4>
                      {isSelected && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual step display on right */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs">
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                  Passo {activeStep + 1} de 5
                </span>

                <h3 className="font-display text-2xl font-bold text-slate-900 leading-tight">
                  {steps[activeStep].title.substring(3)}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {steps[activeStep].desc} No Prime Visita, desenhamos esse
                  fluxo especificamente para garantir que a transição entre as
                  planilhas analógicas antigas e o nosso portal unificado
                  aconteça sem perdas e sem atrito para sua equipe médica de
                  relacionamento em campo.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-mono font-bold">
                  PV
                </div>
                <div>
                  <p className="font-bold text-slate-800">Pronto para rodar</p>
                  <p className="text-[11px] text-slate-400">
                    Implementação no mesmo dia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-500 text-sm">
            Tem alguma pergunta sobre a plataforma do Prime Visita? Veja as
            respostas abaixo.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:text-blue-600 transition-colors focus:outline-hidden"
                >
                  <span className="text-sm sm:text-base leading-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION - BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden text-center space-y-6 shadow-2xl">
          {/* Subtle decoration */}
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/30 via-transparent to-transparent opacity-60"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-blue-400 text-xs font-bold font-mono tracking-widest uppercase">
              LANÇAMENTO EM BREVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Faça parte da revolução da visitação médica.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Assuma o controle da sua operação, acabe com as planilhas
              dispersas e esteja pronto para o lançamento do Prime Visita.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
              <button
                onClick={() => {
                  router.push("/pricing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                id="cta-bottom-demo"
                className="px-6 py-3.5 rounded-xl bg-blue-500 text-slate-950 font-bold hover:bg-blue-400 active:scale-98 transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/10 font-display"
              >
                Ver Planos
              </button>
              <a
                href="https://app.primevisita.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium hover:bg-slate-850 active:scale-98 transition-all duration-200 cursor-pointer font-display flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                Acessar App
              </a>
              <button
                onClick={() => {
                  router.push("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                id="cta-bottom-plans"
                className="px-6 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-white font-medium active:scale-98 transition-all duration-200 cursor-pointer font-display"
              >
                Fale Conosco
              </button>
            </div>

            <p className="text-slate-500 text-[11px] font-mono">
              Ambiente de testes gratuito • Sem contratos de fidelidade •
              Suporte técnico dedicado
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
