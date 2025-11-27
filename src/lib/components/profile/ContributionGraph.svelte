<script lang="ts">
	import type { DailyActivity } from '$lib/types/user';

	interface Props {
		activities: DailyActivity[];
		weeks?: number;
	}

	const { activities, weeks = 52 }: Props = $props();

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	let hoveredDay: DailyActivity | null = $state(null);
	let tooltipPosition = $state({ x: 0, y: 0 });

	// Build grid data
	const gridData = $derived.by(() => {
		const today = new Date();
		const grid: (DailyActivity | null)[][] = [];

		const startDate = new Date(today);
		startDate.setDate(startDate.getDate() - (weeks * 7 - 1) - startDate.getDay());

		const activityMap = new Map(activities.map((a) => [a.date, a]));

		for (let week = 0; week < weeks; week++) {
			const weekData: (DailyActivity | null)[] = [];
			for (let day = 0; day < 7; day++) {
				const currentDate = new Date(startDate);
				currentDate.setDate(startDate.getDate() + week * 7 + day);

				if (currentDate > today) {
					weekData.push(null);
				} else {
					const dateStr = currentDate.toISOString().split('T')[0];
					weekData.push(activityMap.get(dateStr) || { date: dateStr, totalXP: 0, level: 0 });
				}
			}
			grid.push(weekData);
		}

		return grid;
	});

	// Month labels - spaced properly
	const monthLabels = $derived.by(() => {
		const labels: { month: string; week: number }[] = [];
		const today = new Date();
		const startDate = new Date(today);
		startDate.setDate(startDate.getDate() - (weeks * 7 - 1) - startDate.getDay());

		let lastMonth = -1;
		let lastLabelWeek = -4;

		for (let week = 0; week < weeks; week++) {
			const weekStart = new Date(startDate);
			weekStart.setDate(startDate.getDate() + week * 7);
			const month = weekStart.getMonth();

			if (month !== lastMonth && week - lastLabelWeek >= 4) {
				labels.push({ month: MONTHS[month], week });
				lastMonth = month;
				lastLabelWeek = week;
			} else if (month !== lastMonth) {
				lastMonth = month;
			}
		}

		return labels;
	});

	function handleMouseEnter(day: DailyActivity, event: MouseEvent | FocusEvent) {
		hoveredDay = day;
		const rect = (event.target as HTMLElement).getBoundingClientRect();
		tooltipPosition = { x: rect.left + rect.width / 2, y: rect.top - 8 };
	}

	function handleMouseLeave() {
		hoveredDay = null;
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<div class="overflow-x-auto -mx-1 px-1">
	<div class="inline-flex flex-col gap-[2px]">
		<!-- Month labels -->
		<div class="flex ml-[22px] mb-[2px]">
			{#each Array(weeks) as _, week}
				{@const label = monthLabels.find((l) => l.week === week)}
				<div class="w-[11px] flex-shrink-0 text-[9px] text-text-muted dark:text-text-muted-dark font-sans">
					{label?.month ?? ''}
				</div>
			{/each}
		</div>

		<!-- Grid -->
		<div class="flex">
			<!-- Day labels -->
			<div class="flex flex-col gap-[2px] text-[9px] text-text-muted dark:text-text-muted-dark font-sans w-[20px]">
				<div class="h-[11px]"></div>
				<div class="h-[11px] flex items-center">Mon</div>
				<div class="h-[11px]"></div>
				<div class="h-[11px] flex items-center">Wed</div>
				<div class="h-[11px]"></div>
				<div class="h-[11px] flex items-center">Fri</div>
				<div class="h-[11px]"></div>
			</div>

			<!-- Squares -->
			<div class="flex gap-[2px]">
				{#each gridData as week}
					<div class="flex flex-col gap-[2px]">
						{#each week as day}
							{#if day}
								<button
									type="button"
									aria-label="{day.totalXP} XP on {formatDate(day.date)}"
									class="w-[11px] h-[11px] rounded-[2px] outline-1 outline outline-border-subtle dark:outline-border-subtle-dark
										{day.level === 0 ? 'bg-[#ebedf0] dark:bg-[#161b22]' : ''}
										{day.level === 1 ? 'bg-[#9be9a8] dark:bg-[#0e4429]' : ''}
										{day.level === 2 ? 'bg-[#40c463] dark:bg-[#006d32]' : ''}
										{day.level === 3 ? 'bg-[#30a14e] dark:bg-[#26a641]' : ''}
										{day.level === 4 ? 'bg-[#216e39] dark:bg-[#39d353]' : ''}"
									onmouseenter={(e) => handleMouseEnter(day, e)}
									onmouseleave={handleMouseLeave}
									onfocus={(e) => handleMouseEnter(day, e)}
									onblur={handleMouseLeave}
								></button>
							{:else}
								<div class="w-[11px] h-[11px]"></div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<!-- Legend -->
		<div class="flex items-center justify-end gap-[3px] mt-1 text-[9px] text-text-muted dark:text-text-muted-dark font-sans">
			<span>Less</span>
			<div class="w-[11px] h-[11px] rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22] outline-1 outline outline-border-subtle dark:outline-border-subtle-dark"></div>
			<div class="w-[11px] h-[11px] rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429]"></div>
			<div class="w-[11px] h-[11px] rounded-[2px] bg-[#40c463] dark:bg-[#006d32]"></div>
			<div class="w-[11px] h-[11px] rounded-[2px] bg-[#30a14e] dark:bg-[#26a641]"></div>
			<div class="w-[11px] h-[11px] rounded-[2px] bg-[#216e39] dark:bg-[#39d353]"></div>
			<span>More</span>
		</div>
	</div>
</div>

<!-- Tooltip -->
{#if hoveredDay}
	<div
		class="fixed z-50 px-2 py-1 text-[11px] font-sans bg-[#24292f] dark:bg-[#1c2128] text-white rounded shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full whitespace-nowrap"
		style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px"
	>
		<strong>{hoveredDay.totalXP} XP</strong> on {formatDate(hoveredDay.date)}
	</div>
{/if}
