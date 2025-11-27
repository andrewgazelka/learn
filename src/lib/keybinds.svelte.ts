import { browser } from '$app/environment';

export type KeybindAction =
	| 'search'
	| 'help'
	| 'home'
	| 'dashboard'
	| 'courses'
	| 'escape'
	| 'resume'
	| 'nextLesson'
	| 'prevLesson';

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
	{ key: 'r', action: 'resume', description: 'Resume learning' },
	{ key: 'n', action: 'nextLesson', description: 'Next lesson' },
	{ key: 'p', action: 'prevLesson', description: 'Previous lesson' },
	{ key: 'Escape', action: 'escape', description: 'Close modal / Cancel' }
];

// Detect platform using userAgent (platform is deprecated)
export const isMac: boolean = browser
	? /Mac|iPhone|iPad|iPod/iu.test(navigator.userAgent)
	: false;

// Get display key for modifier
export function getModifierKey(): string {
	return isMac ? '⌘' : 'Ctrl';
}

// Format keybind for display
export function formatKeybind(keybind: Keybind): string {
	const parts: string[] = [];
	if (keybind.meta === true) parts.push(getModifierKey());
	if (keybind.shift === true) parts.push('Shift');
	parts.push(keybind.key.toUpperCase());
	return parts.join(isMac ? '' : '+');
}

// Global keybind state
class KeybindState {
	searchOpen: boolean = $state(false);
	helpOpen: boolean = $state(false);

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
	// If keybind requires meta, check meta/ctrl is pressed
	// If keybind does NOT require meta, ensure meta/ctrl is NOT pressed
	const metaPressed = isMac ? event.metaKey : event.ctrlKey;
	const metaMatch = keybind.meta === true ? metaPressed : !metaPressed;

	// Same for shift - if required, must be pressed; if not required, must NOT be pressed
	const shiftMatch = keybind.shift === true ? event.shiftKey : !event.shiftKey;

	// Also ensure alt/option is not pressed (for shortcuts like Alt+C)
	if (event.altKey) return false;

	// On Mac, also check Ctrl isn't pressed when we're checking metaKey
	// On non-Mac, check meta (Windows key) isn't pressed
	if (isMac && event.ctrlKey) return false;
	if (!isMac && event.metaKey) return false;

	const keyMatch = event.key.toLowerCase() === keybind.key.toLowerCase();

	return metaMatch && shiftMatch && keyMatch;
}
