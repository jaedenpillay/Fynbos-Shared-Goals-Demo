
export interface Member {
  id: string;
  name: string;
  initials: string;
  contribution: number;
  color: string;
}

export type TransactionType = 'contribution' | 'withdrawal';

export interface Transaction {
  id: string;
  goalId: string;
  memberName: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface SharedGoal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate?: string;
  members: Member[];
  changesRemaining: number;
  totalSaved: number;
  type: 'shared';
}

export type View = 'home' | 'accounts' | 'transactions' | 'automation' | 'create-goal' | 'goal-detail' | 'invite-member' | 'adjust-goal' | 'account-type' | 'add-money' | 'withdraw' | 'history';
