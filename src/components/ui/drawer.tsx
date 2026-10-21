'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  side?: 'right' | 'bottom'
  footer?: React.ReactNode
  children: React.ReactNode
  widthClassName?: string
  contentClassName?: string
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  side = 'right',
  footer,
  children,
  widthClassName,
  contentClassName,
}: DrawerProps) {
  React.useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const isBottom = side === 'bottom'

  const panelVariants = isBottom
    ? {
        hidden: { y: '100%' },
        visible: { y: 0 },
        exit: { y: '100%' },
      }
    : {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink-900/40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'relative bg-white shadow-xl flex flex-col',
              isBottom
                ? 'mt-auto w-full max-h-[90vh] rounded-t-3xl'
                : cn('ml-auto h-full w-full', widthClassName ?? 'max-w-md'),
              contentClassName
            )}
          >
            {isBottom && (
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="h-1.5 w-10 rounded-full bg-gray-200" />
              </div>
            )}

            {(title || description) && (
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4 shrink-0">
                <div>
                  {title && (
                    <h2 className="text-lg font-semibold text-ink-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-ink-600">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar"
                  className="shrink-0 rounded-full p-2 text-ink-600 hover:bg-surface-50 hover:text-ink-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

            {footer && (
              <div className="border-t border-gray-200 px-6 py-4 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
