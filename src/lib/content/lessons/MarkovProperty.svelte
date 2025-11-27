<script lang="ts">
	import {
		LessonPlayer,
		Step,
		ContentStep,
		QuizStep,
		InsightStep,
		InteractiveStep,
		WeatherGame,
		StatsReveal,
		Math,
		MarkovChain,
		InteractiveMath,
		MathLabel,
		ChessMoveDemo
	} from '$lib/components/lesson';
	import IconSun from '~icons/lucide/sun';
	import IconCloudRain from '~icons/lucide/cloud-rain';
	import IconCloudSun from '~icons/lucide/cloud-sun';
	import IconCircleHelp from '~icons/lucide/circle-help';
	import IconLightbulb from '~icons/lucide/lightbulb';

	// Props from lesson page
	interface Props {
		courseSlug?: string;
	}

	const { courseSlug }: Props = $props();

	// LaTeX with interactive highlighting classes
	const markovEq = String.raw`P(\htmlClass{math-part mp-next}{S_{t+1}} \mid \htmlClass{math-part mp-history}{S_t, S_{t-1}, \ldots, S_0}) = P(\htmlClass{math-part mp-next}{S_{t+1}} \mid \htmlClass{math-part mp-current}{S_t})`;

	// Game state
	let statsWithoutHistory = $state<{ correct: number; total: number } | null>(null);
	let statsWithHistory = $state<{ correct: number; total: number } | null>(null);

	// Markov chain for sandbox
	const weatherStates = [
		{ id: 'sunny', label: 'Sun', icon: IconSun, x: 100, y: 100 },
		{ id: 'rainy', label: 'Rain', icon: IconCloudRain, x: 300, y: 100 }
	];

	const weatherTransitions = [
		{ from: 'sunny', to: 'sunny', probability: 0.8 },
		{ from: 'sunny', to: 'rainy', probability: 0.2 },
		{ from: 'rainy', to: 'rainy', probability: 0.6 },
		{ from: 'rainy', to: 'sunny', probability: 0.4 }
	];

	// Blocking steps: games (1, 3), quizzes (7, 10)
	const blockingSteps = [1, 3, 7, 10];
	const TOTAL_STEPS = 12;
</script>

<LessonPlayer totalSteps={TOTAL_STEPS} {blockingSteps} {courseSlug}>
	{#snippet children({ currentStep, canAdvance, advance, unblock })}

		<!-- Step 0: Hook -->
		<Step visible={currentStep === 0}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-amber-400">
					<IconCloudSun class="w-16 h-16" />
				</div>
				<h1 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
					You're a Weather Forecaster
				</h1>
				<p class="text-lg text-text-secondary dark:text-text-secondary-dark font-serif">
					Your job: predict tomorrow's weather.
				</p>
				<p class="text-text-muted dark:text-text-muted-dark">
					Let's play a game to see how good you are...
				</p>
			</div>
		</Step>

		<!-- Step 1: Game WITHOUT history -->
		<Step visible={currentStep === 1}>
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						Round 1: Just Today
					</h2>
					<p class="text-text-muted dark:text-text-muted-dark text-sm">
						You can only see today's weather. Predict tomorrow.
					</p>
				</div>

				<WeatherGame
					showHistory={false}
					rounds={8}
					onComplete={(stats) => {
						statsWithoutHistory = stats;
						unblock();
					}}
				/>
			</div>
		</Step>

		<!-- Step 2: Transition -->
		<Step visible={currentStep === 2}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-text-secondary dark:text-text-secondary-dark">
					<IconCircleHelp class="w-10 h-10" />
				</div>
				<p class="text-xl font-serif text-text-primary dark:text-text-primary-dark">
					What if you could see the <strong>entire weather history</strong>?
				</p>
				<p class="text-text-secondary dark:text-text-secondary-dark">
					Surely that would help you predict better... right?
				</p>
			</div>
		</Step>

		<!-- Step 3: Game WITH history -->
		<Step visible={currentStep === 3}>
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						Round 2: Full History
					</h2>
					<p class="text-text-muted dark:text-text-muted-dark text-sm">
						Now you can see the last 5 days. Use the patterns!
					</p>
				</div>

				<WeatherGame
					showHistory={true}
					rounds={8}
					onComplete={(stats) => {
						statsWithHistory = stats;
						unblock();
					}}
				/>
			</div>
		</Step>

		<!-- Step 4: The Reveal -->
		<Step visible={currentStep === 4}>
			<div class="space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						Your Results
					</h2>
				</div>

				<StatsReveal
					withoutHistory={statsWithoutHistory}
					withHistory={statsWithHistory}
				/>
			</div>
		</Step>

		<!-- Step 5: The Aha -->
		<Step visible={currentStep === 5}>
			<div class="text-center space-y-6">
				<div class="flex justify-center text-accent dark:text-accent-dark">
					<IconLightbulb class="w-12 h-12" />
				</div>
				<h2 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
					This is called the<br/><strong class="text-accent dark:text-accent-dark">Markov Property</strong>
				</h2>
				<p class="text-lg text-text-secondary dark:text-text-secondary-dark max-w-md mx-auto">
					The future depends <em>only</em> on the present—not on how you got there.
				</p>
			</div>
		</Step>

		<!-- Step 6: Why -->
		<Step visible={currentStep === 6}>
			<ContentStep title="Why didn't history help?">
				<p>
					In this weather model, tomorrow's weather depends <strong>only on today</strong>.
				</p>
				<p>
					If it's sunny today, there's an 80% chance of sun tomorrow—whether yesterday was sunny, rainy, or you had 10 sunny days in a row.
				</p>
				<p class="text-base text-text-muted dark:text-text-muted-dark">
					The past is already "baked into" the present. No extra information hides in the history.
				</p>
			</ContentStep>
		</Step>

		<!-- Step 7: Quick check -->
		<Step visible={currentStep === 7}>
			<QuizStep
				question="After 5 sunny days, what's the probability of rain tomorrow?"
				options={[
					{ id: 'a', text: 'Higher than 20% — rain is "due"' },
					{ id: 'b', text: 'Exactly 20% — only today matters' },
					{ id: 'c', text: 'Lower than 20% — sunny streak continues' }
				]}
				correctId="b"
				explanation="It's exactly 20%. The 5 previous sunny days don't matter—only that TODAY is sunny. That's the Markov property!"
				onCorrect={unblock}
			/>
		</Step>

		<!-- Step 8: The Math -->
		<Step visible={currentStep === 8}>
			<InteractiveMath>
				<div class="space-y-6">
					<ContentStep title="The Math">
						<p>We write this formally as:</p>
					</ContentStep>
					<div class="p-6 rounded-xl bg-surface dark:bg-surface-dark text-center">
						<Math tex={markovEq} block />
					</div>
					<p class="text-center text-sm text-text-muted dark:text-text-muted-dark">
						The probability given <MathLabel part="history">ALL history</MathLabel> = the probability given <MathLabel part="current">JUST the current state</MathLabel>
					</p>
					<p class="text-center text-xs text-text-muted dark:text-text-muted-dark opacity-60">
						(hover over the colored text to highlight)
					</p>
				</div>
			</InteractiveMath>
		</Step>

		<!-- Step 9: Chess Demo -->
		<Step visible={currentStep === 9}>
			<div class="space-y-4">
				<div class="text-center">
					<h2 class="text-xl font-serif text-text-primary dark:text-text-primary-dark mb-2">
						A Tricky Example: Chess
					</h2>
					<p class="text-sm text-text-muted dark:text-text-muted-dark">
						Some moves depend on history you can't see...
					</p>
				</div>
				<ChessMoveDemo />
			</div>
		</Step>

		<!-- Step 10: Challenge -->
		<Step visible={currentStep === 10}>
			<QuizStep
				question="Chess: If you only see the current board position (no move history), do you have a Markov state?"
				options={[
					{ id: 'a', text: 'Yes — the board shows all piece positions' },
					{ id: 'b', text: 'No — some legal moves depend on past moves' }
				]}
				correctId="b"
				explanation="The board alone isn't enough! Castling (moving king + rook together) is only legal if neither piece has moved before—but you can't tell that from the current position. En passant (capturing a pawn that just moved two squares) is only legal immediately after that move. A true Markov state would need to track: which pieces have moved, and the last move made."
				onCorrect={unblock}
			/>
		</Step>

		<!-- Step 11: Sandbox -->
		<Step visible={currentStep === 11}>
			<InteractiveStep instruction="Click states or Step to simulate. Play freely!">
				<div class="text-center mb-4">
					<h2 class="text-2xl font-serif text-text-primary dark:text-text-primary-dark">
						Explore the System
					</h2>
					<p class="text-sm text-text-muted dark:text-text-muted-dark mt-1">
						This is the actual Markov chain you were playing against
					</p>
				</div>
				<MarkovChain states={weatherStates} transitions={weatherTransitions} />
			</InteractiveStep>
		</Step>

	{/snippet}
</LessonPlayer>
