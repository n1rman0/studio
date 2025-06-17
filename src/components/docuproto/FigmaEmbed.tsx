"use client";

import React, { useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_FILE_KEY, FIGMA_CLIENT_ID, IOS_DOCUMENTATION } from '@/data/documentation';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady, addInteraction } = useAppContext();

  useEffect(() => {
    const figmaOrigin = "https://www.figma.com";

    const handleFigmaMessage = (event: MessageEvent) => {
      if (event.origin !== figmaOrigin) return;

      const { data } = event;
      if (!data) return;

      console.log("Figma message received:", data);

      switch (data.type) {
        case "INITIAL_LOAD":
          setIsFigmaReady(true);
          addInteraction("Prototype is ready");
          break;
        case "PRESENTED_NODE_CHANGED":
          const nodeId = data.data.presentedNodeId;
          if (nodeId) {
            addInteraction(`Navigated to node: ${nodeId}`);
            const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
            if (matchedSection) {
              console.log('Matched documentation section:', matchedSection.title);
              setCurrentDocSectionById(matchedSection.id);
            } else {
              console.log('No documentation section directly mapped to Figma node ID:', nodeId);
            }
          }
          break;
        case "MOUSE_PRESS_OR_RELEASE":
          addInteraction(`Mouse press/release on node: ${data.data.targetNodeId}`);
          break;
        case "NEW_STATE":
          addInteraction(`Component state changed`);
          console.log("Component state changed:", data.data);
          break;
        default:
          // You can handle other event types here if needed
          break;
      }
    };

    window.addEventListener('message', handleFigmaMessage);

    return () => {
      window.removeEventListener('message', handleFigmaMessage);
    };
  }, [setIsFigmaReady, setCurrentDocSectionById, addInteraction]);

  // Using the new embed.figma.com URL structure
  const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}?embed-host=docuproto&client-id=${FIGMA_CLIENT_ID}`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
        <p className="text-xs text-muted-foreground">
          {isFigmaReady ? "Figma API Ready." : "Initializing Figma API..."}
        </p>
      </div>
      <div className="flex-grow relative">
        <iframe
          ref={figmaIframeRef}
          id="embed-frame"
          className="w-full h-full border-0"
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
