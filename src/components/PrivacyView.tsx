'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Shield, Lock, FileText, Check, Calendar, AlertCircle, Eye, ChevronRight } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: '1. Introdução e Escopo' },
    { id: 'lgpd', title: '2. Enquadramento Legal (LGPD)' },
    { id: 'data-collect', title: '3. Dados Coletados e Finalidade' },
    { id: 'location', title: '4. Geolocalização e Geolocalização de Campo' },
    { id: 'payments', title: '5. Pagamentos e Cobrança' },
    { id: 'security', title: '6. Segurança e Armazenamento' },
    { id: 'rights', title: '7. Seus Direitos (Art. 18 LGPD)' },
    { id: 'contact', title: '8. Canal de Comunicação e DPO' }
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
          <Shield className="w-3.5 h-3.5 text-blue-500" />
          Conformidade de Dados
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Política de Privacidade e Proteção de Dados
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Esta Política de Privacidade regula como o Prime Visita coleta, processa, armazena e protege as informações de sua empresa, representantes de campo e dados de visitação médica, de acordo com a legislação brasileira vigente.
        </p>
        <p className="text-xs text-slate-400 font-mono">Última atualização: 09 de Julho de 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-left">
          <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider px-3 pb-2 border-b border-slate-200/60 mb-3">
            Sumário da Política
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
                router.push('/terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Ver Termos de Uso →
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-3xs text-left space-y-10">
          
          {/* Section 1 */}
          <section id="intro" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">1.</span> Introdução e Escopo
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                O <strong>Prime Visita</strong>, operado pela pessoa jurídica licenciante do software, compromete-se com a segurança dos dados pessoais dos Usuários e dos contatos médicos registrados no sistema. 
              </p>
              <p>
                Esta Política aplica-se a todos os serviços fornecidos na modalidade SaaS (Software as a Service) por meio de plataformas web, aplicativos instaláveis offline (PWA) e APIs de comunicação associadas. Ao criar uma conta ou utilizar a Sandbox, você declara concordar integralmente com estes termos de tratamento.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="lgpd" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">2.</span> Enquadramento Legal e Papéis na LGPD
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>
                As atividades descritas nesta Política estão em estrito alinhamento com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong>. Definimos abaixo a divisão de responsabilidades legais estabelecidas pelo regime jurídico de proteção de dados:
              </p>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">O</div>
                  <div>
                    <strong className="text-slate-800 text-xs">Prime Visita como Operador (Art. 5º, VII):</strong>
                    <p className="text-slate-500 text-xs mt-0.5">A plataforma atua exclusivamente como <strong>Operadora</strong> no tratamento dos dados de prontuário, agendamentos, visitas e médicos inseridos pelos clientes, processando-os estritamente de acordo com as instruções do cliente contratante.</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start pt-2 border-t border-slate-200/50">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">C</div>
                  <div>
                    <strong className="text-slate-800 text-xs">Sua Empresa como Controladora (Art. 5º, VI):</strong>
                    <p className="text-slate-500 text-xs mt-0.5">A instituição/empresa contratante dos nossos planos de assinatura é a <strong>Controladora</strong> de dados dos seus representantes e médicos parceiros cadastrados. Cabe ao Controlador garantir que possui base legal legítima (consentimento ou legítimo interesse) para registrar os dados na ferramenta.</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                Aviso sobre Dados de Saúde: O Prime Visita não atua como prontuário de pacientes finais, sendo estritamente vedada a inserção de dados clínicos sensíveis de pacientes de terceiros sem respaldo específico de segurança.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="data-collect" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">3.</span> Dados Coletados e Finalidade do Tratamento
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>O Prime Visita realiza a coleta de dados estruturada em três grupos principais:</p>
              
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-semibold text-slate-700">Categoria</th>
                      <th className="p-3 font-semibold text-slate-700">Dados Coletados</th>
                      <th className="p-3 font-semibold text-slate-700">Finalidade Principal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Administrativo</td>
                      <td className="p-3">Nome, e-mail corporativo, CNPJ, telefone, endereço comercial e dados de cartão de crédito.</td>
                      <td className="p-3">Faturamento das mensalidades/anuidades, emissão de Notas Fiscais e comunicação técnica.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Representantes</td>
                      <td className="p-3">Nome, credencial, e-mail, fotos de perfil (opcional) e logs de login.</td>
                      <td className="p-3">Auditoria de acessos, segurança da conta e atribuição de roteiros de visitas no mapa.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Médicos de Campo</td>
                      <td className="p-3">Nome, CRM (com respectivo Estado), Especialidade, Endereço do Consultório e Histórico de Visitas.</td>
                      <td className="p-3">Montagem automática de rotas logísticas e organização do histórico de visitação comercial.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="location" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">4.</span> Geolocalização e Geolocalização de Campo
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                O software possui funcionalidades voltadas à otimização e validação física de visitas (recursos de Check-in e Check-out com tecnologia GPS).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-500">
                <li>
                  <strong className="text-slate-700">Rastreamento Voluntário:</strong> A geolocalização do representante de campo é consultada temporariamente apenas no instante exato de início (Check-in) ou término (Check-out) de uma visita, de modo a validar que o representante encontra-se no consultório do médico.
                </li>
                <li>
                  <strong className="text-slate-700">Sem rastreamento contínuo em segundo plano:</strong> O Prime Visita não rastreia o dispositivo do usuário de forma contínua ou silenciosa em segundo plano. Respeitamos a privacidade fora do horário comercial de trabalho.
                </li>
                <li>
                  <strong className="text-slate-700">Permissões de Navegador/Dispositivo:</strong> O uso do recurso depende da permissão explícita concedida pelo Usuário no sistema operacional do aparelho celular ou computador.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="payments" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">5.</span> Transações Financeiras e Cobranças
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                A segurança financeira é uma prioridade do Prime Visita. Todas as transações financeiras e coletas de dados de pagamento estão sujeitas às seguintes garantias regulatórias:
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200/60 space-y-3 text-xs">
                <div className="flex gap-2.5">
                  <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Criptografia de Cartões de Crédito (PCI-DSS):</span>
                    <p className="text-slate-500 mt-0.5">O Prime Visita não armazena chaves ou números de cartão de crédito brutos em seus próprios servidores de banco de dados. O faturamento é realizado via gateways de pagamentos integrados de alta segurança (como Stripe ou Iugu), que utilizam criptografia de ponta e tokens tokenizados conformes com a norma PCI-DSS.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 pt-3 border-t border-slate-200/50">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Armazenamento de Dados de Assinaturas:</span>
                    <p className="text-slate-500 mt-0.5">As informações coletadas necessárias para o processamento de recorrências (nome, CPF/CNPJ, bandeira do cartão e os 4 últimos dígitos do cartão para exibição administrativa) são mantidas estritamente enquanto a assinatura estiver ativa para o cumprimento do contrato mercantil.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="security" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">6.</span> Segurança, Backups e Integridade dos Dados
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Adotamos controles administrativos e tecnológicos rigorosos para blindar o sistema contra acessos não autorizados, perdas acidentais ou violações de dados:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                <li><strong className="text-slate-700">Tráfego Criptografado:</strong> Todas as comunicações entre o computador ou smartphone e nossos servidores em nuvem são protegidas com certificados SSL/TLS padrão bancário (https).</li>
                <li><strong className="text-slate-700">Bancos de Dados Isolados:</strong> Em planos Corporativos, garantimos o isolamento lógico total (multitenancy) para evitar que dados cruciais de um cliente sejam visualizados ou cruzados com outros usuários.</li>
                <li><strong className="text-slate-700">Backups Automáticos:</strong> Realizamos rotinas diárias automáticas de redundância criptografada para proteger o histórico de relacionamento de médicos contra falhas catastróficas de hardware.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="rights" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">7.</span> Direitos do Usuário (Art. 18 LGPD)
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                Como titular de dados pessoais processados pelo Prime Visita na posição de Controladores Administrativos, você possui garantias constitucionais e pode requerer, a qualquer tempo:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Confirmação da existência de tratamento dos dados.',
                  'Acesso livre e simplificado aos seus dados em formato estruturado.',
                  'Correção de informações incompletas, inexatas ou desatualizadas.',
                  'Eliminação e bloqueio dos dados (salvo por obrigação legal e fiscal).',
                  'Revogação facilitada de consentimentos previamente concedidos.',
                  'Portabilidade de dados cadastrais a outros fornecedores de software.'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[3px]" />
                    <span className="text-xs text-slate-600 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="contact" className="scroll-mt-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-blue-600">8.</span> Canal de Atendimento e Encarregado (DPO)
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
              <p>
                Caso surjam quaisquer dúvidas em relação ao processamento, retenção, relatórios de impacto ou exclusão definitiva de seus dados cadastrais, entre em contato imediatamente com o nosso Encarregado pelo Tratamento de Dados Pessoais (Data Protection Officer - DPO):
              </p>
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-1.5 font-mono text-xs border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">CANAL DO DPO PRIME VISITA</p>
                <p className="font-bold text-blue-400">E-mail: dpo@primevisita.com.br</p>
                <p className="text-slate-400">Assunto sugerido: Solicitação LGPD - Privacidade de Dados</p>
                <p className="text-slate-400 text-[10px] mt-2">Prazo legal médio de retorno: Até 15 dias úteis, de acordo com as deliberações da ANPD (Autoridade Nacional de Proteção de Dados).</p>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
};
