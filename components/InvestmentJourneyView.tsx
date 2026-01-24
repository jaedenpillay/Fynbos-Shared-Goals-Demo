
import React from 'react';
import { ChevronLeft, CheckCircle2, Circle, PauseCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';

interface InvestmentJourneyViewProps {
  onBack: () => void;
}

const CompoundGraph = () => (
  <div className="w-full h-40 relative mt-4 overflow-hidden rounded-2xl bg-gray-50 flex items-end">
    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path 
        d="M0,95 L10,95 L20,93 L30,91 L40,88 L50,84 L60,78 L70,70 L80,60 L90,48 L100,34 L110,18 L120,0 L200,0 L200,100 L0,100 Z" 
        fill="url(#grad)" 
      />
      <path 
        d="M0,95 L10,95 L20,93 L30,91 L40,88 L50,84 L60,78 L70,70 L80,60 L90,48 L100,34 L110,18 L120,0" 
        stroke="#3b82f6" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round"
        className="animate-in slide-in-from-left duration-1000"
      />
    </svg>
    <div className="absolute bottom-4 left-4 flex flex-col">
       <span className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">Consistency curve</span>
       <span className="text-[8px] text-gray-400 font-medium">Progress builds steadily over time</span>
    </div>
  </div>
);

export const InvestmentJourneyView: React.FC<InvestmentJourneyViewProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-300 overflow-y-auto pb-24">
      <div className="px-6 pt-6 pb-2 flex items-center sticky top-0 bg-white/80 backdrop-blur-sm z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold text-gray-900">My Investment Journey</h1>
      </div>

      <div className="px-8 pt-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">Investing is not about being perfect.</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            It is about showing up consistently over time. My Investment Journey helps you see how steadily you are building your future, month by month.
          </p>
          <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3">
             <Info className="w-5 h-5 text-blue-600 shrink-0" />
             <p className="text-xs font-bold text-blue-800">This is about progress, not pressure.</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Status Legend</h3>
          <div className="grid grid-cols-1 gap-4">
             <StatusItem 
                icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} 
                title="On Track" 
                desc="You contributed as planned and stayed consistent."
                colorClass="text-green-500"
             />
             <StatusItem 
                icon={<Circle className="w-5 h-5 text-yellow-500" fill="currentColor" fillOpacity="0.2" />} 
                title="Adjusted" 
                desc="You lowered your contribution but stayed invested. Progress still counts."
                colorClass="text-yellow-600"
             />
             <StatusItem 
                icon={<PauseCircle className="w-5 h-5 text-blue-500" />} 
                title="Paused Intentionally" 
                desc="You used Low-Cash Mode. Life happens — your journey continues."
                colorClass="text-blue-600"
             />
             <StatusItem 
                icon={<AlertCircle className="w-5 h-5 text-red-500" />} 
                title="Withdrawn" 
                desc="You removed funds from a long-term goal, which resets progress for that goal."
                colorClass="text-red-600"
             />
          </div>
        </div>

        <CompoundGraph />

        <div className="bg-gray-50 p-6 rounded-[24px] border border-gray-100 space-y-4">
           <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-tighter">Behavioral Nudge</h4>
           </div>
           <p className="text-xs text-gray-500 italic leading-relaxed">
             "Long-term wealth is built through consistency, not timing the market. Every green and yellow month represents a step your future self will thank you for."
           </p>
        </div>

        <button 
          onClick={onBack}
          className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-gray-100 active:scale-95 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const StatusItem = ({ icon, title, desc, colorClass }: { icon: React.ReactNode, title: string, desc: string, colorClass: string }) => (
  <div className="flex gap-4 p-1">
    <div className="shrink-0 pt-0.5">{icon}</div>
    <div className="space-y-1">
      <h4 className={`text-sm font-bold ${colorClass}`}>{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);
