<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Photography: Camera with aperture -->
<svg
	class={className}
	aria-label="Photography"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Camera body -->
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="40"
		rx="4"
		stroke-width="1.5"
		width="60"
		x="20"
		y="35"
	/>

	<!-- Viewfinder bump -->
	<rect
		class="stroke-text-primary dark:stroke-text-primary-dark"
		height="8"
		rx="2"
		stroke-width="1.5"
		width="20"
		x="35"
		y="27"
	/>

	<!-- Lens circle (outer) -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="55"
		r="15"
		stroke-width="1.5"
	/>

	<!-- Aperture blades (simplified hexagon) -->
	<polygon
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="50,45 57,48 57,62 50,65 43,62 43,48"
		stroke-width="1"
	/>

	<!-- Inner lens -->
	<circle
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="50"
		cy="55"
		r="6"
		stroke-width="1"
	/>

	<!-- Shutter button -->
	<circle
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="65"
		cy="35"
		r="4"
		stroke-width="1"
	/>
</svg>
