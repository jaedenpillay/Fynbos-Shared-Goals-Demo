
import React from 'react';
import { Info, Plus, ChevronRight, PiggyBank, Leaf, LayoutGrid } from 'lucide-react';
import { View, SharedGoal } from '../types';

interface HomeViewProps {
  navigateTo: (view: View, id?: string) => void;
  sharedGoals: SharedGoal[];
}

export const HomeView: React.FC<HomeViewProps> = ({ navigateTo, sharedGoals }) => {
  const totalPortfolio = 125000 + sharedGoals.reduce((acc, g) => acc + g.totalSaved, 0);

  return (
    <div className="px-6 space-y-6 pt-2">
      {/* Portfolio Card */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm font-medium">Portfolio</span>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">R {totalPortfolio.toLocaleString('en-ZA')},00</h2>
            <div className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded-full">+ R 12,450,00</div>
            <Info className="w-4 h-4 text-gray-300" />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-4 bg-blue-600 text-white rounded-[18px] font-semibold text-sm hover:bg-blue-700 transition-colors">
            Add money
          </button>
          <button className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-[18px] font-semibold text-sm hover:bg-gray-300 transition-colors">
            Withdraw
          </button>
        </div>
      </section>

      {/* Main Accounts */}
      <div className="space-y-3">
        <AccountListItem icon={<PiggyBank className="w-5 h-5 text-gray-700"/>} iconBg="bg-gray-100" title="Cash" balance="R 12,400,00" />
        <AccountListItem icon={<Leaf className="w-5 h-5 text-green-600"/>} iconBg="bg-green-50" title="Emergency savings" balance="R 45,000,00" />
        <AccountListItem icon={<LayoutGrid className="w-5 h-5 text-blue-500"/>} iconBg="bg-blue-50" title="Tax-free investments" balance="R 67,600,00" />
      </div>

      {/* Shared Goals Preview */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Shared Goals</h3>
          <button onClick={() => navigateTo('accounts')} className="text-blue-600 text-xs font-semibold">See all</button>
        </div>
        
        {sharedGoals.length > 0 ? (
          sharedGoals.slice(0, 2).map(goal => (
            <div 
              key={goal.id} 
              onClick={() => navigateTo('goal-detail', goal.id)}
              className="bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {goal.members.map(m => (
                    <div key={m.id} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold ${m.color}`}>
                      {m.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{goal.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(goal.totalSaved / goal.targetAmount) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">{Math.round((goal.totalSaved / goal.targetAmount) * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">R {goal.totalSaved.toLocaleString()}</div>
                <div className="text-[10px] text-gray-400">Total saved</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-[20px] text-center">
            <p className="text-sm text-gray-500 mb-4">You don't have any shared goals yet.</p>
            <button 
              onClick={() => navigateTo('account-type')}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold"
            >
              Start saving together
            </button>
          </div>
        )}
      </section>

      {/* Add Account Button */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={() => navigateTo('account-type')}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-full fynbos-shadow text-gray-700 text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 text-gray-400" />
          Add account
        </button>
      </div>
    </div>
  );
};

const AccountListItem = ({ icon, iconBg, title, balance }: { icon: React.ReactNode, iconBg: string, title: string, balance: string }) => (
  <div className="bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-800">{title}</span>
    </div>
    <span className="text-sm font-semibold text-gray-900">{balance}</span>
  </div>
);
