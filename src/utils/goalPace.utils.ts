import { Goal } from '../types/goal'
import { formatCurrency } from './currency.utils'

export type GoalPaceStatus = 'ahead' | 'on_track' | 'attention' | 'behind' | 'no_deadline'

export interface GoalPaceInsight {
  status: GoalPaceStatus
  avgMonthlyContribution: number
  requiredMonthlyContribution: number | null // null quando não há prazo
  suggestedMonthlyContribution: number // valor sugerido pro próximo aporte (o casal todo)
  suggestedPerPerson: number
  slipDays: number | null // dias de atraso projetados (negativo = adiantado); null se sem prazo
  headline: string
  message: string
}

const DAYS_PER_MONTH = 30.44

function roundToStep(value: number, step = 50): number {
  return Math.max(0, Math.round(value / step) * step)
}

/**
 * Insight de ritmo de aportes: compara a média recente de aportes com o que
 * seria necessário pra bater o prazo da meta, e sugere um valor de aporte.
 * Baseado no histórico real de contribuições da meta (sem dados simulados) —
 * é o mesmo tipo de cálculo que entraria em produção, só que sobre dados mock.
 */
export function getGoalPaceInsight(goal: Goal, peopleInvolved: number): GoalPaceInsight {
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount)
  const recent = goal.contributions.slice(-3)
  const avgMonthlyContribution =
    recent.length > 0 ? recent.reduce((sum, c) => sum + c.amount, 0) / recent.length : 0

  const people = Math.max(1, peopleInvolved)

  if (!goal.deadline || remaining === 0) {
    const suggested = roundToStep(avgMonthlyContribution)
    return {
      status: 'no_deadline',
      avgMonthlyContribution,
      requiredMonthlyContribution: null,
      suggestedMonthlyContribution: suggested,
      suggestedPerPerson: roundToStep(suggested / people, 10),
      slipDays: null,
      headline: remaining === 0 ? 'Meta concluída' : 'Ritmo constante',
      message:
        remaining === 0
          ? 'Vocês já bateram essa meta — hora de comemorar juntos.'
          : `Sem prazo definido: vocês guardam em média ${formatCurrency(avgMonthlyContribution)} por mês. Continuem assim.`,
    }
  }

  const now = new Date()
  const deadline = new Date(goal.deadline)
  const daysToDeadline = Math.max(0, Math.round((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const monthsRemaining = Math.max(daysToDeadline / DAYS_PER_MONTH, 1 / DAYS_PER_MONTH)
  const requiredMonthlyContribution = remaining / monthsRemaining

  let slipDays: number
  if (avgMonthlyContribution <= 0) {
    slipDays = Number.POSITIVE_INFINITY
  } else {
    const projectedMonths = remaining / avgMonthlyContribution
    const projectedDays = projectedMonths * DAYS_PER_MONTH
    slipDays = Math.round(projectedDays - daysToDeadline)
  }

  let status: GoalPaceStatus
  if (slipDays <= -14) status = 'ahead'
  else if (slipDays <= 7) status = 'on_track'
  else if (slipDays <= 45) status = 'attention'
  else status = 'behind'

  const suggestedBase =
    status === 'ahead' || status === 'on_track' ? avgMonthlyContribution : requiredMonthlyContribution
  const suggestedMonthlyContribution = roundToStep(suggestedBase)
  const suggestedPerPerson = roundToStep(suggestedMonthlyContribution / people, 10)

  const headline: Record<Exclude<GoalPaceStatus, 'no_deadline'>, string> = {
    ahead: 'Adiantados!',
    on_track: 'No ritmo certo',
    attention: 'Atenção ao ritmo',
    behind: 'Ritmo atrasado',
  }

  const messages: Record<Exclude<GoalPaceStatus, 'no_deadline'>, string> = {
    ahead: 'No ritmo atual, vocês terminam antes do prazo — mandem ver que está indo muito bem.',
    on_track: 'Com o ritmo atual, vocês devem chegar lá dentro do prazo. Continuem assim.',
    attention: `Com o ritmo atual, a data escorrega ${Math.abs(slipDays)} dias. Ajustem o aporte juntos — ainda dá tempo.`,
    behind: `No ritmo atual, essa meta atrasaria cerca de ${Math.max(1, Math.round(Math.abs(slipDays) / 30))} ${
      Math.round(Math.abs(slipDays) / 30) === 1 ? 'mês' : 'meses'
    }. Vale reforçar o aporte pra recolocar no trilho.`,
  }

  return {
    status,
    avgMonthlyContribution,
    requiredMonthlyContribution,
    suggestedMonthlyContribution,
    suggestedPerPerson,
    slipDays: Number.isFinite(slipDays) ? slipDays : null,
    headline: headline[status],
    message: messages[status],
  }
}

export function monthKeyToLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, (month || 1) - 1, 1)
  return date.toLocaleDateString('pt-BR', { month: 'short' })
}
