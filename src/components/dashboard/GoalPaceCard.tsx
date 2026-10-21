import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { useFinance } from '../../contexts/FinanceContext'
import { formatCurrency, formatCompactCurrency } from '../../utils/currency.utils'
import { formatDate } from '../../utils/date.utils'
import { getGoalPaceInsight, monthKeyToLabel } from '../../utils/goalPace.utils'
import { categoryMeta } from '../../utils/goalCategory'
import { Goal } from '../../types/goal'
import DonutChart from '../ui/DonutChart'
import { Button } from '../ui/button'

const statusStyles: Record<string, { chip: string; panel: string; heading: string; hex: string }> = {
  ahead: { chip: 'text-green-700 bg-mint-100', panel: 'bg-mint-50 border-mint-200', heading: 'text-green-700', hex: '#0E7D5E' },
  on_track: { chip: 'text-green-700 bg-mint-100', panel: 'bg-mint-50 border-mint-200', heading: 'text-green-700', hex: '#0E7D5E' },
  attention: { chip: 'text-terracotta-700 bg-terracotta-100', panel: 'bg-terracotta-100 border-terracotta-300', heading: 'text-terracotta-700', hex: '#C1592E' },
  behind: { chip: 'text-terracotta-700 bg-terracotta-100', panel: 'bg-terracotta-100 border-terracotta-300', heading: 'text-terracotta-700', hex: '#C1592E' },
  no_deadline: { chip: 'text-green-700 bg-mint-100', panel: 'bg-mint-50 border-mint-200', heading: 'text-green-700', hex: '#0E7D5E' },
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z" />
    </svg>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-ink-400 capitalize">{label}</p>
      <p className="text-sm font-bold text-ink-900">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

interface GoalPaceCardProps {
  goal: Goal
  showDetailsLink?: boolean
}

export default function GoalPaceCard({ goal, showDetailsLink = false }: GoalPaceCardProps) {
  const { familyMembers, updateGoal } = useFinance()
  const peopleInvolved = goal.memberId ? 1 : Math.max(1, familyMembers.length)
  const insight = getGoalPaceInsight(goal, peopleInvolved)
  const percentage = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
  const meta = categoryMeta[goal.category]
  const style = statusStyles[insight.status]
  const needsAttention = insight.status === 'attention' || insight.status === 'behind'

  const chartData = goal.contributions.map((c) => ({
    label: monthKeyToLabel(c.month),
    amount: c.amount,
  }))

  const handleConfirmPace = () => {
    const now = new Date()
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const existingIndex = goal.contributions.findIndex((c) => c.month === currentMonthKey)

    const newContributions =
      existingIndex >= 0
        ? goal.contributions.map((c, i) =>
            i === existingIndex ? { ...c, amount: c.amount + insight.suggestedMonthlyContribution } : c
          )
        : [...goal.contributions, { month: currentMonthKey, amount: insight.suggestedMonthlyContribution }]

    updateGoal(goal.id, {
      currentAmount: goal.currentAmount + insight.suggestedMonthlyContribution,
      contributions: newContributions,
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-2 md:p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Painel esquerdo: progresso */}
        <div className="bg-mint-50 rounded-xl p-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-green-700">
            {meta.icon}
            {meta.label}
          </span>
          <h3 className="text-2xl font-bold text-ink-900 mt-1 mb-4">{goal.title}</h3>
          <div className="flex items-center gap-4">
            <DonutChart percentage={percentage} size={72} strokeWidth={7} color="#0E7D5E" />
            <div>
              <p className="text-ink-400 text-sm">{formatCurrency(goal.currentAmount)}</p>
              <p className="text-ink-900 font-bold">de {formatCurrency(goal.targetAmount)}</p>
            </div>
          </div>
        </div>

        {/* Painel direito: status do ritmo */}
        <div className={`rounded-xl p-6 border ${style.panel}`}>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${style.heading}`}>
            <HeartIcon className="w-4 h-4" />
            {needsAttention ? 'Atenção ao ritmo' : 'Ritmo de aportes'}
          </span>
          <p className={`text-lg font-bold mt-2 mb-2 ${style.heading}`}>{insight.headline}</p>
          <p className="text-sm text-ink-600">{insight.message}</p>
        </div>
      </div>

      {/* Ritmo de aportes */}
      {chartData.length > 0 && (
        <div className="p-6">
          <h4 className="text-sm font-semibold text-ink-900 mb-4">Ritmo de aportes</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#F5F5F5" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#52525B' }}
                axisLine={{ stroke: '#E5E5E5' }}
                tickLine={false}
              />
              <YAxis hide tickFormatter={formatCompactCurrency} />
              {insight.requiredMonthlyContribution !== null && (
                <ReferenceLine
                  y={insight.requiredMonthlyContribution}
                  stroke="#A1A1AA"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              )}
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F7F7F5' }} />
              <Bar dataKey="amount" fill={style.hex} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Ação sugerida */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-50 rounded-xl px-6 py-4">
        <p className="text-sm text-ink-600">
          <span className="text-ink-400">Aporte sugerido: </span>
          <span className="font-semibold text-ink-900">{formatCurrency(insight.suggestedPerPerson)} cada</span>
        </p>
        <div className="flex items-center gap-4">
          <Button size="sm" onClick={handleConfirmPace}>
            Confirmar ritmo
          </Button>
          {showDetailsLink && (
            <Link href={`/goals/${goal.id}`} className="text-sm font-medium text-ink-600 hover:text-ink-900">
              Ver detalhes
            </Link>
          )}
        </div>
      </div>
      {goal.deadline && (
        <p className="px-6 pb-4 -mt-2 text-xs text-ink-400">Prazo: {formatDate(new Date(goal.deadline))}</p>
      )}
    </div>
  )
}
