# DocuProto – Components

## 1) Overview
Components are organized to deliver a two‑pane experience:
- Left pane: simulated device or panels that visualize the current step
- Right pane: documentation rendered from data (markdown → HTML)
- A thin global context drives navigation and step state

This document focuses on the core components actually present in the codebase and how they compose.

---

## 2) Component Map
```
App (src/app/page.tsx)
└─ AppContextProvider
   ├─ TopNavigation
   ├─ ProgressBar
   ├─ Left Pane (visualization)
   │   └─ MobilePhone | ServerPanel | GoLivePanel
   │      └─ screens: ProductDetailScreen | CheckoutScreen | SuccessScreen
   └─ Right Pane (docs)
       └─ DocumentationDisplay
```
Support components:
- DeviceWrapper, OverlayLoader, CongratulationsModal, EmbeddedCodeSnippet (+snippet exports)
- UI primitives: button, card, dropdown‑menu, badge, scroll‑area, sidebar, toast/toaster, etc.

- Note: `LeftPane.tsx` orchestrates the left visualization (device/panels). `RightPane.tsx` wraps and lays out `DocumentationDisplay`.

---

## 3) Core State
### AppContextProvider
Location: `src/components/docuproto/AppContextProvider.tsx`

Role: Centralized state for the walkthrough.

Context shape:
```ts
interface AppContextType {
  currentDocSection: DocSection | null;
  setCurrentDocSectionById: (id: string | null) => void;
  navigateForward: () => void;
  navigateBackward: () => void;
  restartPrototype: () => void;
  interactionHistory: string[];
  addInteraction: (interaction: string) => void;
}
```
Key behaviors:
- Initializes current section to the first item in `IOS_DOCUMENTATION`
- Provides forward/back/restart navigation and lightweight interaction history

---

## 4) Right Pane (Documentation)
### DocumentationDisplay
Location: `src/components/docuproto/DocumentationDisplay.tsx`

Role: Renders the current section’s content. Content is HTML produced by a markdown transform, with support for embedded special tags that map to React components.

Special inline tags supported:
- `<APIDocumentationExample/>`
- `<APIExample/>`
- `<CartTypewriterDemo/>`
- Code snippets from `EmbeddedCodeSnippet`: `<CartImplementationSnippet/>`, `<CartPersistenceSnippet/>`, `<CheckoutFlowSnippet/>`, `<ErrorHandlingSnippet/>`, `<RzpInitSwiftSnippet/>`, `<RzpInitObjcSnippet/>`, `<RzpOpenSwiftSnippet/>`, `<RzpOpenObjcSnippet/>`, `<RzpDisplayControllerSwiftSnippet/>`, `<RzpDelegateSwiftProtocolSnippet/>`, `<RzpDelegateObjcProtocolSnippet/>`, `<RzpDelegateSwiftWithDataSnippet/>`, `<RzpDelegateObjcWithDataSnippet/>`, `<CocoaPodSnippet/>`, `<PodInstallSnippet/>`, `<AtsInfoPlistSnippet/>`

Notes:
- Uses `dangerouslySetInnerHTML` to render HTML fragments
- Wrapped in a `Card` + `ScrollArea`; typography via Tailwind/`prose` classes

### APIDocumentation
Location: `src/components/docuproto/APIDocumentation.tsx`

Role: Generic, reusable API documentation renderer.

Exports:
```ts
export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  requestExample?: object;
  responseExample: object;
}

export interface APIDocumentationProps {
  endpoints: APIEndpoint[];
}
```

### APIExample
Location: `src/components/docuproto/ShoppingCartAPIExample.tsx` (renovated)

Role: Dumb wrapper that accepts `endpoints: APIEndpoint[]` and renders `APIDocumentation` without hardcoded data.

### APIExampleTag
Location: `src/components/docuproto/APIExampleTag.tsx`

Role: Convenience tag used by docs (`<APIExample/>`) to render a default HTTP request/response example (create order). Replace or extend as needed.

---

## 5) Left Pane (Visualization)
### MobilePhone
Location: `src/components/docuproto/MobilePhone.tsx`

Props:
```ts
interface MobilePhoneProps {
  overlayVisible?: boolean;
  overlayLabel?: string;
  screen?: 'product' | 'checkout' | 'success';
  onRequestNext?: () => void;
  onRequestBack?: () => void;
  onRequestGoto?: (id: string) => void;
  buyDisabled?: boolean;
  lockTooltip?: string;
  toastText?: string | null;
}
```
Behavior:
- Renders one of three screen components: `ProductDetailScreen`, `CheckoutScreen`, `SuccessScreen`
- Shows `OverlayLoader` when `overlayVisible`
- Can display a transient toast banner at the top of the device

Screen components:
- `screens/ProductDetailScreen.tsx`
- `screens/CheckoutScreen.tsx`
- `screens/SuccessScreen.tsx`

Step mapping:
- The main page derives `screen` (product/checkout/success) from step metadata (`left.asset` hints)

### ServerPanel / GoLivePanel
Location: `src/components/docuproto/ServerPanel.tsx`, `src/components/docuproto/GoLivePanel.tsx`

Role: Alternative left‑pane views when a step uses `left.component` instead of a `device`.

---

## 6) Navigation & Chrome
### TopNavigation
Location: `src/components/docuproto/TopNavigation.tsx`

Role:
- Sticky header with title and a dropdown for quick section switching
- Uses Lucide icons mapped by `iconName` from each section

Key bits:
- Dropdown lists `IOS_DOCUMENTATION`; selecting an item updates the current section
- Icon map includes: `BookOpen`, `Settings`, `CreditCard`, `Palette`, `Code`, `Database`, `Rocket`, `ShieldCheck`

### ProgressBar
Location: `src/components/docuproto/ProgressBar.tsx`

Role:
- Displays step count and a progress indicator
- Provides clickable step markers to jump to a section

Notes:
- Reads `IOS_DOCUMENTATION` for total/count; accessible ARIA attributes set
- Includes small, user‑friendly labels for select steps

### NavigationMenu
Location: `src/components/docuproto/NavigationMenu.tsx`

Role:
- Sidebar list of sections using UI `sidebar` primitives
- Click sets current section

---

## 7) Data & Transform
### documentation.ts
Location: `src/data/documentation.ts`

Role:
- Loads `integration-flow.json` and transforms markdown to HTML
- Validates the flow shape using Zod before transforming
- Exports `IOS_DOCUMENTATION` array consumed by UI

Transform features:
- Headings, lists (ordered/unordered), blockquotes
- Inline code and fenced code blocks
- Minor spacing corrections for block elements
- Adds `iconName`

---

## 8) Utilities & Primitives
- `EmbeddedCodeSnippet.tsx` – exports many snippet components used by `DocumentationDisplay`
- `OverlayLoader.tsx` – overlay spinner for simulated waiting states
- `DeviceWrapper.tsx` – visual device frame for the phone
- `CongratulationsModal.tsx` – modal shown at the end of the flow
- UI library under `src/components/ui/` – button, card, dropdown‑menu, badge, scroll‑area, sidebar, toast/toaster, etc. (shadcn/radix)
- `src/lib/iconMap.ts` – central icon resolver for section icons
- `src/lib/stepScreen.ts` – pure utilities to compute screen kind and left‑pane props

---

## 9) Composition Patterns & Conventions
- Two‑pane layout: the page composes left visualization and right documentation; keep them decoupled except for current step
- Step‑driven UI: left pane strictly reflects the step’s `left` metadata; avoid special‑casing in components
- Extensible tags: add new inline tags by extending `DocumentationDisplay` mapping and exporting a small React component
- Accessibility: maintain keyboard nav (Left/Right arrows) and ARIA for progress/navigation elements

---

## 10) Extensibility
- Add steps by editing `src/data/integration-flow.json` only
- Add new screen types by extending `MobilePhone` and the step→screen mapping on the page
- Add new panels by introducing a component and switching via `left.component`
- Enrich markdown: extend the transform to support tables/images/admonitions

---

## 11) Usage Examples
Jump to a specific step via the progress markers:
```tsx
// inside ProgressBar, clicking a marker
setCurrentDocSectionById(IOS_DOCUMENTATION[index].id);
```

Render a docs section with embedded React tags in content:
```tsx
// in DocumentationDisplay renderContent()
if (part === '<APIExample/>') return <APIExampleTag />;
```

Use the MobilePhone with overlays:
```tsx
<MobilePhone
  screen="checkout"
  overlayVisible
  overlayLabel="Processing payment..."
  onRequestNext={navigateForward}
  onRequestBack={navigateBackward}
/>
```

---

## 12) Review Notes (Component Architecture – Expert Guidance)
- Keep components dumb, steps smart: Let `integration-flow.json` decide what to render; components should react, not decide.
- One path to extend: Add a small component and a single mapping entry (either new screen or new inline tag). Avoid sprawling conditionals.
- Validate inputs: Use a Zod schema for the flow file; fail fast with a friendly error when authors make mistakes.
- Accessibility first: Preserve keyboard navigation and ARIA attributes on progress and menus as components evolve.
- Favor composition over flags: When adding variants, prefer composing small components rather than branching with props.
- Tighten quality gates before scaling: Add minimal tests around `AppContextProvider` navigation and the markdown transform; remove build ignores when stable. 