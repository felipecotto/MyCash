import { ReactNode } from 'react'
import { useSidebar } from '../../hooks/useSidebar'
import Sidebar from './Sidebar'
import HeaderMobile from './HeaderMobile'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isExpanded, isMobile } = useSidebar()

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <HeaderMobile />
      <main
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${!isMobile && (isExpanded ? 'ml-64' : 'ml-20')}
          ${isMobile ? 'pt-16' : ''}
        `}
      >
        {children}
      </main>
    </div>
  )
}
