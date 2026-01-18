import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useFinance } from '../../contexts/FinanceContext'
import { formatCompactCurrency } from '../../utils/currency.utils'

export default function FinancialFlowChart() {
  const { transactions } = useFinance()

  // Agrupar transações por mês
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date()
    month.setMonth(i)
    return {
      month: month.toLocaleDateString('pt-BR', { month: 'short' }),
      income: 0,
      expenses: 0,
    }
  })

  transactions.forEach((transaction) => {
    if (transaction.status === 'completed') {
      const month = new Date(transaction.date).getMonth()
      if (transaction.type === 'income') {
        monthlyData[month].income += transaction.amount
      } else {
        monthlyData[month].expenses += transaction.amount
      }
    }
  })

  const formatTooltipValue = (value: number) => formatCompactCurrency(value)

  const formatYAxis = (value: number) => formatCompactCurrency(value)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <h3 className="text-lg font-bold text-gray-900">Fluxo Financeiro</h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-400"></div>
            <span className="text-sm text-gray-600">Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-900"></div>
            <span className="text-sm text-gray-600">Despesas</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A3FF00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#A3FF00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#171717" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#737373' }}
            axisLine={{ stroke: '#E5E5E5' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#737373' }}
            axisLine={{ stroke: '#E5E5E5' }}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => formatTooltipValue(value)}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#A3FF00"
            strokeWidth={3}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#171717"
            strokeWidth={3}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
