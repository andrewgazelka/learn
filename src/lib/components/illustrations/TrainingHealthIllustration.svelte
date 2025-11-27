<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Training for Longevity: Heart with running figure -->
<svg
	class={className}
	aria-label="Training for Longevity"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Heart outline -->
	<path
		class="stroke-text-primary dark:stroke-text-primary-dark"
		d="M50 35 C50 28 43 22 35 22 C25 22 20 32 20 40 C20 55 50 75 50 75 C50 75 80 55 80 40 C80 32 75 22 65 22 C57 22 50 28 50 35"
		stroke-width="1.5"
	/>

	<!-- Running figure inside -->
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="45" cy="42" r="4" stroke-width="1" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="45" x2="45" y1="46" y2="55" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="45" x2="38" y1="50" y2="48" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="45" x2="52" y1="50" y2="45" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="45" x2="38" y1="55" y2="65" />
	<line class="stroke-text-muted dark:stroke-text-muted-dark" stroke-width="1" x1="45" x2="52" y1="55" y2="62" />
</svg>
