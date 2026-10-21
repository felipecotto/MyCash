const bars = [
  { label: 'Seg', left: 40, right: 28 },
  { label: 'Ter', left: 20, right: 35 },
  { label: 'Qua', left: 55, right: 22 },
  { label: 'Qui', left: 30, right: 40 },
  { label: 'Sex', left: 60, right: 45 },
  { label: 'Sáb', left: 15, right: 20 },
  { label: 'Dom', left: 25, right: 18 },
]

export function SharedVisionMock() {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span className="font-body text-xs text-gray-500">Marina</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-800" />
          <span className="font-body text-xs text-gray-500">Theo</span>
        </div>
      </div>

      <div className="flex h-32 items-end justify-between gap-1.5 md:gap-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-24 w-full items-end justify-center gap-0.5">
              <div
                className="w-[45%] rounded-t-sm bg-emerald-600/90"
                style={{ height: `${bar.left}%` }}
              />
              <div
                className="w-[45%] rounded-t-sm bg-gray-800"
                style={{ height: `${bar.right}%` }}
              />
            </div>
            <span className="font-body text-[10px] text-gray-400">{bar.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
        <span className="font-body text-xs text-gray-500">Aportes na meta · semana</span>
        <span className="font-body text-sm font-medium tabular-nums text-emerald-700">
          + R$ 1.240
        </span>
      </div>
    </div>
  )
}
