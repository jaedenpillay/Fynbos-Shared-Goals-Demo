
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Home, Wallet, Repeat, Activity, Plus, ChevronLeft, UserPlus, Pencil, Info, MoreHorizontal, ArrowRight, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { View, SharedGoal, Member, Transaction } from './types';
import { HomeView } from './components/HomeView';
import { AccountsView } from './components/AccountsView';
import { GoalDetailView } from './components/GoalDetailView';
import { CreateGoalFlow } from './components/CreateGoalFlow';
import { AccountTypeSelector } from './components/AccountTypeSelector';
import { InviteFlow } from './components/InviteFlow';
import { AddMoneyFlow } from './components/AddMoneyFlow';
import { WithdrawFlow } from './components/WithdrawFlow';
import { HistoryView } from './components/HistoryView';

const AnimatedClockHands = ({ size = 20, color = "text-orange-500" }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={color}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6" className="origin-[12px_12px] animate-[spin_2s_linear_infinite]" />
    <path d="M12 12h4" className="origin-[12px_12px] animate-[spin_8s_linear_infinite]" />
  </svg>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  
  // Deletion Logic States
  const [pendingDeletionId, setPendingDeletionId] = useState<string | null>(null);
  const [showDeletionSuccess, setShowDeletionSuccess] = useState<SharedGoal | null>(null);
  
  // Mock Data
  const [sharedGoals, setSharedGoals] = useState<SharedGoal[]>([
    {
      id: 'g1',
      name: 'Overseas Trip 2025',
      targetAmount: 85000,
      targetDate: '2025-10-12',
      changesRemaining: 2,
      totalSaved: 32400,
      type: 'shared',
      members: [
        { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 18400, color: 'bg-blue-500' },
        { id: 'm2', name: 'Caleb', initials: 'C', contribution: 14000, color: 'bg-purple-500' }
      ]
    },
    {
      id: 'g2',
      name: 'Emergency Fund',
      targetAmount: 50000,
      changesRemaining: 3,
      totalSaved: 12500,
      type: 'shared',
      members: [
        { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 7500, color: 'bg-blue-500' },
        { id: 'm3', name: 'Deklan', initials: 'D', contribution: 5000, color: 'bg-orange-500' }
      ]
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't1', goalId: 'g1', memberName: 'Jaeden', amount: 5000, type: 'contribution', date: '2023-12-01' },
    { id: 't2', goalId: 'g1', memberName: 'Caleb', amount: 14000, type: 'contribution', date: '2023-12-05' },
    { id: 't3', goalId: 'g2', memberName: 'Deklan', amount: 5000, type: 'contribution', date: '2023-12-10' },
  ]);

  const activeGoal = useMemo(() => 
    sharedGoals.find(g => g.id === selectedGoalId) || null
  , [sharedGoals, selectedGoalId]);

  const navigateTo = (view: View, id: string | null = null) => {
    setCurrentView(view);
    if (id) setSelectedGoalId(id);
  };

  const handleAddGoal = (newGoal: SharedGoal) => {
    setSharedGoals([...sharedGoals, newGoal]);
    navigateTo('accounts');
  };

  const handleUpdateGoal = (updatedGoal: SharedGoal) => {
    setSharedGoals(sharedGoals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const startGoalDeletion = (goalId: string) => {
    setPendingDeletionId(goalId);
    setTimeout(() => {
      const goal = sharedGoals.find(g => g.id === goalId);
      if (goal) {
        setShowDeletionSuccess(goal);
        setPendingDeletionId(null);
      }
    }, 4500);
  };

  const finalizeDeletion = () => {
    if (showDeletionSuccess) {
      setSharedGoals(prev => prev.filter(g => g.id !== showDeletionSuccess.id));
      setShowDeletionSuccess(null);
      navigateTo('accounts');
    }
  };

  const handleTransaction = (amount: number, type: 'contribution' | 'withdrawal') => {
    if (!activeGoal) return;
    
    const signedAmount = type === 'contribution' ? amount : -amount;

    const updatedMembers = activeGoal.members.map(m => {
      if (m.id === 'm1') { // User is Jaeden
        return { ...m, contribution: m.contribution + signedAmount };
      }
      return m;
    });

    const updatedGoal: SharedGoal = {
      ...activeGoal,
      members: updatedMembers,
      totalSaved: activeGoal.totalSaved + signedAmount
    };

    handleUpdateGoal(updatedGoal);

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      goalId: activeGoal.id,
      memberName: 'Jaeden',
      amount: amount,
      type: type,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([newTx, ...transactions]);
  };

  const blurClass = isPrivateMode ? "blur-md select-none" : "";

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden border-x border-gray-200 shadow-xl relative text-gray-900">
      {/* Top Header */}
      {['home', 'accounts'].includes(currentView) && (
        <div className="pt-6 px-6 pb-2 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-900">
            {currentView === 'home' ? 'Hello, Jaeden' : 'Accounts'}
          </h1>
          <div className="flex items-center gap-4">
            {pendingDeletionId && (
              <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1.5 rounded-full border border-orange-100 animate-in fade-in zoom-in-90">
                <AnimatedClockHands size={14} />
                <span className="text-[10px] font-bold text-orange-600 tracking-tighter">Settling...</span>
              </div>
            )}
            <button 
              onClick={() => setIsPrivateMode(!isPrivateMode)}
              className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-90"
            >
              {isPrivateMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">J</div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {currentView === 'home' && <HomeView navigateTo={navigateTo} sharedGoals={sharedGoals} isPrivateMode={isPrivateMode} />}
        {currentView === 'accounts' && <AccountsView navigateTo={navigateTo} sharedGoals={sharedGoals} isPrivateMode={isPrivateMode} />}
        {currentView === 'account-type' && <AccountTypeSelector onBack={() => navigateTo('accounts')} onSelect={(type) => type === 'shared' ? navigateTo('create-goal') : null} />}
        {currentView === 'create-goal' && <CreateGoalFlow onCancel={() => navigateTo('accounts')} onComplete={handleAddGoal} />}
        {currentView === 'goal-detail' && activeGoal && (
          <GoalDetailView 
            goal={activeGoal} 
            isPrivateMode={isPrivateMode}
            onBack={() => navigateTo('accounts')} 
            onInvite={() => navigateTo('invite-member')}
            onAddMoney={() => navigateTo('add-money')}
            onWithdraw={() => navigateTo('withdraw')}
            onHistory={() => navigateTo('history')}
            onUpdate={handleUpdateGoal}
            onDeleteRequest={startGoalDeletion}
          />
        )}
        {currentView === 'invite-member' && activeGoal && (
           <InviteFlow 
            goal={activeGoal} 
            onBack={() => navigateTo('goal-detail', activeGoal.id)} 
            onInvite={(member) => {
              const updated = { ...activeGoal, members: [...activeGoal.members, member] };
              handleUpdateGoal(updated);
              navigateTo('goal-detail', activeGoal.id);
            }} 
          />
        )}
        {currentView === 'add-money' && activeGoal && (
          <AddMoneyFlow 
            goal={activeGoal} 
            isPrivateMode={isPrivateMode}
            onBack={() => navigateTo('goal-detail', activeGoal.id)}
            onComplete={(amount) => handleTransaction(amount, 'contribution')}
          />
        )}
        {currentView === 'withdraw' && activeGoal && (
          <WithdrawFlow 
            goal={activeGoal} 
            isPrivateMode={isPrivateMode}
            userContribution={activeGoal.members.find(m => m.id === 'm1')?.contribution || 0}
            onBack={() => navigateTo('goal-detail', activeGoal.id)}
            onComplete={(amount) => handleTransaction(amount, 'withdrawal')}
          />
        )}
        {currentView === 'history' && activeGoal && (
          <HistoryView 
            goal={activeGoal}
            isPrivateMode={isPrivateMode}
            transactions={transactions.filter(t => t.goalId === activeGoal.id)}
            onBack={() => navigateTo('goal-detail', activeGoal.id)}
          />
        )}
      </div>

      {/* Success Modal (Matching Closing Modal Size) */}
      {showDeletionSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-[340px] rounded-[40px] p-8 flex flex-col items-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" strokeWidth={3} />
              </div>
              
              <div className="text-center space-y-3 mb-8">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">All settled!</h2>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed px-2">
                  {showDeletionSuccess.members.find(m => m.id !== 'm1')?.name || 'Your partner'} agreed. <span className={`text-gray-900 font-bold ${blurClass}`}>R {(showDeletionSuccess.members.find(m => m.id === 'm1')?.contribution || 0).toLocaleString()}</span> has been returned to your Fynbos Money account.
                </p>
              </div>

              <button 
                onClick={finalizeDeletion}
                className="w-full py-4 bg-[#111827] text-white rounded-[24px] font-bold text-base shadow-xl active:scale-95 transition-all"
              >
                Got it
              </button>
           </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 px-2 safe-area-bottom">
        <NavButton icon={<Home className="w-6 h-6" />} label="Home" active={currentView === 'home'} onClick={() => navigateTo('home')} />
        <NavButton icon={<Wallet className="w-6 h-6" />} label="Accounts" active={currentView === 'accounts' || currentView === 'goal-detail' || currentView === 'history'} onClick={() => navigateTo('accounts')} />
        <NavButton icon={<Repeat className="w-6 h-6" />} label="Transactions" active={currentView === 'transactions'} onClick={() => navigateTo('transactions')} />
        <NavButton icon={<Activity className="w-6 h-6" />} label="Automation" active={currentView === 'automation'} onClick={() => navigateTo('automation')} />
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 flex-1 transition-colors ${active ? 'text-blue-600' : 'text-gray-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;
