"use client";

import { TypewriterEffect } from "../ui/typewriter-effect";
 
export function CartTypewriterDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "powerful",
    },
    {
      text: "shopping",
    },
    {
      text: "experiences",
    },
    {
      text: "with",
    },
    {
      text: "Cart",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "API.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 text-center">
        Revolutionize your e-commerce platform with our comprehensive Cart API
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium transition-colors">
          Start Building
        </button>
        <button className="w-40 h-10 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-sm font-medium transition-colors">
          View Docs
        </button>
      </div>
      
      {/* Additional feature highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm">Sub-millisecond response times for optimal user experience</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-xl">🔒</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
          <p className="text-gray-600 text-sm">Enterprise-grade security with 99.99% uptime guarantee</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 font-bold text-xl">🚀</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Integration</h3>
          <p className="text-gray-600 text-sm">RESTful API with comprehensive documentation and SDKs</p>
        </div>
      </div>
    </div>
  );
} 