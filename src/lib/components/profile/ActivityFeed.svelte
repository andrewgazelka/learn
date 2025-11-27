<script lang="ts">
	import type { Activity } from '$lib/types/user';
	import IconCheckCircle from '~icons/lucide/check-circle';
	import IconAward from '~icons/lucide/award';
	import IconFlag from '~icons/lucide/flag';
	import IconFlame from '~icons/lucide/flame';

	interface Props {
		activities: Activity[];
		limit?: number;
	}

	const { activities, limit = 5 }: Props = $props();

	const displayedActivities = $derived(activities.slice(0, limit));

	const typeIcons = {
		lesson_completed: IconCheckCircle,
		badge_earned: IconAward,
		course_completed: IconFlag,
		streak_achieved: IconFlame
	};

	function getTitle(activity: Activity): string {
		switch (activity.type) {
			case 'lesson_completed':
				return `Completed "${activity.metadata.lessonTitle}"`;
			case 'badge_earned':
				return `Earned "${activity.metadata.badgeName}" badge`;
			case 'course_completed':
				return `Finished "${activity.metadata.courseTitle}"`;
			case 'streak_achieved':
				return `${activity.metadata.streakDays}-day streak reached`;
			default:
				return 'Activity';
		}
	}

	function getSubtitle(activity: Activity): string | null {
		if (activity.type === 'lesson_completed' && activity.metadata.courseTitle) {
			return activity.metadata.courseTitle;
		}
		return null;
	}

	function timeAgo(timestamp: string): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMins < 1) return 'just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays === 1) return 'yesterday';
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div class="space-y-3">
	<h3 class="text-sm font-medium text-text-secondary dark:text-text-secondary-dark font-sans">
		Recent Activity
	</h3>

	{#if activities.length === 0}
		<p class="text-sm text-text-muted dark:text-text-muted-dark">No recent activity</p>
	{:else}
		<div class="space-y-3">
			{#each displayedActivities as activity (activity.id)}
				{@const Icon = typeIcons[activity.type]}
				<div class="flex items-start gap-3">
					<div class="mt-0.5">
						<Icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm truncate">{getTitle(activity)}</p>
						{#if getSubtitle(activity)}
							<p class="text-xs text-text-muted dark:text-text-muted-dark truncate">
								{getSubtitle(activity)}
							</p>
						{/if}
					</div>
					<div class="flex items-center gap-2 flex-shrink-0">
						{#if activity.xpEarned > 0}
							<span class="text-xs text-text-secondary dark:text-text-secondary-dark font-sans tabular-nums">
								+{activity.xpEarned}
							</span>
						{/if}
						<span class="text-xs text-text-muted dark:text-text-muted-dark font-sans">
							{timeAgo(activity.timestamp)}
						</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
