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
      <Card className="w-full h-full flex items-center justify-center shadow-sm border-gray-200 rounded-none">
        <CardContent className="text-center">
          <p className="text-gray-500">Select a section from the navigation or click on the prototype.</p>
        </CardContent>
      </Card>
    );
  }

  // Display the actual documentation content
  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-gray-200 overflow-hidden rounded-none">
      <CardHeader className="border-b border-gray-200 bg-white shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline text-xl text-gray-900">{currentDocSection.title}</CardTitle>
            <CardDescription className="text-gray-600">iOS SDK Documentation</CardDescription>
          </div>
          {currentDocSection.figmaNodeId && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToFigmaNode(currentDocSection.figmaNodeId)}
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="mr-2 h-4 w-4" />
              View in Prototype
            </Button>
          )}
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow bg-white">
        <CardContent className="pt-6">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: currentDocSection.content }}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DocumentationDisplay;
