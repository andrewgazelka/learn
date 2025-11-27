<script lang="ts">
	import { goto } from '$app/navigation';
	import { keybindState, keybinds, matchesKeybind } from '$lib/keybinds.svelte';

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

		// Escape always works
		if (event.key === 'Escape') {
			keybindState.closeAll();
			return;
		}

		// Cmd/Ctrl+K always works (even in inputs) - this is standard behavior
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			keybindState.openSearch();
			return;
		}

		// Other keybinds only work outside inputs
		if (isInput) return;

		for (const keybind of keybinds) {
			// Skip search keybind (handled above) and escape
			if (keybind.action === 'search' || keybind.action === 'escape') continue;

			if (matchesKeybind(event, keybind)) {
				event.preventDefault();

				switch (keybind.action) {
					case 'help':
						keybindState.openHelp();
						break;
					case 'home':
						goto('/');
						break;
					case 'dashboard':
						goto('/dashboard');
						break;
					case 'courses':
						goto('/courses');
						break;
				}
				return;
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
