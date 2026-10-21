'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'

const moments = [
  {
    id: 'brand-juntos',
    word: 'Juntos',
    label: 'Casal no sofá com o app',
  },
  {
    id: 'brand-claro',
    word: 'Claro',
    label: 'Tela do app no celular',
  },
  {
    id: 'brand-real',
    word: 'Real',
    label: 'Retrato confiante',
  },
]

export function BrandMoments() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl">
            Feito para a vida a dois
            <span className="text-green-700">.</span>
          </h2>
          <p className="mt-4 font-body text-base font-medium text-ink-600">
            Fotos humanas, luz natural e o casal sempre no centro.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <ImagePlaceholder
                id={moment.id}
                label={moment.label}
                aspect="portrait"
                tone="emerald"
                rounded="none"
                hideMeta
                className="min-h-[340px] md:min-h-[440px]"
                objectPosition={
                  moment.id === 'brand-claro' ? 'center' : 'center 20%'
                }
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-5 left-5 z-20 font-heading text-2xl font-medium tracking-tight text-white drop-shadow-sm md:text-3xl">
                {moment.word}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
