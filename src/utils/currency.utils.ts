/**
 * Formata um número como moeda brasileira
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como "R$ 1.234,56"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Formata um número como moeda compacta para gráficos
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como "R$ 2,5k" ou "R$ 1,2M"
 */
export function formatCompactCurrency(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(1)}k`
  }
  return formatCurrency(value)
}

/**
 * Converte string de input do usuário em número limpo
 * Remove "R$", pontos de milhar, troca vírgula por ponto
 * @param input - String de input do usuário
 * @returns Número limpo
 */
export function parseCurrencyInput(input: string): number {
  return parseFloat(
    input
      .replace(/R\$\s?/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  ) || 0
}
