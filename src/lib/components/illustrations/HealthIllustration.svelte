<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Health: Heart with pulse line -->
<svg
	class={className}
	aria-label="Health"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Heart shape -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M50 30 C50 20 40 15 32 15 C20 15 15 28 15 38 C15 55 50 80 50 80 C50 80 85 55 85 38 C85 28 80 15 68 15 C60 15 50 20 50 30"
		stroke-width="1.5"
	/>

	<!-- Pulse/ECG line through heart -->
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="20,50 35,50 40,40 45,60 50,45 55,55 60,50 80,50"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
	/>

	<!-- Small plus symbol (medical cross) -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-linecap="round"
		stroke-width="1"
		x1="75"
		x2="75"
		y1="20"
		y2="30"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-linecap="round"
		stroke-width="1"
		x1="70"
		x2="80"
		y1="25"
		y2="25"
	/>
</svg>
