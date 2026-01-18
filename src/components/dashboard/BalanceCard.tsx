import { useFinance } from '../../contexts/FinanceContext'
import { useAnimatedValue } from '../../hooks/useAnimatedValue'
import { formatCurrency } from '../../utils/currency.utils'
import { calculateDifference } from '../../utils/calculation.utils'
import { useMemo } from 'react'

export default function BalanceCard() {
  const { calculateTotalBalance, transactions } = useFinance()
  const currentBalance = calculateTotalBalance()
  const animatedValue = useAnimatedValue(currentBalance)

  // Calcular crescimento comparado ao mês anterior
  const growth = useMemo(() => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const lastMonthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date)
      return tDate >= lastMonth && tDate < thisMonth && t.status === 'completed'
    })

    const lastMonthBalance = lastMonthTransactions.reduce((sum, t) => {
      return sum + (t.type === 'income' ? t.amount : -t.amount)
    }, 0)

    return calculateDifference(currentBalance, lastMonthBalance)
  }, [currentBalance, transactions])

  return (
    <div className="relative bg-gray-900 text-white rounded-lg p-6 overflow-hidden">
      {/* Círculo verde desfocado decorativo */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-400 opacity-20 blur-3xl rounded-full" />

      <div className="relative z-10">
        <p className="text-sm text-gray-400 mb-2">Saldo Total</p>
        <p className="text-4xl font-bold mb-4">{formatCurrency(animatedValue)}</p>

        {growth.percentage > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="text-sm font-medium">
              +{growth.percentage.toFixed(1)}% esse mês
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
