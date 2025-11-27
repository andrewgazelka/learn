<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<p class="my-6 text-lg font-serif leading-[1.8] text-text-primary dark:text-text-primary-dark">
	{@render children()}
</p>
