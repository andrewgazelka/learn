<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Sleep: Moon with sleep wave pattern -->
<svg
	class={className}
	aria-label="Sleep Science"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Crescent moon -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M60 20 C40 20 25 40 25 60 C25 80 40 95 60 95 C45 85 40 70 40 55 C40 40 50 25 60 20"
		stroke-width="1.5"
	/>

	<!-- Sleep wave pattern (brain waves) -->
	<polyline
		class="stroke-text-muted dark:stroke-text-muted-dark"
		points="15,50 25,45 30,55 35,45 45,55 50,45 55,50"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1"
	/>

	<!-- Stars -->
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="75" cy="30" r="2" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="85" cy="45" r="1.5" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="70" cy="50" r="1" stroke-width="1" />
</svg>
