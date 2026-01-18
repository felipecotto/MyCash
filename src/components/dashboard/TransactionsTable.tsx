import { useState, useMemo } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import { formatDate } from '../../utils/date.utils'
import { formatCurrency } from '../../utils/currency.utils'
import Pagination from '../ui/Pagination'

export default function TransactionsTable() {
  const { getFilteredTransactions, familyMembers, bankAccounts, creditCards } = useFinance()
  const [localSearch, setLocalSearch] = useState('')
  const [localType, setLocalType] = useState<'all' | 'income' | 'expense'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const allTransactions = getFilteredTransactions()

  // Aplicar filtros locais
  const filteredTransactions = useMemo(() => {
    let filtered = [...allTransactions]

    if (localSearch.trim()) {
      const search = localSearch.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      )
    }

    if (localType !== 'all') {
      filtered = filtered.filter((t) => t.type === localType)
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [allTransactions, localSearch, localType])

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getAccountName = (accountId: string) => {
    const account = bankAccounts.find((a) => a.id === accountId)
    if (account) return account.name
    const card = creditCards.find((c) => c.id === accountId)
    if (card) return card.name
    return 'Desconhecido'
  }


  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-500">Nenhum lançamento encontrado.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header com controles */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Extrato Detalhado</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar lançamentos..."
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-64"
          />
          <select
            value={localType}
            onChange={(e) => {
              setLocalType(e.target.value as 'all' | 'income' | 'expense')
              setCurrentPage(1)
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-40"
          >
            <option value="all">Todos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 w-12">Membro</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Data</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Descrição</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Categoria</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Conta/Cartão</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Parcelas</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTransactions.map((transaction, idx) => {
              const member = transaction.memberId
                ? familyMembers.find((m) => m.id === transaction.memberId)
                : null

              return (
                <tr
                  key={transaction.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-3">
                    {member ? (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-600">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(new Date(transaction.date))}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {transaction.type === 'income' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                          )}
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getAccountName(transaction.accountId)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {transaction.installments > 1
                      ? `${transaction.currentInstallment}/${transaction.installments}`
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-sm font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTransactions.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  )
}
