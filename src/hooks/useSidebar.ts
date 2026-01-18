import { useState, useEffect } from 'react'

export function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggle = () => {
    setIsExpanded((prev) => !prev)
  }

  return {
    isExpanded,
    isMobile,
    toggle,
  }
}
