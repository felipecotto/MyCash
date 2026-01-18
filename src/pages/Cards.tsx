import { useFinance } from '../contexts/FinanceContext'
import { formatCurrency } from '../utils/currency.utils'

export default function Cards() {
  const { creditCards } = useFinance()

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'black':
        return 'bg-gray-900 text-white border-gray-900'
      case 'lime':
        return 'bg-lime-400 text-gray-900 border-lime-400'
      case 'white':
        return 'bg-white border-2 border-gray-300 text-gray-900'
      default:
        return 'bg-gray-100 text-gray-900 border-gray-300'
    }
  }

  if (creditCards.length === 0) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum cartão cadastrado</h3>
          <button className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Cadastrar Primeiro Cartão
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cartões de Crédito</h1>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map((card) => {
          const usagePercentage = (card.currentBill / card.limit) * 100
          return (
            <div
              key={card.id}
              className="bg-white border-2 rounded-lg p-6 hover-lift cursor-pointer"
              style={{
                borderColor: card.theme === 'black' ? '#171717' : card.theme === 'lime' ? '#A3FF00' : '#D1D5DB',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{card.name}</h3>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getThemeColors(card.theme)}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fatura Atual</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(card.currentBill)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Limite Total</p>
                  <p className="text-lg font-semibold text-gray-700">{formatCurrency(card.limit)}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Uso</span>
                    <span className="text-sm font-semibold text-gray-900">{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 transition-all duration-500"
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Fechamento</p>
                    <p className="text-sm font-semibold text-gray-900">Dia {card.closingDay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Vencimento</p>
                    <p className="text-sm font-semibold text-gray-900">Dia {card.dueDay}</p>
                  </div>
                </div>

                {card.lastDigits && (
                  <p className="text-xs text-gray-500 font-mono">•••• {card.lastDigits}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
