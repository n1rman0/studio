"use client";

import React, { useEffect, useCallback } from 'react';
import { useAppContext } from './AppContextProvider';
import { FIGMA_FILE_KEY, FIGMA_CLIENT_ID, IOS_DOCUMENTATION } from '@/data/documentation';
import DeviceWrapper from './DeviceWrapper';

const FigmaEmbed: React.FC = () => {
  const { setCurrentDocSectionById, figmaIframeRef, setIsFigmaReady, addInteraction } = useAppContext();

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
  const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}?embed-host=docuproto&client-id=${FIGMA_CLIENT_ID}&footer=false&hotspot-hints=false&theme=light&viewport-controls=false&disable-default-keyboard-nav=false&page-selector=false&hide-ui=true&scaling=fit`;

  return (
    <div className="w-full h-full pb-12">
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
    </div>
  );
};

export default FigmaEmbed;
