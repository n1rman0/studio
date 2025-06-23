"use client";

import React from 'react';
import APIDocumentation from './APIDocumentation';

const APIDocumentationExample: React.FC = () => {
  const sampleEndpoints = [
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
    },
    {
      method: 'POST' as const,
      path: '/accounts/{account_id}/transactions',
      description: 'Create a new transaction for the specified account',
      requestExample: {
        "transaction_date": "2023-09-16",
        "merchant": "Target",
        "amount": 23.45,
        "transaction_type": "Purchase",
        "category": "Retail",
        "description": "Household items"
      },
      responseExample: {
        "id": "txn_1234567890",
        "transaction_date": "2023-09-16",
        "merchant": "Target",
        "amount": 23.45,
        "transaction_type": "Purchase",
        "category": "Retail",
        "description": "Household items",
        "status": "completed",
        "created_at": "2023-09-16T10:30:00Z"
      }
    },
    {
      method: 'PUT' as const,
      path: '/transactions/{transaction_id}',
      description: 'Update an existing transaction',
      requestExample: {
        "merchant": "Updated Merchant Name",
        "amount": 25.50,
        "category": "Food & Dining",
        "description": "Updated description"
      },
      responseExample: {
        "id": "txn_1234567890",
        "transaction_date": "2023-09-16",
        "merchant": "Updated Merchant Name",
        "amount": 25.50,
        "transaction_type": "Purchase",
        "category": "Food & Dining",
        "description": "Updated description",
        "status": "completed",
        "updated_at": "2023-09-16T11:00:00Z"
      }
    },
    {
      method: 'DELETE' as const,
      path: '/transactions/{transaction_id}',
      description: 'Delete a specific transaction',
      responseExample: {
        "message": "Transaction successfully deleted",
        "deleted_transaction_id": "txn_1234567890",
        "status": "success"
      }
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions API</h1>
        <p className="text-gray-600">
          Manage account transactions with our comprehensive API endpoints.
        </p>
      </div>
      
      <APIDocumentation endpoints={sampleEndpoints} />
    </div>
  );
};

export default APIDocumentationExample; 