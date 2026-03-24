# PromptForge — Design Document

---

## Part 1: Visual Design System

### Overview

PromptForge follows a **dark editorial developer tool aesthetic** — minimal, precise, and functional. The design prioritizes:

- **High contrast**: Near-black backgrounds with off-white text
- **Generous whitespace**: Content breathes with ample padding
- **Sharp geometry**: Minimal rounding (2-4px), clean lines
- **Subtle depth**: 1px borders, not shadows
- **Developer-focused**: Code-like presentation of prompts

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0f` | Main background |
| `--bg-secondary` | `#12121a` | Cards, sections |
| `--bg-tertiary` | `#1a1a24` | Hover states, inputs |
| `--text-primary` | `#e8e8e0` | Headings, primary text |
| `--text-secondary` | `#9090a0` | Labels, muted text |
| `--text-tertiary` | `#606070` | Placeholders, disabled |
| `--accent` | `#6EE7B7` | Primary accent (teal) |
| `--accent-dim` | `#4ade80` | Secondary accent |
| `--border` | `#2a2a35` | Borders, dividers |
| `--border-hover` | `#3a3a48` | Hover borders |

### Typography System

**Font Families:**
- **Headings**: `Space Mono` — monospace with character
- **Body/UI**: `Inter` — clean, readable
- **Code/Prompts**: `JetBrains Mono` — excellent for structured text

**Type Scale:**

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 (Hero) | Space Mono | 48px | 700 | 1.1 |
| H2 | Space Mono | 24px | 600 | 1.3 |
| H3 | Space Mono | 18px | 600 | 1.4 |
| Body | Inter | 16px | 400 | 1.6 |
| Small | Inter | 14px | 400 | 1.5 |
| Code | JetBrains Mono | 14px | 400 | 1.7 |
| Label | Inter | 12px | 500 | 1.4 |

### Spacing System

**8pt Grid:**
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-5`: 24px
- `space-6`: 32px
- `space-7`: 48px
- `space-8`: 64px
- `space-9`: 96px

**Section Spacing:**
- Between major sections: 64-96px
- Within sections: 24-48px
- Component internal: 16-24px

### Component Primitives

**Buttons:**
- Primary: Solid accent background, dark text, 2px radius
- Secondary: Transparent with border, 2px radius
- Height: 44px
- Padding: 16px 24px
- Font: Space Mono, 14px, 600 weight

**Inputs:**
- Background: `--bg-tertiary`
- Border: 1px solid `--border`
- Radius: 4px
- Focus: Accent border glow (no outline)

**Cards:**
- Background: `--bg-secondary`
- Border: 1px solid `--border`
- Radius: 4px
- No shadow

**Badges:**
- Small pill shape
- Border: 1px solid
- Font: JetBrains Mono, 11px, uppercase

---

## Part 2: Global Animations & Interactions

### Page Load Animation

**Sequence:**
1. Background fades in (0ms, 300ms duration)
2. Header slides down (100ms delay, 400ms duration)
3. Hero content staggers in (200ms delay, 500ms duration)
   - Headline first
   - Subtext second
   - Input area third

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)

### Smooth Scroll

- Native smooth scroll behavior
- No scroll-triggered animations (single-page app)

### Common Hover Patterns

**Buttons:**
- Scale: 1 → 1.02
- Background lightens 10%
- Duration: 150ms
- Easing: `ease-out`

**Cards/Blocks:**
- Border color: `--border` → `--border-hover`
- Duration: 200ms

**Links:**
- Underline slides in from left
- Duration: 200ms

### Technical Specs

- **Primary easing**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Quick easing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Standard duration**: 200-300ms
- **Stagger delay**: 50-100ms
- **Performance**: Use `transform` and `opacity` only

---

## Part 3: Content Sections

### Section: Header

**Layout & Style:**
- Fixed position, full width
- Height: 64px
- Background: `--bg-primary` with 80% opacity, blur backdrop
- Border-bottom: 1px solid `--border`
- Padding: 0 32px
- Flex layout: space-between

**Content:**
- Left: Logo ("PromptForge" in Space Mono)
- Right: Nav links (About, GitHub)

**Interactions:**
- Logo hover: Accent color pulse
- Nav links: Underline slide animation

---

### Section: Hero

**Layout & Style:**
- Full width, centered content
- Max-width for content: 800px
- Padding: 128px 32px 64px
- Text-align: center

**Content:**
- Headline: "Your prompt. Engineered."
- Subtext: "Transform simple ideas into professional, structured prompts using proven frameworks."

**Interactions:**
- Staggered fade-in on load
- Headline: slight Y translate (20px → 0)

---

### Section: Input Area

**Layout & Style:**
- Max-width: 800px, centered
- Padding: 0 32px

**Components:**

1. **Textarea (`<PromptInput />`)**
   - Auto-resize based on content
   - Min-height: 120px
   - Max-height: 400px
   - Background: `--bg-tertiary`
   - Border: 1px solid `--border`
   - Font: JetBrains Mono, 14px
   - Placeholder: "Describe what you want to achieve..."
   - Character counter bottom-right

2. **Framework Selector (`<FrameworkSelector />`)**
   - Horizontal pill tabs
   - Options: AUTO, COSTAR, RISEN, RACE, RTF, APE
   - Active: Solid background, accent border
   - Inactive: Transparent, border only

3. **Forge Button (`<ForgeButton />`)**
   - Full width on mobile, auto on desktop
   - Height: 52px
   - Loading state: Animated dots (...)
   - Keyboard shortcut: Cmd+Enter hint

**Interactions:**
- Textarea focus: Border glow with accent color
- Framework tabs: Sliding indicator animation
- Button hover: Scale up, background shift
- Button loading: Dots pulse animation

---

### Section: Output Area

**Layout & Style:**
- Max-width: 800px, centered
- Margin-top: 48px
- Padding: 0 32px

**Components:**

1. **Framework Badge (`<FrameworkBadge />`)**
   - Small pill showing selected framework
   - Color-coded per framework
   - Position: Top-left of result

2. **Prompt Result (`<PromptResult />`)**
   - Card container
   - Sectioned blocks for each framework component
   - Each block: Label + Content
   - Collapsible/expandable sections
   - Copy button per section

3. **Action Bar**
   - [Copy All] [Copy Raw] [Retry]
   - Horizontal layout, right-aligned

**Interactions:**
- Result card: Fade + slide in (y: 30px → 0)
- Sections: Staggered entrance (100ms delay each)
- Copy buttons: Success feedback (checkmark flash)
- Expand/collapse: Smooth height transition

**Content Structure (per framework):**

**COSTAR:**
- Context
- Objective
- Style
- Tone
- Audience
- Response

**RISEN:**
- Role
- Input
- Steps
- Expectation
- Narrowing

**RACE:**
- Role
- Action
- Context
- Expectation

**RTF:**
- Role
- Task
- Format

**APE:**
- Action
- Purpose
- Expectation

---

### Section: History Sidebar

**Layout & Style:**
- Collapsible panel
- Desktop: Left sidebar, 280px width
- Mobile: Bottom sheet
- Background: `--bg-secondary`
- Border: 1px solid `--border`

**Content:**
- Header: "History" with collapse toggle
- List: Last 10 prompts
- Each item: Truncated raw prompt + timestamp

**Interactions:**
- Collapse/expand: Smooth width/height transition
- Item hover: Background highlight
- Item click: Load into input
- Clear history option

---

## Part 4: Framework Definitions

### COSTAR (Context, Objective, Style, Tone, Audience, Response)

**Best for:** General-purpose prompts needing comprehensive structure

**Structure:**
- **Context**: Background information
- **Objective**: Specific goal
- **Style**: Writing approach
- **Tone**: Emotional quality
- **Audience**: Target readers
- **Response**: Output format

### RISEN (Role, Input, Steps, Expectation, Narrowing)

**Best for:** Process-oriented, step-by-step tasks

**Structure:**
- **Role**: AI persona
- **Input**: Data provided
- **Steps**: Sequence to follow
- **Expectation**: Desired outcome
- **Narrowing**: Constraints/limitations

### RACE (Role, Action, Context, Expectation)

**Best for:** Quick, action-focused prompts

**Structure:**
- **Role**: AI persona
- **Action**: What to do
- **Context**: Background info
- **Expectation**: Success criteria

### RTF (Role, Task, Format)

**Best for:** Simple, direct outputs

**Structure:**
- **Role**: AI persona
- **Task**: What to accomplish
- **Format**: Output structure

### APE (Action, Purpose, Expectation)

**Best for:** Goal-oriented prompts

**Structure:**
- **Action**: Specific task
- **Purpose**: Why it matters
- **Expectation**: Success metrics

---

## Part 5: Responsive Behavior

### Desktop (1024px+)
- Full layout as designed
- History sidebar visible by default
- Two-column potential for future expansion

### Tablet (768px - 1023px)
- History sidebar collapsible
- Same core layout
- Reduced padding

### Mobile (< 768px)
- History becomes bottom sheet
- Full-width buttons
- Stacked framework selector
- Reduced font sizes (H1: 36px)
- Increased touch targets (min 44px)

---
