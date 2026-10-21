'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const goals = [
  {
    title: 'Viagem',
    detail: 'Passagens, pousada, o roteiro dos sonhos.',
    tone: 'mint' as const,
  },
  {
    title: 'Reforma',
    detail: 'Cozinha nova, piso, o cantinho que falta.',
    tone: 'cream' as const,
  },
  {
    title: 'Casamento',
    detail: 'Festa, lua de mel, o dia que vocês escolherem.',
    tone: 'warm' as const,
  },
  {
    title: 'Reserva de emergência',
    detail: 'Tranquilidade quando o imprevisto aparece.',
    tone: 'brand' as const,
  },
  {
    title: 'Comprar imóvel',
    detail: 'Entrada, documentação, o próximo endereço.',
    tone: 'mint' as const,
  },
  {
    title: 'Trocar de carro',
    detail: 'Entrada combinada, sem surpresa no fim do mês.',
    tone: 'cream' as const,
  },
]

const toneClass = {
  mint: 'border-mint-200 bg-mint-100 text-green-900',
  cream: 'border-gray-100 bg-surface-50 text-ink-900',
  warm: 'border-terracotta-100 bg-terracotta-100 text-terracotta-700',
  brand: 'border-mint-200 bg-white text-green-900',
}

export function GoalRange() {
  return (
    <section className="w-full bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-green-700">
            Do simples ao complexo
          </p>
          <h2 className="mt-4 font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl lg:text-[2.5rem]">
            De uma viagem dos sonhos à reserva para o imóvel
            <span className="text-green-700">.</span>
          </h2>
          <p className="mt-5 font-body text-base font-medium leading-relaxed text-ink-600 md:text-lg">
            O nosso+ acompanha o tamanho do plano de vocês.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {goals.map((goal, index) => (
            <motion.article
              key={goal.title}
              className={cn(
                'rounded-2xl border px-6 py-7 transition-shadow hover:shadow-soft md:px-7 md:py-8',
                toneClass[goal.tone]
              )}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <p className="font-heading text-base font-medium tracking-tight md:text-lg">
                {goal.title}
              </p>
              <p className="mt-3 font-body text-sm font-medium leading-relaxed opacity-75">
                {goal.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
