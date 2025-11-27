<script lang="ts">
	interface Props {
		progress: number;
		size?: number;
		strokeWidth?: number;
	}

	const { progress, size = 48, strokeWidth = 3 }: Props = $props();

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (progress / 100) * circumference;
</script>

<svg
	class="transform -rotate-90"
	aria-label="{progress}% complete"
	height={size}
	viewBox="0 0 {size} {size}"
	width={size}
>
	<!-- Background circle -->
	<circle
		class="text-border-subtle dark:text-border-subtle-dark"
		cx={size / 2}
		cy={size / 2}
		fill="none"
		r={radius}
		stroke="currentColor"
		stroke-width={strokeWidth}
	/>
	<!-- Progress circle -->
	<circle
		class="text-accent dark:text-accent-dark transition-all duration-500"
		cx={size / 2}
		cy={size / 2}
		fill="none"
		r={radius}
		stroke="currentColor"
		stroke-dasharray={circumference}
		stroke-dashoffset={offset}
		stroke-linecap="round"
		stroke-width={strokeWidth}
	/>
</svg>
