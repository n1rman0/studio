"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface JSONTypewriterEffectProps {
  jsonObject: object;
  className?: string;
  speed?: number; // milliseconds per character
  showLineNumbers?: boolean;
}

export const JSONTypewriterEffect: React.FC<JSONTypewriterEffectProps> = ({
  jsonObject,
  className,
  speed = 30,
  showLineNumbers = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Format JSON with proper indentation
  const formatJSON = (obj: object) => {
    return JSON.stringify(obj, null, 2);
  };

  // Basic JSON syntax highlighting
  const highlightJSON = (jsonString: string) => {
    return jsonString
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/: (null)/g, ': <span class="json-null">$1</span>');
  };

  useEffect(() => {
    const fullText = formatJSON(jsonObject);
    let currentIndex = 0;

    if (fullText.length === 0) {
      setIsComplete(true);
      return;
    }

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [jsonObject, speed]);

  const renderJSONWithLineNumbers = () => {
    const lines = displayedText.split('\n');
    const highlightedJSON = highlightJSON(displayedText);
    const highlightedLines = highlightedJSON.split('\n');
    
    return (
      <div className="api-code-block">
        <div className="flex">
          {showLineNumbers && (
            <div className="api-line-numbers">
              {lines.map((_, index) => (
                <div key={index}>
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          <div className="api-json-content">
            <div dangerouslySetInnerHTML={{ __html: highlightedLines.join('\n') }} />
            {!isComplete && (
              <span className="inline-block w-[2px] h-4 bg-blue-500 animate-pulse ml-[1px]" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {renderJSONWithLineNumbers()}
    </div>
  );
}; 