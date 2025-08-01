import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Date Header */}
      <div className="absolute top-6 left-8 text-gray-500 text-sm font-medium">
        {new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>

      {/* Main Content Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Content */}
        <div className="w-[60%] flex flex-col justify-center px-8 lg:px-16">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to the new{' '}
              <span className="text-blue-600">Razorpay</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 font-light">
              Supercharge your customer experiences
            </p>
          </div>

          {/* Brand Section */}
          <div className="mt-16">
            <div className="flex items-center">
              {/* Razorpay Logo */}
              <svg 
                width="160" 
                height="35" 
                viewBox="0 0 122.88 26.53" 
                className="h-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`.st0{fill:#3395FF;} .st1{fill:#072654;}`}
                </style>
                <g>
                  <polygon className="st1" points="11.19,9.03 7.94,21.47 0,21.47 1.61,15.35 11.19,9.03"/>
                  <path className="st1" d="M28.09,5.08C29.95,5.09,31.26,5.5,32,6.33s0.92,2.01,0.51,3.56c-0.27,1.06-0.82,2.03-1.59,2.8 c-0.8,0.8-1.78,1.38-2.87,1.68c0.83,0.19,1.34,0.78,1.5,1.79l0.03,0.22l0.6,5.09h-3.7l-0.62-5.48c-0.01-0.18-0.06-0.36-0.15-0.52 c-0.09-0.16-0.22-0.29-0.37-0.39c-0.31-0.16-0.65-0.24-1-0.25h-0.21h-2.28l-1.74,6.63h-3.46l4.3-16.38H28.09L28.09,5.08z M122.88,9.37l-4.4,6.34l-5.19,7.52l-0.04,0.04l-1.16,1.68l-0.04,0.06L112,25.09l-1,1.44h-3.44l4.02-5.67l-1.82-11.09h3.57 l0.9,7.23l4.36-6.19l0.06-0.09l0.07-0.1l0.07-0.09l0.54-1.15H122.88L122.88,9.37z M92.4,10.25c0.66,0.56,1.09,1.33,1.24,2.19 c0.18,1.07,0.1,2.18-0.21,3.22c-0.29,1.15-0.78,2.23-1.46,3.19c-0.62,0.88-1.42,1.61-2.35,2.13c-0.88,0.48-1.85,0.73-2.85,0.73 c-0.71,0.03-1.41-0.15-2.02-0.51c-0.47-0.28-0.83-0.71-1.03-1.22l-0.06-0.2l-1.77,6.75h-3.43l3.51-13.4l0.02-0.06l0.01-0.06 l0.86-3.25h3.35l-0.57,1.88l-0.01,0.08c0.49-0.7,1.15-1.27,1.91-1.64c0.76-0.4,1.6-0.6,2.45-0.6C90.84,9.43,91.7,9.71,92.4,10.25 L92.4,10.25z M88.26,12.11c-0.4-0.01-0.8,0.07-1.18,0.22c-0.37,0.15-0.71,0.38-1,0.66c-0.68,0.7-1.15,1.59-1.36,2.54 c-0.3,1.11-0.28,1.95,0.02,2.53c0.3,0.58,0.87,0.88,1.72,0.88c0.81,0.02,1.59-0.29,2.18-0.86c0.66-0.69,1.12-1.55,1.33-2.49 c0.29-1.09,0.27-1.96-0.03-2.57S89.08,12.11,88.26,12.11L88.26,12.11z M103.66,9.99c0.46,0.29,0.82,0.72,1.02,1.23l0.07,0.19 l0.44-1.66h3.36l-3.08,11.7h-3.37l0.45-1.73c-0.51,0.61-1.15,1.09-1.87,1.42c-0.7,0.32-1.45,0.49-2.21,0.49 c-0.88,0.04-1.76-0.21-2.48-0.74c-0.66-0.52-1.1-1.28-1.24-2.11c-0.18-1.06-0.12-2.14,0.19-3.17c0.3-1.15,0.8-2.24,1.49-3.21 c0.63-0.89,1.44-1.64,2.38-2.18c0.86-0.5,1.84-0.77,2.83-0.77C102.36,9.43,103.06,9.61,103.66,9.99L103.66,9.99z M101.92,12.14 c-0.41,0-0.82,0.08-1.19,0.24c-0.38,0.16-0.72,0.39-1.01,0.68c-0.67,0.71-1.15,1.59-1.36,2.55c-0.28,1.08-0.28,1.9,0.04,2.49 c0.31,0.59,0.89,0.87,1.75,0.87c0.4,0.01,0.8-0.07,1.18-0.22s0.71-0.38,1-0.66c0.59-0.63,1.02-1.38,1.26-2.22l0.08-0.31 c0.3-1.11,0.29-1.96-0.03-2.53C103.33,12.44,102.76,12.14,101.92,12.14L101.92,12.14z M81.13,9.63l0.22,0.09l-0.86,3.19 c-0.49-0.26-1.03-0.39-1.57-0.39c-0.82-0.03-1.62,0.24-2.27,0.75c-0.56,0.48-0.97,1.12-1.18,1.82l-0.07,0.27l-1.6,6.11h-3.42 l3.1-11.7h3.37l-0.44,1.72c0.42-0.58,0.96-1.05,1.57-1.4c0.68-0.39,1.44-0.59,2.22-0.59C80.51,9.48,80.83,9.52,81.13,9.63 L81.13,9.63z M68.5,10.19c0.76,0.48,1.31,1.24,1.52,2.12c0.25,1.06,0.21,2.18-0.11,3.22c-0.3,1.18-0.83,2.28-1.58,3.22 c-0.71,0.91-1.61,1.63-2.64,2.12c-1.05,0.49-2.19,0.74-3.35,0.73c-1.22,0-2.22-0.24-3-0.73c-0.77-0.48-1.32-1.24-1.54-2.12 c-0.24-1.06-0.2-2.18,0.11-3.22c0.3-1.17,0.83-2.27,1.58-3.22c0.71-0.9,1.62-1.63,2.66-2.12c1.06-0.49,2.22-0.75,3.39-0.73 C66.57,9.41,67.6,9.67,68.5,10.19L68.5,10.19z M64.84,12.1c-0.81-0.01-1.59,0.3-2.18,0.86c-0.61,0.58-1.07,1.43-1.36,2.57 c-0.6,2.29-0.02,3.43,1.74,3.43c0.8,0.02,1.57-0.29,2.15-0.85c0.6-0.57,1.04-1.43,1.34-2.58c0.3-1.13,0.31-1.98,0.01-2.57 C66.25,12.37,65.68,12.1,64.84,12.1L64.84,12.1z M57.89,9.76l-0.6,2.32l-7.55,6.67h6.06l-0.72,2.73H45.05l0.63-2.41l7.43-6.57 h-5.65l0.72-2.73H57.89L57.89,9.76z M40.96,9.99c0.46,0.29,0.82,0.72,1.02,1.23l0.07,0.19l0.44-1.66h3.37l-3.07,11.7h-3.37 l0.45-1.73c-0.51,0.6-1.14,1.08-1.85,1.41s-1.48,0.5-2.27,0.5c-0.88,0.04-1.74-0.22-2.45-0.74c-0.66-0.52-1.1-1.28-1.24-2.11 c-0.18-1.06-0.12-2.14,0.19-3.17c0.29-1.15,0.8-2.24,1.49-3.21c0.63-0.89,1.44-1.64,2.37-2.18c0.86-0.5,1.84-0.76,2.83-0.76 C39.66,9.44,40.36,9.62,40.96,9.99L40.96,9.99z M39.23,12.14c-0.41,0-0.81,0.08-1.19,0.24c-0.38,0.16-0.72,0.39-1.01,0.68 c-0.68,0.71-1.15,1.59-1.36,2.55c-0.28,1.08-0.27,1.9,0.04,2.49c0.31,0.59,0.89,0.87,1.75,0.87c0.4,0.01,0.8-0.07,1.18-0.22 c0.37-0.15,0.72-0.38,1-0.66c0.59-0.62,1.03-1.38,1.26-2.22l0.08-0.31c0.29-1.11,0.26-1.94-0.03-2.53 C40.64,12.44,40.06,12.14,39.23,12.14L39.23,12.14z M26.85,7.81h-3.21l-1.13,4.28h3.21c1.01,0,1.81-0.17,2.35-0.52 c0.57-0.37,0.98-0.95,1.13-1.63c0.2-0.72,0.11-1.27-0.27-1.62C28.55,7.99,27.86,7.81,26.85,7.81L26.85,7.81z"/>
                  <polygon className="st0" points="18.4,0 12.76,21.47 8.89,21.47 12.7,6.93 6.86,10.78 7.9,6.95 18.4,0"/>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Pattern */}
        <div className="w-[40%] relative bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
          {/* City Skyline Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute bottom-0">
              {/* Building 1 */}
              <rect x="50" y="300" width="80" height="300" fill="rgba(255,255,255,0.3)" />
              <rect x="60" y="320" width="12" height="12" fill="rgba(255,255,255,0.8)" />
              <rect x="80" y="320" width="12" height="12" fill="rgba(255,255,255,0.6)" />
              <rect x="100" y="320" width="12" height="12" fill="rgba(255,255,255,0.8)" />
              
              {/* Building 2 - Tallest (One World Trade Center style) */}
              <rect x="200" y="100" width="60" height="500" fill="rgba(255,255,255,0.4)" />
              <polygon points="200,100 230,50 260,100" fill="rgba(255,255,255,0.5)" />
              <rect x="210" y="150" width="8" height="8" fill="rgba(255,255,255,0.9)" />
              <rect x="225" y="150" width="8" height="8" fill="rgba(255,255,255,0.7)" />
              <rect x="240" y="150" width="8" height="8" fill="rgba(255,255,255,0.9)" />
              
              {/* Building 3 */}
              <rect x="300" y="200" width="90" height="400" fill="rgba(255,255,255,0.35)" />
              <rect x="315" y="220" width="10" height="10" fill="rgba(255,255,255,0.8)" />
              <rect x="335" y="220" width="10" height="10" fill="rgba(255,255,255,0.6)" />
              <rect x="355" y="220" width="10" height="10" fill="rgba(255,255,255,0.8)" />
              
              {/* Building 4 */}
              <rect x="450" y="250" width="70" height="350" fill="rgba(255,255,255,0.3)" />
              <rect x="460" y="270" width="8" height="8" fill="rgba(255,255,255,0.7)" />
              <rect x="480" y="270" width="8" height="8" fill="rgba(255,255,255,0.9)" />
              <rect x="500" y="270" width="8" height="8" fill="rgba(255,255,255,0.7)" />
              
              {/* Building 5 */}
              <rect x="550" y="180" width="85" height="420" fill="rgba(255,255,255,0.4)" />
              <rect x="565" y="200" width="12" height="12" fill="rgba(255,255,255,0.8)" />
              <rect x="585" y="200" width="12" height="12" fill="rgba(255,255,255,0.6)" />
              <rect x="605" y="200" width="12" height="12" fill="rgba(255,255,255,0.8)" />
              
              {/* Bridge-like structure */}
              <rect x="100" y="450" width="300" height="8" fill="rgba(255,255,255,0.4)" />
              <rect x="120" y="440" width="4" height="20" fill="rgba(255,255,255,0.3)" />
              <rect x="180" y="440" width="4" height="20" fill="rgba(255,255,255,0.3)" />
              <rect x="240" y="440" width="4" height="20" fill="rgba(255,255,255,0.3)" />
              <rect x="300" y="440" width="4" height="20" fill="rgba(255,255,255,0.3)" />
              <rect x="360" y="440" width="4" height="20" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="hexagon" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,0 52,15 52,37 30,52 8,37 8,15" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagon)" />
            </svg>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute top-40 right-40 w-8 h-8 bg-white/30 rounded-full blur-sm"></div>
          <div className="absolute bottom-40 right-16 w-12 h-12 bg-white/25 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
        Use arrow keys to navigate
      </div>

      {/* Next Button */}
      <div className="absolute bottom-8 right-8">
        <Button 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          NEXT
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage; 