# 🩺 Prime Visita — Gestão & Roteirização de Visitação Médica

O **Prime Visita** é um ecossistema inteligente de Software como Serviço (SaaS) projetado especificamente para laboratórios, indústrias farmacêuticas, distribuidoras e clínicas médicas organizarem o relacionamento de seus representantes de campo com profissionais de saúde. Ele elimina planilhas manuais e confusas, gerando inteligência geográfica, roteiros automáticos e rastreabilidade total do histórico de visitação médica.

Este repositório contém a página institucional completa de apresentação, portal técnico de documentação de APIs, simulador interativo em tempo real do painel do representante, fluxos de precificação mercantil, portal de contato, formulários de adesão segura e políticas jurídicas detalhadas.

---

## 🎨 Design & Identidade Visual

O design do Prime Visita foi concebido sob uma abordagem contemporânea com foco em clareza, confiança e legibilidade.
- **Aesthetic Pairings**: Uso da fonte **Inter** para textos gerais visando legibilidade premium, com títulos em fontes geométricas robustas.
- **Micro-Interações**: Uso de animações fluidas baseadas no `motion` (`motion/react`) para transições suaves de abas, efeitos de hover dinâmicos e abertura suave de menus.
- **Empty Canvas**: Sem excessos desnecessários. A interface utiliza espaço negativo generoso e uma paleta de cores equilibrada em tons de azul (`blue-600`), cinzas e brancos para criar um ambiente limpo e profissional focado em conversão.

---

## 📱 Responsividade (Mobile, Tablet & Desktop)

A aplicação foi rigorosamente adaptada para proporcionar uma experiência de navegação idêntica e de alta precisão em qualquer dispositivo:
- **Desktop & Telas Ultra-Wide**: Layout fluido com limites de largura (`max-w-7xl mx-auto`) para que o conteúdo não se disperse de forma artificial.
- **Tablets & iPads (Modo Retrato/Paisagem)**: Transição natural de grids de 3 colunas para 2 colunas, redimensionamento proporcional de cards e ajuste de botões de ação para clique com toque.
- **Celulares (iOS e Android)**:
  - **Menu Hambúrguer Fluido**: Barra de navegação móvel adaptada com fechamento automático no clique dos links.
  - **Touch Targets de Alta Densidade**: Todos os botões, checkboxes e seletores possuem área de toque ativa de no mínimo `44px` para fácil manipulação manual.
  - **Ajustes de Fluxos**: Formulários e simuladores adaptados com orientação vertical (`flex-col`) para evitar transbordamentos ou cortes horizontais de tela.

---

## 🚀 Funcionalidades Principais Implementadas

1. **Painel do Representante (Simulador Interativo)**:
   - Permite criar de forma lúdica novos agendamentos médicos virtuais, atribuindo especialidades e prioridades (A, B ou C).
   - Simula a conclusão e registro físico de visitas com cálculo de estatísticas de conversão em tempo real.
2. **DocsView (Manual e Referência Técnica de API)**:
   - Apresentação visual da arquitetura de integração offline, sincronização silenciosa via Service Workers e SDKs para dispositivos móveis.
3. **PricingView (Simulador de Custos Comerciais)**:
   - Exibição de planos mensais e anuais sob medida, com conversor dinâmico e integração transparente de termos de checkout.
4. **Políticas Jurídicas Completas & Conformidade**:
   - **PrivacyView (Política de Privacidade LGPD)**: Regras transparentes dividindo responsabilidades entre Controladora (Sua Empresa) e Operadora (Prime Visita) conforme o Artigo 18 da Lei Geral de Proteção de Dados (LGPD).
   - **TermsView (Termos de Uso e Pagamentos)**: Regula as assinaturas recorrentes, faturamento automático criptografado no padrão PCI-DSS, reembolso por direito de arrependimento (Art. 49 do CDC) e foro central eleito.

---

## 🛠️ Tecnologias e Dependências

- **Runtime**: Node.js & TypeScript
- **Framework & Dev Server**: Next.js (App Router) & PostCSS
- **Framework Visual**: React 18+
- **Estilização**: Tailwind CSS (Utility-First)
- **Biblioteca de Ícones**: `lucide-react` (Ícones vetoriais modernos e consistentes)
- **Animações**: `motion` (Animações de alta performance e hardware accelerated)

---

## 📁 Estrutura de Pastas e Arquivos

```bash
/src
  ├── App.tsx               # Orquestrador central de abas e estado global de navegação
  ├── main.tsx              # Ponto de entrada de renderização do React e DOM
  ├── index.css             # Importações globais do Tailwind CSS e definições de fontes
  ├── types.ts              # Declarações globais de interfaces de dados e tipos compartilhados
  ├── data.ts               # Armazenamento de dados estáticos para FAQs e listas de recursos
  └── components/           # Componentes modulares reutilizáveis
      ├── Navbar.tsx        # Menu superior responsivo com hambúrguer móvel e botões de acesso
      ├── Footer.tsx        # Rodapé corporativo com links legais de navegação rápida
      ├── HomeView.tsx      # Landing page principal, estatísticas e simulador interativo de visitas
      ├── DocsView.tsx      # Guia de documentação de integrações e APIs
      ├── PricingView.tsx   # Exibição de planos comerciais e botões de contratação
      ├── CheckoutView.tsx  # Simulador de checkout de assinaturas com pagamento seguro
      ├── ContactView.tsx   # Canal de suporte direto e ouvidoria
      ├── PrivacyView.tsx   # Portal jurídico completo de privacidade de dados (LGPD)
      ├── TermsView.tsx     # Contrato de adesão mercantil e regras de faturamento (PCI-DSS)
```

---

## 💻 Instruções de Instalação e Execução Local

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação das Dependências
Para instalar os pacotes necessários, execute:
```bash
npm install
```

### 3. Rodando o Servidor de Desenvolvimento
Inicie o servidor local na porta configurada:
```bash
npm run dev
```
O projeto estará disponível para testes em seu navegador através do endereço: `http://localhost:3000`

### 4. Executando o Linter de Validação
Verifique se existem problemas de tipagem ou sintaxe no código:
```bash
npm run lint
```

### 5. Compilação para Produção
Crie a build estática otimizada para implantação em qualquer servidor de arquivos estáticos:
```bash
npm run build
```
O resultado é gerado na pasta `dist/` (export estático do Next.js, configurado em `next.config.ts`). Para pré-visualizar localmente o conteúdo gerado:
```bash
npm start
```

---

## 🔒 Proteção Jurídica e Relações Financeiras

- **Transações Seguras**: Os dados de faturamento são transmitidos via SSL/TLS utilizando criptografia padrão AES-256 e tratados em gateways compatíveis com PCI-DSS. Os números de cartões não tocam nossos servidores internos, mitigando riscos de vazamentos.
- **Divisão de Responsabilidades sob a LGPD**:
  - Sua empresa atua como **Controladora**, possuindo total autonomia e responsabilidade sobre os dados dos médicos de campo cadastrados.
  - A plataforma Prime Visita atua como **Operadora**, fornecendo infraestrutura robusta, backups e processamento sob demanda conforme instruções estritas.
