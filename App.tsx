
import React, { useState, useCallback, useMemo } from 'react';
import { Home, Wallet, Repeat, Activity, Plus, ChevronLeft, UserPlus, Pencil, Info, MoreHorizontal, ArrowRight, X } from 'lucide-react';
import { View, SharedGoal, Member, Contribution } from './types';
import { HomeView } from './components/HomeView';
import { AccountsView } from './components/AccountsView';
import { GoalDetailView } from './components/GoalDetailView';
import { CreateGoalFlow } from './components/CreateGoalFlow';
import { AccountTypeSelector } from './components/AccountTypeSelector';
import { InviteFlow } from './components/InviteFlow';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
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
        { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 18400, role: 'admin', color: 'bg-blue-500' },
        { id: 'm2', name: 'Shanice', initials: 'S', contribution: 14000, role: 'contributor', color: 'bg-purple-500' }
      ]
    },
    {
      id: 'g2',
      name: 'Emergency Buffer',
      targetAmount: 50000,
      changesRemaining: 3,
      totalSaved: 12500,
      type: 'shared',
      members: [
        { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 7500, role: 'admin', color: 'bg-blue-500' },
        { id: 'm3', name: 'Deklan', initials: 'D', contribution: 5000, role: 'contributor', color: 'bg-orange-500' }
      ]
    }
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

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden border-x border-gray-200 shadow-xl relative">
      {/* Top Header (Conditionally rendered) */}
      {['home', 'accounts'].includes(currentView) && (
        <div className="pt-6 px-6 pb-2 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-900">
            {currentView === 'home' ? 'Hello, Jaeden' : 'Accounts'}
          </h1>
          <div className="flex items-center gap-4">
            <Activity className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-medium">J</div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {currentView === 'home' && <HomeView navigateTo={navigateTo} sharedGoals={sharedGoals} />}
        {currentView === 'accounts' && <AccountsView navigateTo={navigateTo} sharedGoals={sharedGoals} />}
        {currentView === 'account-type' && <AccountTypeSelector onBack={() => navigateTo('accounts')} onSelect={(type) => type === 'shared' ? navigateTo('create-goal') : null} />}
        {currentView === 'create-goal' && <CreateGoalFlow onCancel={() => navigateTo('accounts')} onComplete={handleAddGoal} />}
        {currentView === 'goal-detail' && activeGoal && (
          <GoalDetailView 
            goal={activeGoal} 
            onBack={() => navigateTo('accounts')} 
            onInvite={() => navigateTo('invite-member')}
            onUpdate={handleUpdateGoal}
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
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 px-2 safe-area-bottom">
        <NavButton icon={<Home className="w-6 h-6" />} label="Home" active={currentView === 'home'} onClick={() => navigateTo('home')} />
        <NavButton icon={<Wallet className="w-6 h-6" />} label="Accounts" active={currentView === 'accounts' || currentView === 'goal-detail'} onClick={() => navigateTo('accounts')} />
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
