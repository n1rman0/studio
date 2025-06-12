
"use client";

import React, { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_PROTOTYPE_URL, IOS_DOCUMENTATION } from '@/data/documentation';
// Removed Skeleton import as loader is temporarily disabled for debugging

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady } = useAppContext();

  useEffect(() => {
    const handleFigmaMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.figma.com') {
        return;
      }
      
      // Log all data received from figma.com for debugging
      console.log('Figma message received:', event.data);

      if (!event.data || typeof event.data !== 'object') {
        console.warn('Received non-object data from Figma:', event.data);
        return;
      }
      
      const { type, payload, eventName } = event.data; // eventName for older API versions

      if (eventName === 'CANVAS_READY' || type === 'CANVAS_READY') {
         setIsFigmaReady(true);
         console.log("Figma canvas is ready.");
      }
      
      // Handle NODE_CLICK for interactivity
      if (type === 'NODE_CLICK' || eventName === 'NODE_CLICK') { 
        const nodeId = payload?.nodeId || event.data.nodeId; 
        if (nodeId) {
          console.log('Figma node clicked:', nodeId);
          const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
          if (matchedSection) {
            setCurrentDocSectionById(matchedSection.id);
          } else {
            console.log('No documentation section directly mapped to Figma node ID:', nodeId);
            // Optionally, you could still call setCurrentDocSectionById(null) or a default
          }
        }
      }
    };

    window.addEventListener('message', handleFigmaMessage);

    // Attempt to set Figma ready after a short delay if CANVAS_READY hasn't fired
    // This is a fallback for debugging, might indicate CANVAS_READY is not being received
    const readyTimeout = setTimeout(() => {
      if (!isFigmaReady) {
        console.warn("Figma CANVAS_READY event not received after 5 seconds. Forcing ready state for debugging.");
        // setIsFigmaReady(true); // Temporarily commented out to rely solely on CANVAS_READY
      }
    }, 5000);

    return () => {
      window.removeEventListener('message', handleFigmaMessage);
      clearTimeout(readyTimeout);
    };
  }, [setCurrentDocSectionById, setIsFigmaReady, isFigmaReady]); // Added isFigmaReady to dependencies for the timeout logic

  const embedSrc = `https://www.figma.com/embed?embed_host=docuproto&url=${encodeURIComponent(FIGMA_PROTOTYPE_URL)}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
      </div>
      <div className="flex-grow relative">
        {/* Loader and opacity transitions are temporarily removed for debugging */}
        {/* If isFigmaReady remains false, you might see a blank area or a non-interactive figma UI */}
        {!isFigmaReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
                 <p className="text-muted-foreground p-4 text-center">Attempting to load Figma Prototype...<br/>Check console for messages from Figma.</p>
            </div>
        )}
        <iframe
          ref={figmaIframeRef}
          id="figma-embed-iframe"
          className={`w-full h-full border-0 ${isFigmaReady ? 'opacity-100' : 'opacity-50'}`} // Keep iframe in layout, slightly visible if not ready
          src={embedSrc}
          allowFullScreen
          title="Figma Prototype"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        ></iframe>
      </div>
    </div>
  );
};

export default FigmaEmbed;
