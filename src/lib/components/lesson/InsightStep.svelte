<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconLightbulb from '~icons/lucide/lightbulb';

	interface Props {
		title?: string;
		children: Snippet;
	}

	const { title = 'Key Insight', children }: Props = $props();
</script>

<div class="p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark">
	<div class="flex items-center gap-2 mb-4">
		<IconLightbulb class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
		<span class="text-sm font-sans font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">
			{title}
		</span>
	</div>
	<div class="text-lg font-serif text-text-primary dark:text-text-primary-dark leading-relaxed">
		{@render children()}
	</div>
</div>
