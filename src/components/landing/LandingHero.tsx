'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WaitlistButton } from './WaitlistButton'
import { HeroProgressMock } from './mocks/HeroProgressMock'
import { ImagePlaceholder } from './ImagePlaceholder'
import { WaveBackground } from './WaveBackground'

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-50">
      <WaveBackground className="opacity-40" opacity={0.3} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-mint-100/80 to-transparent xl:block"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-16 px-4 pb-20 pt-16 md:gap-20 md:px-6 md:pb-28 md:pt-20 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="flex max-w-xl flex-col">
          <motion.p
            className="flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-terracotta-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-terracotta-500"
            />
            O dinheiro no mesmo ritmo.
          </motion.p>

          <motion.h1
            className="mt-5 font-heading text-[2.125rem] font-medium leading-[1.1] tracking-[-0.035em] text-ink-900 md:mt-6 md:text-5xl lg:text-[3.25rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Alcancem suas metas a dois de um jeito mais rápido
            <span className="text-green-700">.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg font-body text-base font-medium leading-relaxed text-ink-600 md:mt-7 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            Transformem a organização financeira em um hábito simples — juntos,
            no mesmo painel, até a conquista.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <WaitlistButton
              size="lg"
              label="Entrar na lista de espera"
              className="w-full sm:w-auto"
            />
            <Link
              href="#metodo"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 font-body text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              Ver como funciona
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.p
            className="mt-10 font-body text-sm font-medium text-ink-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            Lista de espera aberta. Liberamos o acesso em ondas pequenas.
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <div className="absolute -right-2 top-0 hidden w-[52%] md:block lg:-right-4">
            <ImagePlaceholder
              id="hero-lifestyle"
              label="Casal no sofá"
              aspect="portrait"
              tone="emerald"
              className="shadow-lift"
              hideMeta
              objectPosition="center 30%"
            />
          </div>
          <div className="relative z-10 md:mr-[16%] md:mt-8">
            <HeroProgressMock />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
