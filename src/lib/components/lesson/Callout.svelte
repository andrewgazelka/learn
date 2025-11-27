<script lang="ts">
	import type { Snippet } from 'svelte';
	import Lightbulb from '~icons/lucide/lightbulb';
	import AlertCircle from '~icons/lucide/alert-circle';
	import BookOpen from '~icons/lucide/book-open';
	import Zap from '~icons/lucide/zap';

	interface Props {
		/** Type of callout */
		type?: 'definition' | 'insight' | 'warning' | 'example';
		/** Optional title */
		title?: string;
		children: Snippet;
	}

	const { type = 'insight', title, children }: Props = $props();

	const icons = {
		definition: BookOpen,
		insight: Lightbulb,
		warning: AlertCircle,
		example: Zap
	};

	const Icon = icons[type];
</script>

<aside
	class="my-8 pl-6 border-l-2 border-border dark:border-border-dark"
>
	{#if title}
		<div class="flex items-center gap-2 mb-3">
			<Icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
			<span class="text-xs font-sans uppercase tracking-widest text-text-muted dark:text-text-muted-dark">
				{title}
			</span>
		</div>
	{/if}
	<div class="text-text-secondary dark:text-text-secondary-dark font-serif text-lg leading-relaxed">
		{@render children()}
	</div>
</aside>
