import { useState } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { useSidebar } from '../../hooks/useSidebar'
import FiltersMobileModal from '../modals/FiltersMobileModal'

export default function DashboardHeader() {
  const { searchText, setSearchText, familyMembers, setSelectedMember, selectedMember } = useFinance()
  const { isMobile } = useSidebar()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleMemberClick = (memberId: string | null) => {
    if (selectedMember === memberId) {
      setSelectedMember(null)
    } else {
      setSelectedMember(memberId)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between max-w-[1400px] mx-auto lg:max-w-[1600px]">
        {/* Busca e Filtros */}
        <div className="flex flex-1 gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Filtros"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
          {isMobile && (
            <FiltersMobileModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
          )}
        </div>

        {/* Widget de Membros */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <button
              onClick={() => handleMemberClick(null)}
              className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                ${selectedMember === null ? 'border-gray-900 bg-gray-900 text-white z-10' : 'border-white bg-gray-300 text-gray-600 hover:scale-110'}
              `}
              title="Todos"
            >
              <span className="text-xs font-semibold">T</span>
            </button>
            {familyMembers.slice(0, 3).map((member) => (
              <button
                key={member.id}
                onClick={() => handleMemberClick(member.id)}
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all relative
                  ${selectedMember === member.id ? 'border-gray-900 bg-gray-900 text-white z-10 scale-110' : 'border-white bg-gray-300 text-gray-600 hover:scale-110'}
                `}
                title={member.name}
              >
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold">{member.name.charAt(0)}</span>
                )}
                {selectedMember === member.id && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-lime-400 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Botão Nova Transação */}
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Nova transação</span>
          </button>
        </div>
      </div>
    </div>
  )
}
