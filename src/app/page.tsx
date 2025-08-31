"use client";

import { AppContextProvider, useAppContext } from '@/components/docuproto/AppContextProvider';
import TopNavigation from '@/components/docuproto/TopNavigation';
import LandingPage from '@/components/LandingPage';
import CongratulationsModal from '@/components/docuproto/CongratulationsModal';
import { useEffect, useMemo, useState } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';
import LeftPane from '@/components/docuproto/LeftPane';
import RightPane from '@/components/docuproto/RightPane';

const DocuProtoContent = () => {
  const { navigateForward, navigateBackward, currentDocSection, restartPrototype } = useAppContext();
  const [showLanding, setShowLanding] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const currentStep = currentDocSection;
  const leftConfig = currentStep?.left;

  const totalSteps = IOS_DOCUMENTATION.length;
  const currentStepIndex = currentStep ? IOS_DOCUMENTATION.findIndex(section => section.id === currentStep.id) : 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const handleNavigation = (navFunc: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      navFunc();
      setTransitioning(false);
    }, 400);
  };

  const handleBackClick = () => {
    if (showLanding) return;
    if (currentStepIndex <= 0) {
      setShowLanding(true);
    } else {
      handleNavigation(navigateBackward);
    }
  };

  const handleNextClick = () => {
    if (showLanding) {
      setShowLanding(false);
    } else if (isLastStep) {
      setShowCongratulations(true);
    } else {
      handleNavigation(navigateForward);
    }
  };

  const handleLandingNext = () => setShowLanding(false);
  const handleCongratulationsClose = () => setShowCongratulations(false);
  const handleRestart = () => { setShowCongratulations(false); setShowLanding(true); restartPrototype(); };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') return;
      if (event.key === 'ArrowLeft') handleBackClick();
      if (event.key === 'ArrowRight') handleNextClick();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateForward, navigateBackward, showLanding, isLastStep, currentStepIndex]);

  return (
    <div className="min-h-screen bg-background relative">
      {showLanding ? (
        <LandingPage onNext={handleLandingNext} />
      ) : (
        <>
          <TopNavigation />
          <div className={`flex flex-col lg:flex-row h-[calc(100vh-3rem)] overflow-hidden`}>
            <div className="w-full lg:w-1/3 p-1 sm:p-2 md:p-4 h-1/2 lg:h-full overflow-hidden">
              <LeftPane
                leftConfig={leftConfig as any}
                transitioning={transitioning}
                onNext={() => handleNavigation(navigateForward)}
                onBack={() => handleNavigation(navigateBackward)}
              />
            </div>
            <div className="w-full lg:w-2/3 min-w-0 flex flex-col h-1/2 lg:h-full overflow-hidden">
              <div className="flex-grow overflow-hidden">
                <RightPane />
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
        </>
      )}
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
