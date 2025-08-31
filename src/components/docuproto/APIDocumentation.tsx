"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { JSONTypewriterEffect } from '@/components/ui/json-typewriter-effect';
import { CartTypewriter } from '@/components/ui/cart-typewriter';

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  requestExample?: object;
  responseExample: object;
}

export interface APIDocumentationProps {
  endpoints: APIEndpoint[];
}

const APIDocumentation: React.FC<APIDocumentationProps> = ({ endpoints }) => {
  // Initialize collapsed state - expand Create Order (/v1/orders) by default
  const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {};
    endpoints.forEach((endpoint, index) => {
      // Keep Create Order expanded; collapse others
      const isCreateOrderEndpoint = endpoint.method === 'POST' && endpoint.path.includes('/v1/orders');
      initialState[index] = !isCreateOrderEndpoint;
    });
    return initialState;
  });
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const toggleSection = (index: number) => {
    setCollapsedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'POST':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'PUT':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'DELETE':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'PATCH':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

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

  const renderJSONWithLineNumbers = (jsonString: string) => {
    const lines = jsonString.split('\n');
    const highlightedJSON = highlightJSON(jsonString);
    const highlightedLines = highlightedJSON.split('\n');
    
    return (
      <div className="api-code-block">
        <div className="flex">
          <div className="api-line-numbers">
            {lines.map((_, index) => (
              <div key={index}>
                {index + 1}
              </div>
            ))}
          </div>
          <div className="api-json-content">
            <div dangerouslySetInnerHTML={{ __html: highlightedLines.join('\n') }} />
          </div>
        </div>
      </div>
    );
  };

  const isCreateOrder = (endpoint: APIEndpoint) => endpoint.method === 'POST' && endpoint.path.includes('/v1/orders');

  return (
    <div className="space-y-6">
      {endpoints.map((endpoint, index) => {
        const isCollapsed = collapsedSections[index];
        const responseKey = `response-${index}`;
        const requestKey = `request-${index}`;

        return (
          <Card key={index} className="api-endpoint-card">
            <CardHeader className="api-endpoint-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge 
                    className={`api-method-badge ${getMethodColor(endpoint.method)}`}
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm font-mono text-gray-700 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                    {endpoint.path}
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection(index)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-xs font-medium">
                    {isCollapsed ? 'Expand' : 'Collapse'}
                  </span>
                </Button>
              </div>
              {endpoint.description && (
                <p className="text-sm text-gray-600 mt-3 font-medium leading-relaxed">{endpoint.description}</p>
              )}
            </CardHeader>

            {!isCollapsed && (
              <CardContent className="pt-6 pb-6">
                <Tabs defaultValue="request" className="w-full">
                  <TabsList className="api-tabs-list">
                    <TabsTrigger 
                      value="request" 
                      disabled={!endpoint.requestExample}
                      className="api-tab-trigger"
                    >
                      Request
                    </TabsTrigger>
                    <TabsTrigger 
                      value="response"
                      className="api-tab-trigger"
                    >
                      Response
                    </TabsTrigger>
                  </TabsList>

                  {endpoint.requestExample && (
                    <TabsContent value="request" className="mt-4">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="api-copy-button"
                          onClick={() => copyToClipboard(formatJSON(endpoint.requestExample!), requestKey)}
                        >
                          {copiedStates[requestKey] ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                        {isCreateOrder(endpoint) ? (
                          <CartTypewriter json={endpoint.requestExample!} />
                        ) : endpoint.path === '/cart' ? (
                          <JSONTypewriterEffect 
                            jsonObject={endpoint.requestExample} 
                            speed={25}
                            showLineNumbers={true}
                          />
                        ) : (
                          renderJSONWithLineNumbers(formatJSON(endpoint.requestExample))
                        )}
                      </div>
                    </TabsContent>
                  )}

                  <TabsContent value="response" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="api-copy-button"
                        onClick={() => copyToClipboard(formatJSON(endpoint.responseExample), responseKey)}
                      >
                        {copiedStates[responseKey] ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                      {isCreateOrder(endpoint) ? (
                        <CartTypewriter json={endpoint.responseExample} />
                      ) : (
                        renderJSONWithLineNumbers(formatJSON(endpoint.responseExample))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default APIDocumentation; 