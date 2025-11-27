<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		count?: number;
		show?: boolean;
		dot?: boolean;
		children: Snippet;
	}

	const { count, show = true, dot = false, children }: Props = $props();

	const shouldShow = $derived(show && (dot || (count !== undefined && count > 0)));
</script>

<div class="relative inline-flex">
	{@render children()}

	{#if shouldShow}
		{#if dot}
			<span
				class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent dark:bg-accent-dark rounded-full ring-2 ring-surface-elevated dark:ring-surface-elevated-dark"
			></span>
		{:else if count !== undefined}
			<span
				class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-accent dark:bg-accent-dark text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center ring-2 ring-surface-elevated dark:ring-surface-elevated-dark"
			>
				{count > 99 ? '99+' : count}
			</span>
		{/if}
	{/if}
</div>
