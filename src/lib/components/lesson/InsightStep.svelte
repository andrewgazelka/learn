<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	const { title = 'Key Insight', children }: Props = $props();
</script>

<div class="p-6 rounded-xl bg-accent/5 border border-accent/20">
	<div class="flex items-center gap-2 mb-4">
		<span class="text-accent dark:text-accent-dark">💡</span>
		<span class="text-sm font-sans font-medium text-accent dark:text-accent-dark uppercase tracking-wider">
			{title}
		</span>
	</div>
	<div class="text-lg font-serif text-text-primary dark:text-text-primary-dark leading-relaxed">
		{@render children()}
	</div>
</div>
