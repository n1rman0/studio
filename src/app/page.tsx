"use client";

import { AppContextProvider, useAppContext } from '@/components/docuproto/AppContextProvider';
import EventDisplay from '@/components/docuproto/ContextualSuggestions';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import FigmaLoaderV2 from '@/components/docuproto/FigmaLoaderV2';
import TopNavigation from '@/components/docuproto/TopNavigation';
import ProgressBar from '@/components/docuproto/ProgressBar';
import LandingPage from '@/components/LandingPage';
import CongratulationsModal from '@/components/docuproto/CongratulationsModal';
import { useEffect, useState } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';

const DocuProtoContent = () => {
  const { navigateForward, navigateBackward, navigateToFigmaNode, currentDocSection, restartPrototype } = useAppContext();
  const [showLanding, setShowLanding] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Calculate if we're on the last step
  const totalSteps = IOS_DOCUMENTATION.length;
  const currentStepIndex = currentDocSection 
    ? IOS_DOCUMENTATION.findIndex(section => section.id === currentDocSection.id)
    : 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleBackClick = () => {
    if (!showLanding) {
      // Go back to landing page instead of navigating within Figma
      setShowLanding(true);
    }
  };

  const handleNextClick = () => {
    if (showLanding) {
      setShowLanding(false);
    } else if (isLastStep) {
      // Show congratulations modal instead of navigating forward
      setShowCongratulations(true);
    } else {
      navigateForward();
    }
  };

  const handleLandingNext = () => {
    setShowLanding(false);
  };

  const handleCongratulationsClose = () => {
    setShowCongratulations(false);
  };

  const handleRestart = () => {
    setShowCongratulations(false);
    setShowLanding(true);
    restartPrototype();
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
          if (!showLanding) {
            // Go back to landing page instead of navigating within Figma
            setShowLanding(true);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (showLanding) {
            setShowLanding(false);
          } else if (isLastStep) {
            // Show congratulations modal instead of navigating forward
            setShowCongratulations(true);
          } else {
            navigateForward();
          }
          break;
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateForward, showLanding, isLastStep]);

  // Show landing page
  if (showLanding) {
    return <LandingPage onNext={handleLandingNext} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <TopNavigation />
      {/* Progress Bar - only show when not on landing page */}
      {!showLanding && (
        <div className="border-b bg-white px-4 py-3">
          <ProgressBar />
        </div>
      )}
      <div className={`flex flex-col lg:flex-row ${showLanding ? 'h-[calc(100vh-3.5rem)]' : 'h-[calc(100vh-7rem)]'} overflow-hidden`}>
        <div className="w-full lg:w-1/2 p-1 sm:p-2 md:p-4 h-1/2 lg:h-full overflow-hidden">
          <FigmaLoaderV2 />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col h-1/2 lg:h-full overflow-hidden">
          <div className="flex-grow overflow-hidden">
            <DocumentationDisplay />
          </div>
          {/* <div className="shrink-0">
            <EventDisplay />
          </div> */}
        </div>
      </div>

      {/* Navigation Buttons - Always on Top Layer */}
      <div className="fixed bottom-6 left-6 z-[9999] pointer-events-none">
        <button
          onClick={handleBackClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 pointer-events-auto backdrop-blur-sm border border-blue-500/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">BACK</span>
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
        <button
          onClick={handleNextClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 pointer-events-auto backdrop-blur-sm border border-blue-500/20"
        >
          <span className="font-medium">{isLastStep ? 'FINISH' : 'NEXT'}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Congratulations Modal */}
      <CongratulationsModal
        isOpen={showCongratulations}
        onClose={handleCongratulationsClose}
        onRestart={handleRestart}
      />
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
