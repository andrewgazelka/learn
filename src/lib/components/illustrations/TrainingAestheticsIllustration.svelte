<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Training for Aesthetics: Muscular figure / dumbbell -->
<svg
	class={className}
	aria-label="Training for Aesthetics"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Dumbbell -->
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="30"
		rx="2"
		stroke-width="1.5"
		width="8"
		x="20"
		y="35"
	/>
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="30"
		rx="2"
		stroke-width="1.5"
		width="8"
		x="72"
		y="35"
	/>
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="3"
		x1="28"
		x2="72"
		y1="50"
		y2="50"
	/>

	<!-- Weight plates -->
	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="40"
		rx="1"
		stroke-width="1"
		width="5"
		x="12"
		y="30"
	/>
	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="40"
		rx="1"
		stroke-width="1"
		width="5"
		x="83"
		y="30"
	/>

	<!-- Mirror reflection lines -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="3 3"
		stroke-width="1"
		x1="50"
		x2="50"
		y1="20"
		y2="28"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="3 3"
		stroke-width="1"
		x1="50"
		x2="50"
		y1="72"
		y2="80"
	/>
</svg>
