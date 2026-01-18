import { useState, FormEvent } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { TransactionType } from '../../types/transaction'
import { parseCurrencyInput } from '../../utils/currency.utils'
import { isPositiveNumber } from '../../utils/validation.utils'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const { addTransaction, bankAccounts, creditCards, familyMembers } = useFinance()
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [memberId, setMemberId] = useState<string | null>(null)
  const [accountId, setAccountId] = useState('')
  const [installments, setInstallments] = useState(1)
  const [isRecurring, setIsRecurring] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isCreditCard = creditCards.some((c) => c.id === accountId)
  const showInstallments = isCreditCard && type === 'expense'

  const categories = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Saúde',
    'Lazer',
    'Manutenção',
    'Salário',
    'Outros',
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validações
    const amountNum = parseCurrencyInput(amount)
    if (!isPositiveNumber(amountNum)) {
      newErrors.amount = 'Valor deve ser maior que zero'
    }

    if (description.trim().length < 3) {
      newErrors.description = 'Descrição deve ter pelo menos 3 caracteres'
    }

    if (!category) {
      newErrors.category = 'Categoria é obrigatória'
    }

    if (!accountId) {
      newErrors.accountId = 'Conta/Cartão é obrigatório'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Criar transação
    const finalInstallments = isRecurring ? 1 : installments

    addTransaction({
      type,
      amount: amountNum,
      description: description.trim(),
      category,
      date: new Date(),
      accountId,
      memberId,
      installments: finalInstallments,
      currentInstallment: 1,
      status: 'completed',
      isRecurring,
      isPaid: false,
    })

    // Limpar formulário
    setAmount('')
    setDescription('')
    setCategory('')
    setMemberId(null)
    setAccountId('')
    setInstallments(1)
    setIsRecurring(false)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setAmount('')
    setDescription('')
    setCategory('')
    setMemberId(null)
    setAccountId('')
    setInstallments(1)
    setIsRecurring(false)
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={handleClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  type === 'income' ? 'bg-lime-400' : 'bg-gray-900'
                }`}
              >
                <svg
                  className={`w-8 h-8 ${type === 'income' ? 'text-gray-900' : 'text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {type === 'income' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  )}
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Nova Transação</h2>
                <p className="text-sm text-gray-600">Registre uma nova transação financeira</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Toggle Tipo */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  type === 'income'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  type === 'expense'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Despesa
              </button>
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Valor da Transação</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">R$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                />
              </div>
              {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Descrição</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Supermercado Semanal"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-gray-900`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-gray-900`}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* Grid: Membro e Conta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Membro */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Membro</label>
                <select
                  value={memberId || ''}
                  onChange={(e) => setMemberId(e.target.value || null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Família (Geral)</option>
                  {familyMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conta/Cartão */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Conta / Cartão</label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.accountId ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                >
                  <option value="">Selecione uma conta</option>
                  <optgroup label="Contas Bancárias">
                    {bankAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cartões de Crédito">
                    {creditCards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.accountId && <p className="mt-1 text-sm text-red-500">{errors.accountId}</p>}
              </div>
            </div>

            {/* Parcelamento (condicional) */}
            {showInstallments && !isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Parcelamento</label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num === 1 ? 'À vista (1x)' : `${num}x`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Despesa Recorrente (condicional) */}
            {type === 'expense' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => {
                      setIsRecurring(e.target.checked)
                      if (e.target.checked) setInstallments(1)
                    }}
                    disabled={installments > 1}
                    className="mt-1 w-5 h-5 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Despesa Recorrente</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {installments > 1
                        ? 'Não disponível para compras parceladas'
                        : 'Esta despesa se repete mensalmente'}
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Footer */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Salvar Transação
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
