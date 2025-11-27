<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Cult/Influence: Figures radiating from center -->
<svg
	class={className}
	aria-label="Group Influence"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Central figure -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="40"
		r="8"
		stroke-width="1.5"
	/>
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-width="1.5"
		x1="50"
		x2="50"
		y1="48"
		y2="65"
	/>

	<!-- Radiating lines (influence) -->
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="50"
		x2="25"
		y1="50"
		y2="70"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="50"
		x2="75"
		y1="50"
		y2="70"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="50"
		x2="20"
		y1="50"
		y2="55"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-dasharray="2 2"
		stroke-width="1"
		x1="50"
		x2="80"
		y1="50"
		y2="55"
	/>

	<!-- Follower figures (smaller) -->
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="25" cy="75" r="5" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="75" cy="75" r="5" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="20" cy="58" r="4" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="80" cy="58" r="4" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="40" cy="80" r="4" stroke-width="1" />
	<circle class="stroke-text-muted dark:stroke-text-muted-dark" cx="60" cy="80" r="4" stroke-width="1" />
</svg>
