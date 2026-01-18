# Resumo da Arquitetura - mycash+ Dashboard

## 📋 Compreensão do Projeto

### Objetivo
Implementar dashboard financeiro completo (mycash+) seguindo design do Figma, com foco em:
- Layout fluido e responsivo (mobile-first)
- Design system baseado em tokens (semânticos → primitivos)
- Componentização reutilizável
- Performance e UX otimizadas

---

## 🏗️ Arquitetura Proposta

### Estrutura de Pastas

```
src/
├── components/
│   ├── layout/           # Componentes de layout (Sidebar, Headers)
│   ├── dashboard/        # Componentes específicos do dashboard
│   ├── ui/               # Componentes UI reutilizáveis (Button, Input, Card)
│   └── shared/            # Componentes compartilhados (formatters)
├── pages/                # Páginas principais (Dashboard, Cartões, Transações, Perfil)
├── hooks/                # Custom hooks (lógica de negócio)
├── services/             # Comunicação com API/Supabase
├── types/                # TypeScript types/interfaces
├── styles/               # Tokens CSS e estilos globais
└── utils/                # Funções utilitárias
```

### Hierarquia de Componentes

```
Layout (Sidebar + Header)
  └── Page (Dashboard)
      ├── HeaderDesktop
      ├── CategoryCards (4x)
      ├── FinancialCards (3x)
      ├── FinancialFlowChart
      ├── CardsAccounts
      ├── UpcomingExpenses
      └── DetailedStatement
```

### Princípios de Componentização

1. **Atomic Design**
   - **Átomos**: Button, Input, Avatar, ProgressCircle
   - **Moléculas**: CategoryCard, FinancialCard
   - **Organismos**: FinancialFlowChart, DetailedStatement
   - **Templates**: Dashboard layout
   - **Páginas**: Dashboard, Cartões, Transações, Perfil

2. **Separação de Responsabilidades**
   - **Componentes**: Apenas renderização e interação UI
   - **Hooks**: Lógica de estado e efeitos
   - **Services**: Chamadas de API e manipulação de dados
   - **Types**: Definições TypeScript

3. **Reutilização**
   - Componentes UI genéricos e configuráveis
   - Componentes Dashboard específicos mas modulares
   - Hooks compartilhados para lógica comum

---

## 🎨 Design System & Tokens

### Hierarquia de Variáveis (OBRIGATÓRIA)

```
1º Prioridade: Variável SEMÂNTICA
   → --color-primary, --spacing-container, --text-heading

2º Prioridade: Variável PRIMITIVA  
   → --gray-900, --lime-500, --spacing-md

3º Prioridade: CONVERSÃO INTELIGENTE
   → #E5E5E5 → --gray-200 (primitiva mais próxima)
   → 28px → --spacing-lg (token mais próximo)

4º NUNCA: Valores hardcoded
   → #E5E5E5 ❌ | 28px ❌
```

### Tokens Identificados (Aguardando Figma para valores exatos)

**Cores:**
- Semânticas: `--color-primary`, `--color-success`, `--color-danger`, `--color-text-primary`, `--color-text-secondary`
- Primitivas: `--gray-*`, `--lime-*`, `--blue-*`, `--red-*`

**Espaçamentos:**
- Semânticas: `--spacing-container`, `--spacing-section`
- Primitivas: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`

**Tipografia:**
- `--font-family-base`
- `--font-size-*` (xs, sm, base, lg, xl, 2xl, 3xl)
- `--font-weight-*` (normal, semibold, bold)
- `--line-height-*`

**Shapes:**
- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--radius-full` (para círculos)

---

## 📱 Responsividade

### Breakpoints
- **Mobile (base)**: < 768px
- **Tablet**: ≥ 768px e < 1280px
- **Desktop**: ≥ 1280px e < 1920px
- **Wide/4K**: ≥ 1920px

### Estratégia Mobile-First
- Design base sempre mobile
- Breakpoints apenas evoluem o layout
- Grids adaptativos: 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)

### Sidebar & Header
- **Desktop (≥1280px)**: Sidebar visível (expandida/colapsada), Header desktop
- **Mobile/Tablet (<1280px)**: Sidebar NÃO renderiza, Header mobile com drawer

---

## 🔄 Fluxo de Dados

```
Supabase/API
  ↓
Services (api.ts, supabase.ts)
  ↓
Hooks (useTransactions, useFinancialData)
  ↓
Components (Dashboard, Cards)
  ↓
UI (renderização)
```

---

## ✅ Checklist de Implementação

### PROMPT 0: Análise ✅
- [x] Mapear componentes
- [x] Identificar variáveis (parcial - aguardando Figma)
- [x] Analisar navegação
- [x] Propor arquitetura

### Próximos Passos
1. **PROMPT 1**: Estrutura base (Vite, React, TS, Tailwind, tokens)
2. **PROMPT 2**: Layout desktop (Sidebar + container)
3. **PROMPT 3**: Header desktop
4. **PROMPT 4-9**: Componentes do dashboard
5. **PROMPT 10**: Header mobile
6. **PROMPT 11**: Responsividade completa

---

## 🎯 Garantias de Qualidade

- ✅ Build obrigatório antes de cada commit
- ✅ Documentação atualizada após cada prompt
- ✅ Testes em 375px, 768px, 1280px, 1920px
- ✅ Hierarquia de variáveis respeitada
- ✅ Layout 100% fluido (sem overflow horizontal)
- ✅ Touch targets mínimos (44x44px)
- ✅ Acessibilidade básica (semântica HTML, ARIA quando necessário)

---

## 📝 Notas Importantes

1. **Fonte de Verdade**: Figma
2. **Hierarquia de Variáveis**: Sempre respeitada (semântica → primitiva → conversão)
3. **Nunca Hardcoded**: Todos os valores devem usar tokens
4. **Mobile-First**: Design base sempre mobile
5. **Layout Fluido**: Containers com width: 100%, max-width para limitação
