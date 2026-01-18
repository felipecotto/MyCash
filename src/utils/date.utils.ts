import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata data como DD/MM/AAAA
 */
export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

/**
 * Formata data em formato extenso: "15 de Janeiro de 2024"
 */
export function formatDateLong(date: Date): string {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

/**
 * Formata intervalo de datas: "01 jan - 31 jan, 2024"
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = format(startDate, 'dd MMM', { locale: ptBR })
  const end = format(endDate, 'dd MMM, yyyy', { locale: ptBR })
  return `${start} - ${end}`
}

/**
 * Retorna data relativa: "Hoje", "Ontem", "Há 3 dias"
 */
export function formatRelativeDate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
}
