'use client'

import { motion } from 'framer-motion'
import { WaitlistButton } from './WaitlistButton'
import { Button } from '@/components/ui/button'
import { WaveBackground } from './WaveBackground'
import { Heart } from 'lucide-react'

const monthBars = [
  { label: 'Jan', h: 40 },
  { label: 'Fev', h: 55 },
  { label: 'Mar', h: 48 },
  { label: 'Abr', h: 70 },
  { label: 'Mai', h: 62 },
  { label: 'Jun', h: 85 },
]

/** Mock LEFT + copy RIGHT — breaks repeated pattern. 2nd circular (varied). */
export function Scoreboard() {
  return (
    <section
      id="features"
      className="relative w-full scroll-mt-20 overflow-hidden bg-surface-50 py-20 md:py-28 lg:py-32"
    >
      <WaveBackground opacity={0.25} />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-14 px-4 md:gap-16 md:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          className="order-2 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-4 shadow-soft md:p-5 lg:order-1"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-mint-100 p-4 sm:col-span-1">
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-green-900/70">
                Reserva
              </p>
              <p className="mt-1 font-heading text-base font-medium text-ink-900">
                Emergência
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <svg className="-rotate-90" width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="7"
                      className="text-mint-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 30}
                      strokeDashoffset={2 * Math.PI * 30 * (1 - 0.32)}
                      className="text-green-700"
                    />
                  </svg>
                  <span className="absolute font-body text-sm font-medium tabular-nums text-ink-900">
                    32%
                  </span>
                </div>
                <div className="font-body text-xs">
                  <p className="text-ink-400">R$ 4.800</p>
                  <p className="font-medium text-ink-900">de R$ 15.000</p>
                </div>
              </div>
            </div>

            {/* Lembrete carinhoso — terracota, nunca preto */}
            <div className="flex flex-col justify-between rounded-2xl border border-terracotta-300/40 bg-terracotta-100 p-4 sm:col-span-1">
              <div>
                <div className="flex items-center gap-2">
                  <Heart
                    className="h-4 w-4 text-terracotta-500"
                    strokeWidth={2}
                    fill="currentColor"
                    fillOpacity={0.2}
                  />
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-terracotta-700">
                    Atenção ao ritmo
                  </p>
                </div>
                <p className="mt-2 font-heading text-sm font-medium leading-snug text-terracotta-700">
                  Com o ritmo atual, a data escorrega 11 dias
                </p>
              </div>
              <p className="mt-4 font-body text-xs text-terracotta-700/80">
                Ajustem o aporte juntos — ainda dá tempo.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-gray-100 bg-mint-50 p-4">
            <p className="font-heading text-sm font-medium text-ink-900">
              Ritmo de aportes
            </p>
            <div className="mt-4 flex h-28 items-end justify-between gap-2">
              {monthBars.map((bar) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-[24px] rounded-t-md bg-green-700/90"
                    style={{ height: `${bar.h}%` }}
                  />
                  <span className="font-body text-[10px] text-ink-400">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-terracotta-100 bg-terracotta-100/60 px-4 py-3 sm:flex-row sm:items-center">
            <p className="font-body text-sm font-medium text-ink-600">
              Aporte sugerido:{' '}
              <span className="font-medium text-ink-900">R$ 500 cada</span>
            </p>
            <div className="flex gap-2">
              <WaitlistButton size="sm" label="Confirmar ritmo" />
              <Button variant="ghost" size="sm" className="font-body font-medium text-ink-600">
                Editar
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="order-1 flex max-w-lg flex-col lg:order-2"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-green-700">
            Acompanhamento
          </p>
          <h2 className="mt-4 font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl lg:text-[2.5rem]">
            O painel que mostra a evolução de vocês
            <span className="text-green-700">.</span>
          </h2>
          <p className="mt-5 font-body text-base font-medium leading-relaxed text-ink-600 md:text-lg">
            Vejam o esforço render todos os dias. Ter uma visão clara do
            progresso motiva o casal a manter o ritmo — na viagem, na dívida
            ou na reserva.
          </p>
          <p className="mt-5 font-quote text-lg italic leading-relaxed text-ink-600">
            “A gente abriu o painel e, pela primeira vez, os dois viram o mesmo
            número.”
          </p>
          <div className="mt-10">
            <WaitlistButton size="lg" label="Entrar na lista de espera" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
