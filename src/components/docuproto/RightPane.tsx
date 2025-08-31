"use client";

import React from 'react';
import DocumentationDisplay from './DocumentationDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const RightPane: React.FC = () => {
  return (
    <Card className="w-full h-full flex flex-col shadow-sm border border-border overflow-hidden rounded-none">
      <ScrollArea className="flex-grow bg-card">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="w-full overflow-hidden">
            <DocumentationDisplay />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default RightPane; 