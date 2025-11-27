<script lang="ts">
	interface Props {
		src?: string;
		alt?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	}

	const { src, alt, name = 'User', size = 'md', class: className = '' }: Props = $props();

	const displayName = $derived(alt || name);

	const initials = $derived(
		displayName
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);

	const sizeClasses = {
		sm: 'w-7 h-7 text-xs',
		md: 'w-8 h-8 text-xs',
		lg: 'w-10 h-10 text-sm',
		xl: 'w-20 h-20 text-xl'
	};
</script>

{#if src}
	<img class="{sizeClasses[size]} rounded-full object-cover {className}" alt={displayName} {src} />
{:else}
	<div
		class="{sizeClasses[size]} rounded-full bg-accent-subtle dark:bg-accent-subtle-dark text-accent dark:text-accent-dark flex items-center justify-center font-sans font-medium {className}"
	>
		{initials}
	</div>
{/if}
