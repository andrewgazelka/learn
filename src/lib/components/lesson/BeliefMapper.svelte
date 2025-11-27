<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconArrowRight from '~icons/lucide/arrow-right';
	import IconCheck from '~icons/lucide/check';

	interface BeliefCluster {
		id: string;
		label: string;
		coreBeliefs: string[];
		informationDiet: string[];
		identityTies: string[];
		whatTheyDontSee: string[];
		steelMan: string;
		commonGround: string[];
	}

	interface Props {
		onComplete: () => void;
	}

	const { onComplete }: Props = $props();

	const beliefClusters: BeliefCluster[] = [
		{
			id: 'pro-israel',
			label: 'Pro-Israel Perspective',
			coreBeliefs: [
				'Israel has the right to exist and defend itself',
				'Hamas is a terrorist organization that must be destroyed',
				'October 7 was an unprovoked massacre of civilians',
				'Palestinians are primarily victims of their own leadership',
				'Media coverage is biased against Israel'
			],
			informationDiet: [
				'Israeli media (Jerusalem Post, Times of Israel)',
				'US mainstream media (especially pre-Oct 7)',
				'AIPAC communications',
				'Holocaust education emphasizing "never again"',
				'Stories of Israeli victims and hostages'
			],
			identityTies: [
				'Jewish identity and historical persecution',
				'Family connections to Israel',
				'Religious significance of the land',
				'Memory of pogroms, Holocaust',
				'American conservative alignment'
			],
			whatTheyDontSee: [
				'Daily life under occupation/blockade',
				'Settler violence statistics',
				'Palestinian civilian casualty details',
				'International law critiques',
				'Diversity of Palestinian political views'
			],
			steelMan: 'After 2,000 years of persecution culminating in the Holocaust, Jews established a homeland only to face immediate invasion by neighbors. Every peace offer has been rejected. When they withdrew from Gaza, they got rockets. Oct 7 proved that coexistence is not on offer from Hamas.',
			commonGround: [
				'Civilians on all sides deserve protection',
				'Hostages should be released',
				'Long-term peace requires political solution'
			]
		},
		{
			id: 'pro-palestine',
			label: 'Pro-Palestine Perspective',
			coreBeliefs: [
				'Palestinians are living under illegal occupation',
				'Israel is committing war crimes / genocide',
				'Resistance to occupation is legitimate',
				'Western powers are complicit in oppression',
				'The root cause is colonialism, not terrorism'
			],
			informationDiet: [
				'Al Jazeera, Middle East Eye',
				'Social media from Gaza (TikTok, Instagram)',
				'UN reports on settlements and blockade',
				'Human rights organizations (HRW, Amnesty)',
				'Academic post-colonial theory'
			],
			identityTies: [
				'Arab/Muslim identity',
				'Anti-colonial/leftist politics',
				'Solidarity with oppressed peoples',
				'Family connections to Palestine',
				'Academic/activist communities'
			],
			whatTheyDontSee: [
				'Israeli civilian terror experiences',
				'Complexity of Israeli internal politics',
				'History of rejected peace offers',
				'Hamas charter and governance issues',
				'Diversity of Israeli political views'
			],
			steelMan: 'Palestinians have lived under military occupation for 57 years, blockade for 17 years. They cannot vote for the government that controls their lives. Settlements expand constantly. Their children grow up in an open-air prison. When they protest peacefully, they get shot. What options remain?',
			commonGround: [
				'Civilians on all sides deserve protection',
				'Current situation is unsustainable',
				'Dignity and self-determination matter'
			]
		},
		{
			id: 'realist',
			label: 'Realist/Skeptic Perspective',
			coreBeliefs: [
				'Both sides commit atrocities and use propaganda',
				'Geopolitics, not morality, drives state behavior',
				'Media on all sides is biased and selective',
				'Most advocates are poorly informed and tribal',
				'The conflict serves powerful interests on both sides'
			],
			informationDiet: [
				'Multiple sources, cross-referenced',
				'Academic IR and history',
				'Independent journalists on ground',
				'Primary documents when available',
				'Deep skepticism of all narratives'
			],
			identityTies: [
				'Intellectual identity as "objective"',
				'Contrarian positioning',
				'Academic or journalistic role',
				'Distrust of emotional arguments',
				'Sometimes: privilege of distance'
			],
			whatTheyDontSee: [
				'That "neutrality" can enable injustice',
				'Lived experience of those affected',
				'Urgency that demands action not analysis',
				'That power asymmetries matter morally',
				'Their own biases toward "bothsidesism"'
			],
			steelMan: 'This conflict has been going on for 100+ years. Smart people on all sides have tried to solve it. If you think you have the answer after watching some TikToks, you\'re probably wrong. The situation is genuinely tragic with no clean solutions.',
			commonGround: [
				'Complexity should be acknowledged',
				'Propaganda exists on all sides',
				'Easy answers are usually wrong'
			]
		}
	];

	let currentPhase = $state<'intro' | 'explore' | 'reflect' | 'complete'>('intro');
	let selectedCluster = $state<BeliefCluster | null>(null);
	let exploredClusters = $state<Set<string>>(new Set());
	let activeSection = $state<string>('beliefs');

	function selectCluster(cluster: BeliefCluster) {
		selectedCluster = cluster;
		exploredClusters.add(cluster.id);
		activeSection = 'beliefs';
	}

	function closeCluster() {
		selectedCluster = null;
		if (exploredClusters.size >= 2) {
			// Can proceed
		}
	}

	function toReflection() {
		if (exploredClusters.size >= 2) {
			currentPhase = 'reflect';
		}
	}

	// Keyboard
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt) except for Escape
			if ((e.metaKey || e.ctrlKey || e.altKey) && e.key !== 'Escape') return;

			if (currentPhase === 'intro' && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				currentPhase = 'explore';
			} else if (currentPhase === 'explore' && !selectedCluster) {
				const num = parseInt(e.key, 10);
				if (num >= 1 && num <= beliefClusters.length) {
					e.preventDefault();
					selectCluster(beliefClusters[num - 1]);
				}
			} else if (selectedCluster && e.key === 'Escape') {
				e.preventDefault();
				closeCluster();
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const sections = [
		{ id: 'beliefs', label: 'Core Beliefs' },
		{ id: 'diet', label: 'Info Diet' },
		{ id: 'identity', label: 'Identity Ties' },
		{ id: 'blind', label: 'Blind Spots' },
		{ id: 'steel', label: 'Steel Man' }
	];
</script>

<div class="space-y-4">
	{#if currentPhase === 'intro'}
		<div class="text-center space-y-4">
			<h3 class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
				Why Do People Believe What They Believe?
			</h3>
			<p class="text-text-secondary dark:text-text-secondary-dark">
				Beliefs aren't random. They come from <strong>information</strong>, <strong>identity</strong>, and <strong>incentives</strong>.
			</p>
			<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark text-sm text-left space-y-2">
				<p class="text-text-muted dark:text-text-muted-dark">In this exercise, you'll explore:</p>
				<ul class="space-y-1 text-text-secondary dark:text-text-secondary-dark">
					<li>• What different groups believe and why</li>
					<li>• What information they consume</li>
					<li>• What identity is tied to their position</li>
					<li>• What they don't see from their vantage point</li>
					<li>• The strongest version of their argument</li>
				</ul>
			</div>
			<p class="text-xs text-text-muted dark:text-text-muted-dark">
				Press Space to begin
			</p>
		</div>

	{:else if currentPhase === 'explore'}
		{#if !selectedCluster}
			<div class="space-y-4">
				<div class="text-center">
					<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
						Choose a Perspective to Explore
					</h3>
					<p class="text-xs text-text-muted dark:text-text-muted-dark mt-1">
						Understand before you judge
					</p>
				</div>

				<div class="space-y-2">
					{#each beliefClusters as cluster, i (cluster.id)}
						{@const explored = exploredClusters.has(cluster.id)}
						<button
							class="w-full text-left p-4 rounded-lg border transition-all relative
								{explored
									? 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20'
									: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface/50 dark:hover:bg-surface-dark/50'
								}"
							onclick={() => selectCluster(cluster)}
							type="button"
						>
							<div class="flex items-center gap-3">
								<span class="w-6 h-6 flex items-center justify-center rounded bg-surface dark:bg-surface-dark text-text-secondary dark:text-text-secondary-dark text-sm font-mono">
									{i + 1}
								</span>
								<span class="font-medium text-text-primary dark:text-text-primary-dark">
									{cluster.label}
								</span>
							</div>
							{#if explored}
								<span class="absolute top-2 right-2">
									<IconCheck class="w-4 h-4 text-emerald-500" />
								</span>
							{/if}
						</button>
					{/each}
				</div>

				{#if exploredClusters.size >= 2}
					<div class="text-center pt-2">
						<button
							class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
							onclick={toReflection}
							type="button"
						>
							Continue to Reflection
						</button>
					</div>
				{:else}
					<p class="text-center text-xs text-text-muted dark:text-text-muted-dark">
						Explore at least 2 perspectives ({exploredClusters.size}/2)
					</p>
				{/if}
			</div>
		{:else}
			<!-- Cluster Detail View -->
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
						{selectedCluster.label}
					</h3>
					<button
						class="text-xs text-text-muted dark:text-text-muted-dark hover:text-text-secondary"
						onclick={closeCluster}
						type="button"
					>
						ESC to close
					</button>
				</div>

				<!-- Section tabs -->
				<div class="flex gap-1 overflow-x-auto pb-1">
					{#each sections as section (section.id)}
						<button
							class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors
								{activeSection === section.id
									? 'bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark'
									: 'text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark'
								}"
							onclick={() => activeSection = section.id}
							type="button"
						>
							{section.label}
						</button>
					{/each}
				</div>

				<!-- Section content -->
				<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark min-h-[200px]">
					{#if activeSection === 'beliefs'}
						<div class="space-y-2">
							{#each selectedCluster.coreBeliefs as belief}
								<div class="flex items-start gap-2 text-sm">
									<span class="text-accent dark:text-accent-dark mt-0.5">•</span>
									<span class="text-text-primary dark:text-text-primary-dark">{belief}</span>
								</div>
							{/each}
						</div>
					{:else if activeSection === 'diet'}
						<div class="space-y-3">
							<p class="text-xs text-text-muted dark:text-text-muted-dark">
								Where they get information:
							</p>
							{#each selectedCluster.informationDiet as source}
								<div class="flex items-start gap-2 text-sm">
									<IconArrowRight class="w-3 h-3 text-text-muted dark:text-text-muted-dark mt-1 flex-shrink-0" />
									<span class="text-text-secondary dark:text-text-secondary-dark">{source}</span>
								</div>
							{/each}
						</div>
					{:else if activeSection === 'identity'}
						<div class="space-y-3">
							<p class="text-xs text-text-muted dark:text-text-muted-dark">
								Why this position feels personal:
							</p>
							{#each selectedCluster.identityTies as tie}
								<div class="flex items-start gap-2 text-sm">
									<span class="text-amber-500">→</span>
									<span class="text-text-secondary dark:text-text-secondary-dark">{tie}</span>
								</div>
							{/each}
						</div>
					{:else if activeSection === 'blind'}
						<div class="space-y-3">
							<p class="text-xs text-text-muted dark:text-text-muted-dark">
								What this perspective tends to miss:
							</p>
							{#each selectedCluster.whatTheyDontSee as blindspot}
								<div class="flex items-start gap-2 text-sm">
									<span class="text-rose-500">!</span>
									<span class="text-text-secondary dark:text-text-secondary-dark">{blindspot}</span>
								</div>
							{/each}
						</div>
					{:else if activeSection === 'steel'}
						<div class="space-y-4">
							<p class="text-xs text-text-muted dark:text-text-muted-dark">
								The strongest version of this argument:
							</p>
							<p class="text-sm text-text-primary dark:text-text-primary-dark leading-relaxed italic">
								"{selectedCluster.steelMan}"
							</p>
							<div class="pt-2 border-t border-border-subtle dark:border-border-subtle-dark">
								<p class="text-xs text-text-muted dark:text-text-muted-dark mb-2">
									Common ground with other perspectives:
								</p>
								{#each selectedCluster.commonGround as point}
									<div class="flex items-start gap-2 text-sm">
										<span class="text-emerald-500">✓</span>
										<span class="text-text-secondary dark:text-text-secondary-dark">{point}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}

	{:else if currentPhase === 'reflect'}
		<div class="space-y-4">
			<div class="text-center">
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					The Meta-Insight
				</h3>
			</div>

			<div class="space-y-3">
				<div class="p-4 rounded-lg bg-surface dark:bg-surface-dark">
					<p class="text-sm text-text-primary dark:text-text-primary-dark leading-relaxed">
						<strong>People aren't stupid or evil.</strong> They're responding rationally to the information they have,
						filtered through identities they hold, serving interests they have.
					</p>
				</div>

				<div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
					<p class="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
						<strong>The question isn't "who's right?"</strong> It's:<br/>
						• What information am I missing?<br/>
						• What identity is shaping my view?<br/>
						• What would I believe if I were born elsewhere?
					</p>
				</div>

				<div class="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
					<p class="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
						<strong>Understanding ≠ Agreeing.</strong> You can understand why someone believes something
						without endorsing it. But you can't effectively engage without understanding.
					</p>
				</div>
			</div>

			<div class="text-center pt-2">
				<button
					class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
					onclick={() => { currentPhase = 'complete'; onComplete(); }}
					type="button"
				>
					Continue
				</button>
			</div>
		</div>

	{:else if currentPhase === 'complete'}
		<div class="text-center space-y-4 py-4">
			<h3 class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
				Epistemic Humility Acquired
			</h3>
			<p class="text-text-secondary dark:text-text-secondary-dark">
				You now have tools to understand why intelligent people disagree—
				and what you might be missing.
			</p>
		</div>
	{/if}
</div>
