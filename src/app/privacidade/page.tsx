import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacidade | nosso+',
  description: 'Como o nosso+ trata dados na lista de espera e no produto.',
}

export default function PrivacyPage() {
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
          Política de Privacidade
        </h1>
        <p className="mt-2 font-body text-sm text-gray-500">
          Versão preliminar · atualizada para a fase de lista de espera
        </p>

        <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-gray-600">
          <p>
            Coletamos o e-mail informado na lista de espera apenas para
            comunicar abertura de acesso ao nosso+ e informações relacionadas
            ao produto.
          </p>
          <p>
            Não vendemos seus dados. Não compartilhamos a lista com terceiros
            para marketing. Você pode solicitar exclusão do e-mail a qualquer
            momento respondendo à comunicação ou pelo canal indicado no site.
          </p>
          <p>
            Quando o app estiver em uso, trataremos dados financeiros que você
            e o/a parceiro(a) registrarem no espaço compartilhado conforme esta
            política atualizada e a legislação aplicável (incluindo a LGPD).
          </p>
          <p>
            Esta página é um texto operacional inicial e será expandida antes do
            lançamento público completo.
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
