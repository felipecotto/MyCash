'use client'

import { motion } from 'framer-motion'
import { WaitlistButton } from './WaitlistButton'
import { ImagePlaceholder } from './ImagePlaceholder'

const methodSteps = [
  {
    title: 'Escolham o objetivo.',
    description: 'Viagem, reforma, imóvel — definam juntos o próximo plano.',
  },
  {
    title: 'Guardem no mesmo ritmo.',
    description: 'Combinam quanto cada um aporta e acompanham no painel.',
  },
  {
    title: 'Celebrem cada avanço.',
    description: 'O progresso fica visível — e a meta deixa de ser abstrata.',
  },
]

/** Photo left + copy right — storytelling like Figma reference */
export function Storytelling() {
  return (
    <section
      id="metodo"
      className="relative w-full scroll-mt-20 overflow-hidden bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 md:gap-16 md:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          className="relative order-2 lg:order-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <ImagePlaceholder
              id="story-couple"
              label="Casal planejando"
              aspect="landscape"
              hideMeta
              className="min-h-[280px] md:min-h-[420px]"
              objectPosition="center 40%"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-terracotta-100 px-3.5 py-1.5 font-body text-xs font-medium text-terracotta-700 shadow-sm backdrop-blur-sm md:bottom-5 md:left-5">
              Juntos por: Viagem 2026
            </span>
          </div>
        </motion.div>

        <motion.div
          className="order-1 flex flex-col lg:order-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-terracotta-500">
            O poder do objetivo em comum
          </p>
          <h2 className="mt-4 font-heading text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] text-ink-900 md:text-4xl lg:text-[2.5rem]">
            Sonhar junto faz a meta virar realidade logo
            <span className="text-green-700">.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-base font-medium leading-relaxed text-ink-600 md:text-lg">
            Quando o casal divide o mesmo objetivo, o foco aumenta e a jornada
            fica mais leve.
          </p>

          <ol className="mt-10 space-y-0 md:mt-12">
            {methodSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 border-t border-gray-100 py-5 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 font-body text-xs font-medium tabular-nums text-green-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-heading text-base font-medium text-ink-900">
                    {step.title}
                  </p>
                  <p className="mt-1.5 font-body text-sm font-medium leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <WaitlistButton
              size="lg"
              label="Criar nosso objetivo"
              className="w-full sm:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
