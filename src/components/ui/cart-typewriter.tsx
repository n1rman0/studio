"use client";

import React from 'react';
import { JSONTypewriterEffect } from '@/components/ui/json-typewriter-effect';

export interface CartTypewriterProps {
  json: object;
  className?: string;
  speed?: number;
  showLineNumbers?: boolean;
}

export const CartTypewriter: React.FC<CartTypewriterProps> = ({ json, className, speed = 25, showLineNumbers = true }) => {
  return (
    <JSONTypewriterEffect
      jsonObject={json}
      className={className}
      speed={speed}
      showLineNumbers={showLineNumbers}
    />
  );
};

export default CartTypewriter; 