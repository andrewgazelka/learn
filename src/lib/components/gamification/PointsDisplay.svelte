<script lang="ts">
	import IconZap from '~icons/lucide/zap';
	import NavButton from '$lib/components/ui/NavButton.svelte';

	interface Props {
		points: number;
	}

	const { points }: Props = $props();

	const formatted = $derived(
		points >= 1000 ? `${(points / 1000).toFixed(1)}k` : points.toString()
	);
</script>

<NavButton title="{points} XP">
	<IconZap class="w-4 h-4" />
	<span class="text-sm font-sans tabular-nums">{formatted}</span>
</NavButton>
