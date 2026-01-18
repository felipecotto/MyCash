import { v4 as uuidv4 } from 'uuid'

/**
 * Gera ID único usando UUID v4
 */
export function generateUniqueId(): string {
  return uuidv4()
}
