"use client";

import type { DocSection } from '@/data/documentation';
import React, { createContext, useState, useContext, useRef, useCallback, useEffect } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';

interface AppContextType {
  currentDocSection: DocSection | null;
  setCurrentDocSectionById: (id: string | null) => void;
  navigateToFigmaNode: (nodeId: string) => void;
  figmaIframeRef: React.RefObject<HTMLIFrameElement | null>;
  interactionHistory: string[];
  addInteraction: (interaction: string) => void;
  isFigmaReady: boolean;
  setIsFigmaReady: (isReady: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDocSectionId, setCurrentDocSectionIdState] = useState<string | null>(IOS_DOCUMENTATION[0]?.id || null);
  const [interactionHistory, setInteractionHistory] = useState<string[]>([]);
  const figmaIframeRef = useRef<HTMLIFrameElement | null>(null);
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
    if (figmaIframeRef.current && figmaIframeRef.current.contentWindow && isFigmaReady) {
      figmaIframeRef.current.contentWindow.postMessage(
        { type: 'PROTOTYPE_NAVIGATE_TO_NODE', payload: { nodeId } },
        'https://www.figma.com'
      );
    } else {
      console.warn("Figma iframe not ready or not available for navigation command.");
    }
  }, [isFigmaReady]);

  return (
    <AppContext.Provider value={{ 
        currentDocSection, 
        setCurrentDocSectionById, 
        navigateToFigmaNode, 
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
