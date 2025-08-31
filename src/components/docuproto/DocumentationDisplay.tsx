"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import APIDocumentationExample from './APIDocumentationExample';
import APIExampleTag from './APIExampleTag';
import { CartTypewriterDemo } from './CartTypewriterDemo';
import { CartImplementationSnippet, CartPersistenceSnippet, CheckoutFlowSnippet, ErrorHandlingSnippet, RzpInitSwiftSnippet, RzpInitObjcSnippet, RzpOpenSwiftSnippet, RzpOpenObjcSnippet, RzpDisplayControllerSwiftSnippet, RzpDelegateSwiftProtocolSnippet, RzpDelegateObjcProtocolSnippet, RzpDelegateSwiftWithDataSnippet, RzpDelegateObjcWithDataSnippet, CocoaPodSnippet, PodInstallSnippet, AtsInfoPlistSnippet } from './EmbeddedCodeSnippet';

const DocumentationDisplay: React.FC = () => {
  const { currentDocSection } = useAppContext();

  if (!currentDocSection) {
    return (
      <Card className="w-full h-full flex items-center justify-center shadow-sm border border-border rounded-none">
        <CardContent className="text-center">
          <p className="text-muted-foreground">Select a section from the navigation or click on the prototype.</p>
        </CardContent>
      </Card>
    );
  }

  // Function to render content with React components
  const renderContent = (content: string) => {
    // Split content by React component tags with optional whitespace
    const parts = content.split(/(<\s*(?:APIDocumentationExample|APIExample|CartTypewriterDemo|[A-Za-z]+Snippet)\s*\/>)/);

    return parts.map((part, index) => {
      const token = part.replace(/\s+/g, '');
      if (token === '<APIDocumentationExample/>') {
        return <APIDocumentationExample key={index} />;
      } else if (token === '<APIExample/>') {
        return <APIExampleTag key={index} />;
      } else if (token === '<CartTypewriterDemo/>') {
        return <CartTypewriterDemo key={index} />;
      } else if (token === '<CartImplementationSnippet/>') {
        return <CartImplementationSnippet key={index} />;
      } else if (token === '<CartPersistenceSnippet/>') {
        return <CartPersistenceSnippet key={index} />;
      } else if (token === '<CheckoutFlowSnippet/>') {
        return <CheckoutFlowSnippet key={index} />;
      } else if (token === '<ErrorHandlingSnippet/>') {
        return <ErrorHandlingSnippet key={index} />;
      } else if (token === '<RzpInitSwiftSnippet/>') {
        return <RzpInitSwiftSnippet key={index} />;
      } else if (token === '<RzpInitObjcSnippet/>') {
        return <RzpInitObjcSnippet key={index} />;
      } else if (token === '<RzpOpenSwiftSnippet/>') {
        return <RzpOpenSwiftSnippet key={index} />;
      } else if (token === '<RzpOpenObjcSnippet/>') {
        return <RzpOpenObjcSnippet key={index} />;
      } else if (token === '<RzpDisplayControllerSwiftSnippet/>') {
        return <RzpDisplayControllerSwiftSnippet key={index} />;
      } else if (token === '<RzpDelegateSwiftProtocolSnippet/>') {
        return <RzpDelegateSwiftProtocolSnippet key={index} />;
      } else if (token === '<RzpDelegateObjcProtocolSnippet/>') {
        return <RzpDelegateObjcProtocolSnippet key={index} />;
      } else if (token === '<RzpDelegateSwiftWithDataSnippet/>') {
        return <RzpDelegateSwiftWithDataSnippet key={index} />;
      } else if (token === '<RzpDelegateObjcWithDataSnippet/>') {
        return <RzpDelegateObjcWithDataSnippet key={index} />;
      } else if (token === '<CocoaPodSnippet/>') {
        return <CocoaPodSnippet key={index} />;
      } else if (token === '<PodInstallSnippet/>') {
        return <PodInstallSnippet key={index} />;
      } else if (token === '<AtsInfoPlistSnippet/>') {
        return <AtsInfoPlistSnippet key={index} />;
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
    <Card className="w-full h-full flex flex-col shadow-sm border border-border overflow-hidden rounded-none">
      <ScrollArea className="flex-grow bg-card">
        <CardContent className="pt-6 px-6 pb-8">
          <div className="w-full overflow-hidden">
            {renderContent(currentDocSection.content)}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DocumentationDisplay;