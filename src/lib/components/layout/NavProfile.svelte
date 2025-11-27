<script lang="ts">
	import Avatar from '$lib/components/ui/Avatar.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		name?: string;
		avatar?: string;
		notifications?: number;
	}

	const { name = 'Learner', avatar, notifications = 0 }: Props = $props();
</script>

<button
	class="flex items-center rounded-full hover:opacity-80 transition-opacity"
	aria-label="Profile menu"
	type="button"
>
	<Badge count={notifications}>
		<Avatar {name} size="md" src={avatar} />
	</Badge>
</button>
