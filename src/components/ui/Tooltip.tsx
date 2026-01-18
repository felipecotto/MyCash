import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  position?: 'right' | 'left' | 'top' | 'bottom'
}

export default function Tooltip({ children, content, position = 'right' }: TooltipProps) {
  const positionClasses = {
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  }

  return (
    <div className="relative group">
      {children}
      <div
        className={`
          absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded-md
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-opacity duration-200 delay-300 whitespace-nowrap
          ${positionClasses[position]}
        `}
      >
        {content}
        <div
          className={`
            absolute w-0 h-0 border-4 border-transparent
            ${
              position === 'right'
                ? 'right-full top-1/2 -translate-y-1/2 border-r-gray-900'
                : position === 'left'
                ? 'left-full top-1/2 -translate-y-1/2 border-l-gray-900'
                : position === 'top'
                ? 'bottom-0 left-1/2 -translate-x-1/2 border-t-gray-900'
                : 'top-0 left-1/2 -translate-x-1/2 border-b-gray-900'
            }
          `}
        />
      </div>
    </div>
  )
}
