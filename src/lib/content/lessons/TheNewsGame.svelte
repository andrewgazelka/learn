<script lang="ts">
	import {
		LessonPlayer,
		Step,
		ContentStep,
		QuizStep,
		InsightStep,
		InteractiveStep
	} from '$lib/components/lesson';
	import NewsEditorGame from '$lib/components/lesson/NewsEditorGame.svelte';
	import NewsGameReveal from '$lib/components/lesson/NewsGameReveal.svelte';
	import IconNewspaper from '~icons/lucide/newspaper';
	import IconDollarSign from '~icons/lucide/dollar-sign';
	import IconLightbulb from '~icons/lucide/lightbulb';
	import IconUsers from '~icons/lucide/users';
	import IconTarget from '~icons/lucide/target';

	interface Props {
		courseSlug?: string;
	}

	const { courseSlug }: Props = $props();

	// Game state
	let gameStats = $state<{ totalRevenue: number; finalCredibility: number; choices: string[] } | null>(null);

	// Blocking steps: game (1), quizzes (6, 9)
	const blockingSteps = [1, 6, 9];
	const TOTAL_STEPS = 11;
</script>

<LessonPlayer totalSteps={TOTAL_STEPS} {blockingSteps} {courseSlug}>
	{#snippet children({ currentStep, canAdvance, advance, unblock })}

		<!-- Step 0: Hook -->
		<Step visible={currentStep === 0}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconNewspaper class="w-16 h-16" />
				</div>
				<h1 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
					You're a News Editor
				</h1>
				<p class="text-lg text-text-secondary dark:text-text-secondary-dark font-serif">
					Your job: run a profitable news outlet.
				</p>
				<p class="text-text-muted dark:text-text-muted-dark">
					Let's see what choices you make when money is on the line...
				</p>
			</div>
		</Step>

		<!-- Step 1: The Game -->
		<Step visible={currentStep === 1}>
			<div class="space-y-4">
				<div class="text-center">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						The News Game
					</h2>
					<p class="text-text-muted dark:text-text-muted-dark text-sm">
						Pick stories for your front page. Balance revenue and credibility.
					</p>
				</div>

				<NewsEditorGame
					rounds={5}
					onComplete={(stats) => {
						gameStats = stats;
						unblock();
					}}
				/>
			</div>
		</Step>

		<!-- Step 2: Results Reveal -->
		<Step visible={currentStep === 2}>
			<div class="space-y-4">
				<div class="text-center mb-2">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
						Your Results
					</h2>
				</div>

				{#if gameStats}
					<NewsGameReveal
						revenue={gameStats.totalRevenue}
						credibility={gameStats.finalCredibility}
						choices={gameStats.choices}
					/>
				{/if}
			</div>
		</Step>

		<!-- Step 3: The Aha -->
		<Step visible={currentStep === 3}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-accent dark:text-accent-dark">
					<IconLightbulb class="w-12 h-12" />
				</div>
				<h2 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
					This is the<br/><strong class="text-accent dark:text-accent-dark">Incentive Problem</strong>
				</h2>
				<p class="text-lg text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					News outlets aren't trying to deceive you. They're responding to <em>incentives</em>.
				</p>
			</div>
		</Step>

		<!-- Step 4: The Economics -->
		<Step visible={currentStep === 4}>
			<ContentStep title="The Attention Economy">
				<p>
					Most news outlets make money from <strong>advertising</strong>. More clicks = more ad views = more revenue.
				</p>
				<p>
					This creates a fundamental tension: accurate, nuanced reporting often gets <em>less</em> engagement than sensational headlines.
				</p>
				<p class="text-base text-text-muted dark:text-text-muted-dark">
					It's not a conspiracy. It's economics.
				</p>
			</ContentStep>
		</Step>

		<!-- Step 5: Different Models -->
		<Step visible={currentStep === 5}>
			<ContentStep title="Not All Outlets Are Equal">
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<IconDollarSign class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
						<div>
							<div class="font-medium text-text-primary dark:text-text-primary-dark">Ad-Supported</div>
							<div class="text-sm text-text-muted dark:text-text-muted-dark">Maximum incentive for engagement over accuracy</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<IconUsers class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
						<div>
							<div class="font-medium text-text-primary dark:text-text-primary-dark">Subscriber-Funded</div>
							<div class="text-sm text-text-muted dark:text-text-muted-dark">Incentive shifts toward reader trust and retention</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<IconTarget class="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
						<div>
							<div class="font-medium text-text-primary dark:text-text-primary-dark">Donor/Grant-Funded</div>
							<div class="text-sm text-text-muted dark:text-text-muted-dark">Different pressures: funder preferences matter</div>
						</div>
					</div>
				</div>
			</ContentStep>
		</Step>

		<!-- Step 6: Quick Check -->
		<Step visible={currentStep === 6}>
			<QuizStep
				question="A news site makes most of its money from ads. What headline will they likely choose?"
				options={[
					{ id: 'a', text: '"SHOCKING: Celebrity Caught in Scandal"' },
					{ id: 'b', text: '"Analysis: Policy Change May Affect Tax Rates"' },
					{ id: 'c', text: '"Correction: Previous Report Contained Errors"' }
				]}
				correctId="a"
				explanation="Ad-funded outlets optimize for clicks. Shocking headlines get more engagement than nuanced analysis or corrections—even if the latter are more valuable journalism."
				onCorrect={unblock}
			/>
		</Step>

		<!-- Step 7: The Insight -->
		<Step visible={currentStep === 7}>
			<InsightStep title="Key Insight">
				<p>
					<strong>Before judging a story, ask:</strong> How does this outlet make money?
				</p>
				<p class="mt-2 text-base text-text-muted dark:text-text-muted-dark">
					Their business model shapes what gets covered and how it's framed.
				</p>
			</InsightStep>
		</Step>

		<!-- Step 8: Beyond Revenue -->
		<Step visible={currentStep === 8}>
			<ContentStep title="Other Incentives">
				<p>
					Money isn't the only incentive. Media outlets also respond to:
				</p>
				<ul class="list-disc pl-5 space-y-2 text-text-secondary dark:text-text-secondary-dark">
					<li><strong>Audience expectations</strong> — telling readers what they want to hear</li>
					<li><strong>Access journalism</strong> — staying friendly to sources</li>
					<li><strong>Ideological alignment</strong> — editorial worldview shapes coverage</li>
					<li><strong>Speed pressure</strong> — being first beats being right</li>
				</ul>
			</ContentStep>
		</Step>

		<!-- Step 9: Challenge Quiz -->
		<Step visible={currentStep === 9}>
			<QuizStep
				question="A reporter's main source is a government official. How might this affect their coverage?"
				options={[
					{ id: 'a', text: 'No effect — good journalists are objective' },
					{ id: 'b', text: 'They might soften criticism to keep the source' },
					{ id: 'c', text: 'They will automatically be biased against the government' }
				]}
				correctId="b"
				explanation="Access journalism creates pressure. Reporters who are too critical may lose their sources. This doesn't make them corrupt—it's a structural incentive that affects coverage even with good intentions."
				onCorrect={unblock}
			/>
		</Step>

		<!-- Step 10: Framework -->
		<Step visible={currentStep === 10}>
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						Your New Lens
					</h2>
					<p class="text-text-muted dark:text-text-muted-dark text-sm">
						Questions to ask about any news source
					</p>
				</div>

				<div class="space-y-3">
					{#each [
						'How does this outlet make money?',
						'Who is their target audience?',
						'What are they NOT covering?',
						'Who are their sources, and what do those sources want?',
						'What would happen if they published the opposite take?'
					] as question, i}
						<div class="flex items-start gap-3 p-3 rounded-lg bg-surface dark:bg-surface-dark">
							<span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-sm font-medium">
								{i + 1}
							</span>
							<span class="text-text-primary dark:text-text-primary-dark">
								{question}
							</span>
						</div>
					{/each}
				</div>

				<p class="text-center text-sm text-text-muted dark:text-text-muted-dark">
					These questions don't tell you what's true—but they help you understand <em>why</em> you're being told something.
				</p>
			</div>
		</Step>

	{/snippet}
</LessonPlayer>
