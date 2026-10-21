import { useState, FormEvent } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { TransactionType } from '../../types/transaction'
import { parseCurrencyInput } from '../../utils/currency.utils'
import { isPositiveNumber } from '../../utils/validation.utils'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Transação"
      description="Registre uma nova transação financeira"
      side="right"
      widthClassName="max-w-xl"
      footer={
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" form="new-transaction-form" className="flex-1">
            Salvar Transação
          </Button>
        </div>
      }
    >
      <form id="new-transaction-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Toggle Tipo */}
        <div className="flex gap-2 bg-surface-50 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              type === 'income'
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Receita
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              type === 'expense'
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Despesa
          </button>
        </div>

        {/* Valor */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Valor da Transação</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-600 font-medium">R$</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg ${
                errors.amount ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-700`}
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Supermercado Semanal"
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.description ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.category ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
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
            <label className="block text-sm font-medium text-ink-900 mb-2">Quem</label>
            <select
              value={memberId || ''}
              onChange={(e) => setMemberId(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Os dois (compartilhado)</option>
              {familyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Conta/Cartão */}
          <div>
            <label className="block text-sm font-medium text-ink-900 mb-2">Conta / Cartão</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.accountId ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-700`}
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
            <label className="block text-sm font-medium text-ink-900 mb-2">Parcelamento</label>
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
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
          <div className="bg-mint-50 border border-mint-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => {
                  setIsRecurring(e.target.checked)
                  if (e.target.checked) setInstallments(1)
                }}
                disabled={installments > 1}
                className="mt-1 w-5 h-5 rounded border-gray-200"
              />
              <div className="flex-1">
                <p className="font-semibold text-ink-900">Despesa Recorrente</p>
                <p className="text-sm text-ink-600 mt-1">
                  {installments > 1
                    ? 'Não disponível para compras parceladas'
                    : 'Esta despesa se repete mensalmente'}
                </p>
              </div>
            </label>
          </div>
        )}
      </form>
    </Drawer>
  )
}
