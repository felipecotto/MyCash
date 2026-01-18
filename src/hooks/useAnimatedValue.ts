import { useState, useEffect } from 'react'

/**
 * Hook para animar valores numéricos de zero até o valor final
 */
export function useAnimatedValue(targetValue: number, duration = 800) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (targetValue === 0) {
      setDisplayValue(0)
      return
    }

    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (targetValue - startValue) * easeOut

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(targetValue)
      }
    }

    requestAnimationFrame(animate)
  }, [targetValue, duration])

  return displayValue
}
