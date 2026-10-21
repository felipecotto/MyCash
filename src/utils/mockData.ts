import { Transaction } from '../types/transaction'
import { Goal, GoalContribution } from '../types/goal'
import { CreditCard } from '../types/creditCard'
import { BankAccount } from '../types/bankAccount'
import { FamilyMember } from '../types/familyMember'

const now = new Date()

// Chave 'YYYY-MM' de N meses atrás (0 = mês atual) — assim o histórico de
// aportes sempre fica relativo a hoje, em vez de datas fixas no passado.
function monthKey(monthsAgo: number): string {
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function contributions(amounts: number[]): GoalContribution[] {
  // amounts[0] = mês mais antigo ... amounts[last] = mês atual
  return amounts.map((amount, index) => ({
    month: monthKey(amounts.length - 1 - index),
    amount,
  }))
}

// Vocês dois
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'member-1',
    name: 'Felipe Oliveira',
    role: 'Você',
    avatar: null,
    monthlyIncome: 8000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'member-2',
    name: 'Maria Silva',
    role: 'Parceira',
    avatar: null,
    monthlyIncome: 6000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Contas bancárias
export const mockBankAccounts: BankAccount[] = [
  {
    id: 'account-1',
    name: 'Nubank Conta',
    type: 'checking',
    holderId: 'member-1',
    balance: 5000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'account-2',
    name: 'Inter Conta',
    type: 'checking',
    holderId: 'member-2',
    balance: 3000,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Cartões de crédito
export const mockCreditCards: CreditCard[] = [
  {
    id: 'card-1',
    name: 'Nubank Mastercard',
    holderId: 'member-1',
    limit: 5000,
    currentBill: 120,
    closingDay: 10,
    dueDay: 10,
    theme: 'black',
    lastDigits: '5897',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'card-2',
    name: 'Inter Visa',
    holderId: 'member-2',
    limit: 10000,
    currentBill: 2300,
    closingDay: 21,
    dueDay: 21,
    theme: 'lime',
    lastDigits: '5897',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'card-3',
    name: 'Picpay',
    holderId: 'member-1',
    limit: 20000,
    currentBill: 17000,
    closingDay: 12,
    dueDay: 12,
    theme: 'white',
    lastDigits: '5897',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Objetivos do casal
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Reserva de Emergência',
    description: '6 meses de despesas guardados, pra imprevistos não tirarem o sono de ninguém',
    targetAmount: 84000,
    currentAmount: 42000,
    deadline: null,
    status: 'active',
    category: 'emergency',
    memberId: null,
    links: [],
    contributions: contributions([6000, 7500, 6800, 7200, 7000, 7500]),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'goal-2',
    title: 'Cozinha Nova',
    description: 'Reforma da cozinha do apartamento',
    targetAmount: 25000,
    currentAmount: 17000,
    deadline: new Date('2026-12-31'),
    status: 'active',
    category: 'home',
    memberId: null,
    links: [
      {
        id: 'link-1',
        title: 'Orçamento marcenaria Bertioga',
        url: 'https://example.com/orcamento-marcenaria',
        createdAt: new Date('2024-02-10'),
      },
    ],
    contributions: contributions([2000, 3200, 2800, 3000, 2500, 3500]),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'goal-3',
    title: 'Euro Trip',
    description: 'Duas semanas rodando a Europa, só vocês dois',
    targetAmount: 50000,
    currentAmount: 15000,
    deadline: new Date('2027-06-30'),
    status: 'active',
    category: 'travel',
    memberId: null,
    links: [
      {
        id: 'link-2',
        title: 'Roteiro Itália + França (14 dias)',
        url: 'https://example.com/roteiro-europa',
        createdAt: new Date('2024-03-01'),
      },
    ],
    contributions: contributions([3500, 3000, 2800, 2200, 1800, 1700]),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'goal-4',
    title: 'Carro Novo',
    description: 'Trocar o carro atual por um mais novo e econômico',
    targetAmount: 60000,
    currentAmount: 12000,
    deadline: new Date('2027-12-31'),
    status: 'active',
    category: 'vehicle',
    memberId: null,
    links: [],
    contributions: contributions([1800, 2200, 2000, 1900, 2100, 2000]),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Transações
const getDate = (daysAgo: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  return date
}

export const mockTransactions: Transaction[] = [
  // Receitas
  {
    id: 'trans-1',
    type: 'income',
    amount: 8000,
    description: 'Salário',
    category: 'Salário',
    date: getDate(5),
    accountId: 'account-1',
    memberId: 'member-1',
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(5),
    updatedAt: getDate(5),
  },
  {
    id: 'trans-2',
    type: 'income',
    amount: 6000,
    description: 'Salário',
    category: 'Salário',
    date: getDate(3),
    accountId: 'account-2',
    memberId: 'member-2',
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(3),
    updatedAt: getDate(3),
  },
  // Despesas
  {
    id: 'trans-3',
    type: 'expense',
    amount: 4000,
    description: 'Aluguel',
    category: 'Moradia',
    date: getDate(10),
    accountId: 'account-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(10),
    updatedAt: getDate(10),
  },
  {
    id: 'trans-4',
    type: 'expense',
    amount: 2000,
    description: 'Supermercado',
    category: 'Alimentação',
    date: getDate(7),
    accountId: 'card-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: false,
    isPaid: true,
    createdAt: getDate(7),
    updatedAt: getDate(7),
  },
  {
    id: 'trans-5',
    type: 'expense',
    amount: 1500,
    description: 'Compras no mercado',
    category: 'Alimentação',
    date: getDate(4),
    accountId: 'card-2',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: false,
    isPaid: true,
    createdAt: getDate(4),
    updatedAt: getDate(4),
  },
  {
    id: 'trans-6',
    type: 'expense',
    amount: 120,
    description: 'Academia',
    category: 'Saúde',
    date: getDate(2),
    accountId: 'card-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(2),
    updatedAt: getDate(2),
  },
  {
    id: 'trans-7',
    type: 'expense',
    amount: 100,
    description: 'Conta de água',
    category: 'Manutenção',
    date: getDate(1),
    accountId: 'account-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(1),
    updatedAt: getDate(1),
  },
  {
    id: 'trans-8',
    type: 'expense',
    amount: 150,
    description: 'Conta de Luz',
    category: 'Manutenção',
    date: getDate(1),
    accountId: 'account-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: true,
    isPaid: true,
    createdAt: getDate(1),
    updatedAt: getDate(1),
  },
  {
    id: 'trans-9',
    type: 'expense',
    amount: 750,
    description: 'Passeio no parque',
    category: 'Lazer',
    date: getDate(1),
    accountId: 'card-3',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'completed',
    isRecurring: false,
    isPaid: true,
    createdAt: getDate(1),
    updatedAt: getDate(1),
  },
  // Despesas pendentes
  {
    id: 'trans-10',
    type: 'expense',
    amount: 154,
    description: 'Conta de Luz',
    category: 'Manutenção',
    date: new Date(now.getFullYear(), now.getMonth(), 21),
    accountId: 'card-1',
    memberId: null,
    installments: 1,
    currentInstallment: 1,
    status: 'pending',
    isRecurring: true,
    isPaid: false,
    createdAt: getDate(30),
    updatedAt: getDate(30),
  },
]
