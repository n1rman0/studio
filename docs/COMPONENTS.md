# DocuProto - Components Documentation

## Overview

This document provides detailed information about all React components in the DocuProto application. Each component is documented with its purpose, props, usage patterns, and implementation details.

---

## Component Hierarchy

```
App
└── AppContextProvider
    └── SidebarProvider
        ├── Sidebar
        │   ├── SidebarHeader
        │   └── SidebarContent
        │       └── NavigationMenu
        └── SidebarInset
            └── Main Layout
                ├── FigmaEmbed
                ├── DocumentationDisplay
                └── ContextualSuggestions (EventDisplay)
```

---

## Core Application Components

### AppContextProvider
**Location**: `src/components/docuproto/AppContextProvider.tsx`

**Purpose**: Centralized state management for the entire application using React Context.

**State Management**:
```typescript
interface AppContextType {
  currentDocSection: DocSection | null;
  setCurrentDocSectionById: (id: string | null) => void;
  navigateToFigmaNode: (nodeId: string) => void;
  figmaIframeRef: React.RefObject<HTMLIFrameElement>;
  interactionHistory: string[];
  addInteraction: (interaction: string) => void;
  isFigmaReady: boolean;
  setIsFigmaReady: (isReady: boolean) => void;
}
```

**Key Features**:
- **Documentation Navigation**: Manages current documentation section
- **Figma Integration**: Provides iframe reference and ready state
- **Interaction Tracking**: Maintains history of user interactions (last 5)
- **Bi-directional Sync**: Coordinates between Figma prototype and documentation

**Usage Pattern**:
```typescript
const { currentDocSection, setCurrentDocSectionById, navigateToFigmaNode } = useAppContext();
```

**Implementation Notes**:
- Uses `useCallback` for performance optimization
- Automatically initializes with first documentation section
- Manages iframe reference for Figma communication

---

### FigmaEmbed
**Location**: `src/components/docuproto/FigmaEmbed.tsx`

**Purpose**: Embeds Figma prototype and handles bi-directional communication with the prototype.

**Key Features**:
- **Figma Embed Kit 2.0 Integration**: Uses the latest Figma Embed Kit 2.0 (no script dependencies required)
- **Enhanced Message Handling**: Processes all official Figma events with improved error handling
- **State Synchronization**: Updates documentation based on prototype navigation
- **Interaction Tracking**: Records detailed user interactions with prototype
- **Complete API Coverage**: Implements all documented event types and control messages

**Figma Events Handled** (Official API):
```typescript
// All official Embed Kit 2.0 events
"INITIAL_LOAD"              // Prototype ready
"PRESENTED_NODE_CHANGED"    // User navigated to new frame
"MOUSE_PRESS_OR_RELEASE"    // User interaction (hotspot vs canvas)
"NEW_STATE"                 // Component state change
"REQUEST_CLOSE"             // User pressed Spacebar to close
"LOGIN_SCREEN_SHOWN"        // Authentication required
"PASSWORD_SCREEN_SHOWN"     // Password-protected file
```

**Control Messages Supported**:
```typescript
// Prototype navigation controls
"NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS"  // Navigate to specific node
"NAVIGATE_FORWARD"                      // Next frame in sequence
"NAVIGATE_BACKWARD"                     // Previous frame in sequence
"RESTART"                               // Restart prototype flow
```

**Configuration**:
```typescript
// Embed Kit 2.0 URL - Enhanced with official parameters
const embedSrc = `https://embed.figma.com/proto/${FIGMA_FILE_KEY}?embed-host=docuproto&client-id=${FIGMA_CLIENT_ID}&footer=false&hotspot-hints=true&theme=system&viewport-controls=true`;
```

**URL Parameters Used**:
- `embed-host`: Required identifier for the hosting application
- `client-id`: Required for Embed API functionality
- `footer=false`: Clean interface without Figma branding
- `hotspot-hints=true`: Show clickable areas for better UX
- `theme=system`: Automatically match user's system theme
- `viewport-controls=true`: Allow panning and zooming

**Migration Compliance**:
- ✅ Uses `https://embed.figma.com/` subdomain (not `www.figma.com/embed`)
- ✅ Uses hyphenated parameters (`embed-host`, `client-id`)
- ✅ Includes required `client-id` for prototype control
- ✅ Excludes deprecated `embed_origin` parameter
- ✅ Handles all official event types from documentation

**Security Features**:
- Origin validation for Figma messages
- Enhanced iframe sandboxing with presentation permissions
- Clipboard access for better UX
- Safe message handling with type checking and error boundaries

**Performance Enhancements**:
- Lazy loading for improved initial page load
- useCallback for optimized event handling
- No external script dependencies (unlike Embed API 1.0)

**UI Elements**:
- Header with Embed Kit 2.0 status indicator
- Full-screen iframe container
- Loading state indicators

---

### DocumentationDisplay
**Location**: `src/components/docuproto/DocumentationDisplay.tsx`

**Purpose**: Renders the current documentation section with rich HTML content.

**Features**:
- **Dynamic Content Rendering**: Displays HTML content from documentation data
- **Context-Aware Display**: Shows content based on current section
- **Responsive Design**: Adapts to different screen sizes
- **Rich Typography**: Supports custom fonts and styling

**Content Structure**:
```typescript
interface DocSection {
  id: string;
  figmaNodeId: string;
  title: string;
  content: string; // HTML content
  relatedSuggestionsQuery?: string;
  iconName?: string;
}
```

**Styling Features**:
- Custom font families (Inter, Space Grotesk)
- Responsive text sizing
- Code block highlighting
- List and typography styling

**Implementation**:
- Uses `dangerouslySetInnerHTML` for rich content
- Scroll area for long content
- Graceful fallback for missing sections

---

### NavigationMenu
**Location**: `src/components/docuproto/NavigationMenu.tsx`

**Purpose**: Provides sidebar navigation for documentation sections.

**Features**:
- **Section Navigation**: Lists all available documentation sections
- **Active State Management**: Highlights current section
- **Icon Integration**: Displays Lucide icons for each section
- **Responsive Behavior**: Collapses on mobile devices

**Icon Mapping**:
```typescript
const iconMap = {
  'BookOpen': BookOpen,
  'Settings': Settings,
  'CreditCard': CreditCard,
  'Palette': Palette,
};
```

**Navigation Behavior**:
- Updates context when section is selected
- Triggers Figma navigation for bi-directional sync
- Tracks interactions for AI suggestions

**UI Structure**:
- Scrollable section list
- Hover and active states
- Icon and text layout
- Responsive typography

---

### ContextualSuggestions (EventDisplay)
**Location**: `src/components/docuproto/ContextualSuggestions.tsx`

**Purpose**: Displays AI-powered contextual suggestions and user interaction history.

**Features**:
- **AI Integration**: Fetches suggestions based on current context
- **Interaction History**: Shows recent user interactions
- **Dynamic Updates**: Refreshes when context changes
- **Loading States**: Provides feedback during AI processing

**AI Integration**:
```typescript
// Calls AI flow for suggestions
const suggestions = await suggestDocumentationSnippets({
  currentSection: currentDocSection.title,
  userQuery: '',
  interactionHistory
});
```

**Display Elements**:
- Recent interactions list
- AI-generated suggestions
- Loading indicators
- Error handling for AI failures

**State Management**:
- Loading state during AI calls
- Error handling for failed requests
- Graceful fallback when AI is unavailable

---

## UI Component Library

The application uses a comprehensive set of UI components based on Radix UI and Shadcn/ui. These provide consistent, accessible, and customizable interface elements.

### Layout Components

#### Sidebar
**Location**: `src/components/ui/sidebar.tsx`

**Purpose**: Collapsible sidebar container with multiple variants.

**Features**:
- **Collapsible Behavior**: Can collapse to icon-only mode
- **Responsive Design**: Adapts to mobile and desktop
- **State Management**: Maintains open/closed state
- **Accessibility**: Full keyboard navigation support

**Component Variants**:
```typescript
// Core sidebar components
SidebarProvider    // Context provider for sidebar state
Sidebar           // Main container
SidebarHeader     // Header section
SidebarContent    // Scrollable content area
SidebarInset      // Main content area
SidebarTrigger    // Toggle button
```

**Usage Pattern**:
```typescript
<SidebarProvider defaultOpen={true}>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent />
  </Sidebar>
  <SidebarInset>
    {/* Main content */}
  </SidebarInset>
</SidebarProvider>
```

### Interactive Components

#### Button
**Location**: `src/components/ui/button.tsx`

**Variants**: Primary, Secondary, Destructive, Outline, Ghost, Link

**Features**:
- Size variants (sm, default, lg, icon)
- Loading states
- Disabled states
- Icon support

#### Card
**Location**: `src/components/ui/card.tsx`

**Components**:
- `Card` - Container
- `CardHeader` - Header section
- `CardContent` - Main content
- `CardFooter` - Footer section

### Form Components

#### Input
**Location**: `src/components/ui/input.tsx`

**Features**:
- Standard form input
- Consistent styling
- Focus states
- Error states

#### Label
**Location**: `src/components/ui/label.tsx`

**Features**:
- Form label component
- Accessibility compliance
- Consistent typography

### Feedback Components

#### Toast
**Location**: `src/components/ui/toast.tsx`

**Features**:
- Success, error, warning variants
- Auto-dismiss functionality
- Action buttons
- Accessible announcements

#### Progress
**Location**: `src/components/ui/progress.tsx`

**Features**:
- Determinate progress indicator
- Smooth animations
- Accessible progress reporting

---

## Data Layer Components

### Documentation Data Structure
**Location**: `src/data/documentation.ts`

**Purpose**: Defines documentation content and structure.

**Data Schema**:
```typescript
interface DocSection {
  id: string;                    // Unique identifier
  figmaNodeId: string;          // Corresponding Figma node
  title: string;                // Section title
  content: string;              // HTML content
  relatedSuggestionsQuery?: string; // AI query hint
  iconName?: string;            // Lucide icon name
}
```

**Content Sections**:
1. **Welcome** - Introduction to Payment SDK
2. **Initialization** - SDK setup and configuration
3. **Making Payment** - Payment processing examples
4. **UI Customization** - Theming and styling options

**Configuration Constants**:
```typescript
export const FIGMA_PROTOTYPE_URL = "...";
export const FIGMA_FILE_KEY = "...";
export const FIGMA_CLIENT_ID = "...";
```

---

## AI Integration Components

### Genkit Configuration
**Location**: `src/ai/genkit.ts`

**Purpose**: Configures Google Genkit for AI operations.

**Features**:
- Google AI plugin configuration
- Development environment setup
- Flow definitions

### AI Flow: Documentation Suggestions
**Location**: `src/ai/flows/suggest-documentation-snippets.ts`

**Purpose**: Generates contextual documentation suggestions.

**Input Schema**:
```typescript
{
  currentSection: string;       // Current documentation section
  userQuery?: string;          // Optional user query
  interactionHistory?: string[]; // Recent interactions
}
```

**Output Schema**:
```typescript
{
  suggestedSnippets: string[];  // AI-generated suggestions
}
```

**Implementation Notes**:
- Currently bypassed due to no active AI plugins
- Graceful fallback to empty suggestions
- Zod schema validation for type safety

---

## Utility Components

### Utils
**Location**: `src/lib/utils.ts`

**Purpose**: Utility functions for component styling and logic.

**Functions**:
```typescript
// Tailwind class merging utility
cn(...classes: ClassValue[]) => string
```

**Features**:
- Conditional class application
- Tailwind CSS class merging
- Type-safe styling utilities

---

## Component Development Guidelines

### Best Practices

1. **Type Safety**
   - Use TypeScript for all components
   - Define proper prop interfaces
   - Implement proper error boundaries

2. **Performance**
   - Use `React.memo` for expensive components
   - Implement `useMemo` and `useCallback` appropriately
   - Avoid unnecessary re-renders

3. **Accessibility**
   - Follow WCAG guidelines
   - Use semantic HTML elements
   - Implement proper ARIA attributes

4. **Styling**
   - Use Tailwind CSS utilities
   - Follow design system conventions
   - Implement responsive design patterns

### Component Structure Template
```typescript
"use client"; // If client component

import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Define props with proper types
}

const Component: React.FC<ComponentProps> = ({ 
  // Destructure props
}) => {
  // Component logic
  
  return (
    <div className={cn("base-classes", conditionalClasses)}>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### Testing Considerations

1. **Unit Testing**
   - Test component rendering
   - Test prop handling
   - Test event handling

2. **Integration Testing**
   - Test context interactions
   - Test API integrations
   - Test user workflows

3. **Accessibility Testing**
   - Screen reader compatibility
   - Keyboard navigation
   - Color contrast compliance

---

## Component Dependencies

### External Dependencies
- **React 18.3.1** - Core component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon components
- **Class Variance Authority** - Component variant management

### Internal Dependencies
- **Context System** - AppContextProvider
- **Utility Functions** - Styling and helper functions
- **Type Definitions** - TypeScript interfaces
- **Data Layer** - Documentation content and configuration

---

## Future Component Enhancements

### Planned Improvements
1. **Enhanced AI Integration** - More sophisticated suggestion algorithms
2. **Real-time Collaboration** - Multi-user support components
3. **Advanced Analytics** - User behavior tracking components
4. **Accessibility Enhancements** - Improved screen reader support

### Component Library Evolution
1. **Design System Expansion** - Additional UI components
2. **Theme Customization** - Advanced theming capabilities
3. **Animation System** - Coordinated animations and transitions
4. **Responsive Enhancements** - Better mobile experience components 