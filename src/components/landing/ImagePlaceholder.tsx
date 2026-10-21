'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { landingImages, type LandingImageId } from './imageAssets'

interface ImagePlaceholderProps {
  /** ID used in AI prompts / file naming — maps to landingImages when present */
  id: string
  label: string
  hint?: string
  aspect?: 'square' | 'portrait' | 'landscape' | 'wide'
  tone?: 'emerald' | 'mint' | 'cream' | 'dark'
  className?: string
  rounded?: 'xl' | '2xl' | '3xl' | 'none'
  /** Hide id/label overlay (useful when parent adds caption) */
  hideMeta?: boolean
  /** next/image object-fit */
  objectPosition?: string
}

const aspectClass = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/10]',
}

const toneClass = {
  emerald: 'bg-green-700 text-mint-50',
  mint: 'bg-mint-100 text-green-900',
  cream: 'bg-surface-50 text-ink-600',
  dark: 'bg-green-900 text-mint-100',
}

export function ImagePlaceholder({
  id,
  label,
  hint,
  aspect = 'portrait',
  tone = 'emerald',
  className,
  rounded = '2xl',
  hideMeta = false,
  objectPosition = 'center',
}: ImagePlaceholderProps) {
  const radius =
    rounded === 'none'
      ? ''
      : rounded === 'xl'
        ? 'rounded-xl'
        : rounded === '3xl'
          ? 'rounded-[1.75rem]'
          : 'rounded-2xl'

  const asset =
    id in landingImages ? landingImages[id as LandingImageId] : null

  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden',
        aspectClass[aspect],
        !asset && toneClass[tone],
        radius,
        className
      )}
      role="img"
      aria-label={asset?.alt ?? label}
      data-image-id={id}
    >
      {asset ? (
        <Image
          src={asset.file}
          alt={asset.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover"
          style={{ objectPosition }}
          priority={id === 'hero-lifestyle'}
        />
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.22),_transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 bottom-0 h-2/3 w-1/2 rounded-full bg-black/10 blur-3xl"
          />
        </>
      )}

      {!asset && !hideMeta ? (
        <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 md:p-5">
          <p className="font-body text-[10px] font-medium uppercase tracking-[0.14em] opacity-70">
            {id}
          </p>
          <p className="mt-1 font-heading text-sm font-medium tracking-tight md:text-base">
            {label}
          </p>
          {hint ? (
            <p className="mt-1 max-w-[28ch] font-body text-xs leading-relaxed opacity-75">
              {hint}
            </p>
          ) : null}
        </div>
      ) : (
        <span className="sr-only">{asset?.alt ?? label}</span>
      )}
    </div>
  )
}
