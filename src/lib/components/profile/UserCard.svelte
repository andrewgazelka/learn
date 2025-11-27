<script lang="ts">
	import type { UserSearchResult } from '$lib/types/social';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import FollowButton from './FollowButton.svelte';

	interface Props {
		user: UserSearchResult;
		showFollowButton?: boolean;
		onFollow?: () => void;
		onUnfollow?: () => void;
	}

	const { user, showFollowButton = true, onFollow, onUnfollow }: Props = $props();

	function formatXP(xp: number): string {
		if (xp >= 1000) {
			return (xp / 1000).toFixed(1) + 'k';
		}
		return xp.toString();
	}
</script>

<div class="flex items-center gap-4 p-3 rounded-lg hover:bg-accent-subtle dark:hover:bg-accent-subtle-dark transition-colors">
	<a href="/profile/{user.username}" class="flex-shrink-0">
		<Avatar src={user.avatar} alt={user.displayName} size="lg" />
	</a>

	<div class="flex-1 min-w-0">
		<a
			href="/profile/{user.username}"
			class="block font-medium text-text-primary dark:text-text-primary-dark hover:underline truncate"
		>
			{user.displayName}
		</a>
		<div class="flex items-center gap-3 text-sm font-sans text-text-muted dark:text-text-muted-dark">
			<span>@{user.username}</span>
			<span class="tabular-nums">{formatXP(user.totalXP)} XP</span>
		</div>
	</div>

	{#if showFollowButton}
		<FollowButton
			isFollowing={user.isFollowing}
			size="sm"
			{onFollow}
			{onUnfollow}
		/>
	{/if}
</div>
