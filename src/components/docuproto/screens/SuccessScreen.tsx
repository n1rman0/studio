"use client";

import React from 'react';
import { Check, Link2 } from 'lucide-react';
import { useAppContext } from '../AppContextProvider';

type PhoneScreenProps = { onRequestNext?: () => void; onRequestBack?: () => void; onRequestGoto?: (id: string) => void };
const SuccessScreen: React.FC<PhoneScreenProps> = () => {
  const { addInteraction } = useAppContext();

  return (
    <div className="w-full h-full bg-[#0ea15a] relative text-white">
      {/* Top text */}
      <div className="pt-16 text-center">
        <div className="text-[12px] opacity-90">Redirecting in 5 seconds..</div>
        <div className="mt-1 text-[18px] font-semibold">Payment Successful</div>
      </div>

      {/* Check mark emblem */}
      <div className="mt-10 flex items-center justify-center">
        <div className="relative">
          <div className="h-40 w-40 rounded-full bg-[#19c170]" />
          <div className="absolute inset-0 rounded-full border-8 border-[#7cf28f] opacity-70" />
          <div className="absolute inset-3 rounded-full border-8 border-[#4fe274] opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
              <Check className="text-white" size={48} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Receipt card */}
      <div className="absolute left-4 right-4 bottom-24 bg-white text-slate-800 rounded-2xl shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-semibold">Maven Shop Inc.</div>
          <div className="text-[18px] font-extrabold">₹4149</div>
        </div>
        <div className="mt-2 text-[11px] text-slate-500">Feb 23, 2024 | 04:20 PM</div>
        <div className="mt-3 text-[12px] text-slate-600">
          Netbanking | pay_KVu6bG8u2lsutd <button onClick={() => addInteraction('Copy payment id')} className="align-middle text-blue-600"><Link2 size={14} className="inline" /></button>
        </div>
        <button onClick={() => addInteraction('Support link tapped')} className="mt-3 text-[12px] text-slate-500 flex items-center gap-1">
          <span className="inline-block h-4 w-4 rounded-full border border-slate-300" /> Visit razorpay.com/support for queries
        </button>
      </div>

      {/* Bottom secured */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] opacity-90">Secured by <span className="font-semibold">Razorpay</span></div>
    </div>
  );
};

export default SuccessScreen; 