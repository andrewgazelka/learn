<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import KeybindHandler from '$lib/components/KeybindHandler.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import KeybindHelp from '$lib/components/KeybindHelp.svelte';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const isDashboard = $derived(page.url.pathname.startsWith('/dashboard'));
</script>

<svelte:head>
	<link href={favicon} rel="icon" />
</svelte:head>

<KeybindHandler />
<CommandPalette />
<KeybindHelp />

<div class="min-h-screen bg-surface dark:bg-surface-dark">
	{#if !isDashboard}
		<Navbar />
	{/if}
	{@render children()}
</div>
