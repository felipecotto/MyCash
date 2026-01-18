/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valida CPF brasileiro (apenas estrutura)
 */
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  if (/^(\d)\1+$/.test(cleaned)) return false
  return true
}

/**
 * Verifica se data é válida e não é futura quando aplicável
 */
export function isValidDate(date: Date, allowFuture = false): boolean {
  if (isNaN(date.getTime())) return false
  if (!allowFuture && date > new Date()) return false
  return true
}

/**
 * Verifica se valor é número positivo maior que zero
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0 && !isNaN(value)
}
