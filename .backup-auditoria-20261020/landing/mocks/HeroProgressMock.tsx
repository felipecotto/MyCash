'use client'

import { motion } from 'framer-motion'

const PROGRESS = 0.48
const RADIUS = 70
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Unique circular progress instance (1 of max 2 on LP) */
export function HeroProgressMock() {
  const offset = CIRCUMFERENCE * (1 - PROGRESS)

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_rgba(14,125,94,0.12),_transparent_65%)] blur-sm"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white p-5 shadow-lift md:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-ink-400">
              Meta compartilhada
            </p>
            <h3 className="mt-1 font-heading text-xl font-medium tracking-tight text-ink-900">
              Cozinha Nova
            </h3>
          </div>
          <div className="flex -space-x-2">
            <div className="mt-1 flex h-9 w-9 rotate-[-4deg] items-center justify-center rounded-full border-2 border-white bg-mint-100 font-body text-[10px] font-medium text-green-900 shadow-sm ring-2 ring-green-700/20">
              A
            </div>
            <div className="flex h-9 w-9 rotate-[5deg] items-center justify-center rounded-full border-2 border-white bg-terracotta-100 font-body text-[10px] font-medium text-terracotta-700 shadow-sm ring-2 ring-terracotta-300/50">
              B
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
            <svg className="-rotate-90" width="160" height="160" viewBox="0 0 160 160" aria-hidden>
              <circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-mint-200"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className="text-green-700"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-body text-3xl font-medium tabular-nums tracking-tight text-ink-900">
                48%
              </span>
            </div>
          </div>

          <div className="w-full flex-1 space-y-3">
            <div className="rounded-2xl bg-mint-100 px-4 py-3">
              <p className="font-body text-[11px] font-medium text-green-900/70">
                Guardado juntos
              </p>
              <p className="mt-0.5 font-body text-xl font-medium tabular-nums tracking-tight text-ink-900">
                R$ 17.000
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-gray-100 bg-surface-50 px-3 py-2.5">
                <p className="font-body text-[11px] text-ink-400">Ana</p>
                <p className="mt-0.5 font-body text-sm font-medium tabular-nums text-ink-900">
                  R$ 9.200
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-surface-50 px-3 py-2.5">
                <p className="font-body text-[11px] text-ink-400">Bruno</p>
                <p className="mt-0.5 font-body text-sm font-medium tabular-nums text-ink-900">
                  R$ 7.800
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta-500" />
          <span className="font-body text-xs font-medium text-terracotta-700">
            Aporte da semana celebrado
          </span>
        </div>
      </div>
    </div>
  )
}
