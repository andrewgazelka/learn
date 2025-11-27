<script lang="ts">
	import IconSparkles from '~icons/lucide/sparkles';

	interface Props {
		withoutHistory: { correct: number; total: number } | null;
		withHistory: { correct: number; total: number } | null;
	}

	const { withoutHistory, withHistory }: Props = $props();

	const pctWithout = $derived(
		withoutHistory ? Math.round((withoutHistory.correct / withoutHistory.total) * 100) : null
	);
	const pctWith = $derived(
		withHistory ? Math.round((withHistory.correct / withHistory.total) * 100) : null
	);

	const bothComplete = $derived(withoutHistory !== null && withHistory !== null);
	const difference = $derived(
		pctWith !== null && pctWithout !== null ? Math.abs(pctWith - pctWithout) : null
	);
</script>

<div class="space-y-6">
	<div class="grid grid-cols-2 gap-4">
		<!-- Without history -->
		<div class="p-6 rounded-xl border-2 {withoutHistory ? 'border-text-primary/30 dark:border-text-primary-dark/30 bg-surface dark:bg-surface-dark' : 'border-border-subtle dark:border-border-subtle-dark'}">
			<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-2">
				Without History
			</div>
			{#if withoutHistory}
				<div class="text-4xl font-bold text-text-primary dark:text-text-primary-dark">
					{pctWithout}%
				</div>
				<div class="text-sm text-text-muted dark:text-text-muted-dark">
					{withoutHistory.correct}/{withoutHistory.total} correct
				</div>
			{:else}
				<div class="text-2xl text-text-muted dark:text-text-muted-dark">—</div>
				<div class="text-sm text-text-muted dark:text-text-muted-dark">Not played yet</div>
			{/if}
		</div>

		<!-- With history -->
		<div class="p-6 rounded-xl border-2 {withHistory ? 'border-text-primary/30 dark:border-text-primary-dark/30 bg-surface dark:bg-surface-dark' : 'border-border-subtle dark:border-border-subtle-dark'}">
			<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-2">
				With History
			</div>
			{#if withHistory}
				<div class="text-4xl font-bold text-text-primary dark:text-text-primary-dark">
					{pctWith}%
				</div>
				<div class="text-sm text-text-muted dark:text-text-muted-dark">
					{withHistory.correct}/{withHistory.total} correct
				</div>
			{:else}
				<div class="text-2xl text-text-muted dark:text-text-muted-dark">—</div>
				<div class="text-sm text-text-muted dark:text-text-muted-dark">Not played yet</div>
			{/if}
		</div>
	</div>

	{#if bothComplete}
		<div class="text-center p-6 rounded-xl bg-surface dark:bg-surface-dark">
			{#if difference !== null && difference <= 15}
				<div class="flex justify-center text-text-primary dark:text-text-primary-dark mb-2">
					<IconSparkles class="w-8 h-8" />
				</div>
				<p class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
					The history didn't help!
				</p>
				<p class="mt-2 text-text-secondary dark:text-text-secondary-dark">
					Your accuracy was roughly the same whether you saw the history or not.
				</p>
			{:else}
				<p class="text-lg font-serif text-text-primary dark:text-text-primary-dark">
					Interesting... there's a {difference}% difference.
				</p>
				<p class="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
					With more rounds, these would converge. The history truly doesn't help!
				</p>
			{/if}
		</div>
	{/if}
</div>
