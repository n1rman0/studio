# Product Requirement Review (PRR) – DocuProto

## 1. Purpose
DocuProto is an interactive documentation experience that pairs a prototype-like left pane with contextual, step-based documentation on the right. It is designed primarily for SDK integration walkthroughs (e.g., payments/checkout), enabling developers to follow a narrative and see corresponding UI and state transitions.

## 2. Goals
- Provide a guided, step-by-step documentation flow sourced from structured content (`src/data/integration-flow.json`).
- Allow users to navigate steps via UI controls and keyboard arrows.
- Render rich documentation (headings, lists, code blocks) with a consistent design system.
- Simulate prototype interactions and app states on the left pane (device screens, server console, go-live checklist).

## 3. Non-Goals
- Live editing/authoring of documentation in the UI.
- Full-fledged CMS or real-time collaboration.
- Live Figma embed or AI integrations (deprecated in current scope).

## 4. Primary Users
- Developer integrating an SDK (main persona).
- PM/Tech Writer reviewing integration steps and handoff material.
- Designer validating UI/UX fidelity of the walkthrough.

## 5. User Stories
- As a developer, I can see a landing page and start a guided integration walkthrough.
- As a developer, I can use Next/Back buttons or keyboard arrows to navigate steps.
- As a developer, I can see a simulated device UI (or panels like server console / go-live checklist) that corresponds to the current documentation step.
- As a developer, I can see a progress indicator for the overall walkthrough.
- As a developer, I can restart the walkthrough when I finish.
- As a maintainer, I can update the flow by editing `src/data/integration-flow.json` (source of truth) without changing component logic.

## 6. Functional Requirements
- Left Pane
  - Device simulation with screens mapped from step metadata: `Product`, `Checkout`, `Success`.
  - Optional overlays: spinner, banner, CTA disabled state, badges.
  - Alternate panels: `ServerPanel` and `GoLivePanel` when the step’s left config indicates `component` instead of `device`.
- Right Pane
  - Documentation rendered from `integration-flow.json` through `src/data/documentation.ts` (markdown-to-HTML conversion), exposed as `IOS_DOCUMENTATION`.
- Navigation & State
  - Global context stored in `AppContextProvider` with fields and actions: current step, forward/back navigation, restart, interaction history.
  - Keyboard navigation: Left/Right arrows (ignored when focus is in inputs/content-editable elements).
  - Progress bar reflects index within `IOS_DOCUMENTATION`.
- Entry & Finish
  - `LandingPage` before the flow begins; `CongratulationsModal` at the end with restart option.
- Styling & Theming
  - Tailwind CSS with `Nunito` font from Google Fonts, set in `src/app/layout.tsx` and `tailwind.config.ts`.

## 7. Non-Functional Requirements
- Accessibility: aim for semantic HTML, keyboard support, adequate contrast, and screen-reader friendly markup where feasible.
- Performance: fast transitions and rendering; avoid unnecessary re-renders (memoized props for device panel).
- Reliability: navigation state should be deterministic and resilient to refreshes during the session.

## 8. Dependencies (current)
- Next.js 15.3.3 (App Router)
- React 18.3.1, TypeScript 5
- Tailwind CSS 3.4.x, Radix primitives via shadcn/ui components

## 9. Data Sources
- `src/data/integration-flow.json` – authoritative step definitions (title, left config, right markdown).
- `src/data/documentation.ts` – converts markdown to HTML and shapes `IOS_DOCUMENTATION` with metadata.

## 10. Risks & Constraints
- `next.config.ts` currently ignores TypeScript and ESLint build errors; helpful for velocity but can hide issues. Tightening should be part of hardening.
- Limited automated tests; manual verification currently required.

## 11. Acceptance Criteria
- Landing page displays and starts the flow.
- Left pane updates consistently with each step (device screens or panels) based on `integration-flow.json`.
- Right pane shows correctly rendered documentation with headings, lists, code blocks.
- Navigation via buttons and keyboard works; progress bar reflects position.
- Completion of last step shows the `CongratulationsModal` with a working restart.
- Content updates are possible by editing `integration-flow.json` only (no code changes needed for typical content updates).

## 12. Open Questions
- Do we need per-step analytics/telemetry and a storage backend for user progress?
- Should the markdown transform support tables/images/admonitions now or later? 