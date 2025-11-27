<script lang="ts">
	import { page } from '$app/state';
	import { getUserByUsername, getFollowing, currentUser, isFollowing } from '$lib/data/users';
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import FollowButton from '$lib/components/profile/FollowButton.svelte';
	import IconArrowLeft from '~icons/lucide/arrow-left';

	const username = $derived(page.params.username ?? '');
	const user = $derived(getUserByUsername(username));
	const following = $derived(user ? getFollowing(user.id) : []);
</script>

<main class="bg-surface dark:bg-surface-dark">
	<div class="max-w-2xl mx-auto px-6 md:px-12 py-12">
		<!-- Header -->
		<div class="flex items-center gap-4 mb-8">
			<a
				href="/profile/{username}"
				class="p-2 -ml-2 rounded-md hover:bg-accent-subtle dark:hover:bg-accent-subtle-dark"
			>
				<IconArrowLeft class="w-5 h-5 text-text-secondary dark:text-text-secondary-dark" />
			</a>
			<div>
				<h1 class="text-xl font-serif font-medium text-text-primary dark:text-text-primary-dark">
					Following
				</h1>
				<p class="text-sm text-text-muted dark:text-text-muted-dark font-sans">
					@{username}
				</p>
			</div>
		</div>

		<!-- Following List -->
		{#if following.length === 0}
			<p class="text-text-muted dark:text-text-muted-dark">Not following anyone yet</p>
		{:else}
			<div class="space-y-4">
				{#each following as followedUser (followedUser.id)}
					{@const isCurrentUser = followedUser.id === currentUser.id}
					{@const isFollowingUser = isFollowing(followedUser.id)}
					<div class="flex items-center gap-4">
						<a href="/profile/{followedUser.username}" class="flex-shrink-0">
							<Avatar src={followedUser.avatar} alt={followedUser.displayName} size="lg" />
						</a>
						<div class="flex-1 min-w-0">
							<a
								href="/profile/{followedUser.username}"
								class="block font-medium text-text-primary dark:text-text-primary-dark hover:underline"
							>
								{followedUser.displayName}
							</a>
							<p class="text-sm text-text-muted dark:text-text-muted-dark font-sans">
								@{followedUser.username}
							</p>
						</div>
						{#if !isCurrentUser}
							<FollowButton isFollowing={isFollowingUser} size="sm" />
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
