<script lang="ts">
	import Check from '~icons/lucide/check';
	import X from '~icons/lucide/x';

	interface Option {
		id: string;
		text: string;
	}

	interface Props {
		question: string;
		options: Option[];
		correctId: string;
		explanation: string;
	}

	const { question, options, correctId, explanation }: Props = $props();

	let selectedId = $state<string | null>(null);
	let submitted = $state(false);

	const isCorrect = $derived(selectedId === correctId);

	function select(id: string) {
		if (submitted) return;
		selectedId = id;
	}

	function submit() {
		if (!selectedId) return;
		submitted = true;
	}

	function reset() {
		selectedId = null;
		submitted = false;
	}
</script>

<div class="my-10 p-6 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark">
	<!-- Question -->
	<div class="text-lg font-serif text-text-primary dark:text-text-primary-dark mb-6">
		{question}
	</div>

	<!-- Options -->
	<div class="space-y-3">
		{#each options as option}
			{@const isSelected = selectedId === option.id}
			{@const isThisCorrect = option.id === correctId}
			<button
				class="w-full text-left p-4 rounded-lg border-2 transition-all {
					submitted
						? isThisCorrect
							? 'border-green-500 bg-green-500/10'
							: isSelected
								? 'border-red-500 bg-red-500/10'
								: 'border-border-subtle dark:border-border-subtle-dark opacity-50'
						: isSelected
							? 'border-accent dark:border-accent-dark bg-accent/5'
							: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark'
				}"
				disabled={submitted}
				onclick={() => { select(option.id); }}
			>
				<div class="flex items-start gap-3">
					<div class="shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center {
						submitted
							? isThisCorrect
								? 'border-green-500 bg-green-500 text-white'
								: isSelected
									? 'border-red-500 bg-red-500 text-white'
									: 'border-border dark:border-border-dark'
							: isSelected
								? 'border-accent dark:border-accent-dark bg-accent dark:bg-accent-dark'
								: 'border-border dark:border-border-dark'
					}">
						{#if submitted && isThisCorrect}
							<Check class="w-3 h-3" />
						{:else if submitted && isSelected && !isThisCorrect}
							<X class="w-3 h-3" />
						{:else if isSelected}
							<div class="w-2 h-2 rounded-full bg-white"></div>
						{/if}
					</div>
					<span class="font-sans text-text-primary dark:text-text-primary-dark">
						{option.text}
					</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Submit / Result -->
	<div class="mt-6">
		{#if !submitted}
			<button
				class="px-6 py-2 text-sm font-sans bg-accent dark:bg-accent-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
				disabled={!selectedId}
				onclick={submit}
			>
				Check Answer
			</button>
		{:else}
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					{#if isCorrect}
						<Check class="w-5 h-5 text-green-500" />
						<span class="font-sans font-medium text-green-600 dark:text-green-400">Correct!</span>
					{:else}
						<X class="w-5 h-5 text-red-500" />
						<span class="font-sans font-medium text-red-600 dark:text-red-400">Not quite</span>
					{/if}
				</div>
				<div class="text-sm text-text-secondary dark:text-text-secondary-dark font-serif leading-relaxed">
					{explanation}
				</div>
				<button
					class="text-sm font-sans text-accent dark:text-accent-dark hover:underline"
					onclick={reset}
				>
					Try again
				</button>
			</div>
		{/if}
	</div>
</div>
