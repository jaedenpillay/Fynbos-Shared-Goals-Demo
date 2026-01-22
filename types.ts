
export type MemberRole = 'admin' | 'contributor';

export interface Member {
  id: string;
  name: string;
  initials: string;
  contribution: number;
  role: MemberRole;
  color: string;
}

export interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  goalId: string;
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

export type View = 'home' | 'accounts' | 'transactions' | 'automation' | 'create-goal' | 'goal-detail' | 'invite-member' | 'adjust-goal' | 'account-type';
