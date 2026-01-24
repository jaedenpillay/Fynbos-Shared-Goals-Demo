
import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, Wallet, Info, Download, AlertCircle } from 'lucide-react';
import { SharedGoal } from '../types';

interface WithdrawFlowProps {
  goal: SharedGoal;
  userContribution: number;
  isPrivateMode?: boolean;
  onBack: () => void;
  onComplete: (amount: number) => void;
}

export const WithdrawFlow: React.FC<WithdrawFlowProps> = ({ goal, userContribution, isPrivateMode, onBack, onComplete }) => {
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setAmount(val);
  };

  const numAmount = parseInt(amount || '0');
  const isOverLimit = numAmount > userContribution;
  const isValidAmount = numAmount > 0 && !isOverLimit;

  const formattedDisplay = amount ? Number(amount).toLocaleString('en-US') : '';
  const blurClass = isPrivateMode ? "blur-md select-none scale-105" : "";

  const handleWithdraw = () => {
    if (isValidAmount) {
      onComplete(numAmount);
      setIsSuccess(true);
    }
  };

  const setMax = () => {
    setAmount(userContribution.toString());
  };

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 animate-in slide-in-from-bottom duration-700 delay-100">
          <CheckCircle2 className="w-12 h-12 text-red-500" strokeWidth={3} />
        </div>
        
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success!</h2>
          <p className="text-lg text-gray-500 font-medium px-4">
            You withdrew <span className={`text-gray-900 font-bold transition-all duration-300 ${blurClass}`}>R {numAmount.toLocaleString()},00</span> from <span className="text-gray-900 font-bold">{goal.name}</span>!
          </p>
        </div>

        <button 
          onClick={onBack}
          className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-gray-100 active:scale-95 transition-all"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-6 pb-2 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold text-gray-900">Withdraw money</h1>
      </div>

      <div className="flex-1 px-8 pt-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">How much would you like to withdraw?</h2>
          <p className="text-sm text-gray-500">From <span className="font-semibold text-gray-700">{goal.name}</span></p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold ${isOverLimit ? 'text-red-400' : 'text-gray-400'}`}>R</span>
              <input 
                autoFocus
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={formattedDisplay}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-b-2 py-6 pl-10 text-4xl font-bold focus:outline-none transition-all duration-300 placeholder:text-gray-200 ${isOverLimit ? 'border-red-500 text-red-600' : 'border-gray-200 text-gray-900 focus:border-red-500'} ${blurClass}`}
              />
            </div>
            {isOverLimit && (
              <div className="flex items-center gap-1.5 text-red-500 animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-3 h-3" />
                <span className="text-[11px] font-bold uppercase tracking-tight">Exceeds your contribution</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 space-y-4">
             <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Destination</span>
              <button className="text-blue-600 font-bold hover:underline">Change</button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Fynbos Money</span>
                  <span className={`text-[10px] text-gray-400 font-medium transition-all duration-300 ${blurClass}`}>Limit: R {userContribution.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={setMax}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-colors"
              >
                Max
              </button>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-[11px] text-orange-800 leading-relaxed font-medium">
              To protect the shared milestone, you can only withdraw money up to the amount you've personally contributed (<span className={`font-bold ${blurClass}`}>R {userContribution.toLocaleString()}</span>).
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 safe-area-bottom">
        <button 
          onClick={handleWithdraw}
          disabled={!isValidAmount}
          className={`w-full py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all ${!isValidAmount ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-red-500 text-white shadow-red-100 active:scale-95'}`}
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
};
