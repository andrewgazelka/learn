<script lang="ts">
	interface Activity {
		lesson: string;
		module: string;
		href: string;
	}

	interface Props {
		activities: Activity[];
	}

	let { activities }: Props = $props();
</script>

<div class="space-y-2">
	{#each activities as activity}
		<a
			href={activity.href}
			class="block text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
		>
			<span class="font-serif">{activity.lesson}</span>
			<span class="text-text-muted dark:text-text-muted-dark">&middot;</span>
			<span class="text-sm text-text-muted dark:text-text-muted-dark">{activity.module}</span>
		</a>
	{/each}
</div>
