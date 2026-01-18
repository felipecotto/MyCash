import { useState } from 'react'
import { useFinance } from '../contexts/FinanceContext'
import { formatCurrency } from '../utils/currency.utils'

export default function Profile() {
  const { familyMembers } = useFinance()
  const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info')

  const currentUser = familyMembers[0] || null

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Perfil</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'info'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Informações
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-600 hover:text-gray-900'
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
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-semibold text-gray-600">{currentUser.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
                  <p className="text-gray-600 mb-2">{currentUser.role}</p>
                  {currentUser.monthlyIncome > 0 && (
                    <p className="text-gray-600 flex items-center gap-2">
                      <span className="font-semibold">Renda mensal:</span>
                      {formatCurrency(currentUser.monthlyIncome)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Membros da Família */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Membros da Família</h3>
            {familyMembers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Nenhum membro cadastrado</p>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Adicionar Membro da Família
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-sm font-semibold text-gray-600">{member.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    {member.monthlyIncome > 0 && (
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(member.monthlyIncome)}</p>
                    )}
                  </div>
                ))}
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Preferências de Exibição</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Modo Escuro</label>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Em breve</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Moeda Padrão</label>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Real Brasileiro (R$)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Formato de Data</label>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>DD/MM/AAAA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Notificações</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Lembrete de vencimento de contas</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Alerta de aproximação do limite</label>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900">Resumo mensal por email</label>
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
              </div>
            </div>
          </div>

          {/* Sobre */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre o mycash+</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Versão: v1.0.0</p>
              <p>Sistema de gestão financeira familiar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
