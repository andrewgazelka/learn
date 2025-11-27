<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	// Mix of philosophical and technical topics
	const topics = [
		'Epistemology',
		'Game Theory',
		'Rationality',
		'Probability',
		'Persuasion',
		'Incentives',
		'Causality',
		'Statistics',
		'Optimization'
	];
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

			return () => {
				clearInterval(interval);
			};
		}, 600);

		return () => {
			clearTimeout(startDelay);
		};
	});

	const currentTopic = $derived(topics[topicIndex]);
</script>

<section class="min-h-[85vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
	<div class="max-w-3xl">
		<h1
			class="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.15] tracking-tight text-text-primary dark:text-text-primary-dark"
		>
			<span style:--delay="0" class="inline-block animate-word" class:visible={mounted}>
				Own your thinking.
			</span>
		</h1>
		<p
			style:--delay="1"
			class="mt-8 text-lg md:text-xl text-text-secondary dark:text-text-secondary-dark font-serif leading-relaxed animate-word max-w-2xl"
			class:visible={mounted}
		>
			Bite-sized lessons on
			<span
				class="inline-block topic-text font-medium text-text-primary dark:text-text-primary-dark"
				class:transitioning
			>
				{currentTopic}</span
			>. Rigorous enough to change how you think. Short enough for the train.
		</p>

		<div
			style:--delay="2"
			class="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 animate-word"
			class:visible={mounted}
		>
			<a
				class="inline-block text-lg text-text-primary dark:text-text-primary-dark border-b-2 border-text-primary dark:border-text-primary-dark pb-1 hover:text-text-secondary hover:border-text-secondary dark:hover:text-text-secondary-dark dark:hover:border-text-secondary-dark transition-colors"
				href={resolve('/courses')}
			>
				Explore courses
			</a>
			<span class="text-sm text-text-muted dark:text-text-muted-dark font-sans">
				Press <kbd
					class="px-1.5 py-0.5 text-xs rounded border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark"
					>C</kbd
				> for courses
			</span>
		</div>

		<div
			style:--delay="3"
			class="mt-16 pt-8 border-t border-border/50 dark:border-border-dark/50 animate-word"
			class:visible={mounted}
		>
			<p
				class="text-xs uppercase tracking-widest text-text-muted dark:text-text-muted-dark font-sans mb-4"
			>
				Featured topics
			</p>
			<div class="flex flex-wrap gap-3">
				{#each ['Epistemology', 'Game Theory', 'Political Economy', 'Decision Theory', 'Rhetoric'] as topic}
					<span
						class="px-3 py-1.5 text-sm font-sans text-text-secondary dark:text-text-secondary-dark border border-border dark:border-border-dark rounded-full hover:border-text-primary dark:hover:border-text-primary-dark transition-colors cursor-default"
					>
						{topic}
					</span>
				{/each}
			</div>
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
		min-width: 8ch;
		display: inline-block;
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
