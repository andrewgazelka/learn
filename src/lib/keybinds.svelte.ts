import { browser } from '$app/environment';

export type KeybindAction =
	| 'search'
	| 'help'
	| 'home'
	| 'dashboard'
	| 'courses'
	| 'escape';

export interface Keybind {
	key: string;
	meta?: boolean; // Cmd on Mac, Ctrl on Windows/Linux
	shift?: boolean;
	action: KeybindAction;
	description: string;
}

export const keybinds: Keybind[] = [
	{ key: 'k', meta: true, action: 'search', description: 'Search' },
	{ key: '/', action: 'search', description: 'Search' },
	{ key: '?', shift: true, action: 'help', description: 'Show keyboard shortcuts' },
	{ key: 'g', action: 'home', description: 'Go home' },
	{ key: 'd', action: 'dashboard', description: 'Go to dashboard' },
	{ key: 'c', action: 'courses', description: 'Go to courses' },
	{ key: 'Escape', action: 'escape', description: 'Close modal / Cancel' }
];

// Detect platform
export const isMac = browser ? navigator.platform.toUpperCase().includes('MAC') : false;

// Get display key for modifier
export function getModifierKey(): string {
	return isMac ? '⌘' : 'Ctrl';
}

// Format keybind for display
export function formatKeybind(keybind: Keybind): string {
	const parts: string[] = [];
	if (keybind.meta) parts.push(getModifierKey());
	if (keybind.shift) parts.push('Shift');
	parts.push(keybind.key.toUpperCase());
	return parts.join(isMac ? '' : '+');
}

// Global keybind state
class KeybindState {
	searchOpen = $state(false);
	helpOpen = $state(false);

	openSearch() {
		this.searchOpen = true;
	}

	closeSearch() {
		this.searchOpen = false;
	}

	openHelp() {
		this.helpOpen = true;
	}

	closeHelp() {
		this.helpOpen = false;
	}

	closeAll() {
		this.searchOpen = false;
		this.helpOpen = false;
	}
}

export const keybindState = new KeybindState();

// Check if event matches keybind
export function matchesKeybind(event: KeyboardEvent, keybind: Keybind): boolean {
	const metaMatch = keybind.meta ? (isMac ? event.metaKey : event.ctrlKey) : true;
	const shiftMatch = keybind.shift ? event.shiftKey : !event.shiftKey;
	const keyMatch = event.key.toLowerCase() === keybind.key.toLowerCase();

	return metaMatch && shiftMatch && keyMatch;
}
