<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconTrendingUp from '~icons/lucide/trending-up';
	import IconTrendingDown from '~icons/lucide/trending-down';
	import IconUsers from '~icons/lucide/users';
	import IconDollarSign from '~icons/lucide/dollar-sign';
	import IconStar from '~icons/lucide/star';
	import IconAlertTriangle from '~icons/lucide/alert-triangle';

	interface Story {
		id: string;
		headline: string;
		type: 'sensational' | 'balanced' | 'investigative' | 'clickbait';
		engagement: number; // 1-10 scale
		accuracy: number; // 1-10 scale
		adRevenue: number; // multiplier
		credibility: number; // impact on reputation
		description: string;
	}

	interface Props {
		rounds?: number;
		onComplete: (stats: { totalRevenue: number; finalCredibility: number; choices: string[] }) => void;
	}

	const { rounds = 5, onComplete }: Props = $props();

	const storyPool: Story[] = [
		{
			id: 'breaking-war',
			headline: 'BREAKING: Massive Escalation in Conflict Zone',
			type: 'sensational',
			engagement: 9,
			accuracy: 6,
			adRevenue: 2.5,
			credibility: -5,
			description: 'High traffic, unverified details, emotionally charged'
		},
		{
			id: 'context-piece',
			headline: 'Analysis: Historical Context Behind Today\'s Tensions',
			type: 'balanced',
			engagement: 4,
			accuracy: 9,
			adRevenue: 0.8,
			credibility: 10,
			description: 'Nuanced, well-researched, lower immediate engagement'
		},
		{
			id: 'viral-video',
			headline: 'SHOCKING Video Goes Viral - You Won\'t Believe What Happened',
			type: 'clickbait',
			engagement: 10,
			accuracy: 3,
			adRevenue: 3.0,
			credibility: -15,
			description: 'Maximum clicks, unverified source, misleading framing'
		},
		{
			id: 'investigation',
			headline: 'Investigation: Following the Money Behind the Conflict',
			type: 'investigative',
			engagement: 6,
			accuracy: 10,
			adRevenue: 1.2,
			credibility: 15,
			description: 'Original reporting, expensive to produce, builds trust'
		},
		{
			id: 'both-sides',
			headline: 'Voices From Both Sides: Civilians Share Their Stories',
			type: 'balanced',
			engagement: 7,
			accuracy: 8,
			adRevenue: 1.5,
			credibility: 8,
			description: 'Humanizing, empathetic, balanced perspective'
		},
		{
			id: 'outrage',
			headline: 'OUTRAGE: Politicians Under Fire for Controversial Statement',
			type: 'sensational',
			engagement: 9,
			accuracy: 5,
			adRevenue: 2.2,
			credibility: -8,
			description: 'Controversy drives engagement, facts secondary'
		},
		{
			id: 'expert',
			headline: 'Expert Analysis: What the Data Actually Shows',
			type: 'balanced',
			engagement: 5,
			accuracy: 9,
			adRevenue: 1.0,
			credibility: 12,
			description: 'Data-driven, less shareable, builds authority'
		},
		{
			id: 'exclusive',
			headline: 'EXCLUSIVE: Leaked Documents Reveal Hidden Agenda',
			type: 'investigative',
			engagement: 8,
			accuracy: 7,
			adRevenue: 2.0,
			credibility: 5,
			description: 'Scoop potential, verification pending, risky'
		},
		{
			id: 'listicle',
			headline: '10 Things You Need to Know About the Crisis Right Now',
			type: 'clickbait',
			engagement: 8,
			accuracy: 4,
			adRevenue: 2.0,
			credibility: -10,
			description: 'Easy to consume, oversimplified, high ad views'
		},
		{
			id: 'factcheck',
			headline: 'Fact Check: Viral Claims Don\'t Hold Up to Scrutiny',
			type: 'balanced',
			engagement: 5,
			accuracy: 10,
			adRevenue: 0.9,
			credibility: 10,
			description: 'Public service, low engagement, builds trust'
		}
	];

	let currentRound = $state(0);
	let revenue = $state(1000); // Starting budget
	let credibility = $state(50); // 0-100 scale
	let choices = $state<string[]>([]);
	let currentOptions = $state<Story[]>([]);
	let showingResult = $state(false);
	let lastChoice = $state<Story | null>(null);
	let gameOver = $state(false);

	function getRandomStories(count: number): Story[] {
		const shuffled = [...storyPool].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	}

	function startRound() {
		currentOptions = getRandomStories(3);
		showingResult = false;
		lastChoice = null;
	}

	function selectStory(story: Story) {
		if (showingResult || gameOver) return;

		lastChoice = story;
		choices.push(story.type);

		// Calculate impact
		const revenueGain = Math.round(100 * story.adRevenue * (story.engagement / 5));
		revenue += revenueGain;
		credibility = Math.max(0, Math.min(100, credibility + story.credibility));

		showingResult = true;

		// Check if game over
		if (currentRound >= rounds - 1 || credibility <= 0) {
			gameOver = true;
			setTimeout(() => {
				onComplete({
					totalRevenue: revenue,
					finalCredibility: credibility,
					choices
				});
			}, 2000);
		}
	}

	function nextRound() {
		if (gameOver) return;
		currentRound++;
		startRound();
	}

	// Keyboard controls
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt)
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (!showingResult && !gameOver) {
				const num = parseInt(e.key, 10);
				if (num >= 1 && num <= currentOptions.length) {
					e.preventDefault();
					selectStory(currentOptions[num - 1]);
				}
			} else if (showingResult && !gameOver) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					nextRound();
				}
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	// Initialize first round
	$effect(() => {
		if (currentOptions.length === 0) {
			startRound();
		}
	});

	function getTypeColor(type: Story['type']): string {
		switch (type) {
			case 'sensational': return 'text-amber-600 dark:text-amber-400';
			case 'balanced': return 'text-emerald-600 dark:text-emerald-400';
			case 'investigative': return 'text-blue-600 dark:text-blue-400';
			case 'clickbait': return 'text-rose-600 dark:text-rose-400';
		}
	}
</script>

<div class="space-y-4">
	<!-- Stats bar -->
	<div class="flex items-center justify-between p-3 rounded-lg bg-surface dark:bg-surface-dark">
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1.5">
				<IconDollarSign class="w-4 h-4 text-emerald-500" />
				<span class="font-mono text-sm text-text-primary dark:text-text-primary-dark">
					${revenue.toLocaleString()}
				</span>
			</div>
			<div class="flex items-center gap-1.5">
				<IconStar class="w-4 h-4 text-amber-500" />
				<span class="font-mono text-sm text-text-primary dark:text-text-primary-dark">
					{credibility}%
				</span>
				<span class="text-xs text-text-muted dark:text-text-muted-dark">credibility</span>
			</div>
		</div>
		<div class="text-xs text-text-muted dark:text-text-muted-dark">
			Round {currentRound + 1}/{rounds}
		</div>
	</div>

	<!-- Credibility warning -->
	{#if credibility < 30}
		<div class="flex items-center gap-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-sm">
			<IconAlertTriangle class="w-4 h-4" />
			<span>Low credibility! Readers are losing trust.</span>
		</div>
	{/if}

	<!-- Game prompt -->
	{#if !showingResult && !gameOver}
		<div class="text-center py-2">
			<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
				Choose your next story:
			</h3>
			<p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">
				You're the editor. What runs on the front page?
			</p>
		</div>
	{/if}

	<!-- Story options -->
	{#if !gameOver}
		<div class="space-y-2">
			{#each currentOptions as story, i (story.id)}
				<button
					class="group w-full text-left p-4 rounded-lg border transition-all duration-200
						{showingResult
							? story.id === lastChoice?.id
								? 'border-accent dark:border-accent-dark bg-surface dark:bg-surface-dark'
								: 'border-transparent bg-surface/30 dark:bg-surface-dark/30 opacity-40'
							: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface/50 dark:hover:bg-surface-dark/50'
						}"
					disabled={showingResult}
					onclick={() => selectStory(story)}
					type="button"
				>
					<div class="flex items-start gap-3">
						<span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-medium bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark">
							{i + 1}
						</span>
						<div class="flex-1 min-w-0">
							<div class="font-medium text-text-primary dark:text-text-primary-dark leading-snug">
								{story.headline}
							</div>
							<div class="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
								{story.description}
							</div>
							{#if showingResult && story.id === lastChoice?.id}
								<div class="mt-3 flex items-center gap-4 text-xs">
									<span class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
										<IconTrendingUp class="w-3 h-3" />
										+${Math.round(100 * story.adRevenue * (story.engagement / 5))}
									</span>
									<span class="flex items-center gap-1 {story.credibility >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
										{story.credibility >= 0 ? '+' : ''}{story.credibility}% trust
									</span>
									<span class={getTypeColor(story.type)}>
										{story.type}
									</span>
								</div>
							{/if}
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Result / Next prompt -->
	{#if showingResult && !gameOver}
		<div class="text-center pt-2">
			<button
				class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm transition-colors hover:bg-text-secondary dark:hover:bg-text-secondary-dark"
				onclick={nextRound}
				type="button"
			>
				Next Story
			</button>
			<p class="text-xs text-text-muted dark:text-text-muted-dark mt-2">
				Press <kbd class="px-1.5 py-0.5 bg-surface dark:bg-surface-dark rounded border border-border-subtle dark:border-border-subtle-dark">Space</kbd> to continue
			</p>
		</div>
	{/if}

	<!-- Game over -->
	{#if gameOver}
		<div class="text-center py-6 space-y-4">
			<div class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
				{credibility <= 0 ? 'Bankrupt of Trust' : 'Quarter Complete'}
			</div>
			<div class="flex justify-center gap-8">
				<div>
					<div class="text-2xl font-mono text-emerald-600 dark:text-emerald-400">
						${revenue.toLocaleString()}
					</div>
					<div class="text-xs text-text-muted dark:text-text-muted-dark">Revenue</div>
				</div>
				<div>
					<div class="text-2xl font-mono {credibility > 50 ? 'text-emerald-600 dark:text-emerald-400' : credibility > 20 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}">
						{credibility}%
					</div>
					<div class="text-xs text-text-muted dark:text-text-muted-dark">Credibility</div>
				</div>
			</div>
		</div>
	{/if}
</div>
