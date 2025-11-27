<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		visible: boolean;
		children: Snippet;
	}

	const { visible, children }: Props = $props();
</script>

{#if visible}
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-300">
		{@render children()}
	</div>
{/if}
