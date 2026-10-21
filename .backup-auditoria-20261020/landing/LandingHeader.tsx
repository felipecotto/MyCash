'use client'

import Link from 'next/link'
import { WaitlistButton } from './WaitlistButton'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#metodo', label: 'Como funciona' },
  { href: '#faq', label: 'FAQ' },
]

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3.5 md:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-heading text-lg font-medium tracking-tight text-ink-900 md:text-xl"
        >
          nosso<span className="text-green-700">+</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <WaitlistButton
          variant="secondary"
          size="sm"
          label="Entrar na lista"
          className="min-h-[44px] shrink-0 font-body"
        />
      </div>
    </header>
  )
}
