<script lang="ts">
	import {
		LessonPlayer,
		Step,
		ContentStep,
		QuizStep,
		InsightStep,
		InteractiveStep
	} from '$lib/components/lesson';
	import StakeholderGame from '$lib/components/lesson/StakeholderGame.svelte';
	import ConflictGameTheory from '$lib/components/lesson/ConflictGameTheory.svelte';
	import BeliefMapper from '$lib/components/lesson/BeliefMapper.svelte';
	import NarrativeSimulator from '$lib/components/lesson/NarrativeSimulator.svelte';
	import IconGlobe from '~icons/lucide/globe';
	import IconTarget from '~icons/lucide/target';
	import IconBrain from '~icons/lucide/brain';
	import IconLightbulb from '~icons/lucide/lightbulb';
	import IconAlertTriangle from '~icons/lucide/alert-triangle';
	import IconScale from '~icons/lucide/scale';

	interface Props {
		courseSlug?: string;
	}

	const { courseSlug }: Props = $props();

	// Blocking steps: interactive games (2, 5, 8, 11), quiz (14)
	const blockingSteps = [2, 5, 8, 11, 14];
	const TOTAL_STEPS = 17;
</script>

<LessonPlayer totalSteps={TOTAL_STEPS} {blockingSteps} {courseSlug}>
	{#snippet children({ currentStep, canAdvance, advance, unblock })}

		<!-- Step 0: Warning/Framing -->
		<Step visible={currentStep === 0}>
			<div class="space-y-6">
				<div class="flex justify-center text-amber-500">
					<IconAlertTriangle class="w-12 h-12" />
				</div>
				<h1 class="text-2xl md:text-3xl font-serif text-text-primary dark:text-text-primary-dark text-center">
					Before We Begin
				</h1>
				<div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm space-y-3">
					<p class="text-amber-900 dark:text-amber-100">
						<strong>This lesson will not tell you what to believe</strong> about the Israel-Palestine conflict.
					</p>
					<p class="text-amber-800 dark:text-amber-200">
						Instead, you'll develop tools to:
					</p>
					<ul class="space-y-1 text-amber-800 dark:text-amber-200 pl-4">
						<li>• Understand why different actors say what they say</li>
						<li>• Recognize how the same facts become different stories</li>
						<li>• Apply game theory to understand "irrational" behavior</li>
						<li>• See your own potential blind spots</li>
					</ul>
					<p class="text-amber-700 dark:text-amber-300 text-xs pt-2">
						Real people are suffering. The goal is better understanding, not detachment.
					</p>
				</div>
			</div>
		</Step>

		<!-- Step 1: The Core Problem -->
		<Step visible={currentStep === 1}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconGlobe class="w-16 h-16" />
				</div>
				<h2 class="text-2xl md:text-3xl font-serif text-text-primary dark:text-text-primary-dark">
					The Information Problem
				</h2>
				<p class="text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					You've probably seen confident takes on this conflict. Here's what they usually miss:
				</p>
				<div class="text-left space-y-2 max-w-md mx-auto">
					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-sm">
						<strong>Most people's information</strong> comes from sources that already agree with them
					</div>
					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-sm">
						<strong>Every source has incentives</strong> — including "neutral" ones
					</div>
					<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark text-sm">
						<strong>Understanding motives ≠ agreeing</strong> with actions
					</div>
				</div>
			</div>
		</Step>

		<!-- Step 2: Stakeholder Game -->
		<Step visible={currentStep === 2}>
			<div class="space-y-4">
				<div class="text-center">
					<h2 class="text-xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						Who Says What — And Why
					</h2>
					<p class="text-sm text-text-muted dark:text-text-muted-dark">
						Explore different actors' goals, incentives, and what they're really optimizing for
					</p>
				</div>

				<StakeholderGame
					onComplete={(insights) => {
						unblock();
					}}
				/>
			</div>
		</Step>

		<!-- Step 3: Stakeholder Insight -->
		<Step visible={currentStep === 3}>
			<InsightStep title="Key Insight">
				<p>
					<strong>Public statements are performances</strong> for specific audiences.
				</p>
				<p class="mt-3 text-base text-text-muted dark:text-text-muted-dark">
					Every actor optimizes for survival — political, organizational, or literal.
					Their words serve their interests, not necessarily truth.
				</p>
			</InsightStep>
		</Step>

		<!-- Step 4: Framing intro -->
		<Step visible={currentStep === 4}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconTarget class="w-12 h-12" />
				</div>
				<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
					Same Facts, Different Stories
				</h2>
				<p class="text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					The most powerful form of bias isn't lying — it's <strong>framing</strong>.
				</p>
				<p class="text-sm text-text-muted dark:text-text-muted-dark max-w-md mx-auto">
					Next, you'll see how different outlets cover the exact same events.
					Watch for word choices, what's emphasized, and what's omitted.
				</p>
			</div>
		</Step>

		<!-- Step 5: Narrative Simulator -->
		<Step visible={currentStep === 5}>
			<div class="space-y-4">
				<NarrativeSimulator onComplete={unblock} />
			</div>
		</Step>

		<!-- Step 6: Framing Insight -->
		<Step visible={currentStep === 6}>
			<ContentStep title="What You Just Saw">
				<div class="space-y-3">
					<p>
						<strong>Word choice is never neutral.</strong> "Terrorists" vs "fighters" vs "militants" — each word carries a verdict.
					</p>
					<p>
						<strong>Headlines travel; corrections don't.</strong> The first framing wins, even if wrong.
					</p>
					<p>
						<strong>Omission is invisible.</strong> You can't notice what isn't there.
					</p>
				</div>
			</ContentStep>
		</Step>

		<!-- Step 7: Game Theory intro -->
		<Step visible={currentStep === 7}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconScale class="w-12 h-12" />
				</div>
				<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
					Why Can't They Just Make Peace?
				</h2>
				<p class="text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					This question assumes both sides want peace. Game theory shows why that's complicated.
				</p>
			</div>
		</Step>

		<!-- Step 8: Game Theory -->
		<Step visible={currentStep === 8}>
			<div class="space-y-4">
				<ConflictGameTheory onComplete={unblock} />
			</div>
		</Step>

		<!-- Step 9: Game Theory debrief -->
		<Step visible={currentStep === 9}>
			<ContentStep title="The Game Theory Lens">
				<div class="space-y-3">
					<p>
						<strong>It's not about good vs evil.</strong> It's about incentive structures that make cooperation hard.
					</p>
					<p>
						<strong>Leaders face their own constituencies.</strong> A leader who compromises may be replaced by one who won't.
					</p>
					<p>
						<strong>Spoilers exist on all sides.</strong> Those who benefit from conflict can always sabotage peace.
					</p>
				</div>
			</ContentStep>
		</Step>

		<!-- Step 10: Belief mapping intro -->
		<Step visible={currentStep === 10}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconBrain class="w-12 h-12" />
				</div>
				<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
					Why Do Smart People Disagree?
				</h2>
				<p class="text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					Intelligent, well-meaning people hold opposite views on this conflict. That's not because one side is stupid.
				</p>
				<p class="text-sm text-text-muted dark:text-text-muted-dark max-w-md mx-auto">
					Beliefs come from information + identity + incentives.
				</p>
			</div>
		</Step>

		<!-- Step 11: Belief Mapper -->
		<Step visible={currentStep === 11}>
			<div class="space-y-4">
				<BeliefMapper onComplete={unblock} />
			</div>
		</Step>

		<!-- Step 12: Epistemic humility -->
		<Step visible={currentStep === 12}>
			<InsightStep title="The Hardest Insight">
				<p>
					<strong>You also have blind spots.</strong>
				</p>
				<p class="mt-3 text-base text-text-muted dark:text-text-muted-dark">
					Your information diet, your identity, your social incentives — they all shape what you see.
					The question isn't whether you're biased. It's how.
				</p>
			</InsightStep>
		</Step>

		<!-- Step 13: Synthesis -->
		<Step visible={currentStep === 13}>
			<ContentStep title="Putting It Together">
				<div class="space-y-4">
					<p>You now have four lenses:</p>
					<div class="grid gap-2">
						<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark flex items-start gap-3">
							<span class="text-accent dark:text-accent-dark font-mono">1</span>
							<div>
								<div class="font-medium text-text-primary dark:text-text-primary-dark">Stakeholder Analysis</div>
								<div class="text-sm text-text-muted dark:text-text-muted-dark">Who benefits from this narrative?</div>
							</div>
						</div>
						<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark flex items-start gap-3">
							<span class="text-accent dark:text-accent-dark font-mono">2</span>
							<div>
								<div class="font-medium text-text-primary dark:text-text-primary-dark">Framing Analysis</div>
								<div class="text-sm text-text-muted dark:text-text-muted-dark">What's emphasized? What's omitted?</div>
							</div>
						</div>
						<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark flex items-start gap-3">
							<span class="text-accent dark:text-accent-dark font-mono">3</span>
							<div>
								<div class="font-medium text-text-primary dark:text-text-primary-dark">Game Theory</div>
								<div class="text-sm text-text-muted dark:text-text-muted-dark">What incentives drive behavior?</div>
							</div>
						</div>
						<div class="p-3 rounded-lg bg-surface dark:bg-surface-dark flex items-start gap-3">
							<span class="text-accent dark:text-accent-dark font-mono">4</span>
							<div>
								<div class="font-medium text-text-primary dark:text-text-primary-dark">Belief Mapping</div>
								<div class="text-sm text-text-muted dark:text-text-muted-dark">Why do people hold these views?</div>
							</div>
						</div>
					</div>
				</div>
			</ContentStep>
		</Step>

		<!-- Step 14: Final Quiz -->
		<Step visible={currentStep === 14}>
			<QuizStep
				question="A viral tweet claims 'Israel/Hamas did X horrific thing.' What's your FIRST response?"
				options={[
					{ id: 'a', text: 'Share it immediately — people need to know' },
					{ id: 'b', text: 'Dismiss it — that side always lies' },
					{ id: 'c', text: 'Ask: Who posted this? What sources? What do other outlets say?' },
					{ id: 'd', text: 'Add it to my mental model without verification' }
				]}
				correctId="c"
				explanation="Verification first. Viral claims often mutate or misrepresent. Neither immediate sharing nor dismissal serves truth. Cross-reference before updating beliefs."
				onCorrect={unblock}
			/>
		</Step>

		<!-- Step 15: What this doesn't do -->
		<Step visible={currentStep === 15}>
			<div class="space-y-4">
				<div class="flex items-center gap-2 justify-center">
					<IconAlertTriangle class="w-5 h-5 text-amber-500" />
					<h3 class="text-lg font-medium text-text-primary dark:text-text-primary-dark">
						What These Tools Don't Do
					</h3>
				</div>

				<div class="space-y-3 text-sm">
					<div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
						<p class="text-rose-800 dark:text-rose-200">
							<strong>They don't make all positions equal.</strong> Understanding why someone believes something
							doesn't mean their beliefs are valid. Evidence still matters.
						</p>
					</div>
					<div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
						<p class="text-rose-800 dark:text-rose-200">
							<strong>They don't eliminate moral judgment.</strong> You can understand incentives
							and still conclude that some actions are wrong.
						</p>
					</div>
					<div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
						<p class="text-rose-800 dark:text-rose-200">
							<strong>They don't create false balance.</strong> "Both sides" framing can obscure
							real power asymmetries and factual realities.
						</p>
					</div>
				</div>
			</div>
		</Step>

		<!-- Step 16: Final -->
		<Step visible={currentStep === 16}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-accent dark:text-accent-dark">
					<IconLightbulb class="w-12 h-12" />
				</div>
				<h2 class="text-2xl md:text-3xl font-serif text-text-primary dark:text-text-primary-dark">
					Your Framework
				</h2>
				<div class="text-left max-w-md mx-auto space-y-4">
					<p class="text-text-secondary dark:text-text-secondary-dark">
						When you encounter a claim about this conflict:
					</p>
					<ol class="space-y-2 text-sm text-text-secondary dark:text-text-secondary-dark">
						<li class="flex gap-2">
							<span class="text-accent dark:text-accent-dark font-mono">1.</span>
							<span><strong>Who</strong> is saying this? What do they want?</span>
						</li>
						<li class="flex gap-2">
							<span class="text-accent dark:text-accent-dark font-mono">2.</span>
							<span><strong>How</strong> is this framed? What words were chosen?</span>
						</li>
						<li class="flex gap-2">
							<span class="text-accent dark:text-accent-dark font-mono">3.</span>
							<span><strong>What's missing?</strong> What would the other side say?</span>
						</li>
						<li class="flex gap-2">
							<span class="text-accent dark:text-accent-dark font-mono">4.</span>
							<span><strong>Why</strong> might I be predisposed to believe/disbelieve this?</span>
						</li>
						<li class="flex gap-2">
							<span class="text-accent dark:text-accent-dark font-mono">5.</span>
							<span><strong>What evidence</strong> would change my mind?</span>
						</li>
					</ol>
				</div>
				<p class="text-sm text-text-muted dark:text-text-muted-dark pt-4">
					Truth exists. These tools help you find it.
				</p>
			</div>
		</Step>

	{/snippet}
</LessonPlayer>
