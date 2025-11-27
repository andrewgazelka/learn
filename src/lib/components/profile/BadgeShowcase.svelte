<script lang="ts">
	import type { EarnedBadge } from '$lib/types/badge';
	import AchievementBadge from '$lib/components/badges/AchievementBadge.svelte';
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
		badges: EarnedBadge[];
		size?: 'sm' | 'md' | 'lg';
	}

	const { badges, size = 'md' }: Props = $props();

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

	const iconSizes = {
		sm: 'w-5 h-5',
		md: 'w-6 h-6',
		lg: 'w-8 h-8'
	};

	// Common badges have light bg so need dark icons
	function getIconColorClass(rarity: string): string {
		return rarity === 'common' ? 'text-gray-600' : 'text-white';
	}

	let hoveredBadge = $state<string | null>(null);
</script>

{#if badges.length > 0}
	<div class="flex flex-wrap gap-3">
		{#each badges as badge (badge.id)}
			{@const Icon = iconMap[badge.icon] || IconAward}
			<div
				class="relative group cursor-pointer"
				role="button"
				tabindex="0"
				onmouseenter={() => (hoveredBadge = badge.id)}
				onmouseleave={() => (hoveredBadge = null)}
				onfocus={() => (hoveredBadge = badge.id)}
				onblur={() => (hoveredBadge = null)}
			>
				<AchievementBadge rarity={badge.rarity} {size}>
					<Icon class="{iconSizes[size]} {getIconColorClass(badge.rarity)}" />
				</AchievementBadge>

				<!-- Tooltip -->
				{#if hoveredBadge === badge.id}
					<div
						class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10 whitespace-nowrap"
					>
						<div
							class="bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg px-3 py-2 shadow-lg"
						>
							<p class="text-sm font-medium text-text-primary dark:text-text-primary-dark">
								{badge.name}
							</p>
							<p class="text-xs text-text-muted dark:text-text-muted-dark mt-0.5">
								{badge.description}
							</p>
						</div>
						<!-- Arrow -->
						<div
							class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-surface-elevated dark:bg-surface-elevated-dark border-r border-b border-border dark:border-border-dark"
						></div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
