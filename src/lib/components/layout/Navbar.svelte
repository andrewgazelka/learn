<script lang="ts">
	import NavSearch from './NavSearch.svelte';
	import NavProfile from './NavProfile.svelte';
	import StreakIndicator from '$lib/components/gamification/StreakIndicator.svelte';
	import PointsDisplay from '$lib/components/gamification/PointsDisplay.svelte';

	interface Props {
		user?: {
			name: string;
			avatar?: string;
			points: number;
			streak: number;
		};
		notifications?: number;
	}

	const {
		user = {
			name: 'Andrew Gazelka',
			avatar: 'https://github.com/andrewgazelka.png',
			points: 1247,
			streak: 34
		},
		notifications = 3
	}: Props = $props();
</script>

<nav
	class="sticky top-0 z-50 bg-surface-elevated/80 dark:bg-surface-elevated-dark/80 backdrop-blur-sm border-b border-border-subtle dark:border-border-subtle-dark"
>
	<div class="max-w-6xl mx-auto px-6 md:px-8">
		<div class="h-14 flex items-center justify-between gap-6">
			<!-- Left: Logo -->
			<a class="flex items-center text-text-primary dark:text-text-primary-dark" href="/">
				<svg
					class="w-7 h-7"
					aria-label="Learn Anything"
					fill="none"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M26 16c0 5.5-4.5 10-10 10S6 21.5 6 16 10.5 6 16 6c3.3 0 6 2.7 6 6s-2.7 6-6 6c-1.7 0-3-1.3-3-3s1.3-3 3-3"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="2.5"
					/>
				</svg>
			</a>

			<!-- Center: Search -->
			<div class="flex-1 max-w-md hidden md:block">
				<NavSearch />
			</div>

			<!-- Right: Stats + Profile -->
			<div class="flex items-center gap-5">
				<div class="hidden sm:flex items-center gap-4">
					<StreakIndicator streak={user.streak} />
					<PointsDisplay points={user.points} />
				</div>
				<NavProfile name={user.name} avatar={user.avatar} {notifications} />
			</div>
		</div>
	</div>
</nav>
