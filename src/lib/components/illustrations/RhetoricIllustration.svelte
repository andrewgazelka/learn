<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Rhetoric: Speech podium with flowing argument lines -->
<svg
	class={className}
	aria-label="Rhetoric"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Podium -->
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="35"
		rx="3"
		stroke-width="1.5"
		width="40"
		x="30"
		y="55"
	/>

	<!-- Podium front decoration -->
	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="20"
		rx="2"
		stroke-width="1"
		width="30"
		x="35"
		y="62"
	/>

	<!-- Person silhouette (simplified) -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="30"
		r="10"
		stroke-width="1.5"
	/>
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M35 55 C35 45 42 40 50 40 C58 40 65 45 65 55"
		stroke-width="1.5"
	/>

	<!-- Flowing argument lines (speech waves) -->
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M70 35 Q75 33 80 35"
		stroke-linecap="round"
		stroke-width="1"
	/>
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M72 40 Q78 38 85 40"
		stroke-linecap="round"
		stroke-width="1"
	/>
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M70 45 Q77 43 82 45"
		stroke-linecap="round"
		stroke-width="1"
	/>

	<!-- Counter-argument lines (from other side) -->
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M30 35 Q25 33 20 35"
		stroke-linecap="round"
		stroke-width="1"
	/>
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M28 40 Q22 38 15 40"
		stroke-linecap="round"
		stroke-width="1"
	/>
</svg>
