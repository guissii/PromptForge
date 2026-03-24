# PromptForge — Technical Specification

---

## Component Inventory

### Custom Components (No UI Library)

| Component | Props | Description |
|-----------|-------|-------------|
| `PromptInput` | `value`, `onChange`, `onSubmit`, `placeholder` | Auto-resize textarea with char counter |
| `FrameworkSelector` | `value`, `onChange` | Horizontal pill tabs with animated indicator |
| `ForgeButton` | `loading`, `onClick`, `disabled` | Primary CTA with loading animation |
| `PromptResult` | `session`, `onCopy`, `onRetry` | Sectioned output with copy actions |
| `PromptSection` | `label`, `content`, `onCopy` | Individual framework section block |
| `FrameworkBadge` | `framework` | Color-coded framework identifier |
| `HistorySidebar` | `sessions`, `onSelect`, `onClear` | Collapsible history panel |
| `HistoryItem` | `session`, `onClick` | Single history entry |
| `CopyButton` | `text`, `onCopy` | Copy with success feedback |
| `Header` | - | App header with logo and nav |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| `useLocalStorage` | Persist history to localStorage |
| `usePromptForge` | Main business logic for prompt transformation |
| `useAutoResize` | Auto-resize textarea based on content |
| `useCopy` | Clipboard copy with success state |

---

## Animation Implementation Table

| Animation | Library | Implementation | Complexity |
|-----------|---------|----------------|------------|
| Page load stagger | Framer Motion | `motion.div` with `staggerChildren` | Medium |
| Header slide down | Framer Motion | `initial={{ y: -20 }}` `animate={{ y: 0 }}` | Low |
| Textarea focus glow | CSS | `box-shadow` transition on `:focus` | Low |
| Framework tab indicator | Framer Motion | `layoutId` for shared element | Medium |
| Button loading dots | CSS | Keyframe animation on pseudo-elements | Low |
| Result card entrance | Framer Motion | `AnimatePresence` + fade/slide | Medium |
| Section stagger | Framer Motion | `staggerChildren: 0.1` | Low |
| Copy success feedback | Framer Motion | Scale pulse + icon swap | Low |
| Sidebar collapse | Framer Motion | `animate={{ width }}` | Medium |
| Height transitions | Framer Motion | `animate={{ height: 'auto' }}` | Medium |

---

## Project File Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── PromptInput.tsx
│   ├── FrameworkSelector.tsx
│   ├── ForgeButton.tsx
│   ├── PromptResult.tsx
│   ├── PromptSection.tsx
│   ├── FrameworkBadge.tsx
│   ├── HistorySidebar.tsx
│   ├── HistoryItem.tsx
│   └── CopyButton.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── usePromptForge.ts
│   ├── useAutoResize.ts
│   └── useCopy.ts
├── types/
│   └── index.ts
├── utils/
│   ├── frameworks.ts
│   └── mockApi.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

---

## Dependencies

### Core
- `react` ^18.x
- `react-dom` ^18.x
- `typescript` ^5.x

### Animation
- `framer-motion` ^11.x

### Fonts
- `@fontsource/jetbrains-mono`
- `@fontsource/space-mono`
- `@fontsource/inter`

### Build
- `vite` ^5.x
- `tailwindcss` ^3.x

---

## State Management

### Local State (useState)
- Input textarea value
- Selected framework
- Loading state
- Current result
- Sidebar collapsed state

### Persisted State (localStorage)
- History sessions (last 10)

### State Flow
```
User Input → Local State → Forge Action → API/Mock → Result State → History Update → localStorage
```

---

## TypeScript Interfaces

```typescript
// types/index.ts

export type Framework = 'AUTO' | 'COSTAR' | 'RISEN' | 'RACE' | 'RTF' | 'APE';

export interface PromptSection {
  label: string;
  content: string;
}

export interface PromptSession {
  id: string;
  rawPrompt: string;
  framework: Framework;
  result: PromptSection[];
  timestamp: number;
}

export interface FrameworkConfig {
  id: Framework;
  name: string;
  description: string;
  sections: string[];
  color: string;
}
```

---

## Mock API Implementation

Since we don't have a real API key, we'll implement a mock service that:

1. Detects the best framework (if AUTO selected)
2. Generates structured sections based on the raw prompt
3. Returns realistic, context-aware content

**Framework Detection Logic:**
- Process-oriented keywords → RISEN
- Simple direct requests → RTF
- Goal-focused → APE
- Comprehensive needs → COSTAR
- Action-focused → RACE

---

## CSS Architecture

### Tailwind Config Extensions

```javascript
// tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a24',
        'text-primary': '#e8e8e0',
        'text-secondary': '#9090a0',
        'text-tertiary': '#606070',
        'accent': '#6EE7B7',
        'accent-dim': '#4ade80',
        'border': '#2a2a35',
        'border-hover': '#3a3a48',
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-dots': 'pulseDots 1.4s infinite',
      },
      keyframes: {
        pulseDots: {
          '0%, 80%, 100%': { opacity: 0 },
          '40%': { opacity: 1 },
        },
      },
    },
  },
}
```

---

## Performance Considerations

1. **Memoization**: Use `useMemo` for expensive transformations
2. **Callback stability**: Use `useCallback` for event handlers
3. **Animation performance**: Only animate `transform` and `opacity`
4. **LocalStorage**: Debounce writes to prevent thrashing
5. **Textarea**: Virtual scrolling not needed (max 400px)

---

## Accessibility

1. **Keyboard navigation**: Full tab support
2. **Focus indicators**: Visible focus rings
3. **ARIA labels**: All interactive elements labeled
4. **Color contrast**: WCAG AA compliant
5. **Reduced motion**: Respect `prefers-reduced-motion`

---
