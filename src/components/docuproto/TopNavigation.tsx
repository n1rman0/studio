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
import { BookOpen, Settings, CreditCard, Palette, Code, ChevronDown, type LucideIcon } from 'lucide-react';

interface IconMap {
  [key: string]: LucideIcon;
}

const iconMap: IconMap = {
  BookOpen,
  Settings,
  CreditCard,
  Palette,
  Code,
};

const TopNavigation: React.FC = () => {
  const { currentDocSection, setCurrentDocSectionById, navigateToFigmaNode } = useAppContext();

  const handleNavigation = (sectionId: string, figmaNodeId: string) => {
    setCurrentDocSectionById(sectionId);
    navigateToFigmaNode(figmaNodeId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="w-full flex h-14 items-center justify-between px-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg text-primary">DocuProto</h1>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Beta
          </Badge>
        </div>

        {/* Center - Documentation Sections Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {currentDocSection ? (
                  <>
                    {(() => {
                      const IconComponent = currentDocSection.iconName ? iconMap[currentDocSection.iconName] : BookOpen;
                      return <IconComponent className="h-4 w-4" />;
                    })()}
                    <span className="hidden sm:inline">{currentDocSection.title}</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Select Section</span>
                  </>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {IOS_DOCUMENTATION.map((section) => {
                const IconComponent = section.iconName ? iconMap[section.iconName] : BookOpen;
                return (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => handleNavigation(section.id, section.figmaNodeId)}
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

        {/* Right side - Navigation Links */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            Documentation
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Components
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Examples
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default TopNavigation; 