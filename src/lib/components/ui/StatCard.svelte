<script lang="ts">
	interface Props {
		value: string | number;
		label: string;
		variant?: 'default' | 'streak' | 'points';
	}

	const { value, label, variant = 'default' }: Props = $props();

	const valueClasses = {
		default: 'text-text-primary dark:text-text-primary-dark',
		streak: 'text-streak dark:text-streak-dark',
		points: 'text-points dark:text-points-dark'
	};
</script>

<div class="p-5 bg-surface-elevated dark:bg-surface-elevated-dark rounded-xl border border-border-subtle dark:border-border-subtle-dark">
	<div class="text-2xl font-serif font-medium {valueClasses[variant]} tabular-nums">{value}</div>
	<div class="text-sm text-text-muted dark:text-text-muted-dark font-sans mt-1">{label}</div>
</div>
