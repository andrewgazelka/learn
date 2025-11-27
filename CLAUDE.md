Important to make look good on desktop AND mobile

use hiearchical folder structure/etc

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Icons

**NEVER use emojis.** They are tacky and inconsistent across platforms. Always use unplugin-icons instead.

Use unplugin-icons: `import IconName from '~icons/{collection}/{icon}'` (e.g., `~icons/lucide/flame`). Browse at https://icones.js.org

**Choose HIGHLY SPECIFIC icons** that directly represent the content:
- Don't use generic icons like `book`, `star`, `check` when a more specific one exists
- For modules/lessons, pick icons that visually convey the topic (e.g., `newspaper` for media, `swords` for conflict/game-theory, `split` for framing/perspectives)
- Browse icones.js.org thoroughly - there are thousands of options
- When adding new icons to components, import them and add to the icon map in `ModuleNode.svelte`

## Course Illustrations

Every course MUST have an `illustration` field with a custom SVG component. These are displayed in course cards and headers.

- Create illustrations in `src/lib/components/illustrations/`
- Use minimal, abstract SVG art (see existing examples)
- Follow the design system colors: `stroke-text-primary`, `stroke-text-muted`, etc.
- Accept a `class` prop for sizing

## Keyboard Navigation (Vim/Superhuman inspired)

**THIS APP MUST BE 100% KEYBOARD NAVIGABLE.** Users should never need a mouse.

See `src/lib/keybinds.svelte.ts` for the registry.

**Global keybinds:**
- `⌘K` / `Ctrl+K` - Command palette / search
- `?` - Show all keyboard shortcuts
- `G` - Go home, `D` - Dashboard, `C` - Courses
- `ESC` - Close modals, exit lessons

**Lesson keybinds:**
- `Enter` / `Space` / `→` - Continue to next step
- `1`, `2`, `3`... - Select quiz/game options
- Number keys should ALWAYS work for selections

**Requirements for all interactive components:**
1. Show keyboard hints visually (e.g., `[1]` next to options)
2. All buttons must have keyboard equivalents
3. Focus states must be visible
4. Never require mouse clicks for progression

When adding features, always add corresponding keybinds. Use `getModifierKey()` to show platform-appropriate keys (⌘ on Mac, Ctrl on Windows).

## Interactive Lesson Design (Nicky Case style)

Lessons should be **discovery-based interactive experiences**, not passive reading. Inspired by https://ncase.me/trust/

**Core Principles:**
- **Play first, theory later** - Let users discover concepts through simulation before explaining
- **Show don't tell** - Minimal text, maximum interaction
- **Consequences matter** - User choices affect outcomes they can see
- **The "aha moment"** - Design for the moment when the user figures it out themselves
- **Progressive complexity** - Start dead simple, layer in complexity
- **Sandbox exploration** - Let users play freely after structured learning
- **Contrast cases** - Show when rules DON'T apply to deepen understanding

**Lesson Flow Pattern:**
1. Hook with a game/simulation (no explanation yet)
2. Let user play and form intuitions
3. Reveal the pattern through their own data
4. Name the concept (the "aha")
5. Formalize with math/definitions
6. Challenge with edge cases
7. Sandbox mode for exploration

**Game Mechanics to Use:**
- Prediction games (bet on outcomes, track accuracy)
- A/B comparisons (which strategy works better?)
- Parameter sliders (what happens if I change this?)
- Score tracking (creates investment)
- Streaks and combos (reward correct sequences)

## Gamification Philosophy

This platform uses research-backed gamification to drive genuine learning:

- **XP rewards learning behaviors**: Retrieval practice, identifying edge cases, explaining concepts earn more than passive consumption
- **Badges celebrate mastery**: "Identify 5 edge cases" over "Complete 100 lessons"
- **Forgiving streaks**: Auto-freeze, weekend grace, "total days" that never resets
- **No dark patterns**: No shame, no artificial urgency, no loss-framing
- **Veritasium-style depth**: Reward understanding edge cases and common misconceptions

### XP Values (for reference)
| Action | XP | Rationale |
|--------|-----|-----------|
| Recall without hints | 25 | Retrieval practice is most effective |
| Identify edge case | 40 | Deep understanding |
| Explain concept | 30 | Generation effect |
| Complete lesson | 10 | Basic completion |
| Spaced review bonus | 10 | Optimal retention timing |

### Badge Categories
1. **Depth**: Edge cases, misconceptions, connections
2. **Retention**: Spaced reviews, long-term recall
3. **Consistency**: Streaks with forgiveness
4. **Breadth**: Exploring multiple topics
5. **Teaching**: Explaining, helping others
