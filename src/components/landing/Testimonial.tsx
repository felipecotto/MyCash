'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'
import { WaveBackground } from './WaveBackground'

export function Testimonial() {
  return (
    <section className="relative w-full overflow-hidden bg-mint-50 py-20 md:py-28 lg:py-32">
      <WaveBackground opacity={0.2} />
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl lg:text-[2.5rem]">
            Transformem conversas em conquistas reais
            <span className="text-green-700">.</span>
          </h2>
        </div>

        <motion.blockquote
          className="grid overflow-hidden rounded-[1.75rem] border border-terracotta-100 bg-terracotta-100 md:grid-cols-[minmax(0,0.9fr)_1.1fr]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative min-h-[240px] md:min-h-full">
            <ImagePlaceholder
              id="testimonial-portrait"
              label="Luiz e Carol"
              aspect="square"
              rounded="none"
              hideMeta
              className="h-full min-h-[240px] rounded-none md:absolute md:inset-0 md:aspect-auto"
              objectPosition="center 25%"
            />
          </div>

          <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12">
            <span
              aria-hidden
              className="font-quote text-5xl leading-none text-terracotta-300 md:text-6xl"
            >
              “
            </span>
            <p className="mt-2 font-quote text-xl italic leading-relaxed text-ink-900 md:text-2xl">
              Trocamos a ansiedade de guardar dinheiro pela empolgação de
              realizar — a viagem, as bikes novas, a reserva que enfim começa a
              fazer sentido.
            </p>
            <footer className="mt-8 flex items-center gap-3">
              <div>
                <p className="font-heading text-sm font-medium text-ink-900">
                  Luiz e Carol
                </p>
                <p className="mt-0.5 font-body text-xs font-medium text-ink-600">
                  Cenário ilustrativo · protótipo
                </p>
              </div>
            </footer>
          </div>
        </motion.blockquote>
      </div>
    </section>
  )
}
