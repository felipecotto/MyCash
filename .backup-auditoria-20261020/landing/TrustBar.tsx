'use client'

import { motion } from 'framer-motion'
import { IconVision, IconFocus, IconCelebrate } from './OrganicIcons'

const pillars = [
  {
    icon: IconVision,
    title: 'Visão clara',
    detail: 'Vejam com facilidade quanto cada um guardou no mês.',
    accent: false,
  },
  {
    icon: IconFocus,
    title: 'Foco no que importa',
    detail:
      'O app organiza aportes e progresso para vocês curtirem o caminho.',
    accent: false,
  },
  {
    icon: IconCelebrate,
    title: 'Conquista real',
    detail: 'Deem forma aos planos — da viagem à reserva — com mais velocidade.',
    accent: true,
  },
]

export function TrustBar() {
  return (
    <section
      id="sobre"
      className="w-full scroll-mt-20 border-y border-gray-100 bg-mint-50 py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-10 md:px-6 lg:gap-12 lg:px-8">
        {pillars.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              className="flex flex-col items-start text-left"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <span
                className={
                  item.accent
                    ? 'flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta-100 text-terracotta-700'
                    : 'flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-100 text-green-700'
                }
              >
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 font-heading text-base font-medium tracking-tight text-ink-900">
                {item.title}
              </p>
              <p className="mt-3 font-body text-sm font-medium leading-relaxed text-ink-600">
                {item.detail}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
