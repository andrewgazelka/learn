<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Minimal RL: Agent ↔ Environment feedback loop -->
<svg
	class={className}
	aria-label="Reinforcement Learning"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Agent (circle) -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="25"
		cy="50"
		r="20"
		stroke-width="1.5"
	/>

	<!-- Environment (square) -->
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="40"
		rx="3"
		stroke-width="1.5"
		width="40"
		x="55"
		y="30"
	/>

	<!-- Top arrow: action -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="45"
		x2="53"
		y1="38"
		y2="38"
	/>
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		fill="none"
		points="50,35 55,38 50,41"
		stroke-width="1"
	/>

	<!-- Bottom arrow: state/reward -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="53"
		x2="45"
		y1="62"
		y2="62"
	/>
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		fill="none"
		points="48,59 43,62 48,65"
		stroke-width="1"
	/>
</svg>
