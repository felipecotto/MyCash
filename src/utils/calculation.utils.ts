/**
 * Calcula percentual com uma casa decimal
 */
export function calculatePercentage(partial: number, total: number): number {
  if (total === 0) return 0
  return Number(((partial / total) * 100).toFixed(1))
}

/**
 * Calcula diferença absoluta e percentual entre dois valores
 */
export function calculateDifference(
  current: number,
  previous: number
): { absolute: number; percentage: number } {
  const absolute = current - previous
  const percentage = calculatePercentage(absolute, previous)
  return { absolute, percentage }
}

/**
 * Calcula valor de cada parcela
 */
export function calculateInstallmentValue(totalAmount: number, installments: number): number {
  return Number((totalAmount / installments).toFixed(2))
}
