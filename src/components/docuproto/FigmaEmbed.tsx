
"use client";

import React, { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_PROTOTYPE_URL, IOS_DOCUMENTATION } from '@/data/documentation';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady } = useAppContext();

  useEffect(() => {
    // Diagnostic: Check if Figma API script loaded
    const timer = setTimeout(() => {
      if (typeof (window as any).figma === 'undefined') {
        console.warn("Figma Embed API (window.figma) not detected after 3 seconds. This could be why CANVAS_READY isn't firing. Ensure the script from https://www.figma.com/embed_api/1.0.0 is loading correctly (check Network tab and console for errors related to this script).");
      } else {
        console.log("Figma Embed API (window.figma) IS DETECTED.");
      }
    }, 3000);

    const handleFigmaMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.figma.com') {
        return;
      }
      
      const messageData = event.data; 
      console.log('Figma message received (raw):', messageData); 

      if (typeof messageData === 'object' && messageData !== null && messageData.type) {
        console.log(`Figma message type received: ${messageData.type}`);
      } else if (typeof messageData === 'string') {
        console.log('Figma message received (string):', messageData);
      } else {
        console.log('Figma message received (unknown format):', messageData);
      }

      // Explicitly check for CANVAS_READY as per Figma Embed API
      if (typeof messageData === 'object' && messageData !== null && messageData.type === 'CANVAS_READY') {
         setIsFigmaReady(true);
         console.log("Figma canvas is ready. Overlay should disappear now.");
      }
      
      // Handle NODE_CLICK for interactivity
      if (typeof messageData === 'object' && messageData !== null && messageData.type === 'NODE_CLICK') { 
        const nodeId = messageData.payload?.nodeId || messageData.nodeId; 
        if (nodeId) {
          console.log('Figma node clicked:', nodeId);
          const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
          if (matchedSection) {
            setCurrentDocSectionById(matchedSection.id);
          } else {
            console.log('No documentation section directly mapped to Figma node ID:', nodeId);
          }
        } else {
          console.warn('NODE_CLICK event received without a nodeId in payload:', messageData);
        }
      }
    };

    window.addEventListener('message', handleFigmaMessage);

    return () => {      
      window.removeEventListener('message', handleFigmaMessage);
      clearTimeout(timer);
    };
    // Stable dependencies: setIsFigmaReady is a state setter, setCurrentDocSectionById is memoized in context.
  }, [setIsFigmaReady, setCurrentDocSectionById]); 

  const embedSrc = `https://www.figma.com/embed?embed_host=docuproto&url=${encodeURIComponent(FIGMA_PROTOTYPE_URL)}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
      </div>
      <div className="flex-grow relative">
        {!isFigmaReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/10 backdrop-blur-xs z-10 pointer-events-none">
                 <p className="text-muted-foreground p-4 text-center bg-background/80 rounded-md shadow-md">Attempting to load Figma Prototype...<br/>Check console for messages from Figma.</p>
            </div>
        )}
        <iframe
          ref={figmaIframeRef} 
          id="figma-embed-iframe"
          className={`w-full h-full border-0 opacity-100`} // Always fully opaque for debugging visibility
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
