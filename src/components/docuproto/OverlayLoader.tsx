"use client";

import React from 'react';

interface OverlayLoaderProps {
  visible: boolean;
  label?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ visible, label }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
        {label && <div className="text-white mt-3 text-sm">{label}</div>}
      </div>
    </div>
  );
};

export default OverlayLoader; 