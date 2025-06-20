"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopNavigation: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="w-full flex h-14 items-center justify-between px-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg text-primary">DocuProto</h1>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Beta
          </Badge>
        </div>

        {/* Right side - Navigation Links */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            Documentation
          </Button>
          <Button variant="ghost" size="sm">
            Components
          </Button>
          <Button variant="ghost" size="sm">
            Examples
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default TopNavigation; 