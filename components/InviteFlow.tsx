
import React, { useState } from 'react';
import { ChevronLeft, Search, UserPlus, Phone, Mail, Link as LinkIcon, Share2 } from 'lucide-react';
import { SharedGoal, Member } from '../types';

interface InviteFlowProps {
  goal: SharedGoal;
  onBack: () => void;
  onInvite: (member: Member) => void;
}

export const InviteFlow: React.FC<InviteFlowProps> = ({ goal, onBack, onInvite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockContacts = [
    { name: 'Caleb Pillay', initials: 'CP', phone: '082 555 1234', color: 'bg-purple-500' },
    { name: 'Deklan Pillay', initials: 'DP', phone: '071 222 9988', color: 'bg-orange-500' },
    { name: 'Simeon Smit', initials: 'SS', phone: '063 444 3322', color: 'bg-green-500' },
  ];

  const handleSelect = (contact: typeof mockContacts[0]) => {
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: contact.name.split(' ')[0],
      initials: contact.initials,
      contribution: 0,
      color: contact.color
    };
    onInvite(newMember);
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-6 pb-2 sticky top-0 bg-gray-50 z-10 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold text-gray-900">Invite</h1>
      </div>

      <div className="px-6 pt-4 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium">Add someone to <span className="text-gray-900 font-bold">{goal.name}</span></p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              placeholder="Search by name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors fynbos-shadow"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl fynbos-shadow border border-gray-50 group hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <LinkIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-500">Copy Link</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl fynbos-shadow border border-gray-50 group hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-500">Share App</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl fynbos-shadow border border-gray-50 group hover:border-blue-200 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-gray-500">Email</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">SUGGESTED FROM FYNBOS MONEY</h3>
          <div className="space-y-2">
            {mockContacts.map(contact => (
              <div 
                key={contact.phone}
                onClick={() => handleSelect(contact)}
                className="bg-white p-4 rounded-[20px] fynbos-shadow border border-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${contact.color}`}>
                    {contact.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-[10px] text-gray-400">{contact.phone}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <UserPlus className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
