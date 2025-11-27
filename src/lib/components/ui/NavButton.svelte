<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	interface Props {
		href?: string;
		title?: string;
		onclick?: () => void;
		children: Snippet;
	}

	const { href, title, onclick, children }: Props = $props();
</script>

{#if href !== undefined}
	<a
		class="flex items-center gap-1.5 px-2.5 py-1.5 text-text-secondary dark:text-text-secondary-dark hover:bg-surface dark:hover:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark rounded-md transition-colors"
		href={resolve(href)}
		{title}
	>
		{@render children()}
	</a>
{:else}
	<button
		class="flex items-center gap-1.5 px-2.5 py-1.5 text-text-secondary dark:text-text-secondary-dark hover:bg-surface dark:hover:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark rounded-md transition-colors"
		{onclick}
		{title}
		type="button"
	>
		{@render children()}
	</button>
{/if}
