const goals = [
  {
    title: 'Compra de Piso',
    amount: 'R$ 4.200',
    progress: 82,
    tone: 'emerald' as const,
  },
  {
    title: 'Passagens Aéreas',
    amount: 'R$ 12.800',
    progress: 34,
    tone: 'neutral' as const,
  },
]

export function GoalsCompareMock() {
  return (
    <div className="mt-6 space-y-3">
      {goals.map((goal) => (
        <div
          key={goal.title}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-heading text-sm font-semibold text-gray-900">
                {goal.title}
              </p>
              <p className="mt-0.5 font-body text-xs text-gray-500">
                Meta · {goal.amount}
              </p>
            </div>
            <span className="font-body text-sm font-medium tabular-nums text-gray-900">
              {goal.progress}%
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className={
                goal.tone === 'emerald'
                  ? 'h-full rounded-full bg-emerald-600'
                  : 'h-full rounded-full bg-gray-800'
              }
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
