import { useFinance } from '../../contexts/FinanceContext'
import { useAnimatedValue } from '../../hooks/useAnimatedValue'
import { formatCurrency } from '../../utils/currency.utils'

export default function ExpenseCard() {
  const { calculateExpensesForPeriod } = useFinance()
  const expenses = calculateExpensesForPeriod()
  const animatedValue = useAnimatedValue(expenses)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-600">Despesas</h3>
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{formatCurrency(animatedValue)}</p>
    </div>
  )
}
