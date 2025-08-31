"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { IOS_DOCUMENTATION } from '@/data/documentation';

interface ProgressBarProps {
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ className = '' }) => {
  const { currentDocSection, setCurrentDocSectionById } = useAppContext();
  
  // Calculate current step based on documentation sections
  const totalSteps = IOS_DOCUMENTATION.length;
  const currentStepIndex = currentDocSection 
    ? IOS_DOCUMENTATION.findIndex(section => section.id === currentDocSection.id)
    : 0;
  const currentStep = currentStepIndex + 1;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Step labels for better UX
  const stepLabels = [
    'Cart',
    'Loading',
    'Checkout', 
    'Processing',
    'Complete'
  ];

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-label={`Progress: Step ${currentStep} of ${totalSteps}`} aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {/* Progress info */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-foreground/70">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-sm font-medium text-foreground/70 hidden sm:block">
          {stepLabels[currentStepIndex] || 'Getting Started'}
        </div>
      </div>
      
      {/* Progress bar container */}
      <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden shadow-inner">
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary"></div>
        
        {/* Progress fill with gradient */}
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{
            width: `${progressPercentage}%`,
            background: 'linear-gradient(90deg, hsl(214 84% 56%) 0%, hsl(214 90% 65%) 50%, hsl(214 84% 56%) 100%)',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
        
        {/* Step markers */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {Array.from({ length: totalSteps }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                const section = IOS_DOCUMENTATION[index];
                if (section) {
                  setCurrentDocSectionById(section.id);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const section = IOS_DOCUMENTATION[index];
                  if (section) {
                    setCurrentDocSectionById(section.id);
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                index < currentStep 
                  ? 'bg-white shadow-sm hover:bg-blue-100' 
                  : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
              title={`Go to ${stepLabels[index]}`}
              aria-label={`Jump to step ${index + 1}: ${stepLabels[index]}`}
            >
              <div className={`w-1 h-1 rounded-full ${
                index < currentStep ? 'bg-blue-600' : 'bg-foreground/60'
              }`} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Removed percentage text to save vertical space */}
    </div>
  );
};

export default ProgressBar; 