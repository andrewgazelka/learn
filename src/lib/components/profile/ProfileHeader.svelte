<script lang="ts">
	import type { User } from '$lib/types/user';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import FollowButton from './FollowButton.svelte';
	import IconCalendar from '~icons/lucide/calendar';

	interface Props {
		user: User;
		isOwnProfile?: boolean;
		isFollowing?: boolean;
		followersCount?: number;
		followingCount?: number;
		onFollow?: () => void;
		onUnfollow?: () => void;
	}

	const {
		user,
		isOwnProfile = false,
		isFollowing = false,
		followersCount = 0,
		followingCount = 0,
		onFollow,
		onUnfollow
	}: Props = $props();

	function formatJoinDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	}
</script>

<div class="flex flex-col sm:flex-row gap-6 sm:items-start">
	<!-- Avatar -->
	<div class="flex-shrink-0">
		<Avatar src={user.avatar} alt={user.displayName} size="xl" />
	</div>

	<!-- Info -->
	<div class="flex-1 min-w-0">
		<div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
			<div>
				<h1 class="text-2xl font-serif font-medium text-text-primary dark:text-text-primary-dark">
					{user.displayName}
				</h1>
				<p class="text-sm text-text-muted dark:text-text-muted-dark font-sans">
					@{user.username}
				</p>
			</div>

			{#if !isOwnProfile}
				<div class="sm:ml-auto">
					<FollowButton {isFollowing} {onFollow} {onUnfollow} />
				</div>
			{/if}
		</div>

		{#if user.bio}
			<p class="mt-3 text-sm text-text-secondary dark:text-text-secondary-dark max-w-lg">
				{user.bio}
			</p>
		{/if}

		<!-- Meta info -->
		<div class="flex flex-wrap items-center gap-4 mt-4 text-sm font-sans">
			<a
				href="/profile/{user.username}/following"
				class="text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
			>
				<span class="font-medium">{followingCount}</span>
				<span class="text-text-muted dark:text-text-muted-dark ml-1">Following</span>
			</a>
			<a
				href="/profile/{user.username}/followers"
				class="text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
			>
				<span class="font-medium">{followersCount}</span>
				<span class="text-text-muted dark:text-text-muted-dark ml-1">Followers</span>
			</a>
			<span class="flex items-center gap-1.5 text-text-muted dark:text-text-muted-dark">
				<IconCalendar class="w-4 h-4" />
				Joined {formatJoinDate(user.joinedAt)}
			</span>
		</div>
	</div>
</div>
