<script lang="ts" module>
	export type MathHighlightContext = {
		activePart: string | null;
		setActivePart: (part: string | null) => void;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let activePart = $state<string | null>(null);

	setContext<MathHighlightContext>('math-highlight', {
		get activePart() {
			return activePart;
		},
		setActivePart: (part: string | null) => {
			activePart = part;
		}
	});
</script>

<div class="interactive-math" class:has-active={activePart !== null} data-active-part={activePart}>
	{@render children()}
</div>

<style>
	.interactive-math {
		/* Default: all parts have subtle styling */
		--math-highlight-opacity: 0;
		--math-dim-opacity: 1;
	}

	.interactive-math.has-active {
		/* When something is hovered, dim non-active parts */
		--math-dim-opacity: 0.4;
	}

	/* Global styles for math parts - applied via :global since KaTeX generates the HTML */
	.interactive-math :global(.math-part) {
		transition: all 0.15s ease;
		border-radius: 4px;
		padding: 0 2px;
		margin: 0 -2px;
	}

	/* Dim non-active parts when something is active */
	.interactive-math.has-active :global(.math-part) {
		opacity: var(--math-dim-opacity);
	}

	/* History part */
	.interactive-math[data-active-part='history'] :global(.mp-history) {
		background: rgba(239, 68, 68, 0.2);
		opacity: 1;
	}

	/* Current state part */
	.interactive-math[data-active-part='current'] :global(.mp-current) {
		background: rgba(34, 197, 94, 0.2);
		opacity: 1;
	}

	/* Next state part */
	.interactive-math[data-active-part='next'] :global(.mp-next) {
		background: rgba(59, 130, 246, 0.2);
		opacity: 1;
	}

	/* Generic parts (expandable) */
	.interactive-math[data-active-part='left'] :global(.mp-left) {
		background: rgba(168, 85, 247, 0.2);
		opacity: 1;
	}

	.interactive-math[data-active-part='right'] :global(.mp-right) {
		background: rgba(249, 115, 22, 0.2);
		opacity: 1;
	}

	/* Dark mode adjustments */
	:global(.dark) .interactive-math[data-active-part='history'] :global(.mp-history) {
		background: rgba(239, 68, 68, 0.3);
	}

	:global(.dark) .interactive-math[data-active-part='current'] :global(.mp-current) {
		background: rgba(34, 197, 94, 0.3);
	}

	:global(.dark) .interactive-math[data-active-part='next'] :global(.mp-next) {
		background: rgba(59, 130, 246, 0.3);
	}
</style>
