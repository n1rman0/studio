"use client";

import type { DocSection } from '@/data/documentation';
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { IOS_DOCUMENTATION } from '@/data/documentation';

interface AppContextType {
  currentDocSection: DocSection | null;
  setCurrentDocSectionById: (id: string | null) => void;
  navigateForward: () => void;
  navigateBackward: () => void;
  restartPrototype: () => void;
  interactionHistory: string[];
  addInteraction: (interaction: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDocSectionId, setCurrentDocSectionIdState] = useState<string | null>(IOS_DOCUMENTATION[0]?.id || null);
  const [interactionHistory, setInteractionHistory] = useState<string[]>([]);

  const currentDocSection = IOS_DOCUMENTATION.find(section => section.id === currentDocSectionId) || null;

  const addInteraction = useCallback((interaction: string) => {
    setInteractionHistory(prev => [...prev, interaction].slice(-5));
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

  const navigateForward = useCallback(() => {
    if (!currentDocSectionId) return;
    const idx = IOS_DOCUMENTATION.findIndex(s => s.id === currentDocSectionId);
    if (idx >= 0 && idx < IOS_DOCUMENTATION.length - 1) {
      setCurrentDocSectionById(IOS_DOCUMENTATION[idx + 1].id);
      addInteraction('Navigated forward');
    }
  }, [currentDocSectionId, setCurrentDocSectionById, addInteraction]);

  const navigateBackward = useCallback(() => {
    if (!currentDocSectionId) return;
    const idx = IOS_DOCUMENTATION.findIndex(s => s.id === currentDocSectionId);
    if (idx > 0) {
      setCurrentDocSectionById(IOS_DOCUMENTATION[idx - 1].id);
      addInteraction('Navigated backward');
    }
  }, [currentDocSectionId, setCurrentDocSectionById, addInteraction]);

  const restartPrototype = useCallback(() => {
    if (IOS_DOCUMENTATION[0]) {
      setCurrentDocSectionById(IOS_DOCUMENTATION[0].id);
      addInteraction('Restarted walkthrough');
    }
  }, [setCurrentDocSectionById, addInteraction]);

  return (
    <AppContext.Provider value={{ 
        currentDocSection, 
        setCurrentDocSectionById, 
        navigateForward,
        navigateBackward,
        restartPrototype,
        interactionHistory,
        addInteraction
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
