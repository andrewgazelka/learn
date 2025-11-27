<script lang="ts">
	interface Activity {
		lesson: string;
		module: string;
		href: string;
	}

	interface Props {
		activities: Activity[];
	}

	const { activities }: Props = $props();
</script>

<div class="space-y-2">
	{#each activities as activity (activity.href)}
		<a
			class="block text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
			href={activity.href}
		>
			<span class="font-serif">{activity.lesson}</span>
			<span class="text-text-muted dark:text-text-muted-dark">&middot;</span>
			<span class="text-sm text-text-muted dark:text-text-muted-dark">{activity.module}</span>
		</a>
	{/each}
</div>
