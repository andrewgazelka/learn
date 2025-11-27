<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import ContributionGraph from '$lib/components/profile/ContributionGraph.svelte';
	import BadgeShowcase from '$lib/components/profile/BadgeShowcase.svelte';
	import FollowButton from '$lib/components/profile/FollowButton.svelte';
	import IconCheckCircle from '~icons/lucide/check-circle';
	import IconAward from '~icons/lucide/award';
	import IconFlag from '~icons/lucide/flag';
	import IconFlame from '~icons/lucide/flame';
	import IconMapPin from '~icons/lucide/map-pin';
	import IconCalendar from '~icons/lucide/calendar';
	import IconLink from '~icons/lucide/link';
	import IconTrophy from '~icons/lucide/trophy';
	import IconTarget from '~icons/lucide/target';
	import IconBookOpen from '~icons/lucide/book-open';
	import type { Activity } from '$lib/types/user';

	interface Props {
		data: {
			user: import('$lib/types/user').User;
			isOwnProfile: boolean;
			isFollowing: boolean;
			followersCount: number;
			followingCount: number;
			dailyActivities: import('$lib/types/user').DailyActivity[];
			recentActivities: import('$lib/types/user').Activity[];
			badges: import('$lib/types/badge').EarnedBadge[];
		};
	}

	const { data }: Props = $props();

	let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);
	const graphWeeks = $derived(innerWidth < 640 ? 20 : innerWidth < 1024 ? 36 : 52);

	let localIsFollowing = $state(data.isFollowing);
	let localFollowersCount = $state(data.followersCount);

	function handleFollow() {
		localIsFollowing = true;
		localFollowersCount++;
	}

	function handleUnfollow() {
		localIsFollowing = false;
		localFollowersCount--;
	}

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

		if (diffHours < 1) return 'just now';
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays === 1) return 'yesterday';
		if (diffDays < 7) return `${diffDays}d ago`;
		return `${Math.floor(diffDays / 7)}w ago`;
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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

<main class="min-h-screen bg-surface dark:bg-surface-dark">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
		<div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
			<!-- Sidebar -->
			<aside class="space-y-6">
				<!-- Profile Card -->
				<div class="text-center lg:text-left">
					<Avatar
						src={data.user.avatar}
						alt={data.user.displayName}
						size="xl"
						class="w-[200px] h-[200px] mx-auto lg:mx-0 ring-4 ring-surface-elevated dark:ring-surface-elevated-dark shadow-xl"
					/>

					<div class="mt-4">
						<h1 class="text-2xl font-semibold text-text-primary dark:text-text-primary-dark">
							{data.user.displayName}
						</h1>
						<p class="text-lg text-text-muted dark:text-text-muted-dark font-sans">
							@{data.user.username}
						</p>
					</div>

					{#if data.user.bio}
						<p class="mt-4 text-text-secondary dark:text-text-secondary-dark">
							{data.user.bio}
						</p>
					{/if}

					{#if !data.isOwnProfile}
						<div class="mt-4">
							<FollowButton
								isFollowing={localIsFollowing}
								onFollow={handleFollow}
								onUnfollow={handleUnfollow}
								class="w-full"
							/>
						</div>
					{/if}

					<!-- Follow Stats -->
					<div class="mt-4 flex justify-center lg:justify-start gap-4 text-sm font-sans">
						<a
							href="/profile/{data.user.username}/followers"
							class="hover:text-accent dark:hover:text-accent-dark transition-colors"
						>
							<span class="font-semibold text-text-primary dark:text-text-primary-dark">{localFollowersCount}</span>
							<span class="text-text-muted dark:text-text-muted-dark">followers</span>
						</a>
						<span class="text-text-muted dark:text-text-muted-dark">·</span>
						<a
							href="/profile/{data.user.username}/following"
							class="hover:text-accent dark:hover:text-accent-dark transition-colors"
						>
							<span class="font-semibold text-text-primary dark:text-text-primary-dark">{data.followingCount}</span>
							<span class="text-text-muted dark:text-text-muted-dark">following</span>
						</a>
					</div>
				</div>

				<!-- Stats Card -->
				<div class="rounded-xl border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark p-4">
					<h3 class="text-sm font-semibold text-text-primary dark:text-text-primary-dark font-sans mb-3">
						Stats
					</h3>
					<div class="space-y-3">
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
								<IconFlame class="w-4 h-4 text-orange-500" />
							</div>
							<div>
								<div class="font-semibold text-text-primary dark:text-text-primary-dark font-sans">
									{data.user.currentStreak} days
								</div>
								<div class="text-xs text-text-muted dark:text-text-muted-dark font-sans">Current streak</div>
							</div>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
								<IconTarget class="w-4 h-4 text-emerald-500" />
							</div>
							<div>
								<div class="font-semibold text-text-primary dark:text-text-primary-dark font-sans">
									{formatNumber(data.user.totalXP)} XP
								</div>
								<div class="text-xs text-text-muted dark:text-text-muted-dark font-sans">Total earned</div>
							</div>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
								<IconBookOpen class="w-4 h-4 text-blue-500" />
							</div>
							<div>
								<div class="font-semibold text-text-primary dark:text-text-primary-dark font-sans">
									{data.user.lessonsCompleted}
								</div>
								<div class="text-xs text-text-muted dark:text-text-muted-dark font-sans">Lessons completed</div>
							</div>
						</div>
						<div class="flex items-center gap-3">
							<div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
								<IconTrophy class="w-4 h-4 text-purple-500" />
							</div>
							<div>
								<div class="font-semibold text-text-primary dark:text-text-primary-dark font-sans">
									{data.badges.length}
								</div>
								<div class="text-xs text-text-muted dark:text-text-muted-dark font-sans">Achievements</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Meta Info -->
				<div class="space-y-2 text-sm text-text-muted dark:text-text-muted-dark font-sans">
					<div class="flex items-center gap-2">
						<IconCalendar class="w-4 h-4" />
						<span>Joined {formatDate(data.user.joinedAt)}</span>
					</div>
				</div>
			</aside>

			<!-- Main Content -->
			<div class="space-y-6">
				<!-- Achievements Section -->
				{#if data.badges.length > 0}
					<section class="rounded-xl border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark overflow-hidden">
						<div class="px-4 py-3 border-b border-border dark:border-border-dark">
							<h2 class="text-sm font-semibold text-text-primary dark:text-text-primary-dark font-sans flex items-center gap-2">
								<IconTrophy class="w-4 h-4" />
								Achievements
								<span class="ml-auto text-xs font-normal text-text-muted dark:text-text-muted-dark">
									{data.badges.length} earned
								</span>
							</h2>
						</div>
						<div class="p-4">
							<BadgeShowcase badges={data.badges} />
						</div>
					</section>
				{/if}

				<!-- Contribution Graph Section -->
				<section class="rounded-xl border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark overflow-hidden">
					<div class="px-4 py-3 border-b border-border dark:border-border-dark">
						<h2 class="text-sm font-semibold text-text-primary dark:text-text-primary-dark font-sans">
							Learning Activity
						</h2>
					</div>
					<div class="p-4">
						<ContributionGraph activities={data.dailyActivities} weeks={graphWeeks} />
					</div>
				</section>

				<!-- Recent Activity Section -->
				{#if data.recentActivities.length > 0}
					<section class="rounded-xl border border-border dark:border-border-dark bg-surface-elevated dark:bg-surface-elevated-dark overflow-hidden">
						<div class="px-4 py-3 border-b border-border dark:border-border-dark">
							<h2 class="text-sm font-semibold text-text-primary dark:text-text-primary-dark font-sans">
								Recent Activity
							</h2>
						</div>
						<div class="divide-y divide-border-subtle dark:divide-border-subtle-dark">
							{#each data.recentActivities.slice(0, 5) as activity (activity.id)}
								{@const Icon = typeIcons[activity.type]}
								<div class="px-4 py-3 flex items-center gap-3 hover:bg-accent-subtle dark:hover:bg-accent-subtle-dark transition-colors">
									<div class="w-8 h-8 rounded-full bg-accent-subtle dark:bg-accent-subtle-dark flex items-center justify-center flex-shrink-0">
										<Icon class="w-4 h-4 text-text-muted dark:text-text-muted-dark" />
									</div>
									<div class="flex-1 min-w-0">
										<p class="text-sm text-text-primary dark:text-text-primary-dark truncate">
											{getActivityText(activity)}
										</p>
										<p class="text-xs text-text-muted dark:text-text-muted-dark font-sans">
											{timeAgo(activity.timestamp)}
										</p>
									</div>
									{#if activity.xpEarned > 0}
										<span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 font-sans">
											+{activity.xpEarned} XP
										</span>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}
			</div>
		</div>
	</div>
</main>
