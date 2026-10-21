import { useState, FormEvent } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { CreditCardTheme } from '../../types/creditCard'
import { parseCurrencyInput } from '../../utils/currency.utils'
import { isPositiveNumber } from '../../utils/validation.utils'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Adicionar Conta/Cartão"
      side="right"
      footer={
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" form="add-card-form" className="flex-1">
            Adicionar
          </Button>
        </div>
      }
    >
      <form id="add-card-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle Tipo */}
        <div className="flex gap-2 bg-surface-50 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setType('account')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              type === 'account'
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Conta Bancária
          </button>
          <button
            type="button"
            onClick={() => setType('card')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              type === 'card'
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-600 hover:text-ink-900'
            }`}
          >
            Cartão de Crédito
          </button>
        </div>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">
            {type === 'account' ? 'Nome da Conta' : 'Nome do Cartão'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === 'account' ? 'Ex: Nubank Conta' : 'Ex: Nubank Mastercard'}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Titular */}
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Titular</label>
          <select
            value={holderId}
            onChange={(e) => setHolderId(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.holderId ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
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
            <label className="block text-sm font-medium text-ink-900 mb-2">Saldo Inicial</label>
            <input
              type="text"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="R$ 0,00"
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.balance ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-green-700`}
            />
            {errors.balance && <p className="mt-1 text-sm text-red-500">{errors.balance}</p>}
          </div>
        )}

        {/* Campos Condicionais - Cartão de Crédito */}
        {type === 'card' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-2">Dia de Fechamento</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={closingDay}
                  onChange={(e) => setClosingDay(e.target.value)}
                  placeholder="1 a 31"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.closingDay ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-green-700`}
                />
                {errors.closingDay && <p className="mt-1 text-sm text-red-500">{errors.closingDay}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-2">Dia de Vencimento</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={dueDay}
                  onChange={(e) => setDueDay(e.target.value)}
                  placeholder="1 a 31"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.dueDay ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-green-700`}
                />
                {errors.dueDay && <p className="mt-1 text-sm text-red-500">{errors.dueDay}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Limite Total</label>
              <input
                type="text"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="R$ 0,00"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.limit ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-green-700`}
              />
              {errors.limit && <p className="mt-1 text-sm text-red-500">{errors.limit}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Últimos 4 Dígitos (opcional)</label>
              <input
                type="text"
                maxLength={4}
                value={lastDigits}
                onChange={(e) => setLastDigits(e.target.value.replace(/\D/g, ''))}
                placeholder="1234"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-900 mb-2">Tema Visual</label>
              <div className="grid grid-cols-3 gap-3">
                {(['black', 'lime', 'white'] as CreditCardTheme[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`h-16 rounded-lg border-2 transition-colors ${
                      theme === t
                        ? 'border-green-700 bg-mint-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${t === 'black' ? 'bg-ink-900' : t === 'lime' ? 'bg-green-500' : 'bg-white'}`}
                  >
                    <span
                      className={`text-xs font-medium capitalize ${
                        t === 'black' ? 'text-white' : 'text-ink-900'
                      }`}
                    >
                      {t}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </form>
    </Drawer>
  )
}
