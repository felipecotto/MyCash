import { cn } from '@/lib/utils'

interface WaveBackgroundProps {
  className?: string
  opacity?: number
}

/** Decorative wavy lines — brand system (reusable across sections) */
export function WaveBackground({ className, opacity = 0.35 }: WaveBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 180 Q 200 120 400 180 T 800 180 T 1200 180"
          stroke="#0E7D5E"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
        <path
          d="M0 220 Q 250 160 500 220 T 1000 220 T 1200 200"
          stroke="#0E7D5E"
          strokeWidth="1.25"
          strokeOpacity="0.22"
        />
        <path
          d="M0 260 Q 180 210 360 260 T 720 250 T 1200 270"
          stroke="#C78B55"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
      </svg>
    </div>
  )
}
