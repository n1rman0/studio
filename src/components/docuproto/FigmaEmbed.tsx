
"use client";

import React, { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_PROTOTYPE_URL, IOS_DOCUMENTATION } from '@/data/documentation';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady } = useAppContext();

  useEffect(() => {
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
      
      // Log all raw message data from Figma
      console.log('Figma message received (raw):', event.data); 

      // Attempt to parse and log structured messages
      let messageData = event.data;
      if (typeof event.data === 'string') {
        try {
          messageData = JSON.parse(event.data);
        } catch (e) {
          // Not JSON, proceed with string
          console.log('Figma message received (string, not JSON):', event.data);
        }
      }
      
      if (typeof messageData === 'object' && messageData !== null && messageData.type) {
        console.log(`Figma message type received: ${messageData.type}`, 'Payload:', messageData.payload || messageData);

        if (messageData.type === 'CANVAS_READY') {
           setIsFigmaReady(true);
           console.log("Figma canvas is ready. Interactions should now be fully processed.");
        }
        
        if (messageData.type === 'NODE_CLICK') { 
          const nodeId = messageData.payload?.nodeId || messageData.nodeId; 
          console.log('Figma NODE_CLICK detected. Node ID:', nodeId, 'Full payload:', messageData.payload || messageData);
          if (nodeId) {
            const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
            if (matchedSection) {
              console.log('Matched documentation section:', matchedSection.title);
              setCurrentDocSectionById(matchedSection.id);
            } else {
              console.log('No documentation section directly mapped to Figma node ID:', nodeId);
            }
          } else {
            console.warn('NODE_CLICK event received without a nodeId in payload:', messageData);
          }
        }
      } else if (typeof messageData === 'string') {
         // Already logged if not JSON, if it was JSON it's handled above
      } else {
        console.log('Figma message received (unknown/unstructured format):', messageData);
      }
    };

    window.addEventListener('message', handleFigmaMessage);

    return () => {      
      window.removeEventListener('message', handleFigmaMessage);
      clearTimeout(timer);
    };
  }, [setIsFigmaReady, setCurrentDocSectionById]); 

  const embedSrc = `https://www.figma.com/embed?embed_host=docuproto&url=${encodeURIComponent(FIGMA_PROTOTYPE_URL)}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
        <p className="text-xs text-muted-foreground">
          {isFigmaReady ? "Figma API Ready." : "Attempting to initialize Figma API..."}
        </p>
      </div>
      <div className="flex-grow relative">
        {/* Overlay removed for direct interaction debugging */}
        <iframe
          ref={figmaIframeRef} 
          id="figma-embed-iframe"
          className="w-full h-full border-0 opacity-100" // Always fully opaque
          src={embedSrc}
          allowFullScreen
          title="Figma Prototype"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms" // Standard sandbox attributes
        ></iframe>
      </div>
    </div>
  );
};

export default FigmaEmbed;
