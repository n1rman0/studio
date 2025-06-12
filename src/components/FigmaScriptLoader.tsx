
"use client";

import Script from 'next/script';
import React from 'react';

const FigmaScriptLoader: React.FC = () => {
  return (
    <Script
      src="https://www.figma.com/embed_api/1.0.0"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Figma Embed API script successfully loaded via next/script.');
      }}
      onError={(e) => {
        console.error('Error loading Figma Embed API script via next/script:', e);
      }}
    />
  );
};

export default FigmaScriptLoader;
