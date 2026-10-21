'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Auth real virá depois — por enquanto redireciona ao dashboard
    window.setTimeout(() => {
      router.push('/dashboard')
    }, 400)
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-white via-gray-50 to-emerald-50/30 px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(4,120,87,0.05),_transparent_50%)]"
      />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-heading text-2xl font-medium tracking-tight text-ink-900"
          >
            nosso<span className="text-green-700">+</span>
          </Link>
          <p className="mt-2 font-body text-sm text-gray-500">
            Acessem o espaço de metas do casal
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-gray-900">
            Entrar
          </h1>
          <p className="mt-1 font-body text-sm text-gray-500">
            Use o e-mail vinculado à conta compartilhada.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="font-body text-xs font-medium uppercase tracking-wide text-gray-500">
                E-mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 font-body text-base text-gray-900 outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                placeholder="vocês@email.com"
              />
            </label>

            <label className="block space-y-2">
              <span className="font-body text-xs font-medium uppercase tracking-wide text-gray-500">
                Senha
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 font-body text-base text-gray-900 outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                placeholder="••••••••"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando…' : 'Entrar no app'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-sm text-gray-500">
          Ainda não têm acesso?{' '}
          <Link
            href="/#metodo"
            className="font-medium text-green-700 hover:text-emerald-800"
          >
            Entrar na lista de espera
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
