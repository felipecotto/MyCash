import { useState } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { formatCurrency } from '../../utils/currency.utils'

export default function CreditCardsWidget() {
  const { creditCards } = useFinance()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const totalPages = Math.ceil(creditCards.length / itemsPerPage)
  const paginatedCards = creditCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'black':
        return 'bg-gray-900 text-white'
      case 'lime':
        return 'bg-lime-400 text-gray-900'
      case 'white':
        return 'bg-white border-2 border-gray-300 text-gray-900'
      default:
        return 'bg-gray-100 text-gray-900'
    }
  }

  if (creditCards.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-gray-500 text-center">Nenhum cartão cadastrado</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Cartões de Crédito</h3>
        <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {paginatedCards.map((card) => {
          const usagePercentage = (card.currentBill / card.limit) * 100
          return (
            <div
              key={card.id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getThemeColors(card.theme)}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{card.name}</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(card.currentBill)}</p>
                  {card.lastDigits && (
                    <p className="text-xs text-gray-500">•••• {card.lastDigits}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                    {usagePercentage.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
