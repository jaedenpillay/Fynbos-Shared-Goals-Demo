
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, UserPlus, Pencil, Info, ArrowRight, ShieldCheck, History, X, Download, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { SharedGoal, Member } from '../types';

interface GoalDetailViewProps {
  goal: SharedGoal;
  isPrivateMode: boolean;
  onBack: () => void;
  onInvite: () => void;
  onAddMoney: () => void;
  onWithdraw: () => void;
  onHistory: () => void;
  onUpdate: (goal: SharedGoal) => void;
  onDeleteRequest: (goalId: string) => void;
}

const AnimatedClockHands = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-in fade-in zoom-in duration-500">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 7v5" className="origin-[12px_12px] animate-[spin_3s_linear_infinite]" />
    <path d="M12 12h4" className="origin-[12px_12px] animate-[spin_12s_linear_infinite]" />
  </svg>
);

export const GoalDetailView: React.FC<GoalDetailViewProps> = ({ goal, isPrivateMode, onBack, onInvite, onAddMoney, onWithdraw, onHistory, onUpdate, onDeleteRequest }) => {
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStep, setDeleteStep] = useState<'confirm' | 'waiting'>('confirm');
  const [newTargetInput, setNewTargetInput] = useState(goal.targetAmount.toString());

  const otherMember = goal.members.find(m => m.id !== 'm1');
  const userContribution = goal.members.find(m => m.id === 'm1')?.contribution || 0;

  const handleAdjustGoal = () => {
    const numericTarget = parseInt(newTargetInput.replace(/\D/g, ''));
    if (goal.changesRemaining > 0 && !isNaN(numericTarget)) {
      const updatedGoal = {
        ...goal,
        targetAmount: numericTarget,
        changesRemaining: goal.changesRemaining - 1
      };
      onUpdate(updatedGoal);
      setIsAdjustModalOpen(false);
    }
  };

  const handleRequestDelete = () => {
    setDeleteStep('waiting');
    onDeleteRequest(goal.id);
  };

  const totalPercent = (goal.totalSaved / goal.targetAmount) * 100;
  const blurClass = isPrivateMode ? "blur-md select-none" : "";
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setNewTargetInput(val);
  };

  const formattedTargetInput = newTargetInput ? Number(newTargetInput).toLocaleString('en-US') : '';

  // Only show entries for members who have contributed more than R0
  const activeMembers = goal.members.filter(m => m.contribution > 0);

  return (
    <div className="animate-in slide-in-from-right duration-300">
      {/* Detail Header */}
      <div className="sticky top-0 bg-gray-50 px-6 pt-6 pb-4 z-10 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{goal.name}</h1>
        <button 
          onClick={() => {
            setDeleteStep('confirm');
            setIsDeleteModalOpen(true);
          }}
          className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 space-y-6 pb-20">
        {/* Main Stats Card */}
        <div className="bg-white p-6 rounded-[28px] fynbos-shadow border border-gray-50 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Saved together</span>
            <div className="flex items-end gap-1">
              <h2 className={`text-3xl font-bold text-gray-900 transition-all duration-300 ${blurClass}`}>R {goal.totalSaved.toLocaleString()}</h2>
              <span className={`text-gray-400 font-medium mb-1 transition-all duration-300 ${blurClass}`}> / R {goal.targetAmount.toLocaleString()}</span>
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

            {/* Individual Breakdown (R0 entries removed) */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {activeMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${member.color}`}>
                      {member.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                      <span className={`text-[10px] text-gray-400 transition-all duration-300 ${blurClass}`}>R {member.contribution.toLocaleString()} contributed</span>
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
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onAddMoney}
              className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-[20px] font-bold text-sm shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              Add money
            </button>
            <button 
              onClick={onWithdraw}
              className="flex items-center justify-center gap-2 py-4 bg-white border border-red-100 text-red-500 rounded-[20px] font-bold text-sm fynbos-shadow active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 rotate-180" />
              Withdraw
            </button>
          </div>
          <button 
            onClick={onInvite}
            className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-100 text-gray-700 rounded-[20px] font-bold text-sm fynbos-shadow active:scale-95 transition-all"
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

          <button 
            onClick={onHistory}
            className="w-full flex items-center justify-between bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50"
          >
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
          </button>
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
          <div className="bg-white w-full max-w-[340px] rounded-t-[32px] sm:rounded-[32px] p-8 space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Adjust target</h3>
              <button onClick={() => setIsAdjustModalOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-orange-50 p-4 rounded-2xl flex gap-3">
              <Info className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="text-xs text-orange-800 leading-normal">
                You have <span className="font-bold">{goal.changesRemaining} changes</span> left for this goal. Further changes will be charged at <span className="font-bold">R350</span> per change.
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">New Target Amount (ZAR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">R</span>
                <input 
                  type="text"
                  inputMode="numeric"
                  value={formattedTargetInput}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-10 pr-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 ${blurClass}`}
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

      {/* Delete Goal Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[340px] rounded-[40px] p-8 flex flex-col items-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom duration-500">
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Close Shared Goal</h3>
              <button onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>

            {deleteStep === 'confirm' && (
              <div className="w-full space-y-6">
                <div className="bg-red-50 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-500" />
                    <p className="text-sm font-bold text-red-900">Close "{goal.name}"?</p>
                  </div>
                  <p className="text-xs text-red-800 leading-relaxed">
                    Once agreed:
                  </p>
                  <ul className="text-[11px] text-red-800 space-y-1 pl-4 list-disc font-medium">
                    <li><span className={`font-bold ${blurClass}`}>R {userContribution.toLocaleString()}</span> to your account.</li>
                    <li><span className={`font-bold ${blurClass}`}>R {otherMember?.contribution.toLocaleString()}</span> to {otherMember?.name}.</li>
                  </ul>
                </div>
                <button 
                  onClick={handleRequestDelete}
                  className="w-full py-4 bg-red-500 text-white rounded-[24px] font-bold text-base shadow-xl shadow-red-100 active:scale-95 transition-all"
                >
                  Request Closing
                </button>
              </div>
            )}

            {deleteStep === 'waiting' && (
              <div className="w-full flex flex-col items-center justify-center space-y-6 text-center py-4">
                <div className="relative mb-2">
                  <AnimatedClockHands />
                </div>
                <div className="space-y-2 px-2">
                  <h4 className="text-lg font-bold text-gray-900 tracking-tight">Sent request to {otherMember?.name}</h4>
                  <p className="text-[12px] text-gray-500 font-medium leading-relaxed">We'll alert you as soon as they settle up. You can close this bubble and keep using Fynbos&nbsp;Money.</p>
                </div>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-4 bg-[#111827] text-white rounded-[24px] font-bold text-base shadow-lg active:scale-95 transition-all"
                >
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
