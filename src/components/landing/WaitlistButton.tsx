'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WaitlistButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  label?: string
}

export function WaitlistButton({
  variant = 'default',
  size = 'default',
  className,
  label = 'Entrar na Lista de Espera',
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !acceptedPrivacy) return
    setSubmitted(true)
  }

  function handleClose() {
    setOpen(false)
    setSubmitted(false)
    setEmail('')
    setAcceptedPrivacy(false)
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn('font-body', className)}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-4 md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Fechar"
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
              onClick={handleClose}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="waitlist-title"
              className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lift md:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <div className="space-y-3 text-center">
                  <p className="font-heading text-xl font-medium text-gray-900">
                    Você está na lista.
                  </p>
                  <p className="font-body text-sm leading-relaxed text-gray-600">
                    Quando a próxima onda abrir, avisamos por e-mail. Aí você
                    convida a outra pessoa para acelerar as metas juntos.
                  </p>
                  <Button className="mt-4 w-full" onClick={handleClose}>
                    Fechar
                  </Button>
                </div>
              ) : (
                <>
                  <h2
                    id="waitlist-title"
                    className="font-heading text-xl font-medium tracking-tight text-gray-900"
                  >
                    Entrar na lista de espera
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">
                    Use o seu e-mail. Liberamos o acesso em ondas pequenas.
                    Depois, você convida a outra pessoa.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <label className="block space-y-2">
                      <span className="font-body text-xs font-medium uppercase tracking-wide text-gray-500">
                        Seu e-mail
                      </span>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@email.com"
                        className="h-12 w-full rounded-full border border-gray-200 bg-white px-4 font-body text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
                      />
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-green-700 focus:ring-green-700/30"
                      />
                      <span className="font-body text-xs leading-relaxed text-gray-500">
                        Concordo com o tratamento dos meus dados conforme a{' '}
                        <Link
                          href="/privacidade"
                          className="font-medium text-green-700 underline-offset-2 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!acceptedPrivacy}
                    >
                      Garantir lugar na onda
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
