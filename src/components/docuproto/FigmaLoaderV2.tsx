"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_FILE_KEY, FIGMA_CLIENT_ID, IOS_DOCUMENTATION } from '@/data/documentation';
import DeviceWrapper from './DeviceWrapper';

const FigmaLoaderV2: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, addInteraction, isFigmaReady } = useAppContext();
  const [isPreloading, setIsPreloading] = useState(true);
  const [showMainInterface, setShowMainInterface] = useState(false);

  const handleFigmaMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== "https://www.figma.com") return;

    const { data } = event;
    if (!data || typeof data !== 'object') return;

    console.log("Figma V2 message received:", data);

    try {
      switch (data.type) {
        case "INITIAL_LOAD":
          console.log("✅ Figma loaded and ready - transitioning to main interface");
          setIsFigmaReady(true);
          setIsPreloading(false);
          addInteraction("Prototype loaded and ready");
          
          // Small delay to ensure smooth transition
          setTimeout(() => {
            setShowMainInterface(true);
          }, 100);
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
  }, [setCurrentDocSectionById, setIsFigmaReady, addInteraction]);

  useEffect(() => {
    window.addEventListener('message', handleFigmaMessage);
    return () => {
      window.removeEventListener('message', handleFigmaMessage);
    };
  }, [handleFigmaMessage]);

  const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}?embed-host=docuproto&client-id=${FIGMA_CLIENT_ID}&footer=false&hotspot-hints=false&theme=light&viewport-controls=false&disable-default-keyboard-nav=true&page-selector=false&hide-ui=true&scaling=fit`;

  return (
    <div
      className="w-full h-full pb-12 relative"
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        backgroundColor: '#f9fafb'
      }}
    >
      <DeviceWrapper>
        {/* Preloading State - Hidden but iframe is actively loading */}
        {isPreloading && (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 absolute inset-0 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading Figma Prototype...</p>
              <p className="text-gray-400 text-sm mt-1">Preparing interactive experience</p>
            </div>
          </div>
        )}

        {/* Single iframe - starts loading immediately, then becomes visible */}
        <iframe
          ref={figmaIframeRef}
          id="embed-frame"
          className="w-full h-full border-0 bg-transparent"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            opacity: showMainInterface ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            overflow: 'hidden',
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }}
          src={embedSrc}
          title="Figma Prototype - V2 Single Instance"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          allow="clipboard-read; clipboard-write"
        />
      </DeviceWrapper>
    </div>
  );
};

export default FigmaLoaderV2; 