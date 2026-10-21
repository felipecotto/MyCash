import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'nosso+ | Alcancem metas a dois',
  description:
    'A história de um casal construindo algo juntos — da viagem à reserva, da reforma à quitação. O dinheiro é só o meio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${GeistSans.variable} ${GeistMono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
