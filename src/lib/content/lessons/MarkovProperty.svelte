<script lang="ts">
	import { Math, Callout, Paragraph, Heading, MarkovChain, Quiz } from '$lib/components/lesson';

	// Weather example states
	const weatherStates = [
		{ id: 'sunny', label: 'Sunny', x: 100, y: 100 },
		{ id: 'rainy', label: 'Rainy', x: 300, y: 100 }
	];

	const weatherTransitions = [
		{ from: 'sunny', to: 'sunny', probability: 0.8 },
		{ from: 'sunny', to: 'rainy', probability: 0.2 },
		{ from: 'rainy', to: 'rainy', probability: 0.6 },
		{ from: 'rainy', to: 'sunny', probability: 0.4 }
	];

	// Robot navigation example
	const robotStates = [
		{ id: 'A', label: 'A', x: 80, y: 100 },
		{ id: 'B', label: 'B', x: 200, y: 100 },
		{ id: 'C', label: 'C', x: 320, y: 100 }
	];

	const robotTransitions = [
		{ from: 'A', to: 'A', probability: 0.3 },
		{ from: 'A', to: 'B', probability: 0.7 },
		{ from: 'B', to: 'A', probability: 0.2 },
		{ from: 'B', to: 'B', probability: 0.3 },
		{ from: 'B', to: 'C', probability: 0.5 },
		{ from: 'C', to: 'B', probability: 0.4 },
		{ from: 'C', to: 'C', probability: 0.6 }
	];
</script>

<!-- Opening hook: Start with a question -->
<Paragraph>
	Imagine you're predicting tomorrow's weather. You know today is sunny.
	Do you need to know what the weather was <em>last week</em> to make your prediction?
	Or is knowing <em>today's weather</em> enough?
</Paragraph>

<Paragraph>
	This seemingly simple question leads us to one of the most powerful ideas
	in probability and reinforcement learning: <strong>the Markov property</strong>.
</Paragraph>

<Heading>The Core Idea</Heading>

<Callout type="definition" title="The Markov Property">
	A system has the <strong>Markov property</strong> if the future depends only on the present,
	not on the past. In other words, knowing the current state tells you everything
	you need to predict what happens next.
</Callout>

<Paragraph>
	Mathematically, we write this as:
</Paragraph>

<Math
	tex="P(S_{t+1} \mid S_t, S_{t-1}, \ldots, S_0) = P(S_{t+1} \mid S_t)"
	block
/>

<Paragraph>
	The probability of the next state <Math tex="S_{t+1}" /> given <em>all</em> previous states
	equals the probability given <em>only</em> the current state <Math tex="S_t" />.
	The history collapses—it doesn't matter how you got here, only where you are now.
</Paragraph>

<Heading>A Simple Example: Weather</Heading>

<Paragraph>
	Consider a toy model of weather with two states: Sunny and Rainy.
	If today is sunny, there's an 80% chance tomorrow will be sunny and a 20% chance it will rain.
	If today is rainy, there's a 60% chance of rain tomorrow and 40% chance of sun.
</Paragraph>

<Paragraph>
	<strong>Try it:</strong> Click "Step" to simulate the next day's weather,
	or click a state to jump there directly.
</Paragraph>

<MarkovChain states={weatherStates} transitions={weatherTransitions} />

<Callout type="insight" title="Key Insight">
	Notice how the transition probabilities depend <em>only</em> on the current state.
	Whether you've had 5 sunny days or 1, the probability of rain tomorrow is still 20%
	given that today is sunny. <strong>The past is irrelevant.</strong>
</Callout>

<Heading>Why Does This Matter for RL?</Heading>

<Paragraph>
	In reinforcement learning, we model environments as <strong>Markov Decision Processes (MDPs)</strong>.
	The Markov property is what makes these problems tractable. If the future depended on
	the <em>entire</em> history of states, learning would be impossibly complex.
</Paragraph>

<Paragraph>
	Instead, we can represent everything the agent needs to know in a single state.
	This is why state design is so important—a good state representation captures
	all relevant information about the past.
</Paragraph>

<Heading level={3}>When Markov Doesn't Hold</Heading>

<Paragraph>
	Real-world problems often violate the Markov property. Consider:
</Paragraph>

<Callout type="example" title="Non-Markov Example">
	A patient's health tomorrow depends not just on their current symptoms,
	but on their entire medical history—past surgeries, chronic conditions,
	and the progression of their illness over time.
</Callout>

<Paragraph>
	When this happens, we have options: expand the state to include relevant history
	(e.g., "patient with 3 days of fever" vs. "patient with 1 day of fever"),
	or use techniques like recurrent neural networks that can learn from sequences.
</Paragraph>

<Heading>Interactive: Robot Navigation</Heading>

<Paragraph>
	Here's another example: a robot moving between locations A, B, and C.
	The transition probabilities form a Markov chain.
	Experiment with it to build intuition.
</Paragraph>

<MarkovChain states={robotStates} transitions={robotTransitions} />

<Paragraph>
	Notice that from state B, the robot can go anywhere—it has the most "options."
	From A and C, the transitions are more constrained. These structural differences
	affect how quickly the system explores different states.
</Paragraph>

<Heading>Check Your Understanding</Heading>

<Quiz
	question="In a Markov process, which of the following is true about predicting the next state?"
	options={[
		{ id: 'a', text: 'You need to know the entire history of states' },
		{ id: 'b', text: 'You only need to know the current state' },
		{ id: 'c', text: 'You need to know at least the last two states' },
		{ id: 'd', text: 'The next state is always deterministic' }
	]}
	correctId="b"
	explanation="The Markov property states that the future is conditionally independent of the past given the present. Only the current state matters for predicting what comes next."
/>

<Quiz
	question="A chess game's state is the current board position. Does chess have the Markov property if we only use the board position as state?"
	options={[
		{ id: 'a', text: 'Yes, the board position is all you need' },
		{ id: 'b', text: 'No, you also need to know whose turn it is' },
		{ id: 'c', text: 'No, you also need castling rights and en passant information' },
		{ id: 'd', text: 'No, you need the entire game history' }
	]}
	correctId="c"
	explanation="Chess requires more than just piece positions. Castling rights depend on whether the king/rooks have moved, and en passant depends on the previous move. A proper Markov state must include this information."
/>

<Heading>Summary</Heading>

<Callout type="insight" title="Key Takeaways">
	<strong>1.</strong> The Markov property: the future depends only on the present, not the past.<br/>
	<strong>2.</strong> Mathematically: <Math tex="P(S_{t+1} \mid S_t, \ldots, S_0) = P(S_{t+1} \mid S_t)" /><br/>
	<strong>3.</strong> This property makes RL tractable—we can work with states, not histories.<br/>
	<strong>4.</strong> State design matters: a good state captures all relevant information.
</Callout>
