import { useState } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import Avatar from '../ui/Avatar'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleCancel}
      title="Filtros"
      side="bottom"
      footer={
        <Button onClick={handleApply} className="w-full">
          Aplicar Filtros
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Tipo de Transação */}
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-3">Tipo de Transação</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTempType('all')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                tempType === 'all'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-200 text-ink-600'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setTempType('income')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                tempType === 'income'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-200 text-ink-600'
              }`}
            >
              Receitas
            </button>
            <button
              type="button"
              onClick={() => setTempType('expense')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                tempType === 'expense'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-200 text-ink-600'
              }`}
            >
              Despesas
            </button>
          </div>
        </div>

        {/* Quem */}
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-3">Quem</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTempMember(null)}
              className={`px-4 py-3 rounded-full font-medium transition-colors ${
                tempMember === null
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-200 text-ink-600'
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
                  ${tempMember === member.id ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-ink-600'}
                `}
              >
                <Avatar name={member.name} src={member.avatar} size="sm" />
                <span>{member.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Período */}
        <div>
          <label className="block text-sm font-bold text-ink-900 mb-3">Período</label>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                const now = new Date()
                const start = new Date(now.getFullYear(), now.getMonth(), 1)
                setTempDateRange({ startDate: start, endDate: now })
              }}
              className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-left font-medium hover:bg-surface-50"
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
              className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-left font-medium hover:bg-surface-50"
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
              className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-left font-medium hover:bg-surface-50"
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
              className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-left font-medium hover:bg-surface-50"
            >
              Este ano
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
