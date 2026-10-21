import { Bell, CalendarClock, Target } from 'lucide-react'

const alerts = [
  {
    icon: CalendarClock,
    title: 'Aporte de sexta',
    detail: 'Lembrete combinado · R$ 400 para Passagens Lisboa',
  },
  {
    icon: Target,
    title: 'Ritmo um pouco abaixo',
    detail: 'Com o ritmo atual, a data pode escorregar 11 dias',
  },
  {
    icon: Bell,
    title: 'Meta quase no meio',
    detail: '48% · bom momento para revisar a próxima prioridade',
  },
]

export function SmartAlertsMock() {
  return (
    <div className="mt-6 grid gap-2.5 md:grid-cols-3">
      {alerts.map((alert) => {
        const Icon = alert.icon
        return (
          <div
            key={alert.title}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3.5"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold text-gray-900">
                {alert.title}
              </p>
              <p className="mt-0.5 font-body text-xs leading-relaxed text-gray-500">
                {alert.detail}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
