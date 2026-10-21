'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'O painel é uma conta conjunta?',
    answer:
      'É um espaço para seguir a meta juntos. Cada um mantém a própria conta. O nosso+ mostra o progresso e os aportes dos dois.',
  },
  {
    question:
      'Serve também para metas mais complexas, tipo dívida e investimento?',
    answer:
      'Sim. Do simples (viagem, reforma) ao complexo (quitar dívida, reserva de emergência, juntar para um imóvel) — o painel acompanha o tamanho do plano de vocês.',
  },
  {
    question: 'Os dois precisam entrar juntos no primeiro dia?',
    answer:
      'Um entra na lista com o e-mail. Quando o acesso abrir, convida a outra pessoa para o mesmo espaço de metas.',
  },
  {
    question: 'O app lê a conta do banco sozinho?',
    answer:
      'Neste momento, vocês registram metas e aportes juntos no painel. Conexões com banco vêm depois, com calma.',
  },
  {
    question: 'Para que serve o nosso+?',
    answer:
      'Para casais construírem algo juntos: combinar aportes, ver o progresso e manter o ritmo até a conquista — o dinheiro é o meio.',
  },
]

export function Faq() {
  const [openId, setOpenId] = useState<number | null>(0)

  return (
    <section id="faq" className="w-full scroll-mt-20 bg-surface-50 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-medium tracking-tight text-ink-900 md:text-3xl">
              Dúvidas frequentes
              <span className="text-green-700">.</span>
            </h2>
          </div>

          <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200 md:mt-14">
            {faqs.map((faq, index) => {
              const isOpen = openId === index
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : index)}
                  >
                    <span className="font-heading text-base font-medium tracking-tight text-ink-900 md:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-ink-400',
                        isOpen && 'border-mint-200 bg-mint-100 text-green-700'
                      )}
                    >
                      {isOpen ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 font-body text-sm font-medium leading-relaxed text-gray-600 md:text-[15px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
