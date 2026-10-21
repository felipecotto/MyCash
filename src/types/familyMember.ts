export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Ex: "Você", "Parceiro(a)", "Cônjuge", etc.
  avatar: string | null; // URL do avatar ou null
  monthlyIncome: number; // Renda mensal estimada (opcional, pode ser 0)
  createdAt: Date;
  updatedAt: Date;
}
