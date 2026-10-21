import { useFinance } from '../../contexts/FinanceContext'
import { CreditCard } from '../../types/creditCard'
import { formatCurrency } from '../../utils/currency.utils'
import { formatDate } from '../../utils/date.utils'
import DonutChart from '../ui/DonutChart'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'
import EmptyState from '../ui/EmptyState'

interface CardDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  card: CreditCard | null
}

export default function CardDetailsModal({ isOpen, onClose, card }: CardDetailsModalProps) {
  const { transactions, familyMembers } = useFinance()

  const usagePercentage = card ? (card.currentBill / card.limit) * 100 : 0
  const availableLimit = card ? card.limit - card.currentBill : 0

  // Transações vinculadas a este cartão
  const cardTransactions = card
    ? transactions.filter(
        (t) => t.type === 'expense' && t.accountId === card.id && t.status === 'completed'
      )
    : []

  const holder = card ? familyMembers.find((m) => m.id === card.holderId) : undefined

  return (
    <Drawer
      isOpen={isOpen && !!card}
      onClose={onClose}
      title={card?.name}
      side="right"
      widthClassName="max-w-4xl"
      footer={
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            Ver Extrato Completo
          </Button>
          <Button variant="outline" className="flex-1">
            Adicionar Despesa
          </Button>
          <Button variant="outline" className="flex-1">
            Editar Cartão
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      }
    >
      {card && (
        <div className="space-y-6">
          {/* Informações do Cartão */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-50 rounded-lg p-4">
              <p className="text-sm text-ink-600 mb-1">Limite Total</p>
              <p className="text-xl font-bold text-ink-900">{formatCurrency(card.limit)}</p>
            </div>
            <div className="bg-surface-50 rounded-lg p-4">
              <p className="text-sm text-ink-600 mb-1">Fatura Atual</p>
              <p className="text-xl font-bold text-red-500">{formatCurrency(card.currentBill)}</p>
            </div>
            <div className="bg-surface-50 rounded-lg p-4">
              <p className="text-sm text-ink-600 mb-1">Limite Disponível</p>
              <p className="text-xl font-bold text-green-700">{formatCurrency(availableLimit)}</p>
            </div>
          </div>

          {/* Gráfico de Uso */}
          <div className="bg-surface-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-ink-900 mb-4">Uso do Limite</h3>
            <div className="flex items-center justify-center gap-8">
              <DonutChart percentage={usagePercentage} size={120} color="#0E7D5E" />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-700"></div>
                  <span className="text-sm text-ink-600">Usado: {usagePercentage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                  <span className="text-sm text-ink-600">Disponível: {(100 - usagePercentage).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-ink-600 mb-1">Dia de Fechamento</p>
              <p className="text-lg font-semibold text-ink-900">Dia {card.closingDay}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-ink-600 mb-1">Dia de Vencimento</p>
              <p className="text-lg font-semibold text-ink-900">Dia {card.dueDay}</p>
            </div>
            {card.lastDigits && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-ink-600 mb-1">Últimos Dígitos</p>
                <p className="text-lg font-mono font-semibold text-ink-900">•••• {card.lastDigits}</p>
              </div>
            )}
            {holder && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-ink-600 mb-1">Titular</p>
                <p className="text-lg font-semibold text-ink-900">{holder.name}</p>
              </div>
            )}
          </div>

          {/* Tabela de Despesas */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-4">Despesas Vinculadas</h3>
            {cardTransactions.length === 0 ? (
              <EmptyState size="sm" message="Nenhuma despesa registrada neste cartão ainda." className="bg-surface-50 rounded-lg" />
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-ink-600">Data</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-ink-600">Descrição</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-ink-600">Categoria</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-ink-600">Parcelas</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-ink-600">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cardTransactions.slice(0, 10).map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-surface-50">
                        <td className="px-4 py-3 text-sm text-ink-600">
                          {formatDate(new Date(transaction.date))}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-ink-900">{transaction.description}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 text-xs bg-surface-50 text-ink-600 rounded">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-ink-600">
                          {transaction.installments > 1
                            ? `${transaction.currentInstallment}/${transaction.installments}`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-bold text-ink-900">
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  )
}
