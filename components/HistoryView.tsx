
import React from 'react';
// Added History to the lucide-react imports
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, Calendar, History } from 'lucide-react';
import { SharedGoal, Transaction } from '../types';

interface HistoryViewProps {
  goal: SharedGoal;
  transactions: Transaction[];
  isPrivateMode?: boolean;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ goal, transactions, isPrivateMode, onBack }) => {
  const blurClass = isPrivateMode ? "blur-md select-none scale-105" : "";

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-6 pb-2 sticky top-0 bg-gray-50 z-10 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-bold text-gray-900">Goal History</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{goal.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-24">
        {transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            {/* History component is now correctly imported from lucide-react */}
            <History className="w-12 h-12 mb-4" />
            <p className="text-sm font-medium">No history yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Grouped by Date (Simplified mock) */}
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'contribution' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}>
                      {tx.type === 'contribution' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">
                        {tx.type === 'contribution' ? 'Contribution' : 'Withdrawal'}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">
                        {tx.memberName} • {new Date(tx.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold transition-all duration-300 ${blurClass} ${tx.type === 'contribution' ? 'text-blue-600' : 'text-red-600'}`}>
                    {tx.type === 'contribution' ? '+' : '-'} R {tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
