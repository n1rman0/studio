import {
  BookOpen,
  Settings,
  CreditCard,
  Palette,
  Code,
  Database,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  BookOpen,
  Settings,
  CreditCard,
  Palette,
  Code,
  Database,
  Rocket,
  ShieldCheck,
};

export const getIconComponent = (iconName?: string): LucideIcon => {
  if (iconName && map[iconName]) return map[iconName];
  return BookOpen;
}; 