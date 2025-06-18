"use client";

import React, { useEffect, useCallback } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_FILE_KEY, FIGMA_CLIENT_ID, IOS_DOCUMENTATION } from '@/data/documentation';
import DeviceWrapper from './DeviceWrapper';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, isFigmaReady, addInteraction, navigateBackward, restartPrototype, navigateForward } = useAppContext();
  const [debugMode, setDebugMode] = React.useState(false);

  const handleFigmaMessage = useCallback((event: MessageEvent) => {
    // Validate origin for security
    if (event.origin !== "https://www.figma.com") return;

    const { data } = event;
    if (!data || typeof data !== 'object') return;

    console.log("Figma Embed Kit 2.0 message received:", data);

    try {
      switch (data.type) {
        case "INITIAL_LOAD":
          setIsFigmaReady(true);
          addInteraction("Prototype loaded successfully");
          console.log("Figma Embed Kit 2.0: Prototype ready");
          break;
          
        case "PRESENTED_NODE_CHANGED":
          const nodeId = data.data?.presentedNodeId;
          if (nodeId) {
            addInteraction(`Navigated to node: ${nodeId}`);
            const matchedSection = IOS_DOCUMENTATION.find(section => section.figmaNodeId === nodeId);
            if (matchedSection) {
              console.log('Matched documentation section:', matchedSection.title);
              setCurrentDocSectionById(matchedSection.id);
            } else {
              console.log('No documentation section mapped to Figma node ID:', nodeId);
            }
          }
          break;
          
        case "MOUSE_PRESS_OR_RELEASE":
          const targetNodeId = data.data?.targetNodeId;
          const isHandledClick = data.data?.handled;
          if (targetNodeId) {
            addInteraction(`${isHandledClick ? 'Hotspot' : 'Canvas'} interaction: ${targetNodeId}`);
          }
          break;
          
        case "NEW_STATE":
          const componentNodeId = data.data?.nodeId;
          const newVariantId = data.data?.newVariantId;
          addInteraction(`Component state changed: ${componentNodeId} → ${newVariantId}`);
          console.log("Component state changed:", data.data);
          break;

        case "REQUEST_CLOSE":
          addInteraction("User requested to close prototype (Spacebar)");
          console.log("User requested to close the prototype");
          break;

        case "LOGIN_SCREEN_SHOWN":
          addInteraction("Login screen displayed");
          console.log("Login screen shown - user needs to authenticate");
          break;

        case "PASSWORD_SCREEN_SHOWN":
          addInteraction("Password prompt displayed");
          console.log("Password screen shown - file is password protected");
          break;
          
        default:
          console.log("Unhandled Figma message type:", data.type);
          break;
      }
    } catch (error) {
      console.error("Error handling Figma message:", error);
    }
  }, [setIsFigmaReady, setCurrentDocSectionById, addInteraction]);

  useEffect(() => {
    window.addEventListener('message', handleFigmaMessage);

    return () => {
      window.removeEventListener('message', handleFigmaMessage);
    };
  }, [handleFigmaMessage]);

  // Embed Kit 2.0 URL - Enhanced with official parameters for better UX
  // Based on official documentation: https://www.figma.com/developers/embed
  const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}?embed-host=docuproto&client-id=${FIGMA_CLIENT_ID}&footer=false&hotspot-hints=false&theme=light&viewport-controls=false&disable-default-keyboard-nav=false&page-selector=false&hide-ui=true&scaling=fill`;

  return (
    <div className="w-full h-full flex flex-col bg-muted/50 rounded-lg shadow-inner overflow-hidden">
      <div className="p-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-lg text-foreground">Interactive Prototype</h2>
            <p className="text-xs text-muted-foreground">
              {isFigmaReady ? "Figma Embed Kit 2.0 Ready" : "Loading Embed Kit 2.0..."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDebugMode(!debugMode)}
              className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded transition-colors"
              title="Toggle device wrapper"
            >
              {debugMode ? "Device" : "Debug"}
            </button>
            {isFigmaReady && (
              <>
                <button
                  onClick={navigateBackward}
                  className="px-2 py-1 text-xs bg-accent hover:bg-accent/80 text-accent-foreground rounded transition-colors"
                  title="Previous frame"
                >
                  ←
                </button>
                <button
                  onClick={restartPrototype}
                  className="px-2 py-1 text-xs bg-accent hover:bg-accent/80 text-accent-foreground rounded transition-colors"
                  title="Restart prototype"
                >
                  ↻
                </button>
                <button
                  onClick={navigateForward}
                  className="px-2 py-1 text-xs bg-accent hover:bg-accent/80 text-accent-foreground rounded transition-colors"
                  title="Next frame"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow relative">
        {debugMode ? (
          <iframe
            ref={figmaIframeRef}
            id="embed-frame"
            className="w-full h-full border-0 bg-transparent"
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none',
              background: 'transparent',
              display: 'block',
              overflow: 'hidden',
              transform: 'scale(1)',
              transformOrigin: 'top left'
            }}
            src={embedSrc}
            title="Figma Prototype - Embed Kit 2.0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
            allow="clipboard-read; clipboard-write"
            loading="lazy"
          ></iframe>
        ) : (
          <DeviceWrapper>
            <iframe
              ref={figmaIframeRef}
              id="embed-frame"
              className="w-full h-full border-0 bg-transparent"
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                background: 'transparent',
                display: 'block',
                overflow: 'hidden',
                transform: 'scale(1)',
                transformOrigin: 'top left'
              }}
              src={embedSrc}
              title="Figma Prototype - Embed Kit 2.0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
              allow="clipboard-read; clipboard-write"
              loading="lazy"
            ></iframe>
          </DeviceWrapper>
        )}
      </div>
    </div>
  );
};

export default FigmaEmbed;
