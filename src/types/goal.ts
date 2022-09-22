export interface SavingGoal {
  id: string;
  createdAt: Date;
  createdBy: string;
  current: number;
  description: string;
  goal: number;
  parentId: string;
  title: string;
  userId: string;
}
