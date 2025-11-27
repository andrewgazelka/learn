<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';

	const { children } = $props();
</script>

<Navbar />
<main>
	{@render children()}
</main>
