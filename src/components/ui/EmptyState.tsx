import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const sizeStyles = {
  sm: { wrapper: 'py-8', icon: 'w-12 h-12 mb-3' },
  md: { wrapper: 'py-12', icon: 'w-16 h-16 mb-4' },
  lg: { wrapper: 'py-16', icon: 'w-24 h-24 mb-4' },
} as const

export interface EmptyStateProps {
  icon?: ReactNode
  title?: string
  message?: string
  action?: ReactNode
  size?: keyof typeof sizeStyles
  tone?: 'neutral' | 'success'
  className?: string
}

/**
 * Estado vazio padrão do produto: usado quando uma lista, tabela ou carrossel
 * ainda não tem conteúdo (nenhum gasto, nenhum cartão, nenhum link salvo...).
 * `size` controla o quanto de respiro o vazio ocupa — `sm` para um bloco
 * dentro de um card já existente, `lg` para uma página inteira vazia.
 */
export default function EmptyState({
  icon,
  title,
  message,
  action,
  size = 'sm',
  tone = 'neutral',
  className,
}: EmptyStateProps) {
  const s = sizeStyles[size]

  return (
    <div className={cn('text-center', s.wrapper, className)}>
      {icon && (
        <div
          className={cn(
            'rounded-full flex items-center justify-center mx-auto',
            s.icon,
            tone === 'success' ? 'bg-mint-100 text-green-700' : 'bg-surface-50 text-ink-400'
          )}
        >
          {icon}
        </div>
      )}
      {title && <h3 className="text-xl font-bold text-ink-900 mb-2">{title}</h3>}
      {message && <p className="text-ink-600">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
