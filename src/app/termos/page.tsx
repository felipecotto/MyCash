import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos | nosso+',
  description: 'Termos de uso preliminares do nosso+.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/"
          className="font-heading text-lg font-medium tracking-tight text-ink-900"
        >
          nosso<span className="text-green-700">+</span>
        </Link>
        <h1 className="mt-10 font-heading text-3xl font-medium tracking-tight text-ink-900">
          Termos de Uso
        </h1>
        <p className="mt-2 font-body text-sm text-gray-500">
          Versão preliminar · lista de espera e acesso beta
        </p>

        <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-gray-600">
          <p>
            Ao entrar na lista de espera, você solicita acesso futuro ao
            nosso+, um espaço para casais acelerarem metas financeiras em
            conjunto.
          </p>
          <p>
            O acesso em ondas pode ser limitado. Não garantimos data exata de
            liberação nem features específicas além do que estiver comunicado
            no momento do convite.
          </p>
          <p>
            O nosso+ não é assessoria de investimentos, instituição financeira
            nem substituto de aconselhamento profissional. Vocês são
            responsáveis pelas decisões e aportes registrados no app.
          </p>
          <p>
            Estes termos serão atualizados antes do lançamento amplo do
            produto. O uso contínuo após a publicação da versão vigente implica
            concordância.
          </p>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block font-body text-sm font-medium text-green-700 hover:text-emerald-800"
        >
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
