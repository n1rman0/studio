# DocuProto - Development Guide

## Overview

This guide provides comprehensive information for developers working on the DocuProto project. It covers everything from initial setup to deployment and includes best practices for development, testing, and maintenance.

---

## Prerequisites

### Required Software
- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Firebase CLI** for deployment
- **VSCode** (recommended) with TypeScript extensions

### Recommended Tools
- **React Developer Tools** (browser extension)
- **TypeScript Language Server**
- **Tailwind CSS IntelliSense** (VSCode extension)
- **ES7+ React/Redux/React-Native snippets**

---

## Project Setup

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd interactive_doc/studio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the studio directory:
   ```env
   # Figma Configuration
   NEXT_PUBLIC_FIGMA_CLIENT_ID=your_figma_client_id
   NEXT_PUBLIC_FIGMA_FILE_KEY=your_figma_file_key
   
   # Firebase Configuration (if using Firebase features)
   FIREBASE_PROJECT_ID=your_project_id
   
   # Development Settings
   NODE_ENV=development
   ```

4. **Verify Setup**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) to verify the application is running.

### IDE Configuration

#### VSCode Settings (`.vscode/settings.json`)
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

#### VSCode Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## Development Workflow

### Daily Development

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Uses Turbopack for fast hot reloading
   - Runs on port 9002
   - Includes automatic TypeScript compilation

2. **AI Development Server (Optional)**
   ```bash
   npm run genkit:dev
   # or for watch mode
   npm run genkit:watch
   ```

3. **Type Checking**
   ```bash
   npm run typecheck
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

### Code Structure Guidelines

#### File Naming Conventions
- **Components**: PascalCase (e.g., `FigmaEmbed.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `FIGMA_CLIENT_ID`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAppContext.ts`)

#### Directory Organization
```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── docuproto/         # Application-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── data/                  # Static data and configurations
└── ai/                    # AI integration layer
```

#### Import Organization
```typescript
// 1. React and Next.js imports
import React from 'react';
import { useEffect, useState } from 'react';

// 2. External library imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// 3. Internal imports
import { useAppContext } from '@/components/docuproto/AppContextProvider';
import { IOS_DOCUMENTATION } from '@/data/documentation';

// 4. Type imports (last)
import type { DocSection } from '@/data/documentation';
```

---

## Component Development

### Creating New Components

1. **Component Template**
   ```typescript
   "use client";
   
   import React from 'react';
   import { cn } from '@/lib/utils';
   
   interface ComponentNameProps {
     className?: string;
     // Add other props
   }
   
   const ComponentName: React.FC<ComponentNameProps> = ({
     className,
     // Destructure other props
   }) => {
     return (
       <div className={cn("default-classes", className)}>
         {/* Component content */}
       </div>
     );
   };
   
   export default ComponentName;
   ```

2. **Component Guidelines**
   - Use TypeScript for all components
   - Implement proper prop validation
   - Follow accessibility guidelines
   - Use Tailwind CSS for styling
   - Implement responsive design

### State Management

#### Using Context
```typescript
// For global state that needs to be shared across many components
const { currentDocSection, setCurrentDocSectionById } = useAppContext();
```

#### Local State
```typescript
// For component-specific state
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

#### Performance Optimization
```typescript
// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Use useCallback for event handlers passed to children
const handleClick = useCallback((id: string) => {
  setCurrentDocSectionById(id);
}, [setCurrentDocSectionById]);
```

---

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Utility-First Approach**
   ```typescript
   // Good
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
   
   // Avoid custom CSS when possible
   ```

2. **Responsive Design**
   ```typescript
   <div className="text-sm md:text-base lg:text-lg xl:text-xl">
     Responsive text
   </div>
   ```

3. **Component Variants**
   ```typescript
   import { cva } from 'class-variance-authority';
   
   const buttonVariants = cva(
     "inline-flex items-center justify-center rounded-md text-sm font-medium",
     {
       variants: {
         variant: {
           default: "bg-primary text-primary-foreground hover:bg-primary/90",
           destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
         },
         size: {
           default: "h-10 px-4 py-2",
           sm: "h-9 rounded-md px-3",
           lg: "h-11 rounded-md px-8",
         },
       },
       defaultVariants: {
         variant: "default",
         size: "default",
       },
     }
   );
   ```

### Custom Styling

#### CSS Variables (in globals.css)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}
```

#### Component-Specific Styles
```typescript
// Use cn utility for conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

---

## AI Integration Development

### Setting Up AI Features

1. **Configure Genkit**
   ```typescript
   // src/ai/genkit.ts
   import { genkit } from 'genkit';
   import { googleAI } from '@genkit-ai/googleai';
   
   export const ai = genkit({
     plugins: [
       googleAI({
         apiKey: process.env.GOOGLE_AI_API_KEY,
       }),
     ],
   });
   ```

2. **Creating AI Flows**
   ```typescript
   // src/ai/flows/example-flow.ts
   import { ai } from '@/ai/genkit';
   import { z } from 'genkit';
   
   const ExampleFlowInput = z.object({
     input: z.string(),
   });
   
   const ExampleFlowOutput = z.object({
     output: z.string(),
   });
   
   export const exampleFlow = ai.defineFlow(
     {
       name: 'exampleFlow',
       inputSchema: ExampleFlowInput,
       outputSchema: ExampleFlowOutput,
     },
     async (input) => {
       // AI logic here
       return { output: "result" };
     }
   );
   ```

### AI Development Server

```bash
# Start AI development server
npm run genkit:dev

# Access Genkit Developer UI
# http://localhost:4000
```

---

## Testing Strategy

### Unit Testing Setup

1. **Install Testing Dependencies**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Test Configuration (jest.config.js)**
   ```javascript
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/src/$1',
     },
   };
   ```

3. **Component Testing Example**
   ```typescript
   import { render, screen } from '@testing-library/react';
   import { AppContextProvider } from '@/components/docuproto/AppContextProvider';
   import NavigationMenu from '@/components/docuproto/NavigationMenu';
   
   describe('NavigationMenu', () => {
     it('renders navigation items', () => {
       render(
         <AppContextProvider>
           <NavigationMenu />
         </AppContextProvider>
       );
       
       expect(screen.getByText('Welcome to Payment SDK')).toBeInTheDocument();
     });
   });
   ```

### Integration Testing

1. **Figma Integration Testing**
   ```typescript
   // Mock Figma messages for testing
   const mockFigmaMessage = {
     origin: 'https://www.figma.com',
     data: {
       type: 'PRESENTED_NODE_CHANGED',
       data: { presentedNodeId: '7113-2955' }
     }
   };
   ```

2. **Context Testing**
   ```typescript
   // Test context provider functionality
   const { getByTestId } = render(
     <AppContextProvider>
       <TestComponent />
     </AppContextProvider>
   );
   ```

---

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm install --save-dev @next/bundle-analyzer
```

### Performance Best Practices

1. **Code Splitting**
   ```typescript
   // Dynamic imports for large components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>
   });
   ```

2. **Image Optimization**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     priority={false}
   />
   ```

3. **Memoization**
   ```typescript
   // Memoize expensive calculations
   const memoizedValue = useMemo(() => 
     expensiveCalculation(props.data), 
     [props.data]
   );
   ```

---

## Deployment

### Production Build

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Test Production Build Locally**
   ```bash
   npm start
   ```

### Firebase Deployment

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Deploy to Firebase**
   ```bash
   firebase deploy --only hosting
   ```

### Environment Variables

#### Production Environment
```env
NEXT_PUBLIC_FIGMA_CLIENT_ID=production_client_id
NEXT_PUBLIC_FIGMA_FILE_KEY=production_file_key
NODE_ENV=production
```

---

## Debugging and Troubleshooting

### Common Issues

1. **Figma Integration Issues**
   ```typescript
   // Debug Figma messages
   useEffect(() => {
     const handleMessage = (event) => {
       console.log('Figma message received:', event);
     };
     window.addEventListener('message', handleMessage);
     return () => window.removeEventListener('message', handleMessage);
   }, []);
   ```

2. **TypeScript Errors**
   ```bash
   # Check TypeScript errors
   npm run typecheck
   
   # Fix common issues
   npm run lint -- --fix
   ```

3. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

### Development Tools

1. **React Developer Tools**
   - Install browser extension
   - Debug component state and props
   - Profile component performance

2. **Next.js DevTools**
   - Built-in development server
   - Automatic error overlay
   - Hot reloading capabilities

---

## Code Quality and Standards

### Pre-commit Hooks

1. **Setup Husky**
   ```bash
   npm install --save-dev husky lint-staged
   npx husky install
   ```

2. **Pre-commit Configuration**
   ```json
   // package.json
   {
     "lint-staged": {
       "*.{ts,tsx}": [
         "eslint --fix",
         "prettier --write"
       ]
     }
   }
   ```

### Code Review Guidelines

1. **Component Review Checklist**
   - [ ] TypeScript types are properly defined
   - [ ] Component is responsive
   - [ ] Accessibility guidelines followed
   - [ ] Performance optimizations applied
   - [ ] Error handling implemented

2. **Security Review**
   - [ ] No sensitive data in client code
   - [ ] Proper input validation
   - [ ] XSS prevention measures
   - [ ] CSRF protection (if applicable)

---

## Documentation Maintenance

### Keeping Documentation Updated

1. **Component Documentation**
   - Update when adding new components
   - Document prop changes
   - Include usage examples

2. **API Documentation**
   - Document new AI flows
   - Update integration guides
   - Maintain troubleshooting guides

3. **Architecture Updates**
   - Document architectural changes
   - Update dependency information
   - Maintain deployment guides

---

## Resources and References

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Figma Embed API](https://www.figma.com/developers/embed)

### Internal Resources
- [Project Architecture](./ARCHITECTURE.md)
- [Component Documentation](./COMPONENTS.md)
- [Project Blueprint](./blueprint.md)

### Community Resources
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## Getting Help

### Internal Support
1. Review existing documentation
2. Check project issues and discussions
3. Consult team members familiar with the codebase

### External Resources
1. Next.js GitHub Discussions
2. React Community Forums
3. Stack Overflow for specific technical issues
4. Figma Developer Community

### Emergency Contacts
- **Project Lead**: [Contact Information]
- **Firebase Admin**: [Contact Information]
- **Design Team**: [Contact Information] 