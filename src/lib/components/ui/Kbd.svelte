<script lang="ts">
	interface Props {
		key: string;
		size?: 'sm' | 'md';
	}

	const { key, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'px-1 py-0.5 text-[10px]',
		md: 'px-1.5 py-0.5 text-[11px]'
	};
</script>

<kbd
	class="{sizeClasses[size]} font-sans font-medium text-text-muted dark:text-text-muted-dark bg-surface dark:bg-surface-dark border border-border-subtle dark:border-border-subtle-dark rounded"
>
	{key}
</kbd>
