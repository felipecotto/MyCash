'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface StorytellingVisualProps {
  mode?: 'metas' | 'aportes'
}

/** Bars + contributions — no circular progress (reserved for Hero + Scoreboard) */
export function StorytellingVisual({ mode = 'aportes' }: StorytellingVisualProps) {
  return (
    <div className="relative w-full">
      <motion.div
        key={mode}
        className="w-full rounded-[1.75rem] border border-white/20 bg-white p-5 shadow-lift md:p-7"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              {mode === 'metas' ? 'Meta planejada' : 'Painel da meta'}
            </p>
            <p className="mt-1 font-heading text-lg font-semibold tracking-tight text-gray-900">
              {mode === 'metas' ? 'Quitar cartão juntos' : 'Passagens Lisboa'}
            </p>
          </div>
          <span className="rounded-full bg-terracotta-100 px-2.5 py-1 font-body text-[11px] font-medium text-terracotta-700">
            {mode === 'metas' ? 'Complexo' : 'Simples'}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-mint-100 p-3">
            <p className="font-body text-[11px] font-medium text-green-900/70">
              Guardado
            </p>
            <p className="mt-1 font-body text-sm font-medium tabular-nums text-ink-900">
              {mode === 'metas' ? 'R$ 6.800' : 'R$ 4.360'}
            </p>
          </div>
          <div className="rounded-xl bg-surface-50 p-3">
            <p className="font-body text-[11px] font-medium text-ink-600">Meta</p>
            <p className="mt-1 font-body text-sm font-medium tabular-nums text-ink-900">
              {mode === 'metas' ? 'R$ 18.000' : 'R$ 12.800'}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-body text-xs font-medium text-ink-600">Carla</span>
              <span className="font-body text-xs font-medium tabular-nums text-ink-900">
                {mode === 'metas' ? 'R$ 3.600' : 'R$ 2.400'}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-mint-100">
              <div
                className="h-full rounded-full bg-green-700"
                style={{ width: mode === 'metas' ? '53%' : '55%' }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-body text-xs font-medium text-ink-600">Diego</span>
              <span className="font-body text-xs font-medium tabular-nums text-ink-900">
                {mode === 'metas' ? 'R$ 3.200' : 'R$ 1.960'}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-mint-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: mode === 'metas' ? '47%' : '45%' }}
              />
            </div>
          </div>
        </div>

        {mode === 'aportes' && (
          <div className="mt-5 flex items-center gap-2 rounded-full bg-terracotta-100 px-3 py-2">
            <Check className="h-3.5 w-3.5 text-terracotta-500" strokeWidth={2.5} />
            <span className="font-body text-xs font-medium text-terracotta-700">
              Último aporte · R$ 350 · hoje
            </span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
