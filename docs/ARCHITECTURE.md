# DocuProto - Architecture Documentation

## Project Overview

**DocuProto** is an innovative interactive documentation platform that seamlessly integrates Figma prototypes with contextual documentation. Built as a Firebase Studio project using Next.js 15 with TypeScript, it provides a sophisticated solution for displaying technical documentation alongside interactive design prototypes.

### Project Purpose
The application enables users to:
- View interactive Figma prototypes embedded in a web application
- Navigate synchronized documentation that corresponds to prototype states
- Experience bi-directional navigation between prototype elements and documentation
- Receive AI-powered contextual suggestions for relevant documentation snippets

---

## Technology Stack

### Core Framework
- **Next.js 15.3.3** - React framework with App Router
- **React 18.3.1** - Component library
- **TypeScript 5** - Type safety and enhanced development experience

### UI Framework & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Radix UI** - Headless, accessible UI components
- **Lucide React** - Modern icon library
- **Custom Design System** - Based on Shadcn/ui components

### AI Integration
- **Google Genkit 1.8.0** - AI flow orchestration
- **Firebase Genkit** - Google AI integration
- **Zod** - Schema validation for AI inputs/outputs

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Patch Package** - Dependency patching

---

## Application Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DocuProto Application                    │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router Layout                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Sidebar       │  │  Figma Embed    │  │  Documentation  │ │
│  │   Navigation    │  │  Component      │  │  Display        │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│           │                     │                     │         │
│           └─────────────────────┼─────────────────────┘         │
│                                 │                               │
│  ┌─────────────────────────────┼─────────────────────────────┐ │
│  │           App Context Provider                           │ │
│  │  • State Management                                     │ │
│  │  • Figma Integration                                    │ │
│  │  • Navigation Control                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                 │                               │
│  ┌─────────────────────────────┼─────────────────────────────┐ │
│  │              AI Layer                                   │ │
│  │  • Contextual Suggestions                              │ │
│  │  • Google Genkit Integration                           │ │
│  │  • Smart Documentation Recommendations                 │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
studio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with fonts & scripts
│   │   ├── page.tsx           # Main application page
│   │   ├── globals.css        # Global styles & CSS variables
│   │   └── favicon.ico        # Application favicon
│   │
│   ├── components/            # React Components
│   │   ├── docuproto/         # Core application components
│   │   │   ├── AppContextProvider.tsx    # Global state management
│   │   │   ├── FigmaEmbed.tsx            # Figma prototype integration
│   │   │   ├── DocumentationDisplay.tsx  # Documentation renderer
│   │   │   ├── NavigationMenu.tsx        # Sidebar navigation
│   │   │   └── ContextualSuggestions.tsx # AI-powered suggestions
│   │   │
│   │   └── ui/                # Reusable UI components (Shadcn/ui)
│   │       ├── sidebar.tsx    # Sidebar component
│   │       ├── button.tsx     # Button variants
│   │       ├── card.tsx       # Card layouts
│   │       └── ...            # Additional UI components
│   │
│   ├── ai/                    # AI Integration Layer
│   │   ├── genkit.ts         # Genkit configuration
│   │   ├── dev.ts            # Development AI server
│   │   └── flows/            # AI flow definitions
│   │       └── suggest-documentation-snippets.ts
│   │
│   ├── data/                  # Static Data & Configuration
│   │   └── documentation.ts   # Documentation content & structure
│   │
│   ├── lib/                   # Utility Functions
│   │   └── utils.ts          # Tailwind utilities & helpers
│   │
│   └── hooks/                 # Custom React Hooks
│
├── docs/                      # Project Documentation
│   ├── blueprint.md          # Original project specification
│   ├── ARCHITECTURE.md       # This architecture document
│   └── COMPONENTS.md          # Component documentation
│
├── Configuration Files
├── package.json              # Dependencies & scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── components.json          # Shadcn/ui configuration
└── apphosting.yaml         # Firebase hosting configuration
```

---

## Core Architecture Patterns

### 1. Context-Based State Management
The application uses React Context for centralized state management through `AppContextProvider`, managing:
- Current documentation section
- Figma prototype interaction state
- User interaction history
- Bi-directional navigation state

### 2. Event-Driven Communication
Figma integration uses `postMessage` API for:
- Prototype navigation commands
- State change notifications
- User interaction tracking
- Bi-directional synchronization

### 3. Component-Based Architecture
Modular design with clear separation of concerns:
- **Presentation Components**: UI rendering and user interaction
- **Container Components**: Business logic and state management
- **Utility Components**: Reusable UI elements

### 4. AI-Powered Enhancement
Google Genkit integration provides:
- Contextual documentation suggestions
- User behavior analysis
- Smart content recommendations

---

## Data Flow Architecture

### Primary Data Flow
```
User Interaction → Context Provider → Component Updates → UI Render
       ↓
Figma Prototype ← Message API ← Navigation Commands
       ↓
State Changes → Documentation Updates → AI Suggestions
```

### Figma Integration Flow
```
1. Figma Embed loads → INITIAL_LOAD event
2. User navigates → PRESENTED_NODE_CHANGED event
3. Context updates → Documentation section changes
4. New section triggers → AI suggestion request
5. AI responds → Contextual suggestions displayed
```

---

## Security & Performance Considerations

### Security
- **Iframe Sandboxing**: Figma embed uses restricted sandbox permissions
- **Origin Validation**: Message API validates Figma origin
- **Type Safety**: TypeScript ensures type validation throughout
- **Input Validation**: Zod schemas validate AI inputs/outputs

### Performance
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component optimization
- **Component Memoization**: Strategic use of React.memo and useMemo
- **Build Optimization**: TypeScript compilation with optimizations

---

## Integration Points

### External Services
1. **Figma Embed API**: Interactive prototype embedding
2. **Google AI (Genkit)**: Contextual AI suggestions
3. **Firebase Hosting**: Application deployment
4. **Google Fonts**: Typography (Inter, Space Grotesk)

### Internal Integrations
1. **Context Provider**: Centralized state management
2. **Message Bus**: Figma communication layer
3. **AI Flow**: Intelligent suggestion system
4. **Navigation System**: Bi-directional prototype/docs sync

---

## Deployment Architecture

### Firebase Studio Integration
- **App Hosting**: Firebase App Hosting configuration
- **Build Process**: Next.js static generation
- **Environment Management**: Development and production environments

### Development Workflow
```
Local Development → Firebase Studio → Production Deployment
       ↓
Hot Reload (Turbopack) → Genkit AI Development Server
```

---

## Future Architecture Considerations

### Scalability
- Component library extraction for reuse
- Micro-frontend architecture for larger teams
- API layer abstraction for multiple prototype sources

### Enhancement Opportunities
- Real-time collaboration features
- Advanced AI personalization
- Multi-language documentation support
- Analytics and usage tracking integration

---

## Development Guidelines

### Code Organization
- Follow Next.js App Router conventions
- Maintain clear component boundaries
- Use TypeScript for all new code
- Implement proper error boundaries

### Performance Guidelines
- Minimize bundle size through code splitting
- Optimize component re-renders
- Use React DevTools for performance monitoring
- Implement proper loading states

### AI Integration Guidelines
- Validate all AI inputs with Zod schemas
- Handle AI failures gracefully
- Implement proper fallback mechanisms
- Monitor AI response quality 