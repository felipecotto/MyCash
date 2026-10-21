import Link from 'next/link'
import { useFinance } from '../../contexts/FinanceContext'
import { formatCurrency } from '../../utils/currency.utils'
import { formatDate } from '../../utils/date.utils'
import { getTravelPriceInsight } from '../../utils/travelInsight.utils'
import { getGoalPaceInsight, GoalPaceStatus } from '../../utils/goalPace.utils'
import { categoryMeta } from '../../utils/goalCategory'
import { Goal } from '../../types/goal'
import DonutChart from '../ui/DonutChart'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import GoalPaceCard from './GoalPaceCard'

const paceChipStyles: Record<GoalPaceStatus, { label: string; tone: 'success' | 'warning' | 'neutral' }> = {
  ahead: { label: 'Adiantados', tone: 'success' },
  on_track: { label: 'No ritmo', tone: 'success' },
  attention: { label: 'Atenção', tone: 'warning' },
  behind: { label: 'Atrasado', tone: 'warning' },
  no_deadline: { label: 'Sem prazo', tone: 'neutral' },
}

const statusRank: Record<GoalPaceStatus, number> = {
  behind: 4,
  attention: 3,
  on_track: 2,
  no_deadline: 1,
  ahead: 0,
}

function MemberAvatars({ memberId }: { memberId: string | null }) {
  const { familyMembers } = useFinance()
  const members = memberId
    ? familyMembers.filter((m) => m.id === memberId)
    : familyMembers.slice(0, 2)

  return (
    <div className="flex -space-x-2">
      {members.map((member) => (
        <Avatar key={member.id} name={member.name} src={member.avatar} size="xs" ringed />
      ))}
    </div>
  )
}

function GoalCard({ goal, peopleInvolved }: { goal: Goal; peopleInvolved: number }) {
  const percentage = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount)
  const meta = categoryMeta[goal.category]
  const travelInsight = getTravelPriceInsight(goal)
  const pace = getGoalPaceInsight(goal, peopleInvolved)
  const paceChip = paceChipStyles[pace.status]

  return (
    <Link
      href={`/goals/${goal.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover-lift transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge tone="success" icon={meta.icon}>{meta.label}</Badge>
          <Badge tone={paceChip.tone}>{paceChip.label}</Badge>
        </div>
        <MemberAvatars memberId={goal.memberId} />
      </div>

      <div className="flex items-center gap-4">
        <DonutChart percentage={percentage} size={64} strokeWidth={6} color="#0E7D5E" />
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-ink-900 truncate">{goal.title}</h4>
          {goal.deadline && (
            <p className="text-xs text-ink-400">até {formatDate(new Date(goal.deadline))}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-ink-400 text-xs">Guardado</p>
          <p className="font-bold text-ink-900">{formatCurrency(goal.currentAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-ink-400 text-xs">Meta</p>
          <p className="font-bold text-ink-900">{formatCurrency(goal.targetAmount)}</p>
        </div>
      </div>

      {remaining > 0 && (
        <p className="mt-3 text-xs text-ink-600 bg-surface-50 rounded-md px-3 py-2">
          Faltam {formatCurrency(remaining)} para essa conquista
        </p>
      )}

      {travelInsight?.isGoodTime && (
        <p className="mt-2 text-xs text-green-700 bg-mint-50 border border-mint-200 rounded-md px-3 py-2">
          💡 Bom momento pra comprar a passagem
        </p>
      )}
    </Link>
  )
}

export default function GoalsWidget() {
  const { goals, familyMembers } = useFinance()
  const activeGoals = goals.filter((g) => g.status === 'active')

  if (activeGoals.length === 0) {
    return null
  }

  const peopleFor = (goal: Goal) => (goal.memberId ? 1 : Math.max(1, familyMembers.length))

  const spotlightGoal = [...activeGoals].sort((a, b) => {
    const rankDiff = statusRank[getGoalPaceInsight(b, peopleFor(b)).status] - statusRank[getGoalPaceInsight(a, peopleFor(a)).status]
    if (rankDiff !== 0) return rankDiff
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })[0]

  const otherGoals = activeGoals.filter((g) => g.id !== spotlightGoal.id)

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-ink-900">Metas do casal</h3>
        <p className="text-sm text-ink-600">Do simples ao mais ambicioso — vocês dois, no mesmo objetivo.</p>
      </div>

      <div className="mb-4">
        <GoalPaceCard goal={spotlightGoal} showDetailsLink />
      </div>

      {otherGoals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} peopleInvolved={peopleFor(goal)} />
          ))}
        </div>
      )}
    </div>
  )
}
