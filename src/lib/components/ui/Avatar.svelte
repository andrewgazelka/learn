<script lang="ts">
	interface Props {
		src?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	const { src, name = 'User', size = 'md' }: Props = $props();

	const initials = $derived(
		name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);

	const sizeClasses = {
		sm: 'w-7 h-7 text-xs',
		md: 'w-8 h-8 text-xs',
		lg: 'w-10 h-10 text-sm'
	};
</script>

{#if src}
	<img class="{sizeClasses[size]} rounded-full object-cover" alt={name} {src} />
{:else}
	<div
		class="{sizeClasses[size]} rounded-full bg-accent-subtle dark:bg-accent-subtle-dark text-accent dark:text-accent-dark flex items-center justify-center font-sans font-medium"
	>
		{initials}
	</div>
{/if}
