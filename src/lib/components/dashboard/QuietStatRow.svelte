<script lang="ts">
	interface Props {
		streak: number;
		xp: number;
		topics: number;
	}

	const { streak, xp, topics }: Props = $props();

	function formatXP(value: number): string {
		if (value >= 1000) {
			return `${(value / 1000).toFixed(1).replace(/\.0$/u, '')}k`;
		}
		return value.toLocaleString();
	}
</script>

<div class="text-sm font-sans text-text-muted dark:text-text-muted-dark tabular-nums">
	{streak} days &middot; {formatXP(xp)} XP &middot; {topics} topics
</div>
