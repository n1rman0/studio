"use client";

import React, { useState } from 'react';
import { ChevronLeft, Star, StarHalf, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../AppContextProvider';

type PhoneScreenProps = { onRequestNext?: () => void; onRequestBack?: () => void; onRequestGoto?: (id: string) => void };
const ProductDetailScreen: React.FC<PhoneScreenProps> = ({ onRequestNext, onRequestBack }) => {
  const { addInteraction } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<'orange' | 'green' | 'gray' | 'pink'>('orange');

  const handleBuy = () => {
    addInteraction(`Buy Now tapped (qty: ${quantity}, color: ${color})`);
    onRequestNext?.();
  };

  const dec = () => setQuantity(q => Math.max(1, q - 1));
  const inc = () => setQuantity(q => Math.min(9, q + 1));

  return (
    <div className="w-full h-full bg-white text-[#0f172a]">
      {/* Navigation bar */}
      <div className="pt-10 px-4 pb-3 flex items-center">
        <button onClick={() => { addInteraction('Back tapped'); onRequestBack?.(); }} className="p-2 -ml-2 rounded-lg active:scale-95">
          <ChevronLeft />
        </button>
        <div className="mx-auto text-[17px] font-semibold">AcmeCorp</div>
        <div className="w-6" />
      </div>

      {/* Breadcrumb */}
      <div className="px-5 text-[12px] text-slate-500">Sofa Sets / Tangerine Dream Sofa Set</div>

      {/* Hero image */}
      <div className="px-5 mt-3">
        <div className="rounded-xl overflow-hidden bg-slate-100">
          <img src="https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1470&auto=format&fit=crop" alt="sofa" className="w-full h-48 object-cover" />
        </div>
      </div>

      {/* Title */}
      <div className="px-5 mt-5">
        <h1 className="text-[24px] leading-7 font-extrabold">Tangerine Dream Sofa Set</h1>
      </div>

      {/* Price + rating */}
      <div className="px-5 mt-2 flex items-center justify-between">
        <div className="text-[20px] font-bold">₹59,990</div>
        <div className="flex items-center gap-1 text-[12px] text-slate-600">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <StarHalf className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="ml-1">4.6 / 5.0 (556)</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mt-3 text-[13px] text-slate-600 leading-5">
        The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at.
        Also, there’s a tilt and height-adjusting mechanism that’s built to outlast years of ups and downs.
      </div>

      {/* Color and quantity */}
      <div className="px-5 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {([
            ['orange', '#f97316'],
            ['green', '#16a34a'],
            ['gray', '#64748b'],
            ['pink', '#f472b6']
          ] as const).map(([key, hex]) => (
            <button
              key={key}
              onClick={() => { setColor(key as any); addInteraction(`Color selected: ${key}`); }}
              className={`h-6 w-6 rounded-full border ${color === key ? 'ring-2 ring-offset-2 ring-slate-300' : ''}`}
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={dec} className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center"><Minus size={16} /></button>
          <div className="w-6 text-center text-[14px] font-medium">{quantity}</div>
          <button onClick={inc} className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center"><Plus size={16} /></button>
        </div>
      </div>

      {/* Buy Now */}
      <div className="px-5 mt-5">
        <button onClick={handleBuy} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 text-[15px] font-semibold shadow">
          <ShoppingCart size={18} /> Buy Now
        </button>
        <div className="text-center text-[10px] text-slate-400 mt-2">Secured by Razorpay</div>
      </div>
    </div>
  );
};

export default ProductDetailScreen; 