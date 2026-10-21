'use client'

import { motion } from 'framer-motion'
import { WaveBackground } from './WaveBackground'

const steps = [
  { n: '1', label: 'painel central' },
  { n: '2', label: 'pessoas guardando' },
  { n: '1', label: 'grande conquista' },
]

export function SimpleAsThat() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-mint-100 via-mint-50 to-white py-20 md:py-28">
      <WaveBackground opacity={0.55} />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 text-center md:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Simples assim
          <span className="text-green-700">.</span>
        </motion.h2>

        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-8 lg:mt-16 lg:gap-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {steps.map((step, index) => (
            <div
              key={`${step.n}-${step.label}`}
              className="flex flex-col items-center gap-4 md:flex-row md:gap-6 lg:gap-10"
            >
              <div className="max-w-[220px] text-center">
                <p className="font-heading text-3xl font-medium tracking-tight text-green-700 md:text-4xl">
                  {step.n}
                </p>
                <p className="mt-2 font-heading text-lg font-medium tracking-tight text-ink-900 md:text-xl">
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <span aria-hidden className="hidden text-mint-200 md:block">
                  →
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
