import { formatCurrency } from '../../utils/currency.utils'
import DonutChart from '../ui/DonutChart'

interface CategoryDonutCardProps {
  category: string
  amount: number
  percentage: number
  color: string
}

export default function CategoryDonutCard({
  category,
  amount,
  percentage,
  color,
}: CategoryDonutCardProps) {
  return (
    <div className="w-40 bg-white border border-gray-200 rounded-lg p-4 hover:border-lime-400 transition-colors cursor-pointer">
      <div className="flex flex-col items-center">
        <DonutChart percentage={percentage} color={color} />
        <h4 className="mt-3 text-sm font-semibold text-gray-900 text-center truncate w-full">
          {category}
        </h4>
        <p className="mt-1 text-xs font-medium text-gray-600">{formatCurrency(amount)}</p>
      </div>
    </div>
  )
}
