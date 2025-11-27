<script lang="ts">
	interface Props {
		streak: number;
		totalXP: number;
		badges: number;
		courses: number;
	}

	const { streak, totalXP, badges, courses }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1000) {
			return (n / 1000).toFixed(1) + 'k';
		}
		return n.toString();
	}
</script>

<div class="flex flex-wrap gap-6 sm:gap-8 text-sm font-sans text-text-muted dark:text-text-muted-dark">
	<div>
		<span class="font-medium text-text-primary dark:text-text-primary-dark tabular-nums">{streak}</span>
		<span class="ml-1">day streak</span>
	</div>
	<div>
		<span class="font-medium text-text-primary dark:text-text-primary-dark tabular-nums">{formatNumber(totalXP)}</span>
		<span class="ml-1">XP</span>
	</div>
	<div>
		<span class="font-medium text-text-primary dark:text-text-primary-dark tabular-nums">{badges}</span>
		<span class="ml-1">badges</span>
	</div>
	<div>
		<span class="font-medium text-text-primary dark:text-text-primary-dark tabular-nums">{courses}</span>
		<span class="ml-1">courses</span>
	</div>
</div>
