import { useRef } from 'react'
import { useFinance } from '../../contexts/FinanceContext'
import CategoryDonutCard from './CategoryDonutCard'
import EmptyState from '../ui/EmptyState'

const colors = ['#0E7D5E', '#C1592E', '#171717', '#1FA97A', '#E2977A', '#52525B']

export default function ExpensesByCategoryCarousel() {
  const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance()
  const carouselRef = useRef<HTMLDivElement>(null)

  const expensesByCategory = calculateExpensesByCategory()

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (expensesByCategory.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-ink-900 mb-4">Gastos por Categoria</h3>
        <EmptyState message="Nenhum gasto por aqui ainda" />
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-ink-900 mb-4">Gastos por Categoria</h3>
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-50"
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {expensesByCategory.map((item, index) => {
            const percentage = calculateCategoryPercentage(item.amount)
            return (
              <CategoryDonutCard
                key={item.category}
                category={item.category}
                amount={item.amount}
                percentage={percentage}
                color={colors[index % colors.length]}
              />
            )
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-50"
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
