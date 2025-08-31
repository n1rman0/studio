"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from './AppContextProvider';
import { IOS_DOCUMENTATION } from '@/data/documentation';
import { BookOpen, Settings, CreditCard, Palette, Code, ChevronDown, type LucideIcon, Database, Rocket, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface IconMap {
  [key: string]: LucideIcon;
}

const iconMap: IconMap = {
  BookOpen,
  Settings,
  CreditCard,
  Palette,
  Code,
  Database,
  Rocket,
  ShieldCheck,
};

const RazorpayLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.5 3l-9 5.5L8 13l6.5-3.5L9 21l3.5-10L20.5 3Z" fill="hsl(214 84% 56%)" />
    </svg>
    <span className="hidden sm:inline text-sm font-semibold tracking-tight text-foreground">Razorpay</span>
  </div>
);

const TopNavigation: React.FC = () => {
  const { currentDocSection, setCurrentDocSectionById } = useAppContext();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Progress state
  const totalSteps = IOS_DOCUMENTATION.length;
  const currentStepIndex = currentDocSection
    ? IOS_DOCUMENTATION.findIndex((section) => section.id === currentDocSection.id)
    : 0;
  const currentStep = currentStepIndex + 1;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNavigation = (sectionId: string) => {
    setCurrentDocSectionById(sectionId);
  };

  const toggleTheme = () => {
    if (!mounted) return;
    const next = (resolvedTheme === 'dark' || theme === 'dark') ? 'light' : 'dark';
    setTheme(next);
  };

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full h-12 grid grid-cols-3 items-center px-3 relative">
        {/* Left: Branding */}
        <div className="flex items-center">
          <RazorpayLogo />
        </div>

        {/* Center: Step + Title dropdown pill */}
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 px-2 sm:px-3 rounded-full bg-card/80 border-border text-sm flex items-center gap-2">
                <span className="hidden sm:inline text-foreground/70">Step {currentStep} of {totalSteps}</span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-foreground/20" />
                {currentDocSection ? (
                  <>
                    {(() => {
                      const IconComponent = currentDocSection.iconName ? iconMap[currentDocSection.iconName] : BookOpen;
                      return <IconComponent className="h-4 w-4" />;
                    })()}
                    <span className="truncate max-w-[40vw]">{currentDocSection.title}</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span className="truncate max-w-[40vw]">Select Section</span>
                  </>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64">
              {IOS_DOCUMENTATION.map((section) => {
                const IconComponent = section.iconName ? iconMap[section.iconName] : BookOpen;
                return (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{section.title}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Theme toggle */}
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {mounted ? (
              isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
            ) : (
              <span className="inline-block w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Progress strip at bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-foreground/10 dark:bg-secondary/60">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, hsl(var(--ring)) 0%, hsl(214 90% 65%) 50%, hsl(var(--ring)) 100%)',
              boxShadow: '0 0 6px rgba(59, 130, 246, 0.25)'
            }}
          />
          <div className="absolute inset-0 flex justify-between items-center px-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  const section = IOS_DOCUMENTATION[index];
                  if (section) {
                    setCurrentDocSectionById(section.id);
                  }
                }}
                className={`w-2 h-2 rounded-full border border-border transition-transform duration-200 hover:scale-110 ${
                  index < currentStep ? 'bg-background' : 'bg-foreground/30'
                }`}
                title={`Go to step ${index + 1}`}
                aria-label={`Jump to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;