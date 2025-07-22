"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import APIDocumentationExample from './APIDocumentationExample';
import ShoppingCartAPIExample from './ShoppingCartAPIExample';
import { CartTypewriterDemo } from './CartTypewriterDemo';

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

  // Function to render content with React components
  const renderContent = (content: string) => {
    // Split content by React component tags
    const parts = content.split(/(<\w+(?:APIExample|Demo)\/>)/);

    return parts.map((part, index) => {
      if (part === '<APIDocumentationExample/>') {
        return <APIDocumentationExample key={index} />;
      } else if (part === '<ShoppingCartAPIExample/>') {
        return <ShoppingCartAPIExample key={index} />;
      } else if (part === '<CartTypewriterDemo/>') {
        return <CartTypewriterDemo key={index} />;
      } else if (part.trim()) {
        // Render HTML content
        return (
          <div
            key={index}
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
      }
      return null;
    });
  };

  // Display the actual documentation content
  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-gray-200 overflow-hidden rounded-none">
      <ScrollArea className="flex-grow bg-white">
        <CardContent className="pt-6">
          {renderContent(currentDocSection.content)}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DocumentationDisplay;