<script lang="ts">
	import IconUserPlus from '~icons/lucide/user-plus';
	import IconUserCheck from '~icons/lucide/user-check';

	interface Props {
		isFollowing: boolean;
		onFollow?: () => void;
		onUnfollow?: () => void;
		size?: 'sm' | 'md';
		class?: string;
	}

	const { isFollowing, onFollow, onUnfollow, size = 'md', class: className = '' }: Props = $props();

	let isHovering = $state(false);

	function handleClick() {
		if (isFollowing) {
			onUnfollow?.();
		} else {
			onFollow?.();
		}
	}

	const sizeClasses = {
		sm: 'px-3 py-1 text-xs gap-1.5',
		md: 'px-4 py-1.5 text-sm gap-2'
	};

	const iconSize = {
		sm: 'w-3 h-3',
		md: 'w-4 h-4'
	};
</script>

<button
	type="button"
	class="inline-flex items-center font-sans rounded-md border transition-colors {sizeClasses[size]} {className}
		{isFollowing
			? 'border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-error dark:hover:border-error-dark hover:text-error dark:hover:text-error-dark'
			: 'border-accent dark:border-accent-dark bg-accent dark:bg-accent-dark text-white dark:text-surface-dark hover:bg-accent-hover dark:hover:bg-accent-hover-dark'}"
	onclick={handleClick}
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
>
	{#if isFollowing}
		<IconUserCheck class={iconSize[size]} />
		<span>{isHovering ? 'Unfollow' : 'Following'}</span>
	{:else}
		<IconUserPlus class={iconSize[size]} />
		<span>Follow</span>
	{/if}
</button>
