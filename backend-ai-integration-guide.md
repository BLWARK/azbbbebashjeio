# Azura.finance — Fullstack AI UI/UX Blueprint

## Introduction for the Fullstack AI
Hello AI! The human user has spent significant time finalizing the frontend design and UI architecture for **Azura.finance**. You are tasked with taking over this codebase as a Fullstack developer to integrate the backend, database, and APIs.

**CRITICAL INSTRUCTION:** Your primary constraint is to **PRESERVE THE EXACT UI/UX AND AESTHETICS** we have built. You must not overwrite the visual design with generic templates, nor should you change the established layout behaviors. If you need to recreate parts of the UI, use this document as your absolute source of truth.

---

## 1. The Core Aesthetic (Do Not Deviate)
Azura is a premium, Web3-native platform. It relies on deep dark mode, vibrant gradients, and heavy use of Glassmorphism.

* **Main Background:** `#050708`
* **Surface/Card Backgrounds:** `#0E1113` (often with `rgba(14, 17, 19, 0.4)` and backdrop blur for glass).
* **Borders:** `#1F262A` (or `rgba(255, 255, 255, 0.08)` for glass components).
* **Text:** `#E8EEF0` (Primary), `#647079` (Secondary).
* **Brand Gradients:** 
  - Primary Azura Glow: `linear-gradient(135deg, #22E0C8 0%, #2FC8E8 40%, #3E7BF0 72%, #7B5BE0 100%)`
  - Used for buttons, active states, and massive text headlines.

### Typography Rules
* Use `var(--font-display)` for large Headers (e.g., Hero text, Token Names).
* **CRITICAL:** Use `var(--font-mono)` combined with Tailwind's `tabular-nums` for **ALL** numbers (prices, market caps, percentages, volume). This prevents layout shifting when data updates in real-time.

---

## 2. The Anti-Mainstream Hero Section
The Hero section on the Home page is not a standard layout. It was custom-designed to be highly immersive:
1. **Mega Typography:** The text "Launch. Trade. Dominate." is centered, massive (`text-4xl sm:text-7xl`), and uses the brand gradient with a glowing text shadow (`text-shadow: 0 0 40px rgba(34, 224, 200, 0.4)`).
2. **Background Grid:** Uses a CSS `linear-gradient` to draw grid lines (`background-size: 40px 40px`), which is then faded out at the edges using a `mask-image: radial-gradient(circle at center, black 10%, transparent 80%)`.
3. **Animated Orbs:** Two massive absolute `div`s with radial gradients (Teal and Blue) are placed in the center behind the text. They use a custom `@keyframes pulseGlow` to slowly scale and change opacity, acting as a breathing ambient light.
4. **Glass Stats Bar:** A frosted glass bar spans the bottom of the hero, displaying global stats in a flex container that wraps gracefully on mobile.

---

## 3. Layout & Navigation Architecture
The layout is wrapped in an `AppShell.tsx` which manages the Sidebar and Header.
* **Sidebar:** 
  * Desktop: Uses CSS width transitions (`0.25s cubic-bezier`) to expand to `220px` and collapse to `64px`. The toggle button sits at the very top, directly above the logo.
  * Mobile: The sidebar is absolutely positioned (`fixed inset-y-0`) and hidden off-screen (`-translate-x-full`). It slides in when triggered, protected by a darkened background overlay.
  * Logo: The logo dynamically swaps between the small icon (`Azura_icons.png`) and the full text logo (`Azura logo.png`) depending on the `isExpanded` state.
* **Header:** 
  * Contains a running `TickerTape` at the absolute top.
  * Features a hamburger menu button (visible only on `md:hidden`) that triggers the mobile sidebar drawer.

---

## 4. Responsive & Mobile Rules
The UI is fully responsive. When building new features or modifying existing ones, adhere to these mobile rules:
1. **Forms (Create Token):** Two-column input grids (`grid-cols-2`) must collapse to a single column on mobile (`grid-cols-1 sm:grid-cols-2`).
2. **Token Detail Page:** The layout is side-by-side on desktop (`lg:flex-row`). On mobile, the right column (Trade Widget) **must** drop below the chart (`flex-col`), taking up full width (`w-full lg:w-[300px]`).
3. **Token Table:** Do not hide columns on mobile. Instead, wrap the table in a container with `min-w-[960px]` inside a parent `overflow-x-auto w-full` div to allow horizontal scrolling on small screens.
4. **Token Grid:** The grid dynamically scales: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.

---

## 5. Hydration & Server-Side Rendering
When replacing the mock data with real REST API endpoints:
* **Never use `Number.prototype.toLocaleString()` directly in a React component.** The locale difference between the Node.js server and the user's browser will trigger a React hydration error.
* Always use the custom formatting utilities provided in the project (e.g., `formatNumber()`, `formatMcap()`) which manage hydration safely.

**Good luck, AI! Maintain this design integrity at all costs while you wire up the backend.**

---

## 6. Real-Time Animations & Websockets
The frontend is already configured with components that react to live data updates:
1. **Flashing Numbers (`LiveNumber.tsx`):** We use a custom component for numerical data (Market Cap, Price, %, Progress). Whenever the prop `value` changes, the component automatically flashes green (if increased) or red (if decreased) before fading out. You do NOT need to manage this state; simply pass the new numbers from your websocket/backend and the UI will animate itself.
2. **Smooth Layout Shifts (`TokenGrid.tsx`):** The grid uses `framer-motion`'s `<motion.div layout>` to animate cards swapping positions. When replacing our mock shuffle interval with a real backend sorting mechanism (e.g., top trending tokens), just update the React state array. Framer Motion will automatically handle the buttery smooth glide animations.

---

## 7. Token Images & Avatars
The `TokenCard`, `TokenTable`, and `TokenHeader` components have been updated to accept actual image paths instead of CSS gradients.
* The `Token` interface now includes `imageSrc?: string`.
* The `Avatar` component accepts a `src` prop which renders an `<img>`.
* When writing the backend, ensure your database/API returns a valid URL string for `imageSrc` (pointing to AWS S3, IPFS, or local `/public` files).
