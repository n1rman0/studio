"use client";

import React from 'react';
import { Database, KeyRound, Webhook, CheckCircle2, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Item: React.FC<{ label: string; status?: 'done' | 'todo' | 'error' }>
  = ({ label, status = 'done' }) => (
  <div className="flex items-center gap-2 text-[13px] py-1">
    {status === 'done' && <CheckCircle2 className="text-emerald-600" size={16} />}
    {status === 'todo' && <XCircle className="text-slate-300" size={16} />}
    {status === 'error' && <XCircle className="text-rose-500" size={16} />}
    <span className="text-slate-700">{label}</span>
  </div>
);

const ServerPanel: React.FC = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="border-b px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <Database size={18} />
        <div className="font-semibold">Server Console</div>
      </div>
      <div className="flex-grow p-4">
        <Tabs defaultValue="store" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="verify">Verify Signature</TabsTrigger>
            <TabsTrigger value="status">Status/Capture</TabsTrigger>
          </TabsList>
          <TabsContent value="store" className="flex-grow rounded-xl border p-4 mt-3">
            <div className="font-semibold text-[14px] flex items-center gap-2 mb-2"><KeyRound size={16} /> Store</div>
            <Item label="order_id" />
            <Item label="payment_id" />
            <Item label="status" />
            <Item label="signature" />
            <Item label="notes" />
          </TabsContent>
          <TabsContent value="verify" className="flex-grow rounded-xl border p-4 mt-3">
            <div className="font-semibold text-[14px] flex items-center gap-2 mb-2"><KeyRound size={16} /> Verify Signature (HMAC)</div>
            <Item label="Compute HMAC with Key Secret" />
            <Item label="Compare with provided signature" />
            <Item label="Accept/Reject" status="todo" />
          </TabsContent>
          <TabsContent value="status" className="flex-grow rounded-xl border p-4 mt-3">
            <div className="font-semibold text-[14px] flex items-center gap-2 mb-2"><Webhook size={16} /> Status/Capture</div>
            <Item label="Capture via API or via Webhooks" />
            <Item label="Validate webhook signatures" />
            <Item label="Idempotent retries" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServerPanel; 