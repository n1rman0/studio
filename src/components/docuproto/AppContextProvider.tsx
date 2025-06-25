"use client";

import type { DocSection } from '@/data/documentation';
import React, { createContext, useState, useContext, useRef, useCallback, useEffect } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';

interface AppContextType {
  currentDocSection: DocSection | null;
  setCurrentDocSectionById: (id: string | null) => void;
  navigateToFigmaNode: (nodeId: string) => void;
  navigateForward: () => void;
  navigateBackward: () => void;
  restartPrototype: () => void;
  figmaIframeRef: React.RefObject<HTMLIFrameElement>;
  interactionHistory: string[];
  addInteraction: (interaction: string) => void;
  isFigmaReady: boolean;
  setIsFigmaReady: (isReady: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDocSectionId, setCurrentDocSectionIdState] = useState<string | null>(IOS_DOCUMENTATION[0]?.id || null);
  const [interactionHistory, setInteractionHistory] = useState<string[]>([]);
  const figmaIframeRef = useRef<HTMLIFrameElement>(null);
  const [isFigmaReady, setIsFigmaReady] = useState(false);

  const currentDocSection = IOS_DOCUMENTATION.find(section => section.id === currentDocSectionId) || null;

  const addInteraction = useCallback((interaction: string) => {
    setInteractionHistory(prev => [...prev, interaction].slice(-5)); // Keep last 5 interactions
  }, []);
  
  const setCurrentDocSectionById = useCallback((id: string | null) => {
    setCurrentDocSectionIdState(id);
    const section = IOS_DOCUMENTATION.find(s => s.id === id);
    if (section) {
      addInteraction(`Viewed: ${section.title}`);
    }
  }, [addInteraction]);

  useEffect(() => {
    if(IOS_DOCUMENTATION.length > 0 && !currentDocSectionId) {
      setCurrentDocSectionById(IOS_DOCUMENTATION[0].id);
    }
  }, [currentDocSectionId, setCurrentDocSectionById]);


  const navigateToFigmaNode = useCallback((nodeId: string) => {
    console.log("Navigating to Figma node:", nodeId);
    console.log("Figma iframe ref:", figmaIframeRef.current);
    console.log("Figma iframe content window:", figmaIframeRef.current?.contentWindow);
    console.log("Is Figma ready:", isFigmaReady);
    if (figmaIframeRef.current && figmaIframeRef.current.contentWindow && isFigmaReady) {
      figmaIframeRef.current.contentWindow.postMessage(
        {
          type: 'NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS',
          data: { nodeId }
        },
        'https://www.figma.com'
      );
    } else {
      console.warn("Figma iframe not ready or not available for navigation command.");
    }
  }, [isFigmaReady]);

  const navigateForward = useCallback(() => {
    console.log('Navigating forward');
    if (figmaIframeRef.current && figmaIframeRef.current.contentWindow && isFigmaReady) {
      figmaIframeRef.current.contentWindow.postMessage(
        { type: 'NAVIGATE_FORWARD' },
        'https://www.figma.com'
      );
      addInteraction('Navigated forward in prototype');
    } else {
      console.warn("Figma iframe not ready for forward navigation.");
    }
  }, [isFigmaReady, addInteraction]);

  const navigateBackward = useCallback(() => {
    console.log('Navigating backward');
    if (figmaIframeRef.current && figmaIframeRef.current.contentWindow && isFigmaReady) {
      figmaIframeRef.current.contentWindow.postMessage(
        { type: 'NAVIGATE_BACKWARD' },
        'https://www.figma.com'
      );
      addInteraction('Navigated backward in prototype');
    } else {
      console.warn("Figma iframe not ready for backward navigation.");
    }
  }, [isFigmaReady, addInteraction]);

  const restartPrototype = useCallback(() => {
    if (figmaIframeRef.current && figmaIframeRef.current.contentWindow && isFigmaReady) {
      figmaIframeRef.current.contentWindow.postMessage(
        { type: 'RESTART' },
        'https://www.figma.com'
      );
      addInteraction('Restarted prototype');
    } else {
      console.warn("Figma iframe not ready for restart.");
    }
  }, [isFigmaReady, addInteraction]);

  return (
    <AppContext.Provider value={{ 
        currentDocSection, 
        setCurrentDocSectionById, 
        navigateToFigmaNode,
        navigateForward,
        navigateBackward,
        restartPrototype,
        figmaIframeRef,
        interactionHistory,
        addInteraction,
        isFigmaReady,
        setIsFigmaReady
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
