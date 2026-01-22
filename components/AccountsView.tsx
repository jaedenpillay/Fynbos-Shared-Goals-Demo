
import React from 'react';
import { Plus, Users, LayoutGrid, Leaf, PiggyBank } from 'lucide-react';
import { View, SharedGoal } from '../types';

interface AccountsViewProps {
  navigateTo: (view: View, id?: string) => void;
  sharedGoals: SharedGoal[];
}

export const AccountsView: React.FC<AccountsViewProps> = ({ navigateTo, sharedGoals }) => {
  return (
    <div className="px-6 space-y-6 pt-4">
      {/* Filters (Mock) */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold whitespace-nowrap">All accounts</button>
        <button className="px-4 py-2 bg-white border border-gray-100 text-gray-500 rounded-full text-xs font-semibold whitespace-nowrap">Investment</button>
        <button className="px-4 py-2 bg-white border border-gray-100 text-gray-500 rounded-full text-xs font-semibold whitespace-nowrap">Savings</button>
        <button className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-semibold whitespace-nowrap">Shared</button>
      </div>

      {/* Individual Accounts */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal</h3>
        <div className="space-y-3">
          <AccountCard title="Cash" balance="R 12,400" icon={<PiggyBank className="w-5 h-5 text-gray-600"/>} iconBg="bg-gray-100" />
          <AccountCard title="Emergency Fund" balance="R 45,000" icon={<Leaf className="w-5 h-5 text-green-600"/>} iconBg="bg-green-50" />
        </div>
      </div>

      {/* Shared Goals Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shared Goals</h3>
          <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">NEW</div>
        </div>
        
        <div className="space-y-3">
          {sharedGoals.map(goal => (
            <div 
              key={goal.id} 
              onClick={() => navigateTo('goal-detail', goal.id)}
              className="bg-white p-5 rounded-[24px] fynbos-shadow border border-gray-50 space-y-4 cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-gray-900">{goal.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {goal.members.map(m => (
                        <div key={m.id} className={`w-5 h-5 rounded-full border border-white flex items-center justify-center text-white text-[8px] font-bold ${m.color}`}>
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{goal.members.length} members</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-gray-900">R {goal.totalSaved.toLocaleString()}</div>
                  <div className="text-[10px] text-gray-400">Total target R {goal.targetAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-semibold text-gray-500 uppercase tracking-tighter">
                  <span>Progress</span>
                  <span>{Math.round((goal.totalSaved / goal.targetAmount) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(goal.totalSaved / goal.targetAmount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Create New Shared Goal Card */}
          <div 
            onClick={() => navigateTo('account-type')}
            className="border-2 border-dashed border-gray-200 p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-blue-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-gray-500">Create new Shared Goal</span>
          </div>
        </div>
      </div>

      <div className="pb-8"></div>
    </div>
  );
};

const AccountCard = ({ title, balance, icon, iconBg }: { title: string, balance: string, icon: React.ReactNode, iconBg: string }) => (
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
