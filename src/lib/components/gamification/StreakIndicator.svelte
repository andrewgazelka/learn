<script lang="ts">
	import IconFlame from '~icons/lucide/flame';
	import NavButton from '$lib/components/ui/NavButton.svelte';

	interface Props {
		streak: number;
	}

	const { streak }: Props = $props();
</script>

{#if streak > 0}
	<NavButton title="{streak} day streak">
		<IconFlame class="w-4 h-4" />
		<span class="text-sm font-sans tabular-nums">{streak}</span>
	</NavButton>
{/if}
