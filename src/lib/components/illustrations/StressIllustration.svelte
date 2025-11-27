<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Stress: Nervous system / balance -->
<svg
	class={className}
	aria-label="Stress & Recovery"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Brain/head outline -->
	<ellipse
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="35"
		rx="20"
		ry="18"
		stroke-width="1.5"
	/>

	<!-- Spine -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="50"
		y1="53"
		y2="90"
	/>

	<!-- Nerve branches (sympathetic) -->
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="35" y1="60" y2="55" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="65" y1="60" y2="55" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="32" y1="70" y2="68" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="68" y1="70" y2="68" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="35" y1="80" y2="80" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="50" x2="65" y1="80" y2="80" />
</svg>
