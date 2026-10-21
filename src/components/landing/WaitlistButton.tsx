'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WaitlistButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  label?: string
}

type FormErrors = { email?: string; privacy?: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled])'

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
  const [errors, setErrors] = useState<FormErrors>({})

  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const privacyRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLParagraphElement>(null)

  const uid = useId()
  const titleId = `${uid}-title`
  const descriptionId = `${uid}-description`
  const emailErrorId = `${uid}-email-error`
  const privacyErrorId = `${uid}-privacy-error`

  const handleClose = useCallback(() => {
    setOpen(false)
    setSubmitted(false)
    setEmail('')
    setAcceptedPrivacy(false)
    setErrors({})
    triggerRef.current?.focus()
  }, [])

  // Esc fecha, Tab fica preso no diálogo, scroll da página travado e foco inicial no e-mail
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => emailRef.current?.focus())

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, handleClose])

  // Depois do envio, o foco vai para a confirmação (o formulário deixa de existir)
  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    const next: FormErrors = {}

    if (!value) next.email = 'Informe o seu e-mail.'
    else if (!EMAIL_PATTERN.test(value))
      next.email = 'Confira o e-mail. Ele precisa ter @ e um domínio, como voce@email.com.'
    if (!acceptedPrivacy)
      next.privacy = 'Para entrar na lista, aceite a Política de Privacidade.'

    setErrors(next)
    if (next.email) {
      emailRef.current?.focus()
      return
    }
    if (next.privacy) {
      privacyRef.current?.focus()
      return
    }
    // Protótipo: o envio ainda é simulado, nenhum dado sai do navegador
    setSubmitted(true)
  }

  return (
    <>
      <Button
        ref={triggerRef}
        variant={variant}
        size={size}
        className={cn('font-body', className)}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
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
            <div
              aria-hidden
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
              onClick={handleClose}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={submitted ? undefined : descriptionId}
              className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lift md:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface-50 hover:text-ink-900"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              {submitted ? (
                <div className="space-y-3 pt-4 text-center">
                  <p
                    ref={successRef}
                    id={titleId}
                    tabIndex={-1}
                    className="font-heading text-xl font-medium text-gray-900 outline-none"
                  >
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
                    id={titleId}
                    className="pr-10 font-heading text-xl font-medium tracking-tight text-gray-900"
                  >
                    Entrar na lista de espera
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-2 font-body text-sm leading-relaxed text-gray-600"
                  >
                    Use o seu e-mail. Liberamos o acesso em ondas pequenas.
                    Depois, você convida a outra pessoa.
                  </p>
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor={`${uid}-email`}
                        className="block font-body text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Seu e-mail
                      </label>
                      <input
                        ref={emailRef}
                        id={`${uid}-email`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        placeholder="voce@email.com"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? emailErrorId : undefined}
                        className={cn(
                          'h-12 w-full rounded-full border bg-white px-4 font-body text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:ring-2',
                          errors.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-green-700 focus:ring-green-700/20'
                        )}
                      />
                      {errors.email ? (
                        <p id={emailErrorId} className="font-body text-sm text-red-600">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          ref={privacyRef}
                          type="checkbox"
                          checked={acceptedPrivacy}
                          onChange={(e) => {
                            setAcceptedPrivacy(e.target.checked)
                            if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: undefined }))
                          }}
                          aria-invalid={errors.privacy ? true : undefined}
                          aria-describedby={errors.privacy ? privacyErrorId : undefined}
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
                      {errors.privacy ? (
                        <p id={privacyErrorId} className="pl-7 font-body text-sm text-red-600">
                          {errors.privacy}
                        </p>
                      ) : null}
                    </div>

                    <Button type="submit" size="lg" className="w-full">
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
