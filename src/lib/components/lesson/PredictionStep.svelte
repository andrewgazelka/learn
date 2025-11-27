<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		question: string;
		children: Snippet; // The reveal content
		onReveal: () => void;
	}

	const { question, children, onReveal }: Props = $props();

	let revealed = $state(false);
	let userThought = $state(false);

	function think() {
		userThought = true;
	}

	function reveal() {
		revealed = true;
		onReveal();
	}
</script>

<div class="space-y-6">
	<div class="p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark">
		<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-3">
			Think first
		</div>
		<p class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
			{question}
		</p>
	</div>

	{#if !userThought}
		<button
			class="w-full py-3 rounded-lg border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark font-sans hover:bg-surface dark:hover:bg-surface-dark transition-colors"
			onclick={think}
			type="button"
		>
			I've thought about it
		</button>
	{:else if !revealed}
		<button
			class="w-full py-3 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-sans font-medium hover:bg-text-secondary dark:hover:bg-text-secondary-dark transition-colors"
			onclick={reveal}
			type="button"
		>
			Show me the answer
		</button>
	{:else}
		<div class="animate-in fade-in slide-in-from-bottom-2 duration-300 p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark">
			{@render children()}
		</div>
	{/if}
</div>
