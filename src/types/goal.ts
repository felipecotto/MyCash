export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled';

export type GoalCategory = 'travel' | 'home' | 'vehicle' | 'emergency' | 'other';

export interface GoalLink {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export interface GoalContribution {
  month: string; // formato 'YYYY-MM'
  amount: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  targetAmount: number;
  currentAmount: number;
  deadline: Date | null;
  status: GoalStatus;
  category: GoalCategory;
  memberId: string | null; // ID da pessoa responsável, null se for do casal
  links: GoalLink[]; // Links salvos: comparação de preços, referências, etc.
  contributions: GoalContribution[]; // Histórico de aportes mensais (últimos meses)
  createdAt: Date;
  updatedAt: Date;
}
