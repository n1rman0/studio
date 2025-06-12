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
import { BookOpen, Settings, CreditCard, Palette, type LucideIcon } from 'lucide-react'; // Added Palette

interface IconMap {
  [key: string]: LucideIcon;
}

const iconMap: IconMap = {
  BookOpen,
  Settings,
  CreditCard,
  Palette, // Added Palette to map
};


const NavigationMenu: React.FC = () => {
  const { currentDocSection, setCurrentDocSectionById, navigateToFigmaNode } = useAppContext();

  const handleNavigation = (sectionId: string, figmaNodeId: string) => {
    setCurrentDocSectionById(sectionId);
    navigateToFigmaNode(figmaNodeId);
  };

  return (
    <ScrollArea className="h-full">
      <SidebarMenu>
        {IOS_DOCUMENTATION.map((section) => {
          const IconComponent = section.iconName ? iconMap[section.iconName] : BookOpen;
          return (
            <SidebarMenuItem key={section.id}>
              <SidebarMenuButton
                onClick={() => handleNavigation(section.id, section.figmaNodeId)}
                isActive={currentDocSection?.id === section.id}
                tooltip={section.title}
                className="text-sm"
              >
                <IconComponent className="h-4 w-4" />
                <span>{section.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </ScrollArea>
  );
};

export default NavigationMenu;
