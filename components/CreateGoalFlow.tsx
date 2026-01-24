
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [newGoalObj, setNewGoalObj] = useState<SharedGoal | null>(null);

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    const val = e.target.value.replace(/\D/g, '');
    setTarget(val);
  };

  const formattedTargetDisplay = target ? Number(target).toLocaleString('en-US') : '';

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
          { id: 'm1', name: 'Jaeden', initials: 'J', contribution: 0, color: 'bg-blue-500' }
        ]
      };
      setNewGoalObj(newGoal);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-in slide-in-from-bottom duration-700 delay-100">
          <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={3} />
        </div>
        
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success!</h2>
          <p className="text-lg text-gray-500 font-medium px-4">
            Your goal <span className="text-gray-900 font-bold">"{newGoalObj?.name}"</span> has been created. Time to start saving!
          </p>
        </div>

        <button 
          onClick={() => onComplete(newGoalObj!)}
          className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-gray-100 active:scale-95 transition-all"
        >
          Got it
        </button>
      </div>
    );
  }

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
                {['🌍 Overseas Trip', '🏠 Home Deposit', '💍 Wedding Fund', '🛡️ Emergency Fund'].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => setName(suggestion.split(' ')[1] + ' ' + (suggestion.split(' ')[2] || ''))}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={formattedTargetDisplay}
                  onChange={handleTargetChange}
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
                    <div className="text-lg font-bold text-gray-900">R {parseInt(target || '0').toLocaleString()},00</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-gray-500 leading-normal">Invite friends or family to join this goal once it's created. You'll all be able to track your combined progress.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 safe-area-bottom">
        <button 
          onClick={handleNext}
          disabled={step === 1 && !name || step === 2 && !target}
          className={`w-full py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all ${((step === 1 && !name) || (step === 2 && !target)) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white shadow-blue-100 active:scale-95'}`}
        >
          {step === 3 ? 'Create Goal' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
