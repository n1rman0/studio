"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import APIDocumentation from './APIDocumentation';

const DocumentationDisplay: React.FC = () => {
  const { currentDocSection, navigateToFigmaNode } = useAppContext();

  // Sample API endpoints for demonstration
  const sampleAPIEndpoints = [
    {
      method: 'GET' as const,
      path: '/accounts/9876-5432-1098-7654/transactions',
      description: 'Retrieve all transactions for a specific account',
      responseExample: {
        "transactions": [
          {
            "transaction_date": "2023-09-15",
            "merchant": "Starbucks",
            "amount": 5.75,
            "transaction_type": "Purchase"
          },
          {
            "transaction_date": "2023-09-14",
            "merchant": "McDonald's",
            "amount": 8.5,
            "transaction_type": "Purchase"
          },
          {
            "transaction_date": "2023-09-13",
            "merchant": "Amazon",
            "amount": 45.99,
            "transaction_type": "Purchase"
          }
        ]
      },
      requestExample: {
        "headers": {
          "Authorization": "Bearer your-api-token",
          "Content-Type": "application/json"
        },
        "parameters": {
          "account_id": "9876-5432-1098-7654",
          "limit": 10,
          "offset": 0,
          "start_date": "2023-09-01",
          "end_date": "2023-09-30"
        }
      }
    }
  ];

  if (!currentDocSection) {
    return (
      <Card className="w-full h-full flex items-center justify-center shadow-sm border-gray-200">
        <CardContent className="text-center">
          <p className="text-gray-500">Select a section from the navigation or click on the prototype.</p>
        </CardContent>
      </Card>
    );
  }

  // Always show API Documentation prominently
  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-gray-200 overflow-hidden">
      <CardHeader className="border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline text-xl text-gray-900">API Documentation</CardTitle>
            <CardDescription className="text-gray-600">API endpoints and examples for integration</CardDescription>
          </div>
          {currentDocSection.figmaNodeId && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToFigmaNode(currentDocSection.figmaNodeId)}
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="mr-2 h-4 w-4" />
              View in Prototype
            </Button>
          )}
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow bg-white">
        <CardContent className="pt-6">
          <APIDocumentation endpoints={sampleAPIEndpoints} />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DocumentationDisplay;
