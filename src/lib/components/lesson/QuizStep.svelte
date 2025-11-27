<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconCheck from '~icons/lucide/check';
	import IconX from '~icons/lucide/x';

	interface Option {
		id: string;
		text: string;
	}

	interface Props {
		question: string;
		options: Option[];
		correctId: string;
		explanation: string;
		onCorrect: () => void;
	}

	const { question, options, correctId, explanation, onCorrect }: Props = $props();

	let selectedId = $state<string | null>(null);
	let submitted = $state(false);

	const isCorrect = $derived(selectedId === correctId);

	function selectAndSubmit(id: string) {
		if (submitted) return;
		selectedId = id;
		submitted = true;

		if (id === correctId) {
			// Auto-advance after brief delay to show feedback
			setTimeout(() => {
				onCorrect();
			}, 1200);
		}
	}

	function retry() {
		selectedId = null;
		submitted = false;
	}

	// Keyboard controls
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Number keys instantly submit
			const num = parseInt(e.key, 10);
			if (num >= 1 && num <= options.length && !submitted) {
				e.preventDefault();
				selectAndSubmit(options[num - 1].id);
			}

			// Enter/Space to retry if wrong
			if ((e.key === 'Enter' || e.key === ' ') && submitted && !isCorrect) {
				e.preventDefault();
				retry();
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="space-y-5">
	<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
		{question}
	</h3>

	<div class="space-y-2">
		{#each options as option, i (option.id)}
			{@const isSelected = selectedId === option.id}
			{@const isThisCorrect = option.id === correctId}
			{@const showCorrectIndicator = submitted && isThisCorrect}
			{@const showWrongIndicator = submitted && isSelected && !isThisCorrect}
			<button
				class="group w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 font-sans focus:outline-none focus:ring-2 focus:ring-accent/30 dark:focus:ring-accent-dark/30
					{submitted
						? showCorrectIndicator
							? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20'
							: showWrongIndicator
								? 'border-rose-400/50 bg-rose-50/30 dark:bg-rose-950/20'
								: 'border-transparent bg-surface/50 dark:bg-surface-dark/50 opacity-40'
						: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface/50 dark:hover:bg-surface-dark/50'
					}"
				disabled={submitted}
				onclick={() => selectAndSubmit(option.id)}
				type="button"
			>
				<span class="flex items-center gap-3">
					<span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-medium transition-colors
						{submitted
							? showCorrectIndicator
								? 'bg-emerald-500 text-white'
								: showWrongIndicator
									? 'bg-rose-400 text-white'
									: 'bg-surface dark:bg-surface-dark text-text-muted dark:text-text-muted-dark'
							: 'bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark group-hover:bg-border-subtle dark:group-hover:bg-border-subtle-dark'
						}">
						{#if showCorrectIndicator}
							<IconCheck class="w-3.5 h-3.5" />
						{:else if showWrongIndicator}
							<IconX class="w-3.5 h-3.5" />
						{:else}
							{i + 1}
						{/if}
					</span>
					<span class="text-text-primary dark:text-text-primary-dark {submitted && !showCorrectIndicator && !showWrongIndicator ? 'text-text-muted dark:text-text-muted-dark' : ''}">{option.text}</span>
				</span>
			</button>
		{/each}
	</div>

	{#if submitted}
		<div class="pt-2">
			<div class="flex items-start gap-3 p-4 rounded-lg {isCorrect ? 'bg-emerald-50/70 dark:bg-emerald-950/30' : 'bg-amber-50/70 dark:bg-amber-950/30'}">
				<span class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 {isCorrect ? 'bg-emerald-500' : 'bg-amber-500'}">
					{#if isCorrect}
						<IconCheck class="w-3 h-3 text-white" />
					{:else}
						<IconX class="w-3 h-3 text-white" />
					{/if}
				</span>
				<div class="space-y-1">
					<p class="font-medium text-sm {isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-amber-800 dark:text-amber-200'}">
						{isCorrect ? 'Correct' : 'Not quite'}
					</p>
					<p class="text-sm leading-relaxed {isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}">
						{explanation}
					</p>
				</div>
			</div>
		</div>

		{#if !isCorrect}
			<p class="text-center text-xs text-text-muted dark:text-text-muted-dark pt-1">
				Press <kbd class="px-1.5 py-0.5 bg-surface dark:bg-surface-dark rounded border border-border-subtle dark:border-border-subtle-dark text-text-secondary dark:text-text-secondary-dark">Space</kbd> to try again
			</p>
		{/if}
	{/if}
</div>
