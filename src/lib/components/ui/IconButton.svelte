<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		onclick?: () => void;
		children: Snippet;
	}

	const { label, onclick, children }: Props = $props();
</script>

<button
	class="p-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface dark:hover:bg-surface-dark rounded-lg transition-colors"
	aria-label={label}
	{onclick}
	type="button"
>
	{@render children()}
</button>
