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

Use unplugin-icons: `import IconName from '~icons/{collection}/{icon}'` (e.g., `~icons/lucide/flame`). Browse at https://icones.js.org

## Keyboard Navigation (Vim/Superhuman inspired)

This app is keyboard-first. All major actions have keybinds. See `src/lib/keybinds.svelte.ts` for the registry.

**Core keybinds:**
- `⌘K` / `Ctrl+K` - Command palette / search
- `?` - Show all keyboard shortcuts
- `G` - Go home, `D` - Dashboard, `C` - Courses
- `ESC` - Close modals

When adding features, always add corresponding keybinds. Use `getModifierKey()` to show platform-appropriate keys (⌘ on Mac, Ctrl on Windows).

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
