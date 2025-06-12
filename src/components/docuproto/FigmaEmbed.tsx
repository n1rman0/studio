
"use client";

import React, { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_PROTOTYPE_URL, IOS_DOCUMENTATION } from '@/data/documentation';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady } = useAppContext();

  useEffect(() => {
    const handleFigmaMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.figma.com') {
        return;
      }
      
      console.log('Figma message received:', event.data);

      if (!event.data || typeof event.data !== 'object') {
        console.warn('Received non-object data from Figma:', event.data);
        return;
      }
      
      const messageData = event.data; // Access event.data directly

      // Check for CANVAS_READY specifically using type
      if (messageData.type === 'CANVAS_READY') {
         setIsFigmaReady(true);
         console.log("Figma canvas is ready.");
      }
      
      // Handle NODE_CLICK for interactivity
      // Ensure payload and nodeId are correctly accessed based on the actual message structure logged by console.log
      if (messageData.type === 'NODE_CLICK') { 
        const nodeId = messageData.payload?.nodeId || messageData.nodeId; // Check both common structures
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
    };
    // Dependencies: if setIsFigmaReady or setCurrentDocSectionById are guaranteed to be stable,
    // they can be omitted. isFigmaReady is included if any logic within the effect depends on its current value
    // for re-evaluation beyond just the event listener setup.
    // For simple event listener setup/teardown, often an empty array or stable setters are sufficient.
    // However, given its prior inclusion, and potential for complex interactions, keeping them for now.
  }, [setCurrentDocSectionById, setIsFigmaReady, isFigmaReady]);

  const embedSrc = `https://www.figma.com/embed?embed_host=docuproto&url=${encodeURIComponent(FIGMA_PROTOTYPE_URL)}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
      </div>
      <div className="flex-grow relative">
        {!isFigmaReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/30 backdrop-blur-sm z-10">
                 <p className="text-muted-foreground p-4 text-center bg-background/80 rounded-md shadow-md">Attempting to load Figma Prototype...<br/>Check console for 'Figma canvas is ready.' message.</p>
            </div>
        )}
        <iframe
          ref={figmaIframeRef}
          id="figma-embed-iframe"
          className={`w-full h-full border-0 transition-opacity duration-300 ${isFigmaReady ? 'opacity-100' : 'opacity-70'}`}
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
