"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const DocumentationDisplay: React.FC = () => {
  const { currentDocSection, navigateToFigmaNode } = useAppContext();

  if (!currentDocSection) {
    return (
      <Card className="w-full h-full flex items-center justify-center shadow-lg">
        <CardContent className="text-center">
          <p className="text-muted-foreground">Select a section from the navigation or click on the prototype.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full flex flex-col shadow-lg overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline text-2xl text-primary">{currentDocSection.title}</CardTitle>
            <CardDescription>Detailed information and usage guidelines.</CardDescription>
          </div>
          {currentDocSection.figmaNodeId && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToFigmaNode(currentDocSection.figmaNodeId)}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Eye className="mr-2 h-4 w-4" />
              View in Prototype
            </Button>
          )}
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="pt-6 prose prose-sm lg:prose-base max-w-none">
          <div dangerouslySetInnerHTML={{ __html: currentDocSection.content }} />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DocumentationDisplay;
