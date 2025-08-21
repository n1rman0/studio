"use client";

import { AppContextProvider, useAppContext } from '@/components/docuproto/AppContextProvider';
import DocumentationDisplay from '@/components/docuproto/DocumentationDisplay';
import MobilePhone from '@/components/docuproto/MobilePhone';
import TopNavigation from '@/components/docuproto/TopNavigation';
import ProgressBar from '@/components/docuproto/ProgressBar';
import LandingPage from '@/components/LandingPage';
import CongratulationsModal from '@/components/docuproto/CongratulationsModal';
import { useEffect, useMemo, useState } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';

const DocuProtoContent = () => {
  const { navigateForward, navigateBackward, currentDocSection, restartPrototype } = useAppContext();
  const [showLanding, setShowLanding] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Map doc section -> phone screen
  const phoneScreen = useMemo(() => {
    const id = currentDocSection?.id;
    if (!id) return 'product' as const;
    switch (id) {
      case 'cart':
        return 'product' as const; // first image
      case 'cart-loading':
      case 'checkout':
      case 'checkout-loading':
        return 'checkout' as const; // second image
      case 'payment-success':
        return 'success' as const; // third image
      default:
        return 'product' as const;
    }
  }, [currentDocSection?.id]);

  const totalSteps = IOS_DOCUMENTATION.length;
  const currentStepIndex = currentDocSection 
    ? IOS_DOCUMENTATION.findIndex(section => section.id === currentDocSection.id)
    : 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const withOverlay = (fn: () => void) => {
    setOverlayVisible(true);
    setTimeout(() => {
      try { fn(); } finally { setOverlayVisible(false); }
    }, 900);
  };

  const handleBackClick = () => {
    if (showLanding) {
      return;
    }
    if (currentStepIndex <= 0) {
      setShowLanding(true);
    } else {
      withOverlay(() => navigateBackward());
    }
  };

  const handleNextClick = () => {
    if (showLanding) {
      setShowLanding(false);
    } else if (isLastStep) {
      setShowCongratulations(true);
    } else {
      withOverlay(() => navigateForward());
    }
  };

  const handleLandingNext = () => setShowLanding(false);
  const handleCongratulationsClose = () => setShowCongratulations(false);
  const handleRestart = () => { setShowCongratulations(false); setShowLanding(true); restartPrototype(); };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') return;
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (showLanding) {
            // no-op on landing
          } else if (currentStepIndex <= 0) {
            setShowLanding(true);
          } else {
            withOverlay(() => navigateBackward());
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (showLanding) { setShowLanding(false); }
          else if (isLastStep) { setShowCongratulations(true); }
          else { withOverlay(() => navigateForward()); }
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateForward, navigateBackward, showLanding, isLastStep, currentStepIndex]);

  if (showLanding) return <LandingPage onNext={handleLandingNext} />;

  // Show overlay continuously when on explicit *-loading steps
  const isExplicitLoading = (currentDocSection?.id ?? '').includes('loading');

  return (
    <div className="min-h-screen bg-background relative">
      <TopNavigation />
      {!showLanding && (
        <div className="border-b bg-white px-4 py-3"><ProgressBar /></div>
      )}
      <div className={`flex flex-col lg:flex-row ${showLanding ? 'h-[calc(100vh-3.5rem)]' : 'h-[calc(100vh-7rem)]'} overflow-hidden`}>
        <div className="w-full lg:w-1/2 p-1 sm:p-2 md:p-4 h-1/2 lg:h-full overflow-hidden">
          <MobilePhone
            overlayVisible={overlayVisible || isExplicitLoading}
            overlayLabel={isExplicitLoading ? 'Loading' : 'Loading'}
            screen={phoneScreen}
            onRequestNext={() => {
              if (isLastStep) { setShowCongratulations(true); }
              else { withOverlay(() => navigateForward()); }
            }}
            onRequestBack={() => {
              if (currentStepIndex <= 0) { setShowLanding(true); }
              else { withOverlay(() => navigateBackward()); }
            }}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col h-1/2 lg:h-full overflow-hidden">
          <div className="flex-grow overflow-hidden">
            <DocumentationDisplay />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-[9999] pointer-events-none">
        <button onClick={handleBackClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 pointer-events-auto backdrop-blur-sm border border-blue-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <span className="font-medium">BACK</span>
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
        <button onClick={handleNextClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 pointer-events-auto backdrop-blur-sm border border-blue-500/20">
          <span className="font-medium">{isLastStep ? 'FINISH' : 'NEXT'}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <CongratulationsModal isOpen={showCongratulations} onClose={handleCongratulationsClose} onRestart={handleRestart} />
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
