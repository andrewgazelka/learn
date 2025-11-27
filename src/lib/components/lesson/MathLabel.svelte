<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { MathHighlightContext } from './InteractiveMath.svelte';

	interface Props {
		/** The part ID to highlight (e.g., 'history', 'current', 'next') */
		part: string;
		/** The content to display */
		children: Snippet;
	}

	const { part, children }: Props = $props();

	const context = getContext<MathHighlightContext>('math-highlight');

	function handleMouseEnter() {
		context?.setActivePart(part);
	}

	function handleMouseLeave() {
		context?.setActivePart(null);
	}

	function handleFocus() {
		context?.setActivePart(part);
	}

	function handleBlur() {
		context?.setActivePart(null);
	}

	const isActive = $derived(context?.activePart === part);
</script>

<span
	class="math-label"
	class:active={isActive}
	data-part={part}
	role="button"
	tabindex="0"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onfocus={handleFocus}
	onblur={handleBlur}
>
	{@render children()}
</span>

<style>
	.math-label {
		cursor: pointer;
		transition: all 0.15s ease;
		border-radius: 4px;
		padding: 0 4px;
		margin: 0 -4px;
		font-weight: 500;
	}

	.math-label:hover,
	.math-label:focus {
		outline: none;
	}

	/* Color coding to match the math highlights */
	.math-label[data-part='history'] {
		color: rgb(220, 38, 38);
	}

	.math-label[data-part='history']:hover,
	.math-label[data-part='history'].active {
		background: rgba(239, 68, 68, 0.15);
	}

	.math-label[data-part='current'] {
		color: rgb(22, 163, 74);
	}

	.math-label[data-part='current']:hover,
	.math-label[data-part='current'].active {
		background: rgba(34, 197, 94, 0.15);
	}

	.math-label[data-part='next'] {
		color: rgb(37, 99, 235);
	}

	.math-label[data-part='next']:hover,
	.math-label[data-part='next'].active {
		background: rgba(59, 130, 246, 0.15);
	}

	.math-label[data-part='left'] {
		color: rgb(147, 51, 234);
	}

	.math-label[data-part='left']:hover,
	.math-label[data-part='left'].active {
		background: rgba(168, 85, 247, 0.15);
	}

	.math-label[data-part='right'] {
		color: rgb(234, 88, 12);
	}

	.math-label[data-part='right']:hover,
	.math-label[data-part='right'].active {
		background: rgba(249, 115, 22, 0.15);
	}

	/* Dark mode */
	:global(.dark) .math-label[data-part='history'] {
		color: rgb(248, 113, 113);
	}

	:global(.dark) .math-label[data-part='current'] {
		color: rgb(74, 222, 128);
	}

	:global(.dark) .math-label[data-part='next'] {
		color: rgb(96, 165, 250);
	}

	:global(.dark) .math-label[data-part='left'] {
		color: rgb(192, 132, 252);
	}

	:global(.dark) .math-label[data-part='right'] {
		color: rgb(251, 146, 60);
	}
</style>
