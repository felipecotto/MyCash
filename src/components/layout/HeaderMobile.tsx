import { useState } from 'react'
import { useSidebar } from '../../hooks/useSidebar'
import MenuDropdown from './MenuDropdown'

export default function HeaderMobile() {
  const { isMobile } = useSidebar()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Não renderizar header mobile no desktop
  if (!isMobile) {
    return null
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <h1 className="text-lg font-bold text-gray-900">mycash+</h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          aria-label="Abrir menu"
        >
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-xs font-semibold">LM</span>
          </div>
        </button>
      </header>
      <MenuDropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
