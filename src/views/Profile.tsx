import { useState } from 'react'
import { useFinance } from '../contexts/FinanceContext'
import { formatCurrency } from '../utils/currency.utils'
import AddMemberModal from '../components/modals/AddMemberModal'
import Avatar from '../components/ui/Avatar'
import EmptyState from '../components/ui/EmptyState'

export default function Profile() {
  const { familyMembers } = useFinance()
  const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info')
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)

  const currentUser = familyMembers[0] || null

  return (
    <div className="p-4 md:p-6 lg:p-8 py-6 md:py-8 max-w-[1280px] mx-auto">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">Perfil</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'info'
              ? 'text-ink-900 border-b-2 border-green-700'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          Informações
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-ink-900 border-b-2 border-green-700'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          Configurações
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          {/* Perfil do Usuário */}
          {currentUser && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-6">
                <Avatar name={currentUser.name} src={currentUser.avatar} size="2xl" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-ink-900 mb-1">{currentUser.name}</h2>
                  <p className="text-ink-600 mb-2">{currentUser.role}</p>
                  {currentUser.monthlyIncome > 0 && (
                    <p className="text-ink-600 flex items-center gap-2">
                      <span className="font-semibold">Renda mensal:</span>
                      {formatCurrency(currentUser.monthlyIncome)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Vocês dois */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-ink-900 mb-4">Vocês dois</h3>
            {familyMembers.length === 0 ? (
              <EmptyState
                message="Ainda não tem ninguém por aqui"
                action={
                  <button
                    onClick={() => setIsMemberModalOpen(true)}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-500 transition-colors"
                  >
                    Adicionar Parceiro(a)
                  </button>
                }
              />
            ) : (
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-surface-50 rounded-lg hover:bg-mint-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar name={member.name} src={member.avatar} size="xl" />
                      <div>
                        <p className="font-semibold text-ink-900">{member.name}</p>
                        <p className="text-sm text-ink-600">{member.role}</p>
                      </div>
                    </div>
                    {member.monthlyIncome > 0 && (
                      <p className="text-sm font-semibold text-ink-900">{formatCurrency(member.monthlyIncome)}</p>
                    )}
                  </div>
                ))}
                {familyMembers.length < 2 && (
                  <button
                    onClick={() => setIsMemberModalOpen(true)}
                    className="w-full px-4 py-3 border border-dashed border-gray-200 text-ink-600 rounded-lg font-medium hover:bg-mint-50 hover:border-green-700 hover:text-green-700 transition-colors"
                  >
                    + Adicionar Parceiro(a)
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Botão Sair */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
              Sair
            </button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Preferências de Exibição */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-ink-900 mb-4">Preferências de Exibição</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Modo Escuro</label>
                <span className="px-2 py-1 text-xs bg-surface-50 text-ink-600 rounded">Em breve</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Moeda Padrão</label>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option>Real Brasileiro (R$)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Formato de Data</label>
                <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option>DD/MM/AAAA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-ink-900 mb-4">Notificações</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Lembrete de vencimento de contas</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Alerta de aproximação do limite</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Bom momento pra comprar passagem</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-900">Resumo mensal por email</label>
                <input type="checkbox" className="w-5 h-5 rounded border-gray-200" />
              </div>
            </div>
          </div>

          {/* Sobre */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-ink-900 mb-4">Sobre o nosso+</h3>
            <div className="space-y-2 text-sm text-ink-600">
              <p>Versão: v1.0.0</p>
              <p>Um sistema pra vocês dois realizarem sonhos juntos</p>
            </div>
          </div>
        </div>
      )}

      <AddMemberModal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} />
    </div>
  )
}
