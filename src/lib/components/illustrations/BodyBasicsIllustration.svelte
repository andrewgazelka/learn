<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Body Basics: Simple human figure with energy flow -->
<svg
	class={className}
	aria-label="Body Basics"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Head -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="22"
		r="12"
		stroke-width="1.5"
	/>

	<!-- Body -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="50"
		y1="34"
		y2="60"
	/>

	<!-- Arms -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="30"
		y1="42"
		y2="55"
	/>
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="70"
		y1="42"
		y2="55"
	/>

	<!-- Legs -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="35"
		y1="60"
		y2="85"
	/>
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="65"
		y1="60"
		y2="85"
	/>

	<!-- Energy circles (homeostasis) -->
	<circle
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="50"
		cy="48"
		r="6"
		stroke-dasharray="2 2"
		stroke-width="1"
	/>
	<circle
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="50"
		cy="48"
		r="10"
		stroke-dasharray="2 2"
		stroke-width="1"
	/>
</svg>
