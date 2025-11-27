<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		level?: 2 | 3;
		children: Snippet;
	}

	const { level = 2, children }: Props = $props();
</script>

{#if level === 2}
	<h2 class="mt-16 mb-6 text-2xl font-serif text-text-primary dark:text-text-primary-dark">
		{@render children()}
	</h2>
{:else}
	<h3 class="mt-10 mb-4 text-xl font-serif text-text-primary dark:text-text-primary-dark">
		{@render children()}
	</h3>
{/if}
