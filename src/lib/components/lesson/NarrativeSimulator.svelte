<script lang="ts">
	import { keybindState } from '$lib/keybinds.svelte';
	import IconArrowRight from '~icons/lucide/arrow-right';

	interface FramedEvent {
		id: string;
		rawFacts: string;
		date: string;
		frames: {
			outlet: string;
			region: 'western' | 'arab' | 'israeli';
			headline: string;
			leadParagraph: string;
			wordChoices: { term: string; alternative: string; effect: string }[];
			whatOmitted: string[];
			emotionalAppeal: string;
		}[];
	}

	interface Props {
		onComplete: () => void;
	}

	const { onComplete }: Props = $props();

	const events: FramedEvent[] = [
		{
			id: 'oct7',
			rawFacts: 'October 7, 2023: Armed militants from Gaza breached border fence, killed approximately 1,200 people in Israel, took approximately 250 hostages.',
			date: 'October 7, 2023',
			frames: [
				{
					outlet: 'CNN (US)',
					region: 'western',
					headline: 'Hamas terrorists attack Israel in deadliest day for Jews since the Holocaust',
					leadParagraph: 'Hamas terrorists launched a brutal and unprecedented attack on Israel Saturday, massacring civilians at a music festival and in their homes.',
					wordChoices: [
						{ term: 'terrorists', alternative: 'militants/fighters', effect: 'Delegitimizes attackers, frames as pure evil vs political violence' },
						{ term: 'massacre', alternative: 'killed', effect: 'Emphasizes brutality, emotional impact' },
						{ term: 'unprecedented', alternative: 'major', effect: 'Frames as unique evil, not part of ongoing conflict' }
					],
					whatOmitted: ['Context of blockade', 'Previous provocations', 'Settler violence statistics'],
					emotionalAppeal: 'Holocaust framing triggers deep historical trauma and moral clarity'
				},
				{
					outlet: 'Al Jazeera (Qatar)',
					region: 'arab',
					headline: 'Palestinian fighters launch major operation against Israel from Gaza',
					leadParagraph: 'Palestinian resistance fighters broke through the Gaza barrier Saturday in a large-scale military operation amid ongoing Israeli occupation.',
					wordChoices: [
						{ term: 'fighters', alternative: 'terrorists', effect: 'Legitimizes as combatants, suggests military action not terrorism' },
						{ term: 'resistance', alternative: 'militant group', effect: 'Frames violence as response to oppression' },
						{ term: 'occupation', alternative: 'disputed territories', effect: 'Establishes root cause narrative' }
					],
					whatOmitted: ['Civilian targeting details', 'Music festival massacre', 'Hostage conditions'],
					emotionalAppeal: 'Resistance framing appeals to anti-colonial sentiment'
				},
				{
					outlet: 'Ynet (Israel)',
					region: 'israeli',
					headline: 'Black Saturday: Hamas Nazis murder 1,200 in worst terror attack in history',
					leadParagraph: 'In an act of pure barbarism, Hamas Nazi terrorists murdered over 1,200 Israelis, including babies, in the worst massacre of Jews since the Holocaust.',
					wordChoices: [
						{ term: 'Nazis', alternative: 'militants', effect: 'Direct Holocaust comparison, absolute evil' },
						{ term: 'barbarism', alternative: 'violence', effect: 'Dehumanizes attackers completely' },
						{ term: 'babies', alternative: 'civilians', effect: 'Maximum emotional impact, innocence emphasized' }
					],
					whatOmitted: ['Any Palestinian perspective', 'Blockade context', 'IDF response failures'],
					emotionalAppeal: 'Existential threat narrative, trauma activation'
				}
			]
		},
		{
			id: 'hospital',
			rawFacts: 'October 17, 2023: Explosion at al-Ahli Arab Hospital in Gaza City. Initial reports claimed Israeli airstrike killed 500. Later investigations suggest misfired rocket, lower casualties (100-300).',
			date: 'October 17, 2023',
			frames: [
				{
					outlet: 'NYT (Initial)',
					region: 'western',
					headline: 'Israeli Strike Kills Hundreds in Gaza Hospital, Palestinians Say',
					leadParagraph: 'An Israeli airstrike hit a Gaza hospital Tuesday, killing hundreds of Palestinians, according to health officials in the Hamas-run enclave.',
					wordChoices: [
						{ term: 'Israeli Strike', alternative: 'Explosion', effect: 'Assigns blame before verification' },
						{ term: 'Palestinians Say', alternative: 'unverified', effect: 'Caveat buried, headline is declarative' },
						{ term: 'Hamas-run', alternative: 'Gaza', effect: 'Subtle delegitimization of source' }
					],
					whatOmitted: ['Alternative explanations', 'Evidence assessment', 'Historical accuracy of Gaza health ministry'],
					emotionalAppeal: 'Hospital bombing is clear war crime if true'
				},
				{
					outlet: 'NYT (Corrected)',
					region: 'western',
					headline: 'Explosion at Gaza Hospital: What We Know',
					leadParagraph: 'An explosion at al-Ahli Arab Hospital killed many Palestinians Tuesday. The cause remains disputed, with conflicting claims from Israel and Hamas.',
					wordChoices: [
						{ term: 'Explosion', alternative: 'strike/attack', effect: 'Neutral on causation' },
						{ term: 'disputed', alternative: 'under investigation', effect: 'Acknowledges uncertainty' },
						{ term: 'many', alternative: '500', effect: 'Avoids unverified numbers' }
					],
					whatOmitted: ['Initial headline that spread virally', 'Accountability for early reporting'],
					emotionalAppeal: 'Measured tone reduces emotional impact'
				},
				{
					outlet: 'Social Media (Pro-Palestine)',
					region: 'arab',
					headline: 'GENOCIDE: Israel bombs hospital, 500 dead. The world watches in silence.',
					leadParagraph: 'Israel has bombed al-Ahli Hospital in Gaza, massacring 500 innocent people seeking shelter. This is genocide. Share widely.',
					wordChoices: [
						{ term: 'GENOCIDE', alternative: 'attack', effect: 'Maximum moral framing, legal term misapplied' },
						{ term: 'massacring', alternative: 'killing', effect: 'Emphasizes intentionality' },
						{ term: 'silence', alternative: 'responding', effect: 'Implies complicity of observers' }
					],
					whatOmitted: ['Evidence assessment', 'Alternative explanations', 'Later corrections'],
					emotionalAppeal: 'Urgency, complicity of inaction, share imperative'
				}
			]
		},
		{
			id: 'rafah',
			rawFacts: 'May 2024: Israel conducts operations in Rafah area. Tent fire kills dozens. Investigation suggests secondary explosions from weapons cache, though strike initiated fire.',
			date: 'May 2024',
			frames: [
				{
					outlet: 'BBC',
					region: 'western',
					headline: 'Rafah strike: At least 45 killed in attack on displacement camp',
					leadParagraph: 'An Israeli airstrike on a displacement camp in Rafah has killed at least 45 Palestinians, including women and children, sparking international condemnation.',
					wordChoices: [
						{ term: 'displacement camp', alternative: 'Hamas compound', effect: 'Emphasizes civilian nature' },
						{ term: 'international condemnation', alternative: 'varied reactions', effect: 'Establishes consensus against' },
						{ term: 'women and children', alternative: 'people', effect: 'Emphasizes innocence of victims' }
					],
					whatOmitted: ['Target justification', 'Secondary explosion details', 'Hamas presence'],
					emotionalAppeal: 'Civilian casualties in safe zone'
				},
				{
					outlet: 'IDF Statement',
					region: 'israeli',
					headline: 'Precision strike eliminates senior Hamas terrorists; secondary explosion under investigation',
					leadParagraph: 'The IDF conducted a precision strike on a Hamas compound, eliminating two senior terrorists. An unexpected fire resulting from secondary explosions is under investigation.',
					wordChoices: [
						{ term: 'precision strike', alternative: 'airstrike', effect: 'Suggests careful targeting' },
						{ term: 'eliminates', alternative: 'kills', effect: 'Military euphemism' },
						{ term: 'unexpected', alternative: 'resulting', effect: 'Suggests unintended consequence' }
					],
					whatOmitted: ['Civilian casualty numbers', 'Tent camp context', 'International reaction'],
					emotionalAppeal: 'Operational success, investigation shows responsibility'
				}
			]
		}
	];

	let currentEventIndex = $state(0);
	let currentFrameIndex = $state(0);
	let showAnalysis = $state(false);
	let completedEvents = $state<Set<string>>(new Set());

	const currentEvent = $derived(events[currentEventIndex]);
	const currentFrame = $derived(currentEvent.frames[currentFrameIndex]);

	function nextFrame() {
		if (currentFrameIndex < currentEvent.frames.length - 1) {
			currentFrameIndex++;
			showAnalysis = false;
		} else {
			completedEvents.add(currentEvent.id);
			if (currentEventIndex < events.length - 1) {
				currentEventIndex++;
				currentFrameIndex = 0;
				showAnalysis = false;
			} else {
				onComplete();
			}
		}
	}

	function toggleAnalysis() {
		showAnalysis = !showAnalysis;
	}

	// Keyboard
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (keybindState.searchOpen || keybindState.helpOpen) return;

			// Ignore if any modifier keys are pressed (Cmd, Ctrl, Alt)
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (showAnalysis) {
					nextFrame();
				} else {
					toggleAnalysis();
				}
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	function getRegionColor(region: string): string {
		switch (region) {
			case 'western': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
			case 'arab': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
			case 'israeli': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
			default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
		}
	}
</script>

<div class="space-y-4">
	<!-- Header -->
	<div class="text-center">
		<div class="text-xs text-text-muted dark:text-text-muted-dark mb-1">
			Event {currentEventIndex + 1}/{events.length} • Frame {currentFrameIndex + 1}/{currentEvent.frames.length}
		</div>
		<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
			Same Event, Different Stories
		</h3>
	</div>

	<!-- Raw facts -->
	<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark">
		<div class="text-xs font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider mb-2">
			Raw Facts
		</div>
		<p class="text-sm text-text-secondary dark:text-text-secondary-dark">
			{currentEvent.rawFacts}
		</p>
	</div>

	<!-- Current frame -->
	<div class="border border-border dark:border-border-dark rounded-lg overflow-hidden">
		<div class="p-3 border-b border-border-subtle dark:border-border-subtle-dark flex items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="font-medium text-text-primary dark:text-text-primary-dark">
					{currentFrame.outlet}
				</span>
				<span class="px-2 py-0.5 rounded-full text-xs {getRegionColor(currentFrame.region)}">
					{currentFrame.region}
				</span>
			</div>
		</div>

		<div class="p-4 space-y-3">
			<h4 class="text-lg font-bold text-text-primary dark:text-text-primary-dark leading-tight">
				{currentFrame.headline}
			</h4>
			<p class="text-sm text-text-secondary dark:text-text-secondary-dark">
				{currentFrame.leadParagraph}
			</p>
		</div>
	</div>

	<!-- Analysis (revealed on click) -->
	{#if showAnalysis}
		<div class="space-y-3">
			<!-- Word choices -->
			<div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
				<div class="text-xs font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
					Word Choices & Effects
				</div>
				<div class="space-y-2">
					{#each currentFrame.wordChoices as choice}
						<div class="text-sm">
							<span class="font-medium text-amber-900 dark:text-amber-100">"{choice.term}"</span>
							<span class="text-amber-700 dark:text-amber-300"> vs </span>
							<span class="text-amber-600 dark:text-amber-400">"{choice.alternative}"</span>
							<p class="text-xs text-amber-700 dark:text-amber-300 mt-0.5">{choice.effect}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- What's omitted -->
			<div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
				<div class="text-xs font-medium text-rose-700 dark:text-rose-300 uppercase tracking-wider mb-2">
					What's Omitted
				</div>
				<ul class="text-sm text-rose-800 dark:text-rose-200 space-y-1">
					{#each currentFrame.whatOmitted as omission}
						<li class="flex items-start gap-2">
							<span class="text-rose-500">-</span>
							{omission}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Emotional appeal -->
			<div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
				<div class="text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
					Emotional Strategy
				</div>
				<p class="text-sm text-purple-800 dark:text-purple-200">
					{currentFrame.emotionalAppeal}
				</p>
			</div>
		</div>
	{/if}

	<!-- Action -->
	<div class="text-center pt-2">
		<button
			class="px-4 py-2 rounded-lg bg-text-primary dark:bg-text-primary-dark text-surface-elevated dark:text-surface-dark font-medium text-sm"
			onclick={() => showAnalysis ? nextFrame() : toggleAnalysis()}
			type="button"
		>
			{showAnalysis
				? (currentFrameIndex < currentEvent.frames.length - 1
					? 'Next Frame'
					: currentEventIndex < events.length - 1
						? 'Next Event'
						: 'Complete')
				: 'Analyze This Frame'}
		</button>
		<p class="text-xs text-text-muted dark:text-text-muted-dark mt-2">
			Press Space to continue
		</p>
	</div>
</div>
