"use client";

import React from 'react';
import { CheckSquare } from 'lucide-react';

const ChecklistItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50">
    <CheckSquare className="text-emerald-600 mt-1 flex-shrink-0" size={16} />
    <span className="text-slate-700 text-[14px]">{children}</span>
  </div>
);

const GoLivePanel: React.FC = () => {
  const items = [
    "Switch to Live keys (app + backend)",
    "Choose capture mode (auto/manual)",
    "Configure webhooks in Live; verify signatures",
    "Run test matrix: success/failure/cancel/timeout",
    "Monitoring & alerts enabled"
  ];

  return (
    <div className="w-full h-full bg-white">
      <div className="border-b px-4 py-3 flex items-center gap-2">
        <CheckSquare size={18} />
        <div className="font-semibold">Go‑Live Checklist</div>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item, idx) => (
          <ChecklistItem key={idx}>{item}</ChecklistItem>
        ))}
      </div>
    </div>
  );
};

export default GoLivePanel; 