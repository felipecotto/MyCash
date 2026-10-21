import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  maxWidthClassName?: string
}

/**
 * Container de página padrão do produto: mesma largura de leitura, gutter e
 * respiro vertical em todas as telas (Home, detalhes de meta, cartões,
 * transações, perfil), inspirado na contenção elegante de painéis como
 * Stripe e Airbnb — nunca esticar o conteúdo de ponta a ponta em telas largas.
 */
export default function PageContainer({
  children,
  className = '',
  maxWidthClassName = 'max-w-[1280px]',
}: PageContainerProps) {
  return (
    <div className={`px-4 md:px-6 lg:px-8 py-6 md:py-8 ${maxWidthClassName} mx-auto w-full ${className}`}>
      {children}
    </div>
  )
}
