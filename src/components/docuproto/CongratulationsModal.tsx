"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Sparkles, Trophy } from 'lucide-react';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart?: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ isOpen, onClose, onRestart }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showContent, setShowContent] = useState(false);

  console.log('🎭 CongratulationsModal render:', { isOpen, confettiCount: confetti.length, showContent });

  // Confetti colors matching the app theme
  const confettiColors = [
    '#3395FF', // Razorpay blue
    '#072654', // Razorpay dark blue
    '#6699CC', // App primary blue
    '#E08E49', // App accent orange
    '#10B981', // Success green
    '#F59E0B', // Gold
    '#8B5CF6', // Purple
    '#EF4444', // Red
  ];

  // Play celebration sound effect
  const playCelebrationSound = () => {
    // Create a simple celebratory sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a sequence of tones for a celebration sound
      const playTone = (frequency: number, startTime: number, duration: number = 0.2) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      // Play a cheerful ascending melody
      const now = audioContext.currentTime;
      playTone(523.25, now, 0.2); // C5
      playTone(659.25, now + 0.2, 0.2); // E5
      playTone(783.99, now + 0.4, 0.2); // G5
      playTone(1046.50, now + 0.6, 0.4); // C6
    } catch (error) {
      // Silently fail if Web Audio API is not supported
      console.log('Audio not supported');
    }
  };

  // Generate confetti pieces
  const generateConfetti = () => {
    try {
      const newConfetti: ConfettiPiece[] = [];
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      
      for (let i = 0; i < 150; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * screenWidth,
          y: -20,
          rotation: Math.random() * 360,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 8 + 4,
          velocity: {
            x: (Math.random() - 0.5) * 4,
            y: Math.random() * 3 + 2,
            rotation: (Math.random() - 0.5) * 8,
          },
        });
      }
      console.log('🎊 Generated confetti pieces:', newConfetti.length);
      setConfetti(newConfetti);
    } catch (error) {
      console.error('Error generating confetti:', error);
    }
  };

  // Animate confetti
  useEffect(() => {
    if (!isOpen) return;

    generateConfetti();
    setShowContent(false);
    playCelebrationSound();

    // Show content after confetti starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    const interval = setInterval(() => {
      try {
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        setConfetti(prev => 
          prev.map(piece => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + piece.velocity.rotation,
          })).filter(piece => piece.y < screenHeight + 50)
        );
      } catch (error) {
        console.error('Error animating confetti:', error);
      }
    }, 16);

    // Generate new confetti waves
    const confettiTimer = setInterval(() => {
      generateConfetti();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(confettiTimer);
      clearTimeout(contentTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Confetti Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute rounded-sm"
            style={{
              left: `${piece.x}px`,
              top: `${piece.y}px`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              transition: 'none',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div 
          className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden transition-all duration-700 transform ${
            showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white p-8 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10">
              {/* Success icon with animation */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-bounce">
                <Trophy className="w-10 h-10 text-yellow-300" />
              </div>

              <h1 className="text-4xl font-bold mb-2 animate-pulse">
                Congratulations! 🎉
              </h1>
              <p className="text-xl opacity-90">
                You've successfully completed the Razorpay integration journey!
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="p-8 text-center">
            {/* Achievement message */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Integration Complete!</span>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
                You've successfully navigated through the complete Razorpay integration process. Your app is now ready to handle payments seamlessly!
              </p>
            </div>

            {/* Achievement stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Steps Completed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-xl">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Journey Complete</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">🚀</div>
                <div className="text-sm text-gray-600">Ready to Launch</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Awesome!
              </Button>
              
              {onRestart && (
                <Button
                  onClick={() => {
                    onRestart();
                    onClose();
                  }}
                  variant="outline"
                  className="border-2 border-green-200 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200"
                >
                  Start Over
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => window.open('https://razorpay.com/docs/', '_blank')}
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                View Docs
              </Button>
            </div>
          </div>

          {/* Footer with Razorpay logo */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center border-t">
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm"
                dangerouslySetInnerHTML={{
                  __html: `<svg viewBox="0 0 122.88 26.53" class="w-full h-full">
                    <style>
                      .st0{fill:#3395FF;}
                      .st1{fill:#072654;}
                    </style>
                    <g>
                      <polygon class="st1" points="11.19,9.03 7.94,21.47 0,21.47 1.61,15.35 11.19,9.03"/>
                      <path class="st1" d="M28.09,5.08C29.95,5.09,31.26,5.5,32,6.33s0.92,2.01,0.51,3.56c-0.27,1.06-0.82,2.03-1.59,2.8 c-0.8,0.8-1.78,1.38-2.87,1.68c0.83,0.19,1.34,0.78,1.5,1.79l0.03,0.22l0.6,5.09h-3.7l-0.62-5.48c-0.01-0.18-0.06-0.36-0.15-0.52 c-0.09-0.16-0.22-0.29-0.37-0.39c-0.31-0.16-0.65-0.24-1-0.25h-0.21h-2.28l-1.74,6.63h-3.46l4.3-16.38H28.09L28.09,5.08z M122.88,9.37l-4.4,6.34l-5.19,7.52l-0.04,0.04l-1.16,1.68l-0.04,0.06L112,25.09l-1,1.44h-3.44l4.02-5.67l-1.82-11.09h3.57 l0.9,7.23l4.36-6.19l0.06-0.09l0.07-0.1l0.07-0.09l0.54-1.15H122.88L122.88,9.37z"/>
                      <polygon class="st0" points="18.4,0 12.76,21.47 8.89,21.47 12.7,6.93 6.86,10.78 7.9,6.95 18.4,0"/>
                    </g>
                  </svg>`
                }}
              />
              <div className="text-white font-semibold text-lg">
                Razorpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal; 