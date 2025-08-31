"use client";

import TypewriterHero, { type TypewriterWord, type HeroFeature } from "../ui/typewriter-hero";
 
export function CartTypewriterDemo() {
  const words: TypewriterWord[] = [
    { text: "Build" },
    { text: "powerful" },
    { text: "shopping" },
    { text: "experiences" },
    { text: "with" },
    { text: "Cart", className: "text-blue-500 dark:text-blue-500" },
    { text: "API.", className: "text-blue-500 dark:text-blue-500" },
  ];

  const features: HeroFeature[] = [
    { title: "Lightning Fast", description: "Sub-millisecond response times for optimal user experience", color: 'blue', icon: <span className="text-blue-600 font-bold text-xl">⚡</span> },
    { title: "Secure & Reliable", description: "Enterprise-grade security with 99.99% uptime guarantee", color: 'green', icon: <span className="text-green-600 font-bold text-xl">🔒</span> },
    { title: "Easy Integration", description: "RESTful API with comprehensive documentation and SDKs", color: 'purple', icon: <span className="text-purple-600 font-bold text-xl">🚀</span> },
  ];

  return (
    <TypewriterHero
      words={words}
      subtitle="Revolutionize your e-commerce platform with our comprehensive Cart API"
      primaryButton={{ label: 'Start Building' }}
      secondaryButton={{ label: 'View Docs' }}
      features={features}
    />
  );
} 