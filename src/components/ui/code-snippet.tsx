"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
  copyable?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  language = 'swift', 
  showLineNumbers = true, 
  className = '',
  title,
  copyable = true
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Basic syntax highlighting for Swift/iOS code
  const highlightCode = (codeString: string) => {
    return codeString
      // Comments first (to avoid highlighting inside comments)
      .replace(/\/\/.*$/gm, '<span class="code-comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="code-comment">$&</span>')
      // String literals (avoid highlighting inside already highlighted content)
      .replace(/"([^"\\]|\\.)*"(?![^<]*>)/g, '<span class="code-string">$&</span>')
      // Swift keywords
      .replace(/\b(import|class|func|let|var|if|else|for|while|return|private|public|override|init|struct|enum|extension|protocol|self|super|weak|strong|lazy|static|final|case|switch|break|continue|guard|defer|throws|try|catch)(?![^<]*>)\b/g, '<span class="code-keyword">$1</span>')
      // Numbers
      .replace(/\b\d+\.?\d*(?![^<]*>)\b/g, '<span class="code-number">$&</span>')
      // Types and classes (capitalized words, avoid already highlighted)
      .replace(/\b[A-Z][a-zA-Z0-9]*(?![^<]*>)\b/g, '<span class="code-type">$&</span>');
  };

  const renderCodeWithLineNumbers = () => {
    const lines = code.split('\n');
    const highlightedCode = highlightCode(code);
    const highlightedLines = highlightedCode.split('\n');
    
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative my-4 w-full", className)}>
      {title && (
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
      )}
      <div className="relative w-full overflow-hidden">
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-md p-1.5 sm:p-2 opacity-70 hover:opacity-100 transition-all duration-200 hover:bg-white/95 hover:shadow-sm hover:scale-105"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3 text-gray-500" />
            )}
          </Button>
        )}
        <div className="w-full overflow-x-auto">
          {renderCodeWithLineNumbers()}
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet; 