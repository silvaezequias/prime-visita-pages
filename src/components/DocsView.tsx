'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, BookOpen, ChevronRight, FileText, Check, Copy, HelpCircle, AlertCircle, Lock, Code, Sparkles
} from 'lucide-react';
import { docSections } from '../data';

export const DocsView: React.FC = () => {
  const router = useRouter();
  const [showDraft, setShowDraft] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(docSections[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Group sections by category
  const categories = Array.from(new Set(docSections.map(sec => sec.category)));

  // Filter sections by search query
  const filteredSections = docSections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSection = docSections.find(sec => sec.id === activeSectionId) || docSections[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!showDraft) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Lock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          Seção em Desenvolvimento
        </div>
        
        <div className="space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Documentação Técnica <br className="hidden sm:inline" />
            <span className="text-blue-600">Disponível em Breve!</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Estamos refinando os manuais técnicos de relacionamento médico, guias de instalação do aplicativo offline (PWA) e documentação de APIs integradas para oferecer um onboarding impecável no lançamento.
          </p>
        </div>

        {/* Card containing teaser elements */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl max-w-lg mx-auto text-left space-y-4 shadow-3xs">
          <h4 className="font-bold text-xs font-mono uppercase tracking-widest text-slate-400">PRÉ-VIEW DO QUE ESTÁ SENDO CONSTRUÍDO</h4>
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Manual completo para administradores e representantes.</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Guias de instalação rápida de PWA no iOS e Android.</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Exemplos interativos de chaves de API e integração.</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              router.push('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-100 cursor-pointer"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Draft Warning Banner */}
      <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl p-4 mb-6 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span><strong>Modo Visualização de Rascunho:</strong> Este conteúdo de suporte técnico está sendo atualizado e será oficializado no lançamento.</span>
        </div>
        <button
          onClick={() => setShowDraft(false)}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors text-[11px] shrink-0 self-start sm:self-center cursor-pointer"
        >
          Voltar para Aviso
        </button>
      </div>
      
      {/* Header banner */}
      <div className="border-b border-slate-100 pb-8 mb-10 text-left">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Suporte ao Cliente & Manual
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Documentação do Prime Visita
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Encontre guias rápidos, boas práticas de visitação médica, manuais de configuração de equipe e detalhes de integração do nosso aplicativo SaaS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION - 3 Columns on lg */}
        <div className="lg:col-span-3 space-y-5 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60 lg:sticky lg:top-24">
          
          {/* Interactive Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar guia ou comando..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
              id="docs-search-input"
            />
          </div>

          {/* Navigation categories and sections */}
          <div className="space-y-4">
            {categories.map(category => {
              // Get sections for this category, matching search query if active
              const categorySections = filteredSections.filter(sec => sec.category === category);
              
              if (categorySections.length === 0) return null;

              return (
                <div key={category} className="space-y-1.5 text-left">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2">
                    {category}
                  </h3>
                  <div className="space-y-0.5">
                    {categorySections.map(sec => {
                      const isActive = sec.id === activeSection.id;
                      return (
                        <button
                          key={sec.id}
                          id={`docs-nav-sec-${sec.id}`}
                          onClick={() => setActiveSectionId(sec.id)}
                          className={`w-full px-3 py-2 text-xs rounded-lg font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-semibold shadow-3xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                          }`}
                        >
                          <span className="truncate">{sec.title}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredSections.length === 0 && (
              <div className="p-4 text-center space-y-2 text-slate-500">
                <AlertCircle className="w-6 h-6 mx-auto text-slate-300" />
                <p className="text-xs">Nenhum documento encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* DOCUMENT READING PANE - 9 Columns on lg */}
        <div className="lg:col-span-9 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-left space-y-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">{activeSection.category}</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-blue-600 font-semibold">{activeSection.title}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeSection.title}
              </h2>

              {/* Main Markdown/Text Content parsed gracefully */}
              <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-sans border-b border-slate-100 pb-6">
                {activeSection.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-base font-bold text-slate-900 pt-3 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('* **') || paragraph.startsWith('*')) {
                    // It's a list
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                        {paragraph.split('\n').map((li, liIndex) => (
                          <li key={liIndex} className="text-slate-600">
                            {li.replace(/^\*\s*/, '').trim().split('**').map((part, pIdx) => {
                              return pIdx % 2 === 1 ? <strong key={pIdx} className="text-slate-950 font-semibold">{part}</strong> : part;
                            })}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Normal paragraph, might have bullet elements or bold tags
                  return (
                    <p key={index} className="whitespace-pre-line text-xs sm:text-sm">
                      {paragraph.split('**').map((chunk, chunkIdx) => {
                        // alternate between normal text and bold text
                        if (chunkIdx % 2 === 1) {
                          return <strong key={chunkIdx} className="text-slate-950 font-semibold">{chunk}</strong>;
                        }
                        return chunk;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Dynamic Code / Schema Block */}
              {activeSection.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900/5 px-4 py-2 rounded-t-xl border-x border-t border-slate-200">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Exemplo ({activeSection.lang || 'code'})
                    </span>
                    <button
                      onClick={() => handleCopyCode(activeSection.codeSnippet!, activeSection.id)}
                      className="text-slate-500 hover:text-blue-600 flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {copiedId === activeSection.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-slate-950 text-slate-100 p-4 rounded-b-xl overflow-x-auto text-xs font-mono shadow-inner border border-slate-800 text-left leading-relaxed">
                    <code>{activeSection.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Helpful footer alert */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3 mt-6">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Precisa de suporte personalizado?</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    Essa documentação descreve cenários hipotéticos de uso. Para integrações customizadas ou dúvidas sobre o nosso PWA, contate nossa equipe técnica de suporte.
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
