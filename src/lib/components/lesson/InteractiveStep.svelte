<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		instruction: string;
		children: Snippet;
	}

	const { instruction, children }: Props = $props();
</script>

<div class="space-y-4">
	<div class="text-center">
		<span class="inline-block px-3 py-1 rounded-full bg-surface dark:bg-surface-dark text-sm font-sans text-text-muted dark:text-text-muted-dark">
			{instruction}
		</span>
	</div>
	<div class="p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark">
		{@render children()}
	</div>
</div>
