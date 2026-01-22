
import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, UserPlus, Pencil, Info, ArrowRight, ShieldCheck, History, X } from 'lucide-react';
import { SharedGoal, Member } from '../types';

interface GoalDetailViewProps {
  goal: SharedGoal;
  onBack: () => void;
  onInvite: () => void;
  onUpdate: (goal: SharedGoal) => void;
}

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({ goal, onBack, onInvite, onUpdate }) => {
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [newTarget, setNewTarget] = useState(goal.targetAmount.toString());

  const handleAdjustGoal = () => {
    if (goal.changesRemaining > 0) {
      const updatedGoal = {
        ...goal,
        targetAmount: parseInt(newTarget),
        changesRemaining: goal.changesRemaining - 1
      };
      onUpdate(updatedGoal);
      setIsAdjustModalOpen(false);
    }
  };

  const totalPercent = (goal.totalSaved / goal.targetAmount) * 100;

  return (
    <div className="animate-in slide-in-from-right duration-300">
      {/* Detail Header */}
      <div className="sticky top-0 bg-gray-50 px-6 pt-6 pb-4 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{goal.name}</h1>
        <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 space-y-6 pb-20">
        {/* Main Stats Card */}
        <div className="bg-white p-6 rounded-[28px] fynbos-shadow border border-gray-50 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Saved together</span>
            <div className="flex items-end gap-1">
              <h2 className="text-3xl font-bold text-gray-900">R {goal.totalSaved.toLocaleString()}</h2>
              <span className="text-gray-400 font-medium mb-1"> / R {goal.targetAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Multi-member Progress Bar */}
          <div className="space-y-4">
            <div className="space-y-2">
               <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-gray-500">Total Progress</span>
                <span className="text-blue-600 font-bold">{Math.round(totalPercent)}%</span>
              </div>
              <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                {goal.members.map((m, idx) => (
                  <div 
                    key={m.id}
                    className={`h-full ${m.color} transition-all duration-700`}
                    style={{ 
                      width: `${(m.contribution / goal.targetAmount) * 100}%`,
                      opacity: 1 - (idx * 0.1)
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Individual Breakdown */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {goal.members.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${member.color}`}>
                      {member.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{member.name} {member.role === 'admin' && <span className="text-[8px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full uppercase">Admin</span>}</span>
                      <span className="text-[10px] text-gray-400">R {member.contribution.toLocaleString()} contributed</span>
                    </div>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${member.color} rounded-full`}
                      style={{ width: `${(member.contribution / goal.totalSaved) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-[20px] font-bold text-sm shadow-lg shadow-blue-100">
            Add money
          </button>
          <button 
            onClick={onInvite}
            className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-100 text-gray-700 rounded-[20px] font-bold text-sm fynbos-shadow"
          >
            <UserPlus className="w-4 h-4 text-blue-500" />
            Invite
          </button>
        </div>

        {/* Goal Settings Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Goal Settings</h3>
          
          <button 
            onClick={() => setIsAdjustModalOpen(true)}
            className="w-full flex items-center justify-between bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Adjust Target</div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {goal.changesRemaining} of 3 changes remaining
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300" />
          </button>

          <div className="w-full flex items-center justify-between bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <History className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Contribution History</div>
                <div className="text-[10px] text-gray-400 font-medium">View who added what, when</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300" />
          </div>
        </div>

        {/* Trust & Safety Banner */}
        <div className="bg-gray-100/80 p-5 rounded-[24px] border border-white flex gap-4">
          <ShieldCheck className="w-6 h-6 text-gray-400 shrink-0" />
          <p className="text-[11px] leading-relaxed text-gray-500">
            Your shared goal funds are safely held within your individual Fynbos account structure. Contributions remain transparent and visible to all members for trust.
          </p>
        </div>

        <div className="pb-8"></div>
      </div>

      {/* Adjust Goal Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-8 space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Adjust target</h3>
              <button onClick={() => setIsAdjustModalOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-orange-50 p-4 rounded-2xl flex gap-3">
              <Info className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="text-xs text-orange-800 leading-normal">
                You have <span className="font-bold">{goal.changesRemaining} changes</span> left for this goal. Further changes will incur a R350 processing fee.
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">New Target Amount (ZAR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">R</span>
                <input 
                  type="number" 
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <button 
              disabled={goal.changesRemaining === 0}
              onClick={handleAdjustGoal}
              className={`w-full py-5 rounded-[20px] font-bold text-base transition-all ${goal.changesRemaining > 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Update target
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
