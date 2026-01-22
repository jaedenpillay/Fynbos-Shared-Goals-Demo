
import React from 'react';
import { ChevronLeft, Users, PiggyBank, Leaf, Activity } from 'lucide-react';

interface AccountTypeSelectorProps {
  onBack: () => void;
  onSelect: (type: 'shared' | 'savings' | 'investment' | 'kid') => void;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ onBack, onSelect }) => {
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-6 pb-2 sticky top-0 bg-gray-50 z-10 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold text-gray-900">Account type</h1>
      </div>

      <div className="px-6 pt-4 space-y-6">
        <p className="text-gray-500 text-sm font-medium">What type of account would you like to create?</p>
        
        <div className="space-y-4">
          <div 
            onClick={() => onSelect('shared')}
            className="bg-white p-5 rounded-[24px] fynbos-shadow border border-gray-50 flex items-center gap-4 cursor-pointer hover:border-blue-200 active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-bl-xl group-hover:scale-110 transition-transform">POPULAR</div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900">Shared Goal</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Save together with friends or family for a shared milestone.</p>
            </div>
          </div>

          <SelectionItem 
            icon={<PiggyBank className="w-6 h-6 text-purple-600" />} 
            bg="bg-purple-50"
            title="Savings pots" 
            desc="Organise your savings and earn 7.57% annually with Allan Gray." 
          />
          <SelectionItem 
            icon={<Activity className="w-6 h-6 text-orange-500" />} 
            bg="bg-orange-50"
            title="Investment account" 
            desc="Invest in a wide array of assets with a custom buy strategy." 
          />
          <SelectionItem 
            icon={<Leaf className="w-6 h-6 text-green-500" />} 
            bg="bg-green-50"
            title="Kid's account" 
            desc="Create a profile for your children." 
          />
        </div>
      </div>
    </div>
  );
};

const SelectionItem = ({ icon, bg, title, desc }: { icon: React.ReactNode, bg: string, title: string, desc: string }) => (
  <div className="bg-white p-5 rounded-[24px] fynbos-shadow border border-gray-50 flex items-center gap-4 cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all">
    <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);
