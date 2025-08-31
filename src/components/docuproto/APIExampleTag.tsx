"use client";

import React from 'react';
import APIExample from './ShoppingCartAPIExample';
import type { APIEndpoint } from './APIDocumentation';

const DEFAULT_HTTP_ENDPOINTS: APIEndpoint[] = [
  {
    method: 'POST',
    path: '/v1/orders',
    description: 'Create an order (server-side) and return order_id to the app',
    requestExample: {
      amount: 100,
      currency: 'INR',
      receipt: 'rcpt_11',
      notes: { source: 'ios' },
    },
    responseExample: {
      id: 'order_DBJOWzybf0sJbb',
      status: 'created',
    },
  },
];

const APIExampleTag: React.FC = () => {
  return <APIExample endpoints={DEFAULT_HTTP_ENDPOINTS} />;
};

export default APIExampleTag; 