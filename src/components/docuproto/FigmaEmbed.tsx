
"use client";

import React, { useEffect, useRef } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_PROTOTYPE_URL, IOS_DOCUMENTATION } from '@/data/documentation';
import { Skeleton } from '@/components/ui/skeleton';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady } = useAppContext();
  const localIframeRef = useRef<HTMLIFrameElement | null>(null);

  // Assign local ref to context ref
  useEffect(() => {
    if (localIframeRef.current && figmaIframeRef) {
      (figmaIframeRef as React.MutableRefObject<HTMLIFrameElement | null>).current = localIframeRef.current;
    }
  }, [figmaIframeRef]);


  useEffect(() => {
    const handleFigmaMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.figma.com' || !event.data) {
        return;
      }
      
      const { type, payload, event: eventName } = event.data;

      if (eventName === 'CANVAS_READY' || type === 'CANVAS_READY') {
         setIsFigmaReady(true);
         console.log("Figma canvas is ready.");
      }
      
      if (type === 'NODE_CLICK' || eventName === 'NODE_CLICK') { 
        const nodeId = payload?.nodeId || event.data.nodeId; 
        if (nodeId) {
          console.log('Figma node clicked:', nodeId);
          const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
          if (matchedSection) {
            setCurrentDocSectionById(matchedSection.id);
          } else {
            console.log('No documentation section directly mapped to Figma node ID:', nodeId);
          }
        }
      }
    };

    window.addEventListener('message', handleFigmaMessage);

    return () => {
      window.removeEventListener('message', handleFigmaMessage);
    };
  }, [setCurrentDocSectionById, setIsFigmaReady]);

  const embedSrc = `https://www.figma.com/embed?embed_host=docuproto&url=${encodeURIComponent(FIGMA_PROTOTYPE_URL)}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
      </div>
      <div className="flex-grow relative"> {/* Container for iframe and loader */}
        {!isFigmaReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10"> {/* Loader covers this div */}
            <div className="text-center p-4">
              <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20" />
              <p className="text-muted-foreground">Loading Figma Prototype...</p>
            </div>
          </div>
        )}
        
        <iframe
          ref={localIframeRef}
          id="figma-embed-iframe"
          className={`w-full h-full border-0 transition-opacity duration-300 ${isFigmaReady ? 'opacity-100' : 'opacity-0'}`}
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
