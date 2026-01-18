export type BankAccountType = 'checking' | 'savings' | 'investment';

export interface BankAccount {
  id: string;
  name: string;
  type: BankAccountType;
  holderId: string; // ID do membro titular
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
