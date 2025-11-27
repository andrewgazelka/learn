<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import UserCard from '$lib/components/profile/UserCard.svelte';
	import { searchUsers } from '$lib/data/users';
	import IconSearch from '~icons/lucide/search';
	import IconUsers from '~icons/lucide/users';
	import Kbd from '$lib/components/ui/Kbd.svelte';

	let query = $state('');
	let inputElement: HTMLInputElement;

	const results = $derived(query.length >= 2 ? searchUsers(query) : []);

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === '/' && document.activeElement !== inputElement) {
			event.preventDefault();
			inputElement?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Navbar />

<main class="min-h-screen bg-surface dark:bg-surface-dark">
	<div class="max-w-2xl mx-auto px-6 md:px-12 py-12">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-2xl font-serif font-medium text-text-primary dark:text-text-primary-dark">
				Find Users
			</h1>
			<p class="mt-1 text-sm text-text-muted dark:text-text-muted-dark font-sans">
				Search by username or display name
			</p>
		</div>

		<!-- Search Input -->
		<div class="relative mb-8">
			<IconSearch class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted dark:text-text-muted-dark" />
			<input
				bind:this={inputElement}
				bind:value={query}
				type="text"
				placeholder="Search users..."
				class="w-full pl-10 pr-12 py-3 bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg text-text-primary dark:text-text-primary-dark placeholder:text-text-muted dark:placeholder:text-text-muted-dark font-sans focus:outline-none focus:ring-2 focus:ring-accent/20 dark:focus:ring-accent-dark/20"
			/>
			<div class="absolute right-3 top-1/2 -translate-y-1/2">
				<Kbd key="/" size="sm" />
			</div>
		</div>

		<!-- Results -->
		{#if query.length < 2}
			<div class="flex flex-col items-center justify-center py-16 text-text-muted dark:text-text-muted-dark">
				<IconUsers class="w-12 h-12 mb-4 opacity-50" />
				<p class="text-sm font-sans">Type at least 2 characters to search</p>
			</div>
		{:else if results.length === 0}
			<div class="flex flex-col items-center justify-center py-16 text-text-muted dark:text-text-muted-dark">
				<IconSearch class="w-12 h-12 mb-4 opacity-50" />
				<p class="text-sm font-sans">No users found for "{query}"</p>
			</div>
		{:else}
			<div class="space-y-1">
				{#each results as user (user.id)}
					<UserCard {user} />
				{/each}
			</div>
		{/if}
	</div>
</main>
