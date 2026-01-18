# PROMPT 0: Análise Completa - mycash+ Dashboard

## 1. MAPEAMENTO DE COMPONENTES VISUAIS

### Dashboard (Tela Principal)

#### Sidebar (Navegação Lateral)
- **Logo**: "Mycash+" em negrito
- **Navegação**:
  - Botão "Home" (ativo - fundo verde limão, texto branco, ícone casa)
  - Link "Cartões" (texto cinza, ícone cartão)
- **Perfil do Usuário** (rodapé):
  - Avatar circular
  - Nome: "Felipe Oliveira" (negrito)
  - Email: "felipeoliveira@gmail.com" (cinza claro)

#### Header Principal
- **Esquerda**:
  - Ícone seta esquerda
  - Campo "Pesquisar" com ícone lupa
  - Ícone filtro/ordenação
  - Seletor de data: "01 Jan - 31 Jan 2026" com ícone calendário
- **Centro-Direita**:
  - 3 avatares circulares de membros
  - Ícone "+" em círculo
- **Extrema Direita**:
  - Botão "Nova transação" (fundo escuro, texto branco, ícone "+")

#### Cards de Categorias (Primeira Linha)
- 4 cards quadrados com cantos arredondados
- Cada card contém:
  - Indicador de progresso circular com porcentagem
  - Valor monetário
  - Categoria:
    1. **Aluguel**: 25% (verde), R$ 4.000,00
    2. **Alimentação**: 15% (verde), R$ 2.000,00
    3. **Mercado**: 5% (verde), R$ 1.500,00
    4. **Academia**: 3% (verde), R$ 120,00

#### Cards Financeiros (Segunda Linha)
- 3 cards retangulares:
  1. **Saldo total**: Ícone $, "R$ 2.000,00" (azul, destaque)
  2. **Receitas**: Seta verde para baixo, "R$ 12.000,00" (preto)
  3. **Despesas**: Seta vermelha para cima, "R$ 10.000,00" (preto)

#### Fluxo Financeiro (Painel Esquerdo - Meio)
- Título: "Fluxo financeiro" com ícone gráfico de linha
- Gráfico de área:
  - Linha verde limão: Receitas
  - Linha vermelha: Despesas
  - Eixo X: Meses (JAN a DEZ)
  - Eixo Y: R$ 0,00 a R$ 17.500 (incrementos de R$ 2.500)
  - Legenda: "Receitas" (ponto verde), "Despesas" (ponto vermelho)

#### Cards & Contas (Painel Direito Superior)
- Título: "Cards & contas" com ícone cartão
- Ações: Ícone "+" e seta direita
- Lista de 3 contas:
  1. **Nubank**: Logo roxo "nu", R$ 120,00, "Vence dia 10", "**** 5897"
  2. **Inter**: Logo laranja "inter", R$ 2.300,00, "Vence dia 21", "**** 5897"
  3. **Picpay**: Logo verde "P", R$ 17.000,00, "Vence dia 12", "**** 5897"

#### Próximas Despesas (Painel Direito Inferior)
- Título: "Próximas despesas" com ícone cartão
- Ação: Ícone "+"
- Lista de 5 itens idênticos:
  - "Conta de Luz"
  - "Vence dia 21/01"
  - "Crédito Nubank **** 5897"
  - R$ 154,00
  - Ícone checkmark verde

#### Extrato Detalhado (Painel Inferior)
- Título: "Extrato detalhado" com ícone documento
- **Controles**:
  - Campo "Buscar lançamentos" com ícone lupa
  - Dropdown "Despesas"
- **Tabela** com colunas:
  - **Membro**: Avatares circulares
  - **Datas**: "17/01/2026"
  - **Descrição**: Ícone seta para cima + texto
    - "Conta de água"
    - "Conta de Luz"
    - "Passeio no parque"
  - **Categorias**: "Manutenção", "Lazer"
  - **Conta/cartão**: "Conta corrente", "Cartão XP"
  - **Parcelas**: "-", "1/1"
  - **Valor**: R$ 100,00, R$ 150,00, R$ 750,00
- **Paginação**:
  - "Mostrando 1 a 5 de 17"
  - Números: "1 2 3 4 5" com setas

---

## 2. VARIÁVEIS DO DESIGN SYSTEM

### Cores Identificadas (Inferidas da Imagem)
- **Background**: Branco (#FFFFFF)
- **Texto Principal**: Cinza escuro (~#333333)
- **Texto Secundário**: Cinza médio (~#666666)
- **Acento Verde Limão**: ~#A3FF00 (Home ativo, gráfico receitas)
- **Azul**: ~#007BFF (Saldo total)
- **Vermelho**: ~#DC3545 (Despesas, gráfico despesas)
- **Bordas/Dividers**: Cinza claro (~#E0E0E0)
- **Botão Escuro**: ~#343A40 (Nova transação)

### Espaçamentos
- Padding consistente em cards
- Margens entre seções (sistema de grid)
- Espaçamento entre ícones e texto

### Tipografia
- Fonte: Sans-serif (Inter, Roboto ou similar)
- Tamanhos variados: títulos grandes, valores muito grandes, labels pequenos
- Pesos: Regular, Semi-bold, Bold

### Shapes
- Border radius: ~8px ou 12px (cards, botões, inputs)
- Elementos circulares: avatares, indicadores de progresso, pontos de legenda

---

## 3. ESTRUTURA DE NAVEGAÇÃO

### Sidebar Desktop (≥1280px)
- **Estado Expandido**: Larga, com texto visível
- **Estado Colapsado**: Estreita, apenas ícones
- **Comportamento**: Empurra conteúdo (não sobrepõe)
- **Elementos**:
  - Logo
  - Links de navegação
  - Perfil do usuário (rodapé)

### Header Mobile (<1280px)
- **Não renderiza Sidebar**
- **Header Mobile contém**:
  - Botão menu (abre drawer)
  - Ações principais
- **Menu como overlay/drawer**

---

## 4. PROPOSTA DE ARQUITETURA

### Estrutura de Pastas
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── HeaderDesktop.tsx
│   │   ├── HeaderMobile.tsx
│   │   └── Layout.tsx
│   ├── dashboard/
│   │   ├── CategoryCard.tsx
│   │   ├── FinancialCard.tsx
│   │   ├── FinancialFlowChart.tsx
│   │   ├── CardsAccounts.tsx
│   │   ├── UpcomingExpenses.tsx
│   │   └── DetailedStatement.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   └── ProgressCircle.tsx
│   └── shared/
│       ├── CurrencyFormat.tsx
│       └── DateFormat.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Cards.tsx
│   ├── Transactions.tsx
│   └── Profile.tsx
├── hooks/
│   ├── useSidebar.ts
│   ├── useTransactions.ts
│   └── useFinancialData.ts
├── services/
│   ├── api.ts
│   └── supabase.ts
├── types/
│   ├── transaction.ts
│   ├── card.ts
│   └── user.ts
├── styles/
│   ├── tokens.css (variáveis CSS)
│   └── globals.css
└── utils/
    ├── formatters.ts
    └── constants.ts
```

### Hierarquia de Componentes
1. **Layout** (Sidebar, Header) → Container principal
2. **Páginas** → Compõem componentes de dashboard
3. **Componentes Dashboard** → Lógica de apresentação
4. **UI Components** → Componentes reutilizáveis
5. **Hooks** → Lógica de negócio
6. **Services** → Comunicação com API/Supabase

### Estratégia de Componentização
- **Atomic Design**: UI components (átomos) → Dashboard components (moléculas) → Pages (organismos)
- **Separação de Responsabilidades**: 
  - Componentes apenas renderizam
  - Hooks contêm lógica
  - Services fazem chamadas de API
- **Reutilização**: Componentes UI genéricos, componentes Dashboard específicos
- **Responsividade**: Mobile-first, breakpoints explícitos

---

## PRÓXIMOS PASSOS
Aguardando acesso ao Figma para obter variáveis exatas do design system.
