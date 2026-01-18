export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled';

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  targetAmount: number;
  currentAmount: number;
  deadline: Date | null;
  status: GoalStatus;
  memberId: string | null; // ID do membro responsável, null se for familiar
  createdAt: Date;
  updatedAt: Date;
}
