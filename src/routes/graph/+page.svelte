<script lang="ts">
	import DependencyGraph from '$lib/components/graph/DependencyGraph.svelte';
	import IconGraph from '~icons/lucide/git-branch';
	import IconList from '~icons/lucide/list';
</script>

<svelte:head>
	<title>Course Map | Learn</title>
</svelte:head>

<div class="h-screen flex flex-col">
	<!-- Header -->
	<header
		class="flex-none px-6 py-4 border-b border-border dark:border-border-dark bg-surface dark:bg-surface-dark"
	>
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<div>
				<h1
					class="text-xl font-serif text-text-primary dark:text-text-primary-dark flex items-center gap-2"
				>
					<IconGraph class="w-5 h-5" />
					Course Map
				</h1>
				<p class="text-sm text-text-muted dark:text-text-muted-dark">
					Explore the learning paths and prerequisites
				</p>
			</div>

			<a
				href="/courses"
				class="flex items-center gap-2 px-3 py-1.5 text-sm font-sans text-text-secondary dark:text-text-secondary-dark
					hover:text-text-primary dark:hover:text-text-primary-dark
					border border-border dark:border-border-dark rounded-md
					hover:bg-accent-subtle dark:hover:bg-accent-subtle-dark transition-colors"
			>
				<IconList class="w-4 h-4" />
				<span>List View</span>
				<kbd
					class="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-surface-elevated dark:bg-surface-elevated-dark rounded border border-border dark:border-border-dark"
					>C</kbd
				>
			</a>
		</div>
	</header>

	<!-- Graph -->
	<main class="flex-1 min-h-0">
		<DependencyGraph />
	</main>

	<!-- Legend -->
	<footer
		class="flex-none px-6 py-3 border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark"
	>
		<div class="max-w-7xl mx-auto flex flex-wrap items-center gap-6 text-xs font-sans">
			<div class="flex items-center gap-2">
				<div
					class="w-3 h-3 rounded border-2 border-accent/30 dark:border-accent-dark/30 bg-accent/5 dark:bg-accent-dark/5"
				></div>
				<span class="text-text-muted dark:text-text-muted-dark">Completed</span>
			</div>
			<div class="flex items-center gap-2">
				<div
					class="w-3 h-3 rounded ring-2 ring-accent/20 dark:ring-accent-dark/20 bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark"
				></div>
				<span class="text-text-muted dark:text-text-muted-dark">Goal Course</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-6 h-0.5 bg-text-muted dark:bg-text-muted-dark"></div>
				<span class="text-text-muted dark:text-text-muted-dark">Prerequisite</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-6 h-0.5 bg-accent dark:bg-accent-dark animate-pulse"></div>
				<span class="text-text-muted dark:text-text-muted-dark">Not completed</span>
			</div>
		</div>
	</footer>
</div>
