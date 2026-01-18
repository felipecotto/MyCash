export type TransactionType = 'income' | 'expense';

export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string; // ID da conta bancária ou cartão
  memberId: string | null; // ID do membro responsável, null se for familiar
  installments: number; // Número de parcelas (1 = à vista)
  currentInstallment: number; // Parcela atual (1, 2, 3...)
  status: TransactionStatus;
  isRecurring: boolean; // Se é despesa recorrente
  isPaid: boolean; // Se foi paga (para despesas)
  createdAt: Date;
  updatedAt: Date;
}
