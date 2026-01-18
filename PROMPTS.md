# Sequência de Prompts - mycash+ Dashboard

## PROMPT 0: Análise Completa ✅
**Status:** Em execução
- Mapear todos os componentes visuais das telas (Dashboard, Cartões, Transações, Perfil)
- Identificar variáveis semânticas e primitivas do design system
- Analisar estrutura de navegação (sidebar desktop, header mobile)
- Propor arquitetura de pastas e componentização

## PROMPT 1: Estrutura Base
- Configurar projeto: Vite + React + TypeScript
- Configurar Tailwind CSS com breakpoints customizados
- Criar estrutura de pastas (components, pages, hooks, services, types)
- Configurar tokens CSS do design system (cores, espaçamentos, tipografia)
- Setup inicial de roteamento

## PROMPT 2: Layout Desktop
- Implementar Sidebar desktop com estados expandido/colapsado
- Container principal responsivo
- Sistema de navegação entre seções
- Perfil do usuário na sidebar

## PROMPT 3: Header Desktop
- Barra superior com busca
- Filtros e seletor de data
- Botão "Nova transação"
- Avatares de membros e ações rápidas

## PROMPT 4: Cards de Categorias
- Grid responsivo de 4 cards (Aluguel, Alimentação, Mercado, Academia)
- Indicador de progresso circular com porcentagem
- Valores monetários formatados
- Cores por categoria

## PROMPT 5: Cards Financeiros
- Card "Saldo Total" com destaque azul
- Card "Receitas" com ícone verde
- Card "Despesas" com ícone vermelho
- Formatação monetária e hierarquia visual

## PROMPT 6: Gráfico Fluxo Financeiro
- Componente de área chart (receitas vs despesas)
- Eixo X: meses (JAN a DEZ)
- Eixo Y: valores monetários
- Legenda e cores diferenciadas
- Biblioteca de gráficos (ex: Recharts, Chart.js)

## PROMPT 7: Cards & Contas
- Lista de cartões bancários
- Logos dos bancos (Nubank, Inter, Picpay)
- Valores e datas de vencimento
- Números mascarados de cartão
- Ações (adicionar, ver detalhes)

## PROMPT 8: Próximas Despesas
- Lista de despesas recorrentes
- Datas de vencimento
- Valores e categorias
- Indicadores visuais (checkmarks)
- Ação de adicionar nova despesa

## PROMPT 9: Extrato Detalhado
- Tabela responsiva com colunas: Membro, Data, Descrição, Categoria, Conta/Cartão, Parcelas, Valor
- Campo de busca de lançamentos
- Filtro por tipo (Despesas, Receitas)
- Paginação funcional
- Avatares de membros na coluna

## PROMPT 10: Header Mobile
- Barra superior mobile (< 1280px)
- Botão de menu (abre drawer)
- Ações principais (nova transação)
- Ocultar completamente no desktop

## PROMPT 11: Responsividade Completa
- Ajustar todos os componentes para mobile-first
- Grids adaptativos (1 col mobile, 2 tablet, 3-4 desktop)
- Tipografia responsiva
- Touch targets adequados (44x44px mínimo)
- Testes em 375px, 768px, 1280px, 1920px

---

## Notas Importantes
- Todos os prompts seguem a hierarquia: Semântica → Primitiva → Conversão
- Build obrigatório antes de cada commit
- Documentação atualizada após cada prompt
- Aguardar aprovação entre prompts
