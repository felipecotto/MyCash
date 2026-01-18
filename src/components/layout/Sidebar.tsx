import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../../hooks/useSidebar'
import Tooltip from '../ui/Tooltip'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/cards', label: 'Cartões', icon: <CardIcon /> },
  { path: '/transactions', label: 'Transações', icon: <TransactionIcon /> },
  { path: '/profile', label: 'Perfil', icon: <ProfileIcon /> },
]

export default function Sidebar() {
  const { isExpanded, isMobile, toggle } = useSidebar()
  const location = useLocation()

  // Não renderizar sidebar no mobile/tablet
  if (isMobile) {
    return null
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out z-40
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        {isExpanded ? (
          <h1 className="text-xl font-bold text-gray-900">mycash+</h1>
        ) : (
          <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">M</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const NavButton = (
            <Link
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 mx-2 mb-1 rounded-lg
                transition-colors duration-200
                ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <span className={active ? 'text-lime-400' : 'text-gray-600'}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className={`font-medium ${active ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </Link>
          )

          return isExpanded ? (
            NavButton
          ) : (
            <Tooltip key={item.path} content={item.label} position="right">
              {NavButton}
            </Tooltip>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">LM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Felipe Oliveira
              </p>
              <p className="text-xs text-gray-500 truncate">
                felipeoliveira@gmail.com
              </p>
            </div>
          </div>
        ) : (
          <Tooltip content="Felipe Oliveira" position="right">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mx-auto">
              <span className="text-gray-600 text-sm font-semibold">LM</span>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggle}
        className={`
          absolute -right-4 top-20 w-8 h-8 rounded-full bg-white border-2 border-gray-200
          flex items-center justify-center shadow-md hover:shadow-lg
          transition-shadow duration-200 z-50
        `}
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      >
        {isExpanded ? (
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </aside>
  )
}

// Icon Components
function HomeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  )
}

function TransactionIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}
