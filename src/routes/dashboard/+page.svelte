<script lang="ts">
	import type { Component } from 'svelte';
	import Kbd from '$lib/components/ui/Kbd.svelte';
	import { courses, mockProgress } from '$lib/data/courses';
	import { currentUser, generateDailyActivities, mockRecentActivities } from '$lib/data/users';
	import { mockEarnedBadges } from '$lib/data/badges';
	import ContributionGraph from '$lib/components/profile/ContributionGraph.svelte';
	import BadgeShowcase from '$lib/components/profile/BadgeShowcase.svelte';
	import IconCheckCircle from '~icons/lucide/check-circle';
	import IconAward from '~icons/lucide/award';
	import IconFlag from '~icons/lucide/flag';
	import IconFlame from '~icons/lucide/flame';
	import type { Activity } from '$lib/types/user';

	// Get current course progress
	const currentCourse = courses[0];
	const progress = mockProgress.get(currentCourse.id);
	const currentModule = currentCourse.modules.find((m) => m.id === progress?.currentModuleId);
	const currentLesson = currentModule?.lessons.find((l) => l.id === progress?.currentLessonId);
	const Illustration: Component = currentCourse.illustration;

	const progressPercent =
		progress !== undefined
			? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)
			: 0;

	const dailyActivities = generateDailyActivities(currentUser.id);

	let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);
	const graphWeeks = $derived(innerWidth < 640 ? 20 : innerWidth < 1024 ? 36 : 52);

	const continueHref = `/courses/${currentCourse.slug}/lessons/${currentLesson?.id ?? currentCourse.modules[0].lessons[0].id}`;

	function formatNumber(n: number): string {
		if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
		return n.toString();
	}

	function timeAgo(timestamp: string): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffHours < 1) return 'now';
		if (diffHours < 24) return `${diffHours}h`;
		if (diffDays === 1) return '1d';
		if (diffDays < 7) return `${diffDays}d`;
		return `${Math.floor(diffDays / 7)}w`;
	}

	function getActivityText(activity: Activity): string {
		switch (activity.type) {
			case 'lesson_completed':
				return activity.metadata.lessonTitle || 'Completed lesson';
			case 'badge_earned':
				return `Earned ${activity.metadata.badgeName}`;
			case 'course_completed':
				return `Finished ${activity.metadata.courseTitle}`;
			case 'streak_achieved':
				return `${activity.metadata.streakDays}-day streak`;
			default:
				return 'Activity';
		}
	}

	const typeIcons = {
		lesson_completed: IconCheckCircle,
		badge_earned: IconAward,
		course_completed: IconFlag,
		streak_achieved: IconFlame
	};
</script>

<svelte:window bind:innerWidth />

<div class="max-w-3xl mx-auto px-6 py-10">
	<!-- Stats Row -->
	<div class="flex flex-wrap gap-x-6 gap-y-1 text-sm font-sans text-text-muted dark:text-text-muted-dark">
		<span><strong class="text-text-primary dark:text-text-primary-dark">{currentUser.currentStreak}</strong> day streak</span>
		<span><strong class="text-text-primary dark:text-text-primary-dark">{formatNumber(currentUser.totalXP)}</strong> XP</span>
		<span><strong class="text-text-primary dark:text-text-primary-dark">{currentUser.badgesUnlocked}</strong> badges</span>
		<span><strong class="text-text-primary dark:text-text-primary-dark">{currentUser.coursesCompleted}</strong> courses</span>
	</div>

	<!-- Activity Graph -->
	<section class="mt-6">
		<ContributionGraph activities={dailyActivities} weeks={graphWeeks} />
	</section>

	<!-- Continue Learning -->
	<section class="mt-10 py-8 border-t border-border-subtle dark:border-border-subtle-dark">
		<div class="flex items-end justify-between gap-8">
			<div class="flex-1 max-w-xl">
				<div class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-[0.15em] mb-3">
					{currentCourse.title}
				</div>

				<h1 class="text-3xl sm:text-4xl font-serif text-text-primary dark:text-text-primary-dark leading-tight tracking-tight">
					{currentModule?.title ?? 'Getting Started'}
				</h1>

				<p class="mt-3 text-text-secondary dark:text-text-secondary-dark">
					{currentLesson?.title ?? 'Begin your journey'}
				</p>

				<!-- Progress -->
				<div class="mt-5 flex items-center gap-3 max-w-xs">
					<div class="flex-1 h-px bg-border dark:bg-border-dark">
						<div style:width="{progressPercent}%" class="h-full bg-text-muted dark:bg-text-muted-dark"></div>
					</div>
					<span class="text-xs font-sans text-text-muted dark:text-text-muted-dark tabular-nums">{progressPercent}%</span>
				</div>

				<a class="inline-flex items-center gap-2 mt-6 text-sm font-sans" href={continueHref}>
					<span class="text-text-primary dark:text-text-primary-dark uppercase tracking-wide hover:underline underline-offset-4">
						Continue
					</span>
					<Kbd key="R" size="sm" />
				</a>
			</div>

			<div class="hidden md:block w-32 opacity-20">
				<Illustration class="w-full h-auto" />
			</div>
		</div>
	</section>

	<!-- Badges -->
	{#if mockEarnedBadges.length > 0}
		<section class="mt-6">
			<BadgeShowcase badges={mockEarnedBadges} />
		</section>
	{/if}

	<!-- Recent Activity -->
	<section class="mt-8 pt-6 border-t border-border-subtle dark:border-border-subtle-dark">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xs font-sans font-medium text-text-muted dark:text-text-muted-dark uppercase tracking-wider">
				Recent
			</h2>
			<a
				href="/profile/{currentUser.username}"
				class="text-xs font-sans text-text-muted dark:text-text-muted-dark hover:text-text-secondary dark:hover:text-text-secondary-dark"
			>
				View profile
			</a>
		</div>
		<div class="space-y-2">
			{#each mockRecentActivities.slice(0, 4) as activity (activity.id)}
				{@const Icon = typeIcons[activity.type]}
				<div class="flex items-center gap-3 text-sm">
					<Icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark flex-shrink-0" />
					<span class="flex-1 truncate">{getActivityText(activity)}</span>
					{#if activity.xpEarned > 0}
						<span class="text-text-muted dark:text-text-muted-dark font-sans tabular-nums">+{activity.xpEarned}</span>
					{/if}
					<span class="text-text-muted dark:text-text-muted-dark font-sans tabular-nums">{timeAgo(activity.timestamp)}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="mt-8 pt-4">
		<a
			class="text-xs font-sans text-text-muted dark:text-text-muted-dark uppercase tracking-wider hover:text-text-secondary dark:hover:text-text-secondary-dark"
			href="/courses"
		>
			All courses
		</a>
	</footer>
</div>
