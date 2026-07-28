'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, Scale, ChevronRight, AlertTriangle, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

export const TermsView: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const sections = [
    { id: 'acceptance', title: '1. Aceitação dos Termos' },
    { id: 'licenses', title: '2. Licenciamento de Uso (SaaS)' },
    { id: 'subscriptions', title: '3. Assinatura e Forma de Pagamento' },
    { id: 'refunds', title: '4. Reajustes, Arrependimento e Cancelamento' },
    { id: 'sandbox', title: '5. Termos do Programa de Sandbox' },
    { id: 'liability', title: '6. Limitação de Responsabilidade' },
    { id: 'conduct', title: '7. Conduta e Uso Aceitável' },
    { id: 'forum', title: '8. Legislação e Foro Eleito' }
  ];

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider font-mono">
          <Scale className="w-3.5 h-3.5 text-blue-500" />
          Regulamento Técnico
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Termos de Uso e Contrato de Licença
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Este documento constitui o Contrato de Licença de Uso de Software por Adesão ("Termos de Uso") entre você (Pessoa Física ou Jurídica) e a plataforma Prime Visita. Leia atentamente as regras comerciais e de pagamento.
        </p>
        <p className="text-xs text-slate-400 font-mono">Última atualização: 09 de Julho de 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-left">
          <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider px-3 pb-2 border-b border-slate-200/60 mb-3">
            Seções do Contrato
          </h3>
          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSectionClick(sec.id)}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{sec.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${activeSection === sec.id ? 'text-white' : 'text-slate-400'}`} />
              </button>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-slate-200 mt-4 text-center">
            <button
              onClick={() => {
                router.push('/privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Ver Política de Privacidade →
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-3xs text-left space-y-10">
          
          {/* Section 1 */}
          <section id="acceptance" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">1.</span> Aceitação dos Termos e Capacidade Civil
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Ao clicar em "Aceitar", assinar um plano de assinatura, ou utilizar a Sandbox de testes do <strong>Prime Visita</strong>, o Usuário expressa sua concordância integral, irrestrita e irrevogável com os presentes termos de uso comercial de software.
              </p>
              <p>
                Caso você esteja representando uma Pessoa Jurídica (como uma clínica, laboratório ou distribuidora de saúde), você declara possuir poderes estatutários e capacidade civil plena para vincular referida entidade ao cumprimento de todas as obrigações financeiras e operacionais descritas neste Contrato.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="licenses" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">2.</span> Licenciamento de Uso de Software (SaaS)
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                O Prime Visita concede ao Contratante uma licença temporária, revogável, não-exclusiva e intransferível de uso do software como serviço (SaaS), de acordo com o limite de representantes de campo associados ao plano contratado.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li><strong className="text-slate-700">Propriedade Intelectual:</strong> O código-fonte, algoritmos de otimização de rotas no mapa, bancos de dados, logotipos e telas de design permanecem sob propriedade intelectual exclusiva do Prime Visita.</li>
                <li><strong className="text-slate-700">Engenharia Reversa:</strong> É expressamente vedada a cópia, modificação, engenharia reversa, sublicenciamento ou extração do código-fonte proprietário da plataforma.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="subscriptions" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">3.</span> Modalidades de Assinatura, Recorrência e Cobrança
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>
                O uso comercial pleno do Prime Visita está condicionado ao pagamento prévio e recorrente de taxas de assinatura. Nossos modelos de cobrança regem-se pelas seguintes premissas financeiras:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Fluxo de Recorrência
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    As assinaturas ocorrem de forma recorrente em ciclos <strong>mensais</strong> ou <strong>anuais</strong> (conforme selecionado no Checkout). O faturamento automático é processado no cartão de crédito fornecido no início de cada novo ciclo de faturamento contratual.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                    Inadimplência e Bloqueio
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Caso a transação de faturamento automático no cartão de crédito seja recusada pelo banco emissor, o sistema tentará o re-processamento em até 3 oportunidades subsequentes. Havendo falha definitiva após 7 dias de atraso, o acesso administrativo e dos representantes será temporariamente suspenso até a regularização do débito.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                O pagamento de taxas associadas ao Prime Visita compreende o uso do software em nuvem, armazenamento de dados sob limites do plano e suporte técnico. Tarifas operacionais extras decorrentes do uso de mapas de terceiros (Google Maps Platform) além do pacote previsto no plano corporativo são de responsabilidade do contratante.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="refunds" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">4.</span> Reajustes, Arrependimento e Cancelamento de Contrato
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Com base na integridade comercial, detalhamos as cláusulas resolutórias de distratos, cancelamentos e taxas aplicáveis:
              </p>
              <ul className="list-decimal pl-5 space-y-2.5 text-slate-500">
                <li>
                  <strong className="text-slate-700">Direito de Arrependimento (Artigo 49 do CDC):</strong> Ao contratar qualquer plano de assinatura pela primeira vez na plataforma, o contratante Pessoa Física possui o prazo de até 7 (sete) dias corridos a contar da data de confirmação do pagamento para exercer seu arrependimento. Nestes casos, o reembolso integral de valores pagos será estornado via gateway oficial de pagamentos.
                </li>
                <li>
                  <strong className="text-slate-700">Cancelamento voluntário de recorrência:</strong> O contratante poderá requerer o cancelamento voluntário de sua assinatura a qualquer tempo, diretamente pelo painel administrativo da ferramenta ou mediante e-mail formal enviado ao suporte. Uma vez cancelada a assinatura, o serviço continuará disponível até o final do período vigente já faturado, não incidindo reembolso proporcional retroativo de meses não utilizados.
                </li>
                <li>
                  <strong className="text-slate-700">Reajustes Anuais:</strong> Os valores vigentes dos planos comerciais poderão sofrer atualizações financeiras a cada intervalo de 12 meses, calculados preferencialmente com base na variação do índice acumulado do IPCA/IBGE ou IGP-M/FGV do período. Qualquer alteração será notificada formalmente ao e-mail cadastrado com no mínimo 30 dias de antecedência.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sandbox" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">5.</span> Condições do Programa Sandbox
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                O Programa de Sandbox e os testes realizados no ambiente de demonstração constituem uma cortesia técnica não-onerosa disponibilizada durante o período de testes do sistema.
              </p>
              <p>
                Os dados inseridos na Sandbox possuem caráter estritamente fictício. O Prime Visita reserva-se o direito de resetar periodicamente os bancos de dados do ambiente Sandbox, alterar APIs temporárias e descontinuar chaves de teste sem aviso prévio. Nenhuma indenização por dados perdidos será devida em relação à Sandbox de testes.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="liability" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">6.</span> Limitação de Responsabilidade Civil e Comercial
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                O Prime Visita não se responsabiliza pelas seguintes ocorrências de força maior ou ações de terceiros:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-500 font-medium">
                <li>Decisões de negócios ou perdas financeiras resultantes de roteiros incorretos, atrasos ou ausências de visitação por parte dos representantes de campo.</li>
                <li>Falta de rede de dados (internet móvel) que impeça a sincronização offline temporária no dispositivo do representante na rua.</li>
                <li>Instabilidades temporárias nas APIs de roteamento fornecidas por terceiros (ex: Google Maps, Mapbox, OpenStreetMap).</li>
                <li>Erros de digitação ou cadastro inconsistente de endereços ou de CRMs médicos inseridos pelos administradores do cliente contratante.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="conduct" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">7.</span> Diretrizes de Conduta e Uso Aceitável
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Para assegurar a integridade e segurança de todos os clientes hospedados em nosso ecossistema compartilhado em nuvem, o Usuário concorda em não praticar os seguintes comportamentos proibidos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li>Inserir informações falsas, CRMs inexistentes, ou simular atividades fraudulentas de visitas para adulterar métricas geográficas.</li>
                <li>Utilizar ferramentas de automação, scrapers, crawlers ou bots para copiar conteúdos estruturados, endereços ou dados de médicos de outros usuários.</li>
                <li>Saturar ou aplicar ataques de negação de serviço (DDoS) contra os servidores do Prime Visita.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="forum" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">8.</span> Legislação Aplicável e Foro de Eleição
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Este Contrato de Licença de Uso de Software rege-se de acordo com as leis vigentes na República Federativa do Brasil, em especial a Lei de Software (Lei nº 9.609/1998) e o Código de Defesa do Consumidor (Lei nº 8.078/1990).
              </p>
              <p>
                Fica eleito, com exclusão de qualquer outro foro por mais privilegiado que seja, o Foro Central da Comarca de São Paulo/SP como o único competente para dirimir quaisquer dúvidas, controvérsias judiciais ou disputas interpretativas oriundas do uso comercial da plataforma Prime Visita.
              </p>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
};
