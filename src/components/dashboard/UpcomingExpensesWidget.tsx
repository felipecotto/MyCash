import { useFinance } from '../../contexts/FinanceContext'
import { formatDate } from '../../utils/date.utils'
import { formatCurrency } from '../../utils/currency.utils'

export default function UpcomingExpensesWidget() {
  const { transactions, bankAccounts, creditCards, updateTransaction, addTransaction } = useFinance()

  const upcomingExpenses = transactions
    .filter((t) => t.type === 'expense' && !t.isPaid && t.status === 'pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getAccountName = (accountId: string) => {
    const account = bankAccounts.find((a) => a.id === accountId)
    if (account) return account.name
    const card = creditCards.find((c) => c.id === accountId)
    if (card) return `Crédito ${card.name} ${card.lastDigits ? `**** ${card.lastDigits}` : ''}`
    return 'Desconhecido'
  }

  const handleMarkAsPaid = (transaction: typeof transactions[0]) => {
    updateTransaction(transaction.id, { isPaid: true, status: 'completed' })

    // Se for recorrente, criar próxima ocorrência
    if (transaction.isRecurring) {
      const nextDate = new Date(transaction.date)
      nextDate.setMonth(nextDate.getMonth() + 1)

      addTransaction({
        ...transaction,
        id: '', // Será gerado no contexto
        date: nextDate,
        isPaid: false,
        status: 'pending',
      } as any)
    }
  }

  if (upcomingExpenses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">Nenhuma despesa pendente</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-lg font-bold text-gray-900">Próximas despesas</h3>
        </div>
        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {upcomingExpenses.map((expense) => (
          <div key={expense.id} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{expense.description}</p>
              <p className="text-sm text-gray-600">Vence dia {formatDate(new Date(expense.date))}</p>
              <p className="text-xs text-gray-500">{getAccountName(expense.accountId)}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
              <button
                onClick={() => handleMarkAsPaid(expense)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-500 transition-colors"
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
