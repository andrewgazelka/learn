<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconTarget from '~icons/lucide/target';
	import IconUsers from '~icons/lucide/users';
	import IconShield from '~icons/lucide/shield';
	import IconMegaphone from '~icons/lucide/megaphone';
	import IconGlobe from '~icons/lucide/globe';
	import IconDollarSign from '~icons/lucide/dollar-sign';
	import IconVote from '~icons/lucide/vote';
	import IconTv from '~icons/lucide/tv';

	interface Stakeholder {
		id: string;
		name: string;
		icon: typeof IconTarget;
		color: string;
		primaryGoals: string[];
		constraints: string[];
		incentives: string[];
		whatTheySay: string;
		whyTheySayIt: string;
		audienceBelieves: string;
	}

	interface Scenario {
		id: string;
		event: string;
		date: string;
		context: string;
		stakeholderResponses: Record<string, {
			publicStatement: string;
			likelyPrivateCalculation: string;
			targetAudience: string;
		}>;
	}

	interface Props {
		onComplete: (insights: string[]) => void;
	}

	const { onComplete }: Props = $props();

	const stakeholders: Stakeholder[] = [
		{
			id: 'israeli-gov',
			name: 'Israeli Government',
			icon: IconShield,
			color: 'text-blue-500',
			primaryGoals: ['Security for citizens', 'Territorial control', 'International legitimacy', 'Domestic political survival'],
			constraints: ['Coalition politics', 'Military capacity', 'US relationship', 'International law concerns'],
			incentives: ['Appearing strong domestically', 'Maintaining US support', 'Preventing rocket attacks', 'Settler constituency'],
			whatTheySay: '"We have the right to defend ourselves against terrorism"',
			whyTheySayIt: 'Frames military action as defensive, invokes universal principle of self-defense, positions opponent as aggressor',
			audienceBelieves: 'Israel faces existential threat and responds proportionally to attacks'
		},
		{
			id: 'hamas',
			name: 'Hamas Leadership',
			icon: IconTarget,
			color: 'text-green-600',
			primaryGoals: ['Political power in Gaza', 'Resistance to occupation', 'Regional relevance', 'Organizational survival'],
			constraints: ['Limited military power', 'Blockade effects', 'Rival factions', 'Civilian population needs'],
			incentives: ['Appearing as resistance leader', 'Provoking Israeli overreaction', 'Gaining regional support', 'Undermining PA'],
			whatTheySay: '"We resist occupation by any means necessary"',
			whyTheySayIt: 'Frames violence as legitimate resistance, positions Israel as occupier, appeals to broader Arab/Muslim solidarity',
			audienceBelieves: 'Armed resistance is the only effective response to oppression'
		},
		{
			id: 'palestinian-civilian',
			name: 'Palestinian Civilians',
			icon: IconUsers,
			color: 'text-amber-600',
			primaryGoals: ['Safety', 'Freedom of movement', 'Economic opportunity', 'Dignity', 'Family reunification'],
			constraints: ['Blockade', 'Checkpoints', 'Limited resources', 'Caught between powers'],
			incentives: ['Survival', 'Normalcy', 'Often skeptical of ALL leadership'],
			whatTheySay: '"We just want to live normal lives"',
			whyTheySayIt: 'Genuine expression of daily reality often lost in political narratives',
			audienceBelieves: 'Civilians suffer regardless of which side claims to represent them'
		},
		{
			id: 'us-politician',
			name: 'US Politicians',
			icon: IconVote,
			color: 'text-red-500',
			primaryGoals: ['Re-election', 'Donor relationships', 'Party loyalty', 'Appearing "pro-Israel" or "balanced"'],
			constraints: ['AIPAC influence', 'Evangelical base', 'Progressive wing', 'Strategic interests'],
			incentives: ['Campaign donations', 'Avoiding controversy', 'Appearing strong on security', 'Base enthusiasm'],
			whatTheySay: '"Israel has the right to defend itself" (most) or "We must protect civilian lives" (progressive)',
			whyTheySayIt: 'Calculated to satisfy key constituencies while avoiding electoral risk',
			audienceBelieves: 'Position reflects genuine moral stance rather than political calculation'
		},
		{
			id: 'western-media',
			name: 'Western Media Outlets',
			icon: IconTv,
			color: 'text-purple-500',
			primaryGoals: ['Audience engagement', 'Advertising revenue', 'Access to sources', 'Appearing balanced'],
			constraints: ['Editorial guidelines', 'Accusations of bias', 'Complexity hard to convey', 'Attention spans'],
			incentives: ['Dramatic footage', 'Clear narratives', 'Avoiding advertiser backlash', 'Maintaining source access'],
			whatTheySay: 'Framing varies: "Israel strikes Gaza" vs "Gaza militants fire rockets"',
			whyTheySayIt: 'Word choice reflects assumed audience, editorial policy, and which sources have access',
			audienceBelieves: 'Coverage is objective rather than shaped by institutional pressures'
		},
		{
			id: 'social-media-activist',
			name: 'Social Media Activists',
			icon: IconMegaphone,
			color: 'text-pink-500',
			primaryGoals: ['Influence narrative', 'Build following', 'Express identity', 'Feel morally righteous'],
			constraints: ['Algorithm rewards outrage', 'Echo chambers', 'Limited expertise', 'Pressure to take sides'],
			incentives: ['Engagement metrics', 'Social validation', 'Belonging to movement', 'Avoiding nuance'],
			whatTheySay: 'Absolute statements: "Genocide!" or "Terrorism!"',
			whyTheySayIt: 'Algorithms amplify extreme positions. Nuance gets no engagement. Identity becomes tied to position.',
			audienceBelieves: 'Viral content reflects truth rather than what spreads best'
		}
	];

	const scenarios: Scenario[] = [
		{
			id: 'oct7',
			event: 'October 7, 2023 Attack',
			date: 'October 7, 2023',
			context: 'Hamas militants breach Gaza border, kill ~1,200 Israelis, take ~250 hostages',
			stakeholderResponses: {
				'israeli-gov': {
					publicStatement: 'Unprecedented terrorist attack. We will destroy Hamas.',
					likelyPrivateCalculation: 'Massive intelligence failure. Must respond overwhelmingly or lose power. Opportunity to eliminate Hamas permanently.',
					targetAudience: 'Israeli public, US government, international community'
				},
				'hamas': {
					publicStatement: 'Al-Aqsa Flood operation - legitimate resistance against occupation.',
					likelyPrivateCalculation: 'Expect massive retaliation. Goal: provoke overreaction that shifts global opinion, break normalization momentum.',
					targetAudience: 'Palestinian supporters, Arab world, Global South'
				},
				'us-politician': {
					publicStatement: 'Israel has the right to defend itself. We stand with Israel.',
					likelyPrivateCalculation: 'Any hesitation = political death. Donor pressure immediate. Progressive base will complain but won\'t primary me.',
					targetAudience: 'Donors, AIPAC, general electorate'
				},
				'western-media': {
					publicStatement: 'Hamas terrorists attack Israel in deadliest day since Holocaust.',
					likelyPrivateCalculation: 'Clear villain/victim narrative. High engagement. Complexity comes later (or never).',
					targetAudience: 'Western audiences expecting clear moral framing'
				}
			}
		},
		{
			id: 'hospital',
			event: 'Al-Ahli Hospital Explosion',
			date: 'October 17, 2023',
			context: 'Explosion at hospital in Gaza. Initial reports claim Israeli airstrike killed 500. Later evidence suggests misfired rocket, lower casualties.',
			stakeholderResponses: {
				'israeli-gov': {
					publicStatement: 'This was a Palestinian Islamic Jihad rocket misfire. Here is our intelligence.',
					likelyPrivateCalculation: 'Must counter narrative immediately. Release intercepts even if reveals sources. PR battle is critical.',
					targetAudience: 'International media, US government, undecided observers'
				},
				'hamas': {
					publicStatement: 'Israeli massacre of civilians at hospital. War crime.',
					likelyPrivateCalculation: 'Initial narrative will stick regardless of evidence. Get the story out fast. Details can be contested forever.',
					targetAudience: 'Global media, Arab governments, protesters worldwide'
				},
				'western-media': {
					publicStatement: 'Initially: "Israeli airstrike kills 500 at hospital" → Later: "Explosion at hospital, cause disputed"',
					likelyPrivateCalculation: 'First reports drive traffic. Corrections get 1/100th the engagement. Institutional pressure to not appear pro-Israel.',
					targetAudience: 'Engaged readers seeking breaking news'
				},
				'social-media-activist': {
					publicStatement: 'GENOCIDE! Israel bombs hospital! (continues even after counter-evidence)',
					likelyPrivateCalculation: 'Retracting = losing face. Initial framing becomes identity. Counter-evidence is "propaganda".',
					targetAudience: 'Followers who share worldview, algorithm'
				}
			}
		},
		{
			id: 'rafah',
			event: 'Rafah Ground Operation Debate',
			date: 'February 2024',
			context: 'Israel plans ground operation in Rafah. 1.4M displaced Palestinians sheltering there. US expresses concern.',
			stakeholderResponses: {
				'israeli-gov': {
					publicStatement: 'Rafah operation essential to destroy remaining Hamas battalions. Will minimize civilian harm.',
					likelyPrivateCalculation: 'Must show war can be "won". Coalition demands it. US will protest but not act. Hostage deal leverage.',
					targetAudience: 'Israeli voters, Biden administration, military'
				},
				'us-politician': {
					publicStatement: 'We urge Israel to protect civilians. (continues arms shipments)',
					likelyPrivateCalculation: 'Rhetoric of concern satisfies progressive critics. Actual policy satisfies donors. Election year = avoid hard choices.',
					targetAudience: 'Both pro-Israel donors AND concerned progressives'
				},
				'palestinian-civilian': {
					publicStatement: 'Where are we supposed to go? There is nowhere safe.',
					likelyPrivateCalculation: 'Not strategic calculation - genuine desperation. No power, no voice, no options.',
					targetAudience: 'Anyone who will listen'
				}
			}
		}
	];

	let currentView = $state<'stakeholders' | 'scenarios' | 'complete'>('stakeholders');
	let selectedStakeholder = $state<Stakeholder | null>(null);
	let viewedStakeholders = $state<Set<string>>(new Set());
	let currentScenarioIndex = $state(0);
	let viewedScenarioResponses = $state<Set<string>>(new Set());
	let collectedInsights = $state<string[]>([]);

	function selectStakeholder(s: Stakeholder) {
		selectedStakeholder = s;
		viewedStakeholders.add(s.id);
	}

	function closeStakeholder() {
		selectedStakeholder = null;
		// Check if should move to scenarios
		if (viewedStakeholders.size >= 4) {
			currentView = 'scenarios';
		}
	}

	function viewResponse(stakeholderId: string) {
		const key = `${scenarios[currentScenarioIndex].id}-${stakeholderId}`;
		viewedScenarioResponses.add(key);
	}

	function nextScenario() {
		if (currentScenarioIndex < scenarios.length - 1) {
			currentScenarioIndex++;
		} else {
			// Generate insights based on what they viewed
			const insights = [
				'Every actor optimizes for their own survival/goals, not "truth"',
				'Public statements rarely match private calculations',
				'The same facts support radically different narratives',
				'Understanding motives ≠ agreeing with actions',
				'Civilians have the least power but bear the most cost'
			];
			collectedInsights = insights;
			currentView = 'complete';
			onComplete(insights);
		}
	}

	// Keyboard navigation
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt) except for Escape
			if ((e.metaKey || e.ctrlKey || e.altKey) && e.key !== 'Escape') return;

			if (currentView === 'stakeholders' && !selectedStakeholder) {
				const num = parseInt(e.key, 10);
				if (num >= 1 && num <= stakeholders.length) {
					e.preventDefault();
					selectStakeholder(stakeholders[num - 1]);
				}
			} else if (selectedStakeholder && e.key === 'Escape') {
				e.preventDefault();
				closeStakeholder();
			} else if (currentView === 'scenarios' && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				nextScenario();
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const currentScenario = $derived(scenarios[currentScenarioIndex]);
</script>

<div class="space-y-4">
	{#if currentView === 'stakeholders'}
		<!-- Stakeholder Selection -->
		{#if !selectedStakeholder}
			<div class="text-center mb-4">
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					Choose a Stakeholder to Analyze
				</h3>
				<p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">
					Understand their goals, constraints, and true incentives
				</p>
			</div>

			<div class="grid grid-cols-2 gap-2">
				{#each stakeholders as stakeholder, i (stakeholder.id)}
					{@const viewed = viewedStakeholders.has(stakeholder.id)}
					<button
						class="relative p-3 rounded-lg border text-left transition-all
							{viewed
								? 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20'
								: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark hover:bg-surface/50 dark:hover:bg-surface-dark/50'
							}"
						onclick={() => selectStakeholder(stakeholder)}
						type="button"
					>
						<div class="flex items-center gap-2">
							<span class="text-xs font-mono text-text-muted dark:text-text-muted-dark w-4">
								{i + 1}
							</span>
							<stakeholder.icon class="w-4 h-4 {stakeholder.color}" />
							<span class="text-sm font-medium text-text-primary dark:text-text-primary-dark">
								{stakeholder.name}
							</span>
						</div>
						{#if viewed}
							<span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
						{/if}
					</button>
				{/each}
			</div>

			<p class="text-center text-xs text-text-muted dark:text-text-muted-dark pt-2">
				Analyze at least 4 stakeholders to continue
				<span class="font-mono">({viewedStakeholders.size}/4)</span>
			</p>
		{:else}
			<!-- Stakeholder Detail -->
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<selectedStakeholder.icon class="w-5 h-5 {selectedStakeholder.color}" />
						<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
							{selectedStakeholder.name}
						</h3>
					</div>
					<button
						class="text-xs text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark"
						onclick={closeStakeholder}
						type="button"
					>
						ESC to close
					</button>
				</div>

				<div class="space-y-3">
					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark">
						<div class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-2">
							Primary Goals
						</div>
						<ul class="text-sm text-text-secondary dark:text-text-secondary-dark space-y-1">
							{#each selectedStakeholder.primaryGoals as goal}
								<li class="flex items-start gap-2">
									<span class="text-text-muted dark:text-text-muted-dark">-</span>
									{goal}
								</li>
							{/each}
						</ul>
					</div>

					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark">
						<div class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-2">
							Real Incentives
						</div>
						<ul class="text-sm text-text-secondary dark:text-text-secondary-dark space-y-1">
							{#each selectedStakeholder.incentives as incentive}
								<li class="flex items-start gap-2">
									<span class="text-amber-500">→</span>
									{incentive}
								</li>
							{/each}
						</ul>
					</div>

					<div class="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
						<div class="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
							What They Say
						</div>
						<p class="text-sm italic text-amber-900 dark:text-amber-100 mb-2">
							{selectedStakeholder.whatTheySay}
						</p>
						<div class="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1 mt-3">
							Why They Say It
						</div>
						<p class="text-sm text-amber-800 dark:text-amber-200">
							{selectedStakeholder.whyTheySayIt}
						</p>
					</div>

					<div class="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30">
						<div class="text-xs font-medium text-rose-700 dark:text-rose-300 uppercase tracking-wider mb-2">
							What Audience Believes
						</div>
						<p class="text-sm text-rose-800 dark:text-rose-200">
							{selectedStakeholder.audienceBelieves}
						</p>
					</div>
				</div>
			</div>
		{/if}

	{:else if currentView === 'scenarios'}
		<!-- Scenario Analysis -->
		<div class="space-y-4">
			<div class="text-center">
				<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">
					Scenario {currentScenarioIndex + 1}/{scenarios.length}
				</div>
				<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
					{currentScenario.event}
				</h3>
				<p class="text-xs text-text-muted dark:text-text-muted-dark mt-1">
					{currentScenario.date}
				</p>
			</div>

			<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-sm text-text-secondary dark:text-text-secondary-dark">
				{currentScenario.context}
			</div>

			<div class="space-y-2">
				<div class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
					How Each Actor Responded
				</div>
				{#each Object.entries(currentScenario.stakeholderResponses) as [stakeholderId, response]}
					{@const stakeholder = stakeholders.find(s => s.id === stakeholderId)}
					{@const responseKey = `${currentScenario.id}-${stakeholderId}`}
					{@const isViewed = viewedScenarioResponses.has(responseKey)}
					{#if stakeholder}
						<button
							class="w-full text-left p-3 rounded-lg border transition-all
								{isViewed
									? 'border-border dark:border-border-dark bg-surface dark:bg-surface-dark'
									: 'border-border-subtle dark:border-border-subtle-dark hover:border-border dark:hover:border-border-dark'
								}"
							onclick={() => viewResponse(stakeholderId)}
							type="button"
						>
							<div class="flex items-center gap-2 mb-2">
								<stakeholder.icon class="w-4 h-4 {stakeholder.color}" />
								<span class="text-sm font-medium text-text-primary dark:text-text-primary-dark">
									{stakeholder.name}
								</span>
							</div>

							{#if isViewed}
								<div class="space-y-2 text-sm">
									<div>
										<span class="text-xs text-text-muted dark:text-text-muted-dark">Public:</span>
										<p class="text-text-secondary dark:text-text-secondary-dark italic">
											"{response.publicStatement}"
										</p>
									</div>
									<div class="p-2 rounded bg-amber-50/50 dark:bg-amber-950/30">
										<span class="text-xs text-amber-600 dark:text-amber-400">Private calculation:</span>
										<p class="text-amber-800 dark:text-amber-200 text-xs mt-1">
											{response.likelyPrivateCalculation}
										</p>
									</div>
									<div class="text-xs text-text-muted dark:text-text-muted-dark">
										Target audience: {response.targetAudience}
									</div>
								</div>
							{:else}
								<p class="text-xs text-text-muted dark:text-text-muted-dark">
									Click to reveal response analysis
								</p>
							{/if}
						</button>
					{/if}
				{/each}
			</div>

			<div class="text-center pt-2">
				<button
					class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
					onclick={nextScenario}
					type="button"
				>
					{currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'See Insights'}
				</button>
			</div>
		</div>

	{:else if currentView === 'complete'}
		<!-- Insights -->
		<div class="space-y-4 text-center">
			<h3 class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
				Key Insights
			</h3>
			<div class="space-y-2">
				{#each collectedInsights as insight, i}
					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-left">
						<span class="text-accent dark:text-accent-dark font-mono mr-2">{i + 1}.</span>
						<span class="text-text-primary dark:text-text-primary-dark">{insight}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
