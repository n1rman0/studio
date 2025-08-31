# DocuProto – Architecture

## 1) System Overview
DocuProto delivers a guided, step‑by‑step documentation experience alongside a simulated app view. The right pane renders rich documentation driven by structured JSON; the left pane visualizes the corresponding UI state (device screens or panels). A lightweight global context coordinates state and navigation.

Key outcomes:
- Deterministic walkthrough sourced from `integration-flow.json`
- Clear two‑pane layout with keyboard and button navigation
- Content updates via data, not code changes

---

## 2) Technology Stack
- Framework: Next.js 15.3.3 (App Router), React 18.3.1, TypeScript 5
- Styling: Tailwind CSS 3.4.x, shadcn/radix primitives, Lucide icons
- State: React Context via `AppContextProvider`
- Charts/visuals: Recharts (available if needed)
- Tooling: ESLint, PostCSS, Turbopack (dev), Patch‑Package

---

## 3) High‑Level Architecture
```
┌───────────────────────────────────────────────────────────────────────┐
│                            Next.js App (UI)                           │
│  App Router                                                           │
│  ┌───────────────┐   ┌─────────────────────┐   ┌───────────────────┐ │
│  │  Top Nav      │   │  Left Pane          │   │   Right Pane      │ │
│  │  Progress     │   │  (Device/Panels)    │   │ (Documentation)   │ │
│  └───────────────┘   └─────────────────────┘   └───────────────────┘ │
│              \____________________  ____________________/             │
│                                   \/                                 │
│                        AppContextProvider (State)                     │
│             current step • next/back • restart • history              │
└───────────────────────────────────────────────────────────────────────┘
                 │                         │
                 │                         │ (content)
                 ▼                         ▼
          integration-flow.json  →  documentation.ts → IOS_DOCUMENTATION
                 │                         ▲
                 └────────────── transforms/markdown ┘
```

---

## 4) Directory Map (project‑level)
- `src/app/`
  - `layout.tsx` – global HTML shell, fonts, toaster
  - `page.tsx` – main two‑pane experience, landing, progress, nav, completion
  - `globals.css` – base styles
- `src/components/docuproto/`
  - Core: `AppContextProvider.tsx`, `DocumentationDisplay.tsx`, `LeftPane.tsx`, `RightPane.tsx`, `MobilePhone.tsx`, `ProgressBar.tsx`, `TopNavigation.tsx`, `NavigationMenu.tsx`
  - Panels: `ServerPanel.tsx`, `GoLivePanel.tsx`
  - Screens: `screens/` → `ProductDetailScreen`, `CheckoutScreen`, `SuccessScreen`
  - Utilities/Demos: `EmbeddedCodeSnippet.tsx`, `APIExampleTag.tsx`, examples
- `src/components/ui/` – shadcn UI primitives (e.g., `toaster`, `sidebar`, `dialog`, etc.)
- `src/data/`
  - `integration-flow.json` – authoritative step definitions
  - `documentation.ts` – validates and transforms markdown to HTML; exports `IOS_DOCUMENTATION`
  - `schema.ts` – Zod schemas/types for flow and left‑pane configs
  - `markdown.ts` – markdown→HTML utility
- `src/hooks/` – small utilities (`use-toast`, `use-mobile`)
- `src/lib/` – general utilities (`utils.ts`, `iconMap.ts`, `stepScreen.ts`)

Configs:
- `next.config.ts` – ignores TS/ESLint errors during build; image remote pattern
- `tailwind.config.ts` – theme, fonts (`Nunito`), animations, content scan
- `apphosting.yaml` – Firebase App Hosting (maxInstances=1)
- `package.json` – scripts: `dev`, `build`, `start`

---

## 5) Runtime Behavior
- Boot & Layout
  - `Nunito` font loaded in `layout.tsx`; `Toaster` globally mounted
  - App is predominantly client‑side for interactivity
- Navigation
  - Buttons for Back/Next; keyboard: Left/Right arrows (guarded for inputs)
  - `ProgressBar` reflects the index within `IOS_DOCUMENTATION`
  - Completion triggers `CongratulationsModal` with restart capability
- Left Pane (Visualization)
  - If step.left.type == `device`: `MobilePhone` renders one of three screens (Product, Checkout, Success) based on the step’s `asset` hint
  - Overlays supported: spinner, banner, CTA disabled, badges
  - If step.left.component is present: render `ServerPanel` or `GoLivePanel`
- Right Pane (Documentation)
  - `DocumentationDisplay` renders HTML produced by `documentation.ts` from step markdown
  - API examples are rendered via reusable `APIDocumentation` with types exported, typically through `<APIExample/>` tag (`APIExampleTag.tsx`)

---

## 6) Data Model & Content Flow
- Source of truth: `src/data/integration-flow.json`
  - For each step: `id`, `title`, `left` (visualization meta), `right_md` (markdown instructions)
- Validation & Transform: `src/data/documentation.ts`
  - Validates flow with Zod schema
  - Parses markdown → HTML (basic headings, lists, code blocks, inline code, quotes)
  - Enriches with `iconName`
  - Exports array `IOS_DOCUMENTATION` consumed by UI

---

## 7) State Management
- `AppContextProvider`
  - `currentDocSection`, `navigateForward`, `navigateBackward`, `restartPrototype`
  - `interactionHistory` (last 5 actions), basic `addInteraction`

---

## 8) Security, Privacy, Compliance
- Fonts via Google Fonts; standard web exposure only
- No auth or PII storage in current scope
- TypeScript + simple validation for content structure

---

## 9) Performance & Reliability
- Dev: Turbopack for fast HMR; memoized left‑pane props to reduce re‑renders
- Build: Code splitting via App Router; image domains restricted (placeholder)
- Known tradeoff: `next.config.ts` ignores TS/ESLint errors at build time (fast iteration, lower safety)
- Opportunities:
  - Add React profiling and memoization to heavy UI primitives if needed
  - Pre‑sanitize/compile markdown to reduce runtime string ops if content grows

---

## 10) Extensibility
- Content
  - Add/update steps by editing only `integration-flow.json`
  - Extend markdown processor for tables, images, admonitions
- Visualization
  - Add screen types in `MobilePhone` and map via step metadata
  - Add more panel types (`component` switch) for admin/console flows
- Configuration
  - Move product‑wide constants into a `src/config/` module if needed
- Quality
  - Introduce unit tests for `documentation.ts` and `AppContextProvider`
  - Turn off `ignoreBuildErrors` and `ignoreDuringBuilds` when hardening

---

## 11) Deployment
- Local
  - `npm run dev` → Next + Turbopack on port 9002
- Build/Run
  - `npm run build` → Next build
  - `npm start` → Next start
- Hosting
  - Firebase App Hosting (`apphosting.yaml`, `maxInstances: 1` initially)

---

## 12) Known Gaps
- No comprehensive test suite yet
- Build ignores TS/ESLint errors; helpful now, risky later
- Analytics/telemetry not instrumented

---

## 13) Review Notes (Architect’s Simplified Guidance)
- Make content the product: Keep the walkthrough entirely data‑driven. Owners should only touch `integration-flow.json` for most updates.
- Treat visuals as views: Left pane renders whatever the step describes. Add small, well‑named view components instead of branching logic.
- Strengthen typing at the edges: Validate `integration-flow.json` with Zod to catch authoring mistakes early.
- Turn safety back on before launch: Remove `ignoreBuildErrors`/`ignoreDuringBuilds`, add minimal tests for state and markdown transform.
- Centralize configuration: Use a small `src/config/` module when new constants emerge.
- Keep performance boring: Memoize obvious hotspots, avoid premature optimizations. Measure first if content or UI grows.
- Ship a steady path to “Done”:
  1) Validate data schema → 2) Remove build ignores → 3) Add tests for navigation and transform → 4) Add basic telemetry. 