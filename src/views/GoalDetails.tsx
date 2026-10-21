'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useFinance } from '../contexts/FinanceContext'
import { getTravelPriceInsight } from '../utils/travelInsight.utils'
import { GoalLink } from '../types/goal'
import { Button } from '../components/ui/button'
import Avatar from '../components/ui/Avatar'
import EmptyState from '../components/ui/EmptyState'
import GoalPaceCard from '../components/dashboard/GoalPaceCard'
import PageContainer from '../components/layout/PageContainer'

function BackIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
    </svg>
  )
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return trimmed
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

export default function GoalDetails() {
  const params = useParams<{ id: string }>()
  const { goals, familyMembers, updateGoal } = useFinance()
  const goal = goals.find((g) => g.id === params.id)

  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkError, setLinkError] = useState('')

  if (!goal) {
    return (
      <PageContainer maxWidthClassName="max-w-[900px]">
        <EmptyState
          message="Não encontramos essa meta por aqui."
          action={
            <Link href="/dashboard" className="text-green-700 font-medium hover:underline">
              Voltar para a Home
            </Link>
          }
        />
      </PageContainer>
    )
  }

  const travelInsight = getTravelPriceInsight(goal)
  const members = goal.memberId
    ? familyMembers.filter((m) => m.id === goal.memberId)
    : familyMembers

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault()
    setLinkError('')

    if (!linkTitle.trim()) {
      setLinkError('Dá um nome pra esse link')
      return
    }
    if (!linkUrl.trim()) {
      setLinkError('Cola o link aqui')
      return
    }

    const newLink: GoalLink = {
      id: `link-${Date.now()}`,
      title: linkTitle.trim(),
      url: normalizeUrl(linkUrl),
      createdAt: new Date(),
    }

    updateGoal(goal.id, { links: [...goal.links, newLink] })
    setLinkTitle('')
    setLinkUrl('')
  }

  const handleRemoveLink = (linkId: string) => {
    updateGoal(goal.id, { links: goal.links.filter((l) => l.id !== linkId) })
  }

  return (
    <PageContainer maxWidthClassName="max-w-[1000px]">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900 mb-6"
      >
        <BackIcon />
        Voltar para a Home
      </Link>

      <div className="space-y-6">
        {/* Cabeçalho */}
        {(goal.description || members.length > 0) && (
          <div className="flex items-start justify-between gap-4">
            {goal.description && <p className="text-ink-600">{goal.description}</p>}
            <div className="flex -space-x-2 shrink-0">
              {members.map((member) => (
                <Avatar key={member.id} name={member.name} src={member.avatar} size="md" ringed />
              ))}
            </div>
          </div>
        )}

        {/* Ritmo e progresso */}
        <GoalPaceCard goal={goal} />

        {/* Insight de viagem */}
        {travelInsight && (
          <div
            className={`rounded-lg p-5 border ${
              travelInsight.isGoodTime
                ? 'bg-mint-50 border-mint-200'
                : 'bg-surface-50 border-gray-200'
            }`}
          >
            <p className={`text-sm font-semibold mb-1 ${travelInsight.isGoodTime ? 'text-green-700' : 'text-ink-900'}`}>
              {travelInsight.isGoodTime ? '💡 Bom momento pra comprar a passagem' : '✈️ Preço das passagens'}
            </p>
            <p className="text-sm text-ink-600">{travelInsight.message}</p>
          </div>
        )}

        {/* Links salvos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-ink-900 mb-1">Links salvos</h3>
        <p className="text-sm text-ink-600 mb-4">
          Comparações de preço, referências, orçamentos — guardem tudo aqui pra não perder depois.
        </p>

        {goal.links.length === 0 ? (
          <EmptyState size="sm" message="Nenhum link salvo ainda." />
        ) : (
          <ul className="space-y-2 mb-4">
            {goal.links.map((link) => (
              <li
                key={link.id}
                className="flex items-center justify-between gap-3 bg-surface-50 rounded-lg px-4 py-3"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-green-700 min-w-0"
                >
                  <span className="text-green-700 shrink-0">
                    <LinkIcon />
                  </span>
                  <span className="truncate">{link.title}</span>
                </a>
                <button
                  onClick={() => handleRemoveLink(link.id)}
                  aria-label="Remover link"
                  className="shrink-0 p-2 rounded-full text-ink-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddLink} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            placeholder="Ex: Orçamento marcenaria"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <Button type="submit" size="sm" className="whitespace-nowrap">
            + Salvar link
          </Button>
        </form>
        {linkError && <p className="mt-2 text-sm text-red-500">{linkError}</p>}
        </div>
      </div>
    </PageContainer>
  )
}
