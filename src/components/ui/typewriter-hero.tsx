"use client";

import React from 'react';
import { TypewriterEffect } from './typewriter-effect';

export interface TypewriterWord {
  text: string;
  className?: string;
}

export interface HeroButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface HeroFeature {
  icon?: React.ReactNode; // emoji or icon node
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'purple';
}

export interface TypewriterHeroProps {
  words: TypewriterWord[];
  subtitle?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  features?: HeroFeature[];
}

const colorToClasses: Record<NonNullable<HeroFeature['color']>, {bg: string; text: string}> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
};

const TypewriterHero: React.FC<TypewriterHeroProps> = ({
  words,
  subtitle,
  primaryButton,
  secondaryButton,
  features = [],
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {subtitle && (
        <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 text-center">
          {subtitle}
        </p>
      )}

      <TypewriterEffect words={words} />

      {(primaryButton || secondaryButton) && (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          {primaryButton && (
            primaryButton.href ? (
              <a
                href={primaryButton.href}
                className="w-40 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium transition-colors flex items-center justify-center"
              >
                {primaryButton.label}
              </a>
            ) : (
              <button
                onClick={primaryButton.onClick}
                className="w-40 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium transition-colors"
              >
                {primaryButton.label}
              </button>
            )
          )}

          {secondaryButton && (
            secondaryButton.href ? (
              <a
                href={secondaryButton.href}
                className="w-40 h-10 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-sm font-medium transition-colors flex items-center justify-center"
              >
                {secondaryButton.label}
              </a>
            ) : (
              <button
                onClick={secondaryButton.onClick}
                className="w-40 h-10 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-sm font-medium transition-colors"
              >
                {secondaryButton.label}
              </button>
            )
          )}
        </div>
      )}

      {features.length > 0 && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {features.map((feature, idx) => {
            const colors = feature.color ? colorToClasses[feature.color] : colorToClasses.blue;
            return (
              <div key={idx} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  {feature.icon ?? <span className={`${colors.text} font-bold text-xl`}>★</span>}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TypewriterHero; 