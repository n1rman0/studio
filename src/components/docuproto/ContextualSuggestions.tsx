"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContextProvider';
import { suggestDocumentationSnippets } from '@/ai/flows/suggest-documentation-snippets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const ContextualSuggestions: React.FC = () => {
  const { currentDocSection, interactionHistory } = useAppContext();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentDocSection) {
      const fetchSuggestions = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await suggestDocumentationSnippets({
            currentSection: currentDocSection.title,
            userQuery: currentDocSection.relatedSuggestionsQuery || currentDocSection.title,
            interactionHistory: interactionHistory,
          });
          setSuggestions(result.suggestedSnippets);
        } catch (e) {
          console.error("Failed to fetch suggestions:", e);
          setError("Could not load suggestions at this time.");
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuggestions();
    }
  }, [currentDocSection, interactionHistory]);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-lg text-accent">Related Snippets</CardTitle>
        </div>
        <CardDescription className="text-xs">AI-powered suggestions based on your current context.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-2"> {/* Max height and scroll */}
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!isLoading && !error && suggestions.length === 0 && (
            <p className="text-sm text-muted-foreground">No suggestions available for this section.</p>
          )}
          {!isLoading && !error && suggestions.length > 0 && (
            <ul className="space-y-3 text-sm">
              {suggestions.map((snippet, index) => (
                <li key={index} className="p-2 border-l-2 border-accent bg-accent/10 rounded-r-md">
                  {snippet}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ContextualSuggestions;
