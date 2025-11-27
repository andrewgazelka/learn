<script lang="ts">
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import {
		courses,
		mockProgress,
		getGoalCourses,
		getLearningPath,
		mockCompletedCourses
	} from '$lib/data/courses';
	import IconGraph from '~icons/lucide/git-branch';

	// Goal courses grouped by category
	const goalCourses = $derived(getGoalCourses());
	const goalCategories = $derived(() => {
		const cats = new Map<string, typeof goalCourses>();
		for (const course of goalCourses) {
			const cat = course.goalCategory || 'other';
			if (!cats.has(cat)) cats.set(cat, []);
			cats.get(cat)!.push(course);
		}
		return cats;
	});

	const categoryLabels: Record<string, string> = {
		fitness: 'Fitness',
		creative: 'Creative',
		thinking: 'Thinking',
		social: 'Social',
		technical: 'Technical',
		other: 'Other'
	};

	// Non-goal courses (building blocks)
	const buildingBlocks = $derived(courses.filter((c) => !c.isGoal));

	let showAllCourses = $state(false);

	function getPathInfo(courseId: string) {
		const path = getLearningPath(courseId);
		const completed = path.filter((c) => mockCompletedCourses.has(c.id)).length;
		return { total: path.length, completed };
	}
</script>

<div class="max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
	<header class="mb-12 flex items-start justify-between">
		<div>
			<h1 class="text-3xl md:text-4xl font-serif text-text-primary dark:text-text-primary-dark">
				Choose Your Goal
			</h1>
			<p class="mt-2 text-text-secondary dark:text-text-secondary-dark">
				Pick a destination. We'll figure out the path.
			</p>
		</div>
		<a
			href="/graph"
			class="flex items-center gap-2 px-3 py-1.5 text-sm font-sans text-text-secondary dark:text-text-secondary-dark
				hover:text-text-primary dark:hover:text-text-primary-dark
				border border-border dark:border-border-dark rounded-md
				hover:bg-accent-subtle dark:hover:bg-accent-subtle-dark transition-colors"
		>
			<IconGraph class="w-4 h-4" />
			<span class="hidden sm:inline">Map</span>
			<kbd
				class="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-surface-elevated dark:bg-surface-elevated-dark rounded border border-border dark:border-border-dark"
				>M</kbd
			>
		</a>
	</header>

	<!-- Goal courses by category -->
	{#each [...goalCategories().entries()] as [category, categoryCourses] (category)}
		<section class="mb-12">
			<h2
				class="text-sm font-sans uppercase tracking-widest text-text-muted dark:text-text-muted-dark mb-4"
			>
				{categoryLabels[category] || category}
			</h2>
			<div class="space-y-4">
				{#each categoryCourses as course (course.id)}
					{@const pathInfo = getPathInfo(course.id)}
					<div class="relative">
						<CourseCard {course} progress={mockProgress.get(course.id)} />
						{#if pathInfo.total > 1}
							<div
								class="absolute top-4 right-4 text-xs text-text-muted dark:text-text-muted-dark font-sans"
							>
								{#if pathInfo.completed > 0}
									{pathInfo.completed}/{pathInfo.total} steps
								{:else}
									{pathInfo.total} steps
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}

	<!-- Building blocks (collapsible) -->
	<section class="mt-16 pt-8 border-t border-border dark:border-border-dark">
		<button
			class="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
			onclick={() => (showAllCourses = !showAllCourses)}
		>
			<span class="text-sm font-sans uppercase tracking-widest">
				All Courses ({courses.length})
			</span>
			<svg
				class="w-4 h-4 transition-transform {showAllCourses ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if showAllCourses}
			<div class="mt-6 space-y-4">
				{#each courses as course (course.id)}
					<div class="relative">
						<CourseCard {course} progress={mockProgress.get(course.id)} />
						{#if course.prerequisites?.length}
							<div
								class="absolute top-4 right-4 text-xs text-text-muted dark:text-text-muted-dark font-sans"
							>
								Requires: {course.prerequisites.length}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
