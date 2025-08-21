"use client";

import React from 'react';
import { ChevronRight, ChevronDown, Wallet as WalletIcon, Landmark, CreditCard, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../AppContextProvider';

const Row: React.FC<{ title: string; subtitle?: string; accent?: 'green' | 'red'; onClick?: () => void }>
  = ({ title, subtitle, accent, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-4 px-4 hover:bg-slate-50">
    <div className="flex items-start gap-3 text-left">
      <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center mt-0.5">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
      </div>
      <div>
        <div className="text-[14px] font-semibold text-slate-900">{title}</div>
        {subtitle && (
          <div className={`text-[12px] ${accent === 'green' ? 'text-green-600' : accent === 'red' ? 'text-rose-500' : 'text-slate-500'}`}>{subtitle}</div>
        )}
      </div>
    </div>
    <ChevronDown className="text-slate-400" size={18} />
  </button>
);

const WalletGrid: React.FC<{ onTap: (name: string) => void }> = ({ onTap }) => (
  <div className="grid grid-cols-2 gap-3 p-4">
    {['Amazon Pay', 'PayTM', 'PhonePe', 'More'].map(name => (
      <button key={name} onClick={() => onTap(name)} className="rounded-xl border bg-white py-3 text-[13px] font-medium text-slate-700">
        {name}
      </button>
    ))}
  </div>
);

type PhoneScreenProps = { onRequestNext?: () => void; onRequestBack?: () => void; onRequestGoto?: (id: string) => void };
const CheckoutScreen: React.FC<PhoneScreenProps> = ({ onRequestNext, onRequestBack }) => {
  const { addInteraction } = useAppContext();

  return (
    <div className="w-full h-full bg-white">
      {/* Blue header with brand and steps */}
      <div className="bg-[#2f54ff] text-white pt-10 pb-3 px-5 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <div className="font-extrabold text-[22px] tracking-wide">perfora</div>
          <span className="inline-block h-4 w-4 rounded-sm bg-emerald-400" />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px] opacity-95">
          <span>Contact</span>
          <ChevronRight size={14} />
          <span>Address</span>
          <ChevronRight size={14} />
          <span className="font-semibold">Payment</span>
        </div>
      </div>

      {/* All Options */}
      <div className="px-5 mt-3 text-[13px] text-slate-700">All Options</div>
      <div className="px-5 mt-2">
        <div className="rounded-2xl border overflow-hidden bg-white">
          <Row title="UPI" subtitle="Save ₹150 extra" accent="green" onClick={() => addInteraction('UPI tapped')} />
          <div className="h-px bg-slate-200" />
          <Row title="Debit, Credit Cards" subtitle="Visa, Mastercard, Rupay" onClick={() => addInteraction('Cards tapped')} />
          <div className="h-px bg-slate-200" />
          <Row title="Netbanking" onClick={() => addInteraction('Netbanking tapped')} />
          <div className="h-px bg-slate-200" />
          <Row title="EMI" subtitle="Offer or Subtext" onClick={() => addInteraction('EMI tapped')} />
          <div className="h-px bg-slate-200" />
          {/* Wallet section collapsed with grid */}
          <button onClick={() => addInteraction('Wallet tapped')} className="w-full flex items-center justify-between py-4 px-4 hover:bg-slate-50">
            <div className="flex items-start gap-3 text-left">
              <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center mt-0.5">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">Wallet</div>
              </div>
            </div>
            <ChevronDown className="text-slate-400" size={18} />
          </button>
          <WalletGrid onTap={(name) => addInteraction(`${name} wallet tapped`)} />
          <div className="h-px bg-slate-200" />
          <Row title="Pay on Delivery" subtitle="+₹50 extra charge" accent="red" onClick={() => addInteraction('COD tapped')} />
        </div>
      </div>

      {/* Sticky footer */}
      <div className="absolute left-0 right-0 bottom-0 px-5 pb-4 pt-2 bg-white/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[14px] font-bold">₹4560</div>
            <button onClick={() => addInteraction('View Details')} className="text-[11px] text-slate-500 flex items-center gap-1">View Details <ChevronDown size={12} /></button>
          </div>
          <button onClick={() => { addInteraction('Continue tapped'); onRequestNext?.(); }} className="rounded-xl bg-black text-white px-6 py-3 text-[15px] font-semibold flex items-center gap-2">
            <ShieldCheck size={18} /> Continue
          </button>
        </div>
        <div className="mt-2 mx-auto h-1 w-28 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};

export default CheckoutScreen; 