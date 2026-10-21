'use client'

import { motion } from 'framer-motion'
import { SharedVisionMock } from './mocks/SharedVisionMock'
import { GoalsCompareMock } from './mocks/GoalsCompareMock'
import { SmartAlertsMock } from './mocks/SmartAlertsMock'
import { cn } from '@/lib/utils'

const features = [
  {
    id: 'goals',
    title: 'Escolhem o que vem primeiro',
    description:
      'Comparam metas de tamanhos diferentes e decidem juntos o que acelerar agora.',
    mock: <GoalsCompareMock />,
    className: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 'shared',
    title: 'Mesmo painel para os dois',
    description:
      'Aportes e progresso da meta em um só lugar. Os dois veem o mesmo resultado.',
    mock: <SharedVisionMock />,
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    id: 'alerts',
    title: 'Lembretes no ritmo da meta',
    description:
      'Avisos simples de aporte e de ritmo. Assim dá para ajustar cedo e seguir.',
    mock: <SmartAlertsMock />,
    className: 'md:col-span-2 lg:col-span-3',
  },
]

export function BentoFeatures() {
  return (
    <section
      id="features-bento"
      className="w-full scroll-mt-20 bg-gray-50 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 xl:max-w-[1600px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
            O painel que mostra a evolução de vocês.
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-gray-600 md:text-lg">
            Três peças. Um objetivo compartilhado. Mais clareza no caminho.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              className={cn(
                'group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow duration-300 hover:shadow-soft md:p-6',
                feature.className
              )}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="font-heading text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-gray-600 md:text-[15px]">
                {feature.description}
              </p>
              {feature.mock}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
