"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import objectivec from 'react-syntax-highlighter/dist/esm/languages/prism/objectivec';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';

SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('objectivec', objectivec);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('xml', markup);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);

interface CodeVariant {
  code: string;
  language: string;
  filename?: string;
  title?: string;
}

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
  copyable?: boolean;
  filename?: string;
  showHeader?: boolean;
  variants?: CodeVariant[]; // optional multi-language variants
  // Typewriter options
  typewriter?: boolean; // enable animated typing
  typewriterSpeedMsPerChar?: number; // smaller is faster
  typewriterStartDelayMs?: number; // initial delay before typing begins
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  language = 'swift', 
  showLineNumbers = true, 
  className = '',
  title,
  copyable = true,
  filename,
  showHeader = true,
  variants,
  typewriter = true,
  typewriterSpeedMsPerChar = 12,
  typewriterStartDelayMs = 250
}) => {
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const allVariants: CodeVariant[] = useMemo(() => {
    if (variants && variants.length > 0) return variants;
    return [{ code, language, filename, title }];
  }, [variants, code, language, filename, title]);

  const current = allVariants[Math.min(activeIndex, allVariants.length - 1)] ?? allVariants[0];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatLanguageLabel = (lang?: string) => {
    if (!lang) return '';
    const normalized = lang.toLowerCase();
    switch (normalized) {
      case 'objectivec':
      case 'objc':
        return 'Objective-C';
      case 'swift':
        return 'Swift';
      case 'ruby':
        return 'Ruby';
      case 'bash':
      case 'sh':
      case 'shell':
        return 'Bash';
      case 'xml':
      case 'markup':
        return 'XML';
      case 'json':
        return 'JSON';
      case 'typescript':
      case 'ts':
        return 'TypeScript';
      case 'javascript':
      case 'js':
        return 'JavaScript';
      default:
        return lang.charAt(0).toUpperCase() + lang.slice(1);
    }
  };

  const headerLabel = current.filename ? `${current.filename} • ${formatLanguageLabel(current.language)}` : formatLanguageLabel(current.language);

  const renderHeader = () => (
    <div className="flex items-center justify-between px-3 py-1 bg-slate-50 border-t border-gray-200">
      <div className="text-[10px] font-normal text-slate-600 truncate">
        {headerLabel}
      </div>
    </div>
  );

  const renderCopyButton = () => (
    copyable ? (
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-20 bg-white/85 backdrop-blur-sm border border-gray-200 rounded-md px-1.5 py-0.5 opacity-95 hover:opacity-100 transition-all duration-200 hover:bg-white/95 hover:shadow-sm hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-slate-300 group"
        onClick={copyToClipboard}
        aria-label={copied ? "Copied!" : "Copy code"}
        title={copied ? "Copied!" : "Copy to clipboard"}
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-green-600" />
            <span className="ml-1 text-[10px] font-medium text-green-700">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-gray-600 group-hover:text-gray-800" />
          </>
        )}
      </Button>
    ) : null
  );

  // --- Typewriter state and effect ---
  const [typedText, setTypedText] = useState<string>(typewriter ? '' : current.code);

  useEffect(() => {
    if (!typewriter) {
      setTypedText(current.code);
      return;
    }

    let isCancelled = false;
    let intervalId: number | null = null;
    let timeoutId: number | null = null;

    // reset and start after delay
    setTypedText('');

    timeoutId = window.setTimeout(() => {
      const full = current.code ?? '';
      if (full.length === 0) return;
      let i = 0;
      intervalId = window.setInterval(() => {
        if (isCancelled) return;
        i += 1;
        setTypedText(full.slice(0, i));
        if (i >= full.length && intervalId) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      }, Math.max(1, typewriterSpeedMsPerChar));
    }, Math.max(0, typewriterStartDelayMs));

    return () => {
      isCancelled = true;
      if (intervalId) window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [activeIndex, current.code, typewriter, typewriterSpeedMsPerChar, typewriterStartDelayMs]);

  const renderHighlighter = (value: CodeVariant, codeOverride?: string) => (
    <SyntaxHighlighter
      language={(value.language || '').toLowerCase()}
      style={oneLight}
      showLineNumbers={showLineNumbers}
      customStyle={{
        margin: 0,
        background: 'transparent',
        fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
        outline: 'none'
      }}
      codeTagProps={{
        style: {
          fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }
      }}
      lineNumberStyle={{
        fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        opacity: 0.6,
        background: 'transparent', // Make line number background transparent
      }}
      wrapLongLines
    >
      {codeOverride ?? value.code}
    </SyntaxHighlighter>
  );

  const hasMultiple = allVariants.length > 1;

  const gridBackgroundStyle = {
    backgroundImage: 'linear-gradient(rgba(200, 200, 200, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 200, 200, 0.1) 1px, transparent 1px)',
    backgroundSize: '10px 10px'
  } as React.CSSProperties;

  return (
    <div className={cn("relative my-4 w-full", className)}>
      {title && (
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
      )}
      <div className="relative w-full overflow-hidden rounded-md border-x border-b border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {showHeader && renderHeader()}

        {hasMultiple ? (
          <Tabs.Root value={String(activeIndex)} onValueChange={(v) => setActiveIndex(Number(v))}>
            <div className="flex items-center justify-between px-3 pt-2">
              <Tabs.List className="-mb-px flex flex-wrap gap-1">
                {allVariants.map((v, idx) => (
                  <Tabs.Trigger
                    key={`${v.language}-${v.filename ?? idx}`}
                    value={String(idx)}
                    className={cn(
                      "px-2.5 py-1.5 text-xs rounded-md border",
                      String(activeIndex) === String(idx)
                        ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                        : "bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                    )}
                    title={formatLanguageLabel(v.language)}
                  >
                    {formatLanguageLabel(v.language)}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>
            <div className="relative w-full overflow-x-auto code-gradient-overlay" style={gridBackgroundStyle}>
              {renderCopyButton()}
              <div className="relative z-10">
                {allVariants.map((v, idx) => (
                  <Tabs.Content key={`${v.language}-content-${idx}`} value={String(idx)} className="data-[state=inactive]:hidden">
                    {renderHighlighter(v, typewriter && idx === activeIndex ? typedText : undefined)}
                  </Tabs.Content>
                ))}
              </div>
            </div>
          </Tabs.Root>
        ) : (
          <div className="relative w-full overflow-x-auto code-gradient-overlay" style={gridBackgroundStyle}>
            {renderCopyButton()}
            <div className="relative z-10">
              {renderHighlighter(current, typewriter ? typedText : undefined)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet; 