<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	const { title, children }: Props = $props();
</script>

<div class="space-y-6">
	{#if title}
		<h2 class="text-2xl md:text-3xl font-serif text-text-primary dark:text-text-primary-dark">
			{title}
		</h2>
	{/if}
	<div class="text-lg text-text-secondary dark:text-text-secondary-dark font-serif leading-relaxed space-y-4">
		{@render children()}
	</div>
</div>
