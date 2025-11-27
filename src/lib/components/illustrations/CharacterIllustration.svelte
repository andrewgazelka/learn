<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Character: Shield with balance scale inside -->
<svg
	class={className}
	aria-label="Character"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Shield shape -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M50 10 L80 25 L80 50 C80 70 65 85 50 92 C35 85 20 70 20 50 L20 25 Z"
		stroke-width="1.5"
	/>

	<!-- Balance scale inside -->
	<!-- Fulcrum -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1.5"
		x1="50"
		x2="50"
		y1="45"
		y2="65"
	/>

	<!-- Balance beam -->
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="32"
		x2="68"
		y1="45"
		y2="45"
	/>

	<!-- Left pan -->
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M28 50 L32 45 L36 50"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1"
	/>
	<ellipse
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="32"
		cy="52"
		rx="6"
		ry="2"
		stroke-width="1"
	/>

	<!-- Right pan -->
	<path
		class="stroke-text-muted dark:stroke-text-muted-dark"
		d="M64 50 L68 45 L72 50"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1"
	/>
	<ellipse
		class="stroke-text-muted dark:stroke-text-muted-dark"
		cx="68"
		cy="52"
		rx="6"
		ry="2"
		stroke-width="1"
	/>

	<!-- Crown/star at top of shield -->
	<polygon
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="50,18 52,24 58,24 54,28 56,34 50,30 44,34 46,28 42,24 48,24"
		stroke-width="1"
	/>
</svg>
