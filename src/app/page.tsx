"use client";

import { AppContextProvider, useAppContext } from '@/components/docuproto/AppContextProvider';
import EventDisplay from '@/components/docuproto/ContextualSuggestions';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import FigmaEmbed from '@/components/docuproto/FigmaEmbed';
import TopNavigation from '@/components/docuproto/TopNavigation';
import { useEffect } from 'react';

const DocuProtoContent = () => {
  const { navigateForward, navigateBackward, navigateToFigmaNode } = useAppContext();

  const handleBackClick = () => {
    navigateBackward();
  };

  const handleNextClick = () => {
    navigateForward();
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the user is typing in an input field or textarea
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          navigateBackward();
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateForward();
          break;
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateBackward, navigateToFigmaNode]);

  return (
    <div className="min-h-screen bg-background relative">
      <TopNavigation />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="w-full lg:w-1/2 p-1 sm:p-2 md:p-4 h-1/2 lg:h-full overflow-hidden">
          <FigmaEmbed />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col h-1/2 lg:h-full overflow-hidden">
          <div className="flex-grow overflow-hidden">
            <DocumentationDisplay />
          </div>
          <div className="shrink-0">
            <EventDisplay />
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-6">
        <button 
          onClick={handleBackClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">BACK</span>
        </button>
      </div>
      
      <div className="absolute bottom-6 right-6">
        <button 
          onClick={handleNextClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <span className="font-medium">NEXT</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function DocuProtoPage() {
  return (
    <AppContextProvider>
      <DocuProtoContent />
    </AppContextProvider>
  );
}
