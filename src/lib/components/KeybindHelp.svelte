<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import Kbd from '$lib/components/ui/Kbd.svelte';
	import { keybindState, getModifierKey } from '$lib/keybinds.svelte';

	function close() {
		keybindState.closeHelp();
	}

	const groupedKeybinds = [
		{
			title: 'Navigation',
			items: [
				{ keys: 'G', description: 'Go to home' },
				{ keys: 'D', description: 'Go to dashboard' },
				{ keys: 'C', description: 'Go to courses' },
				{ keys: 'U', description: 'Go to your profile' },
				{ keys: 'F', description: 'Find users' }
			]
		},
		{
			title: 'Actions',
			items: [
				{ keys: `${getModifierKey()}K`, description: 'Open search' },
				{ keys: '/', description: 'Open search' },
				{ keys: '?', description: 'Show this help' },
				{ keys: 'ESC', description: 'Close modal' }
			]
		}
	];
</script>

<Modal onclose={close} open={keybindState.helpOpen}>
	<!-- Header -->
	<div class="px-4 py-3 border-b border-border-subtle dark:border-border-subtle-dark">
		<h2 class="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
			Keyboard Shortcuts
		</h2>
	</div>

	<!-- Content -->
	<div class="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
		{#each groupedKeybinds as group (group.title)}
			<div>
				<h3 class="text-xs font-sans font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-3">
					{group.title}
				</h3>
				<div class="space-y-2">
					{#each group.items as item (item.keys)}
						<div class="flex items-center justify-between">
							<span class="text-sm font-sans text-text-primary dark:text-text-primary-dark">
								{item.description}
							</span>
							<Kbd key={item.keys} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer -->
	<div class="px-4 py-3 border-t border-border-subtle dark:border-border-subtle-dark">
		<button
			class="w-full flex items-center justify-center gap-1 py-2 text-sm font-sans text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
			onclick={close}
			type="button"
		>
			Press <Kbd key="ESC" size="sm" /> to close
		</button>
	</div>
</Modal>
