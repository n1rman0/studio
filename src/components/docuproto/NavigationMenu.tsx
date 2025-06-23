"use client";

import React from 'react';
import { useAppContext } from './AppContextProvider';
import { IOS_DOCUMENTATION } from '@/data/documentation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Settings, CreditCard, Palette, Code, type LucideIcon } from 'lucide-react'; // Added Palette and Code

interface IconMap {
  [key: string]: LucideIcon;
}

const iconMap: IconMap = {
  BookOpen,
  Settings,
  CreditCard,
  Palette, // Added Palette to map
  Code, // Added Code to map
};


const NavigationMenu: React.FC = () => {
  const { currentDocSection, setCurrentDocSectionById, navigateToFigmaNode } = useAppContext();

  const handleNavigation = (sectionId: string, figmaNodeId: string) => {
    setCurrentDocSectionById(sectionId);
    navigateToFigmaNode(figmaNodeId);
  };

  return (
    <ScrollArea className="h-full">
      <SidebarMenu className="gap-1">
        {IOS_DOCUMENTATION.map((section) => {
          const IconComponent = section.iconName ? iconMap[section.iconName] : BookOpen;
          return (
            <SidebarMenuItem key={section.id}>
              <SidebarMenuButton
                onClick={() => handleNavigation(section.id, section.figmaNodeId)}
                isActive={currentDocSection?.id === section.id}
                tooltip={section.title}
                className="text-sm font-medium h-10 px-3 rounded-md hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{section.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </ScrollArea>
  );
};

export default NavigationMenu;
