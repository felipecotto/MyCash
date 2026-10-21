import { useState, FormEvent } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

const roleSuggestions = ['Parceiro(a)', 'Cônjuge', 'Namorado(a)', 'Noivo(a)', 'Esposo(a)']

export default function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const { addFamilyMember } = useFinance()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [avatar, setAvatar] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (name.trim().length < 3) {
      newErrors.name = 'Por favor, insira um nome válido'
    }

    if (!role.trim()) {
      newErrors.role = 'Conta pra gente qual é o papel dessa pessoa'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addFamilyMember({
      name: name.trim(),
      role: role.trim(),
      avatar: avatar.trim() || null,
      monthlyIncome: parseFloat(monthlyIncome.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
    })

    // Limpar formulário
    setName('')
    setRole('')
    setAvatar('')
    setMonthlyIncome('')
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setName('')
    setRole('')
    setAvatar('')
    setMonthlyIncome('')
    setErrors({})
    onClose()
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Adicionar Parceiro(a)"
      side="right"
      footer={
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" form="add-member-form" className="flex-1">
            Adicionar Parceiro(a)
          </Button>
        </div>
      }
    >
      <form id="add-member-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Nome Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: João Silva"
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Papel no casal</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Ex: Parceiro(a), Cônjuge..."
            list="role-suggestions"
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.role ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-green-700`}
          />
          <datalist id="role-suggestions">
            {roleSuggestions.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
          {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">Avatar URL (opcional)</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-900 mb-2">
            Renda Mensal Estimada (opcional)
          </label>
          <input
            type="text"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="R$ 0,00"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
      </form>
    </Drawer>
  )
}
