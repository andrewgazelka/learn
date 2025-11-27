<script lang="ts">
	import { onMount } from 'svelte';

	const topics = ['Anything', 'Rust', 'Design', 'Music', 'Math', 'History'];
	let currentTopic = $state(topics[0]);
	let isHovering = $state(false);
	let cycleInterval: ReturnType<typeof setInterval> | null = null;
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	function startCycling() {
		isHovering = true;
		let index = 0;
		cycleInterval = setInterval(() => {
			index = (index + 1) % topics.length;
			currentTopic = topics[index];
		}, 150);
	}

	function stopCycling() {
		isHovering = false;
		if (cycleInterval) {
			clearInterval(cycleInterval);
			cycleInterval = null;
		}
		currentTopic = topics[0];
	}
</script>

<section class="min-h-[80vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
	<div class="max-w-2xl">
		<h1
			class="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-text-primary dark:text-text-primary-dark"
		>
			<span style:--delay="0" class="inline-block animate-word" class:visible={mounted}>
				Learn
			</span>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span
				style:--delay="1"
				class="inline-block animate-word cursor-default"
				class:visible={mounted}
				onmouseenter={startCycling}
				onmouseleave={stopCycling}
				>
				<span
					class="inline-block min-w-[3ch] transition-transform duration-100"
					class:scale-105={isHovering}
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
				href="/dashboard"
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

	@media (prefers-reduced-motion: reduce) {
		.animate-word {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
