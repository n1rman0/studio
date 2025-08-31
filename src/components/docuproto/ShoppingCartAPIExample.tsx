"use client";

import React from 'react';
import APIDocumentation, { type APIEndpoint } from './APIDocumentation';

export interface APIExampleProps {
  title?: string;
  description?: string;
  endpoints: APIEndpoint[];
}

const APIExample: React.FC<APIExampleProps> = ({ endpoints }) => {
  return (
    <div className="w-full">
      <APIDocumentation endpoints={endpoints} />
    </div>
  );
};

export default APIExample; 