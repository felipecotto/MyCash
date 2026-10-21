'use client'

import Link from 'next/link'
import { WaitlistButton } from './WaitlistButton'
import { ImagePlaceholder } from './ImagePlaceholder'

const footerColumns = [
  {
    title: 'Produto',
    links: [
      { href: '#metodo', label: 'Como funciona' },
      { href: '#features', label: 'Painel' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/privacidade', label: 'Privacidade' },
      { href: '/termos', label: 'Termos' },
      { href: '/login', label: 'Acessar o app' },
    ],
  },
]

export function FooterCTA() {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="grid overflow-hidden rounded-[1.75rem] md:grid-cols-2">
          <div className="relative flex flex-col justify-center bg-green-700 px-8 py-14 md:px-10 md:py-16 lg:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-terracotta-300/30 blur-3xl"
            />
            <h2 className="relative font-heading text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-[2.25rem] lg:leading-snug">
              Deem o primeiro passo para a próxima conquista. Juntos
              <span className="text-terracotta-300">.</span>
            </h2>
            <p className="relative mt-5 max-w-sm font-body text-base font-medium leading-relaxed text-mint-100">
              Entre na lista com o seu e-mail. Quando o acesso abrir, você
              convida a outra pessoa.
            </p>
            <div className="relative mt-8">
              <WaitlistButton
                size="lg"
                variant="secondary"
                label="Quero acelerar nossas metas"
                className="bg-ink-900 hover:bg-ink-600"
              />
            </div>
          </div>

          <div className="relative min-h-[280px] md:min-h-full">
            <ImagePlaceholder
              id="footer-couple"
              label="Casal na cozinha"
              aspect="landscape"
              rounded="none"
              hideMeta
              className="h-full min-h-[280px] rounded-none md:absolute md:inset-0 md:aspect-auto"
              objectPosition="center 30%"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-ink-900 text-white">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-14 md:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div>
              <Link
                href="/"
                className="font-heading text-lg font-medium tracking-tight text-white"
              >
                nosso<span className="text-green-500">+</span>
              </Link>
              <p className="mt-4 max-w-xs font-body text-sm font-medium leading-relaxed text-ink-400">
                A história de um casal construindo algo juntos — o dinheiro é
                só o meio.
              </p>
            </div>

            <div className="flex gap-14 sm:gap-16">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <p className="font-body text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-body text-sm text-gray-300 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-body text-xs text-ink-400">
              © {new Date().getFullYear()} nosso+
            </p>
            <p className="font-body text-xs text-ink-400">
              Feito para casais com meta em comum
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
