import { Goal } from '../types/goal'

export interface TravelPriceInsight {
  isGoodTime: boolean
  changePercent: number // negativo = mais barato que a média, positivo = mais caro
  message: string
}

// Hash simples e estável (não é aleatório de verdade) só pra simular uma variação
// de preço de passagens ao longo dos dias, sem precisar de uma API externa.
function stableHash(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Insight simulado de "bom momento pra comprar a passagem", pensado para metas
 * de viagem. Combina uma variação de preço fictícia (estável por dia, pra não
 * ficar piscando a cada render) com o quanto o casal já guardou pra meta —
 * sinalizando a oportunidade só quando faz sentido: preço em baixa E dinheiro
 * suficiente já guardado.
 *
 * Isso é uma simulação para fins de portfólio — em produção entraria uma
 * integração real com uma API de preços de passagens.
 */
export function getTravelPriceInsight(goal: Goal): TravelPriceInsight | null {
  if (goal.category !== 'travel') return null

  const today = new Date().toISOString().slice(0, 10) // muda 1x por dia
  const seed = stableHash(`${goal.id}-${today}`)

  // Variação simulada entre -20% e +20%
  const changePercent = (seed % 41) - 20

  const progress = goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0
  const hasEnoughSaved = progress >= 0.25

  const isGoodTime = changePercent <= -8 && hasEnoughSaved

  const message = isGoodTime
    ? `Passagens estão ${Math.abs(changePercent)}% mais baratas que a média dos últimos meses — pode ser uma boa hora pra garantir a viagem de vocês.`
    : changePercent <= -8
      ? `Passagens estão ${Math.abs(changePercent)}% mais baratas, mas ainda vale guardar mais um pouco antes de comprar.`
      : `Preços de passagens estáveis por enquanto — continuem guardando que a gente avisa quando baixar.`

  return { isGoodTime, changePercent, message }
}
