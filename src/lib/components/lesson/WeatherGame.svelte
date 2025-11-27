<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconSun from '~icons/lucide/sun';
	import IconCloudRain from '~icons/lucide/cloud-rain';
	import IconFlame from '~icons/lucide/flame';
	import IconGamepad from '~icons/lucide/gamepad-2';
	import IconCheck from '~icons/lucide/check';
	import IconX from '~icons/lucide/x';

	interface Props {
		showHistory?: boolean;
		onComplete?: (stats: { correct: number; total: number }) => void;
		rounds?: number;
	}

	const { showHistory = false, onComplete, rounds = 8 }: Props = $props();

	// Markov chain: P(sunny|sunny) = 0.8, P(sunny|rainy) = 0.4
	const SUNNY_GIVEN_SUNNY = 0.8;
	const SUNNY_GIVEN_RAINY = 0.4;

	type Weather = 'sunny' | 'rainy';

	let history = $state<Weather[]>(['sunny']);
	let currentRound = $state(0);
	let userPrediction = $state<Weather | null>(null);
	let showResult = $state(false);
	let actualNext = $state<Weather | null>(null);
	let correct = $state(0);
	let streak = $state(0);
	let maxStreak = $state(0);
	let isComplete = $state(false);

	const currentWeather = $derived(history[history.length - 1]);
	const displayHistory = $derived(showHistory ? history.slice(-5) : [currentWeather]);

	function getNextWeather(): Weather {
		const prob = currentWeather === 'sunny' ? SUNNY_GIVEN_SUNNY : SUNNY_GIVEN_RAINY;
		return Math.random() < prob ? 'sunny' : 'rainy';
	}

	function predict(weather: Weather) {
		if (showResult || isComplete) return;
		userPrediction = weather;
		actualNext = getNextWeather();
		showResult = true;

		if (userPrediction === actualNext) {
			correct++;
			streak++;
			if (streak > maxStreak) maxStreak = streak;
		} else {
			streak = 0;
		}

		// Auto-advance after brief delay to show result
		setTimeout(() => {
			nextRound();
		}, 600);
	}

	function nextRound() {
		if (actualNext === null) return;
		history = [...history, actualNext];
		userPrediction = null;
		actualNext = null;
		showResult = false;
		currentRound++;

		if (currentRound >= rounds) {
			isComplete = true;
			onComplete?.({ correct, total: rounds });
		}
	}


	// Keyboard controls
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;
			if (isComplete || showResult) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt)
			// This prevents conflicts with system shortcuts like Cmd+S, Cmd+R
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			// Number keys instantly predict
			if (e.key === '1' || e.key === 's' || e.key === 'S' || e.key === 'ArrowLeft') {
				e.preventDefault();
				predict('sunny');
			} else if (e.key === '2' || e.key === 'r' || e.key === 'R' || e.key === 'ArrowRight') {
				e.preventDefault();
				predict('rainy');
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="space-y-6">
	<!-- History display -->
	<div class="text-center">
		<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-3">
			{showHistory ? 'Weather History' : 'Today'}
		</div>
		<div class="flex items-center justify-center gap-2">
			{#each displayHistory as weather, i}
				{#if i > 0}
					<span class="text-text-muted dark:text-text-muted-dark">→</span>
				{/if}
				<span class="text-text-primary dark:text-text-primary-dark" title={weather}>
					{#if weather === 'sunny'}
						<IconSun class="w-10 h-10" />
					{:else}
						<IconCloudRain class="w-10 h-10" />
					{/if}
				</span>
			{/each}
		</div>
	</div>

	<!-- Score -->
	<div class="flex justify-center gap-8 text-sm font-sans">
		<div class="text-center">
			<div class="text-2xl font-bold text-text-primary dark:text-text-primary-dark">{correct}/{currentRound || '-'}</div>
			<div class="text-text-muted dark:text-text-muted-dark">Correct</div>
		</div>
		<div class="text-center">
			<div class="text-2xl font-bold text-text-primary dark:text-text-primary-dark">{streak}</div>
			<div class="text-text-muted dark:text-text-muted-dark">Streak</div>
		</div>
	</div>

	<!-- Prediction UI -->
	{#if !isComplete}
		{#if !showResult}
			<div class="space-y-4">
				<p class="text-center text-lg font-serif text-text-primary dark:text-text-primary-dark">
					What will tomorrow's weather be?
				</p>
				<div class="flex justify-center gap-4">
					<button
						class="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface dark:hover:bg-surface-dark focus:border-text-primary dark:focus:border-text-primary-dark focus:outline-none transition-all"
						onclick={() => predict('sunny')}
					>
						<span class="text-text-primary dark:text-text-primary-dark">
							<IconSun class="w-12 h-12" />
						</span>
						<span class="font-sans text-sm text-text-secondary dark:text-text-secondary-dark">
							Sunny <kbd class="ml-1 px-1.5 py-0.5 text-xs bg-surface-elevated dark:bg-surface-elevated-dark border border-border-subtle dark:border-border-subtle-dark rounded">1</kbd>
						</span>
					</button>
					<button
						class="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface dark:hover:bg-surface-dark focus:border-text-primary dark:focus:border-text-primary-dark focus:outline-none transition-all"
						onclick={() => predict('rainy')}
					>
						<span class="text-text-secondary dark:text-text-secondary-dark">
							<IconCloudRain class="w-12 h-12" />
						</span>
						<span class="font-sans text-sm text-text-secondary dark:text-text-secondary-dark">
							Rainy <kbd class="ml-1 px-1.5 py-0.5 text-xs bg-surface-elevated dark:bg-surface-elevated-dark border border-border-subtle dark:border-border-subtle-dark rounded">2</kbd>
						</span>
					</button>
				</div>
			</div>
		{:else}
			<!-- Result -->
			<div class="text-center space-y-4">
				<div class="flex items-center justify-center gap-4">
					<div class="text-center">
						<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">You said</div>
						<span class="text-text-primary dark:text-text-primary-dark">
							{#if userPrediction === 'sunny'}
								<IconSun class="w-10 h-10" />
							{:else}
								<IconCloudRain class="w-10 h-10" />
							{/if}
						</span>
					</div>
					<div class="{userPrediction === actualNext ? 'text-text-primary dark:text-text-primary-dark' : 'text-text-muted dark:text-text-muted-dark'}">
						{#if userPrediction === actualNext}
							<IconCheck class="w-8 h-8" />
						{:else}
							<IconX class="w-8 h-8" />
						{/if}
					</div>
					<div class="text-center">
						<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">Actual</div>
						<span class="text-text-secondary dark:text-text-secondary-dark">
							{#if actualNext === 'sunny'}
								<IconSun class="w-10 h-10" />
							{:else}
								<IconCloudRain class="w-10 h-10" />
							{/if}
						</span>
					</div>
				</div>

				<div class="text-lg font-sans {userPrediction === actualNext ? 'text-text-primary dark:text-text-primary-dark font-medium' : 'text-text-muted dark:text-text-muted-dark'}">
					{userPrediction === actualNext ? 'Correct!' : 'Wrong'}
					{#if userPrediction === actualNext && streak > 1}
						<span class="ml-2 inline-flex items-center gap-1">
							<IconFlame class="w-5 h-5" /> {streak} streak!
						</span>
					{/if}
				</div>
			</div>
		{/if}
	{:else}
		<!-- Game complete -->
		<div class="text-center space-y-4 p-6 rounded-xl bg-surface dark:bg-surface-dark">
			<div class="text-text-primary dark:text-text-primary-dark flex justify-center">
				<IconGamepad class="w-8 h-8" />
			</div>
			<p class="text-lg font-serif text-text-primary dark:text-text-primary-dark">
				Game Complete!
			</p>
			<div class="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
				{correct}/{rounds}
			</div>
			<p class="text-sm text-text-muted dark:text-text-muted-dark">
				{Math.round((correct / rounds) * 100)}% accuracy
				{#if maxStreak > 1}
					• Best streak: {maxStreak}
				{/if}
			</p>
		</div>
	{/if}

	<!-- Progress dots -->
	<div class="flex justify-center gap-1">
		{#each Array(rounds) as _, i}
			<div
				class="w-2 h-2 rounded-full {i < currentRound
					? 'bg-text-primary dark:bg-text-primary-dark'
					: i === currentRound
						? 'bg-text-muted dark:bg-text-muted-dark'
						: 'bg-border-subtle dark:bg-border-subtle-dark'}"
			></div>
		{/each}
	</div>
</div>
