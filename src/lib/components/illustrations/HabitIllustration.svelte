<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Habit Mastery: Loop/cycle with checkmarks -->
<svg
	class={className}
	aria-label="Habit Mastery"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Circular arrow (habit loop) -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M50 20 A30 30 0 1 1 25 65"
		stroke-linecap="round"
		stroke-width="1.5"
	/>
	<!-- Arrow head -->
	<polyline
		class="stroke-text-primary dark:stroke-text-primary-dark"
		points="20,58 25,65 32,60"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
	/>

	<!-- Checkmarks around the loop -->
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="48,35 52,40 60,30"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
	/>
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="68,55 72,60 80,50"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
	/>
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="48,72 52,77 60,67"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1.5"
	/>
</svg>
