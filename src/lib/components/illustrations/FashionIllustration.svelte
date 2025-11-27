<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Fashion: Dress form with measurement marks -->
<svg
	class={className}
	aria-label="Fashion"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Dress form silhouette -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M50 15 C35 15 30 25 30 35 C30 45 35 50 38 55 C35 60 32 70 32 80 L68 80 C68 70 65 60 62 55 C65 50 70 45 70 35 C70 25 65 15 50 15"
		stroke-width="1.5"
	/>

	<!-- Neckline -->
	<ellipse
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="18"
		rx="8"
		ry="4"
		stroke-width="1.5"
	/>

	<!-- Waist measurement line -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="35"
		x2="65"
		y1="50"
		y2="50"
	/>

	<!-- Hip measurement line -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="33"
		x2="67"
		y1="65"
		y2="65"
	/>

	<!-- Stand -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1.5"
		x1="50"
		x2="50"
		y1="80"
		y2="90"
	/>
	<ellipse
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="50"
		cy="92"
		rx="12"
		ry="3"
		stroke-width="1"
	/>
</svg>
