import TransactionsTable from '../components/dashboard/TransactionsTable'
import { useFinance } from '../contexts/FinanceContext'
import { formatCurrency } from '../utils/currency.utils'

export default function Transactions() {
  const { getFilteredTransactions } = useFinance()
  const transactions = getFilteredTransactions()

  const totalIncome = transactions
    .filter((t) => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const difference = totalIncome - totalExpenses

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Transação
        </button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Receitas</p>
          <p className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Despesas</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Diferença</p>
          <p className={`text-xl font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {difference >= 0 ? '+' : ''}{formatCurrency(difference)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-xl font-bold text-gray-900">{transactions.length} transações</p>
        </div>
      </div>

      <TransactionsTable />
    </div>
  )
}
