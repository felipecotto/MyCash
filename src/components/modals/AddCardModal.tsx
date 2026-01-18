import { useState, FormEvent } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { CreditCardTheme } from '../../types/creditCard'
import { parseCurrencyInput } from '../../utils/currency.utils'
import { isPositiveNumber } from '../../utils/validation.utils'

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const { addCreditCard, addBankAccount, familyMembers } = useFinance()
  const [type, setType] = useState<'account' | 'card'>('account')
  const [name, setName] = useState('')
  const [holderId, setHolderId] = useState('')
  const [balance, setBalance] = useState('')
  const [limit, setLimit] = useState('')
  const [closingDay, setClosingDay] = useState('')
  const [dueDay, setDueDay] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [theme, setTheme] = useState<CreditCardTheme>('black')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    }

    if (!holderId) {
      newErrors.holderId = 'Titular é obrigatório'
    }

    if (type === 'account') {
      const balanceNum = parseCurrencyInput(balance)
      if (!isPositiveNumber(balanceNum)) {
        newErrors.balance = 'Saldo inicial é obrigatório'
      }
    } else {
      const closingNum = parseInt(closingDay)
      const dueNum = parseInt(dueDay)
      const limitNum = parseCurrencyInput(limit)

      if (!closingDay || closingNum < 1 || closingNum > 31) {
        newErrors.closingDay = 'Dia de fechamento deve ser entre 1 e 31'
      }

      if (!dueDay || dueNum < 1 || dueNum > 31) {
        newErrors.dueDay = 'Dia de vencimento deve ser entre 1 e 31'
      }

      if (!isPositiveNumber(limitNum)) {
        newErrors.limit = 'Limite total deve ser maior que zero'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (type === 'account') {
      addBankAccount({
        name: name.trim(),
        type: 'checking',
        holderId,
        balance: parseCurrencyInput(balance),
      })
    } else {
      addCreditCard({
        name: name.trim(),
        holderId,
        limit: parseCurrencyInput(limit),
        currentBill: 0,
        closingDay: parseInt(closingDay),
        dueDay: parseInt(dueDay),
        theme,
        lastDigits: lastDigits.trim() || null,
      })
    }

    // Limpar formulário
    setName('')
    setHolderId('')
    setBalance('')
    setLimit('')
    setClosingDay('')
    setDueDay('')
    setLastDigits('')
    setTheme('black')
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setName('')
    setHolderId('')
    setBalance('')
    setLimit('')
    setClosingDay('')
    setDueDay('')
    setLastDigits('')
    setTheme('black')
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
          className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Adicionar Conta/Cartão</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Toggle Tipo */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setType('account')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  type === 'account'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Conta Bancária
              </button>
              <button
                type="button"
                onClick={() => setType('card')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  type === 'card'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cartão de Crédito
              </button>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {type === 'account' ? 'Nome da Conta' : 'Nome do Cartão'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === 'account' ? 'Ex: Nubank Conta' : 'Ex: Nubank Mastercard'}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-gray-900`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Titular */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Titular</label>
              <select
                value={holderId}
                onChange={(e) => setHolderId(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.holderId ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-gray-900`}
              >
                <option value="">Selecione um membro</option>
                {familyMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.holderId && <p className="mt-1 text-sm text-red-500">{errors.holderId}</p>}
            </div>

            {/* Campos Condicionais - Conta Bancária */}
            {type === 'account' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Saldo Inicial</label>
                <input
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="R$ 0,00"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.balance ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                />
                {errors.balance && <p className="mt-1 text-sm text-red-500">{errors.balance}</p>}
              </div>
            )}

            {/* Campos Condicionais - Cartão de Crédito */}
            {type === 'card' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Dia de Fechamento</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={closingDay}
                      onChange={(e) => setClosingDay(e.target.value)}
                      placeholder="1 a 31"
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.closingDay ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                    />
                    {errors.closingDay && <p className="mt-1 text-sm text-red-500">{errors.closingDay}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Dia de Vencimento</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={dueDay}
                      onChange={(e) => setDueDay(e.target.value)}
                      placeholder="1 a 31"
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.dueDay ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                    />
                    {errors.dueDay && <p className="mt-1 text-sm text-red-500">{errors.dueDay}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Limite Total</label>
                  <input
                    type="text"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    placeholder="R$ 0,00"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.limit ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                  />
                  {errors.limit && <p className="mt-1 text-sm text-red-500">{errors.limit}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Últimos 4 Dígitos (opcional)</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={lastDigits}
                    onChange={(e) => setLastDigits(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Tema Visual</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['black', 'lime', 'white'] as CreditCardTheme[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTheme(t)}
                        className={`h-16 rounded-lg border-2 transition-colors ${
                          theme === t
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${t === 'black' ? 'bg-gray-900' : t === 'lime' ? 'bg-lime-400' : 'bg-white'}`}
                      >
                        <span className="text-xs font-medium text-gray-900 capitalize">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
