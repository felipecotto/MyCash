import { useState } from 'react'
import { useFinance } from '../../contexts/FinanceContext'

interface FiltersMobileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FiltersMobileModal({ isOpen, onClose }: FiltersMobileModalProps) {
  const {
    transactionType,
    selectedMember,
    familyMembers,
    setTransactionType,
    setSelectedMember,
    dateRange,
    setDateRange,
  } = useFinance()

  const [tempType, setTempType] = useState(transactionType)
  const [tempMember, setTempMember] = useState(selectedMember)
  const [tempDateRange, setTempDateRange] = useState(dateRange)

  const handleApply = () => {
    setTransactionType(tempType)
    setSelectedMember(tempMember)
    setDateRange(tempDateRange)
    onClose()
  }

  const handleCancel = () => {
    setTempType(transactionType)
    setTempMember(selectedMember)
    setTempDateRange(dateRange)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={handleCancel}
      />
      <div
        className={`
          fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50
          transform transition-transform duration-300
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[90vh] flex flex-col
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
          <button
            onClick={handleCancel}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Tipo de Transação */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Tipo de Transação</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTempType('all')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  tempType === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setTempType('income')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  tempType === 'income'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                Receitas
              </button>
              <button
                type="button"
                onClick={() => setTempType('expense')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  tempType === 'expense'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                Despesas
              </button>
            </div>
          </div>

          {/* Membro da Família */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Membro da Família</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTempMember(null)}
                className={`px-4 py-3 rounded-full font-medium transition-colors ${
                  tempMember === null
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                Todos
              </button>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setTempMember(member.id)}
                  className={`
                    px-4 py-3 rounded-full font-medium transition-colors flex items-center gap-2
                    ${tempMember === member.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-300 text-gray-600'}
                  `}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold text-gray-600">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <span>{member.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Período */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Período</label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  const start = new Date(now.getFullYear(), now.getMonth(), 1)
                  setTempDateRange({ startDate: start, endDate: now })
                }}
                className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-left font-medium hover:bg-gray-50"
              >
                Este mês
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                  const end = new Date(now.getFullYear(), now.getMonth(), 0)
                  setTempDateRange({ startDate: start, endDate: end })
                }}
                className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-left font-medium hover:bg-gray-50"
              >
                Mês passado
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  const start = new Date(now.getFullYear(), now.getMonth() - 3, 1)
                  setTempDateRange({ startDate: start, endDate: now })
                }}
                className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-left font-medium hover:bg-gray-50"
              >
                Últimos 3 meses
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  const start = new Date(now.getFullYear(), 0, 1)
                  setTempDateRange({ startDate: start, endDate: now })
                }}
                className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-left font-medium hover:bg-gray-50"
              >
                Este ano
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleApply}
            className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </>
  )
}
