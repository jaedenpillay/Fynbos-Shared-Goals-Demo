
import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, Wallet, Info, X } from 'lucide-react';
import { SharedGoal } from '../types';

interface AddMoneyFlowProps {
  goal: SharedGoal;
  isPrivateMode?: boolean;
  onBack: () => void;
  onComplete: (amount: number) => void;
}

export const AddMoneyFlow: React.FC<AddMoneyFlowProps> = ({ goal, isPrivateMode, onBack, onComplete }) => {
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    const val = e.target.value.replace(/\D/g, '');
    setAmount(val);
  };

  const formattedDisplay = amount ? Number(amount).toLocaleString('en-US') : '';
  const blurClass = isPrivateMode ? "blur-md select-none scale-105" : "";

  const handleContribute = () => {
    const numAmount = parseInt(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onComplete(numAmount);
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
            You put <span className={`text-gray-900 font-bold transition-all duration-300 ${blurClass}`}>R {parseInt(amount).toLocaleString()},00</span> in <span className="text-gray-900 font-bold">{goal.name}</span>!
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
        <h1 className="ml-2 text-lg font-bold text-gray-900">Add money</h1>
      </div>

      <div className="flex-1 px-8 pt-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">How much would you like to add?</h2>
          <p className="text-sm text-gray-500">Contributing to <span className="font-semibold text-gray-700">{goal.name}</span></p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">R</span>
            <input 
              autoFocus
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={formattedDisplay}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-b-2 border-gray-200 py-6 pl-10 text-4xl font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder:text-gray-200 ${blurClass}`}
            />
          </div>

          <div className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 space-y-3">
             <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Payment source</span>
              <button className="text-blue-600">Change</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">Available Cash</span>
                <span className={`text-[10px] text-gray-400 font-medium transition-all duration-300 ${blurClass}`}>Balance: R 12,400,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 safe-area-bottom">
        <button 
          onClick={handleContribute}
          disabled={!amount || parseInt(amount) <= 0}
          className={`w-full py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all ${!amount || parseInt(amount) <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white shadow-blue-100 active:scale-95'}`}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};
