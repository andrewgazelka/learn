<script lang="ts">
	import type { Snippet } from 'svelte';
	import { keybindState } from '$lib/keybinds.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconX from '~icons/lucide/x';
	import Kbd from '$lib/components/ui/Kbd.svelte';

	interface Props {
		totalSteps: number;
		blockingSteps?: number[];
		courseSlug?: string;
		children: Snippet<[{
			currentStep: number;
			canAdvance: boolean;
			advance: () => void;
			goBack: () => void;
			unblock: () => void;
		}]>;
	}

	const { totalSteps, blockingSteps = [], courseSlug, children }: Props = $props();

	// Generate a unique key for this lesson based on URL path
	function getLessonKey(): string {
		return `lesson-progress:${$page.url.pathname}`;
	}

	// Load saved progress from localStorage
	function loadProgress(): { step: number; unlocked: number[] } {
		if (!browser) return { step: 0, unlocked: [] };
		try {
			const saved = localStorage.getItem(getLessonKey());
			if (saved) {
				const data = JSON.parse(saved);
				return {
					step: Math.min(data.step ?? 0, totalSteps - 1),
					unlocked: data.unlocked ?? []
				};
			}
		} catch {}
		return { step: 0, unlocked: [] };
	}

	// Save progress to localStorage
	function saveProgress(step: number, unlocked: Set<number>) {
		if (!browser) return;
		try {
			localStorage.setItem(getLessonKey(), JSON.stringify({
				step,
				unlocked: [...unlocked]
			}));
		} catch {}
	}

	// Initialize from URL hash or localStorage
	function getInitialStep(): number {
		if (!browser) return 0;

		// First check URL hash
		const hash = window.location.hash;
		if (hash) {
			const hashStep = parseInt(hash.slice(1), 10);
			if (!isNaN(hashStep) && hashStep >= 0 && hashStep < totalSteps) {
				return hashStep;
			}
		}

		// Fall back to localStorage
		return loadProgress().step;
	}

	let currentStep = $state(getInitialStep());
	let unlockedSteps = $state(new Set<number>(loadProgress().unlocked));

	// Sync step changes to URL hash and localStorage
	$effect(() => {
		if (!browser) return;

		// Update URL hash without adding history entry
		const newHash = `#${currentStep}`;
		if (window.location.hash !== newHash) {
			history.replaceState(null, '', newHash);
		}

		// Save to localStorage
		saveProgress(currentStep, unlockedSteps);
	});

	// Listen for hash changes (browser back/forward)
	$effect(() => {
		if (!browser) return;

		function handleHashChange() {
			const hash = window.location.hash;
			if (hash) {
				const hashStep = parseInt(hash.slice(1), 10);
				if (!isNaN(hashStep) && hashStep >= 0 && hashStep < totalSteps) {
					// Only allow going to steps user has legitimately reached
					const maxReachable = Math.max(currentStep, ...unlockedSteps, 0);
					currentStep = Math.min(hashStep, maxReachable + 1);
				}
			}
		}

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	});

	const canAdvance = $derived(
		!blockingSteps.includes(currentStep) || unlockedSteps.has(currentStep)
	);

	const isLastStep = $derived(currentStep === totalSteps - 1);

	function advance() {
		if (!canAdvance) return;
		if (currentStep < totalSteps - 1) {
			currentStep++;
		}
	}

	function complete() {
		if (!canAdvance) return;
		// Mark lesson as completed in localStorage
		if (browser) {
			try {
				localStorage.setItem(`${getLessonKey()}:completed`, 'true');
			} catch {}
		}
		// Navigate back to course
		if (courseSlug) {
			goto(`/courses/${courseSlug}`);
		} else {
			goto('/courses');
		}
	}

	function goBack() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	function unblock() {
		unlockedSteps = new Set([...unlockedSteps, currentStep]);
	}

	// Keyboard navigation (arrows + vim keys)
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt)
			// This prevents conflicts with system shortcuts like Cmd+L, Cmd+H
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			// Forward: Enter, Space, Right Arrow, l (vim)
			if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'l') && canAdvance) {
				e.preventDefault();
				if (isLastStep) {
					complete();
				} else {
					advance();
				}
			}
			// Back: Left Arrow, h (vim)
			else if ((e.key === 'ArrowLeft' || e.key === 'h') && currentStep > 0) {
				e.preventDefault();
				goBack();
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const progress = $derived(((currentStep + 1) / totalSteps) * 100);
</script>

<div class="fixed inset-0 flex flex-col bg-background dark:bg-background-dark">
	<!-- Minimal top bar -->
	<header class="flex-none flex items-center justify-between px-4 py-3 border-b border-border-subtle dark:border-border-subtle-dark">
		<!-- Back button -->
		{#if courseSlug}
			<a
				class="p-2 -m-2 text-text-muted dark:text-text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
				href="/courses/{courseSlug}"
				title="Exit lesson"
			>
				<IconX class="w-5 h-5" />
			</a>
		{:else}
			<div class="w-9"></div>
		{/if}

		<!-- Progress bar - thin, centered -->
		<div class="flex-1 max-w-xs mx-4">
			<div class="h-0.5 bg-border-subtle dark:bg-border-subtle-dark rounded-full overflow-hidden">
				<div
					class="h-full bg-text-primary dark:bg-text-primary-dark rounded-full transition-all duration-300"
					style:width="{progress}%"
				></div>
			</div>
		</div>

		<!-- Step counter -->
		<span class="text-xs font-sans text-text-muted dark:text-text-muted-dark tabular-nums w-9 text-right">
			{currentStep + 1}/{totalSteps}
		</span>
	</header>

	<!-- Content - fills remaining space, centered -->
	<main class="flex-1 min-h-0 flex items-center justify-center p-6 overflow-y-auto">
		<div class="w-full max-w-lg">
			{@render children({ currentStep, canAdvance, advance, goBack, unblock })}
		</div>
	</main>

	<!-- Bottom action bar -->
	<footer class="flex-none px-4 py-4 border-t border-border-subtle dark:border-border-subtle-dark">
		<div class="max-w-lg mx-auto flex items-center justify-between">
			<!-- Back button -->
			<button
				class="flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-sm transition-colors {currentStep > 0
					? 'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface dark:hover:bg-surface-dark'
					: 'text-text-muted/30 dark:text-text-muted-dark/30 cursor-not-allowed'}"
				disabled={currentStep === 0}
				onclick={goBack}
			>
				<Kbd key="←" size="sm" />
				<span class="hidden sm:inline">Back</span>
			</button>

			<!-- Continue button -->
			<div class="flex items-center gap-3">
				<button
					class="px-5 py-2.5 rounded-lg font-sans text-sm font-medium transition-all {canAdvance
						? 'bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark hover:bg-text-secondary dark:hover:bg-text-secondary-dark'
						: 'bg-border-subtle dark:bg-border-subtle-dark text-text-muted dark:text-text-muted-dark cursor-not-allowed'}"
					disabled={!canAdvance}
					onclick={isLastStep ? complete : advance}
				>
					{isLastStep ? 'Complete' : 'Continue'}
				</button>
				<Kbd key="→" size="sm" />
			</div>
		</div>
	</footer>
</div>
