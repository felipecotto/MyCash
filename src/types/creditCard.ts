export type CreditCardTheme = 'black' | 'lime' | 'white';

export interface CreditCard {
  id: string;
  name: string;
  holderId: string; // ID do membro titular
  limit: number;
  currentBill: number; // Fatura atual
  closingDay: number; // Dia de fechamento (1-31)
  dueDay: number; // Dia de vencimento (1-31)
  theme: CreditCardTheme;
  lastDigits: string | null; // Últimos 4 dígitos (opcional)
  createdAt: Date;
  updatedAt: Date;
}
