<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Nutrition: Fork/plate with macros pie -->
<svg
	class={className}
	aria-label="Nutrition"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Plate circle -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="55"
		cy="55"
		r="30"
		stroke-width="1.5"
	/>

	<!-- Pie sections (macros) -->
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M55 55 L55 25 A30 30 0 0 1 80 70 Z"
		stroke-width="1"
	/>
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M55 55 L80 70 A30 30 0 0 1 35 75 Z"
		stroke-width="1"
	/>

	<!-- Fork -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="20"
		x2="20"
		y1="20"
		y2="80"
	/>
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="15" x2="15" y1="20" y2="35" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="20" x2="20" y1="20" y2="35" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="25" x2="25" y1="20" y2="35" />
</svg>
