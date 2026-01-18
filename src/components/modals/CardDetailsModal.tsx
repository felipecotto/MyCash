import { useFinance } from '../../contexts/FinanceContext'
import { CreditCard } from '../../types/creditCard'
import { formatCurrency } from '../../utils/currency.utils'
import { formatDate } from '../../utils/date.utils'
import DonutChart from '../ui/DonutChart'

interface CardDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  card: CreditCard | null
}

export default function CardDetailsModal({ isOpen, onClose, card }: CardDetailsModalProps) {
  const { transactions, familyMembers } = useFinance()

  if (!isOpen || !card) return null

  const usagePercentage = (card.currentBill / card.limit) * 100
  const availableLimit = card.limit - card.currentBill

  // Transações vinculadas a este cartão
  const cardTransactions = transactions.filter(
    (t) => t.type === 'expense' && t.accountId === card.id && t.status === 'completed'
  )

  const holder = familyMembers.find((m) => m.id === card.holderId)

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-gray-900">{card.name}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Informações do Cartão */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Limite Total</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(card.limit)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Fatura Atual</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(card.currentBill)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Limite Disponível</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(availableLimit)}</p>
              </div>
            </div>

            {/* Gráfico de Uso */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Uso do Limite</h3>
              <div className="flex items-center justify-center gap-8">
                <DonutChart percentage={usagePercentage} size={120} color="#171717" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                    <span className="text-sm text-gray-600">Usado: {usagePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                    <span className="text-sm text-gray-600">Disponível: {(100 - usagePercentage).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Dia de Fechamento</p>
                <p className="text-lg font-semibold text-gray-900">Dia {card.closingDay}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Dia de Vencimento</p>
                <p className="text-lg font-semibold text-gray-900">Dia {card.dueDay}</p>
              </div>
              {card.lastDigits && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Últimos Dígitos</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">•••• {card.lastDigits}</p>
                </div>
              )}
              {holder && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Titular</p>
                  <p className="text-lg font-semibold text-gray-900">{holder.name}</p>
                </div>
              )}
            </div>

            {/* Tabela de Despesas */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Despesas Vinculadas</h3>
              {cardTransactions.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Nenhuma despesa registrada neste cartão ainda.</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Descrição</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Categoria</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Parcelas</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cardTransactions.slice(0, 10).map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatDate(new Date(transaction.date))}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{transaction.description}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {transaction.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {transaction.installments > 1
                              ? `${transaction.currentInstallment}/${transaction.installments}`
                              : '-'}
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                            {formatCurrency(transaction.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Ver Extrato Completo
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Adicionar Despesa
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Editar Cartão
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
