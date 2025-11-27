<script lang="ts">
	import IconSearch from '~icons/lucide/search';
	import { keybindState, getModifierKey } from '$lib/keybinds.svelte';
</script>

<button
	class="w-full flex items-center gap-3 px-3 py-1.5 bg-surface dark:bg-surface-dark rounded-lg text-sm font-sans text-text-muted dark:text-text-muted-dark border border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark transition-colors"
	onclick={() => { keybindState.openSearch(); }}
	type="button"
>
	<IconSearch class="w-4 h-4" />
	<span class="flex-1 text-left">Search...</span>
	<kbd
		class="hidden sm:inline-flex px-1.5 py-0.5 text-[11px] bg-surface-elevated dark:bg-surface-elevated-dark border border-border-subtle dark:border-border-subtle-dark rounded"
	>
		{getModifierKey()}K
	</kbd>
</button>
