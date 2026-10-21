import { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
  {
    variants: {
      tone: {
        success: 'text-green-700 bg-mint-100',
        warning: 'text-terracotta-700 bg-terracotta-100',
        neutral: 'text-ink-600 bg-surface-50',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  }
)

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode
  icon?: ReactNode
  className?: string
}

/**
 * Etiqueta compacta (pílula) para categoria e status — categorias de meta,
 * ritmo de aportes ("Adiantados", "Atenção", "Atrasado"), e futuros estados
 * do tipo bom/atenção/neutro. As tonalidades seguem a mesma leitura de cor
 * usada no restante do produto: verde/mint = indo bem, terracota = atenção.
 */
export default function Badge({ children, icon, tone, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)}>
      {icon}
      {children}
    </span>
  )
}
