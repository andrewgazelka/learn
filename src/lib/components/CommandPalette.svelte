<script lang="ts">
	import { goto } from '$app/navigation';
	import IconSearch from '~icons/lucide/search';
	import IconHome from '~icons/lucide/home';
	import IconLayoutDashboard from '~icons/lucide/layout-dashboard';
	import IconBookOpen from '~icons/lucide/book-open';
	import Modal from '$lib/components/ui/Modal.svelte';
	import Kbd from '$lib/components/ui/Kbd.svelte';
	import { keybindState } from '$lib/keybinds.svelte';

	let query = $state('');
	let inputEl: HTMLInputElement | undefined;

	const commands = [
		{ id: 'home', label: 'Go to Home', icon: IconHome, href: '/' },
		{ id: 'dashboard', label: 'Go to Dashboard', icon: IconLayoutDashboard, href: '/dashboard' },
		{ id: 'courses', label: 'Browse Courses', icon: IconBookOpen, href: '/courses' }
	];

	const filteredCommands = $derived(
		query !== ''
			? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
			: commands
	);

	function close() {
		query = '';
		keybindState.closeSearch();
	}

	function select(href: string) {
		close();
		void goto(href);
	}

	$effect(() => {
		if (keybindState.searchOpen && inputEl !== undefined) {
			inputEl.focus();
		}
	});
</script>

<Modal onclose={close} open={keybindState.searchOpen} size="lg">
	<!-- Search input -->
	<div class="flex items-center gap-3 px-4 border-b border-border-subtle dark:border-border-subtle-dark">
		<IconSearch class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
		<input
			bind:this={inputEl}
			class="flex-1 py-3 bg-transparent text-text-primary dark:text-text-primary-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark focus:outline-none font-sans"
			placeholder="Search..."
			type="text"
			bind:value={query}
		/>
		<Kbd key="ESC" />
	</div>

	<!-- Results -->
	<div class="max-h-80 overflow-y-auto p-2">
		{#each filteredCommands as command (command.id)}
			<button
				class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-text-primary dark:text-text-primary-dark hover:bg-surface dark:hover:bg-surface-dark transition-colors"
				onclick={() => { select(command.href); }}
				type="button"
			>
				<command.icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
				<span class="font-sans text-sm">{command.label}</span>
			</button>
		{/each}

		{#if filteredCommands.length === 0}
			<div class="px-3 py-8 text-center text-text-muted dark:text-text-muted-dark font-sans text-sm">
				No results found
			</div>
		{/if}
	</div>

	<!-- Footer hint -->
	<div class="flex items-center gap-1 px-4 py-2 border-t border-border-subtle dark:border-border-subtle-dark text-[11px] text-text-muted dark:text-text-muted-dark font-sans">
		<span class="opacity-70">Press</span>
		<Kbd key="?" size="sm" />
		<span class="opacity-70">for all shortcuts</span>
	</div>
</Modal>
