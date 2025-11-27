<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	const topics = ['Anything', 'Rust', 'Design', 'Music', 'Math', 'History'];
	let topicIndex = $state(0);
	let mounted = $state(false);
	let transitioning = $state(false);

	onMount(() => {
		mounted = true;

		// Start cycling after entrance animation completes
		const startDelay = setTimeout(() => {
			const interval = setInterval(() => {
				transitioning = true;
				setTimeout(() => {
					topicIndex = (topicIndex + 1) % topics.length;
					transitioning = false;
				}, 150);
			}, 2500);

			return () => { clearInterval(interval); };
		}, 600);

		return () => { clearTimeout(startDelay); };
	});

	const currentTopic = $derived(topics[topicIndex]);
</script>

<section class="min-h-[80vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
	<div class="max-w-2xl">
		<h1
			class="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-text-primary dark:text-text-primary-dark"
		>
			<span style:--delay="0" class="inline-block animate-word" class:visible={mounted}>
				Learn
			</span>
			<span
				style:--delay="1"
				class="inline-block animate-word"
				class:visible={mounted}
			>
				<span
					class="inline-block topic-text border-b-2 border-accent/30 dark:border-accent-dark/30"
					class:transitioning
				>
					{currentTopic}
				</span>
			</span>
		</h1>
		<p
			style:--delay="2"
			class="mt-6 text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark font-serif leading-relaxed animate-word"
			class:visible={mounted}
		>
			A thoughtful approach to knowledge, one concept at a time.
		</p>
		<div style:--delay="3" class="mt-12 animate-word" class:visible={mounted}>
			<a
				class="inline-block text-lg text-text-primary dark:text-text-primary-dark border-b-2 border-text-primary dark:border-text-primary-dark pb-1 hover:text-accent hover:border-accent dark:hover:text-accent-dark dark:hover:border-accent-dark transition-colors"
				href={resolve('/dashboard')}
			>
				Begin learning
			</a>
			<span class="ml-4 text-sm text-text-muted dark:text-text-muted-dark font-sans">
				or press <kbd
					class="px-1.5 py-0.5 text-xs rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
					>D</kbd
				>
			</span>
		</div>
	</div>
</section>

<style>
	.animate-word {
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 400ms ease,
			transform 400ms ease;
		transition-delay: calc(var(--delay) * 120ms);
	}

	.animate-word.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.topic-text {
		transition: opacity 150ms ease;
	}

	.topic-text.transitioning {
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-word,
		.topic-text {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
