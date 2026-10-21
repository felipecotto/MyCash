'use client'

import { motion } from 'framer-motion'
import { WaveBackground } from './WaveBackground'

const quotes = [
  '“Você guardou alguma coisa esse mês?”',
  '“Acho que esqueci de anotar essa.”',
  '“A gente combina amanhã.”',
]

export function ProblemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-50 py-20 md:py-28 lg:py-32">
      <WaveBackground opacity={0.45} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-terracotta-100/50 to-transparent xl:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-mint-100/60 to-transparent xl:block"
      />

      <div className="relative mx-auto w-full max-w-[720px] px-4 text-center md:px-6 lg:px-8">
        <motion.div
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {quotes.map((q) => (
            <p
              key={q}
              className="font-quote text-xl italic leading-relaxed text-ink-600 md:text-2xl lg:text-[1.75rem]"
            >
              {q}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 md:mt-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span
            aria-hidden
            className="h-12 w-px bg-gradient-to-b from-terracotta-300 to-green-700 md:h-16"
          />
          <p className="font-heading text-lg font-medium leading-snug tracking-tight text-ink-900 md:text-xl lg:text-2xl">
            Simples assim: parem de cobrar e comecem a realizar
            <span className="text-green-700">.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
