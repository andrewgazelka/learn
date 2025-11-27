# Create Course/Module SVG Illustration

Create a minimal, grayscale SVG illustration component for a course or module.

## Requirements

1. **Style**: Super minimal, grayscale only (use `text-secondary`, `text-muted` Tailwind colors)
2. **Size**: Must be legible at small sizes (48x40 to 120x80 viewBox range)
3. **Simplicity**: 2-4 simple shapes maximum - circles, squares, lines, arrows
4. **No text**: Do not include text labels in the SVG (won't be legible)
5. **Semantic**: The shapes should abstractly represent the topic

## File Structure

Create the SVG as a Svelte component at:
```
src/lib/components/illustrations/{CourseName}Illustration.svelte
```

## Template

```svelte
<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<svg
	viewBox="0 0 120 80"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	aria-label="[Course Name]"
>
	<!-- Use stroke-text-secondary, stroke-text-muted for grayscale -->
	<!-- stroke-width="2" for main shapes, "1.5" for details -->
</svg>
```

## Example Topics → Shapes

- **RL/AI**: Circle (agent) + Square (environment) + arrows (feedback loop)
- **Math/Calculus**: Curve/wave + coordinate axes
- **Data Structures**: Nested boxes or connected nodes
- **Web Dev**: Browser frame outline + nested rectangles
- **Databases**: Stacked cylinders or table grid
- **Networking**: Connected dots/nodes

## Usage

After creating, import in the course data file:
```typescript
import {Name}Illustration from '$lib/components/illustrations/{Name}Illustration.svelte';

export const course: Course = {
  // ...
  illustration: {Name}Illustration,
};
```

---

**User request**: $ARGUMENTS
