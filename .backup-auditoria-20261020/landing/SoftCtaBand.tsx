'use client'

import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { ImagePlaceholder } from './ImagePlaceholder'

export function SoftCtaBand() {
  return (
    <section className="w-full bg-mint-100">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-stretch gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between md:gap-12 md:px-6 md:py-14 lg:px-8">
        <div className="flex min-w-0 flex-1 items-start gap-4 md:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="font-heading text-lg font-medium tracking-tight text-ink-900 md:text-xl">
              Um espaço só de vocês para guardar e evoluir.
            </p>
            <p className="mt-2 font-body text-sm font-medium leading-relaxed text-ink-600">
              Dados do casal com cuidado. Progresso à vista. Ritmo combinado.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden w-28 shrink-0 overflow-hidden rounded-xl sm:block">
            <ImagePlaceholder
              id="band-secure"
              label="Retrato curto"
              aspect="square"
              tone="emerald"
              rounded="xl"
              hideMeta
              objectPosition="center 20%"
            />
          </div>
          <Link
            href="#faq"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-green-700 px-5 font-body text-sm font-medium text-white transition-colors hover:bg-green-500"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  )
}
