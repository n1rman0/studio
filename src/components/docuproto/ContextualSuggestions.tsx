"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb, Zap } from 'lucide-react';

const EventDisplay: React.FC = () => {
  const { interactionHistory } = useAppContext();

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-yellow-500" />
          <div>
            <CardTitle>Figma Events</CardTitle>
            <CardDescription>Recent interactions from the prototype.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          {interactionHistory.length > 0 ? (
            <ul className="space-y-2">
              {interactionHistory.slice().reverse().map((event, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  <span className="font-mono text-xs bg-muted p-1 rounded-md">{event}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No events yet. Interact with the prototype above.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventDisplay;
