<script lang="ts">
	import type { EarnedBadge } from '$lib/types/badge';
	import IconMicroscope from '~icons/lucide/microscope';
	import IconLightbulbOff from '~icons/lucide/lightbulb-off';
	import IconGitBranch from '~icons/lucide/git-branch';
	import IconCalendarClock from '~icons/lucide/calendar-clock';
	import IconBrain from '~icons/lucide/brain';
	import IconFlame from '~icons/lucide/flame';
	import IconCalendarCheck from '~icons/lucide/calendar-check';
	import IconTrophy from '~icons/lucide/trophy';
	import IconCompass from '~icons/lucide/compass';
	import IconSparkles from '~icons/lucide/sparkles';
	import IconMessageSquare from '~icons/lucide/message-square';
	import IconGraduationCap from '~icons/lucide/graduation-cap';
	import IconAward from '~icons/lucide/award';

	interface Props {
		badge: EarnedBadge;
		compact?: boolean;
	}

	const { badge, compact = false }: Props = $props();

	const iconMap: Record<string, typeof IconAward> = {
		microscope: IconMicroscope,
		'lightbulb-off': IconLightbulbOff,
		'git-branch': IconGitBranch,
		'calendar-clock': IconCalendarClock,
		brain: IconBrain,
		flame: IconFlame,
		'calendar-check': IconCalendarCheck,
		trophy: IconTrophy,
		compass: IconCompass,
		sparkles: IconSparkles,
		'message-square': IconMessageSquare,
		'graduation-cap': IconGraduationCap
	};

	const Icon = $derived(iconMap[badge.icon] || IconAward);

	function timeAgo(dateStr: string): string {
		const date = new Date(dateStr);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'today';
		if (diffDays === 1) return 'yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
		return `${Math.floor(diffDays / 365)} years ago`;
	}
</script>

{#if compact}
	<div
		class="flex items-center gap-2 px-2 py-1.5 rounded border border-border-subtle dark:border-border-subtle-dark"
		title={badge.description}
	>
		<Icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark flex-shrink-0" />
		<span class="text-xs font-sans truncate">{badge.name}</span>
	</div>
{:else}
	<div class="flex flex-col gap-2 p-3 rounded-lg border border-border-subtle dark:border-border-subtle-dark">
		<div class="flex items-start gap-3">
			<div class="p-2 rounded-md bg-accent-subtle dark:bg-accent-subtle-dark">
				<Icon class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
			</div>
			<div class="flex-1 min-w-0">
				<h4 class="text-sm font-medium truncate">{badge.name}</h4>
				<p class="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">{badge.description}</p>
			</div>
		</div>
		<p class="text-[10px] text-text-muted dark:text-text-muted-dark font-sans">
			Earned {timeAgo(badge.earnedAt)}
		</p>
	</div>
{/if}
