import { Feature, DocSection, FAQItem } from './types';

export const features: Feature[] = [
  {
    id: 'doctors',
    icon: 'Users',
    title: 'Cadastro Unificado de Médicos',
    description: 'Centralize dados de contato, especialidade, clínica de atuação e histórico de relacionamentos em um único prontuário corporativo.',
    badge: 'Organização'
  },
  {
    id: 'priority',
    icon: 'Sliders',
    title: 'Categorização por Prioridade',
    description: 'Classifique médicos e clínicas com etiquetas inteligentes para priorizar as visitas de maior retorno estratégico.',
    badge: 'Estratégia'
  },
  {
    id: 'calendar',
    icon: 'Calendar',
    title: 'Agenda Inteligente de Visitas',
    description: 'Agende compromissos de forma integrada e receba lembretes automáticos para nunca perder um encontro importante.',
    badge: 'Produtividade'
  },
  {
    id: 'checkin',
    icon: 'MapPin',
    title: 'Registro de Visitas e Notas',
    description: 'Registre o andamento da visita com relatórios rápidos em campo, anotações de amostras entregues e necessidades identificadas.',
    badge: 'Mobilidade'
  },
  {
    id: 'analytics',
    icon: 'BarChart3',
    title: 'Dashboards em Tempo Real',
    description: 'Acompanhe metas de visitação, taxas de conversão de relacionamento e cobertura geográfica da sua equipe com gráficos modernos.',
    badge: 'Indicadores'
  },
  {
    id: 'multi-tenant',
    icon: 'Building2',
    title: 'Estrutura Multi-Tenant',
    description: 'Plataforma preparada para múltiplas empresas ou filiais, garantindo isolamento total de dados e segurança de nível corporativo.',
    badge: 'Segurança'
  }
];

export const docSections: DocSection[] = [
  {
    id: 'introducao',
    category: 'Começando',
    title: 'Visão Geral da Plataforma',
    content: `O **Prime Visita** é um ecossistema SaaS desenvolvido para eliminar a dependência de planilhas e relatórios manuais no controle de visitas a médicos e parceiros de saúde.

Nossa arquitetura foi projetada para conectar:
* **Administradores**: Que gerenciam permissões e configurações globais.
* **Gestores**: Que monitoram os dashboards e indicadores de produtividade em tempo real.
* **Representantes**: Que planejam, executam e registram as visitas diretamente em campo através de dispositivos móveis.

Através do suporte a **PWA (Progressive Web App)**, os representantes contam com uma interface leve e otimizada para uso em trânsito.`,
    codeSnippet: `// Estrutura de rotas da API Prime Visita
GET /api/v1/doctors     // Lista médicos da conta
POST /api/v1/visits     // Registra uma nova visita
GET /api/v1/analytics   // Retorna dados do dashboard`,
    lang: 'javascript'
  },
  {
    id: 'instalacao',
    category: 'Começando',
    title: 'Instalação como PWA',
    content: `O Prime Visita não exige download em lojas de aplicativos como Google Play ou App Store. Ele utiliza a tecnologia PWA para ser instalado diretamente do navegador.

### No Android (Google Chrome):
1. Acesse o link exclusivo da sua empresa no navegador.
2. Toque no botão de menu (três pontos) no canto superior direito.
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
4. O ícone aparecerá instantaneamente em sua tela inicial.

### No iOS (Safari):
1. Acesse o link da plataforma.
2. Toque no botão de **"Compartilhar"** na barra inferior.
3. Role até encontrar e selecionar **"Adicionar à Tela de Início"**.
4. Toque em "Adicionar" no canto superior direito.`,
  },
  {
    id: 'cadastro',
    category: 'Uso Prático',
    title: 'Configurando Equipe e Médicos',
    content: `Antes de iniciar os agendamentos, o **Administrador** da conta deve cadastrar a base de médicos e os representantes.

1. Navegue até a seção **Médicos** no painel administrativo.
2. Clique em **"Novo Médico"**.
3. Preencha informações como: CRM, Especialidade, Endereço da Clínica e e-mail de contato.
4. Defina a **Prioridade** (A, B ou C):
   * **Prioridade A**: Visitas quinzenais.
   * **Prioridade B**: Visitas mensais.
   * **Prioridade C**: Visitas trimestrais.`,
    codeSnippet: `{
  "crm": "123456-SP",
  "nome": "Dra. Helena Souza",
  "especialidade": "Cardiologia",
  "prioridade": "A",
  "clinica": "Hospital Albert Einstein"
}`,
    lang: 'json'
  },
  {
    id: 'agendamento',
    category: 'Uso Prático',
    title: 'Planejamento e Registro de Visitas',
    content: `O representante planeja sua semana de trabalho através da **Agenda Integrada**.

### Planejamento:
1. Toque no botão **"Novo Agendamento"**.
2. Selecione o médico cadastrado, defina a data e a hora prevista.
3. O sistema enviará lembretes automáticos na manhã da visita.

### Registro (Check-in):
No momento da visita, o representante abre a agenda e registra as ocorrências:
* **Status**: Concluída, Cancelada ou Remarcada.
* **Amostras entregues**: Identifique quais amostras grátis ou materiais promocionais foram deixados com o médico.
* **Feedback do Médico**: Um breve resumo da receptividade ou feedbacks comerciais coletados.`,
  },
  {
    id: 'dashboards',
    category: 'Avançado',
    title: 'Dashboards e Métricas',
    content: `Para os gestores, o Prime Visita gera insights valiosos sobre a performance do time comercial e do relacionamento com as clínicas parceiras:

* **Taxa de Cobertura**: Percentual de médicos prioritários que foram visitados dentro do ciclo planejado.
* **Índice de Produtividade**: Média de visitas realizadas por representante ao dia ou à semana.
* **Categorias Populares**: Distribuição de visitas por especialidade médica para entender o foco das campanhas.

Todos os dados podem ser exportados em formato CSV ou planilhas Excel para consolidação com outros sistemas internos.`,
  }
];

export const faqList: FAQItem[] = [
  {
    question: 'Como funciona o teste gratuito?',
    answer: 'Oferecemos um período de teste de 14 dias sem compromisso no plano Iniciante. Não é necessário cadastrar cartão de crédito para testar. Você pode convidar até 3 representantes e avaliar todas as funcionalidades.'
  },
  {
    question: 'Os dados da minha empresa ficam seguros?',
    answer: 'Sim, tratamos a segurança como prioridade máxima. Cada empresa tem sua base de dados isolada no nível do banco de dados (multi-tenancy robusto) e todas as conexões são criptografadas via protocolo HTTPS com certificado SSL de 256 bits.'
  },
  {
    question: 'Funciona sem internet no celular?',
    answer: 'Sim! Nosso aplicativo PWA suporta salvamento local de dados em modo offline. O representante pode realizar registros de visitas e anotações mesmo sem sinal, e os dados serão sincronizados automaticamente assim que uma conexão de internet estável for detectada.'
  },
  {
    question: 'Posso migrar meus dados de planilhas atuais?',
    answer: 'Com certeza. No painel administrativo, oferecemos um importador inteligente de arquivos CSV/Excel que permite mapear suas planilhas antigas diretamente para os campos de cadastro do Prime Visita em menos de 5 minutos.'
  },
  {
    question: 'Quais são as formas de pagamento disponíveis?',
    answer: 'Aceitamos cartão de crédito, PIX e boleto bancário. Para assinaturas anuais, oferecemos faturamento corporativo mediante análise de cadastro e um desconto de 20% no valor total.'
  }
];
