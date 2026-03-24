# PromptForge

A professional tool that transforms simple prompts into structured, framework-based prompts using proven methodologies like COSTAR, RISEN, RACE, RTF, and APE.

## Features

- **Framework Selection**: Choose from COSTAR, RISEN, RACE, RTF, APE, or let AUTO detect the best fit
- **Structured Output**: Get professionally formatted prompts with clear sections
- **History**: Automatically saves last 10 prompts to localStorage
- **Copy & Retry**: Easy copying of individual sections or entire prompt
- **Keyboard Shortcuts**: Cmd/Ctrl + Enter to submit
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vite (build tool)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           PROMPTFORGE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │   Header    │    │    Hero     │    │   Input Section     │ │
│  │  (fixed)    │    │  (animated) │    │                     │ │
│  └─────────────┘    └─────────────┘    │  ┌───────────────┐  │ │
│                                         │  │  PromptInput  │  │ │
│  ┌─────────────────────────────────┐   │  │  (auto-resize)│  │ │
│  │      History Sidebar            │   │  └───────────────┘  │ │
│  │  (collapsible, localStorage)    │   │  ┌───────────────┐  │ │
│  │                                 │   │  │FrameworkSelector│ │ │
│  │  ┌─────────────────────────┐   │   │  │  (pill tabs)  │  │ │
│  │  │     HistoryItem         │   │   │  └───────────────┘  │ │
│  │  │  (timestamp, preview)   │   │   │  ┌───────────────┐  │ │
│  │  └─────────────────────────┘   │   │  │  ForgeButton  │  │ │
│  └─────────────────────────────────┘   │  │ (loading dots)│  │ │
│                                         │  └───────────────┘  │ │
│                                         └─────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Output Section                            ││
│  │                                                              ││
│  │  ┌─────────────────────────────────────────────────────────┐ ││
│  │  │                    PromptResult                          │ ││
│  │  │  ┌─────────────┐  ┌─────────────────────────────────┐  │ ││
│  │  │  │FrameworkBadge│  │         PromptSection            │  │ ││
│  │  │  │  (colored)  │  │  ┌───────────────────────────┐  │  │ ││
│  │  │  └─────────────┘  │  │  label + content + copy   │  │  │ ││
│  │  │                   │  └───────────────────────────┘  │  │ ││
│  │  │                   │  ┌───────────────────────────┐  │  │ ││
│  │  │                   │  │  (staggered animation)    │  │  │ ││
│  │  │                   │  └───────────────────────────┘  │  │ ││
│  │  │                   └─────────────────────────────────┘  │ ││
│  │  │  [Copy All] [Copy Raw] [Retry]                          │ ││
│  │  └─────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

State Flow:
───────────
User Input → Local State → Forge Action → Mock API → Result State
                                              ↓
History Update ← localStorage ←───────────────┘

Component Hierarchy:
────────────────────
App
├── Header
├── HistorySidebar
│   └── HistoryItem[]
└── Main
    ├── Hero
    ├── InputSection
    │   ├── PromptInput
    │   ├── FrameworkSelector
    │   └── ForgeButton
    └── OutputSection (conditional)
        └── PromptResult
            ├── FrameworkBadge
            ├── PromptSection[]
            └── ActionBar
```

## Custom Hooks

- `useLocalStorage`: Persist state to localStorage
- `useAutoResize`: Auto-resize textarea based on content
- `useCopy`: Clipboard copy with success feedback

## Frameworks

### COSTAR
- **Context**: Background information
- **Objective**: Specific goal
- **Style**: Writing approach
- **Tone**: Emotional quality
- **Audience**: Target readers
- **Response**: Output format

### RISEN
- **Role**: AI persona
- **Input**: Data provided
- **Steps**: Sequence to follow
- **Expectation**: Desired outcome
- **Narrowing**: Constraints

### RACE
- **Role**: AI persona
- **Action**: What to do
- **Context**: Background info
- **Expectation**: Success criteria

### RTF
- **Role**: AI persona
- **Task**: What to accomplish
- **Format**: Output structure

### APE
- **Action**: Specific task
- **Purpose**: Why it matters
- **Expectation**: Success metrics

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

### Colors
- Background Primary: `#0a0a0f`
- Background Secondary: `#12121a`
- Text Primary: `#e8e8e0`
- Text Secondary: `#9090a0`
- Accent: `#6EE7B7`
- Border: `#2a2a35`

### Typography
- Headings: Space Mono
- Body: Inter
- Code: JetBrains Mono

### Spacing
- 8pt grid system
- Generous whitespace
- 4px border radius (minimal)

## License

MIT
