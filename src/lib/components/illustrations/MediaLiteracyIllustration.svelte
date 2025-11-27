<script lang="ts">
	interface Props {
		class?: string;
	}

	const { class: className = '' }: Props = $props();
</script>

<!-- Media Literacy: Lens examining multiple sources -->
<svg
	class={className}
	aria-label="Media Literacy"
	fill="none"
	viewBox="0 0 100 100"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Multiple document/source icons stacked -->
	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="30"
		rx="2"
		stroke-width="1"
		width="22"
		x="15"
		y="25"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="19"
		x2="33"
		y1="33"
		y2="33"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="19"
		x2="30"
		y1="39"
		y2="39"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="19"
		x2="33"
		y1="45"
		y2="45"
	/>

	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="30"
		rx="2"
		stroke-width="1"
		width="22"
		x="39"
		y="20"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="43"
		x2="57"
		y1="28"
		y2="28"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="43"
		x2="54"
		y1="34"
		y2="34"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="43"
		x2="57"
		y1="40"
		y2="40"
	/>

	<rect
		class="stroke-text-muted dark:stroke-text-muted-dark"
		height="30"
		rx="2"
		stroke-width="1"
		width="22"
		x="63"
		y="25"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="67"
		x2="81"
		y1="33"
		y2="33"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="67"
		x2="78"
		y1="39"
		y2="39"
	/>
	<line
		class="stroke-text-muted dark:stroke-text-muted-dark"
		stroke-width="1"
		x1="67"
		x2="81"
		y1="45"
		y2="45"
	/>

	<!-- Magnifying lens (critical eye) -->
	<circle
		class="stroke-text-primary dark:stroke-text-primary-dark"
		cx="50"
		cy="65"
		r="16"
		stroke-width="1.5"
	/>
	<line
		class="stroke-text-primary dark:stroke-text-primary-dark"
		stroke-linecap="round"
		stroke-width="2"
		x1="62"
		x2="72"
		y1="77"
		y2="87"
	/>

	<!-- Question mark inside lens -->
	<text
		class="fill-text-secondary dark:fill-text-secondary-dark"
		font-family="serif"
		font-size="14"
		font-weight="500"
		text-anchor="middle"
		x="50"
		y="70"
	>?</text>
</svg>
