<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';

	interface Props {
		onComplete: () => void;
	}

	const { onComplete }: Props = $props();

	type Strategy = 'cooperate' | 'defect';
	type Player = 'israel' | 'hamas';

	interface GameRound {
		israelChoice: Strategy | null;
		hamasChoice: Strategy | null;
		israelPayoff: number;
		hamasPayoff: number;
	}

	// Payoff matrix (asymmetric - reflects power imbalance)
	// Israel: [cooperate payoff, defect payoff]
	// Hamas: [cooperate payoff, defect payoff]
	const payoffs = {
		// Both cooperate: ceasefire holds
		'cooperate-cooperate': { israel: 3, hamas: 3, outcome: 'Ceasefire holds. Both sides benefit from stability.' },
		// Israel cooperates, Hamas defects: rockets
		'cooperate-defect': { israel: -2, hamas: 4, outcome: 'Hamas fires rockets. Israel looks weak. Hamas gains support.' },
		// Israel defects, Hamas cooperates: expansion
		'defect-cooperate': { israel: 4, hamas: -2, outcome: 'Israel expands settlements. Hamas loses credibility.' },
		// Both defect: war
		'defect-defect': { israel: -1, hamas: -3, outcome: 'Open conflict. Both lose, but Israel has more capacity to absorb losses.' }
	};

	let currentPhase = $state<'intro' | 'play-israel' | 'play-hamas' | 'result' | 'iterated' | 'shadow' | 'complete'>('intro');
	let rounds = $state<GameRound[]>([]);
	let currentRound = $state<Partial<GameRound>>({});
	let selectedInsights = $state<Set<string>>(new Set());

	const insights = [
		{ id: 'asymmetry', text: 'Power asymmetry changes "rational" choices - the weaker party has less to lose from conflict' },
		{ id: 'domestic', text: 'Leaders optimize for domestic audiences, not international observers' },
		{ id: 'reputation', text: 'Appearing weak invites future defection - both sides must signal strength' },
		{ id: 'time', text: 'Short-term political cycles favor defection over long-term cooperation' },
		{ id: 'trust', text: 'Without enforcement mechanisms, promises aren\'t credible - both sides expect betrayal' },
		{ id: 'spoilers', text: 'Hardliners on both sides benefit from conflict and can sabotage cooperation' }
	];

	function makeChoice(player: Player, choice: Strategy) {
		if (player === 'israel') {
			currentRound.israelChoice = choice;
			currentPhase = 'play-hamas';
		} else {
			currentRound.hamasChoice = choice;
			calculateResult();
		}
	}

	function calculateResult() {
		const key = `${currentRound.israelChoice}-${currentRound.hamasChoice}` as keyof typeof payoffs;
		const result = payoffs[key];
		currentRound.israelPayoff = result.israel;
		currentRound.hamasPayoff = result.hamas;
		rounds = [...rounds, currentRound as GameRound];
		currentPhase = 'result';
	}

	function nextRound() {
		if (rounds.length >= 3) {
			currentPhase = 'iterated';
		} else {
			currentRound = {};
			currentPhase = 'play-israel';
		}
	}

	function toggleInsight(id: string) {
		if (selectedInsights.has(id)) {
			selectedInsights.delete(id);
		} else {
			selectedInsights.add(id);
		}
		selectedInsights = new Set(selectedInsights);
	}

	function complete() {
		currentPhase = 'complete';
		onComplete();
	}

	// Keyboard
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt)
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (currentPhase === 'play-israel' || currentPhase === 'play-hamas') {
				if (e.key === '1') {
					e.preventDefault();
					makeChoice(currentPhase === 'play-israel' ? 'israel' : 'hamas', 'cooperate');
				} else if (e.key === '2') {
					e.preventDefault();
					makeChoice(currentPhase === 'play-israel' ? 'israel' : 'hamas', 'defect');
				}
			} else if (currentPhase === 'result' && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				nextRound();
			} else if (currentPhase === 'intro' && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				currentPhase = 'play-israel';
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const israelTotal = $derived(rounds.reduce((sum, r) => sum + r.israelPayoff, 0));
	const hamasTotal = $derived(rounds.reduce((sum, r) => sum + r.hamasPayoff, 0));

	function getOutcome(israelChoice: Strategy | null, hamasChoice: Strategy | null): string {
		if (!israelChoice || !hamasChoice) return '';
		const key = `${israelChoice}-${hamasChoice}` as keyof typeof payoffs;
		return payoffs[key].outcome;
	}
</script>

<div class="space-y-4">
	{#if currentPhase === 'intro'}
		<div class="text-center space-y-4">
			<h3 class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
				The Conflict as a Game
			</h3>
			<p class="text-text-secondary dark:text-text-secondary-dark">
				Game theory helps explain why rational actors make choices that seem irrational.
			</p>
			<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark text-left text-sm">
				<p class="mb-2"><strong>The Setup:</strong></p>
				<p class="text-text-muted dark:text-text-muted-dark">
					Two players. Each can <span class="text-emerald-600 dark:text-emerald-400">Cooperate</span> (de-escalate)
					or <span class="text-rose-600 dark:text-rose-400">Defect</span> (escalate).
					Payoffs are asymmetric—reflecting real power imbalances.
				</p>
			</div>
			<p class="text-xs text-text-muted dark:text-text-muted-dark">
				Press Space to begin
			</p>
		</div>

	{:else if currentPhase === 'play-israel' || currentPhase === 'play-hamas'}
		{@const isIsrael = currentPhase === 'play-israel'}
		<div class="space-y-4">
			<div class="text-center">
				<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">
					Round {rounds.length + 1}/3
				</div>
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					You are: {isIsrael ? 'Israeli Government' : 'Hamas Leadership'}
				</h3>
				<p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">
					{isIsrael ? 'What maximizes your political survival?' : 'What serves your strategic goals?'}
				</p>
			</div>

			<!-- Payoff matrix -->
			<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark">
				<div class="text-xs text-text-muted dark:text-text-muted-dark mb-2 text-center">
					Payoff Matrix (your payoff, their payoff)
				</div>
				<div class="grid grid-cols-3 gap-1 text-xs">
					<div></div>
					<div class="text-center text-emerald-600 dark:text-emerald-400 font-medium">They Coop</div>
					<div class="text-center text-rose-600 dark:text-rose-400 font-medium">They Defect</div>

					<div class="text-emerald-600 dark:text-emerald-400 font-medium">You Coop</div>
					<div class="text-center p-2 rounded bg-emerald-50 dark:bg-emerald-950/30">3, 3</div>
					<div class="text-center p-2 rounded bg-rose-50 dark:bg-rose-950/30">{isIsrael ? '-2, 4' : '4, -2'}</div>

					<div class="text-rose-600 dark:text-rose-400 font-medium">You Defect</div>
					<div class="text-center p-2 rounded bg-amber-50 dark:bg-amber-950/30">{isIsrael ? '4, -2' : '-2, 4'}</div>
					<div class="text-center p-2 rounded bg-gray-100 dark:bg-gray-800">-1, -3</div>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<button
					class="p-4 rounded-lg border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
					onclick={() => makeChoice(isIsrael ? 'israel' : 'hamas', 'cooperate')}
					type="button"
				>
					<div class="flex items-center justify-center gap-2 mb-2">
						<span class="w-6 h-6 flex items-center justify-center rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm font-mono">1</span>
						<span class="font-medium text-emerald-700 dark:text-emerald-300">Cooperate</span>
					</div>
					<p class="text-xs text-text-muted dark:text-text-muted-dark">
						{isIsrael ? 'Pause operations, negotiate' : 'Halt rockets, accept terms'}
					</p>
				</button>

				<button
					class="p-4 rounded-lg border border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
					onclick={() => makeChoice(isIsrael ? 'israel' : 'hamas', 'defect')}
					type="button"
				>
					<div class="flex items-center justify-center gap-2 mb-2">
						<span class="w-6 h-6 flex items-center justify-center rounded bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 text-sm font-mono">2</span>
						<span class="font-medium text-rose-700 dark:text-rose-300">Defect</span>
					</div>
					<p class="text-xs text-text-muted dark:text-text-muted-dark">
						{isIsrael ? 'Military operation, expand' : 'Launch attacks, resist'}
					</p>
				</button>
			</div>
		</div>

	{:else if currentPhase === 'result'}
		{@const lastRound = rounds[rounds.length - 1]}
		<div class="space-y-4">
			<div class="text-center">
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark mb-2">
					Round {rounds.length} Result
				</h3>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-center">
					<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">Israel</div>
					<div class="font-medium {lastRound.israelChoice === 'cooperate' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
						{lastRound.israelChoice === 'cooperate' ? 'Cooperated' : 'Defected'}
					</div>
					<div class="text-2xl font-mono mt-1 {lastRound.israelPayoff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
						{lastRound.israelPayoff > 0 ? '+' : ''}{lastRound.israelPayoff}
					</div>
				</div>
				<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-center">
					<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">Hamas</div>
					<div class="font-medium {lastRound.hamasChoice === 'cooperate' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
						{lastRound.hamasChoice === 'cooperate' ? 'Cooperated' : 'Defected'}
					</div>
					<div class="text-2xl font-mono mt-1 {lastRound.hamasPayoff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
						{lastRound.hamasPayoff > 0 ? '+' : ''}{lastRound.hamasPayoff}
					</div>
				</div>
			</div>

			<div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
				<p class="text-sm text-amber-900 dark:text-amber-100">
					{getOutcome(lastRound.israelChoice, lastRound.hamasChoice)}
				</p>
			</div>

			<div class="flex justify-between text-xs text-text-muted dark:text-text-muted-dark px-2">
				<span>Israel total: {israelTotal}</span>
				<span>Hamas total: {hamasTotal}</span>
			</div>

			<div class="text-center">
				<button
					class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
					onclick={nextRound}
					type="button"
				>
					{rounds.length >= 3 ? 'See Analysis' : 'Next Round'}
				</button>
			</div>
		</div>

	{:else if currentPhase === 'iterated'}
		<div class="space-y-4">
			<div class="text-center">
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					The Iterated Game Problem
				</h3>
			</div>

			<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark text-sm space-y-3">
				<p>
					In a <strong>one-shot</strong> game, defection is often rational.
					But in <strong>repeated</strong> games, cooperation can emerge through:
				</p>
				<ul class="space-y-2 text-text-secondary dark:text-text-secondary-dark">
					<li class="flex gap-2">
						<span class="text-accent dark:text-accent-dark">→</span>
						<span><strong>Tit-for-tat:</strong> Cooperate first, then mirror opponent</span>
					</li>
					<li class="flex gap-2">
						<span class="text-accent dark:text-accent-dark">→</span>
						<span><strong>Reputation:</strong> Being known as cooperative attracts cooperation</span>
					</li>
					<li class="flex gap-2">
						<span class="text-accent dark:text-accent-dark">→</span>
						<span><strong>Shadow of the future:</strong> Future interactions make today's cooperation valuable</span>
					</li>
				</ul>
			</div>

			<div class="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-sm">
				<p class="font-medium text-rose-800 dark:text-rose-200 mb-2">But here's the problem:</p>
				<ul class="space-y-1 text-rose-700 dark:text-rose-300">
					<li>• Leaders face <strong>elections</strong> - short time horizons</li>
					<li>• <strong>Spoilers</strong> on both sides can break any agreement</li>
					<li>• Past betrayals make trust nearly impossible</li>
					<li>• Each side believes the other will defect anyway</li>
				</ul>
			</div>

			<div class="text-center">
				<button
					class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
					onclick={() => currentPhase = 'shadow'}
					type="button"
				>
					Key Insights
				</button>
			</div>
		</div>

	{:else if currentPhase === 'shadow'}
		<div class="space-y-4">
			<div class="text-center">
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					Select the insights that resonated
				</h3>
				<p class="text-xs text-text-muted dark:text-text-muted-dark mt-1">
					These explain why "obvious" solutions don't work
				</p>
			</div>

			<div class="space-y-2">
				{#each insights as insight (insight.id)}
					{@const selected = selectedInsights.has(insight.id)}
					<button
						class="w-full text-left p-3 rounded-lg border transition-all
							{selected
								? 'border-accent dark:border-accent-dark bg-accent/5 dark:bg-accent-dark/5'
								: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark'
							}"
						onclick={() => toggleInsight(insight.id)}
						type="button"
					>
						<span class="text-sm text-text-primary dark:text-text-primary-dark">
							{insight.text}
						</span>
					</button>
				{/each}
			</div>

			{#if selectedInsights.size >= 2}
				<div class="text-center pt-2">
					<button
						class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
						onclick={complete}
						type="button"
					>
						Continue
					</button>
				</div>
			{:else}
				<p class="text-center text-xs text-text-muted dark:text-text-muted-dark">
					Select at least 2 insights to continue
				</p>
			{/if}
		</div>

	{:else if currentPhase === 'complete'}
		<div class="text-center space-y-4 py-4">
			<h3 class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
				Game Theory Lens Acquired
			</h3>
			<p class="text-text-secondary dark:text-text-secondary-dark">
				You now understand why actors make choices that seem irrational from the outside
				but are perfectly rational given their incentives and constraints.
			</p>
		</div>
	{/if}
</div>
