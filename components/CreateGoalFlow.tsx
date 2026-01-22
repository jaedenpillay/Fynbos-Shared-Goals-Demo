
import React, { useState } from 'react';
import { ChevronLeft, Info, Users, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { SharedGoal, Member } from '../types';

interface CreateGoalFlowProps {
  onCancel: () => void;
  onComplete: (goal: SharedGoal) => void;
}

export const CreateGoalFlow: React.FC<CreateGoalFlowProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      const newGoal: SharedGoal = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || 'Unnamed Goal',
        targetAmount: parseInt(target) || 0,
        targetDate: date || undefined,
        changesRemaining: 3,
        totalSaved: 0,
        type: 'shared',
        members: [
          { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 0, role: 'admin', color: 'bg-blue-500' }
        ]
      };
      onComplete(newGoal);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <button onClick={step === 1 ? onCancel : () => setStep(step - 1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 w-8 rounded-full transition-all duration-300 ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-8 pt-8 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">What are we saving for?</h2>
              <p className="text-sm text-gray-500">Give your goal a catchy name that keeps you and your partner motivated.</p>
            </div>
            <div className="space-y-4">
               <div className="relative">
                <input 
                  autoFocus
                  placeholder="e.g. Dream Wedding Fund"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-semibold text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['🌍 Overseas Trip', '🏠 Home Deposit', '💍 Wedding Fund', '👶 Kid\'s Education'].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => setName(suggestion.split(' ')[1] + ' ' + suggestion.split(' ')[2] || suggestion.split(' ')[1])}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs font-medium transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">How much do we need?</h2>
              <p className="text-sm text-gray-500">Define the total target amount for this shared milestone.</p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">R</span>
                <input 
                  autoFocus
                  type="number"
                  placeholder="0,00"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-200 py-4 pl-8 text-2xl font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Remember, shared goal targets can only be adjusted 3 times for free. Plan your milestone carefully!
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Final touches</h2>
              <p className="text-sm text-gray-500">Review your shared goal details before we create it.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[24px] fynbos-shadow border border-gray-50 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Goal Name</div>
                    <div className="text-lg font-bold text-gray-900">{name || 'Unnamed Goal'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <span className="text-green-600 font-bold">R</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Target Amount</div>
                    <div className="text-lg font-bold text-gray-900">R {parseInt(target).toLocaleString() || '0'},00</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-gray-500 leading-normal">By creating this goal, you become the <span className="font-bold text-gray-700">Admin</span>. You'll be able to invite contributors and manage goal settings.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 safe-area-bottom">
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          {step === 3 ? 'Create Goal' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
