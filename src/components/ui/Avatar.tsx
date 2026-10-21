import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative shrink-0 rounded-full bg-mint-100 flex items-center justify-center overflow-hidden font-semibold text-green-700',
  {
    variants: {
      size: {
        xs: 'w-7 h-7 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-9 h-9 text-xs',
        lg: 'w-10 h-10 text-sm',
        xl: 'w-12 h-12 text-sm',
        '2xl': 'w-24 h-24 text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Nome completo — usado no title, no alt da imagem e para gerar a inicial. */
  name: string
  src?: string | null
  /** Borda branca de 2px, usada quando avatares aparecem empilhados (-space-x-2). */
  ringed?: boolean
  className?: string
}

/**
 * Avatar de pessoa (parceiro/a do casal): foto quando existe, iniciais quando não.
 * Único ponto de verdade para esse padrão — usado em listas de membros, o header
 * do dashboard, a página de perfil e o menu lateral.
 */
export default function Avatar({ name, src, size, ringed = false, className }: AvatarProps) {
  return (
    <div
      className={cn(avatarVariants({ size }), ringed && 'border-2 border-white', className)}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}
