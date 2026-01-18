# mycash+ Dashboard

Sistema de gestão financeira familiar desenvolvido com React + TypeScript + Vite + Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização utility-first
- **React Router** - Roteamento
- **Recharts** - Gráficos
- **date-fns** - Manipulação de datas
- **UUID** - Geração de IDs únicos

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, Layout
│   ├── dashboard/       # Componentes do dashboard
│   ├── modals/          # Modais do sistema
│   ├── profile/         # Componentes de perfil
│   └── ui/              # Componentes UI reutilizáveis
├── contexts/            # Context API (FinanceContext)
├── hooks/               # Custom hooks
├── pages/               # Páginas principais
├── types/               # TypeScript types
├── utils/               # Funções utilitárias
└── styles/              # CSS global e tokens
```

## 🎨 Design System

O projeto utiliza um sistema de tokens baseado em variáveis CSS:

- **Semânticas**: `--color-primary`, `--spacing-container`
- **Primitivas**: `--gray-900`, `--lime-400`, `--spacing-md`

Hierarquia: Semântica → Primitiva → Conversão (nunca hardcoded)

## 📱 Responsividade

- **Mobile (base)**: < 768px
- **Tablet**: ≥ 768px e < 1280px
- **Desktop**: ≥ 1280px e < 1920px
- **Wide/4K**: ≥ 1920px

## 🔑 Funcionalidades Principais

- ✅ Dashboard com cards de resumo financeiro
- ✅ Tabela de transações com filtros e paginação
- ✅ Widget de cartões de crédito
- ✅ Widget de próximas despesas
- ✅ Sidebar desktop com estados expandido/colapsado
- ✅ Header mobile com menu dropdown
- ✅ Context global para gerenciamento de estado
- ✅ Sistema de filtros (membro, período, tipo, busca)

## 📝 Notas

- Estado gerenciado via React Context (sem localStorage)
- Dados mock pré-carregados para desenvolvimento
- Preparado para integração futura com Supabase

## 🛠️ Próximos Passos

- [ ] Implementar modais de criação/edição
- [ ] Adicionar gráficos de fluxo financeiro
- [ ] Carrossel de categorias com gráficos donut
- [ ] Integração com Supabase
- [ ] Sistema de autenticação
- [ ] Exportação de dados (CSV/PDF)

## 📄 Licença

MIT
