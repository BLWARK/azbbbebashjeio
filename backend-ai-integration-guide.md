# Azura.finance — UI/UX Integration Guide for Backend AI

## 1. Introduction
This document serves as a strict guideline for any AI or developer tasked with integrating the backend, building RESTful APIs, or expanding the frontend of **Azura.finance**. The UI has been meticulously crafted to deliver a premium, "anti-mainstream", Web3-native experience.

**CRITICAL RULE:** Do not break the established aesthetic. Any new UI components must strictly follow the styling, layout, and color conventions established in this repository.

## 2. Tech Stack & Architecture
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4 + Vanilla CSS (`globals.css` and `index.css`)
- **State:** React Hooks (`useState`, `useEffect`)
- **Data:** Currently uses mock data located in `lib/mock-data.ts`.

## 3. Design System & Aesthetics
Azura uses a deep dark mode theme enriched with vibrant gradients and "Glassmorphism" (frosted glass) effects. You **must** reference `azura-color-system.md` for the exact hex codes.

### Key Visual Signatures:
1. **Glassmorphism:** Use semi-transparent backgrounds with background blurs for cards, overlays, and sticky headers.
   ```css
   /* Example Glass Effect */
   background: rgba(14, 17, 19, 0.4);
   backdrop-filter: blur(16px);
   border: 1px solid rgba(255, 255, 255, 0.08);
   ```
2. **Typography:** 
   - `var(--font-display)`: Used for large headings and the brand name.
   - `var(--font-mono)`: **MUST** be used for all numbers, prices, percentages, market caps, and wallet addresses. Add the `tabular-nums` Tailwind class to prevent number shifting during live updates.
3. **Gradients:** Use the Azura gradient (Teal `#22E0C8` to Blue `#3E7BF0` to Violet `#7B5BE0`) for primary buttons, active states, and massive hero text.
4. **Hydration Safety:** When formatting numbers, **do not** use `Number.prototype.toLocaleString()` directly in React renders as it causes Server-Side Rendering (SSR) hydration mismatches. Use the custom `formatNumber()` utility defined in `lib/mock-data.ts`.

## 4. Layout Structure
The application layout is fully responsive (Mobile, Tablet, Desktop) and is orchestrated via `AppShell.tsx`:
- **Sidebar (`Sidebar.tsx`):** 
  - Desktop: Expandable (220px) and Collapsible (64px). 
  - Mobile: Hidden by default, slides out as an absolute drawer overlay when the Hamburger menu is pressed.
- **Header (`Header.tsx`):** 
  - Contains the logo, mobile hamburger toggle, search bar, and wallet connection.
  - Features a continuous running `TickerTape` component at the very top.
- **Responsiveness:** All pages (Home, Token Detail, Create) use Flexbox and CSS Grid. Always ensure new pages stack gracefully into a single column (`flex-col`) on mobile (`< 768px`).

## 5. Backend Data Integration (RESTful API)
When replacing `lib/mock-data.ts` with real API endpoints, ensure the backend JSON payload matches the established TypeScript interfaces, particularly:

```typescript
export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  price: number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange4h: number;
  priceChange24h: number;
  volume24h: number;
  mcap: number;
  holders: number;
  bondingProgress: number; // 0 to 100
  createdAt: string;
  creator: string;
  contractAddress: string;
  tags: string[];
  type: string;
  avatarGradient: string;
}
```

### API Implementation Notes:
- **WebSockets / Polling:** Since this is a trading platform, token prices and changes will need real-time updates. When implementing SWR, React Query, or WebSockets, ensure that the rapid re-rendering of numbers does not cause layout shifts (enforced by `tabular-nums` and `var(--font-mono)`).
- **Pagination / Infinite Scroll:** The `TokenGrid` and `TokenTable` currently render all data. Backend integration must include cursor-based pagination or limits.

## 6. Golden Rules for the Backend AI
1. **Do not introduce generic UI libraries** (like MUI, Ant Design, or Bootstrap). Everything is custom-built with Tailwind and raw CSS.
2. **Do not use pure white (#FFFFFF) or pure black (#000000)** for backgrounds. Stick to the Azura dark palette (e.g., `#050708` for the main background, `#0E1113` for cards).
3. **If you modify a layout, check it on mobile.** The UI must always remain 100% horizontally contained without accidental horizontal scrollbars.
