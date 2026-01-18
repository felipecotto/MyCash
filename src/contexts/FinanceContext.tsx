import { createContext, useContext, useState, ReactNode } from 'react'
import { Transaction } from '../types/transaction'
import { Goal } from '../types/goal'
import { CreditCard } from '../types/creditCard'
import { BankAccount } from '../types/bankAccount'
import { FamilyMember } from '../types/familyMember'
import {
  mockTransactions,
  mockGoals,
  mockCreditCards,
  mockBankAccounts,
  mockFamilyMembers,
} from '../utils/mockData'

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

interface FinanceContextType {
  // Arrays principais
  transactions: Transaction[]
  goals: Goal[]
  creditCards: CreditCard[]
  bankAccounts: BankAccount[]
  familyMembers: FamilyMember[]

  // Filtros globais
  selectedMember: string | null
  dateRange: DateRange
  transactionType: 'all' | 'income' | 'expense'
  searchText: string

  // Setters de filtros
  setSelectedMember: (memberId: string | null) => void
  setDateRange: (range: DateRange) => void
  setTransactionType: (type: 'all' | 'income' | 'expense') => void
  setSearchText: (text: string) => void

  // CRUD Transactions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void

  // CRUD Goals
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void

  // CRUD CreditCards
  addCreditCard: (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => void
  deleteCreditCard: (id: string) => void

  // CRUD BankAccounts
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void
  deleteBankAccount: (id: string) => void

  // CRUD FamilyMembers
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void
  deleteFamilyMember: (id: string) => void

  // Funções de cálculo
  getFilteredTransactions: () => Transaction[]
  calculateTotalBalance: () => number
  calculateIncomeForPeriod: () => number
  calculateExpensesForPeriod: () => number
  calculateExpensesByCategory: () => Array<{ category: string; amount: number }>
  calculateCategoryPercentage: (categoryAmount: number) => number
  calculateSavingsRate: () => number
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [creditCards, setCreditCards] = useState<CreditCard[]>(mockCreditCards)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockBankAccounts)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockFamilyMembers)

  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null })
  const [transactionType, setTransactionType] = useState<'all' | 'income' | 'expense'>('all')
  const [searchText, setSearchText] = useState('')

  // CRUD Transactions
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `trans-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t))
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // CRUD Goals
  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g))
    )
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  // CRUD CreditCards
  const addCreditCard = (card: Omit<CreditCard, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard: CreditCard = {
      ...card,
      id: `card-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCreditCards((prev) => [...prev, newCard])
  }

  const updateCreditCard = (id: string, updates: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    )
  }

  const deleteCreditCard = (id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id))
  }

  // CRUD BankAccounts
  const addBankAccount = (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: BankAccount = {
      ...account,
      id: `account-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setBankAccounts((prev) => [...prev, newAccount])
  }

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a))
    )
  }

  const deleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id))
  }

  // CRUD FamilyMembers
  const addFamilyMember = (member: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: `member-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setFamilyMembers((prev) => [...prev, newMember])
  }

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: new Date() } : m))
    )
  }

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id))
  }

  // Funções de cálculo
  const getFilteredTransactions = (): Transaction[] => {
    let filtered = [...transactions]

    // Filtro por membro
    if (selectedMember) {
      filtered = filtered.filter((t) => t.memberId === selectedMember)
    }

    // Filtro por período
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((t) => {
        const tDate = new Date(t.date)
        return tDate >= dateRange.startDate! && tDate <= dateRange.endDate!
      })
    }

    // Filtro por tipo
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType)
    }

    // Filtro por busca textual
    if (searchText.trim()) {
      const search = searchText.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      )
    }

    return filtered
  }

  const calculateTotalBalance = (): number => {
    const accountsBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)
    const cardsDebt = creditCards.reduce((sum, card) => sum + card.currentBill, 0)
    return accountsBalance - cardsDebt
  }

  const calculateIncomeForPeriod = (): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const calculateExpensesForPeriod = (): number => {
    const filtered = getFilteredTransactions()
    return filtered
      .filter((t) => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const calculateExpensesByCategory = (): Array<{ category: string; amount: number }> => {
    const filtered = getFilteredTransactions()
    const expenses = filtered.filter((t) => t.type === 'expense' && t.status === 'completed')
    const grouped = expenses.reduce((acc, t) => {
      const existing = acc.find((item) => item.category === t.category)
      if (existing) {
        existing.amount += t.amount
      } else {
        acc.push({ category: t.category, amount: t.amount })
      }
      return acc
    }, [] as Array<{ category: string; amount: number }>)
    return grouped.sort((a, b) => b.amount - a.amount)
  }

  const calculateCategoryPercentage = (categoryAmount: number): number => {
    const totalIncome = calculateIncomeForPeriod()
    if (totalIncome === 0) return 0
    return (categoryAmount / totalIncome) * 100
  }

  const calculateSavingsRate = (): number => {
    const income = calculateIncomeForPeriod()
    const expenses = calculateExpensesForPeriod()
    if (income === 0) return 0
    return ((income - expenses) / income) * 100
  }

  const value: FinanceContextType = {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
    selectedMember,
    dateRange,
    transactionType,
    searchText,
    setSelectedMember,
    setDateRange,
    setTransactionType,
    setSearchText,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}
